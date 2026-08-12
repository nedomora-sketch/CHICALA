/* ══════════════════════════════════════════════════════
   app.js — Semana 2 · Daily Routines & Time Management
   Básico Secundaria · Grados 6°-7° · Portal CHICALA
   v3.0 · Estilo Claro & Vibrante
   ══════════════════════════════════════════════════════ */

'use strict';

// ── STORAGE KEYS ──────────────────────────────────────
const STORAGE_KEY  = 'chicala_s_p3s2_67';
const STORAGE_XP   = 'chicala_secundaria_xp';
const STORAGE_PROG = 'chicala_secundaria_progress';

// ── ESTADO GLOBAL ─────────────────────────────────────
let xpActual           = parseInt(localStorage.getItem(STORAGE_XP) || '0');
let seccionesCompletas = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
let matchCorrectas     = 0;
let gramCorrectas      = 0;
let listenCorrectas    = 0;
let speakPracticadas   = 0;
let writeCampos        = 0;
let fcAprendidas       = 0;
let quizRespuestas     = [];
let quizActual         = 0;
let quizTimer          = null;
let quizSegundos       = 300;

// ══════════════════════════════════════════════════════
// DATOS: VOCABULARIO (Rutinas + Adverbios)
// ══════════════════════════════════════════════════════
const VOCABULARIO = [
  { word:'always',     translation:'siempre',        emoji:'🔄', phonetic:'/ˈɔːlweɪz/' },
  { word:'usually',    translation:'usualmente',      emoji:'📅', phonetic:'/ˈjuːʒuəli/' },
  { word:'often',      translation:'frecuentemente',  emoji:'🔁', phonetic:'/ˈɒfən/' },
  { word:'sometimes',  translation:'a veces',         emoji:'🎲', phonetic:'/ˈsʌmtaɪmz/' },
  { word:'never',      translation:'nunca',           emoji:'🚫', phonetic:'/ˈnɛvə/' },
  { word:'wake up',    translation:'despertar',       emoji:'⏰', phonetic:'/weɪk ʌp/' },
  { word:'get dressed',translation:'vestirse',        emoji:'👕', phonetic:'/ɡɛt drɛst/' },
  { word:'have breakfast', translation:'desayunar',   emoji:'🍳', phonetic:'/hæv ˈbrɛkfəst/' },
];

// ══════════════════════════════════════════════════════
// DATOS: MATCH
// ══════════════════════════════════════════════════════
const MATCH_ITEMS = [
  { word:'always',      target:'100% of the time · Every single day',    id:'m1' },
  { word:'usually',     target:'About 80% of the time · Most days',      id:'m2' },
  { word:'often',       target:'Frequently · More than half the time',   id:'m3' },
  { word:'sometimes',   target:'50% of the time · Not always',           id:'m4' },
  { word:'never',       target:'0% of the time · Not at all',            id:'m5' },
  { word:'wake up',     target:'⏰ The first thing in the morning',       id:'m6' },
];

// ══════════════════════════════════════════════════════
// DATOS: GRAMMAR
// ══════════════════════════════════════════════════════
const GRAMMAR_EJ = [
  {
    antes: 'She ___ gets up at 6 AM on school days.',
    opciones: ['always','never','sometimes','often'],
    correcta: 'always',
    feedback: '✅ "Always" = 100% del tiempo. Perfecto para una rutina fija.'
  },
  {
    antes: 'I brush my teeth ___ I have breakfast.',
    opciones: ['while','after','before','when'],
    correcta: 'before',
    feedback: '✅ "Before" indica que la acción ocurre primero: brush → then breakfast.'
  },
  {
    antes: '___ I get home, I always do my homework first.',
    opciones: ['Before','After','When','While'],
    correcta: 'When',
    feedback: '✅ "When" conecta dos acciones en el tiempo: llegada → tarea.'
  },
  {
    antes: 'He ___ walks to school. He takes the bus every day.',
    opciones: ['always','usually','sometimes','never'],
    correcta: 'never',
    feedback: '✅ "Never" = 0%. Si toma el bus cada día, nunca camina.'
  },
  {
    antes: 'I listen to music ___ I travel to school.',
    opciones: ['before','after','when','while'],
    correcta: 'while',
    feedback: '✅ "While" indica dos acciones simultáneas: escuchar + viajar al mismo tiempo.'
  },
  {
    antes: 'We ___ eat fast food. Maybe once a month.',
    opciones: ['always','usually','sometimes','often'],
    correcta: 'sometimes',
    feedback: '✅ "Sometimes" = ocasionalmente. Una vez al mes es poco frecuente.'
  },
];

