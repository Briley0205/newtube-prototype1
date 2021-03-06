const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const time = document.getElementById("time");
const volumeRange = document.getElementById("volume");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const leftTime = document.getElementById("leftTime");

let controlsTimeOut = null;
let controlsMovementTimeout = null;

let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlay = (e) => {
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
    playBtn.innerText = video.paused ? "Play" : "Pause";
}

const handleMute = (e) => {
    if(video.muted) {
        video.muted = false;
    } else {
        video.muted = true;
    }
    muteBtn.innerText = video.muted ? "Unmute" : "Mute";
    volumeRange.value = video.muted ? 0 : volumeValue;
}

const handleVolumeChange = (event) => {
    const { target: { value } } = event;
    if(video.muted) {
        video.muted = false;
        muteBtn.innerText = "Mute";
    }
    volumeValue = value;
    video.volume = value;
}

const formatTime = (seconds) => 
    new Date(seconds*1000).toISOString().substr(14, 5);

const handleLoadedMetaData = () => {
    totalTime.innerText = formatTime(Math.floor(video.duration));
    timeline.max = Math.floor(video.duration);
}
const handleTimeUpdate = () => {
    currentTime.innerText = formatTime(Math.floor(video.currentTime));
    const leftSeconds = video.duration - video.currentTime
    leftTime.innerText = formatTime(Math.floor(leftSeconds));
    timeline.value = video.currentTime;
}

const handleTimelineChange = (event) => {
    const { target: { value }, } = event;
    video.currentTime = value;
}

const handleFullScreen = () => {
    const fullScreen = document.fullscreenElement;
    if(fullScreen) {
        fullScreenBtn.innerText = "Exit Full Screen";
        document.exitFullscreen();
    } else {
        videoContainer.requestFullscreen();
        fullScreenBtn.innerText = "Exit Full Screen";
    }
    
}

const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
    if(controlsTimeOut) {
        clearTimeout(controlsTimeOut);
        controlsTimeOut = null;
    }
    if(controlsMovementTimeout) {
        clearTimeout(controlsMovementTimeout);
        controlsMovementTimeout = null;
    }
    videoControls.classList.add("showing");
    controlsMovementTimeout = setTimeout(hideControls, 2000)
}
const handleMouseLeave = () => {
    controlsTimeOut = setTimeout(hideControls, 2000);
}
const handleEnded = () => {
    const { id } = videoContainer.dataset;
    fetch(`/api/videos/${id}/view`, {
        method: "POST",
    });
}

playBtn.addEventListener("click", handlePlay);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);

video.addEventListener("loadedmetadata", handleLoadedMetaData);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("mousemove", handleMouseMove);
video.addEventListener("mouseleave", handleMouseLeave);
video.addEventListener("ended", handleEnded);

timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullScreen);
if (video.readyState == 4) {
    handleLoadedMetaData();
    handleTimeUpdate();
}

