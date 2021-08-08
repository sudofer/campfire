import React, { useEffect, useState, useRef } from "react";
import YouTube from "react-youtube";
export default function Video({
  socket,
  playList,
  url,
  currentPlaying,
}) {
  //Current videoURL of playlist
  const [videoUrl, setVideoUrl] = useState("");

  //Ref??
  const videoRef = useRef();

  //Set current video Url
  useEffect(() => {
    if (playList.length === 0) {
      setVideoUrl("");
    } else {
      if (playList[currentPlaying] && playList[currentPlaying].link) {
        const newVideoUrl = playList[currentPlaying].link
          .split("v=")[1]
          .split("&")[0];
        if (videoUrl !== newVideoUrl) {
          setVideoUrl(newVideoUrl);
        }
      }
    }
  }, [currentPlaying]);

  //Reference the video on ready
  const referenceVideo = (event) => {
    videoRef.current = event.target;
  };

  //Play video function
  const play = (isOrigin) => {
    videoRef.current.playVideo();
    if (isOrigin) {
      socket.emit("VIDEO_CONTROLS", { url, type: "play" });
    }
  };

  //Pause video function
  const pause = (isOrigin) => {
    videoRef.current.pauseVideo();
    if (isOrigin) {
      socket.emit("VIDEO_CONTROLS", { url, type: "pause" });
    }
  };

  //Sync video function
  const sync = (isOrigin, time) => {
    if (!time) {
      time = videoRef.current.getCurrentTime();
    }
    videoRef.current.seekTo(time, true);
    if (isOrigin) {
      socket.emit("VIDEO_CONTROLS", { url, type: "sync", time });
    }
  };

  //Play next video
  const upNext = () => {
    let nextPlayListIndex = currentPlaying + 1;
    if (!playList[nextPlayListIndex]) nextPlayListIndex = null;
    socket.emit("PLAYLIST_CONTROLS", {
      url,
      type: "upNext",
      index: nextPlayListIndex,
    });
  };

  useEffect(() => {
    socket &&
      socket.on("VIDEO_CONTROLS", (control) => {
        if (control.type === "play") {
          play(false);
        } else if (control.type === "pause") {
          pause(false);
        } else if (control.type === "sync") {
          sync(false, control.time);
        }
      });
  }, [socket]);

  let opts = {
    classname: 'player',
    height: "810", //225
    width: "1440", //400
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      start: 0,
    },
  };

  return (
    <>
      <div id="player">
        <YouTube
          onReady={referenceVideo}
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
      <button onClick={() => sync(true)}>sync</button>
    </>
  );
}
