import { h, Component } from 'preact';


export default function SideBar(props) {
  const links = Object.entries({
    "/": "Home",
    "/hourly": "Hourly Data"
  });

  const items = links.map(([link, item]) =>
    <li><a href={link}>{item}</a></li>
  );

  return (
    <div id="sidebar">
      <div>
        {items}
      </div>
    </div>
 );
}
