// ==================== ANIMACIONES DE FONDO ====================
function crearEstrellas() {
  for (let i = 0; i < 80; i++) {
    let s = document.createElement("div");
    s.className = "star";
    s.style.top = Math.random() * 100 + "vh";
    s.style.left = Math.random() * 100 + "vw";
    s.style.animationDuration = 1 + Math.random() * 3 + "s";
    document.body.appendChild(s);
  }
}

function crearNivelesFlotantes() {
  const niveles = ["A0", "A1", "A2", "B1", "B2", "C1"];
  for (let i = 0; i < 20; i++) {
    let l = document.createElement("div");
    l.className = "level";
    l.innerText = niveles[Math.floor(Math.random() * niveles.length)];
    l.style.left = Math.random() * 100 + "vw";
    l.style.animationDuration = 8 + Math.random() * 14 + "s";
    l.style.fontSize = 8 + Math.random() * 8 + "px";
    document.body.appendChild(l);
  }
}

function crearNubes() {
  for (let i = 0; i < 5; i++) {
    let c = document.createElement("div");
    c.className = "cloud";
    c.style.top = 30 + Math.random() * 60 + "vh";
    c.style.animationDuration = 15 + Math.random() * 20 + "s";
    c.style.width = 80 + Math.random() * 80 + "px";
    document.body.appendChild(c);
  }
}

// ==================== LOGIN Y REGISTRO ====================
function mostrarLogin() {
  document.getElementById("loginOverlay").style.display = "flex";
  document.getElementById("registroOverlay").style.display = "none";
}

function mostrarRegistro() {
  document.getElementById("registroOverlay").style.display = "flex";
  document.getElementById("loginOverlay").style.display = "none";
}

function cerrarOverlays() {
  document.getElementById("loginOverlay").style.display = "none";
  document.getElementById("registroOverlay").style.display = "none";
}

function registrar() {
  let user = document.getElementById("regUser").value.trim();
  let pass = document.getElementById("regPass").value.trim();
  if (!user || !pass) {
    alert("Por favor completa usuario y contraseña");
    return;
  }
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  if (usuarios.some((u) => u.user === user)) {
    alert("Este usuario ya existe. Elige otro nombre.");
    return;
  }
  usuarios.push({ user, pass });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  alert("¡Cuenta creada correctamente! Bienvenido a Star Languages 🚀");
  cerrarOverlays();
  mostrarLogin();
}

function entrar() {
  let user = document.getElementById("loginUser").value.trim();
  let pass = document.getElementById("loginPass").value.trim();
  if (!user || !pass) {
    alert("Por favor ingresa usuario y contraseña");
    return;
  }
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  let valido = usuarios.find((u) => u.user === user && u.pass === pass);
  if (valido) {
    alert("¡Bienvenido de nuevo, " + user + "! 🌟");
    cerrarOverlays();
  } else {
    alert("Usuario o contraseña incorrectos");
  }
}

// ==================== TEST ====================
let preguntaActual = 0;
let respuestasCorrectas = 0;

const preguntasTest = [
  { q: "1. I ___ a student.", options: ["is", "am", "are"], correct: 1 },
  {
    q: "2. 'Yo tengo 15 años' se dice:",
    options: ["I have 15 years", "I am 15 years old", "I am 15 years"],
    correct: 1,
  },
  {
    q: "3. She ___ to school every day.",
    options: ["go", "goes", "going"],
    correct: 1,
  },
  {
    q: "4. FAST significa:",
    options: ["lento", "rápido", "grande"],
    correct: 1,
  },
  {
    q: "5. They ___ playing football.",
    options: ["is", "are", "am"],
    correct: 1,
  },
  {
    q: "6. What is the opposite of BIG?",
    options: ["Small", "Tall", "Fast"],
    correct: 0,
  },
  {
    q: "7. I ___ like pizza.",
    options: ["don't", "doesn't", "not"],
    correct: 0,
  },
  {
    q: "8. '¿Dónde está el baño?' in English is:",
    options: [
      "Where is the kitchen?",
      "Where is the bathroom?",
      "Where is the bed?",
    ],
    correct: 1,
  },
  { q: "9. He ___ a doctor.", options: ["are", "am", "is"], correct: 2 },
  {
    q: "10. My brother ___ two cats.",
    options: ["have", "has", "having"],
    correct: 1,
  },
  {
    q: "11. What time ___ you get up?",
    options: ["do", "does", "are"],
    correct: 0,
  },
  {
    q: "12. Yesterday I ___ to the park.",
    options: ["go", "went", "going"],
    correct: 1,
  },
  { q: "13. This is ___ book.", options: ["my", "mine", "me"], correct: 0 },
  { q: "14. How ___ are you?", options: ["old", "big", "tall"], correct: 0 },
  {
    q: "15. I like ___ music.",
    options: ["listen", "listening", "listens"],
    correct: 1,
  },
  { q: "16. There ___ two apples.", options: ["is", "are", "be"], correct: 1 },
  {
    q: "17. She can ___ English very well.",
    options: ["speak", "speaks", "speaking"],
    correct: 0,
  },
  {
    q: "18. What ___ you do yesterday?",
    options: ["do", "did", "does"],
    correct: 1,
  },
  {
    q: "19. This is the ___ day of my life.",
    options: ["good", "better", "best"],
    correct: 2,
  },
  {
    q: "20. I ___ go to the party if I finish my homework.",
    options: ["will", "would", "can"],
    correct: 0,
  },
];

function mostrarPreguntaTest() {
  const contenido = document.getElementById("contenidoPantalla");
  const p = preguntasTest[preguntaActual];
  let html = `<h3 style="margin-bottom:25px; color:#fff;">${p.q}</h3>`;
  p.options.forEach((op, i) => {
    html += `<label style="display:block; margin:14px auto; font-size:16px; background:rgba(255,255,255,0.15); padding:16px; border-radius:10px; cursor:pointer;">
                    <input type="radio" name="respuesta" value="${i}" style="margin-right:12px;"> ${op}
                 </label>`;
  });
  html += `<button onclick="siguientePreguntaTest()" style="margin-top:25px; padding:16px 50px; font-size:15px;">SIGUIENTE →</button>`;
  contenido.innerHTML = html;
}

function siguientePreguntaTest() {
  const seleccion = document.querySelector('input[name="respuesta"]:checked');
  if (!seleccion) {
    alert("¡Selecciona una respuesta!");
    return;
  }
  if (parseInt(seleccion.value) === preguntasTest[preguntaActual].correct)
    respuestasCorrectas++;
  preguntaActual++;
  if (preguntaActual < preguntasTest.length) mostrarPreguntaTest();
  else mostrarResultadoTest();
}

