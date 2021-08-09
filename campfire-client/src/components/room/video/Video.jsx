import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import "./Video.css";
export default function Video({
  playList,
  currentPlaying,
  referenceVideo,
  play,
  pause,
  upNext,
}) {
  //Current videoURL of playlist
  const [videoUrl, setVideoUrl] = useState("");

  //Set current video Url
  useEffect(() => {
    if (playList.length === 0) {
      setVideoUrl("");
    } else {
      if (playList[currentPlaying] && playList[currentPlaying].link && playList[currentPlaying].link.includes("v=")) {
        console.log(playList[currentPlaying]);
        const newVideoUrl = playList[currentPlaying]?.link
          .split("v=")?.[1]
          .split("&")?.[0];
        if (newVideoUrl && videoUrl !== newVideoUrl) {
          setVideoUrl(newVideoUrl);
        }
      }
    }
  }, [currentPlaying]);

  let opts = {
    classname: "player",
    // height: "780", //225
    // width: "1410", //400
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      start: 0,
    },
  };

  return (
    <>
      <div class="player">
        <YouTube
          className="youtubePlayer"
          onReady={(event) => referenceVideo(event)}
          videoId={videoUrl}
          opts={opts}
          onPlay={() => play(true)}
          onPause={() => pause(true)}
          onEnd={() => upNext()}
          onStateChange={(event) => {
            if (event.data === -1) event.target.playVideo();
          }}
        />
      </div>
    </>
  );
}
