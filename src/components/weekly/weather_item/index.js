import { h, Component } from 'preact';

import icons from "./icon"

const unitTypes = {
  currentUnits: "si",
  si: {
    nearestStormDistance: "km",
    precipIntensity: "mm/h",
    precipIntensityMax: "mm/h",
    precipAccumulation: "cm",
    temperature: "°C",
    temperatureMin: "°C",
    temperatureMax: "°C",
    apparentTemperature: "°C",
    dewPoint: "°C",
    windSpeed: "m/s",
    pressure: "hPa",
    visibility: "km",
  },
  uk2: {
    nearestStormDistance: "mile",
    visibility: "mile",
    windSpeed: "mph",
  }
}

function getUnits(keyName) {
  const units = unitTypes[unitTypes.currentUnits];

  if (units.hasOwnProperty(keyName)) {
    return units[keyName];
  } else {
    return unitTypes.si[keyName];
  }
}

function WeatherIcon(props) {
  const iconSize = 100;
  return <div class="weather-icon">
            <svg version="1.1" id={`weather-${props.icon}`}
                 xmlns="http://www.w3.org/2000/svg"
                 x="0px" y="0px" width={`${iconSize}px`} height={`${iconSize}px`}
                 viewBox="0 0 512 512" enableBackground="new 0 0 512 512">
               <path fillRule="evenodd" clipRule="evenodd" fill="#1D1D1B"
                     d={icons[props.icon]} /></svg></div>
}

function WeatherStats(props) {
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const date = new Date(props.time * 1000).getDay();
  const dateString = props.index === 0 ? "Today" :
    props.index === 1 ? "Tomorrow" : days[date];

  const rainChance = (
    <div class="chance-rain">
      <div>Change of rain: <span>{Math.round(props.rainChance * 100) + "%"}</span></div>
    </div>
  );

  return (
    <div class="weather-stats">
      <h3>
        <time dateTime={props.time}>
          {dateString}
        </time>
      </h3>
      <div class="temperatures">
        <div>Hi: <span>{props.tempHi + getUnits("temperatureMax")}</span></div>
        <div>Lo: <span>{props.tempLo + getUnits("temperatureMin")}</span></div>
      </div>
    </div>
  )
}

export default function WeatherItem(props) {
  const item = props.item;

  var className = "col-xs-10 col-xs-offset-1 col-md-4";
  const today = " today col-sm-offset-2 col-md-offset-4 col-lg-4 col-lg-offset-4 col-sm-8";
  const other = " col-sm-offset-0 col-md-offset-1 col-lg-3 col-lg-offset-2  col-sm-6";
  className += props.index === 0 ? today : other;

  //props.index % 2 === 0 ? "weather-item clearfix" : "weather-item"

  return (
    <section class={props.index === 0 ? "weather-item clearfix" : "weather-item"}>
      <div class={className}>
        <div class="clearfix">
          <WeatherStats time={item.time} tempHi={item.temperatureMax}
                        tempLo={item.temperatureMin} summary={item.summary}
                        rainChance={item.precipProbability} index={props.index} />
          <WeatherIcon icon={item.icon} />
        </div>
        {props.index === 0 ? <div><p>{item.summary}</p></div> : null}
      </div>
    </section>
  )
}
