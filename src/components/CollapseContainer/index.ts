import type { ExtractOptionProp } from 'vue'

import { withInstall } from '@/utils'
import collapseContainer from './src/CollapseContainer.vue'
import { basicProps } from './src/props'

export type CollapseContainerOptions = ExtractOptionProp<typeof basicProps>

export const CollapseContainer = withInstall(collapseContainer)
