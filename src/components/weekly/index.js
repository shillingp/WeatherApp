import { h, Component } from 'preact';

import LocationSearch from "./location_search";
import WeatherItem from "./weather_item";
import WeatherWarning from "./weather_warning";

export default function WeeklyView({ items, warnings }) {
  items = items || [];
  warnings = warnings || [];

  const _items = items.map((item, index) => {
		return <WeatherItem key={item.time} index={index} item={item} />
	});
	const _warnings = warnings.map((item, index) => {
		return <WeatherWarning key={item.time} item={item} />
	});

	return (
		<div class="weekly-view">
      <LocationSearch />
			<div class="row">
				{_items}
			</div>
			<div class="alerts container">
				{_warnings}
			</div>
		</div>
	);
}
