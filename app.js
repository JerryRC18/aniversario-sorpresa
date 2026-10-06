(() => {
  /**
   * GitHub Pages es solo estático (sin PHP).
   * Para Telegram en producción usa relayUrl (Cloudflare Worker).
   * En local con Laragon puedes usar notifyUrl: "notify.php"
   */
  const CONFIG = {
    notifyUrl: "",
    relayUrl: "", // se completa tras desplegar el worker
  };

  const DESTINATIONS = {
    sma: {
      id: "sma",
      name: "San Miguel de Allende",
      theme: "theme-sma",
      tag: "Nuestro fin de semana · Romance",
      hook: "Calles de piedra, atardeceres y una mesa solo para nosotros dos.",
      story:
        "Este aniversario nos pide elegancia y calma: caminar tomados de la mano, una terraza con vista y esa sensación de película. San Miguel es para celebrarnos sin prisa, con buen gusto y mucho cariño.",
      highlights: [
        "Atardecer en el Centro y la Parroquia iluminada, juntos.",
        "Cena íntima, una copa y conversación sin reloj.",
        "Galerías, jardines y fotos que se quedan para siempre.",
      ],
      quote: "“Celebrarnos aquí es decirnos sí otra vez.”",
      images: [
        {
          src: "images/sma/1.jpg",
          alt: "Parroquia de San Miguel de Allende",
        },
        {
          src: "images/sma/2.jpg",
          alt: "Calle Mesones en San Miguel de Allende",
        },
        {
          src: "images/sma/3.jpg",
          alt: "Torre de la Parroquia de San Miguel",
        },
        {
          src: "images/sma/4.jpg",
          alt: "Arquitectura de San Miguel de Allende",
        },
      ],
    },
    gto: {
      id: "gto",
      name: "Guanajuato",
      theme: "theme-gto",
      tag: "Nuestro fin de semana · Aventura",
      hook: "Callejones, canciones y la magia de perdernos a propósito.",
      story:
        "Este aniversario pide risas, color y anécdotas. Guanajuato es para caminar de la mano, escucharnos cantar en una callejoneada y recordar por qué nos elegimos: porque juntos todo se vuelve más vivo.",
      highlights: [
        "Una callejoneada de noche, solo nosotros y las leyendas.",
        "Miradores, túneles y fachadas de colores para recuerdos.",
        "Plazas, música y una ciudad que se siente de película.",
      ],
      quote: "“Perdernos juntos siempre fue el mejor plan.”",
      images: [
        {
          src: "images/gto/1.jpg",
          alt: "Ciudad de Guanajuato",
        },
        {
          src: "images/gto/2.jpg",
          alt: "Plaza de la Paz, Guanajuato",
        },
        {
          src: "images/gto/3.jpg",
          alt: "Atardecer en Guanajuato",
        },
        {
          src: "images/gto/4.jpg",
          alt: "Callejón del Beso, Guanajuato",
        },
      ],
    },
    maz: {
      id: "maz",
      name: "Mazamitla",
      theme: "theme-maz",
      tag: "Nuestro fin de semana · Intimidad",
      hook: "Bosque, cabaña y el lujo de no compartir el momento con nadie más.",
      story:
        "Este aniversario pide silencio, abrigo y cercanía. Mazamitla es fogata, café caliente y despertar con olor a pino. Un reset para nosotros dos: sin ruido, sin agenda… solo amor y bosque.",
      highlights: [
        "Cabaña con chimenea y vista al bosque.",
        "Caminatas lentas, aire frío y manos entrelazadas.",
        "Noche de estrellas, cobija y cero prisa.",
      ],
      quote: "“El bosque guarda bien los secretos de dos.”",
      images: [
        {
          src: "images/maz/1.jpg",
          alt: "Templo de Mazamitla",
        },
        {
          src: "images/maz/2.jpg",
          alt: "Plaza principal de Mazamitla",
        },
        {
          src: "images/maz/3.jpg",
          alt: "Parroquia de San Cristóbal, Mazamitla",
        },
        {
          src: "images/maz/4.jpg",
          alt: "Centro de Mazamitla",
        },
      ],
    },
  };

  const QUESTIONS = [
    {
      kicker: "Momento 1",
      title: "Si mañana despertamos lejos… ¿qué escena te enamora más?",
      options: [
        {
          label: "Café en terraza, mirándonos sin prisa",
          hint: "Luz suave, plaza abajo, solo nosotros",
          scores: { sma: 2, gto: 1, maz: 0 },
        },
        {
          label: "Perdernos de la mano entre callejones",
          hint: "Risas, sorpresas y fotos espontáneas",
          scores: { sma: 1, gto: 2, maz: 0 },
        },
        {
          label: "Abrir la ventana al silencio y al bosque",
          hint: "Aire frío, cobija y abrazo largo",
          scores: { sma: 0, gto: 0, maz: 2 },
        },
      ],
    },
    {
      kicker: "Momento 2",
      title: "Para celebrar nuestra noche ideal…",
      options: [
        {
          label: "Cena íntima, luz tenue y una copa",
          hint: "Conversación larga, sin interrupciones",
          scores: { sma: 2, gto: 1, maz: 0 },
        },
        {
          label: "Salir a cantar, caminar y reír por la ciudad",
          hint: "Energía, música y anécdotas",
          scores: { sma: 0, gto: 2, maz: 0 },
        },
        {
          label: "Fogata, estrellas y susurros",
          hint: "Sin agenda, solo calor",
          scores: { sma: 0, gto: 0, maz: 2 },
        },
      ],
    },
    {
      kicker: "Momento 3",
      title: "¿Qué paisaje nos sentiría más “nosotros”?",
      options: [
        {
          label: "Cantera, cúpulas y atardecer dorado",
          hint: "Belleza que se siente de película",
          scores: { sma: 2, gto: 1, maz: 0 },
        },
        {
          label: "Un valle lleno de color y balcones",
          hint: "Como un escenario vivo",
          scores: { sma: 1, gto: 2, maz: 0 },
        },
        {
          label: "Montañas, niebla y pinos",
          hint: "Naturaleza a unos pasos",
          scores: { sma: 0, gto: 0, maz: 2 },
        },
      ],
    },
    {
      kicker: "Momento 4",
      title: "En este viaje juntos priorizamos…",
      options: [
        {
          label: "Detalles bonitos y ambiente especial",
          hint: "Algo boutique, íntimo, memorable",
          scores: { sma: 2, gto: 0, maz: 1 },
        },
        {
          label: "Experiencias que se vuelvan historia nuestra",
          hint: "Lo inesperado, lo que contaremos después",
          scores: { sma: 0, gto: 2, maz: 0 },
        },
        {
          label: "Descansar de verdad, solo tú y yo",
          hint: "Desconectar del ruido del mundo",
          scores: { sma: 0, gto: 0, maz: 2 },
        },
      ],
    },
    {
      kicker: "Momento 5",
      title: "Si este aniversario pudiera dejarnos una sola sensación…",
      options: [
        {
          label: "Romance y elegancia",
          hint: "Como volver a enamorarnos con estilo",
          scores: { sma: 2, gto: 1, maz: 0 },
        },
        {
          label: "Alegría y complicidad",
          hint: "Risas que se nos pegan al corazón",
          scores: { sma: 0, gto: 2, maz: 0 },
        },
        {
          label: "Calma profunda y cercanía",
          hint: "El silencio cómodo de estar juntos",
          scores: { sma: 0, gto: 0, maz: 2 },
        },
      ],
    },
  ];

  const screens = {
    landing: document.getElementById("screen-landing"),
    quiz: document.getElementById("screen-quiz"),
    reveal: document.getElementById("screen-reveal"),
    result: document.getElementById("screen-result"),
  };

  const els = {
    questionKicker: document.getElementById("question-kicker"),
    questionTitle: document.getElementById("question-title"),
    options: document.getElementById("options"),
    progressBar: document.getElementById("progress-bar"),
    progressLabel: document.getElementById("progress-label"),
    progress: document.getElementById("progress"),
    revealTitle: document.getElementById("reveal-title"),
    resultTag: document.getElementById("result-tag"),
    resultTitle: document.getElementById("result-title"),
    resultHook: document.getElementById("result-hook"),
    resultStory: document.getElementById("result-story"),
    resultHighlights: document.getElementById("result-highlights"),
    resultQuote: document.getElementById("result-quote"),
    resultHero: document.getElementById("result-hero"),
    photoGallery: document.getElementById("photo-gallery"),
  };

  let current = 0;
  let scores = { sma: 0, gto: 0, maz: 0 };
  let locked = false;
  let notifiedThisRound = false;
  let revealTick = null;
  let revealTimer = null;

  function showScreen(name) {
    Object.entries(screens).forEach(([key, el]) => {
      const active = key === name;
      el.hidden = !active;
      el.classList.toggle("is-active", active);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function updateProgress() {
    const pct = (current / QUESTIONS.length) * 100;
    els.progressBar.style.width = `${pct}%`;
    els.progress.setAttribute("aria-valuenow", String(Math.round(pct)));
    els.progressLabel.textContent = `${Math.min(current + 1, QUESTIONS.length)} / ${QUESTIONS.length}`;
  }

  function renderQuestion() {
    const q = QUESTIONS[current];
    locked = false;
    els.questionKicker.textContent = q.kicker;
    els.questionTitle.textContent = q.title;
    els.options.innerHTML = "";

    q.options.forEach((opt, index) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option";
      btn.setAttribute("role", "option");
      btn.innerHTML = `
        <span class="option__label">${opt.label}</span>
        <span class="option__hint">${opt.hint}</span>
      `;
      btn.addEventListener("click", () => selectOption(opt, btn));
      els.options.appendChild(btn);
      if (index === 0) btn.focus({ preventScroll: true });
    });

    updateProgress();
  }

  function selectOption(opt, btn) {
    if (locked) return;
    locked = true;
    btn.classList.add("is-selected");

    scores.sma += opt.scores.sma;
    scores.gto += opt.scores.gto;
    scores.maz += opt.scores.maz;

    const isLast = current === QUESTIONS.length - 1;

    if (isLast) {
      notifySecret(pickWinner());
    }

    setTimeout(() => {
      current += 1;
      if (current >= QUESTIONS.length) {
        finishQuiz();
      } else {
        renderQuestion();
      }
    }, 320);
  }

  function pickWinner() {
    const entries = Object.entries(scores);
    entries.sort((a, b) => b[1] - a[1]);
    return DESTINATIONS[entries[0][0]];
  }

  function notifySecret(dest) {
    if (notifiedThisRound || !dest) return;
    notifiedThisRound = true;

    const payload = {
      destino: dest.name,
      hook: dest.hook,
      id: dest.id,
    };
    const body = JSON.stringify(payload);
    const endpoint = CONFIG.relayUrl || CONFIG.notifyUrl;
    if (!endpoint) return;

    try {
      if (navigator.sendBeacon) {
        const blob = new Blob([body], { type: "application/json" });
        navigator.sendBeacon(endpoint, blob);
        return;
      }
    } catch (_) {}

    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
      mode: "cors",
    }).catch(() => {});
  }

  function clearRevealTimers() {
    if (revealTick) {
      clearInterval(revealTick);
      revealTick = null;
    }
    if (revealTimer) {
      clearTimeout(revealTimer);
      revealTimer = null;
    }
  }

  function finishQuiz() {
    els.progressBar.style.width = "100%";
    showScreen("reveal");
    const winner = pickWinner();
    notifySecret(winner);

    const suspense = ["Casi…", "Un poco más…", "Ya casi es nuestro…"];
    let i = 0;
    els.revealTitle.textContent = suspense[0];
    clearRevealTimers();
    revealTick = setInterval(() => {
      i += 1;
      if (i < suspense.length) {
        els.revealTitle.textContent = suspense[i];
      }
    }, 480);

    revealTimer = setTimeout(() => {
      clearRevealTimers();
      paintResult(winner);
      showScreen("result");
    }, 1700);
  }

  function paintResult(dest) {
    screens.result.classList.remove("theme-sma", "theme-gto", "theme-maz");
    screens.result.classList.add(dest.theme);

    const heroImg = dest.images && dest.images[0] ? dest.images[0].src : "";
    if (heroImg) {
      els.resultHero.style.backgroundImage = `
        linear-gradient(120deg, rgba(16, 24, 32, 0.2), rgba(16, 24, 32, 0.1)),
        url("${heroImg}")
      `;
    }

    els.resultTag.textContent = dest.tag;
    els.resultTitle.textContent = dest.name;
    els.resultHook.textContent = dest.hook;
    els.resultStory.textContent = dest.story;
    els.resultQuote.textContent = dest.quote;
    els.resultHighlights.innerHTML = dest.highlights
      .map((h) => `<li>${h}</li>`)
      .join("");

    const galleryImgs = (dest.images || []).slice(1);
    els.photoGallery.innerHTML = galleryImgs
      .map(
        (img, i) => `
      <figure class="photo-gallery__item photo-gallery__item--${i + 1}">
        <img src="${img.src}" alt="${img.alt}" loading="lazy" />
      </figure>`
      )
      .join("");
  }

  document.getElementById("btn-start").addEventListener("click", () => {
    clearRevealTimers();
    current = 0;
    scores = { sma: 0, gto: 0, maz: 0 };
    locked = false;
    notifiedThisRound = false;
    els.progressBar.style.width = "0%";
    showScreen("quiz");
    renderQuestion();
  });
})();
