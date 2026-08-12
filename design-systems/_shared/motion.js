/* =============================================================
   SHARED MOTION LAYER  ·  vanilla + GSAP + Lenis
   Distilled from Fluke (init pattern) and Qubix (guard clauses).

   <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>
   <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/ScrollTrigger.min.js"></script>
   <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/SplitText.min.js"></script>
   <script src="https://unpkg.com/lenis@1.3.1/dist/lenis.min.js"></script>
   <script src="design-systems/_shared/motion.js"></script>

   Everything degrades gracefully: with no GSAP the page still works,
   and prefers-reduced-motion disables all of it.
   ============================================================= */

(function () {
  "use strict";

  /* ---------- GUARD CLAUSES (Qubix pattern — ship these always) ---------- */
  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const HAS_GSAP = typeof window.gsap !== "undefined";
  const HAS_ST = HAS_GSAP && typeof window.ScrollTrigger !== "undefined";
  const HAS_LENIS = typeof window.Lenis !== "undefined";
  const IS_TOUCH = window.matchMedia("(hover: none)").matches;

  const DS = (window.DS = window.DS || {});
  DS.reduced = REDUCED;

  /* Read motion tokens straight from CSS so JS and CSS never drift. */
  const cs = getComputedStyle(document.documentElement);
  const ms = (name, fallback) => {
    const v = cs.getPropertyValue(name).trim();
    if (!v) return fallback;
    return v.endsWith("ms") ? parseFloat(v) / 1000
         : v.endsWith("s")  ? parseFloat(v)
         : parseFloat(v) || fallback;
  };
  const T = {
    micro: ms("--d-micro", 0.18),
    base:  ms("--d-base", 0.4),
    slow:  ms("--d-slow", 0.7),
    enter: ms("--d-enter", 0.6),
    exit:  ms("--d-exit", 0.38)
  };
  const E = { out: "power4.out", enter: "power3.out", exit: "power2.out", over: "back.out(1.7)" };
  DS.T = T; DS.E = E;

  /* =============================================================
     1 · SMOOTH SCROLL  (Fluke's init, Qubix's guards)
     ============================================================= */
  let lenis = null;

  function initSmoothScroll() {
    if (REDUCED || IS_TOUCH || !HAS_LENIS || !HAS_GSAP) return;
    lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    if (HAS_ST) lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);   // never skip frames to catch up
    DS.lenis = lenis;
  }

  /* =============================================================
     2 · FADE-UP ON SCROLL   [data-anim="in"]
     The single most-used move across all five references.
     ============================================================= */
  function initReveal() {
    const els = document.querySelectorAll('[data-anim="in"], .c-in');
    if (!els.length) return;

    if (REDUCED || !HAS_ST) {                    // graceful fallback
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    els.forEach((el) => {
      const delay = parseFloat(el.dataset.delay || 0);
      ScrollTrigger.create({
        trigger: el, start: "top 88%", once: true,
        onEnter: () =>
          gsap.to(el, {
            opacity: 1, y: 0, duration: T.enter, ease: E.out, delay,
            onStart: () => el.classList.add("is-in")
          })
      });
    });
  }

  /* Stagger a container's children: <div data-anim="stagger"> */
  function initStagger() {
    const groups = document.querySelectorAll('[data-anim="stagger"]');
    groups.forEach((group) => {
      const kids = group.children;
      if (REDUCED || !HAS_ST) {
        [...kids].forEach((k) => k.classList.add("is-in"));
        return;
      }
      gsap.set(kids, { opacity: 0, y: 28 });
      ScrollTrigger.create({
        trigger: group, start: "top 85%", once: true,
        onEnter: () => gsap.to(kids, {
          opacity: 1, y: 0, duration: T.enter, ease: E.out, stagger: 0.07
        })
      });
    });
  }

  /* =============================================================
     3 · WORD-BY-WORD SCROLL REVEAL  (Unusually)
     <h2 data-anim="words">Big statement here</h2>
     ============================================================= */
  function initWordReveal() {
    const els = document.querySelectorAll('[data-anim="words"]');
    els.forEach((el) => {
      if (el.dataset.split === "done") return;
      // wrap each word so we can tint them individually
      el.innerHTML = el.textContent
        .trim().split(/\s+/)
        .map((w) => `<span class="c-reveal__w">${w}</span>`)
        .join(" ");
      el.classList.add("c-reveal");
      el.dataset.split = "done";

      const words = el.querySelectorAll(".c-reveal__w");
      if (REDUCED || !HAS_ST) {
        words.forEach((w) => w.classList.add("is-on"));
        return;
      }
      ScrollTrigger.create({
        trigger: el,
        start: "top 78%",
        end: "bottom 55%",
        scrub: true,
        onUpdate: (self) => {
          const n = Math.round(self.progress * words.length);
          words.forEach((w, i) => w.classList.toggle("is-on", i < n));
        }
      });
    });
  }

  /* =============================================================
     4 · ODOMETER COUNTER  (Ritovex)
     <span class="c-odometer" data-anim="count" data-to="250" data-suffix="+"></span>
     ============================================================= */
  function buildReel(digit) {
    const reel = document.createElement("span");
    reel.className = "c-odometer__reel";
    const col = document.createElement("span");
    col.className = "c-odometer__digits";
    for (let i = 0; i <= 9; i++) {
      const s = document.createElement("span");
      s.textContent = i;
      col.appendChild(s);
    }
    reel.appendChild(col);
    reel.dataset.target = digit;
    return reel;
  }

  function initCounters() {
    document.querySelectorAll('[data-anim="count"]').forEach((el) => {
      const to = String(parseInt(el.dataset.to || "0", 10));
      const suffix = el.dataset.suffix || "";
      el.innerHTML = "";

      const reels = [...to].map((d) => {
        const r = buildReel(+d);
        el.appendChild(r);
        return r;
      });
      if (suffix) {
        const s = document.createElement("span");
        s.textContent = suffix;
        el.appendChild(s);
      }

      const run = () =>
        reels.forEach((r, i) => {
          const col = r.querySelector(".c-odometer__digits");
          const target = +r.dataset.target;
          if (REDUCED || !HAS_GSAP) {
            col.style.transform = `translateY(${-target}em)`;
            return;
          }
          gsap.to(col, {
            y: `${-target}em`,
            duration: T.slow + i * 0.12,
            ease: E.out
          });
        });

      if (REDUCED || !HAS_ST) { run(); return; }
      ScrollTrigger.create({ trigger: el, start: "top 85%", once: true, onEnter: run });
    });
  }

  /* =============================================================
     5 · LIVE SCROLL PERCENTAGE  (Qubix)
     <span class="c-nav__progress" data-anim="scroll-percent">0%</span>
     Uses rAF, not a tween-as-throttle.
     ============================================================= */
  function initScrollPercent() {
    const els = document.querySelectorAll('[data-anim="scroll-percent"]');
    if (!els.length) return;
    let ticking = false;

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max <= 0 ? 0 : Math.round((window.scrollY / max) * 100);
      els.forEach((el) => (el.textContent = pct + "%"));
      document.documentElement.style.setProperty("--sv-progress", pct / 100);
      ticking = false;
    };
    addEventListener("scroll", () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* =============================================================
     6 · CURSOR-PARALLAX SCATTER HERO  (Qubix)
     <div data-anim="scatter"> with .c-scatter__card children,
     each optionally data-depth="0.4"
     ============================================================= */
  function initScatter() {
    if (REDUCED || IS_TOUCH || !HAS_GSAP) return;
    document.querySelectorAll('[data-anim="scatter"]').forEach((wrap) => {
      const cards = wrap.querySelectorAll(".c-scatter__card");
      const setters = [...cards].map((c) => ({
        x: gsap.quickTo(c, "x", { duration: T.slow, ease: E.out }),
        y: gsap.quickTo(c, "y", { duration: T.slow, ease: E.out }),
        r: gsap.quickTo(c, "rotation", { duration: T.slow, ease: E.out }),
        d: parseFloat(c.dataset.depth || 0.5)
      }));

      wrap.addEventListener("pointermove", (e) => {
        const b = wrap.getBoundingClientRect();
        const nx = (e.clientX - b.left) / b.width - 0.5;   // -0.5 → 0.5
        const ny = (e.clientY - b.top) / b.height - 0.5;
        setters.forEach((s) => {
          s.x(nx * 60 * s.d);
          s.y(ny * 60 * s.d);
          s.r(nx * 10 * s.d);
        });
      });
      wrap.addEventListener("pointerleave", () =>
        setters.forEach((s) => { s.x(0); s.y(0); s.r(0); })
      );
    });
  }

  /* =============================================================
     7 · CURSOR IMAGE TRAIL  (Unusually)
     Distance-throttled, clone-animate-destroy.
     <div data-anim="trail" data-images="a.jpg,b.jpg,c.jpg">
     ============================================================= */
  function initTrail() {
    if (REDUCED || IS_TOUCH || !HAS_GSAP) return;
    document.querySelectorAll('[data-anim="trail"]').forEach((wrap) => {
      const srcs = (wrap.dataset.images || "").split(",").map((s) => s.trim()).filter(Boolean);
      if (!srcs.length) return;
      let idx = 0, lastX = 0, lastY = 0;
      const THRESHOLD = 100;   // distance, not time — trail density stays constant

      getComputedStyle(wrap).position === "static" && (wrap.style.position = "relative");

      wrap.addEventListener("pointermove", (e) => {
        if (Math.abs(lastX - e.clientX) < THRESHOLD && Math.abs(lastY - e.clientY) < THRESHOLD) return;
        lastX = e.clientX; lastY = e.clientY;

        const b = wrap.getBoundingClientRect();
        const img = document.createElement("img");
        img.src = srcs[idx = (idx + 1) % srcs.length];
        img.alt = "";
        Object.assign(img.style, {
          position: "absolute", inlineSize: "180px", aspectRatio: "4/5",
          objectFit: "cover", borderRadius: "var(--r-lg)",
          pointerEvents: "none", translate: "-50% -50%", zIndex: 1
        });
        img.style.left = e.clientX - b.left + "px";
        img.style.top = e.clientY - b.top + "px";
        wrap.appendChild(img);

        gsap.timeline({ onComplete: () => img.remove() })
          .fromTo(img, { opacity: 0, scale: 0.5 },
                       { opacity: 1, scale: 1, duration: T.base, ease: E.enter })
          .to(img, { opacity: 0, y: 120, duration: T.slow, ease: E.exit });
      });
    });
  }

  /* =============================================================
     8 · EXCLUSIVE HOVER GROUP  (Qubix)
     Asymmetric timing + killTweensOf to stop queue pile-up.
     <ul data-anim="exclusive"> <li> ... <div class="js-panel">
     ============================================================= */
  function initExclusive() {
    if (REDUCED || IS_TOUCH || !HAS_GSAP) return;
    document.querySelectorAll('[data-anim="exclusive"]').forEach((group) => {
      const items = [...group.children];
      const panelOf = (i) => i.querySelector(".js-panel");

      items.forEach((item, i) => {
        const p = panelOf(item);
        if (p) gsap.set(p, { opacity: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 0.94, y: i === 0 ? 0 : 32 });

        item.addEventListener("mouseenter", () => {
          items.forEach((other) => {
            const op = panelOf(other);
            if (!op || other === item) return;
            gsap.killTweensOf(op);                       // ← essential
            gsap.to(op, { opacity: 0, scale: 0.94, y: -24, duration: T.exit, ease: E.exit });
            other.classList.remove("is-active");
          });
          const p2 = panelOf(item);
          item.classList.add("is-active");
          if (!p2) return;
          gsap.killTweensOf(p2);
          gsap.to(p2, { opacity: 1, scale: 1, y: 0, duration: T.enter, ease: E.enter });
        });
      });
    });
  }

  /* =============================================================
     9 · SCROLL-DRIVEN CSS VARIABLES  (Fluke PLUGIN_VARIABLE)
     <section data-anim="media-scroll"> animates --sv-media-radius
     and --sv-media-pad, which CSS cascades to many children.
     ============================================================= */
  function initScrollVars() {
    if (REDUCED || !HAS_ST) return;
    document.querySelectorAll('[data-anim="media-scroll"]').forEach((sec) => {
      ScrollTrigger.create({
        trigger: sec, start: "top bottom", end: "center center", scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          sec.style.setProperty("--sv-media-radius", `${(1 - p) * 80}px`);
          sec.style.setProperty("--sv-media-pad", `${(1 - p) * 48}px`);
          sec.style.setProperty("--sv-reveal", p.toFixed(3));
        }
      });
    });
  }

  /* =============================================================
     10 · ACCORDION
     ============================================================= */
  function initAccordion() {
    document.querySelectorAll(".c-acc__btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const open = btn.getAttribute("aria-expanded") === "true";
        const group = btn.closest("[data-acc-group]");
        if (group && !open) {
          group.querySelectorAll('.c-acc__btn[aria-expanded="true"]')
               .forEach((b) => b.setAttribute("aria-expanded", "false"));
        }
        btn.setAttribute("aria-expanded", String(!open));
        if (HAS_ST) ScrollTrigger.refresh();
      });
    });
  }

  /* =============================================================
     BOOT  (Fluke's font-gated pattern)
     ============================================================= */
  function boot() {
    if (HAS_GSAP && HAS_ST) gsap.registerPlugin(ScrollTrigger);

    initSmoothScroll();
    initReveal();
    initStagger();
    initWordReveal();
    initCounters();
    initScrollPercent();
    initScatter();
    initTrail();
    initExclusive();
    initScrollVars();
    initAccordion();

    // debounced refresh + ResizeObserver on body (Fluke) — catches
    // height changes that window.resize alone misses
    if (HAS_ST) {
      let t;
      const onResize = () => { clearTimeout(t); t = setTimeout(() => ScrollTrigger.refresh(), 50); };
      addEventListener("resize", onResize);
      new ResizeObserver(onResize).observe(document.body);
    }

    // FOUC guard
    document.documentElement.classList.add("ds-ready");
    window.dispatchEvent(new CustomEvent("DSReady", { detail: { lenis } }));
  }

  // Gate on fonts — SplitText/word-wrapping before fonts load breaks line boxes
  const start = () =>
    document.fonts && document.fonts.status !== "loaded"
      ? document.fonts.ready.then(boot)
      : boot();

  document.readyState === "loading"
    ? addEventListener("DOMContentLoaded", start)
    : start();
})();
