// ===== CONFIGURACIÓN =====
const COLORS = [
  { name: 'rojo',    hex: '#ef4444', rgb: '239,68,68' },
  { name: 'verde',   hex: '#34d399', rgb: '52,211,153' },
  { name: 'azul',    hex: '#3b82f6', rgb: '59,130,246' },
  { name: 'amarillo', hex: '#fbbf24', rgb: '251,191,36' },
  { name: 'rosa',    hex: '#ec4899', rgb: '236,72,153' },
  { name: 'cyan',    hex: '#22d3ee', rgb: '34,211,238' },
  { name: 'naranja', hex: '#f97316', rgb: '249,115,22' },
  { name: 'morado',  hex: '#a855f7', rgb: '168,85,247' },
];

const LEVELS = {
  easy:   { size: 5, pairs: 4 },
  medium: { size: 6, pairs: 5 },
  hard:   { size: 7, pairs: 6 },
  expert: { size: 8, pairs: 7 },
};

// ===== ESTADO DEL JUEGO =====
let currentLevel = 'medium';
let gridSize = 6;
let board = [];          // board[r][c] = colorIndex or -1
let fixed = [];          // fixed[r][c] = true/false
let solutionPaths = [];
let route = [];          // [{r, c, colorIdx}, ...]
let selectedStart = null; // {r, c}
let timerStart = null;
let timerInterval = null;

// ===== ELEMENTOS DOM =====
const boardEl = document.getElementById('gameBoard');
const levelSelect = document.getElementById('level');
const timerEl = document.getElementById('timer');
const bestTimeEl = document.getElementById('bestTime');
const statusMsg = document.getElementById('statusMsg');
const victoryOverlay = document.getElementById('victoryOverlay');
const victoryMsg = document.getElementById('victoryMsg');

