import React, { useEffect, useState, useRef } from "react";
import YouTube from "react-youtube";
export default function Video({ socket }) {
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

  const referenceVideo = (event) => {
    videoRef.current = event.target;
    console.log("________________________________", videoRef.current);
  };
  // video commands
  const start = (isOrigin) => {
    if (isOrigin) {
      socket.emit("VIDEO_CONTROLS", "start");
    }
  };

  const play = (isOrigin) => {
    videoRef.current.playVideo();
    if (isOrigin) {
      socket.emit("VIDEO_CONTROLS", "play");
    }
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
        if (control === "play") {
          play(false);
        }
      });
  }, [socket]);

  return (
    <>
      <div id="player">
        {" "}
        <input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
        <YouTube
          onReady={referenceVideo}
          videoId={videoCode}
          opts={opts}
          onPause={() => console.log("pause")}
          onStateChange={(e) => console.log(e.target.getCurrentTime())}
        />{" "}
      </div>
      <button onClick={() => play(true)}>play </button>
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
