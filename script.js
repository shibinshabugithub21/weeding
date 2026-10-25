// Animated falling petals, scroll reveals, and a live countdown.
const petalLayer = document.getElementById("petalLayer");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function createPetal() {
  if (reduceMotion || !petalLayer) return;
  const petal = document.createElement("span");
  petal.className = "petal";
  petal.style.left = `${Math.random() * 100}%`;
  petal.style.width = `${6 + Math.random() * 8}px`;
  petal.style.height = `${9 + Math.random() * 10}px`;
  petal.style.setProperty("--drift", `${Math.random() * 220 - 110}px`);
  petal.style.animationDuration = `${8 + Math.random() * 9}s`;
  petal.style.animationDelay = `${Math.random() * 1.5}s`;
  petalLayer.appendChild(petal);
  window.setTimeout(() => petal.remove(), 19000);
}

if (!reduceMotion) {
  for (let i = 0; i < 14; i++) window.setTimeout(createPetal, i * 250);
  window.setInterval(createPetal, 650);
}

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !reduceMotion) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}

// Date/time from the invitation: 29 November 2026, 11:00 AM (local time).
const weddingDate = new Date(2026, 10, 29, 11, 0, 0);
const parts = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds")
};

function updateCountdown() {
  let difference = weddingDate.getTime() - Date.now();
  if (difference <= 0) {
    Object.values(parts).forEach(node => { if (node) node.textContent = "0"; });
    const note = document.querySelector(".countdown-note");
    if (note) note.textContent = "Today is the special day. Let the celebration begin!";
    return;
  }
  const days = Math.floor(difference / 86400000);
  difference %= 86400000;
  const hours = Math.floor(difference / 3600000);
  difference %= 3600000;
  const minutes = Math.floor(difference / 60000);
  const seconds = Math.floor((difference % 60000) / 1000);
  
  if (parts.days) parts.days.textContent = days;
  if (parts.hours) parts.hours.textContent = String(hours).padStart(2, "0");
  if (parts.minutes) parts.minutes.textContent = String(minutes).padStart(2, "0");
  if (parts.seconds) parts.seconds.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
window.setInterval(updateCountdown, 1000);