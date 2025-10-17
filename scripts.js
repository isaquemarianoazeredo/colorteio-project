const drawButton = document.querySelector("#draw-button")

drawButton.addEventListener("click", generateNumbers)

function generateNumbers() {
    const quantity = parseInt(document.querySelector("#quantity-input").value)
    const min = Math.ceil(document.querySelector("#min-input").value)
    const max = Math.floor(document.querySelector("#max-input").value)

    const results = []

    for (let i = 0; i < quantity; i++) {
        const number = Math.floor(Math.random() * (max - min + 1) + min)
        results.push(number)
    }

    alert(results.join(", "))
}