const fs = require('fs');
const path = require('path');
const vm = require('vm');

const htmlPath = 'guias/ingles/grados6-7/periodo3/semana3.html';
const html = fs.readFileSync(htmlPath, 'utf8');

const match = html.match(/<script\b[^>]*>([\s\S]*?)<\/script>/i);
if (!match) {
  console.log(JSON.stringify({ error: "No script found" }));
  process.exit(1);
}
const scriptContent = match[1];

let compilationOk = false;
let compilationError = null;
try {
  new vm.Script(scriptContent);
  compilationOk = true;
} catch (e) {
  compilationError = e.message;
}

const hasMaxScore = scriptContent.includes('const MAX_SCORE = 210');
const hasObtenerPuntajeTotal = scriptContent.includes('obtenerPuntajeTotal()') || scriptContent.includes('obtenerPuntajeTotal');
const hasPuntajesSemana7 = scriptContent.includes('puntajesSemana[7] = correctas * 4') || scriptContent.includes('puntajesSemana[7]');
const hasPuntajeTotalText = html.includes('Puntaje total:');

const week7Index = scriptContent.indexOf('puntajesSemana[7]');
let snippet = '';
if (week7Index !== -1) {
  snippet = scriptContent.substring(Math.max(0, week7Index - 200), Math.min(scriptContent.length, week7Index + 200));
}

const hasHrefPattern = html.includes('href=\"../../../../index.html\"') || html.includes('href=\\'../../../../index.html\\'') || html.includes(\"href='../../../../index.html'\");
const absoluteHrefPath = path.resolve(path.dirname(htmlPath), '../../../../index.html');
const hrefFileExists = fs.existsSync(absoluteHrefPath);

console.log(JSON.stringify({
  compilationOk,
  compilationError,
  hasMaxScore,
  hasObtenerPuntajeTotal,
  hasPuntajesSemana7,
  hasPuntajeTotalText,
  hasHrefPattern,
  hrefFileExists,
  snippet: snippet.trim()
}, null, 2));
