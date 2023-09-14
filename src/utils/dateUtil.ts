import dayjs from 'dayjs';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const DATE_FORMAT = 'YYYY-MM-DD';

export function formatToDateTime(date?: dayjs.ConfigType, format = DATE_TIME_FORMAT): string {
  return dayjs(date).format(format);
}

export function formatToDate(date?: dayjs.ConfigType, format = DATE_FORMAT): string {
  return dayjs(date).format(format);
}

export const dateUtil = dayjs;

/**
 * 获取某个时间范围
 *
 * @param v -1、-7、-14、-30、-60
 * @returns object {start: y-m-d,end: y-m-d}
 */
export function getRangeDate(v: string | number) {
  const now = new Date();
  const nowTime = now.getTime();
  const oneDay = 24 * 60 * 60 * 1000;
  const dateRange = { start: '', end: '' };
  const nowWeekDay = now.getDay(); // 今天本周的第几天
  const nowDay = now.getDate(); // 当前日
  const nowMonth = now.getMonth(); // 当前月
  const nowYear = now.getFullYear(); // 当前年

  /**
   * 获得某个月的天数
   * @param month 当前月份
   */
  const getMonthDays = function(month) {
    const monthStartDate = new Date(nowYear, month, 1);
    const monthEndDate = new Date(nowYear, month + 1, 1);
    const days = (monthEndDate - monthStartDate) / oneDay;
    return days;
  };

  /**
   * 获得某个时间所处的季度范围
   */
  const getQuarterSize = (date: Date, offset = 0) => {
    const curMonth = date.getMonth() + 1;
    const x4 = {
      1: [1, 2, 3],
      2: [4, 5, 6],
      3: [7, 8, 9],
      4: [10, 11, 12],
    };
    const x12 = {
      1: 1,
      2: 1,
      3: 1,
      4: 2,
      5: 2,
      6: 2,
      7: 3,
      8: 3,
      9: 3,
      10: 4,
      11: 4,
      12: 4,
    };
    const quaIndex = x12[curMonth] || null;
    if (!quaIndex) {
      return [];
    }

    const offsetIdex = (quaIndex + offset + (offset >= 0 ? 0 : 4)) % 4;
    const quaRange = x4[offsetIdex];

    return [quaRange[0], quaRange[2]];
  };

  switch (v) {
    case 'yesterday':
      // 昨日
      dateRange.start = formatToDate(new Date(nowTime - oneDay));
      dateRange.end = dateRange.start;
      break;
    case 'week':
      // 本周
      const curWeekStart = new Date(nowYear, nowMonth, nowDay - nowWeekDay + 1);
      const curWeekEnd = new Date(nowTime + oneDay); // 今日
      dateRange.start = formatToDate(curWeekStart);
      dateRange.end = formatToDate(curWeekEnd);
      break;
    case 'lastweek':
      // 上周
      const lastWeekStart = new Date(nowYear, nowMonth, nowDay - nowWeekDay - 6);
      const lastWeekEnd = new Date(nowYear, nowMonth, nowDay - nowWeekDay);
      dateRange.start = formatToDate(lastWeekStart);
      dateRange.end = formatToDate(lastWeekEnd);
      break;
    case 'month':
      // 本月
      const monthStart = new Date(nowYear, nowMonth, 1);
      const monthEnd = new Date(nowTime + oneDay);
      dateRange.start = formatToDate(monthStart);
      dateRange.end = formatToDate(monthEnd);
      break;
    case 'lastmonth':
      // 上月
      const lastMonthDate = new Date();
      lastMonthDate.setDate(1);
      lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
      const lastMonth = lastMonthDate.getMonth();
      const lastMonthStart = new Date(nowYear, lastMonth, 1);
      const lastMonthEnd = new Date(nowYear, lastMonth, getMonthDays(lastMonth));
      dateRange.start = formatToDate(lastMonthStart);
      dateRange.end = formatToDate(lastMonthEnd);
      break;
    case 'quarter':
      // 本季度
      const quarterDate = new Date();
      const [sq, eq] = getQuarterSize(quarterDate);
      const quarterStart = new Date(nowYear, sq - 1, 1);
      const quarterEnd = new Date(nowYear, eq - 1, getMonthDays(eq - 1));
      dateRange.start = formatToDate(quarterStart);
      dateRange.end = formatToDate(quarterEnd);
      break;
    case 'lastquarter':
      // 上季度
      const lastQuarterDate = new Date();
      const [lsq, leq] = getQuarterSize(lastQuarterDate, -1);
      const lastQuarterStart = new Date(nowYear, lsq - 1, 1);
      const lastQuarterEnd = new Date(nowYear, leq - 1, getMonthDays(leq - 1));
      dateRange.start = formatToDate(lastQuarterStart);
      dateRange.end = formatToDate(lastQuarterEnd);
      break;
    case 'year':
      // 本年
      const yearStart = new Date(nowYear, 1, 1);
      const yearEnd = new Date(nowYear, 12, 31);
      dateRange.start = formatToDate(yearStart);
      dateRange.end = formatToDate(yearEnd);
      break;
    case 'lastyear':
      // 上年
      const lastYearStart = new Date(nowYear - 1, 1, 1);
      const lastYearEnd = new Date(nowYear - 1, 12, 31);
      dateRange.start = formatToDate(lastYearStart);
      dateRange.end = formatToDate(lastYearEnd);
      break;
    default:
      // 传入 v 为整数是即为近 xx 天
      if (parseInt(v) > 0) {
        dateRange.start = formatToDate(new Date(nowTime - oneDay * parseInt(v)));
        dateRange.end = formatToDate(new Date(nowTime - oneDay)); // 不含今天
      } else {
        // 默认返回当天
        dateRange.start = formatToDate(new Date());
        dateRange.end = dateRange.start;
      }
      break;
  }

  return dateRange;
}

export function formatMoney(num: number | string, hasInt = false) {
  if (Number(num) < 0) return num;

  const moneyUnits = ['', '万', '亿', '万亿'];
  const dividend = 10000;
  let curentNum = num;
  // 转换数字
  let curentUnit = moneyUnits[0];
  // 转换单位
  for (let i = 0; i < 4; i++) {
    curentUnit = moneyUnits[i];
    if (checkStringSize(curentNum) < 5) {
      break;
    }
    curentNum = curentNum / dividend;
  }
  curentNum = hasInt && num < dividend ? parseInt(curentNum) : Number(curentNum).toFixed(2);
  return `${curentNum}${curentUnit}`;
}

export function checkStringSize(tempNum) {
  const stringNum = tempNum.toString();
  const index = stringNum.indexOf('.');
  let newNum = stringNum;
  if (index !== -1) {
    newNum = stringNum.substring(0, index);
  }
  return newNum.length;
}
