let health = 100;
let confidence = 50;
let grades = 100;
let friends = 0;
let stress = 0;
let addiction = 0;
let support = 0;
let hope = 0;

let eventsSeen = [];

const story = document.getElementById("story");
const choicesDiv = document.getElementById("choices");

function updateStats(){
document.getElementById("health").textContent = health;
document.getElementById("confidence").textContent = confidence;
document.getElementById("grades").textContent = grades;
document.getElementById("friends").textContent = friends;
}

function good(){document.body.classList.add("good-flash");setTimeout(()=>document.body.classList.remove("good-flash"),300);}
function bad(){document.body.classList.add("bad-flash");setTimeout(()=>document.body.classList.remove("bad-flash"),300);}

function updateWorld(){
if(addiction>=3) document.body.classList.add("dark-bg");
if(health<40) document.body.classList.add("shake");
if(friends>=3) document.body.classList.add("warm");
}

/* ========== ENDING CHECK ========== */

function checkEndings(){
if(addiction>=7 && health<30) return overdoseEnding();
if(addiction>=8) return lostEnding();
if(hope>=5 && support>=4) return recoveryEnding();
if(grades>=150 && friends>=4) return successEnding();
if(stress>=8 && confidence<20) return breakdownEnding();
return false;
}

function nextEvent(){
updateStats();
updateWorld();
if(checkEndings()) return;

let available = allEvents.filter(e=>!eventsSeen.includes(e.id));
if(available.length===0) return neutralEnding();

let e = available[Math.floor(Math.random()*available.length)];
eventsSeen.push(e.id);
e.play();
}

/* ========== EVENTS ========== */

const allEvents = [

{
id:"new_student",
play:()=>{
story.textContent="Ein neuer Pinguin sitzt allein in der Cafeteria.";
choicesDiv.innerHTML=`
<button onclick="befriend()">😊 Dazusetzen</button>
<button onclick="ignore()">🙈 Ignorieren</button>
<button onclick="makeJoke()">😎 Cool wirken</button>`;
}
},

{
id:"nicotine",
play:()=>{
story.textContent="Jemand bietet dir Nikotinbeutel an.";
choicesDiv.innerHTML=`
<button onclick="refuse()">❌ Nein</button>
<button onclick="useDrug(1)">😬 Probieren</button>
<button onclick="walkAway()">🚶 Weggehen</button>`;
}
},

{
id:"alcohol",
play:()=>{
story.textContent="Auf einer Party fließt viel Alkohol.";
choicesDiv.innerHTML=`
<button onclick="refuse()">🥤 Nichts trinken</button>
<button onclick="useDrug(2)">🍺 Mittrinken</button>
<button onclick="callFriend()">📱 Freund anrufen</button>`;
}
},

{
id:"weed",
play:()=>{
story.textContent="Freunde rauchen Cannabis im Park.";
choicesDiv.innerHTML=`
<button onclick="refuse()">❌ Ablehnen</button>
<button onclick="useDrug(3)">😶 Mitmachen</button>
<button onclick="joinClub()">⚽ Zum Sport gehen</button>`;
}
},

{
id:"pills",
play:()=>{
story.textContent="Jemand bietet dir starke Beruhigungspillen an.";
choicesDiv.innerHTML=`
<button onclick="healthyCoping()">🧠 Anders mit Stress umgehen</button>
<button onclick="useDrug(4)">⚠️ Nehmen</button>`;
}
},

{
id:"cocaine",
play:()=>{
story.textContent="Auf einer Feier taucht Kokain auf.";
choicesDiv.innerHTML=`
<button onclick="leaveScene()">🚪 Sofort gehen</button>
<button onclick="useDrug(5)">❗ Bleiben</button>`;
}
},

{
id:"heroin",
play:()=>{
story.textContent="Du gerätst an Heroin — eine extrem gefährliche Droge.";
choicesDiv.innerHTML=`
<button onclick="seekHelp()">🆘 Hilfe holen</button>
<button onclick="useDrug(6)">💀 Darauf einlassen</button>`;
}
},

{
id:"study_group",
play:()=>{
story.textContent="Ein Lernkreis sucht noch jemanden.";
choicesDiv.innerHTML=`
<button onclick="joinStudy()">📚 Mitlernen</button>
<button onclick="skipStudy()">😴 Absagen</button>`;
}
},

{
id:"support_friend",
play:()=>{
story.textContent="Ein Freund merkt, dass es dir schlecht geht.";
choicesDiv.innerHTML=`
<button onclick="acceptSupport()">🤝 Öffnen</button>
<button onclick="pushAway()">🙅 Wegstoßen</button>`;
}
}

];

/* ========== DECISIONS ========== */

function useDrug(level){
addiction += level;
health -= 8 + level*3;
grades -= 5 + level;
confidence -= 3;
stress++;
bad();
nextEvent();
}

function refuse(){confidence+=6;hope++;good();nextEvent();}
function walkAway(){confidence+=8;hope++;good();nextEvent();}
function healthyCoping(){health+=10;hope++;good();nextEvent();}
function leaveScene(){confidence+=10;hope++;good();nextEvent();}
function seekHelp(){support+=2;hope+=2;health+=5;good();nextEvent();}
function callFriend(){support++;hope++;good();nextEvent();}
function acceptSupport(){support++;friends++;hope++;good();nextEvent();}
function pushAway(){stress++;confidence-=5;bad();nextEvent();}
function joinStudy(){grades+=15;friends++;hope++;good();nextEvent();}
function skipStudy(){stress++;bad();nextEvent();}
function joinClub(){friends++;health+=5;hope++;good();nextEvent();}
function befriend(){friends++;confidence+=5;good();nextEvent();}
function ignore(){confidence-=3;nextEvent();}
function makeJoke(){confidence+=2;friends--;nextEvent();}

/* ========== ENDINGS ========== */

function successEnding(){
story.innerHTML="🌟 ERFOLGS-ENDE 🌟<br>Du hast stabile Freunde, gute Noten und ein gesundes Leben aufgebaut.";
choicesDiv.innerHTML="";return true;
}

function recoveryEnding(){
story.innerHTML="💚 WIEDER-RAUS-ENDE 💚<br>Du hast Hilfe angenommen und dich Schritt für Schritt zurückgekämpft.";
choicesDiv.innerHTML="";return true;
}

function lostEnding(){
story.innerHTML="🌑 VERLORENES ENDE 🌑<br>Die Sucht hat dein Leben komplett übernommen.";
choicesDiv.innerHTML="";return true;
}

function overdoseEnding(){
story.innerHTML="☠️ ÜBERDOSIS ☠️<br>Dein Körper konnte die Belastung nicht mehr überstehen.";
choicesDiv.innerHTML="";return true;
}

function breakdownEnding(){
story.innerHTML="🌫️ ZUSAMMENBRUCH 🌫️<br>Stress, Isolation und Druck wurden zu viel.";
choicesDiv.innerHTML="";return true;
}

function neutralEnding(){
story.innerHTML="❄️ OFFENES ENDE ❄️<br>Dein Weg ist noch nicht festgelegt.";
choicesDiv.innerHTML="";return true;
}

nextEvent();
