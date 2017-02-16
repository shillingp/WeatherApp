

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

export function debounce(callback, wait, context = this) {
  let timeout = null;
  let callbackArgs = null;

  const later = () => callback.apply(context, callbackArgs);

  return function() {
    callbackArgs = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }
}

// const handleScroll = debounce((e) => {
//   console.log("Window scrolled.");
// }, 100);
//
// window.addEventListener("scroll", handleScroll);
