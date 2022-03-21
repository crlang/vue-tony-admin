import { TreeType, TreeStoreNames } from './typing'

export function setAllTreeNodes($treeRef:TreeType, nodeStoreName:TreeStoreNames, checked:boolean) {
  const nodes = getAllTreeNodes($treeRef)
  for (let i = 0; i < nodes.length; i++) {
    nodes[i][nodeStoreName] = checked
  }
}

export function getAllTreeNodes($treeRef:TreeType) {
  const nodes = $treeRef.store._getAllNodes()
  if (!nodes?.length) {
    return []
  }
  return nodes
}

export function expandTreeNode($treeRef:TreeType, expandKey:string | number, checked:boolean, nodeKeyName = 'key') {
  const nodes = getAllTreeNodes($treeRef)
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i]?.data[nodeKeyName] === expandKey) {
      _expandParentNode(nodes[i], checked)
      break
    }
  }
}

// todo: the existence of sibling nodes has not been processed yet
function _expandParentNode(node, checked:boolean) {
  node.expanded = checked
  if (node.parent) {
    _expandParentNode(node.parent, checked)
  }
}
