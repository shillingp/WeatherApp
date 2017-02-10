import { h, Component } from "preact";

import { getUnits } from "../../helpers/units";


export default function WeatherItem({ weather }) {
  const items = Object.entries(weather).map(([key, val]) => {
    val += "" + getUnits(key);
    return <li><span>{key}</span> <span>{val}</span></li>
  })

  return (
    <section>
      <div>
        <ul>
          {items}
        </ul>
      </div>
    </section>
  );
}
