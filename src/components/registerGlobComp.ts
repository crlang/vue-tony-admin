import type { App } from 'vue'
import { Button } from './Button'

// const compList = [compGroup]

export function registerGlobComp(app: App) {
  // compList.forEach((comp) => {
  //   app.component(comp.name || comp.displayName, comp)
  // })

  app.use(Button)
}
