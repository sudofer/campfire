import React, { useEffect, useState, useRef } from "react";
import YouTube from "react-youtube";
export default function Video({ socket, playList }) {
  const [videoUrl, setVideoUrl] = React.useState("");
  let videoCode;
  if (videoUrl) {
    videoCode = videoUrl.split("v=")[1].split("&")[0];
  }
  const checkElapsedTime = (e) => {
    const duration = e.target.getDuration();
    const currentTime = e.target.getCurrentTime();
    if (currentTime / duration > 0.95) {
      console.log("working...");
    }
  };
  const [currentPos, setCurrentPos] = useState(0);
  const videoRef = useRef();

  const onClick = (evt) => {
    console.log(evt);
  };

  const referenceVideo = (event) => {
    videoRef.current = event.target;
    // videoRef.current.addEventListener("onclick", onClick);
    // console.log("________________________________", videoRef.current);
    // const iFrame = videoRef.current.getIframe();
    // iFrame.onclick =(console.log);
  };
  // video commands
  const start = (isOrigin) => {
    if (isOrigin) {
      socket.emit("VIDEO_CONTROLS", "start");
    }
  };

  let time = 0;

  const play = (isOrigin, evt) => {
    videoRef.current.playVideo();
    //console.log(evt.target);
    //
    if (isOrigin) {
      socket.emit("VIDEO_CONTROLS", { type: "play", time: time });
    }
  };

  const pause = (isOrigin, evt) => {
    videoRef.current.pauseVideo();
    if (isOrigin) {
      socket.emit("VIDEO_CONTROLS", { type: "pause", time: time });
    }
    console.log("PAUSE FUNCTION");
  };

  const scroll = (isOrigin, evt) => {
    let currentTime = videoRef.current.getCurrentTime();
    console.log("-----------------**", evt);
    videoRef.current.seekTo(currentTime);
    if (isOrigin) {
      socket.emit("VIDEOS_CONTROLS", { type: "scroll", time: currentTime });
    }
  };

  const end = () => {
    console.log("END FUNCTION");
  };

  let opts = {
    height: "225", //810
    width: "400", //1440
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      start: 0,
    },
  };

  useEffect(() => {
    socket &&
      socket.on("VIDEO_CONTROLS", (control) => {
        console.log(control, "*******");
        if (control.type === "play") {
          play(false);
        } else if (control.type === "pause") {
          pause(false);
        } else if (control.type === "scroll") {
          scroll(false);
        }
      });
  }, [socket]);

  useEffect(() => {
    console.log("PLAYLIST HAS CHANGED");

    if (playList.length === 1) {
      console.log(playList[0].link);
      setVideoUrl(playList[0].link);
    }
  }, [playList]);

  return (
    <>
      <div id="player">
        {" "}
        <input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
        <YouTube
          onReady={referenceVideo}
          videoId={videoCode}
          opts={opts}
          //onPause={pause}
          onEnd={end}
          onClick={(evt) => scroll(true, evt)}
        />{" "}
      </div>
      <button onClick={(evt) => play(true, evt)}>play </button>
      <button onClick={(evt) => pause(true, evt)}>pause </button>
      <button
        onClick={() =>
          setVideoUrl("https://www.youtube.com/watch?v=EmFJPCDMKTw")
        }
      >
        start{" "}
      </button>
    </>
  );
}
