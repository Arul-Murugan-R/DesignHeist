let video = document.querySelector(".video");
let juice = document.querySelector(".black-juice");
let playPauseBtn = document.getElementById("pause-play");
let forward = document.getElementById("forward");
let backward = document.getElementById("backward");
let sideOverlayBtn = document.getElementById("rounded-chevron-left");
let sideTransition = document.getElementById("side-overlay");
let optionsBtn = document.querySelector("#options-btn button");
let threeDotsOverlay = document.getElementById("three-dots-overlay");
let progressBar = document.getElementById("grey-bar");
let fullScreen = document.getElementById("full-screen");
let timer = document.getElementById("timer");
let isclicked = false;
//function for play-pause
function togglePlayPause() {
	if (video.paused) {
		playPauseBtn.className = "fa-solid fa-pause fs-4 mx-1 forward-10";

		video.play();
	} else {
		playPauseBtn.className = "fa-solid fa-play fs-4 mx-1 forward-10";

		video.pause();
	}
}

//Adding play-pause functionality to the video

playPauseBtn.addEventListener("click", togglePlayPause);
video.addEventListener("fullscreenchange", function () {
	if (video.paused && playPauseBtn.classList.contains("fa-pause")) {
		playPauseBtn.classList.remove("fa-pause");
		playPauseBtn.classList.add("fa-play");
	} else {
		playPauseBtn.classList.remove("fa-play");
		playPauseBtn.classList.add("fa-pause");
	}
});

console.log(playPauseBtn.classList.contains("fa-pause"));

//increasing the width for the bar as the video gets updated every-second

video.addEventListener("timeupdate", function () {
	let juicePosition = video.currentTime / video.duration;
	juice.style.width = juicePosition * 100 + "%";
	if (video.currentTime != video.duration) {
		juice.classList.remove("black-juice-completed");
	} else {
		juice.classList.add("black-juice-completed");
	}
	if (video.currentTime === video.duration) {
		playPauseBtn.classList.add("fa-play");
	}

	let time = Math.floor(video.currentTime);
	let minutes = Math.floor(time / 60);
	let seconds = time - minutes * 60;
	let hour = Math.floor(minutes / 60);

	// Setting Timer

	if (seconds < 10 && minutes < 10 && hour < 10) {
		timer.textContent = `0${hour}.0${minutes}.0${seconds}`;
	} else if (seconds < 10 && minutes > 10 && hour < 10) {
		timer.textContent = `0${hour}.${minutes}.0${seconds}`;
	} else if (seconds > 10 && minutes < 10 && hour < 10) {
		timer.textContent = `0${hour}.0${minutes}.${seconds}`;
	} else if (seconds < 10 && minutes < 10 && hour > 10) {
		timer.textContent = `${hour}.0${minutes}.0${seconds}`;
	} else {
		timer.textContent = `${minutes}.${seconds}`;
	}
});

// adding forward +5 and backward -5 for the video
forward.addEventListener("click", function () {
	video.currentTime += 5;
});
backward.addEventListener("click", function () {
	video.currentTime -= 5;
});

// side-overlay with a smooth transition on clicking the beautiful chevron buttons moving left and right on clicking respectively

sideOverlayBtn.addEventListener("click", function () {
	let width = sideTransition.offsetWidth;
	width -= Math.floor(sideOverlayBtn.offsetWidth / 3);
	console.log(width);
	if (!isclicked) {
		sideTransition.style.transform = "translateX(0)";
		sideOverlayBtn.style.transform = `translateX(-${width + 5}px)`;
		sideOverlayBtn.innerHTML =
			"<i class='fa-solid fa-circle-chevron-right fa-3x'></i>";
		isclicked = true;
	} else {
		sideTransition.style.transform = "translateX(100%)";
		sideOverlayBtn.style.transform = `translateX(25%)`;
		sideOverlayBtn.innerHTML =
			"<i class='fa-solid fa-circle-chevron-left fa-3x'></i>";

		isclicked = false;
	}
});

// increasingthe  width of the juice to the click on the offsetx coordinate
progressBar.addEventListener("click", (event) => {
	let videoDuration = video.duration;
	let progressWidthValue = progressBar.clientWidth;
	let clickOffsetX = event.offsetX;

	video.currentTime = (clickOffsetX / progressWidthValue) * videoDuration;
	juice.style.width = `${(clickOffsetX / progressWidthValue) * 100}%`;
});

//Adding FullScreen to the video

function openFullscreen() {
	if (video.requestFullscreen) {
		video.requestFullscreen();
	} else if (video.webkitRequestFullscreen) {
		/* Safari */
		video.webkitRequestFullscreen();
	} else if (video.msRequestFullscreen) {
		/* IE11 */
		video.msRequestFullscreen();
	}
}
fullScreen.addEventListener("click", openFullscreen);
