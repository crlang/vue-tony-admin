<template>
  <PageWrapper title="Tree 基础示例" description="未做封装，仅对 Element ElTree 官方组件进行演示">
    <ElRow :gutter="16">
      <ElCol :span="8">
        <ElCard header="基础示例，默认展开第一层">
          <ElTree :data="treeData" node-key="key" :default-expanded-keys="['0-0', '1-1', '2-2']" />
        </ElCard>
      </ElCol>
      <ElCol :span="8">
        <ElCard header="可勾选，默认全部展开">
          <ElTree
            :data="treeData"
            node-key="key"
            show-checkbox
            default-expand-all
            @check-change="handleCheck"
          />
        </ElCard>
      </ElCol>
      <ElCol :span="8">
        <ElCard header="指定默认展开/勾选示例">
          <ElTree
            :data="treeData"
            node-key="key"
            show-checkbox
            :default-expanded-keys="['0-0']"
            :default-checked-keys="['0-0']"
          />
        </ElCard>
      </ElCol>
      <ElCol :span="8" class="mt-4">
        <ElCard header="懒加载异步树">
          <ElTree
            ref="asyncTreeRef"
            :data="ajaxTree"
            :props="ajaxProps"
            node-key="key"
            lazy
            :load="onLoadData"
          />
        </ElCard>
      </ElCol>
      <ElCol :span="16" class="mt-4">
        <ElCard>
          <template #header>
            <div>
              <span>异步数据，默认展开</span>
              <ElButton class="ml-6" :loading="treeLoading" @click="loadTreeData">加载数据</ElButton>
            </div>
          </template>
          <ElTree
            ref="asyncExpandTreeRef"
            v-loading="treeLoading"
            :default-expand-all="asyncTreeExpand"
            :data="asyncTreeData"
          />
        </ElCard>
      </ElCol>
    </ElRow>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, nextTick, reactive, ref } from 'vue'
import { ElButton, ElCard, ElCol, ElLoading, ElRow, ElTree } from 'element-plus'

import { treeData } from './data'

export default defineComponent({
  components: { ElRow, ElCol, ElCard, ElTree, ElButton },
  directives: {
    loading: ElLoading.directive,
  },
  setup() {
    const asyncTreeRef = ref(null)
    const asyncExpandTreeRef = ref(null)
    const asyncTreeData = ref([])
    const treeLoading = ref(false)
    const asyncTreeExpand = ref(false)

    const ajaxProps = reactive({
      children: 'children',
      label: 'title',
    })

    const ajaxTree = reactive([
      {
        title: 'parent ',
        key: '0-0',
      },
    ])

    function handleCheck() {
      // do something
    }

    function loadTreeData() {
      treeLoading.value = true
      // 以下是模拟异步获取数据
      setTimeout(() => {
        // 设置数据源
        asyncTreeData.value = JSON.parse(JSON.stringify(treeData))
        treeLoading.value = false
        // 展开全部
        nextTick(() => {
          asyncTreeExpand.value = true
        })
      }, 2000)
    }

    function onLoadData(node, resolve) {
      if (node.level === 0) {
        return resolve(ajaxTree)
      }
      if (node.level > 1) {
        if (node.data.leaf || node.level > 5) {
          return resolve([])
        }
        else {
          return resolve([
            {
              title: `zone${node.data.key}`,
              key: `${node.data.key}-1`,
            },
          ])
        }
      }

      setTimeout(() => {
        const data = reactive([
          {
            title: 'leaf',
            key: '1-1',
            leaf: true,
          },
          {
            title: 'zone',
            key: '2-2',
          },
        ])

        resolve(data)
      }, 500)
    }
    return {
      treeData,
      ajaxProps,
      ajaxTree,
      handleCheck,
      onLoadData,
      asyncTreeRef,
      asyncExpandTreeRef,
      asyncTreeData,
      asyncTreeExpand,
      loadTreeData,
      treeLoading,
    }
  },
})
</script>

<style lang="scss" scoped>
.el-card {
  height: 100%;
}
</style>
