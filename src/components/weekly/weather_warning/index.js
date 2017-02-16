import { h, Component } from 'preact';
import { bind } from "decko";


export default class WeatherWarning extends Component {
  state = {
    isOpen: false
  }

  @bind
  toggleDrawer() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render({ warning }, { isOpen }) {
    const drawer = isOpen ? "panel-body" : "panel-body panel-collapsed";

    return (
      <div class="panel panel-danger">
        <div class="panel-heading" onClick={this.toggleDrawer}>
          <h3 class="panel-title">
            {warning.title}
            <span>click to toggle information</span>
          </h3>
        </div>
        <div class={drawer}>
          <p class="summary">
            {warning.description}
          </p>
        </div>
      </div>
    );
  }
}
