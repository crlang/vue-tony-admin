import { createAsyncComponent } from '@/utils/factory/createAsyncComponent'

export const UserDropDown = createAsyncComponent(() => import('./user-dropdown/index.vue'), {
  loading: true,
})

export const LayoutBreadcrumb = createAsyncComponent(() => import('./Breadcrumb.vue'))

export const Notify = createAsyncComponent(() => import('./notify/index.vue'))

export const ErrorAction = createAsyncComponent(() => import('./ErrorAction.vue'))

export const AppSearch = createAsyncComponent(() => import('./search/index.vue'))

export const FullScreen = createAsyncComponent(() => import('./FullScreen.vue'))
