import { h, Component } from "preact";
import Chart from "chart.js";

import { WeatherStore } from "../stores";
import WeatherChart from "./weather_chart";


export default class DayView extends Component {
  render({ weather }, state) {
    // var { hourly } = WeatherStore.getState();
    // hourly = hourly || null;

    return (
      <div class="day-view">
  			<div class="row">
          <WeatherChart weather={ weather } />
  			</div>
  		</div>
    )
  }
}
