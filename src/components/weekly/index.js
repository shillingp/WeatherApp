import { h, Component } from 'preact';

import LocationSearch from "./location_search";
import WeatherItem from "./weather_item";
import WeatherWarning from "./weather_warning";

export default function WeeklyView(props) {
  props.items = props.items || [];
  props.warnings = props.warnings || [];

  const items = props.items.map((item, index) => {
		return <WeatherItem key={item.time} index={index} item={item} />
	});
	const warnings = props.warnings.map((item, index) => {
		return <WeatherWarning key={item.time} item={item} />
	});

	return (
		<div class="weekly-view">
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