function mostrarResultadoTest() {
  let nivel =
    respuestasCorrectas <= 8
      ? "A1"
      : respuestasCorrectas <= 13
        ? "A2"
        : respuestasCorrectas <= 16
          ? "B1"
          : "B2";
  localStorage.setItem("nivelUsuario", nivel);
  document.getElementById("contenidoPantalla").innerHTML = `
        <h2>¡TEST COMPLETADO! 🎉</h2>
        <p style="font-size:24px; margin:25px 0;">Correctas: <strong>${respuestasCorrectas}/20</strong></p>
        <p style="font-size:28px; color:#e8c547;">Tu nivel es: <strong>${nivel}</strong></p>
        <button onclick="reiniciarTest()" style="padding:18px 50px; font-size:15px;">HACER TEST DE NUEVO</button>
    `;
}

function reiniciarTest() {
  preguntaActual = 0;
  respuestasCorrectas = 0;
  abrirPantalla("test");
}

// ==================== CONSEJOS POR MÓDULO ====================
const consejosPorModulo = {
  A1: `<h2 style="color:#e8c547;">💡 CONSEJOS A1 (Básico)</h2><p>★ Aprende los verbos to be, have y can</p><p>★ Practica saludos y presentaciones</p><p>★ Repite en voz alta colores y números</p><p>★ Usa flashcards todos los días</p><p>★ Escucha canciones infantiles en inglés</p>`,
  A2: `<h2 style="color:#e8c547;">💡 CONSEJOS A2 (Pre-intermedio)</h2><p>★ Practica Present Continuous y Past Simple</p><p>★ Describe tu rutina diaria</p><p>★ Mira videos cortos con subtítulos</p><p>★ Escribe 5 oraciones simples al día</p><p>★ Habla solo frente al espejo</p>`,
  B1: `<h2 style="color:#e8c547;">💡 CONSEJOS B1 (Intermedio)</h2><p>★ Usa Present Perfect y Future forms</p><p>★ Cuenta historias del pasado</p><p>★ Lee artículos cortos en inglés</p><p>★ Practica conversaciones de viajes y trabajo</p><p>★ Escucha podcasts a velocidad normal</p>`,
  B2: `<h2 style="color:#e8c547;">💡 CONSEJOS B2 (Avanzado)</h2><p>★ Domina condicionales y pasivos</p><p>★ Debate temas de actualidad</p><p>★ Lee libros simplificados</p><p>★ Escribe ensayos cortos</p><p>★ Mira series sin subtítulos</p>`,
  C1: `<h2 style="color:#e8c547;">💡 CONSEJOS C1 (Avanzado)</h2><p>★ Usa phrasal verbs y idioms</p><p>★ Expresa opiniones complejas</p><p>★ Lee noticias reales</p><p>★ Practica speaking con nativos</p><p>★ Escribe textos formales</p>`,
};

function mostrarConsejos() {
  let html = `<h2 style="margin-bottom:30px;">💡 CONSEJOS POR MÓDULO</h2><div class="modulo-grid">`;
  ["A1", "A2", "B1", "B2", "C1"].forEach((mod) => {
    html += `<div class="modulo-card" onclick="mostrarConsejoModulo('${mod}')">${mod}</div>`;
  });
  html += `</div>`;
  document.getElementById("contenidoPantalla").innerHTML = html;
}

function mostrarConsejoModulo(mod) {
  document.getElementById("contenidoPantalla").innerHTML =
    consejosPorModulo[mod] +
    `<br><button onclick="abrirPantalla('tips')" style="margin-top:30px;">VOLVER A MÓDULOS</button>`;
}

// ==================== PREGUNTAS DEL JUEGO (por CEFR) ====================
function mq(q, options, correct) {
  return { q, options, correct, type: "multiple" };
}
function iq(q, answer, answers) {
  return {
    q,
    options: null,
    answer,
    answers: answers || [answer],
    type: "input",
  };
}

