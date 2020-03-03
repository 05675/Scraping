interface PathnameToPageInfo {
  [pathname: string]: {
    currentPageName: string;
    previousPageName: string;
    previousPathname: string;
  };
}

export const pathnameToPageInfo: PathnameToPageInfo = {
  // Developers(開発用)
  '/': {
    currentPageName: 'インデックス',
    previousPageName: '',
    previousPathname: '',
  },
  '/Developers/createTask': {
    currentPageName: 'タスク作成',
    previousPageName: '',
    previousPathname: '',
  },
  '/Developers/demoTask': {
    currentPageName: 'タスク一括登録',
    previousPageName: '',
    previousPathname: '',
  },

  // 従業員page
  '/login': {
    currentPageName: 'ログイン',
    previousPageName: '',
    previousPathname: '',
  },
  '/tasks': {
    currentPageName: 'タスク一覧',
    previousPageName: '',
    previousPathname: '',
  },
  '/nencho': {
    currentPageName: '2020年分年末調整',
    previousPageName: 'タスク一覧',
    previousPathname: '/tasks',
  },
  '/nencho/insurances': {
    currentPageName: '保険料控除',
    previousPageName: '2020年分年末調整',
    previousPathname: '/nencho',
  },
  '/nencho/lifeInsuranceInputs': {
    currentPageName: '生命保険入力',
    previousPageName: '保険料控除',
    previousPathname: '/nencho/insurances',
  },
};
