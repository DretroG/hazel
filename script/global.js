

    /* David & Zoe 25/01/2026 */
// Refresh position
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};
function scrollToTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "instant"
  });
}
/* ================= GLOBAL MUSIC ================= */
const music = document.getElementById("bgMusic");

/* ================= INTRO ================= */
const prompt = document.getElementById("musicPrompt");
const projection = document.getElementById("projection");
const continueBtnContainer = document.getElementById("continueBtnContainer");

function enableMusic(choice) {
  if (choice && music && music.paused) {
    music.volume = 0.6;
    music.play();
  }

  if (prompt) prompt.style.opacity = "0";

  setTimeout(() => {
    if (prompt) prompt.remove();
    if (projection) {
      projection.style.opacity = "1";
      projection.style.pointerEvents = "auto";
    }
    startIntroTyping();
  }, 900);
}

function startIntroTyping(speed = 120) {
  const el = document.getElementById("typewriter");
  if (!el) return;

  const text = el.innerHTML.replace(/<br>/g, "\n");
  el.innerHTML = "";

  const cursor = document.createElement("span");
  cursor.className = "cursor";
  el.appendChild(cursor);

  let i = 0;
  (function type() {
    if (i < text.length) {
      let c = text[i] === "\n" ? "<br>" : text[i];
      cursor.insertAdjacentHTML("beforebegin", c);
      i++;
      setTimeout(type, speed);
    } else {
      if (continueBtnContainer) {
        continueBtnContainer.style.opacity = "1";
      }
    }
  })();
}

/* ================= NAVIGATE TO MEMORIES ================= */

function goToMemories() {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  const intro = document.getElementById("page-intro");
  const memoriesPage = document.getElementById("page-memories");
  const projection = document.getElementById("projection");

  // Fade out intro
  intro.classList.remove("show");

  // HARD disable intro layer
  if (projection) {
    projection.style.pointerEvents = "none";
    projection.style.display = "none";
  }

  setTimeout(() => {
    memoriesPage.classList.add("show");
    memoriesPage.style.pointerEvents = "auto";
    initMemories();
  }, 900);
}

/* ================= MEMORIES ================= */
const memories = [
  "Remember the first time we met?\nYou were soo radiant… and somehow....🙃",
  "I still remember our late night talks, our jokes, and your soothing presence.\nThose moments stay with me forever...🙂",
  "Do you remember the times i would sleep in your arms like a baby...😁🙃\nYou will say...''Lovee..Wake up!''...🙂💖",
  "Every memory we’ve shared has made me happier than i've ever imagined...🥰",
  "I will remember this day and every other days i find myself around you.\nI am so lucky i met you...🥰🥰💖",
  "You deserve the Best!...\nMy Sweet Nocciola...🥰\nso i hope you are smiling...😁\nCause that is want matters to me right now...\nfor you to be happy...🙃",
  "C'mon swwweet...🙂🙃\nI want to see your beautiful smile...😁\nummm...that's great🥰😁\nI can see you in spirit y'know...👀"
];

let memIndex = 0;

function initMemories() {
  memIndex = 0;
  const container = document.getElementById("memoriesContainer");
  if (!container) return;
  container.innerHTML = "";
  renderMemory();
}

function renderMemory() {
  const container = document.getElementById("memoriesContainer");

  // End → final button
  if (memIndex >= memories.length) {
  const finalBtn = document.createElement("button");
  finalBtn.className = "continue";
  finalBtn.textContent = "One Last Thing...🎁";
  finalBtn.onclick = goToFinalPage;

  // ensure visibility
  finalBtn.style.display = "block";
  finalBtn.style.opacity = "1";
  finalBtn.style.pointerEvents = "auto";
  finalBtn.style.margin = "2rem auto";

  container.appendChild(finalBtn);
  finalBtn.scrollIntoView({ behavior: "smooth", block: "center" });
  return;
}


  const frame = document.createElement("div");
  frame.className = "typewriter-frame";

  const textEl = document.createElement("p");
  textEl.className = "typewriter-text";
  frame.appendChild(textEl);

  const btn = document.createElement("button");
  btn.className = "continue";
  btn.textContent = "Continue…..🙃";
  btn.style.display = "none";
  frame.appendChild(btn);

  container.appendChild(frame);

  let i = 0;
  const text = memories[memIndex];

  function type() {
    if (i < text.length) {
      textEl.innerHTML += text[i] === "\n" ? "<br>" : text[i];
      i++;
      setTimeout(type, 40);
    } else {
      btn.style.display = "block";
    }
  }

  btn.onclick = () => {
    btn.remove();
    memIndex++;
    renderMemory();
  };

  type();
}

