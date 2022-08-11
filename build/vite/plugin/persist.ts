import type { Plugin } from 'vite'
import OptimizationPersist from 'vite-plugin-optimize-persist'
import PkgConfig from 'vite-plugin-package-config'

export function configOptimizationPersist(): Plugin[] {
  return [PkgConfig(), OptimizationPersist()]
}