// ══════════════════════════════════════════════════════
// DATOS: LISTENING
// ══════════════════════════════════════════════════════
const AUDIO_TEXTO =
  `Hi! My name is Carlos and I am 13 years old. ` +
  `I always wake up at six thirty in the morning. ` +
  `First, I brush my teeth and wash my face. ` +
  `Then, I have breakfast with my family. ` +
  `I usually have eggs and fruit juice. ` +
  `After breakfast, I get dressed and pack my school bag. ` +
  `I never walk to school because I live far away. ` +
  `I usually take the bus. ` +
  `While I travel, I sometimes listen to music or review my notes. ` +
  `I love my morning routine because it helps me feel ready for the day!`;

const LISTENING_Qs = [
  {
    texto: 'What time does Carlos always wake up?',
    opciones: ['At 6:00 AM','At 6:30 AM','At 7:00 AM','At 7:30 AM'],
    correcta: 'At 6:30 AM'
  },
  {
    texto: 'What does Carlos usually have for breakfast?',
    opciones: ['Cereal and milk','Bread and coffee','Eggs and fruit juice','Pancakes and juice'],
    correcta: 'Eggs and fruit juice'
  },
  {
    texto: 'Why does Carlos never walk to school?',
    opciones: ['He is lazy','He lives far away','It always rains','He has a bike'],
    correcta: 'He lives far away'
  },
  {
    texto: 'What does Carlos sometimes do while traveling?',
    opciones: ['Sleep','Eat breakfast','Listen to music or review notes','Read a book'],
    correcta: 'Listen to music or review notes'
  },
];

// ══════════════════════════════════════════════════════
// DATOS: SPEAKING
// ══════════════════════════════════════════════════════
const SPEAKING_FRASES = [
  {
    frase: 'I always wake up at _____ in the morning.',
    hint: 'Say the time you wake up every day.'
  },
  {
    frase: 'First, I _____, then I _____ before school.',
    hint: 'Describe your first two morning activities.'
  },
  {
    frase: 'I usually have _____ for breakfast.',
    hint: 'Say what you eat for breakfast most days.'
  },
  {
    frase: 'I _____ walk to school because _____.',
    hint: 'Use always/usually/never and give a reason.'
  },
    {
    frase: 'While I travel to school, I sometimes _____.',
    hint: 'Say what you do during your trip to school.'
  },
];

// ══════════════════════════════════════════════════════
// DATOS: WRITING (Weekly Schedule)
// ══════════════════════════════════════════════════════
const SCHEDULE_CAMPOS = [
  { id:'lunes',     label:'MONDAY',     placeholder:'My routine on Monday...',     icon:'🌅' },
  { id:'martes',    label:'TUESDAY',    placeholder:'My routine on Tuesday...',    icon:'☀️' },
  { id:'miercoles', label:'WEDNESDAY',  placeholder:'My routine on Wednesday...',  icon:'🌤️' },
  { id:'jueves',    label:'THURSDAY',   placeholder:'My routine on Thursday...',   icon:'🌈' },
  { id:'viernes',   label:'FRIDAY',     placeholder:'My routine on Friday...',     icon:'🎉' },
];

// ══════════════════════════════════════════════════════
// DATOS: QUIZ FINAL
// ══════════════════════════════════════════════════════
const QUIZ_PREGUNTAS = [
  {
    tipo: 'opcion',
    texto: 'Which adverb means "100% of the time"?',
    opciones: ['sometimes','usually','always','never'],
    correcta: 'always'
  },
  {
    tipo: 'opcion',
    texto: 'Choose the correct sentence:',
    opciones: [
      'I never am late for school.',
      'I am never late for school.',
      'I late never am for school.',
      'Never I am late for school.'
    ],
    correcta: 'I am never late for school.'
  },
  {
    tipo: 'ordenar',
    texto: 'Put the words in order to make a sentence:',
    hint: 'Use "before" to connect the actions.',
    palabras: ['homework','I','TV','my','finish','watch','before'],
    correcta: 'I watch TV before I finish my homework'
  },
  {
    tipo: 'opcion',
    texto: 'Which connector shows two actions happening at the same time?',
    opciones: ['before','after','when','while'],
    correcta: 'while'
  },
  {
    tipo: 'opcion',
    texto: '"I ___ eat vegetables. I don\'t like them."',
    opciones: ['always','usually','sometimes','never'],
    correcta: 'never'
  },
  {
    tipo: 'ordenar',
    texto: 'Build a sentence about your morning routine:',
    hint: 'Start with "First," and use "then".',
    palabras: ['up','First','I','breakfast','then','have','wake'],
    correcta: 'First I wake up then I have breakfast'
  },
  {
    tipo: 'opcion',
    texto: 'Carlos takes the bus to school because:',
    opciones: ['he likes buses','he lives far away','he has no bike','it is faster'],
    correcta: 'he lives far away'
  },
  {
    tipo: 'opcion',
    texto: 'Which sentence uses "usually" correctly?',
    opciones: [
      'I usually am tired in the morning.',
      'Usually I get up at 7 AM.',
      'I get up usually at 7 AM.',
      'I usually get up at 7 AM.'
    ],
    correcta: 'I usually get up at 7 AM.'
  },
  {
    tipo: 'opcion',
    texto: '"___ I get home, I always do my homework."',
    opciones: ['Before','After','While','During'],
    correcta: 'After'
  },
  {
    tipo: 'opcion',
    texto: 'Which activity is NOT part of a morning routine?',
    opciones: ['brush teeth','have breakfast','get dressed','go to bed'],
    correcta: 'go to bed'
  },
];

