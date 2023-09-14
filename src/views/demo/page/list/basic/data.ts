import { randomNumber } from '@/utils/demo';

export const cardList = (() => {
  const result: any[] = [];
  for (let i = 0; i < 70; i++) {
    result.push({
      id: i,
      title: `Tony Admin${i + 1}`,
      description: '基于 Vue3, TypeScript, Element Plus 实现的一套完整的企业级后台管理系统',
      datetime: '2020-11-26 17:39',
      extra: '编辑',
      icon: 'ep:element-plus',
      color: '#1890ff',
      author: 'crlang',
      percent: randomNumber(0, 100),
    });
  }
  return result;
})();
