import { h, Component } from 'preact';

import WeatherItem from "./weather_item";
import WeatherWarning from "./weather_warning";


export default function WeekView({ weather, alerts }) {
  const items = (weather || []).map((item, index) =>
		<WeatherItem key={index} index={index} weather={item} />
	);
	const warnings = (alerts || []).map((item, index) =>
		<WeatherWarning key={index} warning={item} />
	);

	return (
		<div class="week-view">
			<div class="row">
				{items}
			</div>
			<div class="alerts container">
				{warnings}
			</div>
		</div>
	);
}
