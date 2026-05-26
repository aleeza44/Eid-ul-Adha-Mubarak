// Eid greetings
const greetings = [
  "✨ Eid ul Adha Mubarak! May Allah accept your sacrifices and bless your family.",
  "🐏 May your Eid be filled with peace, happiness, and endless barakah.",
  "💖 Sending warm duas and beautiful wishes to you this Eid ul Adha.",
  "🌙🤲 May Allah shower your home with mercy, joy, and success.",
  "🐑 Eid Mubarak! May your heart stay filled with gratitude and kindness.",
  "🌸 Wishing you smiles, laughter, and unforgettable Eid memories.",
  "🕊️ May all your prayers be accepted and your dreams come true.",
  "🎉🐪 Taqabbal Allahu minna wa minkum! Eid Mubarak!"
];

// Elements
const desktopGreeting = document.getElementById("greetingText");
const mobileGreeting = document.getElementById("greetingTextMobile");
const girlLeft = document.getElementById("girlLeft");
const girlRight = document.getElementById("girlRight");
const mobileLeft = document.getElementById("mobileLeft");
const mobileRight = document.getElementById("mobileRight");
const bgMusic = document.getElementById("bgMusic");
const fireSound = document.getElementById("fireSound");

let greetingIndex = 0;
let musicStarted = false;

// Simple greeting update with pose switching
function updateGreeting() {
  const newText = greetings[greetingIndex];
  
  // Update text
  if (desktopGreeting) desktopGreeting.innerText = newText;
  if (mobileGreeting) mobileGreeting.innerText = newText;
  
  // Switch poses
  const showLeft = (greetingIndex % 2 === 0);
  
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
  
  greetingIndex++;
  if (greetingIndex >= greetings.length) greetingIndex = 0;
}

// Small firework burst
function burstFireworks() {
  const isMobile = window.innerWidth <= 750;
  const count = isMobile ? 5 : 12;
  
  for (let i = 0; i < count; i++) {
    const spark = document.createElement("div");
    spark.style.position = "fixed";
    spark.style.left = Math.random() * window.innerWidth + "px";
    spark.style.top = Math.random() * window.innerHeight * 0.6 + "px";
    spark.style.width = (Math.random() * 8 + 3) + "px";
    spark.style.height = spark.style.width;
    spark.style.borderRadius = "50%";
    spark.style.backgroundColor = ["#ffeb3b", "#ff4081", "#00e5ff", "#ff9100"][Math.floor(Math.random() * 4)];
    spark.style.boxShadow = "0 0 10px gold";
    spark.style.pointerEvents = "none";
    spark.style.zIndex = "999";
    spark.style.animation = "fadeOut 0.6s ease-out forwards";
    document.body.appendChild(spark);
    
    setTimeout(() => spark.remove(), 600);
  }
  
  if (musicStarted && fireSound) {
    fireSound.currentTime = 0;
    fireSound.volume = 0.2;
    fireSound.play().catch(() => {});
  }
}

// Add fadeOut animation
const style = document.createElement("style");
style.textContent = `@keyframes fadeOut { 0% { transform: scale(0); opacity: 1; } 100% { transform: scale(2); opacity: 0; } }`;
document.head.appendChild(style);

// Start rotation
updateGreeting();
let interval = setInterval(updateGreeting, 5000);

// Start music and fireworks on first touch/click
function startExperience() {
  if (!musicStarted) {
    musicStarted = true;
    bgMusic.volume = 0.15;
    bgMusic.play().catch(() => {});
    burstFireworks();
    setInterval(burstFireworks, 5000);
  }
}

document.body.addEventListener("click", startExperience);
document.body.addEventListener("touchstart", startExperience);

// Initial state - show left girl (peace sign)
if (girlRight) girlRight.style.opacity = "0";
if (girlLeft) girlLeft.style.opacity = "1";
if (mobileRight) mobileRight.style.opacity = "0";
if (mobileLeft) mobileLeft.style.opacity = "1";

// Sheep fallback
window.addEventListener("load", () => {
  const sheep = document.getElementById("sheepImg");
  if (sheep && sheep.complete && sheep.naturalWidth === 0) {
    sheep.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='70' fill='%23FFF5E6' stroke='%23D4A373' stroke-width='3'/%3E%3Ccircle cx='70' cy='85' r='18' fill='%23E8D5B5'/%3E%3Ccircle cx='130' cy='85' r='18' fill='%23E8D5B5'/%3E%3Ccircle cx='75' cy='82' r='6' fill='%233D2B1A'/%3E%3Ccircle cx='125' cy='82' r='6' fill='%233D2B1A'/%3E%3Cpath d='M85 110 Q100 125 115 110' stroke='%238B5A2B' fill='none' stroke-width='4'/%3E%3Crect x='80' y='140' width='40' height='30' rx='8' fill='%23C28B5E'/%3E%3Ccircle cx='85' cy='172' r='12' fill='%23A2704A'/%3E%3Ccircle cx='115' cy='172' r='12' fill='%23A2704A'/%3E%3Ctext x='45' y='45' font-size='35' fill='%23FFD966'%3E🐏%3C/text%3E%3C/svg%3E";
  }
});