// ══════════════════════════════════════════════════════
// UTILIDADES
// ══════════════════════════════════════════════════════
function showToast(msg, tipo = 'default') {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className = `toast show ${tipo}`;
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.className = 'toast'; }, 3500);
}

function agregarXP(cantidad) {
  xpActual += cantidad;
  localStorage.setItem(STORAGE_XP, xpActual);
  const el = document.getElementById('xp-display');
  if (el) {
    el.textContent = xpActual;
    // Animación de rebote
    el.parentElement.style.transform = 'scale(1.3)';
    setTimeout(() => { el.parentElement.style.transform = 'scale(1)'; }, 300);
  }
  showToast(`⚡ +${cantidad} XP ganados!`, 'xp');
}

function hablar(texto, rate = 1) {
  if (!window.speechSynthesis) {
    showToast('⚠️ Tu navegador no soporta audio.', 'error');
    return;
  }
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(texto);
  u.lang = 'en-US';
  u.rate = rate;
  u.pitch = 1.05;
  
  const voces = speechSynthesis.getVoices();
  const voz = voces.find(v => v.lang.startsWith('en') && v.name.includes('Google US English'))
           || voces.find(v => v.lang.startsWith('en'))
           || voces[0];
  if (voz) u.voice = voz;
  
  speechSynthesis.speak(u);
}

function actualizarProgresoHero() {
  const total = 7;
  const comp = seccionesCompletas.length;
  const pct = Math.round((comp / total) * 100);

  const bar = document.getElementById('mision-bar');
  const pctEl = document.getElementById('mision-pct');
  if (bar) bar.style.width = pct + '%';
  if (pctEl) pctEl.textContent = `${comp} / ${total} misiones`;

  const steps = document.getElementById('mision-steps');
  if (steps) {
    steps.innerHTML = '';
    for (let i = 1; i <= total; i++) {
      const d = document.createElement('div');
      d.className = 'ms-step';
      if (seccionesCompletas.includes(i)) d.classList.add('completo');
      else if (comp + 1 === i) d.classList.add('activo');
      d.textContent = i;
      steps.appendChild(d);
    }
  }
}

function completarSeccion(num) {
  if (seccionesCompletas.includes(num)) return;
  seccionesCompletas.push(num);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seccionesCompletas));

  const sec = document.getElementById(`sec-${num}`);
  if (sec) sec.classList.add('completada');

  const xpMap = { 1:20, 2:30, 3:30, 4:30, 5:30, 6:30, 7:30 };
  agregarXP(xpMap[num] || 20);
  actualizarProgresoHero();

  // Scroll suave a la siguiente
  if (num < 7) {
    const sig = document.getElementById(`sec-${num + 1}`);
    if (sig) {
      setTimeout(() => {
        sig.scrollIntoView({ behavior: 'smooth', block: 'start' });
        sig.classList.add('sugerida');
        setTimeout(() => sig.classList.remove('sugerida'), 2000);
      }, 500);
    }
  }
}

// ══════════════════════════════════════════════════════
// SECCIÓN 1 — FLASHCARDS
// ══════════════════════════════════════════════════════
function initFlashcards() {
  const grid = document.getElementById('flashcards-grid');
  if (!grid) return;
  grid.innerHTML = '';
  fcAprendidas = 0;

  VOCABULARIO.forEach((item, i) => {
    const fc = document.createElement('div');
    fc.className = 'flashcard';
    fc.id = `fc-${i}`;
    fc.innerHTML = `
      <div class="fc-inner">
        <div class="fc-front">
          <div class="fc-emoji">${item.emoji}</div>
          <div class="fc-word">${item.word}</div>
          <div class="fc-phonetic">${item.phonetic}</div>
          <div class="fc-btns">
            <button class="fc-btn" onclick="event.stopPropagation(); hablar('${item.word}')">🔊</button>
          </div>
        </div>
        <div class="fc-back">
          <div class="fc-emoji">${item.emoji}</div>
          <div class="fc-traduccion">${item.translation}</div>
          <div class="fc-word">${item.word}</div>
          <div class="fc-btns">
            <button class="fc-btn" onclick="event.stopPropagation(); hablar('${item.word}')">🔊</button>
            <button class="fc-btn" id="fc-aprender-${i}" onclick="event.stopPropagation(); marcarAprendida(${i})">✓ Ya sé</button>
          </div>
        </div>
      </div>`;
    fc.addEventListener('click', () => fc.classList.toggle('girada'));
    grid.appendChild(fc);
  });
}

