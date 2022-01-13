const projectName = import.meta.env.VITE_GLOB_APP_TITLE

export function warn(message: string) {
  console.warn(`[${projectName?.replace(/{space}/g, ' ')} warn]:${message}`)
}

export function error(message: string) {
  const msg = `[${projectName?.replace(/{space}/g, ' ')} error]:${message}`
  console.error(msg)
  throw new Error(msg)
}
