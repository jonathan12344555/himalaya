let health=100, grades=100, friends=1, confidence=50;
let addiction=0;
let step=0;

const story=document.getElementById("story");
const choicesDiv=document.getElementById("choices");

function updateStats(){
document.getElementById("health").textContent=health;
document.getElementById("grades").textContent=grades;
document.getElementById("friends").textContent=friends;
document.getElementById("confidence").textContent=confidence;
}

function updateEffects(){
document.body.classList.toggle("blur", addiction>=3);
document.body.classList.toggle("heavy-blur", addiction>=6);
document.body.classList.toggle("dark", addiction>=7);
document.body.classList.toggle("vignette", addiction>=8);
document.querySelector(".game-container").classList.toggle("spin", addiction>=9);
}

function good(){document.body.classList.add("good-flash");setTimeout(()=>document.body.classList.remove("good-flash"),400);}
function bad(){document.body.classList.add("bad-flash");setTimeout(()=>document.body.classList.remove("bad-flash"),400);}

/* ---------- SPIELABLAUF ---------- */

function nextStep(){
updateStats();
updateEffects();
checkEnding();

step++;

switch(step){

case 1:
story.textContent="Du bist ein junger Pinguin an einer neuen Schule. Alles fühlt sich neu an.";
choicesDiv.innerHTML=`<button onclick="friends++,confidence+=5,nextStep()">Freundlich sein</button>
<button onclick="confidence-=5,nextStep()">Still bleiben</button>`;
break;

case 2:
story.textContent="In der Pause bietet dir jemand ein Bier an.";
choicesDiv.innerHTML=`<button onclick="refuse()">Ablehnen</button>
<button onclick="drink(2)">Trinken</button>`;
break;

case 3:
story.textContent="Du wirst zu einer Party eingeladen.";
choicesDiv.innerHTML=`<button onclick="friends++,nextStep()">Hingehen</button>
<button onclick="confidence+=5,nextStep()">Absagen</button>`;
break;

case 4:
story.textContent="Auf der Party gibt es starken Alkohol.";
choicesDiv.innerHTML=`<button onclick="refuse()">Nein</button>
<button onclick="drink(3)">Mittrinken</button>`;
break;

case 5:
story.textContent="Ein Freund merkt, dass du dich veränderst.";
choicesDiv.innerHTML=`<button onclick="friends++,confidence+=5,nextStep()">Reden</button>
<button onclick="confidence-=5,nextStep()">Abblocken</button>`;
break;

case 6:
story.textContent="Jemand bietet dir Cannabis an.";
choicesDiv.innerHTML=`<button onclick="refuse()">Weitergehen</button>
<button onclick="takeDrug(3)">Probieren</button>`;
break;

case 7:
story.textContent="Die Schule wird schwerer und du bist oft müde.";
choicesDiv.innerHTML=`<button onclick="grades+=10,nextStep()">Lernen</button>
<button onclick="grades-=15,nextStep()">Schwänzen</button>`;
break;

case 8:
story.textContent="Auf einer Feier tauchen stärkere Drogen auf.";
choicesDiv.innerHTML=`<button onclick="leave()">Gehen</button>
<button onclick="takeDrug(5)">Bleiben</button>`;
break;

default:
randomEvent();
}
}

/* ---------- EVENTS NACH HAUPTSTORY ---------- */

function randomEvent(){
let events=[
()=>{story.textContent="Ein guter Freund fragt, ob alles okay ist."; choicesDiv.innerHTML=`<button onclick="friends++,confidence+=5,nextStep()">Öffnen</button><button onclick="confidence-=5,nextStep()">Ausweichen</button>`;},
()=>{story.textContent="Du verpasst eine wichtige Abgabe."; choicesDiv.innerHTML=`<button onclick="grades-=15,nextStep()">Egal</button><button onclick="grades+=5,nextStep()">Nachholen</button>`;},
()=>{story.textContent="Eine Party eskaliert mit viel Alkohol."; choicesDiv.innerHTML=`<button onclick="refuse()">Stopp</button><button onclick="drink(4)">Weitertrinken</button>`;}
];
events[Math.floor(Math.random()*events.length)]();
}

/* ---------- AKTIONEN ---------- */

function drink(level){ addiction+=level; health-=5*level; grades-=5; bad(); nextStep(); }
function takeDrug(level){ addiction+=level; health-=7*level; grades-=8; confidence-=3; bad(); nextStep(); }
function leave(){ confidence+=5; good(); nextStep(); }
function refuse(){ confidence+=6; good(); nextStep(); }

/* ---------- ENDEN ---------- */

function checkEnding(){
if(health<=0) ending("☠️ Dein Körper gibt auf.");
if(addiction>=10) ending("🌑 Die Sucht übernimmt dein Leben vollständig.");
if(grades>=170 && addiction<3) ending("🌟 Du schaffst deinen Abschluss mit starken Noten.");
if(friends>=8 && addiction<4) ending("💖 Du findest echte Freunde und Stabilität.");
if(confidence<=0) ending("🌫️ Du ziehst dich komplett zurück und verlierst dich selbst.");
}

function ending(text){
story.innerHTML=text;
choicesDiv.innerHTML="";
throw new Error("Ende");
}

nextStep();