function marcarAprendida(i) {
  const btn = document.getElementById(`fc-aprender-${i}`);
  const fc = document.getElementById(`fc-${i}`);
  if (!btn || btn.dataset.marcada) return;
  
  btn.dataset.marcada = '1';
  btn.classList.add('aprendida');
  btn.textContent = '✅ ¡Aprendida!';
  
  if (fc) {
    const badge = document.createElement('div');
    badge.className = 'fc-aprendida-badge';
    fc.appendChild(badge);
  }
  
  fcAprendidas++;
  document.getElementById('fc-aprendidas').textContent = fcAprendidas;
  
  if (fcAprendidas >= 5) {
    document.getElementById('btn-sec1').disabled = false;
    showToast('🎉 ¡Vocabulario listo! Sigue a la siguiente misión.', 'success');
  }
  hablar(VOCABULARIO[i].word);
}

// ══════════════════════════════════════════════════════
// SECCIÓN 2 — MATCH (DRAG & DROP)
// ══════════════════════════════════════════════════════
let draggedWord = null;

function initMatch() {
  const wordsEl = document.getElementById('match-words');
  const targetsEl = document.getElementById('match-targets');
  if (!wordsEl || !targetsEl) return;
  matchCorrectas = 0;

  const shuffledWords = [...MATCH_ITEMS].sort(() => Math.random() - 0.5);
  const shuffledTargets = [...MATCH_ITEMS].sort(() => Math.random() - 0.5);

  // Labels
  wordsEl.innerHTML = '<div class="match-col-label">ADVERBS & ACTIONS</div>';
  targetsEl.innerHTML = '<div class="match-col-label">MEANINGS</div>';

  // Palabras arrastrables
  shuffledWords.forEach(item => {
    const div = document.createElement('div');
    div.className = 'match-word';
    div.draggable = true;
    div.dataset.id = item.id;
    div.dataset.word = item.word;
    div.innerHTML = `<span>${item.word}</span>`;
    
    div.addEventListener('dragstart', e => {
      draggedWord = div;
      div.classList.add('dragging');
      e.dataTransfer.setData('text/plain', item.id);
    });
    div.addEventListener('dragend', () => {
      div.classList.remove('dragging');
    });
    
    // Touch support simple
    div.addEventListener('touchstart', () => { draggedWord = div; }, { passive: true });
    
    wordsEl.appendChild(div);
  });

  // Targets
  shuffledTargets.forEach(item => {
    const div = document.createElement('div');
    div.className = 'match-target';
    div.dataset.id = item.id;
    div.dataset.word = item.word;
    div.innerHTML = `<span class="match-emoji"></span><span>${item.target}</span>`;
    
    div.addEventListener('dragover', e => {
      e.preventDefault();
      div.classList.add('drag-over');
    });
    div.addEventListener('dragleave', () => div.classList.remove('drag-over'));
    div.addEventListener('drop', e => {
      e.preventDefault();
      div.classList.remove('drag-over');
      if (!draggedWord) return;
      checkMatch(draggedWord, div);
    });
    
    // Touch support
    div.addEventListener('touchend', () => {
      if (!draggedWord) return;
      checkMatch(draggedWord, div);
    });
    
    targetsEl.appendChild(div);
  });
}

function checkMatch(wordEl, targetEl) {
  if (targetEl.classList.contains('correcta')) return;

  const wordId = wordEl.dataset.id;
  const targetId = targetEl.dataset.id;

  if (wordId === targetId) {
    wordEl.classList.add('usada');
    targetEl.classList.add('correcta');
    targetEl.querySelector('.match-emoji').textContent = '✅';
    matchCorrectas++;
    document.getElementById('match-score').textContent = `${matchCorrectas} / 6 parejas`;
    hablar(wordEl.dataset.word);
    showToast(`✅ ¡Excelente! "${wordEl.dataset.word}"`, 'success');

    if (matchCorrectas >= 6) {
      document.getElementById('btn-sec2').disabled = false;
      showToast('🎉 ¡Todas las parejas encontradas!', 'success');
    }
  } else {
    targetEl.classList.add('incorrecta');
    showToast('❌ ¡Casi! Intenta de nuevo.', 'error');
    setTimeout(() => targetEl.classList.remove('incorrecta'), 600);
  }
  draggedWord = null;
}

// ══════════════════════════════════════════════════════
// SECCIÓN 3 — GRAMMAR
// ══════════════════════════════════════════════════════
function initGrammar() {
  const cont = document.getElementById('grammar-ejercicios');
  if (!cont) return;
  cont.innerHTML = '';
  gramCorrectas = 0;

  GRAMMAR_EJ.forEach((ej, i) => {
    const div = document.createElement('div');
    div.className = 'gram-ejercicio';
    div.id = `gram-ej-${i}`;

    const shuffled = [...ej.opciones].sort(() => Math.random() - 0.5);

    div.innerHTML = `
      <div class="gram-oracion">${ej.antes.replace('___', '<strong style="color:var(--c3)">___</strong>')}</div>
      <div class="gram-opciones">
        ${shuffled.map(op => `
          <button class="gram-opcion" data-op="${op}" data-idx="${i}" onclick="checkGram(this, ${i})">
            ${op}
          </button>`).join('')}
      </div>
      <div class="gram-feedback" id="gram-fb-${i}"></div>`;
    
    cont.appendChild(div);
  });
}