const preguntasJuego = {
  A1: [
    mq("Complete: I ___ a student.", ["am", "is", "are"], 0),
    mq("Complete: She ___ from Mexico.", ["is", "am", "are"], 0),
    mq("Complete: They ___ my classmates.", ["is", "am", "are"], 2),
    mq("Complete: There ___ two cats in the garden.", ["is", "are", "am"], 1),
    mq("Which sentence is correct?", ["He are a doctor.", "He is a doctor.", "He am a doctor."], 1),
    mq("How do you ask someone's age?", ["How old are you?", "How many years do you have?", "What age do you have?"], 0),
    mq("Complete: This is ___ book.", ["my", "me", "I"], 0),
    mq("Complete: ___ is your name?", ["Who", "What", "Where"], 1),
    mq("Complete: We ___ happy today.", ["is", "are", "am"], 1),
    mq("Complete: There is ___ apple on the table.", ["a", "an", "the"], 1),
    mq("Complete: I have ___ brothers.", ["two", "too", "to"], 0),
    mq("Which question is correct?", ["Where you live?", "Where do you live?", "Where does you live?"], 1),
    mq("Complete: She ___ a blue bag.", ["have", "has", "having"], 1),
    mq("Complete: ___ you like pizza?", ["Does", "Do", "Are"], 1),
    mq("Complete: My favorite color is ___.", ["blue", "blues", "bluing"], 0),
    mq("Complete: He can ___ English.", ["speak", "speaks", "speaking"], 0),
    mq("Complete: I ___ not tired.", ["am", "is", "are"], 0),
    mq("Complete: The books ___ on the shelf.", ["is", "are", "am"], 1),
    mq("Which greeting is correct?", ["How you are?", "How are you?", "How is you?"], 1),
    mq("Complete: ___ cat is black.", ["A", "An", "These"], 0),
    mq("Complete: Please ___ the door.", ["open", "opens", "opening"], 0),
    mq("Complete: I live ___ Bogotá.", ["in", "on", "at"], 0),
    mq("Complete: She ___ tea every morning.", ["drink", "drinks", "drinking"], 1),
    mq("Complete: ___ are my friends.", ["This", "That", "These"], 2),
    mq("Complete: Where ___ the keys?", ["is", "are", "am"], 1),
    mq("Complete: I ___ ten years old.", ["have", "am", "is"], 1),
    mq("Complete: ___ you my teacher?", ["Is", "Are", "Am"], 1),
    mq("Complete: He ___ not at home.", ["am", "is", "are"], 1),
    mq("Complete: We ___ English at school.", ["study", "studies", "studying"], 0),
    mq("Complete: That is ___ umbrella.", ["a", "an", "two"], 1),
    mq("Complete: ___ is the bathroom?", ["What", "Where", "Who"], 1),
    mq("Complete: My parents ___ very kind.", ["is", "are", "am"], 1),
    mq("Complete: I can ___ a bike.", ["ride", "rides", "riding"], 0),
    mq("Complete: She has ___ dog.", ["a", "an", "any"], 0),
    mq("Complete: ___ morning I drink coffee.", ["In", "On", "At"], 0),
    mq("Complete: They ___ in a big house.", ["live", "lives", "living"], 0),
  ],
  A2: [
    mq("Complete: I ___ watching TV right now.", ["am", "is", "are"], 0),
    mq("Complete: She ___ to school every day.", ["go", "goes", "going"], 1),
    mq("Complete: Yesterday I ___ to the cinema.", ["go", "went", "going"], 1),
    mq("Complete: They ___ playing soccer at the moment.", ["is", "are", "am"], 1),
    mq("Which negative is correct?", ["He don't like coffee.", "He doesn't like coffee.", "He not likes coffee."], 1),
    mq("Complete: We ___ dinner at 7 p.m. yesterday.", ["eat", "ate", "eating"], 1),
    mq("Complete: What ___ you do last weekend?", ["do", "did", "does"], 1),
    mq("Complete: I usually ___ up at 7 a.m.", ["get", "gets", "getting"], 0),
    mq("Complete: She is ___ than her sister.", ["tall", "taller", "tallest"], 1),
    mq("Complete: There aren't ___ chairs here.", ["some", "any", "a"], 1),
    mq("Complete: He ___ football when he was young.", ["played", "plays", "playing"], 0),
    mq("Complete: Look! It ___ outside.", ["rains", "is raining", "rained"], 1),
    mq("Complete: I ___ never late for class.", ["am", "is", "are"], 0),
    mq("Complete: Could you ___ me, please?", ["help", "helps", "helping"], 0),
    mq("Complete: We ___ to the beach last summer.", ["go", "went", "gone"], 1),
    mq("Complete: She doesn't ___ meat.", ["eat", "eats", "eating"], 0),
    mq("Complete: This movie is ___ interesting than that one.", ["more", "most", "much"], 0),
    mq("Complete: Are you ___ to the party tonight?", ["go", "going", "went"], 1),
    mq("Complete: I ___ my keys yesterday.", ["lose", "lost", "losing"], 1),
    mq("Complete: How ___ sugar do you want?", ["many", "much", "few"], 1),
    mq("Complete: He ___ in London for two years (past).", ["lived", "lives", "living"], 0),
    mq("Complete: Please don't ___ so loud.", ["talk", "talks", "talking"], 0),
    mq("Complete: They ___ TV when I arrived.", ["watched", "were watching", "watch"], 1),
    mq("Complete: I need ___ water, please.", ["a", "some", "any"], 1),
    mq("Complete: He is the ___ student in the class.", ["good", "better", "best"], 2),
    mq("Complete: I ___ my homework yet.", ["didn't finish", "haven't finished", "don't finish"], 1),
    mq("Complete: She ___ to music every evening.", ["listen", "listens", "listening"], 1),
    mq("Complete: We ___ a great time at the party.", ["have", "had", "having"], 1),
    mq("Complete: ___ you ever been to Spain?", ["Do", "Have", "Did"], 1),
    mq("Complete: I'm going to ___ my grandparents tomorrow.", ["visit", "visited", "visiting"], 0),
    mq("Complete: There is too ___ noise here.", ["many", "much", "few"], 1),
    mq("Complete: He ___ when the phone rang.", ["slept", "was sleeping", "sleeps"], 1),
    mq("Complete: Don't forget ___ your coat.", ["bring", "to bring", "bringing"], 1),
    mq("Complete: This bag is ___ than that one.", ["heavy", "heavier", "heaviest"], 1),
  ],
  B1: [
    mq("Complete: I ___ been living here since 2020.", ["have", "has", "had"], 0),
    iq("Complete: If I study hard, I ___ pass the exam.", "will", ["will", "'ll"]),
    mq("Complete: The book ___ written by a famous author.", ["was", "is", "were"], 0),
    mq("Which sentence is correct?", ["I have seen that movie last week.", "I saw that movie last week.", "I have saw that movie last week."], 1),
    mq("Complete: She has never ___ to Japan.", ["been", "be", "was"], 0),
    mq("Complete: By next year, I ___ have finished university.", ["will", "have", "had"], 0),
    mq("Complete: If it rains, we ___ stay home.", ["will", "would", "would have"], 0),
    mq("Complete: He asked me where I ___.", ["live", "lived", "living"], 1),
    mq("Complete: I have already ___ my homework.", ["do", "did", "done"], 2),
    mq("Complete: The email ___ sent yesterday.", ["was", "were", "is"], 0),
    mq("Complete: She ___ working here for five years.", ["has been", "is", "was"], 0),
    mq("Complete: You should ___ more carefully.", ["drive", "drove", "driving"], 0),
    mq("Complete: I used to ___ in a small town.", ["live", "lived", "living"], 0),
    mq("Complete: Unless you hurry, you ___ miss the bus.", ["will", "would", "would have"], 0),
    mq("Complete: This is the first time I ___ sushi.", ["eat", "ate", "have eaten"], 2),
    mq("Complete: He apologized ___ being late.", ["for", "of", "to"], 0),
    mq("Complete: I wish I ___ more free time.", ["have", "had", "will have"], 1),
    mq("Complete: The meeting has been ___ until Friday.", ["put off", "put on", "put in"], 0),
    mq("Complete: She said she ___ call me later.", ["will", "would", "can"], 1),
    mq("Complete: I'm looking forward to ___ you.", ["see", "seeing", "saw"], 1),
    mq("Complete: Neither of the answers ___ correct.", ["is", "are", "be"], 0),
    mq("Complete: He has ___ finished the report.", ["yet", "already", "still"], 1),
    mq("Complete: If I ___ you, I would accept the offer.", ["am", "were", "was being"], 1),
    mq("Complete: The problem ___ solved soon.", ["will be", "will", "is being"], 0),
    mq("Complete: I've known her ___ we were children.", ["for", "since", "during"], 1),
    mq("Complete: He suggested that we ___ early.", ["leave", "left", "leaving"], 0),
    mq("Complete: The film was so boring that I ___ asleep.", ["fall", "fell", "fallen"], 1),
    mq("Complete: You had better ___ now.", ["go", "went", "going"], 0),
    mq("Complete: She is interested ___ learning French.", ["on", "in", "at"], 1),
    mq("Complete: I can't find my phone. I ___ it at home.", ["must leave", "must have left", "should leave"], 1),
    mq("Complete: While I ___ dinner, the lights went out.", ["cooked", "was cooking", "cook"], 1),
    mq("Complete: There ___ to be a mistake in this bill.", ["seems", "seem", "is seeming"], 0),
    mq("Complete: He has been working here ___ three years.", ["since", "for", "during"], 1),
    mq("Complete: If she ___ harder, she will pass.", ["study", "studies", "studied"], 1),
  ],
  B2: [
    mq("Complete: I wish I ___ more time to study.", ["had", "have", "would have"], 0),
    iq("Complete: You should have ___ harder.", "studied"),
    mq("Which second conditional is correct?", ["If I would know, I would tell you.", "If I knew, I would tell you.", "If I know, I tell you."], 1),
    mq("Complete: The report ___ by the team last month.", ["was written", "wrote", "has written"], 0),
    mq("Complete: I would travel more if I ___ more money.", ["had", "have", "would have"], 0),
    mq("Complete: He suggested ___ early.", ["leaving", "leave", "to leave"], 0),
    mq("Complete: She denied ___ the window.", ["break", "breaking", "to break"], 1),
    mq("Complete: I'd rather you ___ here on time.", ["arrive", "arrived", "arriving"], 1),
    mq("Complete: Hardly ___ we started when it began to rain.", ["had", "have", "did"], 0),
    mq("Complete: The more you practice, ___ you become.", ["better", "the better", "best"], 1),
    mq("Complete: He is said ___ a talented musician.", ["be", "to be", "being"], 1),
    mq("Complete: No sooner ___ she left than the phone rang.", ["had", "has", "did"], 0),
    mq("Complete: I regret ___ him that.", ["tell", "telling", "to telling"], 1),
    mq("Complete: Despite ___ tired, she finished the race.", ["be", "being", "she was"], 1),
    mq("Complete: It's high time we ___.", ["leave", "left", "leaving"], 1),
    mq("Complete: She insisted that he ___ present.", ["be", "is", "was being"], 0),
    mq("Complete: Had it not been for your help, I ___ failed.", ["would have", "will have", "had"], 0),
    mq("Complete: The proposal needs ___ carefully.", ["consider", "to consider", "to be considered"], 2),
    mq("Complete: Scarcely ___ the news when everyone cheered.", ["we heard", "had we heard", "we had hear"], 1),
    mq("Complete: He is used to ___ early.", ["get up", "getting up", "got up"], 1),
    mq("Complete: I'd prefer ___ at home tonight.", ["stay", "to stay", "staying"], 1),
    mq("Complete: Not until midnight ___ the truth.", ["he discovered", "did he discover", "he did discover"], 1),
    mq("Complete: She accused him ___ lying.", ["of", "for", "to"], 0),
    mq("Complete: By the time we arrived, the show ___.", ["already started", "had already started", "has already started"], 1),
    mq("Complete: I'd sooner ___ at home than go out.", ["stay", "stayed", "staying"], 0),
    mq("Complete: The building is believed ___ in 1920.", ["build", "to have been built", "being built"], 1),
    mq("Complete: She spoke quietly so as not ___ anyone.", ["disturb", "to disturb", "disturbing"], 1),
    mq("Complete: What I need now ___ a short break.", ["is", "are", "be"], 0),
    mq("Complete: He avoided ___ about the problem.", ["talk", "talking", "to talk"], 1),
    mq("Complete: On no account ___ this door.", ["you must open", "must you open", "you open"], 1),
    mq("Complete: She is thought ___ the best player.", ["be", "to be", "being"], 1),
    mq("Complete: I can't help ___ about the exam.", ["worry", "worrying", "to worry"], 1),
    mq("Complete: Much ___ I tried, I couldn't solve it.", ["as", "though", "although"], 0),
    mq("Complete: The documents need ___ before Friday.", ["sign", "signing", "to be signed"], 2),
  ],
  C1: [
    mq("Complete: You ___ have told me earlier.", ["should", "must", "can"], 0),
    iq("Complete: Had I known, I ___ have helped you.", "would", ["would", "would have"]),
    mq("Which sentence is correct?", ["Not only he speaks English, but also French.", "Not only does he speak English, but also French.", "Not only does he speak English, but he also speaks French."], 2),
    mq("Complete: The project, ___ was completed last year, won an award.", ["which", "who", "whom"], 0),
    mq("Complete: Rarely ___ such a beautiful sunset.", ["I have seen", "have I seen", "I saw"], 1),
    mq("Complete: She insisted on ___ the bill.", ["paying", "pay", "to pay"], 0),
    mq("Complete: Little ___ that this would change everything.", ["he knew", "did he know", "he did know"], 1),
    mq("Complete: The committee agreed that the plan ___ revised.", ["be", "is", "was being"], 0),
    mq("Complete: Were it not for her support, the project ___ failed.", ["would have", "will have", "had"], 0),
    mq("Complete: He spoke as though he ___ everything.", ["knows", "knew", "has known"], 1),
    mq("Complete: Only after the meeting ___ the decision.", ["they announced", "did they announce", "they did announce"], 1),
    mq("Complete: She is widely ___ to be the best candidate.", ["regard", "regarded", "regarding"], 1),
    mq("Complete: Suffice it ___ say that the results were surprising.", ["to", "for", "that"], 0),
    mq("Complete: The findings cast doubt ___ previous theories.", ["on", "in", "at"], 0),
    mq("Complete: Be that as it ___, we must continue.", ["may", "might", "can"], 0),
    mq("Complete: Under no circumstances ___ this information.", ["you should share", "should you share", "you share"], 1),
    mq("Complete: The proposal was rejected ___ of cost.", ["on account", "because", "due"], 0),
    mq("Complete: Far ___ being a failure, the test was useful.", ["from", "of", "to"], 0),
    mq("Complete: It is imperative that she ___ present.", ["be", "is", "will be"], 0),
    mq("Complete: Such ___ his dedication that everyone admired him.", ["was", "were", "is"], 0),
    mq("Complete: The more complex the issue, the ___ the solution.", ["harder", "hardest", "more hard"], 0),
    mq("Complete: He resigned rather than ___ the policy.", ["accept", "accepting", "to accept"], 0),
    mq("Complete: Nowhere ___ a clearer explanation.", ["you will find", "will you find", "you find"], 1),
    mq("Complete: The report leaves much ___ desired.", ["to be", "to", "for"], 0),
    mq("Complete: So dense ___ the fog that we stopped.", ["was", "were", "is"], 0),
    mq("Complete: She would sooner resign than ___ the rules.", ["break", "breaking", "to break"], 0),
    mq("Complete: The theory has yet ___ proven.", ["be", "to be", "being"], 1),
    mq("Complete: In vain ___ to persuade him.", ["they tried", "did they try", "they did try"], 1),
    mq("Complete: He acted as if he ___ the owner.", ["is", "were", "was being"], 1),
    mq("Complete: All ___ considered, it was a success.", ["things", "thing", "the things"], 0),
    mq("Complete: The results are consistent ___ earlier findings.", ["with", "to", "for"], 0),
    mq("Complete: Barely ___ the room when the alarm rang.", ["had she entered", "she had entered", "she entered"], 0),
    mq("Complete: It remains ___ whether the plan will work.", ["see", "to be seen", "seeing"], 1),
    mq("Complete: He is by no means ___ for the role.", ["suit", "suited", "suiting"], 1),
  ],
};

