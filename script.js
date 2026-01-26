let health = 100;
let grades = 100;
let confidence = 50;
let friends = 0;
let stress = 0;
let support = 0;

let drugStage = 0;   // 0=keine, 1=nikotin, 2=alkohol, 3=cannabis, 4=pillen, 5=kokain, 6=heroin
let recovery = 0;

let eventsSeen = [];

const story = document.getElementById("story");
const choicesDiv = document.getElementById("choices");

function updateStats() {
    health = Math.max(0, health);
    confidence = Math.max(0, confidence);
    document.getElementById("health").textContent = health;
    document.getElementById("grades").textContent = grades;
    document.getElementById("confidence").textContent = confidence;
    document.getElementById("friends").textContent = friends;
}

function good(){ document.body.classList.add("good-flash"); setTimeout(()=>document.body.classList.remove("good-flash"),300);}
function bad(){ document.body.classList.add("bad-flash"); setTimeout(()=>document.body.classList.remove("bad-flash"),300);}
function darkWorld(){ document.body.classList.add("dark-bg"); }

/* ================= ENDING CHECK ================= */

function checkEndings(){
    if (drugStage >= 6 && health < 40) return overdoseEnding();
    if (drugStage >= 6) return addictionEnding();
    if (recovery >= 4 && support >= 3) return recoveryEnding();
    if (grades >= 140 && support >= 3) return goodEnding();
    if (stress >= 7 && confidence <= 15) return burnoutEnding();
    return false;
}

function nextEvent(){
    updateStats();
    if(checkEndings()) return;

    const available = allEvents.filter(e => !eventsSeen.includes(e.id));
    if(available.length === 0) return neutralEnding();

    const e = available[Math.floor(Math.random()*available.length)];
    eventsSeen.push(e.id);
    e.play();
}

/* ================= EVENTS ================= */

const allEvents = [

{
id:"nicotine_offer",
play:()=>{
story.textContent="Jemand bietet dir Nikotinbeutel an: 'Ist doch harmlos.'";
choicesDiv.innerHTML=`
<button onclick="refuse()">❌ Nein</button>
<button onclick="useSubstance(1)">😬 Probieren</button>
<button onclick="walkAway()">🚶 Weggehen</button>`;
}
},

{
id:"alcohol_party",
play:()=>{
story.textContent="Auf einer Feier wird viel Alkohol getrunken.";
choicesDiv.innerHTML=`
<button onclick="refuse()">🥤 Bei Softdrinks bleiben</button>
<button onclick="useSubstance(2)">🍺 Mittrinken</button>
<button onclick="callFriend()">📱 Freund anrufen und gehen</button>`;
}
},

{
id:"cannabis_circle",
play:()=>{
story.textContent="Eine Gruppe sitzt im Park und raucht Cannabis.";
choicesDiv.innerHTML=`
<button onclick="refuse()">❌ Ablehnen</button>
<button onclick="useSubstance(3)">😶 Mitmachen</button>
<button onclick="joinStudy()">📚 Weiter zum Lernen</button>`;
}
},

{
id:"pills_offer",
play:()=>{
story.textContent="Jemand sagt, diese Pillen helfen gegen Stress.";
choicesDiv.innerHTML=`
<button onclick="healthyCoping()">🧠 Andere Wege gegen Stress suchen</button>
<button onclick="useSubstance(4)">⚠️ Nehmen</button>`;
}
},

{
id:"cocaine_scene",
play:()=>{
story.textContent="In einer Wohnung taucht Kokain auf. Die Stimmung ist angespannt.";
choicesDiv.innerHTML=`
<button onclick="leaveScene()">🚪 Sofort gehen</button>
<button onclick="useSubstance(5)">❗ Bleiben und nehmen</button>`;
}
},

{
id:"heroin_scene",
play:()=>{
story.textContent="Du gerätst in Kontakt mit einer sehr gefährlichen Droge: Heroin.";
choicesDiv.innerHTML=`
<button onclick="seekHelp()">🆘 Hilfe suchen</button>
<button onclick="useSubstance(6)">💀 Darauf einlassen</button>`;
}
},

{
id:"support_friend",
play:()=>{
story.textContent="Ein Freund merkt, dass es dir nicht gut geht, und bietet Hilfe an.";
choicesDiv.innerHTML=`
<button onclick="acceptSupport()">🤝 Hilfe annehmen</button>
<button onclick="pushAway()">🙅 Ablehnen</button>`;
}
},

{
id:"exam_event",
play:()=>{
story.textContent="Eine wichtige Prüfung steht an.";
choicesDiv.innerHTML=`
<button onclick="grades+=20; support++; good(); nextEvent()">📖 Lernen</button>
<button onclick="stress++; bad(); nextEvent()">😵 Nicht vorbereitet</button>`;
}
}

];

/* ================= DECISIONS ================= */

function useSubstance(stage){
    drugStage = Math.max(drugStage, stage);
    health -= 10 + stage*2;
    grades -= 5 + stage;
    confidence -= 2;
    stress++;
    bad();
    if(drugStage>=3) darkWorld();
    nextEvent();
}

function refuse(){
    confidence+=6;
    support++;
    good();
    nextEvent();
}

function walkAway(){
    confidence+=8;
    support++;
    good();
    nextEvent();
}

function healthyCoping(){
    health+=10;
    recovery++;
    good();
    nextEvent();
}

function leaveScene(){
    confidence+=10;
    recovery++;
    good();
    nextEvent();
}

function seekHelp(){
    recovery+=2;
    support++;
    health+=5;
    good();
    nextEvent();
}

function acceptSupport(){
    support++;
    recovery++;
    confidence+=5;
    good();
    nextEvent();
}

function pushAway(){
    stress++;
    confidence-=5;
    bad();
    nextEvent();
}

function callFriend(){
    support++;
    recovery++;
    good();
    nextEvent();
}

function joinStudy(){
    grades+=15;
    support++;
    good();
    nextEvent();
}

/* ================= ENDINGS ================= */

function goodEnding(){
story.innerHTML="🌟 STARKES ENDE 🌟<br>Du hast gesunde Freunde, gute Noten und triffst bewusste Entscheidungen.";
choicesDiv.innerHTML="";
return true;
}

function recoveryEnding(){
story.innerHTML="💚 HILFE-ENDE 💚<br>Du hast dir Unterstützung gesucht und einen Weg aus der Spirale gefunden.";
choicesDiv.innerHTML="";
return true;
}

function addictionEnding(){
story.innerHTML="🌑 SUCHT-ENDE 🌑<br>Immer stärkere Drogen bestimmten dein Leben. Alles dreht sich nur noch darum.";
choicesDiv.innerHTML="";
return true;
}

function overdoseEnding(){
story.innerHTML="☠️ ÜBERDOSIS ☠️<br>Dein Körper hat die Belastung nicht mehr ausgehalten.";
choicesDiv.innerHTML="";
return true;
}

function burnoutEnding(){
story.innerHTML="🌫️ BURNOUT 🌫️<br>Stress und Rückzug haben dich komplett erschöpft.";
choicesDiv.innerHTML="";
return true;
}

function neutralEnding(){
story.innerHTML="❄️ OFFENES ENDE ❄️<br>Dein Weg ist noch nicht entschieden.";
choicesDiv.innerHTML="";
return true;
}

nextEvent();
