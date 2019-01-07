export const snakeCaseToCapitalized = text => text
  .split('_')
  .map(word => word[0].toUpperCase() + word.substr(1))
  .join(' ');

const oneDay = 1000 * 60 * 60 * 24;

export const daysBetween = (date1, date2) => {
  const date1Millis = date1.getTime();
  const date2Millis = date2.getTime();
  const diff = Math.abs(date1Millis - date2Millis);
  return Math.round(diff / oneDay);
};

export const daysAgo = days => new Date(new Date() - (days * oneDay));