function hashSeed(text) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function seededRandom(seed) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function seededShuffle(array, seed) {
  const arr = [...array];
  const rand = seededRandom(seed);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** 6 questions per level; never shares questions with the previous level */
function getPreguntasParaNivel(modulo, numero) {
  const pool = preguntasJuego[modulo] || preguntasJuego.A1;
  const shuffled = seededShuffle(pool, hashSeed(`bank-${modulo}`));
  const perLevel = 6;
  const blockCount = Math.floor(shuffled.length / perLevel);
  const blocks = [];
  for (let i = 0; i < blockCount; i++) {
    blocks.push(shuffled.slice(i * perLevel, i * perLevel + perLevel));
  }
  // Cycle blocks so consecutive levels always use different blocks
  const idx = (numero - 1) % blocks.length;
  return blocks[idx].map((q) => ({ ...q }));
}

/**
 * Max jump height ≈ 190px with vy=-19, gravity 0.95.
 * Keep vertical steps ≤ 110 and horizontal gaps ≤ 260 so every platform is reachable.
 */
function generarMapaNivel(modulo, numero) {
  const modBonus = { A1: 0, A2: 1, B1: 2, B2: 3, C1: 4 }[modulo] || 0;
  const groundY = 620;
  const pattern = (numero - 1) % 5;
  const stepUp = 85 + Math.min(modBonus * 4, 16);
  const gapX = 230 + Math.min(numero * 3, 30);
  const worldW = 2400 + numero * 180 + modBonus * 60;
  const plataformas = [{ x: 0, y: groundY, w: worldW, h: 50 }];
  const hazards = [];
  const estrellas = [];
  const maxRise = 105;
  const minPlatY = groundY - 185;
  const maxPlatY = groundY - 75;

  const addPlat = (x, y, w) => {
    const cy = Math.max(minPlatY, Math.min(maxPlatY, y));
    plataformas.push({ x, y: cy, w, h: 25 });
  };

  const chain = [];
  let x = 240;
  const count = 8 + Math.floor(numero / 2);

  for (let i = 0; i < count; i++) {
    let y;
    if (pattern === 0) {
      y = groundY - 90 - (i % 5) * (stepUp * 0.4);
    } else if (pattern === 1) {
      y = groundY - 100 - Math.sin(i * 0.9) * 50;
    } else if (pattern === 2) {
      y = groundY - 95 - (i % 2) * 65;
    } else if (pattern === 3) {
      const mid = count / 2;
      y = groundY - 90 - (i <= mid ? i : count - i) * (stepUp * 0.35);
    } else {
      y = groundY - 100 - (i % 3) * 45;
    }

    const w = 160 + (i % 3) * 25;
    chain.push({ x, y, w });

    // Helper ledge for harder/wider sections
    if (numero >= 4 && i % 2 === 1) {
      chain.push({
        x: x + gapX * 0.42,
        y: y + 50,
        w: 100,
      });
    }

    x += gapX + (i % 2) * 15;
  }

  chain.sort((a, b) => a.x - b.x);
  let prevY = groundY;
  let prevRight = 80;

  chain.forEach((p) => {
    if (p.x - prevRight > 280) {
      const midX = prevRight + (p.x - prevRight) / 2 - 50;
      const midY = Math.min(prevY, p.y) + 35;
      addPlat(midX, midY, 100);
      prevY = Math.max(minPlatY, Math.min(maxPlatY, midY));
      prevRight = midX + 100;
    }
    if (prevY - p.y > maxRise) {
      p.y = prevY - maxRise;
    }
    // Also don't drop so far that next jump back is awkward — still fine to drop down
    addPlat(p.x, p.y, p.w);
    prevY = Math.max(minPlatY, Math.min(maxPlatY, p.y));
    prevRight = p.x + p.w;
  });

  // Spread stars across different platforms
  const airPlats = plataformas.slice(1);
  const step = Math.max(1, Math.floor(airPlats.length / 6));
  for (let i = 0; i < 6; i++) {
    const p = airPlats[Math.min(i * step, airPlats.length - 1)];
    if (!p) break;
    estrellas.push({
      x: p.x + Math.min(p.w * 0.45, p.w - 24),
      y: p.y - 34,
      collected: false,
      pulse: i * 0.7,
    });
  }

  if (numero >= 3) {
    const hazardCount = Math.min(1 + Math.floor(numero / 3), 5);
    for (let i = 0; i < hazardCount; i++) {
      const hx = 520 + i * (360 + numero * 8) + ((numero * 41 + i * 73) % 70);
      const underPlat = airPlats.some(
        (p) => hx + 20 > p.x && hx < p.x + p.w,
      );
      if (!underPlat && hx < worldW - 200) {
        hazards.push({ x: hx, y: groundY - 28, w: 34, h: 28 });
      }
    }
  }

  return {
    worldW: Math.max(worldW, prevRight + 500),
    plataformas,
    estrellas,
    hazards,
    theme: pattern,
  };
}

// ==================== PROGRESS & DESBLOQUEO ====================
function getProgress() {
  return (
    JSON.parse(localStorage.getItem("starLanguagesProgress")) || {
      A1: [],
      A2: [],
      B1: [],
      B2: [],
      C1: [],
    }
  );
}

function saveProgress(mod, level) {
  let prog = getProgress();
  if (!prog[mod].includes(level)) prog[mod].push(level);
  localStorage.setItem("starLanguagesProgress", JSON.stringify(prog));
}

// ==================== FEEDBACK BONITO ====================
function showFeedback(text, isCorrect) {
  const feedback = document.createElement("div");
  feedback.className = "feedback";
  feedback.style.background = isCorrect ? "#e8c547" : "#9b1c28";
  feedback.style.borderColor = isCorrect ? "#e8c547" : "#d62839";
  feedback.style.color = isCorrect ? "#1a0506" : "#fff4e6";
  feedback.innerHTML = `<h2>${text}</h2>`;
  document.body.appendChild(feedback);
  setTimeout(() => feedback.remove(), 1400);
}

// ==================== VARIABLES GLOBALES DEL JUEGO ====================
let gameCanvas,
  ctx,
  player,
  keys,
  cameraX,
  plataformas,
  estrellas,
  hazards = [],
  preguntasNivel,
  moduloActual,
  numeroActual,
  currentQuestion = false,
  currentPreguntaActiva = null,
  availableQuestions = [],
  gameAnimationId = null,
  gameTime = 0,
  particles = [],
  levelCompleted = false,
  hazardCooldown = 0,
  worldWidth = 3200;

function normalizarTexto(texto) {
  return texto.trim().toLowerCase().replace(/\s+/g, " ");
}

function esRespuestaCorrecta(pregunta, respuestaUsuario) {
  if (pregunta.type === "input") {
    const respuesta = normalizarTexto(respuestaUsuario);
    const validas = pregunta.answers || [pregunta.answer];
    return validas.some((a) => normalizarTexto(a) === respuesta);
  }
  return Number(respuestaUsuario) === pregunta.correct;
}

function limpiarPreguntaJuego() {
  currentQuestion = false;
  currentPreguntaActiva = null;
  if (window.tempQuestionDiv) {
    window.tempQuestionDiv.remove();
    window.tempQuestionDiv = null;
  }
}

function detenerMiniJuego() {
  if (gameAnimationId !== null) {
    cancelAnimationFrame(gameAnimationId);
    gameAnimationId = null;
  }
  keys = {};
  limpiarPreguntaJuego();
  cerrarFinDeNivel();
}

// ==================== ABRIR PANTALLAS ====================
function abrirPantalla(tipo) {
  let titulo = "";
  let contenido = "";

  if (tipo === "test") {
    titulo = "📝 TEST DE NIVEL";
    preguntaActual = 0;
    respuestasCorrectas = 0;
  }
  if (tipo === "tips") {
    titulo = "💡 CONSEJOS";
  }
  if (tipo === "game") {
    titulo = "🎮 SELECT MÓDULO";
    contenido = `
            <div style="margin-bottom:40px; font-size:22px;">Elige tu módulo de inglés</div>
            <div class="modulo-grid">
                <div class="modulo-card" onclick="seleccionarModulo('A1')">A1</div>
                <div class="modulo-card" onclick="seleccionarModulo('A2')">A2</div>
                <div class="modulo-card" onclick="seleccionarModulo('B1')">B1</div>
                <div class="modulo-card" onclick="seleccionarModulo('B2')">B2</div>
                <div class="modulo-card" onclick="seleccionarModulo('C1')">C1</div>
            </div>
            <button onclick="cerrarPantalla()" style="margin-top:40px; padding:14px 50px;">VOLVER AL MENÚ</button>
        `;
  }

  document.getElementById("tituloPantalla").innerHTML = titulo;
  document.getElementById("contenidoPantalla").innerHTML = contenido || "";
  document.getElementById("pantalla").style.display = "flex";

  if (tipo === "test") mostrarPreguntaTest();
  if (tipo === "tips") mostrarConsejos();
}

function cerrarPantalla() {
  document.getElementById("pantalla").style.display = "none";
}

function seleccionarModulo(modulo) {
  moduloActual = modulo;
  const prog = getProgress();
  let html = `<h2 style="margin-bottom:20px; color:#e8c547;">MÓDULO ${modulo} - MAPA DE NIVELES</h2>
                <div class="level-map"><div class="mountain-bg"></div><div class="level-grid">`;
  for (let i = 1; i <= 10; i++) {
    const isUnlocked = i === 1 || prog[modulo].includes(i - 1);
    const boxClass = isUnlocked ? "level-box" : "level-box locked";
    html += `<div class="${boxClass}" onclick="${isUnlocked ? `iniciarNivel('${modulo}', ${i})` : `alert('Nivel bloqueado. Completa el nivel anterior.')`}">${isUnlocked ? `Nivel ${i}` : `Nivel ${i}`}</div>`;
  }
  html += `</div></div><button onclick="abrirPantalla('game')" style="margin-top:20px; padding:14px 40px;">← VOLVER A MÓDULOS</button>`;
  document.getElementById("contenidoPantalla").innerHTML = html;
}

function iniciarNivel(modulo, numero) {
  moduloActual = modulo;
  numeroActual = numero;
  cerrarPantalla();
  document.getElementById("gameContainer").style.display = "flex";
  setTimeout(() => iniciarMiniJuego(modulo, numero), 100);
}

function salirDelJuego() {
  detenerMiniJuego();
  document.getElementById("gameContainer").style.display = "none";
  cerrarFinDeNivel();
}

function cerrarFinDeNivel() {
  const panel = document.getElementById("levelEndOverlay");
  if (panel) panel.remove();
}

function mostrarFinDeNivel(starsEarned) {
  cerrarFinDeNivel();
  currentQuestion = true; // pause gameplay
  keys = {};

  const hasNext = numeroActual < 10;
  const div = document.createElement("div");
  div.id = "levelEndOverlay";
  div.className = "question-overlay level-end-overlay";
  div.innerHTML = `
    <span class="question-badge">${moduloActual} · Level ${numeroActual}</span>
    <h2 class="level-end-title">LEVEL COMPLETE!</h2>
    <p class="level-end-stars">${"⭐".repeat(starsEarned)}</p>
    <p class="level-end-sub">Great job — choose what to do next</p>
    <div class="level-end-actions">
      ${
        hasNext
          ? `<button type="button" class="question-submit" id="btnNextLevel">NEXT LEVEL</button>`
          : `<button type="button" class="question-submit" id="btnModuleMap">MODULE MAP</button>`
      }
      <button type="button" class="btn-home" id="btnHomeScreen">BACK TO HOME SCREEN</button>
    </div>
  `;
  document.body.appendChild(div);

  const nextBtn = document.getElementById("btnNextLevel");
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      cerrarFinDeNivel();
      currentQuestion = false;
      iniciarNivel(moduloActual, numeroActual + 1);
    });
  }

  const mapBtn = document.getElementById("btnModuleMap");
  if (mapBtn) {
    mapBtn.addEventListener("click", () => {
      salirDelJuego();
      abrirPantalla("game");
      seleccionarModulo(moduloActual);
    });
  }

  document.getElementById("btnHomeScreen").addEventListener("click", () => {
    salirDelJuego();
    cerrarPantalla();
    cerrarOverlays();
  });
}

