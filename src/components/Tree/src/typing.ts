// FROM: ElTree
import { ElTree } from 'element-plus'
export type TreeType = InstanceType<typeof ElTree>

export declare interface TreeNodeProps {
  label: string;
  key: string,
  children?: string;
  class?: string,
  disabled?: boolean;
  isLeaf?: boolean;
}

export type TreeStoreNames = 'expanded' | 'indeterminate' | 'isCurrent' | 'isLeaf' | 'loaded' | 'loading' | 'visible' | 'checked'
