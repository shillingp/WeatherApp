import { h, Component } from 'preact';

import { WeatherStore } from "../stores";

import LocationSearch from "./location_search";
import WeatherItem from "./weather_item";
import WeatherWarning from "./weather_warning";

export default function WeekView() {
  let { daily, alerts } = WeatherStore.getState();
  daily = daily || [];
  alerts = alerts || [];

  const items = daily.map((item, index) =>
		<WeatherItem key={index} index={index} weather={item} />
	);
	const warnings = alerts.map((item, index) =>
		<WeatherWarning key={index} warning={item} />
	);

	return (
		<div class="week-view">
      <LocationSearch />
			<div class="row">
				{items}
			</div>
			<div class="alerts container">
				{warnings}
			</div>
		</div>
	);
}
