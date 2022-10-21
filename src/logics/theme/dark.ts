/**
 * 更新主题暗模式
 * @param mode 模式
 */
export async function updateDarkTheme(mode: string | null = 'light') {
  const htmlRoot = document.getElementById('htmlRoot')
  if (!htmlRoot) {
    return
  }
  const hasDarkClass = htmlRoot.classList.contains('dark')
  if (mode === 'dark') {
    htmlRoot.setAttribute('data-theme', 'dark')
    if (!hasDarkClass) {
      htmlRoot.classList.add('dark')
    }
  } else {
    htmlRoot.setAttribute('data-theme', 'light')
    if (hasDarkClass) {
      htmlRoot.classList.remove('dark')
    }
  }
}
