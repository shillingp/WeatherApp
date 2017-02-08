import oboe from "oboe";
import { debounce } from "decko";

import { secretKey, googKey } from "./secrets"


var location = {
  lat: 51.507351,
  long: -0.127758
};

var currentWatch = null;

const darkSky = () =>
  `https://api.darksky.net/forecast/${secretKey}/${location.lat},${location.long}?units=uk2`;


export var WeatherData = {};

function gatherData() {
  var _daily, _alerts;

  oboe(darkSky())
  // oboe("../assets/sample_data.json")
    .node({
  		"daily.$data.*": (result, index) => {
        if (result.length === 7) {
          result = result.map(item => {
            item.icon = item.icon.replace(/-/g, "_");
            return item;
          });
          _daily = result;
          // WeatherData.daily = result;
        }
  		},
      "$alerts.*": (result) => {
        _alerts = result;
        // WeatherData.alerts = result;
      }
  	})
  	.done(result => {
      WeatherData.alerts = _alerts;
      WeatherData.daily = _daily;
      // Daily MUST be last for watch to work and be efficient
  	});
}

export function gatherDataUsingLocation() {
  navigator.geolocation.clearWatch(currentWatch);

  if ("geolocation" in navigator) {
    currentWatch = navigator.geolocation.watchPosition((pos) => {
      location = {
        lat: pos.coords.latitude,
        long: pos.coords.longitude
      };
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

      location = {
        lat: coords.lat,
        long: coords.lng
      };
      gatherData();
    });
}
