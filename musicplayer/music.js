
var audio = document.getElementById("myAudio");
var playPauseButton = document.getElementById("playPauseButton");

function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        playPauseButton.classList.add("playing");
    } else {
        audio.pause();
        playPauseButton.classList.remove("playing");
    }
}
