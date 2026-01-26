let grades = 100;
let health = 100;
let resistCount = 0;
let takenCount = 0;

const story = document.getElementById("story");
const gradesSpan = document.getElementById("grades");
const healthSpan = document.getElementById("health");
const resistSpan = document.getElementById("resist");
const takenSpan = document.getElementById("taken");
const endingDiv = document.getElementById("ending");

function updateStats() {
    gradesSpan.textContent = grades;
    healthSpan.textContent = health;
    resistSpan.textContent = resistCount;
    takenSpan.textContent = takenCount;
}

function resist() {
    resistCount++;

    story.textContent = "Sie lachen dich aus, aber du bleibst stark 🐧";

    if (resistCount < 10) {
        grades += 2;
        health -= 1;
    }

    if (resistCount === 10) {
        goodEnding();
    }

    updateStats();
}

function take() {
    takenCount++;

    story.textContent = "Du fühlst dich kurz anders… aber etwas stimmt nicht.";

    grades -= 10;
    health -= 15;

    if (takenCount > 3) {
        story.textContent = "Du gerätst in dunklere Gruppen…";
    }

    if (health <= 0) {
        badEnding();
    }

    updateStats();
}

function goodEnding() {
    story.textContent = "Die toxischen Freunde verschwinden.";
    endingDiv.classList.remove("hidden");
    endingDiv.innerHTML = `
        🌟 GUTES ENDE 🌟<br><br>
        Du findest neue, nette Freunde.<br>
        Deine Noten verbessern sich und du fühlst dich stärker als je zuvor!
    `;
    disableButtons();
}

function badEnding() {
    endingDiv.classList.remove("hidden");
    endingDiv.innerHTML = `
        ☠️ SCHLECHTES ENDE ☠️<br><br>
        Die Sucht hat dein Leben übernommen.<br>
        Dein Pinguin schafft es nicht…
    `;
    disableButtons();
}

function disableButtons() {
    const buttons = document.querySelectorAll("button");
    buttons.forEach(btn => btn.disabled = true);
}

updateStats();
