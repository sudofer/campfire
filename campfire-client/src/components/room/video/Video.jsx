import React from "react";
import YouTube from "react-youtube";
export default function Video() {
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

  const opts = {
    height: "810",
    width: "1440",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <>
      <div id="player">
        {" "}
        <input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
        <YouTube
          videoId={videoCode}
          opts={opts}
          onStateChange={(e) => checkElapsedTime(e)}
          onPause={() => console.log("pause")}
        />{" "}
      </div>
    </>
  );
}
