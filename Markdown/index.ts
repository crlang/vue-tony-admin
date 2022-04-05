import { withInstall } from '@/utils'
import markdown from './src/Markdown.vue'
import markdownViewer from './src/MarkdownViewer.vue'

export * from './src/typing'
export const Markdown = withInstall(markdown)
export const MarkdownViewer = withInstall(markdownViewer)
