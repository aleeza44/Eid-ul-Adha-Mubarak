// Joyous Eid ul Adha greetings
const eidGreetings = [
  "✨ Eid ul Adha Mubarak! May Allah accept your sacrifices and bless your family.",
  "🐏 May your Eid be filled with peace, happiness, and endless barakah.",
  "💖 Sending warm duas and beautiful wishes to you this Eid ul Adha.",
  "🌙🤲 May Allah shower your home with mercy, joy, and success.",
  "🐑 Eid Mubarak! May your heart stay filled with gratitude and kindness.",
  "🌸 Wishing you smiles, laughter, and unforgettable Eid memories.",
  "🕊️ May all your prayers be accepted and your dreams come true.",
  "🎉🐪 Taqabbal Allahu minna wa minkum! Eid Mubarak to you and your loved ones!",
  "🌟 May the spirit of sacrifice bring you closer to Allah and your family.",
  "🧡🐏 May your home shine with the light of faith and joy this Eid!"
];

// DOM Elements
const desktopGreeting = document.getElementById("greetingText");
const mobileGreeting = document.getElementById("greetingTextMobile");
const girlLeft = document.getElementById("girlLeft");
const girlRight = document.getElementById("girlRight");
const mobileLeft = document.getElementById("mobileLeft");
const mobileRight = document.getElementById("mobileRight");
const bgMusic = document.getElementById("bgMusic");
const fireSound = document.getElementById("fireSound");

let currentIndex = 0;
let musicStarted = false;
let rotationInterval;

// Update greeting and swap poses
function updateGreetingAndPose() {
  const newMessage = eidGreetings[currentIndex];
  
  if (desktopGreeting) desktopGreeting.textContent = newMessage;
  if (mobileGreeting) mobileGreeting.textContent = newMessage;
  
  const showLeft = (currentIndex % 2 === 0);
  
  if (girlLeft && girlRight) {
    girlLeft.style.opacity = showLeft ? "1" : "0";
    girlRight.style.opacity = showLeft ? "0" : "1";
  }
  
  if (mobileLeft && mobileRight) {
    mobileLeft.style.opacity = showLeft ? "1" : "0";
    mobileRight.style.opacity = showLeft ? "0" : "1";
  }
  
  currentIndex++;
  if (currentIndex >= eidGreetings.length) currentIndex = 0;
}

// Massive firework burst (bigger and more spectacular)
function burstMassiveFireworks() {
  const isMobile = window.innerWidth <= 750;
  const particleCount = isMobile ? 18 : 35;
  
  for (let i = 0; i < particleCount; i++) {
    const spark = document.createElement("div");
    const xPos = Math.random() * window.innerWidth;
    const yPos = Math.random() * window.innerHeight * 0.7 + 20;
    
    spark.style.position = "fixed";
    spark.style.left = xPos + "px";
    spark.style.top = yPos + "px";
    spark.style.width = (Math.random() * 14 + 6) + "px";
    spark.style.height = spark.style.width;
    spark.style.borderRadius = "50%";
    
    const colors = ["#ff3366", "#ffcc00", "#33ff66", "#ff6600", "#ff44cc", "#44ffcc", "#ffaa44", "#ffffff", "#ff5599", "#55ff99"];
    spark.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    spark.style.boxShadow = "0 0 25px gold, 0 0 45px orange";
    spark.style.pointerEvents = "none";
    spark.style.zIndex = "9999";
    spark.style.animation = "bigPop 0.9s ease-out forwards";
    document.body.appendChild(spark);
    
    setTimeout(() => {
      if (spark && spark.remove) spark.remove();
    }, 900);
  }
  
  // Play sound
  if (musicStarted && fireSound) {
    fireSound.currentTime = 0;
    fireSound.volume = 0.3;
    fireSound.play().catch(e => console.log("Sound error:", e));
  }
}

// Add animation keyframes
if (!document.querySelector("#bigPopKeyframes")) {
  const style = document.createElement("style");
  style.id = "bigPopKeyframes";
  style.textContent = `
    @keyframes bigPop {
      0% { transform: scale(0); opacity: 1; }
      40% { transform: scale(1.8); opacity: 1; }
      100% { transform: scale(4); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

// Start automatic greeting rotation
function startRotation() {
  if (rotationInterval) clearInterval(rotationInterval);
  updateGreetingAndPose();
  rotationInterval = setInterval(updateGreetingAndPose, 5000);
}

// Enable music and fireworks on user interaction
function enableFestiveMode() {
  if (!musicStarted) {
    musicStarted = true;
    
    if (bgMusic) {
      bgMusic.volume = 0.15;
      bgMusic.play().catch(e => console.log("Music error:", e));
    }
    
    // Initial massive burst
    burstMassiveFireworks();
    
    // Periodic massive fireworks every 4 seconds
    setInterval(() => {
      if (musicStarted) burstMassiveFireworks();
    }, 4000);
  } else {
    burstMassiveFireworks();
  }
}

// Event listeners
document.body.addEventListener("click", enableFestiveMode);
document.body.addEventListener("touchstart", enableFestiveMode);

// Initialize
startRotation();

// Set initial pose (left girl active)
if (girlLeft && girlRight) {
  girlLeft.style.opacity = "1";
  girlRight.style.opacity = "0";
}
if (mobileLeft && mobileRight) {
  mobileLeft.style.opacity = "1";
  mobileRight.style.opacity = "0";
}

// Sheep fallback
window.addEventListener("load", () => {
  const sheep = document.getElementById("sheepImg");
  if (sheep && sheep.complete && sheep.naturalWidth === 0) {
    sheep.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='70' fill='%23FFF5E6' stroke='%23D4A373' stroke-width='3'/%3E%3Ccircle cx='70' cy='85' r='18' fill='%23E8D5B5'/%3E%3Ccircle cx='130' cy='85' r='18' fill='%23E8D5B5'/%3E%3Ccircle cx='75' cy='82' r='6' fill='%233D2B1A'/%3E%3Ccircle cx='125' cy='82' r='6' fill='%233D2B1A'/%3E%3Cpath d='M85 110 Q100 125 115 110' stroke='%238B5A2B' fill='none' stroke-width='4'/%3E%3Crect x='80' y='140' width='40' height='30' rx='8' fill='%23C28B5E'/%3E%3Ccircle cx='85' cy='172' r='12' fill='%23A2704A'/%3E%3Ccircle cx='115' cy='172' r='12' fill='%23A2704A'/%3E%3Ctext x='45' y='45' font-size='35' fill='%23FFD966'%3E🐏%3C/text%3E%3C/svg%3E";
  }
});
