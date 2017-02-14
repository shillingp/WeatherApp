import { h, Component } from "preact";


export default function Footer(props) {
  // NEED TO FIX FOR MOBILE (XS) VIEW
  return (
    <footer>
      <div class="foot">
        <div className="container">
          <div className="pull-left">
            <a href="https://darksky.net/poweredby/">Powered by Dark Sky</a>
          </div>
          <div className="pull-right">
            Site created by <a href="https://github.com/shillingp">Peter Shilling</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
