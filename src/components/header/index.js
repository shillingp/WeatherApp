import { h, Component } from 'preact';

import LocationSearch from "./location_search";

export default function Heading(props) {
  return (
    <div class="location-search container">
      <LocationSearch />
    </div>
  )
}
