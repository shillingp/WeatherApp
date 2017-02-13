import { h, Component } from "preact";

import { buttonValues } from "./buttons"



export default function ChartControls({ onClick, control }) {
  const items = Object.entries(buttonValues).map(([k, v], index) => {
    let className = "btn btn-default";
    className += (k === control) ? " active" : "";

    return (
      <button type="button" class={className}
              onClick={() => onClick(k)} key={index}>{v}</button>
    );
  });

  return (
    <div>{items}</div>
  )
}
