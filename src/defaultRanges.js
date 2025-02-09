import {
  addDays,
  endOfDay,
  startOfDay,
  startOfMonth,
  endOfMonth,
  addMonths,
  startOfWeek,
  endOfWeek,
  isSameDay,
} from 'date-fns';



const defineds = {
  startOfWeek: startOfWeek(new Date()),
  endOfWeek: endOfWeek(new Date()),
  startOfLastWeek: startOfWeek(addDays(new Date(), -7)),
  endOfLastWeek: endOfWeek(addDays(new Date(), -7)),
  startOfToday: startOfDay(new Date()),
  endOfToday: endOfDay(new Date()),
  startOfYesterday: startOfDay(addDays(new Date(), -1)),
  endOfYesterday: endOfDay(addDays(new Date(), -1)),
  startOfMonth: startOfMonth(new Date()),
  endOfMonth: endOfMonth(new Date()),
  startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
  endOfLastMonth: endOfMonth(addMonths(new Date(), -1)),
};

const staticRangeHandler = {
  range: {},
  isSelected(range) {
    const definedRange = this.range();
    return (
      isSameDay(range.startDate, definedRange.startDate) &&
      isSameDay(range.endDate, definedRange.endDate)
    );
  },
};


export function staticDate(minDate) {

  function createStaticRanges(ranges) {
    return ranges.map(range => ({ ...staticRangeHandler, ...range }));
  }

  const defaultStaticRanges = createStaticRanges([
    {
      label: 'Сегодня',
      range: () => ({
        startDate: defineds.startOfToday,
        endDate: defineds.endOfToday,
      }),
    },
    {
      label: 'Вчера',
      range: () => ({
        startDate: defineds.startOfYesterday,
        endDate: defineds.endOfYesterday,
      }),
    },
    {
      label: 'Эта неделя',
      range: () => ({
        startDate: addDays(defineds.startOfWeek, 1),
        endDate: defineds.endOfToday,
      }),
    },
    {
      label: 'Прошлая неделя',
      range: () => ({
        startDate: addDays(defineds.startOfLastWeek, 1),
        endDate: addDays(defineds.endOfLastWeek, 1),
      }),
    },

    {
      label: 'Последние 7 дней',
      range: () => ({
        startDate: addDays(defineds.endOfToday, -6),
        endDate: defineds.endOfToday,
      }),
    },
    {
      label: 'Последние 14 дней',
      range: () => ({
        startDate: addDays(defineds.endOfToday, -13),
        endDate: defineds.endOfToday,
      }),
    },
    {
      label: 'Этот месяц',
      range: () => ({
        startDate: defineds.startOfMonth,
        endDate: defineds.endOfToday,
      }),
    },
    {
      label: 'Прошлый месяц',
      range: () => ({
        startDate: defineds.startOfLastMonth,
        endDate: defineds.endOfLastMonth,
      }),
    },
    {
      label: 'Последние 30 дней',
      range: () => ({
        startDate: addMonths(defineds.endOfToday, -1),
        endDate: defineds.endOfToday,
      }),
    },
    {
      label: 'Всё время',
      range: () => ({
        startDate: minDate,
        endDate: defineds.endOfToday,
      }),
    }
  ]);


  return defaultStaticRanges;
  // const defaultInputRanges = [
  //   // {
  //   //   label: 'days up to today',
  //   //   range(value) {
  //   //     return {
  //   //       startDate: addDays(defineds.startOfToday, (Math.max(Number(value), 1) - 1) * -1),
  //   //       endDate: defineds.endOfToday,
  //   //     };
  //   //   },
  //   //   getCurrentValue(range) {
  //   //     if (!isSameDay(range.endDate, defineds.endOfToday)) return '-';
  //   //     if (!range.startDate) return '∞';
  //   //     return differenceInCalendarDays(defineds.endOfToday, range.startDate) + 1;
  //   //   },
  //   // },
  //   // {
  //   //   label: 'days starting today',
  //   //   range(value) {
  //   //     const today = new Date();
  //   //     return {
  //   //       startDate: today,
  //   //       endDate: addDays(today, Math.max(Number(value), 1) - 1),
  //   //     };
  //   //   },
  //   //   getCurrentValue(range) {
  //   //     if (!isSameDay(range.startDate, defineds.startOfToday)) return '-';
  //   //     if (!range.endDate) return '∞';
  //   //     return differenceInCalendarDays(range.endDate, defineds.startOfToday) + 1;
  //   //   },
  //   // },
  // ];
}

