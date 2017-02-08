import { h, Component } from 'preact';

export default class WeatherWarning extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: true
    }

    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    var drawer = "panel-body"
    drawer += this.state.isOpen === false ? "" : " panel-collapsed"
    // const drawer = this.state.isOpen == true ? "panel-body" : "hidden panel-body";

    return (
      <div class="panel panel-danger">
        <div class="panel-heading" onClick={this.toggleDrawer}>
          <h3 class="panel-title">
            {this.props.item.title}
            <span>click to toggle information</span>
          </h3>
        </div>
        <div class={drawer}>
          <p class="summary">
            {this.props.item.description}
          </p>
        </div>
      </div>
    );
  }
}
