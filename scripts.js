const drawButton = document.querySelector("#draw-button");
const resultContainer = document.querySelector("#result-container");
const resultMessage = document.querySelector("#result-message");
const subtext = document.querySelector("#subtext");
const playAgainBtn = document.querySelector("#play-again");
const choicesSection = document.querySelector("#choices-section");
const mainColorteioLogo = document.querySelector("#main-colorteio-logo");
const hamburguerMenu = document.querySelector("#hamburguer-menu");
const topMenu = document.querySelector("#top-menu");
const menuOverlay = document.querySelector("#menu-overlay");
const header = document.querySelector("#site-header");
const tabs = document.querySelectorAll(".tab");
const mainContent = document.querySelector("#main-content");

let currentMode = "number";
let currentLang = "en";

function setMenuPositions() {
  if (!header || !topMenu || !menuOverlay) return;
  const headerHeight = Math.ceil(header.getBoundingClientRect().height);
  topMenu.style.top = `${headerHeight}px`;
  menuOverlay.style.top = `${headerHeight}px`;
}

setMenuPositions();
window.addEventListener("resize", setMenuPositions);

const translations = {
  en: {
    raffles: "RAFFLES",
    numberDraw: "NUMBER DRAW",
    colorDraw: "COLOR DRAW",
    drawNow: "DRAW NOW",
    playAgain: "PLAY AGAIN",
    draw: "Draw",
    number: "number",
    between: "between",
    and: "and",
    using: "using",
    color: "color",
    results: {
      number: (quantity, min, max) =>
        quantity > 1
          ? `You drew ${quantity} numbers between ${min} and ${max}.`
          : `You drew a number between ${min} and ${max}.`,
      color: (quantity, type) =>
        quantity > 1
          ? `You drew ${quantity} colors in ${type.toUpperCase()} format.`
          : `You drew a color in ${type.toUpperCase()} format.`
    }
  },
  pt: {
    raffles: "SORTEIOS",
    numberDraw: "SORTEIO DE NÚMEROS",
    colorDraw: "SORTEIO DE CORES",
    drawNow: "SORTEAR AGORA",
    playAgain: "JOGAR NOVAMENTE",
    draw: "Sortear",
    number: "número",
    between: "entre",
    and: "e",
    using: "usando",
    color: "cor",
    results: {
      number: (quantity, min, max) =>
        quantity > 1
          ? `Você sorteou ${quantity} números entre ${min} e ${max}.`
          : `Você sorteou um número entre ${min} e ${max}.`,
      color: (quantity, type) =>
        quantity > 1
          ? `Você sorteou ${quantity} cores no formato ${type.toUpperCase()}.`
          : `Você sorteou uma cor no formato ${type.toUpperCase()}.`
    }
  }
};

function loadNumberDraw() {
  const t = translations[currentLang];
  mainContent.innerHTML = `
    <p class="specifications-caption">
      ${t.draw}
      <input id="quantity-input" class="specifications" type="number" value="1" />
      ${t.number}
    </p>
    <p class="specifications-caption">
      ${t.between}
      <input id="min-input" class="specifications" type="number" value="1" />
      ${t.and}
      <input id="max-input" class="specifications" type="number" value="100" />
    </p>
  `;
  currentMode = "number";
}

function loadColorDraw() {
  const t = translations[currentLang];
  mainContent.innerHTML = `
    <p class="specifications-caption">
      ${t.draw}
      <input id="quantity-input" class="specifications" type="number" value="1" />
      ${t.color}
    </p>
    <p class="specifications-caption">
      ${t.using}
      <select id="color-type" class="specifications">
        <option value="name">Name</option>
        <option value="hex">HEX</option>
        <option value="rgb">RGB</option>
        <option value="hsl">HSL</option>
      </select>
    </p>
  `;
  currentMode = "color";
}

drawButton.addEventListener("click", () => {
  if (currentMode === "number") generateNumbers();
  else generateColors();
});

function generateNumbers() {
  const quantity = parseInt(document.querySelector("#quantity-input").value) || 1;
  const min = Math.ceil(Number(document.querySelector("#min-input").value) || 1);
  const max = Math.floor(Number(document.querySelector("#max-input").value) || 100);

  const results = [];
  for (let i = 0; i < quantity; i++) {
    results.push(Math.floor(Math.random() * (max - min + 1) + min));
  }

  const t = translations[currentLang];
  showResult(
    `🎲 ${results.join(", ")}`,
    t.results.number(quantity, min, max)
  );
}

function generateColors() {
  const quantity = parseInt(document.querySelector("#quantity-input").value) || 1;
  const typeEl = document.querySelector("#color-type");
  const type = typeEl ? typeEl.value : "name";

  const results = [];
  for (let i = 0; i < quantity; i++) {
    let color;
    switch (type) {
      case "name":
        const names = ["red", "blue", "green", "yellow", "purple", "pink", "black", "white", "gray", "orange"];
        color = names[Math.floor(Math.random() * names.length)];
        break;
      case "hex":
        color = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
        break;
      case "rgb":
        color = `rgb(${rand255()},${rand255()},${rand255()})`;
        break;
      case "hsl":
        color = `hsl(${Math.floor(Math.random() * 360)},${randPercent()}%,${randPercent()}%)`;
        break;
      default:
        color = "transparent";
    }
    results.push(color);
  }

  const colorHTML = results.map(c => `<span class="color-result"><span class="color-square" style="background:${c};"></span>${c}</span>`).join("");

  const t = translations[currentLang];
  showResult(colorHTML, t.results.color(quantity, type));
}

