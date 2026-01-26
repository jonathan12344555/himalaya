let health = 100;
let grades = 100;
let confidence = 50;
let friendLevel = 0;
let resistTotal = 0;
let takeTotal = 0;
let nicotineRisk = 0;

const story = document.getElementById("story");
const choicesDiv = document.getElementById("choices");

function updateStats() {
    document.getElementById("health").textContent = health;
    document.getElementById("grades").textContent = grades;
    document.getElementById("confidence").textContent = confidence;
    document.getElementById("friends").textContent = friendLevel;
    document.getElementById("resist").textContent = resistTotal;
    document.getElementById("taken").textContent = takeTotal;
}

function animateGood() {
    document.body.classList.add("good-flash");
    setTimeout(() => document.body.classList.remove("good-flash"), 300);
}

function animateBad() {
    document.body.classList.add("bad-flash", "dizzy");
    setTimeout(() => {
        document.body.classList.remove("bad-flash", "dizzy");
    }, 400);
}

function nextEvent() {
    updateStats();

    if (health <= 0) return badEnding();
    if (resistTotal >= 10 && friendLevel >= 1) return goodEnding();

    const events = [partyEvent, laughEvent, schoolEvent, snusEvent];

    if (friendLevel >= 1) events.push(goodFriendsEvent);
    if (takeTotal >= 3 || nicotineRisk >= 3) events.push(darkGroupEvent);

    const randomEvent = events[Math.floor(Math.random() * events.length)];
    randomEvent();
}

/* EVENTS */

function partyEvent() {
    story.textContent = "Auf einer Party sagt jemand: 'Nur einmal probieren…'";
    choicesDiv.innerHTML = `
        <button onclick="resistDrugs()">❌ Nein, ich geh rein</button>
        <button onclick="takeDrugs()">😬 Nur dieses eine Mal</button>
        <button onclick="fakeIt()">🤥 So tun als ob</button>
    `;
}

function laughEvent() {
    story.textContent = "Sie lachen dich aus, weil du Nein gesagt hast.";
    choicesDiv.innerHTML = `
        <button onclick="confidence -=5; animateBad(); nextEvent()">😢 Nichts sagen</button>
        <button onclick="confidence +=10; animateGood(); nextEvent()">🗣 Kontern</button>
        <button onclick="health +=5; animateGood(); nextEvent()">🚶 Weggehen</button>
    `;
}

function schoolEvent() {
    story.textContent = "Morgen ist ein Test, aber die Gruppe will rausgehen.";
    choicesDiv.innerHTML = `
        <button onclick="grades +=10; friendLevel++; animateGood(); nextEvent()">📚 Lernen</button>
        <button onclick="grades -=15; health -=5; animateBad(); nextEvent()">😎 Mitgehen</button>
    `;
}

function snusEvent() {
    story.textContent = "Draußen vor der Party bietet dir jemand Snus an.";
    choicesDiv.innerHTML = `
        <button onclick="goInside()">🚪 Reingehen</button>
        <button onclick="stayOutside()">🧍 Bleiben</button>
    `;
}

function goodFriendsEvent() {
    story.textContent = "Nette Pinguine lernen zusammen in der Bibliothek.";
    choicesDiv.innerHTML = `
        <button onclick="friendLevel++; confidence +=5; grades +=5; animateGood(); nextEvent()">😊 Dazusetzen</button>
        <button onclick="confidence -=5; animateBad(); nextEvent()">😰 Nicht trauen</button>
    `;
}

function darkGroupEvent() {
    story.textContent = "Du bist mit einer gefährlicheren Gruppe unterwegs…";
    choicesDiv.innerHTML = `
        <button onclick="confidence +=10; friendLevel++; animateGood(); nextEvent()">😟 Weggehen</button>
        <button onclick="health -=20; animateBad(); nextEvent()">⚠️ Bleiben</button>
    `;
}

/* SNUS SCENE */

function goInside() {
    confidence += 8;
    health += 5;
    animateGood();
    story.textContent = "Du gehst rein und entkommst dem Druck.";
    setTimeout(nextEvent, 1000);
}

function stayOutside() {
    story.textContent = "Sie stehen im Kreis. Einer hält dir eine Dose hin: 'Willst du?'";
    choicesDiv.innerHTML = `
        <button onclick="refuseSnus()">❌ Nein sagen</button>
        <button onclick="throwAwaySnus()">🗑 Wegwerfen</button>
        <button onclick="takeSnus()">😬 Nehmen</button>
    `;
}

function refuseSnus() {
    confidence += 10;
    health += 5;
    resistTotal++;
    animateGood();
    story.textContent = "Sie lachen kurz, aber du bleibst stark.";
    setTimeout(nextEvent, 1200);
}

function throwAwaySnus() {
    confidence += 15;
    friendLevel--;
    animateGood();
    story.textContent = "Mutig! Die Stimmung kippt, aber du setzt ein Zeichen.";
    setTimeout(nextEvent, 1200);
}

function takeSnus() {
    nicotineRisk++;
    health -= 8;
    grades -= 5;
    takeTotal++;
    animateBad();
    story.textContent = "Kurz fühlt es sich locker an… aber dein Körper gewöhnt sich daran.";
    setTimeout(nextEvent, 1200);
}

/* DRUG PATH */

function resistDrugs() {
    resistTotal++;
    health += 5;
    confidence += 5;
    friendLevel--;
    animateGood();
    nextEvent();
}

function takeDrugs() {
    takeTotal++;
    health -= 15;
    grades -= 10;
    friendLevel--;
    animateBad();
    nextEvent();
}

function fakeIt() {
    confidence += 3;
    animateGood();
    nextEvent();
}

/* ENDINGS */

function goodEnding() {
    story.innerHTML = "🌟 DU HAST ES GESCHAFFT! 🌟<br>Du hast gesunde Freunde gefunden, gute Noten und fühlst dich stark.";
    choicesDiv.innerHTML = "";
}

function badEnding() {
    story.innerHTML = "☠️ Dein Pinguin ist zu tief in die Sucht geraten… Game Over.";
    choicesDiv.innerHTML = "";
}

nextEvent();
