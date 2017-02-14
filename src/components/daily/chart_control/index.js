import { h, Component } from "preact";

import { buttonValues } from "./buttons"


export default function ChartControls({ onClick, control }) {
  const items = Object.entries(buttonValues)
    .sort((a, b) => a[1] > b[1])
    .map(([k, v]) =>
      <option key={k} value={k} selected={k === control}>{v}</option>
  );

  return (
    <div class="chart-controls">
      <select class="form-control " onChange={onClick}>
        {items}
      </select>
    </div>
  )
}
