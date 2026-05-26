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
const desktopText = document.getElementById("greetingText");
const mobileText = document.getElementById("greetingTextMobile");
const girlLeft = document.getElementById("girlLeft");
const girlRight = document.getElementById("girlRight");
const mobileLeft = document.getElementById("mobileLeft");
const mobileRight = document.getElementById("mobileRight");
const bgMusic = document.getElementById("bgMusic");
const fireSound = document.getElementById("fireSound");

let index = 0;
let musicOn = false;
let intervalId;

// Update greeting and swap poses
function updateContent() {
  const msg = greetings[index];
  if (desktopText) desktopText.innerText = msg;
  if (mobileText) mobileText.innerText = msg;
  
  const showLeft = (index % 2 === 0);
  
  if (girlLeft && girlRight) {
    girlLeft.style.opacity = showLeft ? "1" : "0";
    girlRight.style.opacity = showLeft ? "0" : "1";
  }
  if (mobileLeft && mobileRight) {
    mobileLeft.style.opacity = showLeft ? "1" : "0";
    mobileRight.style.opacity = showLeft ? "0" : "1";
  }
  
  index++;
  if (index >= greetings.length) index = 0;
}

// Single firework burst (lightweight)
function popFirework() {
  const isMobile = window.innerWidth <= 750;
  const count = isMobile ? 6 : 12;
  
  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div");
    particle.style.position = "fixed";
    particle.style.left = Math.random() * window.innerWidth + "px";
    particle.style.top = Math.random() * window.innerHeight * 0.6 + 20 + "px";
    particle.style.width = (Math.random() * 10 + 5) + "px";
    particle.style.height = particle.style.width;
    particle.style.borderRadius = "50%";
    
    const colors = ["#ff3366", "#ffcc00", "#33ff66", "#ff6600", "#ff44cc", "#44ffcc"];
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.boxShadow = "0 0 15px gold";
    particle.style.pointerEvents = "none";
    particle.style.zIndex = "9999";
    particle.style.animation = "popAnim 0.7s ease-out forwards";
    document.body.appendChild(particle);
    
    setTimeout(() => particle.remove(), 700);
  }
  
  if (musicOn && fireSound) {
    fireSound.currentTime = 0;
    fireSound.volume = 0.25;
    fireSound.play().catch(() => {});
  }
}

// Add pop animation
if (!document.querySelector("#popKey")) {
  const s = document.createElement("style");
  s.id = "popKey";
  s.textContent = `@keyframes popAnim { 0% { transform: scale(0); opacity: 1; } 100% { transform: scale(2.5); opacity: 0; } }`;
  document.head.appendChild(s);
}

// Start rotation
function startRotation() {
  if (intervalId) clearInterval(intervalId);
  updateContent();
  intervalId = setInterval(updateContent, 5000);
}

// Enable on user interaction
function enableMusic() {
  if (!musicOn) {
    musicOn = true;
    if (bgMusic) {
      bgMusic.volume = 0.12;
      bgMusic.play().catch(() => {});
    }
    popFirework();
    setInterval(() => { if (musicOn) popFirework(); }, 4500);
  } else {
    popFirework();
  }
}

// Events
document.body.addEventListener("click", enableMusic);
document.body.addEventListener("touchstart", enableMusic);

// Initialize
startRotation();

// Set initial pose
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