// ==================== MINI JUEGO ====================
function iniciarMiniJuego(modulo, numero) {
  detenerMiniJuego();

  gameCanvas = document.getElementById("gameCanvas");
  ctx = gameCanvas.getContext("2d");

  player = {
    x: 120,
    y: 480,
    width: 52,
    height: 52,
    vx: 0,
    vy: 0,
    jumping: false,
    lives: 3,
  };
  keys = {};
  cameraX = 0;
  gameTime = 0;
  particles = [];
  levelCompleted = false;
  hazardCooldown = 0;

  const mapa = generarMapaNivel(modulo, numero);
  plataformas = mapa.plataformas;
  estrellas = mapa.estrellas;
  hazards = mapa.hazards;
  worldWidth = mapa.worldW;

  preguntasNivel = getPreguntasParaNivel(modulo, numero);
  availableQuestions = [...preguntasNivel];

  if (!window.gameListenersAdded) {
    document.addEventListener("keydown", (e) => {
      if (document.getElementById("gameContainer").style.display === "flex") {
        keys[e.key] = true;
      }
    });
    document.addEventListener("keyup", (e) => {
      keys[e.key] = false;
    });
    window.addEventListener("blur", () => {
      keys = {};
    });
    window.gameListenersAdded = true;
  } else {
    keys = {};
  }

  function spawnParticles(x, y, color) {
    for (let i = 0; i < 12; i++) {
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8 - 2,
        life: 30,
        color,
      });
    }
  }

  function drawBackground() {
    const sky = ctx.createLinearGradient(0, 0, 0, gameCanvas.height);
    sky.addColorStop(0, "#1a0506");
    sky.addColorStop(0.5, "#2a0608");
    sky.addColorStop(1, "#4a0e14");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

    ctx.fillStyle = "rgba(232,197,71,0.65)";
    const starPositions = [
      [80, 60], [200, 90], [340, 45], [520, 110], [700, 70],
      [880, 40], [1020, 95], [1180, 55], [1320, 80],
    ];
    starPositions.forEach(([sx, sy], i) => {
      const twinkle = 0.4 + Math.sin(gameTime * 0.05 + i) * 0.35;
      ctx.globalAlpha = twinkle;
      ctx.fillRect(sx - cameraX * 0.15, sy, 3, 3);
    });
    ctx.globalAlpha = 1;

    const mountains = [
      { x: 0, peak: 360, w: 500 },
      { x: 380, peak: 300, w: 620 },
      { x: 900, peak: 340, w: 700 },
    ];
    mountains.forEach((m, i) => {
      ctx.fillStyle = `rgba(214, 40, 57, ${0.12 + i * 0.05})`;
      ctx.beginPath();
      ctx.moveTo(m.x - cameraX * (0.2 + i * 0.1), 620);
      ctx.lineTo(m.x + m.w / 2 - cameraX * (0.2 + i * 0.1), m.peak);
      ctx.lineTo(m.x + m.w - cameraX * (0.2 + i * 0.1), 620);
      ctx.fill();
    });
  }

  function drawPlatforms() {
    plataformas.forEach((p) => {
      const px = p.x - cameraX;
      const grad = ctx.createLinearGradient(px, p.y, px, p.y + p.h);
      grad.addColorStop(0, "#ef4b5a");
      grad.addColorStop(1, "#7a151f");
      ctx.fillStyle = grad;
      ctx.fillRect(px, p.y, p.w, p.h);
      ctx.fillStyle = "#e8c547";
      ctx.fillRect(px, p.y - 5, p.w, 6);
      ctx.fillStyle = "rgba(255,244,230,0.15)";
      for (let gx = px + 10; gx < px + p.w - 10; gx += 28) {
        ctx.fillRect(gx, p.y - 12, 4, 8);
      }
    });
  }

  function drawWolf() {
    const px = player.x - cameraX;
    const py = player.y;
    const facing = player.vx < 0 ? -1 : 1;
    const bob = Math.abs(player.vx) > 0 ? Math.sin(gameTime * 0.3) * 2 : 0;

    ctx.save();
    ctx.translate(px + player.width / 2, py + bob);
    ctx.scale(facing, 1);
    ctx.translate(-player.width / 2, 0);

    ctx.fillStyle = "#c8c8d0";
    ctx.fillRect(4, 10, 44, 36);
    ctx.fillStyle = "#9a9aaa";
    ctx.fillRect(8, 0, 14, 14);
    ctx.fillRect(30, 0, 14, 14);
    ctx.fillStyle = "#2a2a35";
    ctx.fillRect(14, 22, 20, 14);
    ctx.fillStyle = "#111";
    ctx.fillRect(16, 18, 7, 7);
    ctx.fillRect(30, 18, 7, 7);
    ctx.fillStyle = "#fff";
    ctx.fillRect(18, 20, 3, 3);
    ctx.fillRect(32, 20, 3, 3);
    ctx.fillStyle = "#9a9aaa";
    ctx.fillRect(-8, 28, 14, 10);
    ctx.fillStyle = "#7a7a88";
    ctx.fillRect(36, 38, 10, 8);
    ctx.restore();
  }

  function drawStars() {
    estrellas.forEach((star) => {
      if (star.collected) return;
      const sx = star.x - cameraX;
      const pulse = 0.75 + Math.sin(gameTime * 0.08 + star.pulse) * 0.25;
      ctx.save();
      ctx.shadowColor = "#ffd700";
      ctx.shadowBlur = 16 * pulse;
      ctx.fillStyle = `rgba(255, 215, 0, ${pulse})`;
      ctx.font = "bold 44px Press Start 2P";
      ctx.fillText("★", sx, star.y);
      ctx.restore();
    });
  }

  function drawParticles() {
    particles = particles.filter((p) => p.life > 0);
    particles.forEach((p) => {
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.life / 30;
      ctx.fillRect(p.x - cameraX, p.y, 5, 5);
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.3;
      p.life--;
    });
    ctx.globalAlpha = 1;
  }

  function drawHazards() {
    hazards.forEach((h) => {
      const hx = h.x - cameraX;
      ctx.fillStyle = "#ffb020";
      const spikes = Math.max(2, Math.floor(h.w / 12));
      for (let i = 0; i < spikes; i++) {
        const sx = hx + (i * h.w) / spikes;
        ctx.beginPath();
        ctx.moveTo(sx, h.y + h.h);
        ctx.lineTo(sx + h.w / spikes / 2, h.y);
        ctx.lineTo(sx + h.w / spikes, h.y + h.h);
        ctx.fill();
      }
    });
  }

  function draw() {
    drawBackground();
    drawPlatforms();
    drawHazards();
    drawStars();
    drawWolf();
    drawParticles();

    const collected = estrellas.filter((s) => s.collected).length;
    document.getElementById("gameHUD").innerHTML = `
      <span class="hud-pill">❤️ ${player.lives}</span>
      <span class="hud-pill">📘 ${modulo}-${numero}</span>
      <span class="hud-pill">⭐ ${collected}/6</span>
    `;
  }

  function update() {
    gameTime++;
    if (hazardCooldown > 0) hazardCooldown--;
    if (currentQuestion) return;
    player.vx = 0;
    if (keys["ArrowLeft"] || keys["a"]) player.vx = -9;
    if (keys["ArrowRight"] || keys["d"]) player.vx = 9;
    if ((keys[" "] || keys["ArrowUp"]) && !player.jumping) {
      player.vy = -21;
      player.jumping = true;
    }
    player.vy += 0.95;
    player.x += player.vx;
    player.y += player.vy;

    let onGround = false;
    plataformas.forEach((p) => {
      if (
        player.x < p.x + p.w &&
        player.x + player.width > p.x &&
        player.y + player.height > p.y &&
        player.y + player.height - player.vy <= p.y
      ) {
        player.y = p.y - player.height;
        player.vy = 0;
        onGround = true;
      }
    });
    player.jumping = !onGround;

    if (player.x < 0) player.x = 0;
    if (player.x > worldWidth - player.width)
      player.x = worldWidth - player.width;

    // Fall reset
    if (player.y > 800) {
      player.x = 120;
      player.y = 480;
      player.vy = 0;
      cameraX = 0;
      if (player.lives > 0) player.lives--;
      if (player.lives <= 0) {
        showFeedback("GAME OVER", false);
        setTimeout(salirDelJuego, 1200);
        return;
      }
    }

    // Hazard spikes
    if (hazardCooldown <= 0) {
      for (const h of hazards) {
        if (
          player.x < h.x + h.w &&
          player.x + player.width > h.x &&
          player.y < h.y + h.h &&
          player.y + player.height > h.y
        ) {
          player.lives--;
          hazardCooldown = 45;
          spawnParticles(player.x + 20, player.y + 20, "#ff7a59");
          player.vy = -12;
          if (player.lives <= 0) {
            showFeedback("GAME OVER", false);
            setTimeout(salirDelJuego, 1200);
            return;
          }
          break;
        }
      }
    }

    for (const star of estrellas) {
      if (
        !star.collected &&
        player.x < star.x + 40 &&
        player.x + player.width > star.x &&
        player.y < star.y + 40 &&
        player.y + player.height > star.y - 15
      ) {
        star.collected = true;
        spawnParticles(star.x, star.y, "#ffd700");
        if (availableQuestions.length === 0)
          availableQuestions = [...preguntasNivel];
        const idx = Math.floor(Math.random() * availableQuestions.length);
        const pregunta = availableQuestions[idx];
        availableQuestions.splice(idx, 1);
        mostrarPreguntaEnJuego(pregunta);
        break; // one question at a time
      }
    }

    if (player.x - cameraX > 620) {
      cameraX += (player.x - 620 - cameraX) * 0.12;
    }

    // Wait until the last question is answered before finishing the level
    if (
      !levelCompleted &&
      !currentQuestion &&
      player.lives > 0 &&
      estrellas.every((s) => s.collected)
    ) {
      levelCompleted = true;
      saveProgress(moduloActual, numeroActual);
      const starsEarned = Math.max(1, player.lives);
      mostrarFinDeNivel(starsEarned);
    }
  }

  function gameLoop() {
    update();
    draw();
    gameAnimationId = requestAnimationFrame(gameLoop);
  }
  gameAnimationId = requestAnimationFrame(gameLoop);
}

