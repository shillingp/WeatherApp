import { h, Component } from "preact";
import Chart from "chart.js";

import { toTitleCase } from "../../helpers";
import { getUnits } from "../../helpers/units";


export default class WeatherChart extends Component {
  state = {
    yaxes: "temperature"
  }

  updateChart() {
    var { weather } = this.props;
    var { yaxes } = this.state;

    const labels = weather.map(item =>
      new Date(item.time * 1000)
        .toLocaleTimeString("en-US", {
          hour: "2-digit", minute: "2-digit"
        })
    );

    const items = weather.map(item =>
      item[yaxes]
    );

    this.weatherChart.data.datasets[0].data = items;
    this.weatherChart.data.datasets[0].label = toTitleCase(yaxes);
    this.weatherChart.data.labels = labels;
    this.weatherChart.update();
  }

  componentDidMount() {
    const { yaxes } = this.state;

    const options = {
      responsive: true,
      hover: {
        mode: "x",
        intersect: false
      },
      tooltips: {
        mode: "x",
        position: "nearest",
        intersect: false,
        displayColors: false,
        callbacks: {
          label: (tool, data) => {
            let label = data.datasets[tool.datasetIndex].label;
            return `${label}: ${tool.yLabel}${getUnits(this.state.yaxes)}`;
          }
        }
      },
      legend: {
        display: false
      },
      elements: {
        point: {
          radius: 4,
          hoverRadius: 5,
          hitRadius: 1
        }
      },
      scales: {
        xAxes: [{
          gridLines: {
            color: "rgba(0, 0, 0, 0.05)"
          },
          ticks: {
            autoSkip: true,
            maxTicksLimit: 14
          }
        }],
        yAxes: [{
          gridLines: {
            color: "rgba(0, 0, 0, 0.05)"
          },
          ticks: {
            callback: val =>
              (Math.round(val * 10) / 10) + getUnits(this.state.yaxes)
          }
        }]
      }
    };

    this.weatherChart = new Chart(this.canvas, {
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
  }

  componentWillUpdate({ control }) {
    this.setState({
      yaxes: control
    }, this.updateChart);
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
