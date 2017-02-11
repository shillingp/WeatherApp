import { h, Component } from "preact";

import { WeatherStore } from "../stores";
import WeatherItem from "./weather_item";


export default class DayView extends Component {
  render() {
    const { hourly } = WeatherStore.getState();

    const items = (hourly || []).map((item, index) =>
      <WeatherItem key={item.time} weather={item} />
    );

    return (
      <div class="day-view">
  			<div class="row">
          {items}
  			</div>
  		</div>
    )
  }
}
