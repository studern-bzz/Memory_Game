let count = 0
const numbers = []
while (count <= 19){
    const number = Math.floor(Math.random() * 10) + 1
    numbers.push(number)
    count += 1
}
console.log(numbers)
const result1 = numbers[0] + numbers[1]
const result2 = numbers[2] + numbers[3]
const result3 = numbers[4] + numbers[5]
const result4 = numbers[6] + numbers[7]
const result5 = numbers[8] + numbers[9]
const result6 = numbers[10] + numbers[11]
const result7 = numbers[12] + numbers[13]
const result8 = numbers[14] + numbers[15]
const result9 = numbers[16] + numbers[17]
const result10 = numbers[18] + numbers[19]



const equations = [
    { equation: numbers[0].toString() +  " + "  + numbers[1].toString(), result: result1 },
    { equation: numbers[2].toString() +  " + " + numbers[3].toString(), result: result2 },
    { equation: numbers[4].toString() +  " + " + numbers[5].toString(), result: result3 },
    { equation: numbers[6].toString() +  " + " + numbers[7].toString(), result: result4 },
    { equation: numbers[8].toString() +  " + " + numbers[9].toString(), result: result5 },
    { equation: numbers[10].toString() +  " + " + numbers[11].toString(), result: result6 },
    { equation: numbers[12].toString() +  " + " + numbers[13].toString(), result: result7 },
    { equation: numbers[14].toString() +  " + " + numbers[15].toString(), result: result8 },
    { equation: numbers[16].toString() +  " + " + numbers[17].toString(), result: result9 },
    { equation: numbers[18].toString() +  " + " + numbers[19].toString(), result: result10 }
]



// Generate the card pairs
let cards = [];
equations.forEach(pair => {
    cards.push({ text: pair.equation, type: "equation" });
    cards.push({ text: pair.result, type: "result" });
});

// Shuffle the cards
cards = cards.sort(() => Math.random() - 0.5);

const gameBoard = document.getElementById("game-board");

let flippedCards = [];
let matchedPairs = 0;
let stopwatchStarted = false;
// Create card elements
cards.forEach(cardData => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.type = cardData.type;
    card.dataset.text = cardData.text;

    gameBoard.appendChild(card);

    card.addEventListener("click", () => {
        if (card.classList.contains("flipped") || card.classList.contains("matched") || flippedCards.length >= 2) {
            return;
        }
        // Starte die Stoppuhr, wenn die erste Karte gedreht wird
        if (!stopwatchStarted) {
            startStopwatch();
            stopwatchStarted = true;
        }

        card.classList.add("flipped");
        card.textContent = card.dataset.text; // Zeige den Text (Rechnung oder Ergebnis)
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    });
});

function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (isMatch(card1, card2)) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedPairs++;

        if (matchedPairs === equations.length) {
            const display = document.getElementById("display").innerHTML
            stopStopwatch()
            console.log(display)
            setTimeout(() => alert(`Herzlichen Glückwunsch, Sie haben alle Paare gefunden! \n Gebrauchte Zeit ${display}`), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            card1.textContent = ""; // Rückseite wieder zeigen
            card2.textContent = "";
        }, 1000);
    }

    flippedCards = [];
}

function isMatch(card1, card2) {
    if (card1.dataset.type === "equation" && card2.dataset.type === "result") {
        return eval(card1.dataset.text.replace("×", "*").replace("÷", "/")) === parseInt(card2.dataset.text);
    }
    if (card1.dataset.type === "result" && card2.dataset.type === "equation") {
        return eval(card2.dataset.text.replace("×", "*").replace("÷", "/")) === parseInt(card1.dataset.text);
    }
    return false;
}

// stopwatch code:
let startTime = 0;
let elapsedTime = 0;
let timerInterval;

const display = document.getElementById("display");

// Funktion zum Formatieren der Zeit
function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

// Aktualisiert die Anzeige
function updateDisplay() {
    const now = Date.now();
    elapsedTime = now - startTime;
    display.textContent = formatTime(elapsedTime);
}

// Startet die Stoppuhr
function startStopwatch() {
    if (!timerInterval) {
        startTime = Date.now() - elapsedTime; // Startzeit setzen
        timerInterval = setInterval(updateDisplay, 100); // Intervall zum Aktualisieren
    }
}

// Stoppt die Stoppuhr
function stopStopwatch() {
    clearInterval(timerInterval);
    timerInterval = null;
}