function checkGram(btn, idx) {
  const ej = GRAMMAR_EJ[idx];
  const ejDiv = document.getElementById(`gram-ej-${idx}`);
  const fbDiv = document.getElementById(`gram-fb-${idx}`);
  const buttons = ejDiv.querySelectorAll('.gram-opcion');

  buttons.forEach(b => {
    b.disabled = true;
    if (b.dataset.op === ej.correcta) b.classList.add('correcta');
  });

  if (btn.dataset.op === ej.correcta) {
    btn.classList.add('correcta');
    ejDiv.classList.add('correcta');
    fbDiv.textContent = ej.feedback;
    fbDiv.className = 'gram-feedback show ok';
    gramCorrectas++;
    document.getElementById('gram-score').textContent = `${gramCorrectas} / 6 correctas`;
    showToast('✅ ¡Perfecto!', 'success');
  } else {
    btn.classList.add('incorrecta');
    ejDiv.classList.add('incorrecta');
    fbDiv.textContent = ej.feedback;
    fbDiv.className = 'gram-feedback show fail';
    showToast('❌ Revisa bien la estructura.', 'error');
  }

  const respondidos = document.querySelectorAll('.gram-ejercicio.correcta, .gram-ejercicio.incorrecta').length;
  if (respondidos >= GRAMMAR_EJ.length && gramCorrectas >= 4) {
    document.getElementById('btn-sec3').disabled = false;
  } else if (respondidos >= GRAMMAR_EJ.length) {
    showToast('💡 Repasa y vuelve a intentarlo.', 'error');
    setTimeout(() => initGrammar(), 2500);
  }
}

// ══════════════════════════════════════════════════════
// SECCIÓN 4 — LISTENING
// ══════════════════════════════════════════════════════
function reproducirAudio(rate = 1) {
  const btn = document.getElementById('audio-play-btn');
  const transcript = document.getElementById('audio-transcript');
  const transcriptText = document.getElementById('transcript-text');

  if (btn) {
    btn.classList.add('playing');
    btn.textContent = '🔊 REPRODUCIENDO...';
  }

  hablar(AUDIO_TEXTO, rate);

  setTimeout(() => {
    if (transcript) {
      transcript.style.display = 'block';
      transcriptText.textContent = AUDIO_TEXTO;
    }
  }, 1000);

  const duracion = (AUDIO_TEXTO.split(' ').length / (rate * 2.5)) * 1000 + 500;
   setTimeout(() => {
    if (btn) {
      btn.classList.remove('playing');
      btn.textContent = '▶ ESCUCHAR';
    }
  }, duracion);
}

function initListening() {
  const cont = document.getElementById('listening-preguntas');
  if (!cont) return;
  cont.innerHTML = '';
  listenCorrectas = 0;

  LISTENING_Qs.forEach((q, i) => {
    const div = document.createElement('div');
    div.className = 'listen-pregunta';
    div.innerHTML = `
      <div class="listen-num">QUESTION ${i + 1} / ${LISTENING_Qs.length}</div>
      <div class="listen-texto">${q.texto}</div>
      <div class="listen-opciones">
        ${q.opciones.map(op => `
          <button class="listen-opcion"
            data-op="${op}"
            data-idx="${i}"
            onclick="checkListen(this, ${i})">
            ${op}
          </button>`).join('')}
      </div>`;
    cont.appendChild(div);
  });
}

function checkListen(btn, idx) {
  const q = LISTENING_Qs[idx];
  const pregDiv = btn.closest('.listen-pregunta');
  const buttons = pregDiv.querySelectorAll('.listen-opcion');

  buttons.forEach(b => {
    b.disabled = true;
    if (b.dataset.op === q.correcta) b.classList.add('correcta');
  });

  if (btn.dataset.op === q.correcta) {
    btn.classList.add('correcta');
    listenCorrectas++;
    document.getElementById('listen-score').textContent =
      `${listenCorrectas} / 4 correctas`;
    showToast('✅ ¡Correcto!', 'success');
  } else {
    btn.classList.add('incorrecta');
    showToast('❌ Escucha de nuevo y vuelve a intentarlo.', 'error');
  }

  // Verificar si respondió todo
  const totalBotones  = document.querySelectorAll('.listen-opcion').length;
  const deshabilitados = document.querySelectorAll('.listen-opcion:disabled').length;

  if (deshabilitados === totalBotones) {
    if (listenCorrectas >= 3) {
      document.getElementById('btn-sec4').disabled = false;
      showToast('🎧 ¡Gran trabajo escuchando!', 'success');
    } else {
      showToast('💡 Escucha otra vez y vuelve a intentarlo.', 'error');
      setTimeout(() => initListening(), 2500);
    }
  }
}

