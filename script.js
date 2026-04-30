let player = {};
const dialogue = document.getElementById("dialogue");
const choices = document.getElementById("choices");
const music = document.getElementById("bg-music");

/* REMOVE EMOJIS FOR VOICE */
function cleanText(text){
  return text.replace(/[\u{1F600}-\u{1F6FF}]/gu,"");
}

/* VOICE SYSTEM */
function speak(character,text){
  try{
    let speech = new SpeechSynthesisUtterance(cleanText(text));
    speech.rate = 1;

    let voices = speechSynthesis.getVoices();

    if(character.includes("Parent")){
      speech.voice = voices[0];
      speech.pitch = 0.8;
    }
    else if(character.includes("Friend")){
      speech.voice = voices[1] || voices[0];
      speech.pitch = 1.3;
    }
    else{
      speech.voice = voices[0];
      speech.pitch = 1;
    }

    speechSynthesis.cancel();
    speechSynthesis.speak(speech);
  }catch(e){}
}

/* SHOW FUNCTION */
function show(character,text,options=[]){
  dialogue.innerText = character + "\n\n" + text;

  music.pause();
  speak(character,text);

  setTimeout(()=>{
    music.play().catch(()=>{});
  },2000);

  choices.innerHTML = "";

  options.forEach(o=>{
    let b=document.createElement("button");
    b.innerText=o.text;
    b.className="choice-btn";
    b.onclick=o.action;
    choices.appendChild(b);
  });
}

/* FLOW */
function showForm(){
 document.getElementById("welcome-screen").classList.add("hidden");
 document.getElementById("start-screen").classList.remove("hidden");
}

function startGame(){
 player.name=document.getElementById("name").value;

 document.getElementById("start-screen").classList.add("hidden");
 document.getElementById("game-screen").classList.remove("hidden");

 music.play().catch(()=>{});

 intro();
}

/* STORY */

function intro(){
 show("🌟 Pathway Pal",
 `Hey ${player.name}...

This isn't just a game.

This is a glimpse into your future.

Every choice you make from here...
shapes the life you’ll live.`,
 [
  {text:"I'm ready", action:parentScene}
 ]);
}

function parentScene(){
 show("👪 Parent",
 `Listen carefully.

Stability matters.
Security matters.

Choose a path that keeps your life... safe.`,
 [
  {text:"Maybe they're right", action:friendScene},
  {text:"I want something different", action:friendScene}
 ]);
}

function friendScene(){
 show("🧑 Friend",
 `Forget safe!

We could build something BIG.
Take risks. Live freely.

What's life without a little chaos?`,
 [
  {text:"Take the risk", action:decision1},
  {text:"Play it safe", action:decision1}
 ]);
}

function decision1(){
 show("🌟 Pathway Pal",
 `This is one of those moments...

The kind you'll remember years later.

Do you step into the unknown...
or stay where it's comfortable?`,
 [
  {text:"Go abroad 🌍", action:ending},
  {text:"Stay local 🏠", action:ending}
 ]);
}

function ending(){
 show("🌟 Pathway Pal",
 `And just like that...

a path begins to unfold.

No choice is perfect.
No path is guaranteed.

But one thing is certain—

your story has only just begun.`,
 []);
}