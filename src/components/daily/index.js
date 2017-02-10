import { h, Component } from "preact";

import { WeatherData } from "../weather_data";
import WeatherItem from "./weather_item";


export default class DayView extends Component {
  render() {
    var { hourly } = WeatherData.getState();
    hourly = hourly || [];

    const items = hourly.map((item, index) =>
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
