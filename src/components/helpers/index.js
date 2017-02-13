

export const toTitleCase = camelCase => (
  camelCase
    .replace(/([A-Z])/g, (match) => ` ${match}`)
    .replace(/^./, (match) => match.toUpperCase())
)

export function getWeekDay(time) {
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const date = new Date(time * 1000).getDay();
  return days[date];
};
