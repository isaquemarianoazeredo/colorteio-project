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

drawButton.addEventListener("click", generateNumbers);

function generateNumbers() {
  const quantity = parseInt(document.querySelector("#quantity-input").value) || 1;
  const min = Math.ceil(Number(document.querySelector("#min-input").value) || 1);
  const max = Math.floor(Number(document.querySelector("#max-input").value) || 100);

  const results = [];
  for (let i = 0; i < quantity; i++) {
    const number = Math.floor(Math.random() * (max - min + 1) + min);
    results.push(number);
  }

  choicesSection.style.opacity = "0";
  choicesSection.style.transform = "translateY(8px) scale(0.98)";
  mainColorteioLogo.style.opacity = "0";
  mainColorteioLogo.style.transform = "translateY(-8px) scale(0.98)";

  setTimeout(() => {
    choicesSection.classList.add("hidden");
    mainColorteioLogo.classList.add("hidden");

    resultMessage.textContent = `🎲 ${results.join(", ")}`;
    subtext.textContent =
      quantity > 1
        ? `Você sorteou ${quantity} números entre ${min} e ${max}.`
        : `Você sorteou um número entre ${min} e ${max}.`;

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

function setMenuPositions() {
  const headerHeight = header.getBoundingClientRect().height;
  topMenu.style.top = `${headerHeight}px`;
  menuOverlay.style.top = `${headerHeight}px`;
}

setMenuPositions();
window.addEventListener("resize", setMenuPositions);

hamburguerMenu.addEventListener("click", toggleMenu);
hamburguerMenu.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    toggleMenu();
  }
});

function toggleMenu() {
  const isActive = hamburguerMenu.classList.toggle("active");

  if (isActive) {
    topMenu.classList.remove("hidden");
    topMenu.setAttribute("aria-hidden", "false");
    menuOverlay.classList.remove("hidden");
    menuOverlay.setAttribute("aria-hidden", "false");

    requestAnimationFrame(() => {
      topMenu.style.opacity = "1";
      topMenu.style.transform = "translateY(0)";
      menuOverlay.style.opacity = "1";
    });

    document.body.classList.add("menu-open");
  } else {
    topMenu.classList.add("hidden");
    topMenu.setAttribute("aria-hidden", "true");
    menuOverlay.classList.add("hidden");
    menuOverlay.setAttribute("aria-hidden", "true");

    document.body.classList.remove("menu-open");
  }
}

menuOverlay.addEventListener("click", () => {
  if (hamburguerMenu.classList.contains("active")) {
    toggleMenu();
  }
});

tabs.forEach((t) => {
  t.addEventListener("click", () => {
    tabs.forEach((x) => {
      x.classList.remove("active");
      x.setAttribute("aria-selected", "false");
    });
    t.classList.add("active");
    t.setAttribute("aria-selected", "true");
  });
});

if (tabs.length > 0) {
  tabs.forEach((x, i) => {
    if (i === 0) {
      x.classList.add("active");
      x.setAttribute("aria-selected", "true");
    } else {
      x.setAttribute("aria-selected", "false");
    }
  });
}
