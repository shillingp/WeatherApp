import oboe from "oboe";

import { WeatherStore } from "../stores";
import { secretKey, googKey } from "./secrets";


var currentData = null;
var currentWatch = null;

const darkSky = () => {
  var {lat, long} = WeatherStore.getState().location
  return `https://api.darksky.net/forecast/${secretKey}/${lat},${long}?units=uk2`;
};


function gatherData() {
  var data = {};

  oboe("../../assets/sample_data.json")
  // oboe(darkSky())
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
      "hourly.$data.*": (result) => {
        data = {...data, hourly: result}
      },
      "$alerts.*": (result) => {
        data = {...data, alerts: result}
      }
    })
    .done(result => {
      WeatherStore.dispatch({
        type: "UPDATE",
        data: data
      });
    })
}


function setGeoLocation() {
  navigator.geolocation.clearWatch(currentWatch);

  currentWatch = navigator.geolocation.watchPosition(({coords}) => {
    WeatherStore.dispatch({
      type: "SET_LOCATION",
      data: {
        lat: coords.latitude,
        long: coords.longitude
      }
    });
    gatherData()
  }, () => {
    gatherData();
  }, {
    enableHighAccuracy: false
  });
}

export function gatherDataUsingLocation() {
  if (currentData !== "__geolocation__") {
    currentData = "__geolocation__"
    if ("geolocation" in navigator) {
      setGeoLocation();
    } else {
      alert("Cannot get your location");
    }
  }
}


export function getLocationFromName(placeName) {
  if (currentData !== placeName) {
    currentData = placeName;

    navigator.geolocation.clearWatch(currentWatch);
    placeName = placeName.replace(/ /g, "+");
    const goog = `https://maps.googleapis.com/maps/api/geocode/json?address=${placeName}&key=${googKey}`;

    oboe(goog)
      .done((res) => {
        res = res.results[0];
        const coords = res.geometry.location;

        WeatherStore.dispatch({
          type: "SET_LOCATION",
          data: {
            lat: coords.lat,
            long: coords.lng
          }
        });
        gatherData();
      });
  }
}
