import { PageTransactionInterface } from '@src/interfaces/PageTransaction';

const PagesData: PageTransactionInterface[] = [
  {
    pathname: '/tasks',
    backUrl: '',
    backUrlName: '',
  },
  {
    pathname: '/nencho',
    backUrl: '/tasks',
    backUrlName: 'タスク一覧',
  },
  {
    pathname: '/nencho/insurances',
    backUrl: '/nencho',
    backUrlName: '2020年分年末調整',
  },
  {
    pathname: '/nencho/lifeInsuranceInputs',
    backUrl: '/nencho/insurances',
    backUrlName: '保険料控除',
  },
];
export default PagesData;
