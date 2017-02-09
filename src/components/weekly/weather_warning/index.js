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
  // render(props, state)
  render({ item }, { isOpen }) {
    const drawer = isOpen ? "panel-body" : "panel-body panel-collapsed";

    return (
      <div class="panel panel-danger">
        <div class="panel-heading" onClick={this.toggleDrawer}>
          <h3 class="panel-title">
            {item.title}
            <span>click to toggle information</span>
          </h3>
        </div>
        <div class={drawer}>
          <p class="summary">
            {item.description}
          </p>
        </div>
      </div>
    );
  }
}
