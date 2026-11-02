"use strict";

const stickers = [
  ["01-xin-chao", "Синь чао", "A friendly hello", "smiling Innam mascot waving hello"],
  ["02-xin-cam-on", "Син кам он", "A little gratitude", "Innam mascot smiling with gratitude"],
  ["03-nam-phut", "Нам фут", "Just five minutes", "Innam mascot winking and making an OK gesture"],
  ["04-fast-track", "Фасттрэк нннада?", "The express option", "Innam mascot resting her cheek in her hand"],
  ["05-expat", "Я тут уже локал", "Practically a local", "Innam mascot walking with luggage and a selfie stick"],
  ["06-off-season", "Щас несезон", "Out of office energy", "Innam mascot in sunglasses holding a tropical drink"],
  ["07-overstay", "Просрочка!", "Mind the date", "Innam mascot in an officer cap pointing beside a passport"],
  ["08-you-shouldnt", "Не советую", "A word of advice", "skeptical Innam mascot with her arms crossed"],
  ["09-pho-noodle", "Фо бо и полетели", "Fuel for the journey", "Innam mascot offering a bowl of pho and raising chopsticks"],
  ["10-non-insured-event", "Не страховой случай", "Well, that happened", "a mischievous cat with its head caught in a jar"],
  ["11-purpose-of-travel", "Цель поездки?", "One quick question", "a border officer checking a passport beside the Innam mascot"],
  ["12-not-my-first-visa-run", "Не первый визаран", "Been there. Done that.", "Innam mascot dressed as an explorer with a boot on a trunk"],
  ["13-sound-suspicious", "Звучит подозрительно", "Something doesn’t add up", "Innam mascot thinking with a skeptical expression"],
  ["14-see-you-in-the-office", "Ждём в офисе", "Come on over", "Innam mascot waving you into the office"],
  ["15-short-on-time", "Сроки поджимают", "Every minute counts", "worried Innam mascot pointing at her wristwatch"],
  ["16-myths-are-everywhere", "Мифы повсюду", "Heard that one before", "confused Innam mascot shrugging among rumor bubbles"],
  ["17-insure-your-bro", "Застрахуй братуху", "Looking out for you", "Innam mascot in a tuxedo holding an insurance document"],
  ["18-plans-changed", "Планы поменялись", "A change of scenery", "Innam mascot relaxing in a beach chair on the phone"],
  ["19-believe-in-tears", "Вьетнам слезам не верит", "One of those days", "unhappy Innam mascot sitting in the rain with travel documents"],
  ["20-no-overstay", "Давай без оверстея", "A friendly reminder", "Innam mascot reminding a nervous traveler about his calendar"]
];

const grid = document.querySelector("#sticker-grid");
const preview = document.querySelector("#preview-image");
const stage = document.querySelector("#preview-stage");
const imageError = document.querySelector("#image-error");
const title = document.querySelector("#preview-title");
let selected = -1;

const buttons = stickers.map(([id, name, , description], index) => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "sticker-card";
  button.setAttribute("aria-label", `${index + 1}. ${name}`);
  button.setAttribute("aria-pressed", "false");
  button.title = name;
  const number = document.createElement("span");
  number.className = "sticker-number";
  number.textContent = String(index + 1).padStart(2, "0");
  number.setAttribute("aria-hidden", "true");
  const img = document.createElement("img");
  img.src = `assets/thumbnails/${id}.webp`;
  img.alt = description;
  img.width = 240;
  img.height = 240;
  img.decoding = "async";
  img.loading = index < 8 ? "eager" : "lazy";
  const dot = document.createElement("span");
  dot.className = "selection-dot";
  dot.setAttribute("aria-hidden", "true");
  button.append(number, img, dot);
  button.addEventListener("click", () => selectSticker(index));
  grid.append(button);
  return button;
});

function finishLoading() {
  stage.setAttribute("aria-busy", "false");
}
preview.addEventListener("load", () => {
  imageError.hidden = true;
  finishLoading();
});
preview.addEventListener("error", () => {
  imageError.hidden = false;
  finishLoading();
});

function selectSticker(index, updateUrl = true) {
  index = (index + stickers.length) % stickers.length;
  if (selected >= 0) buttons[selected].setAttribute("aria-pressed", "false");
  selected = index;
  const [id, name, , description] = stickers[index];
  buttons[index].setAttribute("aria-pressed", "true");
  imageError.hidden = true;
  title.textContent = name;
  preview.alt = `${name} — ${description}`;
  const imagePath = `assets/previews/${id}.webp`;
  if (preview.getAttribute("src") !== imagePath || !preview.naturalWidth) {
    stage.setAttribute("aria-busy", "true");
    preview.src = imagePath;
    if (preview.complete && preview.naturalWidth) finishLoading();
  }
  if (updateUrl) {
    // Hash links work under any GitHub Pages repository path and from file://.
    const hash = `#${id.slice(0, 2)}`;
    try { history.replaceState(null, "", hash); }
    catch { location.hash = hash; }
  }
}

function selectFromHash() {
  const value = location.hash.slice(1);
  const index = stickers.findIndex(([id]) => id === value || id.slice(0, 2) === value);
  selectSticker(index >= 0 ? index : 0, false);
}

document.querySelector("#previous").addEventListener("click", () => selectSticker(selected - 1));
document.querySelector("#next").addEventListener("click", () => selectSticker(selected + 1));
document.addEventListener("keydown", event => {
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.target.closest("input, textarea, select, [contenteditable='true']")) return;
  const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
  if (!step) return;
  event.preventDefault();
  const gridFocused = grid.contains(document.activeElement);
  selectSticker(selected + step);
  if (gridFocused) buttons[selected].focus({ preventScroll: true });
});
window.addEventListener("hashchange", selectFromHash);
selectFromHash();
