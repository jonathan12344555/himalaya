let health = 100;
let grades = 100;
let confidence = 50;
let friends = 0;
let drugLevel = 0; // wird schlimmer
let eventsSeen = [];

const story = document.getElementById("story");
const choicesDiv = document.getElementById("choices");

function updateStats() {
    document.getElementById("health").textContent = health;
    document.getElementById("grades").textContent = grades;
    document.getElementById("confidence").textContent = confidence;
    document.getElementById("friends").textContent = friends;
}

function good() {
    document.body.classList.add("good-flash");
    setTimeout(()=>document.body.classList.remove("good-flash"),300);
}
function bad() {
    document.body.classList.add("bad-flash");
    setTimeout(()=>document.body.classList.remove("bad-flash"),300);
}

function nextEvent() {
    updateStats();

    if (health <= 0) return overdoseEnding();
    if (grades >= 130 && friends >= 2) return goodEnding();
    if (confidence <= 0) return lonelyEnding();

    const available = allEvents.filter(e => !eventsSeen.includes(e.id));
    if (available.length === 0) return neutralEnding();

    const event = available[Math.floor(Math.random() * available.length)];
    eventsSeen.push(event.id);
    event.play();
}

/* EVENTS */

const allEvents = [

{
id: "party_offer",
play: () => {
story.textContent = "Auf einer Party flüstert jemand: 'Das macht den Abend besser.'";
choicesDiv.innerHTML = `
<button onclick="refuse()">❌ Nein</button>
<button onclick="accept()">😬 Annehmen</button>`;
}
},

{
id: "snus_offer",
play: () => {
story.textContent = "Draußen im Schnee wird dir etwas angeboten, das angeblich entspannt.";
choicesDiv.innerHTML = `
<button onclick="confidence+=5; health+=5; good(); nextEvent()">🚪 Reingehen</button>
<button onclick="accept()">😬 Probieren</button>`;
}
},

{
id: "study_invite",
play: () => {
story.textContent = "Zwei freundliche Pinguine lernen zusammen für die Schule.";
choicesDiv.innerHTML = `
<button onclick="grades+=15; friends++; good(); nextEvent()">📚 Dazusetzen</button>
<button onclick="confidence-=5; nextEvent()">🙈 Ignorieren</button>`;
}
},

{
id: "mocked",
play: () => {
story.textContent = "Jemand macht sich über dich lustig, weil du vorsichtig bist.";
choicesDiv.innerHTML = `
<button onclick="confidence+=10; good(); nextEvent()">🗣 Kontern</button>
<button onclick="confidence-=10; bad(); nextEvent()">😔 Still bleiben</button>`;
}
},

{
id: "dark_group",
play: () => {
story.textContent = "Du landest bei einer Gruppe, die immer extremere Sachen sucht.";
choicesDiv.innerHTML = `
<button onclick="confidence+=10; friends++; good(); nextEvent()">🚶 Weggehen</button>
<button onclick="acceptHard()">⚠️ Bleiben</button>`;
}
},

{
id: "exam",
play: () => {
story.textContent = "Morgen ist eine wichtige Prüfung.";
choicesDiv.innerHTML = `
<button onclick="grades+=20; good(); nextEvent()">📖 Lernen</button>
<button onclick="grades-=15; bad(); nextEvent()">🎮 Ablenken</button>`;
}
}

];

/* DECISION PATHS */

function refuse(){
confidence+=8;
health+=5;
good();
nextEvent();
}

function accept(){
drugLevel++;
health-=10;
grades-=5;
bad();
if(drugLevel>=2) document.body.classList.add("dark-bg");
nextEvent();
}

function acceptHard(){
drugLevel+=2;
health-=20;
grades-=10;
bad();
document.body.classList.add("dark-bg");
nextEvent();
}

/* ENDINGS */

function goodEnding(){
story.innerHTML="🌟 GUTES ENDE 🌟<br>Du hast gesunde Freunde, gute Noten und innere Stärke gefunden.";
choicesDiv.innerHTML="";
}

function overdoseEnding(){
story.innerHTML="☠️ ÜBERDOSIS ENDE ☠️<br>Der Druck und die Gewohnheit wurden zu viel für deinen Pinguin.";
choicesDiv.innerHTML="";
}

function lonelyEnding(){
story.innerHTML="🌫️ EINSAMES ENDE 🌫️<br>Du hast dich immer weiter zurückgezogen und fühlst dich leer.";
choicesDiv.innerHTML="";
}

function neutralEnding(){
story.innerHTML="❄️ OFFENES ENDE ❄️<br>Dein Leben geht weiter, und jeder neue Tag bringt neue Entscheidungen.";
choicesDiv.innerHTML="";
}

nextEvent();
