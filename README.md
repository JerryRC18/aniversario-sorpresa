# Aniversario — sorpresa de destino

Web estática (quiz de aniversario) publicada en GitHub Pages.

## Local

Abre `index.html` o sírvelo con cualquier static server.

## Aviso secreto por Telegram (producción)

GitHub Pages no ejecuta PHP. Usa el Worker en `cloudflare-worker.js`
(instrucciones dentro del archivo) y pon la URL en `app.js` → `CONFIG.relayUrl`.
