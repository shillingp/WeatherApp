import { h, Component } from 'preact';
import { Router, Route } from 'preact-router';

import "bootstrap/dist/css/bootstrap.css";

import { WeatherStore } from "./stores";
import { gatherDataUsingLocation } from "./weather_data";

import Heading from "./header";
import Footer from "./footer";
import SideBar from "./sidebar";
import WeekView from "./weekly";
import DayView from "./daily";


function AppManager({ children }) {
  return (
    <div id="app">
      <SideBar />
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
        <Router>
          <WeekView path="/" weather={daily} alerts={warnings} />
          <DayView path="/hourly" weather={hourly} />
        </Router>
      </AppManager>
    );
  }
}