// ===== FONDO ESTELAR (Canvas) =====
function initStarfield() {
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');
  let stars = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Crear estrellas
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.5,
      opacity: Math.random(),
      speed: Math.random() * 0.3 + 0.05,
      pulse: Math.random() * Math.PI * 2,
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      s.pulse += 0.02;
      s.opacity = 0.4 + 0.6 * Math.abs(Math.sin(s.pulse));
      s.y -= s.speed;
      if (s.y < -5) { s.y = canvas.height + 5; s.x = Math.random() * canvas.width; }
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 210, 255, ${s.opacity})`;
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();
}

// ===== UTILIDADES =====
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function setStatus(msg, color) {
  statusMsg.textContent = msg;
  statusMsg.style.color = color || '#22d3ee';
}

function startTimer() {
  timerStart = Date.now();
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    const s = Math.floor((Date.now() - timerStart) / 1000);
    timerEl.textContent = `⏱ ${s}s`;
  }, 500);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function elapsed() {
  return Math.floor((Date.now() - timerStart) / 1000);
}

function saveBestTime(level, time) {
  const key = 'nebula_best_' + level;
  const prev = localStorage.getItem(key);
  if (!prev || time < Number.parseInt(prev, 10)) {
    localStorage.setItem(key, time);
  }
}

function loadBestTime(level) {
  const key = 'nebula_best_' + level;
  const val = localStorage.getItem(key);
  bestTimeEl.textContent = val ? `🥇 Mejor: ${val}s` : '🥇 Mejor: --';
}

// ===== GENERACIÓN POR CAMINOS QUE LLENAN TODO EL TABLERO =====
function generateBoard() {
  const cfg = LEVELS[currentLevel];
  gridSize = cfg.size;
  const total = gridSize * gridSize;
  const grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(-1));
  const paths = [];
  const cells = [];
  const vertical = Math.random() < 0.5;
  const reverse = Math.random() < 0.5;

  for (let line = 0; line < gridSize; line++) {
    for (let offset = 0; offset < gridSize; offset++) {
      const position = line % 2 === 0 ? offset : gridSize - 1 - offset;
      cells.push(vertical
        ? { r: position, c: line }
        : { r: line, c: position });
    }
  }
  if (reverse) cells.reverse();

  const pairCount = cfg.pairs;
  const pathLengths = Array(pairCount).fill(Math.floor(total / pairCount));
  for (let i = 0; i < total % pairCount; i++) pathLengths[i]++;
  const shuffledLengths = shuffle(pathLengths);

  let offset = 0;
  shuffledLengths.forEach((length, colorIdx) => {
    const path = cells.slice(offset, offset + length);
    path.forEach(cell => { grid[cell.r][cell.c] = colorIdx; });
    paths.push(path);
    offset += length;
  });

  board = grid;
  fixed = Array.from({ length: gridSize }, () => Array(gridSize).fill(false));
  paths.forEach(path => {
    fixed[path[0].r][path[0].c] = true;
    fixed[path[path.length - 1].r][path[path.length - 1].c] = true;
  });
  solutionPaths = paths;
  route = [];
  drawing = null;
  renderBoard();
}

function neighbors(r, c) {
  const n = [];
  if (r > 0) n.push({ r: r - 1, c });
  if (r < gridSize - 1) n.push({ r: r + 1, c });
  if (c > 0) n.push({ r, c: c - 1 });
  if (c < gridSize - 1) n.push({ r, c: c + 1 });
  return n;
}

// ===== ESTADO DE DIBUJO =====
let drawing = null; // { colorIdx, cells:[{r,c}] }

// ===== RENDERIZAR CON LÍNEA CONTINUA =====
function renderBoard() {
  const size = getComputedStyle(document.documentElement)
                 .getPropertyValue('--cell-size');
  const cellPx = parseFloat(size);
  const gap = 3;
  const step = cellPx + gap;
  const pad = 14;

  boardEl.style.gridTemplateColumns = `repeat(${gridSize}, ${cellPx}px)`;
  boardEl.innerHTML = '';

  // Capa SVG para dibujar las líneas tipo láser
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  const dim = pad * 2 + gridSize * cellPx + (gridSize - 1) * gap;
  svg.setAttribute('width', dim);
  svg.setAttribute('height', dim);
  svg.style.position = 'absolute';
  svg.style.inset = '0';
  svg.style.pointerEvents = 'none';
  svg.style.zIndex = '2';

  const center = i => pad + i * step + cellPx / 2;

  // Todas las rutas completadas + la que se está dibujando
  const allPaths = [...completedRoutes.map(r => ({ cells: r.cells, colorIdx: r.colorIdx }))];
  if (drawing) allPaths.push({ cells: drawing.cells, colorIdx: drawing.colorIdx });

  allPaths.forEach(p => {
    if (p.cells.length < 2) return;
    const pts = p.cells.map(c => `${center(c.c)},${center(c.r)}`).join(' ');
    const col = COLORS[p.colorIdx].hex;

    // Halo exterior
    const glow = document.createElementNS(svgNS, 'polyline');
    glow.setAttribute('points', pts);
    glow.setAttribute('fill', 'none');
    glow.setAttribute('stroke', col);
    glow.setAttribute('stroke-opacity', '0.28');
    glow.setAttribute('stroke-width', cellPx * 0.62);
    glow.setAttribute('stroke-linecap', 'round');
    glow.setAttribute('stroke-linejoin', 'round');
    svg.appendChild(glow);

    // Núcleo brillante animado (energía fluyendo)
    const core = document.createElementNS(svgNS, 'polyline');
    core.setAttribute('points', pts);
    core.setAttribute('fill', 'none');
    core.setAttribute('stroke', '#ffffff');
    core.setAttribute('stroke-opacity', '0.85');
    core.setAttribute('stroke-width', 3);
    core.setAttribute('stroke-linecap', 'round');
    core.setAttribute('stroke-linejoin', 'round');
    core.setAttribute('stroke-dasharray', '10 16');
    core.innerHTML = `<animate attributeName="stroke-dashoffset" from="52" to="0" dur="0.9s" repeatCount="indefinite"/>`;
    svg.appendChild(core);
  });

  boardEl.appendChild(svg);

  // Celdas
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.r = r;
      cell.dataset.c = c;

      // Fondo tenue si pertenece a una ruta terminada
      const owner = ownerOf(r, c);
      if (owner !== null) {
        cell.style.background = hexToRGBA(COLORS[owner].hex, 0.22);
      }

      // Pista fija (cuadro de color)
      if (fixed[r][c] && board[r][c] >= 0) {
        const node = document.createElement('div');
        node.className = 'node';
        node.style.background = COLORS[board[r][c]].hex;
        node.style.color = COLORS[board[r][c]].hex;
        cell.appendChild(node);
      }

      cell.addEventListener('pointerdown', e => { e.preventDefault(); startDraw(r, c); });
      cell.addEventListener('pointerenter', () => extendDraw(r, c));
      cell.addEventListener('pointerup', endDraw);
      boardEl.appendChild(cell);
    }
  }
}

function ownerOf(r, c) {
  if (drawing) {
    for (const p of drawing.cells) if (p.r === r && p.c === c) return drawing.colorIdx;
  }
  for (const rt of completedRoutes) {
    for (const p of rt.cells) if (p.r === r && p.c === c) return rt.colorIdx;
  }
  return null;
}

function hexToRGBA(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

// ===== INICIAR TRAZADO =====
function startDraw(r, c) {
  // Solo se puede empezar desde una pista fija
  if (!fixed[r][c] || board[r][c] < 0) {
    setStatus('⚠️ Toca un cuadro de color para iniciar la conexión.', '#fbbf24');
    return;
  }

  const colorIdx = board[r][c];

  // Si ya existe una ruta terminada de ese color, se borra para rehacerla
  completedRoutes = completedRoutes.filter(rt => rt.colorIdx !== colorIdx);

  drawing = { colorIdx, cells: [{ r, c }] };
  renderBoard();
  setStatus(`🔗 Trazando ${COLORS[colorIdx].name}…`, COLORS[colorIdx].hex);
}

// ===== EXTENDER TRAZADO (arrastrando) =====
function extendDraw(r, c) {
  if (!drawing) return;

  const cells = drawing.cells;
  const last = cells[cells.length - 1];
  if (last.r === r && last.c === c) return;

  // Regla anti-cruce: solo casillas ortogonalmente adyacentes
  if (Math.abs(r - last.r) + Math.abs(c - last.c) !== 1) return;

  // Retroceso natural: si vuelve sobre su propia línea, deshace un paso
  if (cells.length >= 2) {
    const prev = cells[cells.length - 2];
    if (prev.r === r && prev.c === c) {
      cells.pop();
      renderBoard();
      return;
    }
  }

  // Bloqueo por otra ruta (aquí está tu corrección del cruce)
  const owner = ownerOf(r, c);
  if (owner !== null && owner !== drawing.colorIdx) {
    flashBlocked(r, c);
    setStatus('🚫 No puedes cruzar otra línea de energía.', '#ef4444');
    return;
  }

  // Evitar revisitarse a sí misma
  if (cells.some(p => p.r === r && p.c === c)) return;

  // Llegada al extremo del mismo color → conectar y cerrar
  if (fixed[r][c] && board[r][c] === drawing.colorIdx) {
    cells.push({ r, c });
    completedRoutes.push({ colorIdx: drawing.colorIdx, cells: [...cells] });
    setStatus(`✅ ¡${COLORS[drawing.colorIdx].name} conectado!`, COLORS[drawing.colorIdx].hex);
    drawing = null;
    renderBoard();
    checkWin();
    return;
  }

  // Casilla ocupada por otra pista de distinto color
  if (fixed[r][c] && board[r][c] !== drawing.colorIdx) {
    flashBlocked(r, c);
    setStatus('🚫 Ese cuadro pertenece a otro color.', '#ef4444');
    return;
  }

  cells.push({ r, c });
  renderBoard();
}

function flashBlocked(r, c) {
  const idx = r * gridSize + c;
  const cellEl = boardEl.children[idx + 1]; // +1 porque el SVG ocupa el primer hijo
  if (cellEl && cellEl.classList) {
    cellEl.classList.add('blocked-hint');
    setTimeout(() => cellEl.classList.remove('blocked-hint'), 350);
  }
}

// ===== FINALIZAR TRAZADO =====
function endDraw() {
  if (!drawing) return;
  // Si no llegó al destino, la ruta parcial se descarta
  drawing = null;
  renderBoard();
}

document.addEventListener('pointerup', endDraw);

let completedRoutes = [];   // rutas cerradas correctamente

// ===== VERIFICAR VICTORIA: todas las pistas conectadas Y tablero lleno =====
function checkWin() {
  const totalCells = gridSize * gridSize;
  const used = completedRoutes.reduce((count, rt) => count + rt.cells.length, 0);
  const requiredRoutes = LEVELS[currentLevel].pairs;

  if (completedRoutes.length !== requiredRoutes || used !== totalCells) {
    setStatus(`⚡ Energía usada: ${used}/${totalCells} casillas`, '#22d3ee');
    return false;
  }

  stopTimer();
  const t = elapsed();
  saveBestTime(currentLevel, t);
  loadBestTime(currentLevel);
  victoryMsg.textContent = `Tablero completo en ${t}s · Nivel ${gridSize}×${gridSize}`;
  victoryOverlay.classList.add('show');
  setStatus('🏆 ¡Conexión total lograda!', '#34d399');
  return true;
}

// ===== BOTONES =====
function startNewGame() {
  currentLevel = levelSelect.value;
  stopTimer();
  completedRoutes = [];
  drawing = null;
  victoryOverlay.classList.remove('show');
  timerEl.textContent = '⏱ 0s';
  generateBoard();
  loadBestTime(currentLevel);
  setStatus('Conecta todos los pares y cubre el tablero.', '#22d3ee');
  startTimer();
}

document.getElementById('newGame').addEventListener('click', startNewGame);
document.getElementById('playAgain').addEventListener('click', startNewGame);
levelSelect.addEventListener('change', startNewGame);

document.getElementById('clearRoute').addEventListener('click', () => {
  completedRoutes = [];
  drawing = null;
  renderBoard();
  setStatus('🧹 Rutas limpias. A reconectar.', '#22d3ee');
});

document.getElementById('hintRoute').addEventListener('click', () => {
  // Resuelve automáticamente un color aún sin conectar
  const pending = new Set();
  for (let r = 0; r < gridSize; r++)
    for (let c = 0; c < gridSize; c++)
      if (fixed[r][c] && board[r][c] >= 0) pending.add(board[r][c]);
  completedRoutes.forEach(rt => pending.delete(rt.colorIdx));

  if (!pending.size) { setStatus('Todos los colores están conectados ✨', '#34d399'); return; }

  const target = [...pending][0];
  // Aplica la ruta válida que se generó junto con el tablero.
  const path = solvePathFor(target);
  if (path) {
    completedRoutes.push({ colorIdx: target, cells: path });
    renderBoard();
    setStatus(`💡 Pista aplicada: ${COLORS[target].name}`, COLORS[target].hex);
    checkWin();
  }
});

function solvePathFor(colorIdx) {
  const path = solutionPaths[colorIdx];
  return path ? [...path] : null;
}

document.getElementById('checkRoute').addEventListener('click', () => {
  if (checkWin()) return;
  setStatus('⚡ Aún falta energía por distribuir en el tablero.', '#fbbf24');
});

// ===== ARRANQUE =====
initStarfield();
startNewGame();