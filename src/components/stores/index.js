import { createStore } from "redux";

const init = {
  location: {
    lat: 51.507351,
    long: -0.127758
  }
};

export function weatherReducer(state = init, action) {
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
