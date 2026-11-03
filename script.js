const welcome = document.getElementById("welcome");
const videoPage = document.getElementById("videoPage");
const openGiftButton = document.getElementById("openGift");
const birthdayVideo = document.getElementById("birthdayVideo");
const replayButton = document.getElementById("replayVideo");
const sparkleContainer = document.getElementById("sparkles");

// The replay button stays hidden until the video reaches its end.
replayButton.hidden = true;
birthdayVideo.addEventListener("ended", () => {
  replayButton.hidden = false;
});

function createSparkle() {
  if (!sparkleContainer) return;

  const sparkle = document.createElement("span");
  sparkle.className = "sparkle";
  sparkle.textContent = Math.random() > 0.5 ? "✦" : "✧";
  sparkle.style.left = `${Math.random() * 100}%`;
  sparkle.style.fontSize = `${10 + Math.random() * 17}px`;
  sparkle.style.setProperty("--duration", `${6 + Math.random() * 5}s`);
  sparkleContainer.appendChild(sparkle);

  sparkle.addEventListener("animationend", () => sparkle.remove(), { once: true });
}

let sparkleTimer;

function startSparkles() {
  if (sparkleTimer) return;
  createSparkle();
  sparkleTimer = window.setInterval(createSparkle, 450);
}

openGiftButton.addEventListener("click", async () => {
  welcome.hidden = true;
  videoPage.hidden = false;
  startSparkles();

  // Playback is initiated by the click, which allows browsers to start the video.
  try {
    await birthdayVideo.play();
  } catch (error) {
    // If autoplay is blocked, the visible video controls let the visitor start it.
    console.info("Press play on the video to begin playback.", error);
  }
});

replayButton.addEventListener("click", async () => {
  replayButton.hidden = true;
  birthdayVideo.currentTime = 0;
  try {
    await birthdayVideo.play();
  } catch (error) {
    console.info("Press play on the video to begin playback.", error);
  }
});
