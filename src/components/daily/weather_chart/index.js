import { h, Component } from "preact";
import Chart from "chart.js";

import { WeatherStore } from "../../stores";
import { toTitleCase } from "../../helpers";

export default class WeatherChart extends Component {
  state = {
    yaxes: "temperature"
  }

  updateChart() {
    const { weather } = this.props;
    const { yaxes } = this.state;

    const labels = weather.map((item) => {
      return new Date(item.time * 1000)
        .toLocaleTimeString("en-US", {
          hour: "2-digit", minute: "2-digit"
        });
    })

    const items = weather.map((item) => {
      return item[yaxes]
    });

    this.weatherChart.data.datasets[0].data = items;
    this.weatherChart.data.datasets[0].label = toTitleCase(yaxes);
    this.weatherChart.data.labels = labels;
    this.weatherChart.update();
  }

  componentDidMount() {
    const ctx = this.canvas;

    const options = {
      animation: false,
      hover: {
        mode: "x",
        intersect: false
      },
      tooltips: {
        mode: "x",
        intersect: false
      },
      legend: {
        display: false
      },
      elements: {
        point: {
          radius: 4,
          hoverRadius: 5,
          hitRadius: 2
        }
      }
    };

    this.weatherChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [],
        datasets: [{
          label: "",
          data: [],
          backgroundColor: "rgba(151,187,205,0.2)",
          pointBackgroundColor: "#fff",
          borderColor: "rgba(151,187,205,1)",
          pointBorderWidth: 2
        }]
      },
      options: options
    });

    this.updateChart();
  }

  shouldComponentUpdate({ weather }) {
    if (weather === null) {
      return false;
    }
    return true;
  }

  componentWillUpdate() {
    this.updateChart();
  }

  componentWillUnmount() {
    this.weatherChart.destroy();
    this.ctx = null;
  }


  render() {
    return (
      <div class="weather-chart">
        <canvas width="600" height="200"
                ref={(self) => this.canvas = self} />
      </div>
    )
  }
}
