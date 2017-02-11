import { h, Component } from "preact";

import { WeatherStore } from "../../stores";


export default class WeatherChart extends Component {
  state = {
    yaxes: "temperature"
  }

  componentDidMount() {
    const ctx = this.canvas

    if (this.weatherChart) {
      console.log(this.weatherChart)
    }

    this.weatherChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [],
        datasets: [{
          label: "",
          data: [],
          backgroundColor: 'rgba(255, 99, 132, 0.2)'
        }]
      }
    });
  }

  shouldComponentUpdate({ weather }) {
    if (weather === null) {
      return false;
    }
    return true;
  }

  componentWillUpdate({ weather }, { yaxes }) {
    const labels = weather.map((item) => {
      return new Date(item.time * 1000)
        .toLocaleTimeString("en-us", {
          hour: "2-digit", minute: "2-digit"
        });
    })

    const items = weather.map((item) => {
      return item[yaxes]
    });

    this.weatherChart.data.datasets[0].data = items;
    this.weatherChart.data.datasets[0].label = yaxes;
    this.weatherChart.data.labels = labels;
    this.weatherChart.update();
  }

  render() {
    // Need to delete the old one
    return (
      <div class="weather-chart">
        <canvas width="300" height="200"
                ref={self => this.canvas = self}></canvas>
      </div>
    )
  }
}
