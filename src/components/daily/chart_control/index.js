import { h, Component } from "preact";


export default class ChartControls extends Component {
  state = {
    // buttons: ["precipIntensity", "precipProbability", "temperature", "apparentTemperature", "dewPoint", "humidity", "windSpeed", "visibility", "cloudCover", "pressure", "ozone"];

    buttons: {
      precipIntensity: "Rain Fall",
      precipProbability: "Chance of Rain",
      temperature: "Temperature",
      apparentTemperature: "Apparent Temperature",
      dewPoint: "Dew",
      humidity: "Humidity",
      windSpeed: "windSpeed",
      visibility: "Visibility",
      pressure: "Pressure",
      ozone: "Ozone"
    }
  };

  render({ onClick }, { buttons }) {
    const items = Object.entries(buttons).map(([k, v]) =>
      <button type="button" class="btn btn-default"
              onClick={() => onClick(k)}>{v}</button>
    );

    return (
      <div>
        {items}
      </div>
    );
  }
}