// ==================== PREGUNTA EN EL JUEGO ====================
function mostrarPreguntaEnJuego(pregunta) {
  currentQuestion = true;
  currentPreguntaActiva = pregunta;
  keys = {};

  const div = document.createElement("div");
  div.className = "question-overlay";
  const moduloBadge = `<span class="question-badge">${moduloActual}</span>`;
  let html = `${moduloBadge}<h3 class="question-title">${pregunta.q}</h3>`;

  if (pregunta.type === "input") {
    html += `
      <input id="inputRespuesta" type="text" class="question-input" placeholder="Type your answer..." autocomplete="off">
      <p class="question-hint">Press Enter or click Answer</p>
    `;
  } else {
    html += `<div class="question-options">`;
    pregunta.options.forEach((op, i) => {
      html += `
        <button type="button" class="question-option" data-index="${i}">
          <span class="option-letter">${String.fromCharCode(65 + i)}</span>
          <span class="option-text">${op}</span>
        </button>`;
    });
    html += `</div>`;
  }

  html += `<button type="button" class="question-submit" id="btnResponder">ANSWER</button>`;
  div.innerHTML = html;
  document.body.appendChild(div);
  window.tempQuestionDiv = div;

  const submit = () => responderPreguntaJuego(pregunta.type === "input");

  div.querySelector("#btnResponder").addEventListener("click", submit);

  if (pregunta.type === "input") {
    const input = div.querySelector("#inputRespuesta");
    input.focus();
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") submit();
    });
  } else {
    div.querySelectorAll(".question-option").forEach((btn) => {
      btn.addEventListener("click", () => {
        div.querySelectorAll(".question-option").forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");
        btn.dataset.selected = "true";
      });
    });
  }
}

