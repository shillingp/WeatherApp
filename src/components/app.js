import { h, Component } from 'preact';
import { Router, Route, IndexRoute, Link, browserHistory } from 'preact-router';

import "./helpers";

import "bootstrap/dist/css/bootstrap.css";

import { WeatherData, gatherData, gatherDataUsingLocation } from "./weather_data";

import Heading from "./header";
import Footer from "./footer";

import SideBar from "./sidebar";
import WeeklyView from "./weekly";



function AppManager(props) {
  return (
    <div id="app">
      <SideBar />
      <div id="weather-control">
        {props.children}
      </div>

      <Footer />
    </div>
  )
}

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      daily: [],
      warnings: []
    }

    this.updateStateInfo = this.updateStateInfo.bind(this);
  }

  updateStateInfo() {
    window.setTimeout(_ => {
      this.setState({
        daily: WeatherData.daily,
        warnings: WeatherData.alerts
      })
    }, 1);
  }

  componentWillMount() {
    gatherDataUsingLocation();

    WeatherData.watch("daily", (id, oldVal, newVal) => {
        this.updateStateInfo();
        return newVal;
    });
    // WeatherData.watch("alerts", (id, oldVal, newVal) => {
    //     this.updateStateInfo();
    //     return newVal;
    // });
  }



  render() {
    return (
      <AppManager histroy={browserHistory} >
        <Router>
          <WeeklyView path="/" items={this.state.daily} warnings={this.state.warnings} />
          <SideBar path="/daily" weather={this.state.daily[6]} />
        </Router>
      </AppManager>
    );
  }
}



// export default class App extends Component {
// 	/** Gets fired when the route changes.
// 	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
// 	 *	@param {string} event.url	The newly routed URL
// 	 */
//
// 	handleRoute = e => {
// 		this.currentUrl = e.url;
// 	};
//
// 	render() {
// 		return (
// 			<div id="app">
// 				<Header />
// 				<Router onChange={this.handleRoute}>
// 					<Home path="/" />
// 					<Profile path="/profile/" user="me" />
// 					<Profile path="/profile/:user" />
// 				</Router>
// 			</div>
// 		);
// 	}
// }