// ══════════════════════════════════════════════════════
// SECCIÓN 5 — SPEAKING
// ══════════════════════════════════════════════════════
function initSpeaking() {
  const cont = document.getElementById('speaking-frases');
  if (!cont) return;
  cont.innerHTML = '';
  speakPracticadas = 0;

  SPEAKING_FRASES.forEach((item, i) => {
    const div = document.createElement('div');
    div.className = 'speak-frase';
    div.id = `speak-${i}`;
    div.innerHTML = `
      <div class="speak-num">${i + 1}</div>
      <div class="speak-texto">${item.frase}</div>
      <div class="speak-hint">${item.hint}</div>
      <div class="speak-btns">
        <button class="speak-btn listen"
          onclick="hablar('${item.frase.replace(/___+/g, 'blank')}')">
          🔊 Listen
        </button>
        <button class="speak-btn done"
          id="speak-done-${i}"
          onclick="marcarSpeakPracticada(${i})">
          🎤 Practiced
        </button>
      </div>`;
    cont.appendChild(div);
  });
}

function marcarSpeakPracticada(i) {
  const fraseDiv = document.getElementById(`speak-${i}`);
  const btn      = document.getElementById(`speak-done-${i}`);
  if (!fraseDiv || btn.classList.contains('active')) return;

  fraseDiv.classList.add('practicada');
  btn.classList.add('active');
  btn.textContent = '✅ Done!';

  speakPracticadas++;
  document.getElementById('speak-progreso').textContent =
    `${speakPracticadas} / 5 frases`;

  showToast(`🎤 ¡Frase ${i + 1} practicada!`, 'success');

  if (speakPracticadas >= 5) {
    document.getElementById('btn-sec5').disabled = false;
    showToast('🎉 ¡Todas las frases practicadas! ¡Eres un orador!', 'success');
  }
}

// ══════════════════════════════════════════════════════
// SECCIÓN 6 — WRITING (Weekly Schedule)
// ══════════════════════════════════════════════════════
function initWriting() {
  const cont = document.getElementById('schedule-campos');
  if (!cont) return;
  cont.innerHTML = '';
  writeCampos = 0;

  SCHEDULE_CAMPOS.forEach(campo => {
    const wrapper = document.createElement('div');
    wrapper.className = 'schedule-campo';
    wrapper.innerHTML = `
      <div class="schedule-label">
        ${campo.icon} ${campo.label}
      </div>
      <input
        class="schedule-input"
        id="schedule-input-${campo.id}"
        type="text"
        placeholder="${campo.placeholder}"
        oninput="checkWriteField('${campo.id}')"
      />`;
    cont.appendChild(wrapper);
  });

  actualizarSchedulePreview();
}

function checkWriteField(id) {
  const input = document.getElementById(`schedule-input-${id}`);
  if (!input) return;

  const valor = input.value.trim();
  if (valor !== '') {
    input.classList.add('completado');
  } else {
    input.classList.remove('completado');
  }

  // Contar campos completados
  writeCampos = document.querySelectorAll('.schedule-input.completado').length;
  document.getElementById('write-count').textContent =
    `${writeCampos} / 5 campos`;

  actualizarSchedulePreview();

  if (writeCampos >= 5) {
    document.getElementById('btn-sec6').disabled = false;
    showToast('✍️ ¡Tu horario semanal está listo!', 'success');
  }
}

function actualizarSchedulePreview() {
  const preview = document.getElementById('schedule-preview');
  if (!preview) return;

  const get = id => {
    const el = document.getElementById(`schedule-input-${id}`);
    if (!el) return '_____';
    const v = el.value.trim();
    return v
      ? `<span class="highlight">${v}</span>`
      : '_____';
  };

  const dias = [
    { id:'lunes',     emoji:'🌅', name:'Monday'    },
    { id:'martes',    emoji:'☀️', name:'Tuesday'   },
    { id:'miercoles', emoji:'🌤️', name:'Wednesday' },
    { id:'jueves',    emoji:'🌈', name:'Thursday'  },
    { id:'viernes',   emoji:'🎉', name:'Friday'    },
  ];

  preview.innerHTML = `
    <div class="schedule-preview-title">📋 MY WEEKLY ROUTINE</div>
    <div class="schedule-preview-text">
      ${dias.map(d => `
        ${d.emoji} <strong>${d.name}:</strong> ${get(d.id)}<br/>`
      ).join('')}
    </div>`;
}

// ══════════════════════════════════════════════════════
// SECCIÓN 7 — QUIZ FINAL
// ══════════════════════════════════════════════════════
function initQuiz() {
  quizActual     = 0;
  quizRespuestas = [];
  quizSegundos   = 300;

  const resultado = document.getElementById('quiz-resultado');
  if (resultado) resultado.style.display = 'none';

  iniciarTimerQuiz();
  renderQuizPregunta();
}