function obtenerRespuestaUsuario(isInput) {
  if (isInput) {
    const input = document.getElementById("inputRespuesta");
    return input ? input.value : "";
  }
  const selected = document.querySelector(".question-option.selected");
  return selected ? selected.dataset.index : null;
}

function obtenerTextoCorrecto(pregunta) {
  if (pregunta.type === "input") {
    return pregunta.answer;
  }
  return pregunta.options[pregunta.correct];
}

window.responderPreguntaJuego = function (isInput) {
  if (!currentPreguntaActiva) return;

  const respuestaUsuario = obtenerRespuestaUsuario(isInput);
  if (respuestaUsuario === null || respuestaUsuario === "") {
    showFeedback("Choose an answer", false);
    return;
  }

  const pregunta = currentPreguntaActiva;
  const esCorrecta = esRespuestaCorrecta(pregunta, respuestaUsuario);

  if (esCorrecta) {
    showFeedback("✓ CORRECT!", true);
    limpiarPreguntaJuego();
    return;
  }

  const correcta = obtenerTextoCorrecto(pregunta);
  showFeedback(`✗ INCORRECT<br><small>Correct: ${correcta}</small>`, false);

  if (player && player.lives > 0) player.lives--;
  limpiarPreguntaJuego();

  if (player && player.lives <= 0) {
    setTimeout(() => {
      showFeedback("GAME OVER", false);
      setTimeout(salirDelJuego, 1200);
    }, 1500);
  }
};

// ==================== INICIO ====================
window.onload = () => {
  crearEstrellas();
  crearNivelesFlotantes();
  crearNubes();
  console.log(
    "%c⭐ STAR LANGUAJES cargado correctamente!",
    "color:#e8c547; font-size:16px",
  );
};
