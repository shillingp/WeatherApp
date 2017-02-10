
* []()
* [CSS Modules](#css-modules) Implement css-modules in `src/components/*` folders
* [Redux](#Redux) ~~Replace WeatherData with a pure redux store~~


---

## CSS Modules
This project is set up to support [CSS Modules](https://github.com/css-modules/css-modules).  By default, styles in `src/style` are **global** (not using CSS Modules) to make global declarations, imports and helpers easy to declare.  Styles in `src/components` are loaded as CSS Modules via [Webpack's css-loader](https://github.com/webpack/css-loader#css-modules).  Modular CSS namespaces class names, and when imported into JavaScript returns a mapping of canonical (unmodified) CSS classes to their local (namespaced/suffixed) counterparts.

When imported, this LESS/CSS:

```css
.redText { color:red; }
.blueText { color:blue; }
```

... returns the following map:

```js
import styles from './style.css';
console.log(styles);
// {
//   redText: 'redText_local_9gt72',
//   blueText: 'blueText_local_9gt72'
// }
```


---

## Redux

Use redux as a sync for WeatherData. Use pure function for functional performance.

```js
function weatherStore(state = {}, action) {
  switch (action.type) {
    case "UPDATE":
      return {...state, ...action.data}
    case "SET_LOCATION":
      return {...state, location: action.data}
    default:
        return state;
  }
}

const WeatherData = Redux.createStore(weatherStore);

WeatherData.subscribe(() =>
  console.log(WeatherData.getState()));

WeatherData.dispatch({
  type: "UPDATE"
  data: {a: 1}
});
// {a: 1}
WeatherData.dispatch({
  type: "UPDATE"
  data: {b: 1}
});
// {a: 1, b: 1}
WeatherData.dispatch({
  type: "UPDATE"
  data: {a: 2}
});
// {a: 2, b: 1}
```


---