function iniciarTimerQuiz() {
  clearInterval(quizTimer);
  quizTimer = setInterval(() => {
    quizSegundos--;
    const m  = String(Math.floor(quizSegundos / 60)).padStart(2, '0');
    const s  = String(quizSegundos % 60).padStart(2, '0');
    const el = document.getElementById('quiz-timer');
    if (el) {
      el.textContent = `⏱ ${m}:${s}`;
      if (quizSegundos <= 30) el.classList.add('urgente');
    }
    if (quizSegundos <= 0) {
      clearInterval(quizTimer);
      mostrarResultadoQuiz();
    }
  }, 1000);
}

function renderQuizPregunta() {
  const cont = document.getElementById('quiz-container');
  if (!cont) return;

  if (quizActual >= QUIZ_PREGUNTAS.length) {
    clearInterval(quizTimer);
    mostrarResultadoQuiz();
    return;
  }

  const q      = QUIZ_PREGUNTAS[quizActual];
  const num    = quizActual + 1;
  const letras = ['A','B','C','D'];

  document.getElementById('quiz-q-num').textContent =
    `Pregunta ${num} / ${QUIZ_PREGUNTAS.length}`;

  let bodyHTML = '';

  if (q.tipo === 'opcion') {
    const shuffled = [...q.opciones].sort(() => Math.random() - 0.5);
    bodyHTML = `
      <div class="quiz-opciones">
        ${shuffled.map((op, i) => `
          <button class="quiz-opcion"
            data-op="${op}"
            onclick="checkQuizOpcion(this, '${op.replace(/'/g, "\\'")}')">
            <span class="quiz-letra">${letras[i]}</span>
            ${op}
          </button>`).join('')}
      </div>`;

  } else if (q.tipo === 'ordenar') {
    const shuffled = [...q.palabras].sort(() => Math.random() - 0.5);
    bodyHTML = `
      <div class="quiz-q-hint">${q.hint}</div>
      <div class="quiz-ordenar" id="quiz-chips">
        ${shuffled.map(w => `
          <span class="word-chip"
            data-word="${w}"
            onclick="seleccionarChip(this)">
            ${w}
          </span>`).join('')}
      </div>
      <div class="quiz-answer-box" id="quiz-answer-box"></div>
      <button class="quiz-verificar" onclick="verificarOrdenar()">
        ✓ VERIFICAR
      </button>`;
  }

  cont.innerHTML = `
    <div class="quiz-pregunta">
      <div class="quiz-q-num">PREGUNTA ${num} / ${QUIZ_PREGUNTAS.length}</div>
      <div class="quiz-q-texto">${q.texto}</div>
      ${bodyHTML}
    </div>`;
}

function checkQuizOpcion(btn, opcion) {
  const q = QUIZ_PREGUNTAS[quizActual];
  const buttons = document.querySelectorAll('.quiz-opcion');

  buttons.forEach(b => {
    b.disabled = true;
    if (b.dataset.op === q.correcta) b.classList.add('correcta');
  });

  const esCorrecta = opcion === q.correcta;
  if (esCorrecta) {
    btn.classList.add('correcta');
    showToast('✅ ¡Correcto! 🎉', 'success');
  } else {
    btn.classList.add('incorrecta');
    showToast('❌ ¡Casi! Sigue intentando.', 'error');
  }

  quizRespuestas.push(esCorrecta);

  setTimeout(() => {
    quizActual++;
    renderQuizPregunta();
  }, 1300);
}

function seleccionarChip(chip) {
  if (chip.classList.contains('usada')) return;
  chip.classList.add('usada');

  const box  = document.getElementById('quiz-answer-box');
  const span = document.createElement('span');
  span.className    = 'answer-chip';
  span.dataset.word = chip.dataset.word;
  span.textContent  = chip.dataset.word;

  span.onclick = () => {
    box.removeChild(span);
    chip.classList.remove('usada');
  };
  box.appendChild(span);
}

function verificarOrdenar() {
  const q      = QUIZ_PREGUNTAS[quizActual];
  const box    = document.getElementById('quiz-answer-box');

  const respuesta = Array.from(box.querySelectorAll('.answer-chip'))
    .map(c => c.dataset.word)
    .join(' ');

  const esCorrecta = respuesta.toLowerCase() === q.correcta.toLowerCase();

  // Bloquear chips
  document.querySelectorAll('.word-chip').forEach(c => c.classList.add('usada'));
  document.querySelector('.quiz-verificar').disabled = true;

  if (esCorrecta) {
    box.classList.add('correcta');
    showToast('✅ ¡Orden perfecto!', 'success');
  } else {
    box.classList.add('incorrecta');
    showToast(`❌ La respuesta correcta era: "${q.correcta}"`, 'error');
  }

  quizRespuestas.push(esCorrecta);

  setTimeout(() => {
    quizActual++;
    renderQuizPregunta();
  }, 1800);
}

