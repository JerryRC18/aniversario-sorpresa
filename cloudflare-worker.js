/**
 * Cloudflare Worker — aviso secreto a Telegram (el token NO va en GitHub Pages).
 *
 * Cómo desplegar (gratis):
 * 1) Cuenta en https://dash.cloudflare.com
 * 2) Workers & Pages → Create → Worker
 * 3) Pega este código
 * 4) Settings → Variables → agrega secretos:
 *      TELEGRAM_BOT_TOKEN = tu token
 *      TELEGRAM_CHAT_ID   = 714974981
 * 5) Deploy y copia la URL (https://....workers.dev)
 * 6) Pégala en app.js → CONFIG.relayUrl
 */
export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(),
      });
    }

    if (request.method !== "POST") {
      return json({ ok: false, error: "POST only" }, 405);
    }

    let data;
    try {
      data = await request.json();
    } catch {
      return json({ ok: false, error: "JSON inválido" }, 400);
    }

    const destino = (data && data.destino) || "";
    if (!destino) return json({ ok: false, error: "destino faltante" }, 400);

    const hook = (data && data.hook) || "";
    const cuando = new Date().toISOString();
    const text =
      "💕 ¡Feliz aniversario! Te amo\n\n" +
      `El destino que salió es: ${destino}\n` +
      (hook ? `${hook}\n` : "") +
      `\n(Aviso secreto · ${cuando})`;

    const token = env.TELEGRAM_BOT_TOKEN;
    const chatId = env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) {
      return json({ ok: false, error: "Faltan secretos del Worker" }, 500);
    }

    const tg = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text }),
      }
    );
    const result = await tg.json();

    return json(
      { ok: !!result.ok, telegram: !!result.ok },
      result.ok ? 200 : 502
    );
  },
};

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(),
    },
  });
}
