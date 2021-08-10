import React from "react";
import "./About.css"
export default function About() {
  return (
    <>
      <div id="mainBody">
        <h1 id="aboutPgTitle">OUR MISSION</h1>
        <p id="aboutPageText"> 
        During COVID, we found it difficult to connect with our friends online while staying safe at home. <br/>
        This is how the idea for Campfire was born. We wanted to build a platform that would help people <br/>
        connect online, by making sure that people had a warm and cozy place to meet. Campfire allows <br/>
        friends to find, queue, and play YouTube videos while chatting together. <br/><br/>
        
        Gather around the Campfire and watch videos in sync
          from anywhere in the world.
        </p>

        <h1 id="aboutPgTitle">WHAT WE'RE MADE OF</h1>
        <p id="aboutPageText"> 
          By leveraging the power of Internet WebSockets, we provide a robust,
          real-time connection <br/> between you and everyone in your circle.
        </p>
      </div>

      <div id="madeByBody">
        <h2 id="madeByTitle">/ Made with ♥️&nbsp; by</h2>
        <ul>
          <li>
            <span className="madeByName">Hotae Kevin Kim</span>
          </li>
            <a href="https://github.com/htkim94">github</a> / <a href="mailto:hotae.kim.94@gmail.com">email</a>
            <li>&nbsp;</li>
          <li>
            <span className="madeByName">Andres Fernandez-Murray</span>
          </li>
            <a href="https://github.com/sudofer">github</a> / <a href="mailto:andres.fmurray@gmail.com">email</a>
            <li>&nbsp;</li>
          <li>
            <span className="madeByName">Vivian Cheung</span>  
          </li>
          <a href="https://github.com/vvncheung">github</a> / <a href="mailto:hi@viviancheung.ca">email</a>
        </ul>
      </div>
    </>
  );
}
