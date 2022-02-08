const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

interface MonthDictionary {
  [key: string]: string;
}

const monthShorthand: MonthDictionary = {
  January: 'Jan',
  February: 'Feb',
  March: 'Mar',
  April: 'Apr',
  May: 'May',
  June: 'Jun',
  July: 'Jul',
  August: 'Aug',
  September: 'Sep',
  October: 'Oct',
  November: 'Nov',
  December: 'Dec',
};

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const getYear = (d: Date | string) => {
  const newDate = new Date(d);
  return newDate.getFullYear();
};

const getDate = (d: Date | string) => {
  const newDate = new Date(d);
  return newDate.getDate();
};

const getMonth = (d: Date | string) => {
  const newDate = new Date(d);
  const monthIndex = newDate.getMonth();
  const monthName = months[monthIndex];
  return monthName;
};

const getMonthShorthand = (d: Date | string) => {
  const newDate = new Date(d);
  const monthIndex = newDate.getMonth();
  const monthName = months[monthIndex];
  return monthShorthand[monthName];
};

const getDay = (d: Date | string) => {
  const newDate = new Date(d);
  return days[newDate.getDay()];
};

const trimTime = (d: Date | string) => {
  const newDate = new Date(d);
  let time = newDate.toLocaleTimeString();
  let newTime = time.replace(':00 ', '');
  return newTime;
};

const formatDateForGameContainer = (d: Date | string) => {
  const month = getMonthShorthand(d);
  const formattedDate = `${month}. ${getDate(d)}`;
  return formattedDate;
};

const formatDateForGameCard = (d: Date | string | number) => {
  const month = getMonthShorthand(d);
  const gameDate = getDate(d);
  const time = trimTime(d);

  return `${month} ${gameDate} @ ${time}`;
};

const formatDateForGamePage = (d: Date | string) => {
  const day = getDay(d);
  const month = getMonthShorthand(d);
  const date = getDate(d);
  const time = trimTime(d);

  return `${day}, ${month} ${date} @ ${time}`;
};

const getDateAtMidnight = (d: Date) => {
  d.setHours(0);
  d.setMinutes(0);
  d.setSeconds(1);
  return d;
};

export {
  getDay,
  getDate,
  getMonth,
  getMonthShorthand,
  getYear,
  trimTime,
  formatDateForGameContainer,
  formatDateForGameCard,
  formatDateForGamePage,
  getDateAtMidnight,
};
