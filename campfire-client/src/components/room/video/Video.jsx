import React, { useEffect, useState, useRef } from "react";
import YouTube from "react-youtube";
export default function Video({
  socket,
  playList,
  setPlayList,
  url,
  currentPlaying,
  setCurrentPlaying,
}) {
  //Current videoURL of playlist
  const [videoUrl, setVideoUrl] = useState("");
  console.log("video URL", videoUrl);
  console.log("socket id", socket && socket.id);

  //Ref??
  const videoRef = useRef();

  //Set current video Url
  useEffect(() => {
    if (playList.length === 0) {
      setVideoUrl("");
    } else {
      if (playList[currentPlaying]) {
        const newVideoUrl = playList[currentPlaying].link
          .split("v=")[1]
          .split("&")[0];
        if (videoUrl !== newVideoUrl) {
          setVideoUrl(newVideoUrl);
        }
      }
    }
  }, [currentPlaying, playList, videoUrl]);

  //Reference the video on ready
  const referenceVideo = (event) => {
    videoRef.current = event.target;
    // videoRef.current.addEventListener("onclick", onClick);
    // console.log("________________________________", videoRef.current);
    // const iFrame = videoRef.current.getIframe();
    // iFrame.onclick =(console.log);
  };

  //Play video function
  const play = (isOrigin) => {
    videoRef.current.playVideo();
    if (isOrigin) {
      socket.emit("VIDEO_CONTROLS", { url, type: "play"});
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
    videoRef.current.seekTo(time);
    if (isOrigin) {
      socket.emit("VIDEO_CONTROLS", { url, type: "sync", time });
    }
  };

  //Seek video function
  // const syncTime = (isOrigin, time) => {
  //   if (!time) {
  //     time = videoRef.current.getCurrentTime();
  //   }
  //   if (isOrigin) {
  //     socket.emit("VIDEO_CONTROLS", { url, type: "syncTime", time });
  //   }
  //   videoRef.current.playVideo();
  // };

  //Clear playlist on end and play next
  const upNext = () => {
    // setPlayList((prev) => [...prev.slice(1)]);
    const nextPlayListIndex = currentPlaying + 1;
    socket.emit("PLAYLIST_CONTROLS", {
      url,
      type: "upNext",
      nextPlayListIndex,
    });
  };

  // const checkElapsedTime = (e) => {
  //   const duration = e.target.getDuration();
  //   const currentTime = e.target.getCurrentTime();
  //   if (currentTime / duration > 0.95) {
  //     console.log("working...");
  //   }
  // };
  // const [currentPos, setCurrentPos] = useState(0);

  // const end = () => {
  //   console.log("END FUNCTION");
  // };

  useEffect(() => {
    socket &&
      socket.on("VIDEO_CONTROLS", (control) => {
        if (control.type === "play") {
          play(false);
        } else if (control.type === "pause") {
          pause(false);
        } else if (control.type === "sync") {
          sync(false, control.time);
        // } else if (control.type === "syncTime") {
        //   videoRef.current.seekTo(control.time);
        }
      });
  }, [socket]);

  let opts = {
    height: "225", //810
    width: "400", //1440
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      // autoplay: 1,
      start: 0,
    },
  };

  return (
    <>
      <div id="player">
        {/* <input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} /> */}
        <YouTube
          onReady={referenceVideo}
          videoId={videoUrl}
          opts={opts}
          onPlay={() => play(true)}
          onPause={() => pause(true)}
          onEnd={() => upNext()}
          onStateChange={(event) => {
            console.log(event.data);
            if (event.data === -1) play(true);
          }}
        />
      </div>
      <button onClick={() => sync(true)}>sync</button>
    </>
  );
}
