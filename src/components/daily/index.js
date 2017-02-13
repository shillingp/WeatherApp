import { h, Component } from "preact";

import { WeatherStore } from "../stores";
import WeatherChart from "./weather_chart";
import ChartControls from "./chart_control";

export default class DayView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      control: "temperature"
    }

    this.changeData = this.changeData.bind(this);
  }

  changeData({ target: { value }}) {
    this.setState({
      control: value
    });
  }

  render({ weather }, { control }) {
    return (
      <div class="day-view">
        <div class="title-block">
          <h3>24 Hour Forecast</h3>
        </div>
  			<div class="row">
          <WeatherChart weather={weather} control={control} />
          <ChartControls onClick={this.changeData} control={control} />
  			</div>
  		</div>
    )
  }
}
