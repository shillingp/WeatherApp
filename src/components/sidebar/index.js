import { h, Component } from 'preact';


export default function SideBar(props) {
  const links = Object.entries({
    "/": "Home",
    "/hourly": "Hourly Data"
  });

  const items = links.map(([link, item], index) =>
    <li key={index}>
      <a href={link}>{item}</a>
    </li>
  );

  return (
    <div id="sidebar">
      <div>
        {items}
      </div>
    </div>
 );
}
