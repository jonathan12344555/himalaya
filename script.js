let health=100, confidence=50, grades=100, friends=0;
let stress=0, addiction=0, support=0, hope=0;

let eventsSeen=[];

const story=document.getElementById("story");
const choicesDiv=document.getElementById("choices");

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
document.body.classList.toggle("dark-bg", addiction>=5);
document.body.classList.toggle("warm", friends>=4);
document.body.classList.toggle("shake", health<35);
document.body.classList.toggle("blur", stress>=7);
document.querySelector(".game-container").classList.toggle("glow", hope>=5);
}

function good(){document.body.classList.add("good-flash");setTimeout(()=>document.body.classList.remove("good-flash"),400);}
function bad(){document.body.classList.add("bad-flash");setTimeout(()=>document.body.classList.remove("bad-flash"),400);}

/* ---------- ENDINGS ---------- */

function checkEnd(){
if(addiction>=8 && health<30) return overdoseEnd();
if(addiction>=9) return lostEnd();
if(hope>=6 && support>=5) return recoveryEnd();
if(grades>=160 && friends>=5) return successEnd();
if(stress>=9 && confidence<20) return breakdownEnd();
return false;
}

/* ---------- EVENT SYSTEM ---------- */

function nextEvent(){
updateStats();
updateWorld();
if(checkEnd()) return;

let pool=events.filter(e=>!eventsSeen.includes(e.id));
if(pool.length===0) pool=events; // falls alle durch sind, wiederholen erlaubt

let e=pool[Math.floor(Math.random()*pool.length)];
eventsSeen.push(e.id);
e.play();
}

/* ---------- ACTIONS ---------- */

function useDrug(level){
addiction+=level;
health-=5+level*3;
grades-=4+level;
confidence-=2;
stress++;
bad();
nextEvent();
}

function refuse(){confidence+=6;hope++;good();nextEvent();}
function healthyChoice(){health+=8;hope++;good();nextEvent();}
function makeFriend(){friends++;confidence+=4;hope++;good();nextEvent();}
function acceptHelp(){support+=2;hope+=2;good();nextEvent();}
function isolate(){stress++;confidence-=4;bad();nextEvent();}
function study(){grades+=15;hope++;good();nextEvent();}

/* ---------- EVENTS ---------- */

const events=[

{id:"party_beer", play(){
story.textContent="Auf einer Party drückt dir jemand ein starkes Bier in die Flosse.";
choicesDiv.innerHTML=`<button onclick="refuse()">Ablehnen</button>
<button onclick="useDrug(2)">Trinken</button>`;
}},

{id:"vodka_shots", play(){
story.textContent="Eine Gruppe fordert dich zu mehreren Vodka-Shots auf.";
choicesDiv.innerHTML=`<button onclick="refuse()">Nein sagen</button>
<button onclick="useDrug(3)">Mitmachen</button>`;
}},

{id:"weed_circle", play(){
story.textContent="Im Park sitzt eine Runde mit Cannabis.";
choicesDiv.innerHTML=`<button onclick="refuse()">Weitergehen</button>
<button onclick="useDrug(3)">Bleiben</button>`;
}},

{id:"pill_offer", play(){
story.textContent="Jemand bietet dir Beruhigungspillen gegen Stress an.";
choicesDiv.innerHTML=`<button onclick="healthyChoice()">Ablehnen</button>
<button onclick="useDrug(4)">Nehmen</button>`;
}},

{id:"cocaine_line", play(){
story.textContent="Auf einer Feier liegt Kokain auf dem Tisch.";
choicesDiv.innerHTML=`<button onclick="healthyChoice()">Gehen</button>
<button onclick="useDrug(5)">Bleiben</button>`;
}},

{id:"heroin_scene", play(){
story.textContent="Du gerätst in eine Gruppe, in der Heroin konsumiert wird.";
choicesDiv.innerHTML=`<button onclick="acceptHelp()">Hilfe suchen</button>
<button onclick="useDrug(6)">Mitziehen</button>`;
}},

{id:"new_friend", play(){
story.textContent="Ein netter Pinguin fragt, ob du dich zu ihm setzen willst.";
choicesDiv.innerHTML=`<button onclick="makeFriend()">Dazusetzen</button>
<button onclick="isolate()">Allein bleiben</button>`;
}},

{id:"study_group", play(){
story.textContent="Ein Lernkreis bereitet sich auf Prüfungen vor.";
choicesDiv.innerHTML=`<button onclick="study()">Mitlernen</button>
<button onclick="isolate()">Absagen</button>`;
}},

{id:"concerned_friend", play(){
story.textContent="Ein Freund spricht dich besorgt auf dein Verhalten an.";
choicesDiv.innerHTML=`<button onclick="acceptHelp()">Zuhören</button>
<button onclick="isolate()">Abblocken</button>`;
}}

];

/* ---------- ENDINGS ---------- */

function successEnd(){ story.innerHTML="🌟 ERFOLG – Du hast gesunde Freundschaften, gute Noten und ein stabiles Leben aufgebaut."; choicesDiv.innerHTML=""; }
function recoveryEnd(){ story.innerHTML="💚 NEUANFANG – Du hast Hilfe angenommen und kämpfst dich Schritt für Schritt zurück."; choicesDiv.innerHTML=""; }
function lostEnd(){ story.innerHTML="🌑 SUCHT – Die Sucht hat dein Leben komplett übernommen."; choicesDiv.innerHTML=""; }
function overdoseEnd(){ story.innerHTML="☠️ ÜBERDOSIS – Dein Körper hält der Belastung nicht mehr stand."; choicesDiv.innerHTML=""; }
function breakdownEnd(){ story.innerHTML="🌫️ ZUSAMMENBRUCH – Stress und Einsamkeit überwältigen dich."; choicesDiv.innerHTML=""; }

nextEvent();
