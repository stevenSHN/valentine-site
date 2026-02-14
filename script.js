const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const buttonArea = document.getElementById("buttonArea");
const nameInput = document.getElementById("nameInput");
const namePreview = document.getElementById("namePreview");

let yesScale = 1;
const maxScale = 3.2;

function updateNamePreview(rawName) {
  const name = (rawName || "").trim();
  if (namePreview) {
    namePreview.textContent = name || "小可爱";
  }
}

function growYes(step = 0.18) {
  yesScale = Math.min(maxScale, yesScale + step);
  yesBtn.style.setProperty("--yes-scale", yesScale.toFixed(2));
  if (yesScale >= 2.4) {
    yesBtn.textContent = "YES";
  }
}

function moveNoButton() {
  const areaRect = buttonArea.getBoundingClientRect();
  const margin = 36;
  const randomX = margin + Math.random() * (areaRect.width - margin * 2);
  const randomY = margin + Math.random() * (areaRect.height - margin * 2);

  noBtn.style.left = `${(randomX / areaRect.width) * 100}%`;
  noBtn.style.top = `${(randomY / areaRect.height) * 100}%`;
  growYes(0.14);
}

function evadeOnApproach(event) {
  const noRect = noBtn.getBoundingClientRect();
  const centerX = noRect.left + noRect.width / 2;
  const centerY = noRect.top + noRect.height / 2;
  const distance = Math.hypot(event.clientX - centerX, event.clientY - centerY);

  if (distance < 105) {
    moveNoButton();
  }
}

yesBtn.addEventListener("click", () => {
  growYes(0.3);
  alert("恭喜你，做出了正确的选择 🎆");
});

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("click", (event) => {
  event.preventDefault();
  moveNoButton();
});

document.addEventListener("mousemove", evadeOnApproach);

if (nameInput) {
  nameInput.addEventListener("input", () => {
    updateNamePreview(nameInput.value);
  });
  updateNamePreview(nameInput.value);
}
