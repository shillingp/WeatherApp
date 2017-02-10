import { h, Component } from 'preact';
import { Router, Route, IndexRoute, Link, browserHistory } from 'preact-router';

import "./helpers";

import "bootstrap/dist/css/bootstrap.css";

import { WeatherData, gatherDataUsingLocation } from "./weather_data";

import Heading from "./header";
import Footer from "./footer";

import SideBar from "./sidebar";
import WeeklyView from "./weekly";



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

    WeatherData.subscribe(() =>
      this.setState({ ...WeatherData.getState() }));
  }

  render(props, state) {
    return (
      <AppManager histroy={browserHistory} >
        <Router>
          <WeeklyView path="/" items={state.daily} warnings={state.warnings} />
          <SideBar path="/daily" weather={state.daily[6]} />
        </Router>
      </AppManager>
    );
  }
}
