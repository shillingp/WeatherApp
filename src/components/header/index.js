import { h, Component } from 'preact';

import style from "./style";

import LocationSearch from "./location_search";

export default function Heading(props) {
  return (
    <div class="location-search container">
      <LocationSearch />
    </div>
  )
}
