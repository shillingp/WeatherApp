import { h, Component } from "preact";

import { gatherDataUsingLocation, getLocationFromName } from "../../weather_data"

export default class LocationSearch extends Component {
  state = {
    text: "Mexico City"
  };

  render() {
    return (
      <div class="input-group">
        <input type="text" class="form-control"
               onInput={this.linkState("text")} />
        <span class="input-group-btn">
          <button class="btn btn-default" type="button"
                  onClick={_ => getLocationFromName(this.state.text)}>Search</button>
          <button class="btn btn-default" type="button"
                  onClick={gatherDataUsingLocation}>
            <span class="glyphicon glyphicon-map-marker" />
          </button>
        </span>
      </div>
    );
  }
}
