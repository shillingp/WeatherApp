import { h, Component } from 'preact';

import icons from "../../helpers/icons";
import { getUnits } from "../../helpers/units";
import { getWeekDay } from "../../helpers";



function WeatherIcon({ icon }, {}) {
  const iconSize = 100;
  return (
    <div class="weather-icon">
      <svg version="1.1" id={`weather-${icon}`}
           xmlns="http://www.w3.org/2000/svg"
           x="0px" y="0px" width={`${iconSize}px`} height={`${iconSize}px`}
           viewBox="0 0 512 512" enableBackground="new 0 0 512 512">
        <path fillRule="evenodd" clipRule="evenodd" fill="#1D1D1B"
              d={icons[icon]} />
      </svg>
    </div>
  )
}

function WeatherStats(props) {
  const dateString = props.index === 0 ? "Today" :
    props.index === 1 ? "Tomorrow" : getWeekDay(props.time);

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

export default function WeatherItem({ weather, index }, {}) {
  var className = "col-xs-10 col-xs-offset-1 col-md-4";
  const today = " today col-sm-offset-2 col-md-offset-4 col-lg-4 col-lg-offset-4 col-sm-8";
  const other = " col-sm-offset-0 col-md-offset-1 col-lg-3 col-lg-offset-2  col-sm-6";
  className += index === 0 ? today : other;

  return (
    <section class={index === 0 ? "weather-item clearfix" : "weather-item"}>
      <div class={className}>
        <div class="clearfix">
          <WeatherStats time={weather.time} tempHi={weather.temperatureMax}
                        tempLo={weather.temperatureMin} summary={weather.summary}
                        rainChance={weather.precipProbability} index={index} />
          <WeatherIcon icon={weather.icon} />
        </div>
        {index === 0 ? <div><p>{weather.summary}</p></div> : null}
      </div>
    </section>
  )
}