function rand255() { return Math.floor(Math.random() * 256); }
function randPercent() { return Math.floor(Math.random() * 101); }

function showResult(resultHTML, subText) {
  choicesSection.style.opacity = "0";
  choicesSection.style.transform = "translateY(8px) scale(0.98)";
  mainColorteioLogo.style.opacity = "0";
  mainColorteioLogo.style.transform = "translateY(-8px) scale(0.98)";

  setTimeout(() => {
    choicesSection.classList.add("hidden");
    mainColorteioLogo.classList.add("hidden");
    resultMessage.innerHTML = resultHTML;
    subtext.textContent = subText;
    resultContainer.classList.add("active");
  }, 600);
}

playAgainBtn.addEventListener("click", () => {
  resultContainer.classList.remove("active");

  setTimeout(() => {
    choicesSection.classList.remove("hidden");
    mainColorteioLogo.classList.remove("hidden");
    choicesSection.style.opacity = "0";
    choicesSection.style.transform = "translateY(8px) scale(0.98)";
    mainColorteioLogo.style.opacity = "0";
    mainColorteioLogo.style.transform = "translateY(-8px) scale(0.98)";

    requestAnimationFrame(() => {
      setTimeout(() => {
        choicesSection.style.opacity = "1";
        choicesSection.style.transform = "translateY(0) scale(1)";
        mainColorteioLogo.style.opacity = "1";
        mainColorteioLogo.style.transform = "translateY(0) scale(1)";
        setTimeout(() => {
          choicesSection.style.opacity = "";
          choicesSection.style.transform = "";
          mainColorteioLogo.style.opacity = "";
          mainColorteioLogo.style.transform = "";
        }, 520);
      }, 20);
    });

    resultMessage.textContent = "";
    subtext.textContent = "";
  }, 480);
});

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => {
      t.classList.remove("active");
      t.setAttribute("aria-selected", "false");
    });
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");

    const t = translations[currentLang];
    if (tab.textContent.trim() === t.numberDraw) loadNumberDraw();
    else loadColorDraw();
  });
});

loadNumberDraw();

hamburguerMenu.addEventListener("click", toggleMenu);
hamburguerMenu.addEventListener("keydown", e => {
  if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleMenu(); }
});
menuOverlay.addEventListener("click", closeMenu);

function toggleMenu() {
  const isOpen = hamburguerMenu.classList.toggle("active");
  setMenuPositions();
  if (isOpen) {
    topMenu.classList.remove("hidden");
    menuOverlay.classList.remove("hidden");
    document.body.classList.add("menu-open");
    requestAnimationFrame(() => { 
      topMenu.style.opacity = "1"; 
      topMenu.style.transform = "translateY(0)"; 
      menuOverlay.style.opacity = "1"; });

    const firstTab = topMenu.querySelector(".tab");
    if (firstTab) firstTab.focus();
  } else { closeMenu(); }
}

function closeMenu() {
  hamburguerMenu.classList.remove("active");
  topMenu.style.opacity = "0";
  topMenu.style.transform = "translateY(-8px)";
  menuOverlay.style.opacity = "0";
  document.body.classList.remove("menu-open");
  setTimeout(() => { 
    topMenu.classList.add("hidden");
    menuOverlay.classList.add("hidden"); }, 320);
}

window.addEventListener("orientationchange", setMenuPositions);

const languageButton = document.querySelector("#language-button");
const languageMenu = document.querySelector("#language-menu");
const languageOptions = document.querySelectorAll(".language-option");

languageButton.addEventListener("click", () => { languageMenu.classList.toggle("hidden"); });

document.addEventListener("click", e => {
  if (!languageButton.contains(e.target) && !languageMenu.contains(e.target)) { 
    languageMenu.classList.add("hidden"); }
});

languageOptions.forEach(option => {
  option.addEventListener("click", () => {
    const selectedLang = option.dataset.lang;
    applyLanguage(selectedLang);
    languageMenu.classList.add("hidden");
  });
});

function applyLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  const t = translations[lang];
  document.querySelector("#top-menu h3").textContent = t.raffles;
  document.querySelectorAll(".tab")[0].textContent = t.numberDraw;
  document.querySelectorAll(".tab")[1].textContent = t.colorDraw;
  document.querySelector("#draw-button").textContent = t.drawNow;
  document.querySelector("#play-again").textContent = t.playAgain;

  if (currentMode === "number") loadNumberDraw();
  else loadColorDraw();

  const flag = lang === "pt" ? "./assets/pt-br.png" : "./assets/en.png";
  languageButton.querySelector("img").src = flag;
}
