import { h, Component } from 'preact';
import { Link } from "preact-router";


export default function SideBar(props) {
  // props.weather = props.weather || [];

  const links = Object.entries({
    "/": "Home",
    "/daily": "Daily View",
  });

  const items = links.map((item, index) =>
    <li><a href={item[0]}>{item[1]}</a></li>
  );

  return (
    <div id="sidebar">
      <div>
        {items}
      </div>
    </div>
 )
}
