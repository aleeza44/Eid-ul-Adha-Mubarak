// Array of joyous Eid ul Adha greetings
const greetings = [
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

// Desktop elements
const greetingDesktop = document.getElementById("greeting");
const girlLeft = document.getElementById("girlLeft");
const girlRight = document.getElementById("girlRight");

// Mobile elements
const greetingMobile = document.getElementById("greetingMobile");
const mobileGirlLeft = document.getElementById("mobileGirlLeft");
const mobileGirlRight = document.getElementById("mobileGirlRight");

const bgMusic = document.getElementById("bgMusic");
const fireSound = document.getElementById("fireSound");

let greetingIndex = 0;
let musicStarted = false;
let isTransitioning = false;

// Function to update BOTH desktop and mobile greetings and poses
function updateGreetingAndPose() {
  if (isTransitioning) return;
  isTransitioning = true;
  
  const currentGreeting = greetings[greetingIndex];
  
  // Update text without fade on mobile to reduce glitching
  if (greetingDesktop) {
    greetingDesktop.style.opacity = "0";
    setTimeout(() => {
      greetingDesktop.innerText = currentGreeting;
      greetingDesktop.style.opacity = "1";
    }, 150);
  }
  
  if (greetingMobile) {
    greetingMobile.innerText = currentGreeting;
  }
  
  // Alternate between poses
  if (greetingIndex % 2 === 0) {
    // Left girl active (peace sign)
    if (girlLeft) {
      girlLeft.style.opacity = "1";
      girlRight.style.opacity = "0";
    }
    if (mobileGirlLeft) {
      mobileGirlLeft.style.opacity = "1";
      mobileGirlRight.style.opacity = "0";
    }
  } else {
    // Right girl active (waving)
    if (girlLeft) {
      girlLeft.style.opacity = "0";
      girlRight.style.opacity = "1";
    }
    if (mobileGirlLeft) {
      mobileGirlLeft.style.opacity = "0";
      mobileGirlRight.style.opacity = "1";
    }
  }
  
  greetingIndex++;
  if (greetingIndex >= greetings.length) {
    greetingIndex = 0;
  }
  
  setTimeout(() => {
    isTransitioning = false;
  }, 200);
}

// Function to trigger extra firework particles (reduced on mobile)
function burstExtraFireworks() {
  const isMobile = window.innerWidth <= 850;
  const particleCount = isMobile ? 8 : 18;
  
  for (let i = 0; i < particleCount; i++) {
    const spark = document.createElement("div");
    const xPos = Math.random() * window.innerWidth;
    const yPos = Math.random() * window.innerHeight * 0.6 + 30;
    spark.style.position = "fixed";
    spark.style.left = xPos + "px";
    spark.style.top = yPos + "px";
    spark.style.width = (Math.random() * 8 + 4) + "px";
    spark.style.height = spark.style.width;
    spark.style.borderRadius = "50%";
    const colors = ["#ffeb3b", "#ff4081", "#00e5ff", "#ff9100", "#69f0ae", "#ea80fc", "#ffd740", "#ffffff"];
    spark.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    spark.style.boxShadow = "0 0 15px gold, 0 0 30px orange";
    spark.style.pointerEvents = "none";
    spark.style.zIndex = "999";
    spark.style.animation = "popFirework 0.8s ease-out forwards";
    document.body.appendChild(spark);
    
    setTimeout(() => {
      if (spark && spark.remove) spark.remove();
    }, 800);
  }
  
  if (musicStarted && fireSound) {
    fireSound.currentTime = 0;
    fireSound.volume = 0.25;
    fireSound.play().catch(e => console.log("Audio error:", e));
  }
}

// Add dynamic style for extra firework animation
if (!document.querySelector("#fireworkStyle")) {
  const styleSheet = document.createElement("style");
  styleSheet.id = "fireworkStyle";
  styleSheet.textContent = `
    @keyframes popFirework {
      0% { transform: scale(0); opacity: 1; }
      100% { transform: scale(3); opacity: 0; }
    }
  `;
  document.head.appendChild(styleSheet);
}

// Start auto-changing greetings and poses every 5 seconds
updateGreetingAndPose();
let interval = setInterval(updateGreetingAndPose, 5000);

// Start joyful experience on user click (only once)
function startJoyfulExperience() {
  if (!musicStarted) {
    musicStarted = true;
    if (bgMusic) {
      bgMusic.volume = 0.15;
      bgMusic.play().catch(e => console.log("Music error:", e));
    }
    burstExtraFireworks();
    
    // Periodic fireworks (less frequent on mobile)
    const fireworkInterval = setInterval(() => {
      if (musicStarted) {
        burstExtraFireworks();
      }
    }, window.innerWidth <= 850 ? 6000 : 4000);
  } else {
    burstExtraFireworks();
  }
}

// Use passive event listeners for better scroll performance
document.body.addEventListener("click", startJoyfulExperience, { passive: false });
document.addEventListener("touchstart", startJoyfulExperience, { passive: false });

// Periodic fireworks on greeting change
setInterval(() => {
  if (musicStarted) {
    burstExtraFireworks();
  }
}, 6000);

// Initial state: Left girl active (peace sign)
if (girlRight) girlRight.style.opacity = "0";
if (girlLeft) girlLeft.style.opacity = "1";
if (mobileGirlRight) mobileGirlRight.style.opacity = "0";
if (mobileGirlLeft) mobileGirlLeft.style.opacity = "1";

// Sheep image fallback
window.addEventListener("load", () => {
  const sheep = document.getElementById("sheepImg");
  if (sheep && sheep.naturalWidth === 0) {
    sheep.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='70' fill='%23FFF5E6' stroke='%23D4A373' stroke-width='3'/%3E%3Ccircle cx='70' cy='85' r='18' fill='%23E8D5B5'/%3E%3Ccircle cx='130' cy='85' r='18' fill='%23E8D5B5'/%3E%3Ccircle cx='75' cy='82' r='6' fill='%233D2B1A'/%3E%3Ccircle cx='125' cy='82' r='6' fill='%233D2B1A'/%3E%3Cpath d='M85 110 Q100 125 115 110' stroke='%238B5A2B' fill='none' stroke-width='4'/%3E%3Crect x='80' y='140' width='40' height='30' rx='8' fill='%23C28B5E'/%3E%3Ccircle cx='85' cy='172' r='12' fill='%23A2704A'/%3E%3Ccircle cx='115' cy='172' r='12' fill='%23A2704A'/%3E%3Ctext x='45' y='45' font-size='35' fill='%23FFD966'%3E🐏%3C/text%3E%3C/svg%3E";
  }
});
