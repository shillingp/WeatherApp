import { h, Component } from "preact";

import { WeatherStore } from "../stores";
import WeatherChart from "./weather_chart";


export default class DayView extends Component {
  render({ weather }, state) {
    return (
      <div class="day-view">
  			<div class="row">
          <WeatherChart weather={ weather } />
  			</div>
  		</div>
    )
  }
}
