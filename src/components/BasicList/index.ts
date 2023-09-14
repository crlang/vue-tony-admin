import { withInstall } from '@/utils';
import list from './src/BasicList.vue';
import listItem from './src/BasicListItem.vue';
import listMeta from './src/BasicListItemMeta.vue';

export const BasicList = withInstall(list);
export const BasicListItem = withInstall(listItem);
export const BasicListItemMeta = withInstall(listMeta);
export default BasicList;