/* ================= FINAL PAGE ================= */
const collageItems = [
  { img: "images/m1.png", text: "I see you….\n\nLooking soo beautiful in a red dress...\nSmart, Pretty, Loving, Carimg, Sweet...\nLook how cute Milo is...🤭😊\nOhh...And Stella too..." },
  { img: "images/m2.png", text: "You and I...\n\nEnjoying the moment...🥳\nHolding your hand soo tight...\nGlazing at your beautiful eyes...🥰🙂" },
  { img: "images/m3.png", text: "How Sweet!...\n\nMaking a heartfelt wish while watching you...\nas the candles glow...\nEven Milo...And Stella seem to share in the magic of this moment." },
  { img: "images/m4.png", text: "Us Cute Lovers...🤭😊\n\nSurrounded by Our Loved Onnes...🥰💖\nAnd dancing at their cheerful heart\nLaughter, music, and confetti fills the air in the wonderful momoent...🥳" },
  { img: "images/m5.png", text: "After the womderful moment...\n\nUnder the Moonlight...\nSitting side by side beneath a glowing full moon...\nsoo amazing!...🤭" }
];

const finalMessage =
  "Happy Birthday, My Sweet Sunshine 🌞💖\n\n" +
  "I Love more than words can hold,\n" +
  "more than moments can explain.\n\n" +
  "Soo...i hope you enjoyed this little show...🙃🙃\n" +
  "Today is yours...and so is my heart...\n\nTill Infinity and Beyond...❤️💕💕";

let collageIndex = 0;
let collageStarted = false;

function goToFinalPage() {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  const memoriesPage = document.getElementById("page-memories");
  const final = document.getElementById("page-final");

  memoriesPage.classList.remove("show");
  memoriesPage.style.display="none";

  setTimeout(() => {
    final.classList.add("show");
    startFinalIntro();
  }, 900);
}

function startFinalIntro() {
  const msg =
    "Do you remember the dream i had?\n" +
    "I said i will tell you today...🙃🙃\n" +
    "Now, it’s time you see the way I see you…\n" +
    "the way I imagined our beautiful\n moments on your birthday.\n" +
    "Are you ready...😁😁";

  typeSlow("FinalTypewriter", msg, 55, () => {
    document.getElementById("finalIntroBtn").style.display = "block";
  });
}

function startCollage() {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  const intro = document.getElementById("final-intro");
  const btn = document.getElementById("finalIntroBtn");

  if (intro) intro.style.display = "none";
  if (btn) btn.style.display = "none";

  if (collageStarted) return;
  collageStarted = true;

  startCountdown(showNextImage);
}

function startCountdown(done) {
  const cd = document.createElement("div");
  cd.id = "countdown";
  cd.textContent = "3";
  cd.style.cssText = `
    position:fixed;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    font-size:6rem;
    font-weight:800;
    color:#ffd27d;
    animation:pulse 1s infinite;
    z-index:9999;
  `;
  document.body.appendChild(cd);

  let n = 2;
  const t = setInterval(() => {
    if (n === 0) {
      clearInterval(t);
      cd.remove();
      done();
    } else {
      cd.textContent = n--;
    }
  }, 1000);
}

function showNextImage() {
  const wrap = document.getElementById("collageContainer");

  if (collageIndex >= collageItems.length) {
    const container = document.getElementById("collageContainer");

    const frame = document.createElement("div");
    frame.className = "collage-frame";

    const text = document.createElement("p");
    text.className = "handwritten";
    frame.appendChild(text);
    container.appendChild(frame);

    typeSlowElement(text, finalMessage, 50, () => {
      const heartBtn = document.createElement("button");
      heartBtn.className = "heart-restart";
      heartBtn.innerHTML = "💖 Wanna see again… 🙃";

      heartBtn.onclick = () => location.reload();

      frame.appendChild(heartBtn);
    });

    frame.scrollIntoView({ behavior: "smooth", block: "end" });
    return;
  }

  const item = collageItems[collageIndex];
  const frame = document.createElement("div");
  frame.className = "collage-frame";

  const img = document.createElement("img");
  img.src = item.img;
  img.style.opacity = "0";
  frame.appendChild(img);

  wrap.appendChild(frame);

  setTimeout(() => {
    img.style.transition = "opacity 1.2s ease";
    img.style.opacity = "1";

    const txt = document.createElement("p");
    txt.className = "handwritten";
    frame.appendChild(txt);

    typeSlowElement(txt, item.text, 50, () => {
      const btn = document.createElement("button");
      btn.className = "continue";
      btn.textContent = "Continue...💫";
      frame.appendChild(btn);
      btn.onclick = () => {
        btn.remove();
        collageIndex++;
        showNextImage();
      };
    });
  }, 700);
}

/*  HELPERS */
function typeSlow(id, text, speed, done) {
  const el = document.getElementById(id);
  el.innerHTML = "";
  typeSlowElement(el, text, speed, done);
}

function typeSlowElement(el, text, speed, done) {
  let i = 0;
  (function type() {
    if (i < text.length) {
      el.innerHTML += text[i] === "\n" ? "<br>" : text[i];
      i++;
      setTimeout(type, speed);
    } else done && done();
  })();
}

/* RESTART */
function restartExperience() {
  location.reload();
}

