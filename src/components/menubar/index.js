import { h, Component } from 'preact';
import { bind } from "decko";

function Hamburger({ isOpen, onClick }) {
  let spans = Array(6).fill(<span />)

  return (
    <div id="hamburger" class={isOpen ? "open": ""}
         onClick={onClick}>
      {spans}
    </div>
  );
}

export default class MenuBar extends Component {
  state = {
    isOpen: false
  }

  @bind
  toggleMenu() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  @bind
  closeMenu() {
    this.setState({
      isOpen: false
    });
  }

  render({}, { isOpen }) {
    const links = Object.entries({
      "/": "Home",
      "/hourly": "Hourly Data",
      "/minute": "Minute Data",
      "/contact": "Contact Me"
    });

    const items = links.map(([link, item], index) =>
      <li key={index} class="link col-xs-3">
      <a href={link} onClick={this.closeMenu}>{item}</a>
      </li>
    );

    return (
      <div id="menubar" class={isOpen ? "expanded" : ""}>
        <div class="links">
          <ul>{items}</ul>
        </div>
        <Hamburger isOpen={isOpen} onClick={this.toggleMenu}/>
      </div>
   );
  }
}
