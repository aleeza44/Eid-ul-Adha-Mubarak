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

// Update greeting text and swap poses
function updateGreetingAndPose() {
  const newMessage = eidGreetings[currentIndex];
  
  // Update both desktop and mobile text
  if (desktopGreeting) desktopGreeting.textContent = newMessage;
  if (mobileGreeting) mobileGreeting.textContent = newMessage;
  
  // Alternate poses: even index = left girl (peace sign), odd = right girl (waving)
  const showLeft = (currentIndex % 2 === 0);
  
  // Desktop poses
  if (girlLeft && girlRight) {
    girlLeft.style.opacity = showLeft ? "1" : "0";
    girlRight.style.opacity = showLeft ? "0" : "1";
  }
  
  // Mobile poses
  if (mobileLeft && mobileRight) {
    mobileLeft.style.opacity = showLeft ? "1" : "0";
    mobileRight.style.opacity = showLeft ? "0" : "1";
  }
  
  currentIndex++;
  if (currentIndex >= eidGreetings.length) currentIndex = 0;
}

// Simple firework burst (lightweight for mobile)
function burstFirework() {
  const isMobile = window.innerWidth <= 750;
  const particleCount = isMobile ? 8 : 16;
  
  for (let i = 0; i < particleCount; i++) {
    const spark = document.createElement("div");
    spark.style.position = "fixed";
    spark.style.left = Math.random() * window.innerWidth + "px";
    spark.style.top = Math.random() * window.innerHeight * 0.6 + 20 + "px";
    spark.style.width = (Math.random() * 8 + 4) + "px";
    spark.style.height = spark.style.width;
    spark.style.borderRadius = "50%";
    const colors = ["#ffeb3b", "#ff4081", "#00e5ff", "#ff9100", "#69f0ae", "#ea80fc", "#ffd740", "#ffffff"];
    spark.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    spark.style.boxShadow = "0 0 15px gold";
    spark.style.pointerEvents = "none";
    spark.style.zIndex = "9999";
    spark.style.animation = "popFire 0.7s ease-out forwards";
    document.body.appendChild(spark);
    
    setTimeout(() => {
      if (spark && spark.remove) spark.remove();
    }, 700);
  }
  
  // Play sound if music has started
  if (musicStarted && fireSound) {
    fireSound.currentTime = 0;
    fireSound.volume = 0.25;
    fireSound.play().catch(e => console.log("Sound play error:", e));
  }
}

// Add the pop animation keyframes if not exists
if (!document.querySelector("#popKeyframes")) {
  const style = document.createElement("style");
  style.id = "popKeyframes";
  style.textContent = `
    @keyframes popFire {
      0% { transform: scale(0); opacity: 1; }
      100% { transform: scale(2.5); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

// Start the automatic rotation
function startRotation() {
  if (rotationInterval) clearInterval(rotationInterval);
  updateGreetingAndPose();
  rotationInterval = setInterval(updateGreetingAndPose, 5000);
}

// First click/tap enables music and fireworks
function enableFestiveMode() {
  if (!musicStarted) {
    musicStarted = true;
    
    // Play background music
    if (bgMusic) {
      bgMusic.volume = 0.15;
      bgMusic.play().catch(e => console.log("Music play error:", e));
    }
    
    // Burst fireworks on first interaction
    burstFirework();
    
    // Set periodic fireworks every 4-5 seconds
    setInterval(() => {
      if (musicStarted) burstFirework();
    }, 4500);
  } else {
    // Extra burst on each click after start
    burstFirework();
  }
}

// Event listeners for user interaction (mobile & desktop)
document.body.addEventListener("click", enableFestiveMode);
document.body.addEventListener("touchstart", enableFestiveMode);

// Initialize everything
startRotation();

// Set initial opacity states (left girl active first)
if (girlLeft && girlRight) {
  girlLeft.style.opacity = "1";
  girlRight.style.opacity = "0";
}
if (mobileLeft && mobileRight) {
  mobileLeft.style.opacity = "1";
  mobileRight.style.opacity = "0";
}

// Sheep image fallback in case external image fails
window.addEventListener("load", () => {
  const sheep = document.getElementById("sheepImg");
  if (sheep && sheep.complete && sheep.naturalWidth === 0) {
    sheep.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='70' fill='%23FFF5E6' stroke='%23D4A373' stroke-width='3'/%3E%3Ccircle cx='70' cy='85' r='18' fill='%23E8D5B5'/%3E%3Ccircle cx='130' cy='85' r='18' fill='%23E8D5B5'/%3E%3Ccircle cx='75' cy='82' r='6' fill='%233D2B1A'/%3E%3Ccircle cx='125' cy='82' r='6' fill='%233D2B1A'/%3E%3Cpath d='M85 110 Q100 125 115 110' stroke='%238B5A2B' fill='none' stroke-width='4'/%3E%3Crect x='80' y='140' width='40' height='30' rx='8' fill='%23C28B5E'/%3E%3Ccircle cx='85' cy='172' r='12' fill='%23A2704A'/%3E%3Ccircle cx='115' cy='172' r='12' fill='%23A2704A'/%3E%3Ctext x='45' y='45' font-size='35' fill='%23FFD966'%3E🐏%3C/text%3E%3C/svg%3E";
  }
});

// Optional: small floating animation for sheep (subtle, no glitch)
let sheepAnim = true;
function gentleSheepBob() {
  const sheep = document.querySelector(".sheep-char");
  if (sheep && sheepAnim) {
    sheep.style.transform = "translateY(-3px)";
    setTimeout(() => {
      if (sheep) sheep.style.transform = "translateY(0px)";
    }, 800);
  }
  setTimeout(gentleSheepBob, 2200);
}
gentleSheepBob();
