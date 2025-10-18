const drawButton = document.querySelector("#draw-button");
const resultContainer = document.querySelector("#result-container");
const resultMessage = document.querySelector("#result-message");
const subtext = document.querySelector("#subtext");
const playAgainBtn = document.querySelector("#play-again");
const choicesSection = document.querySelector("#choices-section");
const mainColorteioLogo = document.querySelector("#main-colorteio-logo");

drawButton.addEventListener("click", generateNumbers);

function generateNumbers() {
  const quantity = parseInt(document.querySelector("#quantity-input").value);
  const min = Math.ceil(document.querySelector("#min-input").value);
  const max = Math.floor(document.querySelector("#max-input").value);

  const results = [];

  for (let i = 0; i < quantity; i++) {
    const number = Math.floor(Math.random() * (max - min + 1) + min);
    results.push(number);
  }

  choicesSection.style.opacity = "0";
  choicesSection.style.transform = "translateY(8px) scale(0.98)";
  mainColorteioLogo.style.opacity = "0";
  mainColorteioLogo.style.transform = "translateY(-8px) scale(0.98)";

  const transitionTime = 600;
  setTimeout(() => {
    choicesSection.classList.add("hidden");
    mainColorteioLogo.classList.add("hidden");
    choicesSection.style.opacity = "";
    choicesSection.style.transform = "";
    mainColorteioLogo.style.opacity = "";
    mainColorteioLogo.style.transform = "";

    resultMessage.textContent = `🎲 ${results.join(", ")}`;
    subtext.textContent =
      quantity > 1
        ? `Você sorteou ${quantity} números entre ${min} e ${max}.`
        : `Você sorteou um número entre ${min} e ${max}.`;

    resultContainer.classList.add("active");
  }, transitionTime);
}

playAgainBtn.addEventListener("click", () => {
  resultContainer.classList.remove("active");

  const hideTime = 480;
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
  }, hideTime);
});
