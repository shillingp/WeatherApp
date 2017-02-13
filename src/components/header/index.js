import { h, Component } from 'preact';

import LocationSearch from "./location_search";

export default function Heading(props) {
  return (
    <div class="container">
      <LocationSearch />
    </div>
  )

  // return (
  //   <header>
  //     <div className="container">
  //       <h1>Weather App</h1>
  //     </div>
  //   </header>
  // )
}