function mostrarResultadoQuiz() {
  clearInterval(quizTimer);

  const cont      = document.getElementById('quiz-container');
  const resultado = document.getElementById('quiz-resultado');
  if (cont) cont.innerHTML = '';
  if (!resultado) return;

  const correctas = quizRespuestas.filter(Boolean).length;
  const total     = QUIZ_PREGUNTAS.length;
  const pct       = Math.round((correctas / total) * 100);

  // Estrellas, mensaje e insignia según puntaje
  let estrellas, mensaje, badge;
  if (pct >= 90) {
    estrellas = '⭐⭐⭐';
    mensaje   = '¡Eres un Routine Master! Increíble trabajo.';
    badge     = '🌞';
  } else if (pct >= 70) {
    estrellas = '⭐⭐';
    mensaje   = '¡Muy bien! Casi dominas las rutinas.';
    badge     = '🌤️';
  } else if (pct >= 50) {
    estrellas = '⭐';
    mensaje   = '¡Buen intento! Repasa y vuelve a intentarlo.';
    badge     = '🌱';
  } else {
    estrellas = '💪';
    mensaje   = '¡Sigue practicando! Tú puedes lograrlo.';
    badge     = '🎯';
  }

  document.getElementById('qr-estrellas').textContent  = estrellas;
  document.getElementById('qr-puntaje').textContent    = `${correctas} / ${total}`;
  document.getElementById('qr-mensaje').textContent    = mensaje;
  document.getElementById('qr-xp').textContent         = `+30 XP ganados`;
  document.getElementById('badge-insignia').textContent = badge;
  document.getElementById('quiz-q-num').textContent    = 'Completado ✓';

  resultado.style.display = 'block';
  resultado.scrollIntoView({ behavior: 'smooth', block: 'start' });

  if (correctas >= 6) {
    const btn = document.getElementById('btn-sec7');
    if (btn) btn.disabled = false;
  }
}

// ══════════════════════════════════════════════════════
// FINALIZAR SEMANA
// ══════════════════════════════════════════════════════
function finalizarSemana() {
  completarSeccion(7);

  // Guardar en progreso global
  const progreso = JSON.parse(
    localStorage.getItem(STORAGE_PROG) || '{}'
  );
  progreso['p3s2'] = {
    completado : true,
    xp         : xpActual,
    fecha      : new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_PROG, JSON.stringify(progreso));

  showToast('🚀 ¡Semana 2 completada! ¡Eres increíble!', 'success');

  // Confeti visual ligero con emojis
  lanzarConfeti();

  setTimeout(() => {
    const backBtn = document.querySelector('.breadcrumb a[href*="index"]');
    if (backBtn) window.location.href = backBtn.href;
  }, 3000);
}

// ══════════════════════════════════════════════════════
// CONFETI LIGERO (sin librerías externas)
// ══════════════════════════════════════════════════════
function lanzarConfeti() {
  const emojis = ['🎉','⭐','🌟','✨','🏆','🎊','💫'];
  for (let i = 0; i < 18; i++) {
    const el = document.createElement('div');
    el.style.cssText = `
      position: fixed;
      top: -40px;
      left: ${Math.random() * 100}vw;
      font-size: ${1 + Math.random() * 1.5}rem;
      animation: caer ${1.5 + Math.random() * 2}s ease-in forwards;
      z-index: 9999;
      pointer-events: none;
      animation-delay: ${Math.random() * 0.8}s;
    `;
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 4000);
  }
}

// Agregar keyframe de caída al documento
const styleConfeti = document.createElement('style');
styleConfeti.textContent = `
  @keyframes caer {
    0%   { transform: translateY(0) rotate(0deg);   opacity: 1; }
    100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
  }
`;
document.head.appendChild(styleConfeti);

// ══════════════════════════════════════════════════════
// ARRANQUE — DOMContentLoaded
// ══════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {

  // Restaurar XP
  const xpEl = document.getElementById('xp-display');
  if (xpEl) xpEl.textContent = xpActual;

  // Restaurar secciones ya completadas
  seccionesCompletas.forEach(num => {
    const sec = document.getElementById(`sec-${num}`);
    if (sec) sec.classList.add('completada');

    const btn = document.getElementById(`btn-sec${num}`);
    if (btn) btn.disabled = false;
  });

  // Inicializar todas las secciones
  initFlashcards();
  initMatch();
  initGrammar();
  initListening();
  initSpeaking();
  initWriting();
  initQuiz();

  // Actualizar hero de progreso
  actualizarProgresoHero();

  // Precargar voces de síntesis
  if (window.speechSynthesis) {
    speechSynthesis.getVoices();
    speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices();
  }

  // Toast de bienvenida personalizado
  setTimeout(() => {
    const comp = seccionesCompletas.length;
    if (comp > 0) {
      showToast(`📊 Progreso restaurado · ${comp} / 7 misiones`, 'success');
    } else {
      showToast('⏰ ¡Bienvenido/a a la Semana 2! Explora a tu ritmo.', 'success');
    }
  }, 700);
});