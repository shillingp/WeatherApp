import { h, Component } from 'preact';
import { Router, Route } from 'preact-router';

import "bootstrap/dist/css/bootstrap.css";

import { WeatherStore } from "./stores";
import { gatherDataUsingLocation } from "./weather_data";

import Heading from "./header";
import Footer from "./footer";
import MenuBar from "./menubar";
import WeekView from "./weekly";
import DayView from "./daily";


function AppManager({ children }) {
  return (
    <div id="app">
      <MenuBar />
      <div id="weather-control">
        <Heading />
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default class App extends Component {
  state = {
    daily: [],
    hourly: [],
    warnings: []
  };

  handleRoute = e => this.currentUrl = e.url;

  componentWillMount() {
    gatherDataUsingLocation();

    WeatherStore.subscribe(() =>
      this.setState({ ...WeatherStore.getState() })
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.daily.length === 0) {
      return false;
    }
  }

  render(props, { daily, hourly, warnings }) {
    return (
      <AppManager>
        <Router onChange={this.handleRoute}>
          <WeekView path="/" weather={daily} alerts={warnings} />
          <DayView path="/hourly" weather={hourly} />
        </Router>
      </AppManager>
    );
  }
}
