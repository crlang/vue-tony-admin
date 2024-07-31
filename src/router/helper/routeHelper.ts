import type { RouteRecordNormalized, Router } from 'vue-router'

import { createRouter, createWebHashHistory } from 'vue-router'
import { cloneDeep, omit } from 'lodash-es'
import type { AppRouteModule, AppRouteRecordRaw } from '@/router/types'

import { EXCEPTION_COMPONENT, LAYOUT, getParentLayout } from '@/router/constant'
import { warn } from '@/utils/log'

export type LayoutMapKey = 'LAYOUT'
const IFRAME = () => import('@/views/core/iframe/FrameBlank.vue')

const LayoutMap = new Map<string, () => Promise<typeof import('*.vue')>>()

LayoutMap.set('LAYOUT', LAYOUT)
LayoutMap.set('IFRAME', IFRAME)

let dynamicViewsModules: Record<string, () => Promise<Recordable>>

function asyncImportRoute(routes: AppRouteRecordRaw[] | undefined) {
  dynamicViewsModules = dynamicViewsModules || import.meta.glob('../../views/**/*.{vue,tsx}')
  if (!routes)
    return
  routes.forEach((item) => {
    if (!item.component && item.meta?.frameSrc) {
      item.component = 'IFRAME'
    }
    const { component, name } = item
    const { children } = item
    if (component) {
      const layoutFound = LayoutMap.get(component.toUpperCase())
      if (layoutFound) {
        item.component = layoutFound
      }
      else {
        item.component = dynamicImport(dynamicViewsModules, component as string)
      }
    }
    else if (name) {
      item.component = getParentLayout()
    }
    if (children) {
      asyncImportRoute(children)
    }
  })
}

function dynamicImport(dynamicViewsModules: Record<string, () => Promise<Recordable>>, component: string) {
  const keys = Object.keys(dynamicViewsModules)
  const matchKeys = keys.filter((key) => {
    const k = key.replace('../../views', '')
    const startFlag = component.startsWith('/')
    const endFlag = component.endsWith('.vue') || component.endsWith('.tsx')
    const startIndex = startFlag ? 0 : 1
    const lastIndex = endFlag ? k.length : k.lastIndexOf('.')
    return k.substring(startIndex, lastIndex) === component
  })
  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0]
    return dynamicViewsModules[matchKey]
  }
  else if (matchKeys?.length > 1) {
    warn('请不要在视图文件夹下的同一层次目录中创建具有相同文件名的“.vue”和“.TSX”文件。这将导致动态导入失败')
  }
  else {
    warn(`在src/views/下找不到\`${component}.vue\` 或 \`${component}.tsx\`, 请自行创建!`)
    return EXCEPTION_COMPONENT
  }
}
// 将背景对象变成路由对象
export function transformObjToRoute<T = AppRouteModule>(routeList: AppRouteModule[]): T[] {
  routeList.forEach((route) => {
    const component = route.component as string
    if (component) {
      if (component.toUpperCase() === 'LAYOUT') {
        route.component = LayoutMap.get(component.toUpperCase())
      }
      else {
        route.children = [cloneDeep(route)]
        route.component = LAYOUT
        route.name = `${route.name}Parent`
        route.path = ''
        const meta = route.meta || {}
        meta.single = true
        meta.affix = false
        route.meta = meta
      }
    }
    else {
      warn(`请正确配置路由：${route?.name}的component属性`)
    }
    if (route.children) {
      asyncImportRoute(route.children)
    }
  })
  return routeList as unknown as T[]
}

/**
 * 将多级路由转换为2级路由
 */
export function flatMultiLevelRoutes(routeModules: AppRouteModule[]) {
  const modules: AppRouteModule[] = cloneDeep(routeModules)

  for (let index = 0; index < modules.length; index++) {
    const routeModule = modules[index]
    if (!isMultipleRoute(routeModule)) {
      continue
    }
    promoteRouteLevel(routeModule)
  }
  return modules
}

// 路由等级提升
function promoteRouteLevel(routeModule: AppRouteModule) {
  // 使用vue-router拼接菜单
  // createRouter 创建一个可以被 Vue 应用程序使用的路由实例
  let router: Router | null = createRouter({
    routes: [routeModule as unknown as RouteRecordNormalized],
    history: createWebHashHistory(),
  })
  // 获取所有路由记录的完整列表。
  const routes = router.getRoutes()
  // 将所有子路由添加到二级路由
  addToChildren(routes, routeModule.children || [], routeModule)
  router = null
  // omit lodash的函数 对传入的item对象的children进行删除
  routeModule.children = routeModule.children?.map(item => omit(item, 'children'))
}

// 将所有子路由添加到二级路由
function addToChildren(routes: RouteRecordNormalized[], children: AppRouteRecordRaw[], routeModule: AppRouteModule) {
  for (let index = 0; index < children.length; index++) {
    const child = children[index]
    // todo: 为何生成多个空路径路由
    // 修复: 存在多层级的多个或空路径子路由
    const route = routes.find(item => item.path && item.name === child.name)
    if (!route) {
      continue
    }
    routeModule.children = routeModule.children || []
    if (!routeModule.children.find(item => item.name === route.name)) {
      routeModule.children?.push(route as unknown as AppRouteModule)
    }
    if (child.children?.length) {
      addToChildren(routes, child.children, routeModule)
    }
  }
}

// 判断级别是否超过2级
function isMultipleRoute(routeModule: AppRouteModule) {
  // Reflect.has 与 in 操作符 相同, 用于检查一个对象(包括它原型链上)是否拥有某个属性
  if (!routeModule || !Reflect.has(routeModule, 'children') || !routeModule.children?.length) {
    return false
  }

  const children = routeModule.children

  let flag = false
  for (let index = 0; index < children.length; index++) {
    const child = children[index]
    if (child.children?.length) {
      flag = true
      break
    }
  }
  return flag
}
