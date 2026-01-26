let health=100, confidence=50, grades=100, friends=0;
let stress=0, addiction=0, support=0, hope=0;

let chapter=1;
let eventsSeen=[];

const story=document.getElementById("story");
const choicesDiv=document.getElementById("choices");
const chapterMap=document.getElementById("chapterMap");

function updateStats(){
health=Math.max(0,health);
document.getElementById("health").textContent=health;
document.getElementById("confidence").textContent=confidence;
document.getElementById("grades").textContent=grades;
document.getElementById("friends").textContent=friends;
document.getElementById("stress").textContent=stress;
document.getElementById("addiction").textContent=addiction;
document.getElementById("support").textContent=support;
document.getElementById("hope").textContent=hope;
}

function updateWorld(){
document.body.classList.toggle("dark-bg", addiction>=4);
document.body.classList.toggle("shake", health<40);
document.body.classList.toggle("warm", friends>=4);
}

function good(){document.body.classList.add("good-flash");setTimeout(()=>document.body.classList.remove("good-flash"),300);}
function bad(){document.body.classList.add("bad-flash");setTimeout(()=>document.body.classList.remove("bad-flash"),300);}

/* ---------- CHAPTER MAP ---------- */

function drawMap(){
chapterMap.innerHTML="";
for(let i=1;i<=5;i++){
let c=document.createElement("div");
c.className="chapter"+(i===chapter?" active":"");
c.textContent="Kapitel "+i;
chapterMap.appendChild(c);
}
}

/* ---------- ENDINGS ---------- */

function checkEnd(){
if(addiction>=8 && health<30) return overdoseEnd();
if(addiction>=9) return lostEnd();
if(hope>=6 && support>=5) return recoveryEnd();
if(grades>=160 && friends>=5) return successEnd();
if(stress>=9 && confidence<20) return breakdownEnd();
return false;
}

/* ---------- EVENT ENGINE ---------- */

function nextEvent(){
updateStats(); updateWorld(); drawMap();
if(checkEnd()) return;

let pool=events.filter(e=>e.chapter===chapter && !eventsSeen.includes(e.id));
if(pool.length===0){
chapter++;
if(chapter>5) return neutralEnd();
return nextEvent();
}
let e=pool[Math.floor(Math.random()*pool.length)];
eventsSeen.push(e.id);
e.play();
}

/* ---------- DRUG EFFECT ---------- */

function useDrug(level,name){
addiction+=level;
health-=6+level*3;
grades-=4+level;
confidence-=2;
stress++;
story.innerHTML+="<br><em>Die Entscheidung hat Folgen.</em>";
bad();
nextEvent();
}

/* ---------- SOCIAL ACTIONS ---------- */

function makeFriend(){friends++;confidence+=5;hope++;good();nextEvent();}
function joinGroup(){friends+=2;support++;good();nextEvent();}
function acceptHelp(){support+=2;hope+=2;good();nextEvent();}
function healthyChoice(){health+=8;hope++;good();nextEvent();}
function refuse(){confidence+=6;hope++;good();nextEvent();}
function isolate(){stress++;confidence-=5;bad();nextEvent();}

/* ---------- EVENTS ---------- */

const events=[

// Kapitel 1 – Schule & Alltag
{ id:"new_student", chapter:1, play(){
story.textContent="Ein neuer Schüler sitzt allein.";
choicesDiv.innerHTML=`<button onclick="makeFriend()">Dazusetzen</button>
<button onclick="isolate()">Ignorieren</button>`;
}},

{ id:"first_drink", chapter:1, play(){
story.textContent="Auf einem Geburtstag wird Alkohol angeboten.";
choicesDiv.innerHTML=`<button onclick="refuse()">Ablehnen</button>
<button onclick="useDrug(2,'Alkohol')">Mittrinken</button>`;
}},

// Kapitel 2 – Partys
{ id:"beer_pressure", chapter:2, play(){
story.textContent="Freunde drängen dich mehrere Biere zu trinken.";
choicesDiv.innerHTML=`<button onclick="refuse()">Stopp sagen</button>
<button onclick="useDrug(2,'Alkohol')">Mitziehen</button>`;
}},

{ id:"weed_offer", chapter:2, play(){
story.textContent="Jemand bietet Cannabis an.";
choicesDiv.innerHTML=`<button onclick="refuse()">Nein</button>
<button onclick="useDrug(3,'Cannabis')">Probieren</button>`;
}},

// Kapitel 3 – Eskalation
{ id:"pills_party", chapter:3, play(){
story.textContent="Auf einer Party tauchen Beruhigungspillen auf.";
choicesDiv.innerHTML=`<button onclick="healthyChoice()">Ablehnen & gehen</button>
<button onclick="useDrug(4,'Pillen')">Nehmen</button>`;
}},

{ id:"vodka_night", chapter:3, play(){
story.textContent="Du trinkst viel harten Alkohol.";
choicesDiv.innerHTML=`<button onclick="refuse()">Aufhören</button>
<button onclick="useDrug(3,'Alkohol')">Weitertrinken</button>`;
}},

// Kapitel 4 – Harte Szene
{ id:"cocaine_room", chapter:4, play(){
story.textContent="In einer Wohnung liegt Kokain bereit.";
choicesDiv.innerHTML=`<button onclick="healthyChoice()">Gehen</button>
<button onclick="useDrug(5,'Kokain')">Bleiben</button>`;
}},

{ id:"heroin_offer", chapter:4, play(){
story.textContent="Du gerätst an Heroin – extrem gefährlich.";
choicesDiv.innerHTML=`<button onclick="acceptHelp()">Hilfe holen</button>
<button onclick="useDrug(6,'Heroin')">Darauf einlassen</button>`;
}},

// Kapitel 5 – Wendepunkte
{ id:"intervention", chapter:5, play(){
story.textContent="Freunde sprechen dich besorgt an.";
choicesDiv.innerHTML=`<button onclick="acceptHelp()">Hilfe annehmen</button>
<button onclick="isolate()">Abblocken</button>`;
}},

{ id:"final_exam", chapter:5, play(){
story.textContent="Eine wichtige Abschlussprüfung steht an.";
choicesDiv.innerHTML=`<button onclick="healthyChoice()">Lernen</button>
<button onclick="isolate()">Schwänzen</button>`;
}}

];

/* ---------- ENDINGS ---------- */

function successEnd(){ story.innerHTML="🌟 ERFOLG: Gesundes Leben, Freunde & Zukunft."; choicesDiv.innerHTML=""; }
function recoveryEnd(){ story.innerHTML="💚 REHABILITATION: Du hast Hilfe angenommen und kämpfst dich zurück."; choicesDiv.innerHTML=""; }
function lostEnd(){ story.innerHTML="🌑 SUCHT: Dein Leben dreht sich nur noch um Drogen."; choicesDiv.innerHTML=""; }
function overdoseEnd(){ story.innerHTML="☠️ ÜBERDOSIS: Dein Körper hält der Belastung nicht stand."; choicesDiv.innerHTML=""; }
function breakdownEnd(){ story.innerHTML="🌫️ ZUSAMMENBRUCH: Stress und Isolation überwältigen dich."; choicesDiv.innerHTML=""; }
function neutralEnd(){ story.innerHTML="❄️ OFFENES ENDE: Dein Weg ist noch nicht entschieden."; choicesDiv.innerHTML=""; }

nextEvent();
