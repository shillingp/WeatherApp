import { createStore } from "redux";


export function weatherReducer(state = {}, action) {
  switch (action.type) {
    case "UPDATE":
      return {...state, ...action.data};
    case "SET_LOCATION":
      return {...state, location: action.data};
    default:
      return state;
  }
}

export const WeatherStore = createStore(
  weatherReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
