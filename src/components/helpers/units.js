
const unitTypes = {
  currentUnits: "si",
  si: {
    nearestStormDistance: " km",
    precipIntensity: " mm/h",
    precipIntensityMax: " mm/h",
    precipAccumulation: " cm",
    temperature: "°C",
    temperatureMin: "°C",
    temperatureMax: "°C",
    apparentTemperature: "°C",
    dewPoint: "°C",
    windSpeed: " m/s",
    pressure: " hPa",
    visibility: " km",
    cloudCover: "%"
  },
  uk2: {
    nearestStormDistance: " mile",
    visibility: " mile",
    windSpeed: " mph",
  }
}

export function getUnits(keyName) {
  const units = unitTypes[unitTypes.currentUnits];

  if (units.hasOwnProperty(keyName)) {
    return units[keyName];
  } else {
    return unitTypes.si[keyName] || "";
  }
}

export function setUnits(newUnits) {
  if (unitTypes.hasOwnProperty(newUnits)) {
    unitTypes.currentUnits = newUnits;
  } else {
    return false;
  }
  return true;
}
