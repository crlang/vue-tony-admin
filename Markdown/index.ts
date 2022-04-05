import { withInstall } from '@/utils'
import markDown from './src/Markdown.vue'
import markDownViewer from './src/MarkdownViewer.vue'

export * from './src/typing'
export const MarkDown = withInstall(markDown)
export const MarkdownViewer = withInstall(markDownViewer)
