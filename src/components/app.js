import { h, Component } from 'preact';
import { Router, Route, IndexRoute, Link, browserHistory } from 'preact-router';

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
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default class App extends Component {
  state = {
    daily: [],
    warnings: []
  };

  componentWillMount() {
    gatherDataUsingLocation();

    WeatherStore.subscribe(() => {
      console.log(WeatherStore.getState().daily);
      this.setState({ ...WeatherStore.getState() });
    });
  }

  render(props, state) {
    return (
      <AppManager histroy={browserHistory} >
        <Router>
          <WeekView path="/" />
          <DayView path="/hourly" />
        </Router>
      </AppManager>
    );
  }
}
