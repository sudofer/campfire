import React from "react";
import "./About.css"
export default function About() {
  return (
    <>
      <div id="mainBody">
        <h1 id="aboutPgTitle">OUR MISSION</h1>
        <p>
          To build a dynamic and reactive environment for you to enjoy with your
          closest friends. Gather around the Campfire and watch videos in sync
          from anywhere in the world.
        </p>

        <h1 id="aboutPgTitle">WHAT WE'RE MADE OF</h1>
        <p>
          By leveraging the power of Internet WebSockets, we provide a robust,
          real-time connection between you and everyone in your circle.
        </p>
      </div>

      <div id="madeByBody">
        <h3 id="madeByTitle">/ Made with ♥️&nbsp; by</h3>
        <ul>
          <li>
            <span className="MuiTab-root">Hotae Kevin Kim</span>
          </li>
            <a href="https://github.com/htkim94">github</a> / <a href="mailto:hotae.kim.94@gmail.com">email</a>
            <li>&nbsp;</li>
          <li>
            <span className="MuiTab-root">Andres Fernandez-Murray</span>
          </li>
            <a href="https://github.com/sudofer">github</a> / <a href="mailto:andres.fmurray@gmail.com">email</a>
            <li>&nbsp;</li>
          <li>
            <span className="MuiTab-root">Vivian Cheung</span>  
          </li>
          <a href="https://github.com/vvncheung">github</a> / <a href="mailto:hi@viviancheung.ca">email</a>
        </ul>
      </div>
    </>
  );
}
