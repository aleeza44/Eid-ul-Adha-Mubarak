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

const greetingElement = document.getElementById("greeting");
// NOTE: IDs are swapped now! girl2 is on left (peace sign), girl1 is on right (waving)
const girlLeft = document.getElementById("girl2");  // Peace sign (was pose1.1.png)
const girlRight = document.getElementById("girl1"); // Waving (was pose1.png)
const bgMusic = document.getElementById("bgMusic");
const fireSound = document.getElementById("fireSound");

let greetingIndex = 0;
let musicStarted = false;

// Function to update greeting text and switch poses (action styles)
function updateGreetingAndPose() {
  // Fade out text
  greetingElement.style.opacity = "0";
  
  setTimeout(() => {
    greetingElement.innerText = greetings[greetingIndex];
    greetingElement.style.opacity = "1";
  }, 400);
  
  // Alternate between poses:
  // Even index: Left girl (peace sign) active, Right girl (waving) inactive
  // Odd index: Left girl inactive, Right girl active
  if (greetingIndex % 2 === 0) {
    // Left girl active (peace sign)
    girlLeft.style.opacity = "1";
    girlLeft.style.transform = "scale(1)";
    girlRight.style.opacity = "0";
    girlRight.style.transform = "scale(0.7)";
  } else {
    // Right girl active (waving)
    girlLeft.style.opacity = "0";
    girlLeft.style.transform = "scale(0.7)";
    girlRight.style.opacity = "1";
    girlRight.style.transform = "scale(1)";
  }
  
  greetingIndex++;
  if (greetingIndex >= greetings.length) {
    greetingIndex = 0;
  }
}

// Function to trigger MEGA extra firework particles
function burstExtraFireworks() {
  // Create 20 random firework particles for massive festive feel
  for (let i = 0; i < 25; i++) {
    const spark = document.createElement("div");
    const xPos = Math.random() * window.innerWidth;
    const yPos = Math.random() * window.innerHeight * 0.7 + 30;
    spark.style.position = "fixed";
    spark.style.left = xPos + "px";
    spark.style.top = yPos + "px";
    spark.style.width = Math.random() * 12 + 6 + "px";
    spark.style.height = spark.style.width;
    spark.style.borderRadius = "50%";
    const colors = ["#ffeb3b", "#ff4081", "#00e5ff", "#ff9100", "#69f0ae", "#ea80fc", "#ffd740", "#ffffff"];
    spark.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    spark.style.boxShadow = "0 0 25px gold, 0 0 50px orange";
    spark.style.pointerEvents = "none";
    spark.style.zIndex = "999";
    spark.style.animation = "popFirework 1s ease-out forwards";
    document.body.appendChild(spark);
    
    setTimeout(() => {
      spark.remove();
    }, 1000);
  }
  
  // Play firework sound if user interacted
  if (musicStarted) {
    fireSound.currentTime = 0;
    fireSound.volume = 0.35;
    fireSound.play().catch(e => console.log("Audio play error:", e));
  }
}

// Add dynamic style for extra firework animation
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes popFirework {
    0% { transform: scale(0); opacity: 1; }
    50% { transform: scale(1.5); opacity: 0.9; }
    100% { transform: scale(4); opacity: 0; }
  }
`;
document.head.appendChild(styleSheet);

// Start auto-changing greetings and poses every 5 seconds
updateGreetingAndPose();
let interval = setInterval(updateGreetingAndPose, 5000);

// ========= FIREWORKS & MUSIC on USER CLICK (first interaction) =========
function startJoyfulExperience() {
  if (!musicStarted) {
    musicStarted = true;
    // Play background music softly
    bgMusic.volume = 0.2;
    bgMusic.play().catch(e => console.log("Music autoplay blocked, but user clicked"));
    
    // Trigger initial massive happy firework burst
    burstExtraFireworks();
    
    // Also trigger periodic mini fireworks every 3.5 seconds for extra joy
    setInterval(() => {
      if (musicStarted) {
        burstExtraFireworks();
      }
    }, 3500);
  } else {
    // On each click, also burst extra fireworks
    burstExtraFireworks();
  }
}

// Detect first click anywhere on page to enable music & joyful fireworks
document.body.addEventListener("click", startJoyfulExperience);
document.addEventListener("touchstart", startJoyfulExperience);

// Also burst fireworks on greeting change for more celebration
setInterval(() => {
  if (musicStarted) {
    burstExtraFireworks();
  }
}, 5500);

// Ensure girls are initially set correctly (Left girl active first - peace sign)
girlRight.style.opacity = "0";
girlLeft.style.opacity = "1";
girlLeft.style.transform = "scale(1)";
girlRight.style.transform = "scale(0.7)";

// Fallback for sheep image if needed
window.addEventListener("load", () => {
  const sheep = document.getElementById("sheepImg");
  if (sheep && sheep.naturalWidth === 0) {
    sheep.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='70' fill='%23FFF5E6' stroke='%23D4A373' stroke-width='3'/%3E%3Ccircle cx='70' cy='85' r='18' fill='%23E8D5B5'/%3E%3Ccircle cx='130' cy='85' r='18' fill='%23E8D5B5'/%3E%3Ccircle cx='75' cy='82' r='6' fill='%233D2B1A'/%3E%3Ccircle cx='125' cy='82' r='6' fill='%233D2B1A'/%3E%3Cpath d='M85 110 Q100 125 115 110' stroke='%238B5A2B' fill='none' stroke-width='4'/%3E%3Crect x='80' y='140' width='40' height='30' rx='8' fill='%23C28B5E'/%3E%3Ccircle cx='85' cy='172' r='12' fill='%23A2704A'/%3E%3Ccircle cx='115' cy='172' r='12' fill='%23A2704A'/%3E%3Ctext x='45' y='45' font-size='35' fill='%23FFD966'%3E🐏%3C/text%3E%3C/svg%3E";
  }
});