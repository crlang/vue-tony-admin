export const searchList = (() => {
  const result: any[] = [];
  for (let i = 0; i < 6; i++) {
    result.push({
      id: i,
      title: `Tony Admin${i + 1}`,
      description: ['Tony', 'Vue3', 'Typescript'],
      content: '基于 Vue3, Vite2, TypeScript, Element Plus 实现的一套完整的企业级后台管理系统',
      time: '2020-11-14 11:20',
    });
  }
  return result;
})();
