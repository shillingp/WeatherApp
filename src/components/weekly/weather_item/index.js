import { h, Component } from 'preact';

import { weatherIcons } from "../../helpers/icons";
import { getUnits } from "../../helpers/units";
import { getWeekDay } from "../../helpers";



function WeatherIcon({ icon }, {}) {
  const iconSize = 100;
  return (
    <div class="weather-icon">
      <svg id={`weather-${icon}`} x="0px" y="0px"
           width={`${iconSize}px`} height={`${iconSize}px`}
           viewBox="0 0 512 512" enableBackground="new 0 0 512 512">
        <path fill="#1D1D1B" d={weatherIcons[icon]} />
      </svg>
    </div>
  )
}

function WeatherStats({ weather, index }) {
  const decimals = 1;

  const dateString = index === 0 ? "Today" :
    index === 1 ? "Tomorrow" : getWeekDay(weather.time);

  return (
    <div class="weather-stats">
      <h3>
        <time dateTime={weather.time}>
          {dateString}
        </time>
      </h3>
      <div class="temperatures">
        <div>Hi: <span>{weather.temperatureMax.toFixed(decimals)
          + getUnits("temperatureMax")}</span></div>
        <div>Lo: <span>{weather.temperatureMin.toFixed(decimals)
          + getUnits("temperatureMin")}</span></div>
      </div>
    </div>
  )
}

export default function WeatherItem({ weather, index }, {}) {
  var className = "col-xs-10 col-xs-offset-1 col-md-6";
  const today = " today col-sm-offset-2 col-md-offset-3 col-lg-4 col-lg-offset-4 col-sm-8";
  const other = " col-sm-offset-0 col-md-offset-0 col-lg-3 col-lg-offset-2  col-sm-6";
  className += index === 0 ? today : other;

  return (
    <section class={index === 0 ? "weather-item clearfix" : "weather-item"}>
      <div class={className}>
        <div class="clearfix">
          <WeatherStats weather={weather} index={index} />
          <WeatherIcon icon={weather.icon} />
        </div>
        {index === 0 ? <div><p>{weather.summary}</p></div> : null}
      </div>
    </section>
  )
}
