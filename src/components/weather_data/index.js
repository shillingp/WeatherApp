import oboe from "oboe";
import { createStore } from "redux";

import { secretKey, googKey } from "./secrets"


const default_location = {
  location: {
    lat: 51.507351,
    long: -0.127758
  }
};
var currentWatch = null;


function weatherStore(state = default_location, action) {
  switch (action.type) {
    case "UPDATE":
      return {...state, ...action.data}
    case "SET_LOCATION":
      return {...state, location: action.data}
    default:
      return state
  }
}

export const WeatherData = createStore(weatherStore)


const darkSky = () => {
  var {lat, long} = WeatherData.getState().location
  return `https://api.darksky.net/forecast/${secretKey}/${lat},${long}?units=uk2`;
};


function gatherData() {
  var data = {};

  oboe(darkSky())
    .node({
      "daily.$data.*": (result, index) => {
        if (result.length === 7) {
          result = result.map(item => {
            item.icon = item.icon.replace(/-/g, "_");
            return item;
          });

          data = {...data, daily: result}
        }
  		},
      "$alerts.*": (result) => {
        data = {...data, alerts: result}
      }
    })
    .done(result => {
      WeatherData.dispatch({
        type: "UPDATE",
        data: data
      })
    })
}


export function gatherDataUsingLocation() {
  navigator.geolocation.clearWatch(currentWatch);

  if ("geolocation" in navigator) {
    currentWatch = navigator.geolocation.watchPosition(({ coords }) => {
      WeatherData.dispatch({
        type: "SET_LOCATION",
        data: {
          lat: coords.latitude,
          long: coords.longitude
        }
      });
      gatherData();
    }, _ => {
      gatherData();
    }, {
      enableHighAccuracy: true
    });
  } else {
    console.log("no location status")
  }
}


export function getLocationFromName(placeName) {
  navigator.geolocation.clearWatch(currentWatch);

  placeName = placeName.replace(/ /g, "+");
  const goog = `https://maps.googleapis.com/maps/api/geocode/json?address=${placeName}&key=${googKey}`

  oboe(goog)
    .done((res) => {
      res = res.results[0];
      const coords = res.geometry.location;

      WeatherData.dispatch({
        type: "SET_LOCATION",
        data: {
          lat: coords.lat,
          long: coords.lng
        }
      });
      gatherData();
    });
}
