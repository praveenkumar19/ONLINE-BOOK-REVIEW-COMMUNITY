import { useEffect, useMemo, useState } from "react";
import "./FlyingBooks.css";

/* ---------- light-mode detection ----------
   Works with almost any theme switch:
   1. explicit signals: data-theme / class ("light", "dark") on <html> or <body>
   2. the actual page background colour (bright = light mode)
   3. the OS setting (prefers-color-scheme)
   You can also skip detection: <FlyingBooks theme={isDark ? "dark" : "light"} />
*/
function detectLight() {
  if (typeof document === "undefined") return false;

  const els = [document.documentElement, document.body].filter(Boolean);
  const signals = els
    .map((el) =>
      [
        el.getAttribute("data-theme"),
        el.getAttribute("data-mode"),
        el.getAttribute("data-color-scheme"),
        el.getAttribute("data-bs-theme"),
        el.style.colorScheme,
        typeof el.className === "string" ? el.className : "",
      ]
        .filter(Boolean)
        .join(" ")
    )
    .join(" ")
    .toLowerCase();

  if (/dark/.test(signals)) return false;
  if (/light/.test(signals)) return true;

  // fall back to how bright the page background really is
  for (const el of els) {
    const m = getComputedStyle(el).backgroundColor.match(/[\d.]+/g);
    if (m && m.length >= 3 && (m.length < 4 || parseFloat(m[3]) > 0.5)) {
      const [r, g, b] = m.map(Number);
      return 0.299 * r + 0.587 * g + 0.114 * b > 140;
    }
  }

  return window.matchMedia?.("(prefers-color-scheme: light)").matches ?? false;
}

function useIsLight(themeProp) {
  const [light, setLight] = useState(() =>
    themeProp ? themeProp === "light" : detectLight()
  );

  useEffect(() => {
    if (themeProp) {
      setLight(themeProp === "light");
      return undefined;
    }

    const update = () => setLight(detectLight());
    update();

    const watch = {
      attributes: true,
      attributeFilter: ["class", "data-theme", "data-mode", "data-color-scheme", "data-bs-theme", "style"],
    };
    const mo = new MutationObserver(update);
    mo.observe(document.documentElement, watch);
    mo.observe(document.body, watch);

    const mq = window.matchMedia?.("(prefers-color-scheme: light)");
    mq?.addEventListener?.("change", update);

    return () => {
      mo.disconnect();
      mq?.removeEventListener?.("change", update);
    };
  }, [themeProp]);

  return light;
}

const books = [
  { title: "PONNIYIN SELVAN",      author: "Kalki",           color: "#651c25" },
  { title: "SILAPPATHIKARAM",      author: "Ilango Adigal",   color: "#183b56" },
  { title: "THIRUKKURAL",          author: "Thiruvalluvar",   color: "#6b451b" },
  { title: "SIVAGAMIYIN SABATHAM", author: "Kalki",           color: "#43205f" },
  { title: "VADIVASAL",            author: "C. S. Chellappa", color: "#31572c" },
];

/*
  One entry per book.
  top       vertical lane
  dir       1 = flies left→right, -1 = right→left
  duration  seconds to cross the screen
  delay     negative = already mid-flight when the page loads
  scale     size / depth (small = far away)
  blur, dim distant books are softer and darker
  flap      seconds per wing-beat cycle (3 flaps + a glide)
  phase     offsets the wing beat so books don't flap in sync
  yAmp      how far it swoops up/down; yPeriod = one full swoop
  zPeriod   how slowly it drifts nearer / farther
*/
const flights = [
  { top: "10%", dir:  1, duration: 30, delay:  -6, scale: 0.8,  blur: "1px", dim: 0.8,  flap: 3.6, phase: 0.4, yAmp: "5vh", yPeriod: 11, zPeriod: 17 },
  { top: "58%", dir: -1, duration: 26, delay: -19, scale: 1.15, blur: "0px", dim: 1.05, flap: 3.3, phase: 1.7, yAmp: "6vh", yPeriod: 9,  zPeriod: 13 },
  { top: "32%", dir:  1, duration: 34, delay: -30, scale: 0.95, blur: "0px", dim: 0.95, flap: 3.9, phase: 2.6, yAmp: "4vh", yPeriod: 12, zPeriod: 19 },
  { top: "74%", dir: -1, duration: 28, delay:  -9, scale: 0.85, blur: "0.8px", dim: 0.85, flap: 3.5, phase: 0.9, yAmp: "5vh", yPeriod: 10, zPeriod: 15 },
  { top: "46%", dir:  1, duration: 24, delay: -14, scale: 1.05, blur: "0px", dim: 1,    flap: 3.2, phase: 2.1, yAmp: "6vh", yPeriod: 8,  zPeriod: 14 },
];

/*
  A book is a cover + a few pages on each side of the spine.
  k    how far this layer swings compared with the cover (pages swing less)
  lag  seconds behind the cover (pages trail like paper in the wind)
  z    thickness offset in px, so the stack has depth
*/
const LAYERS = [
  { kind: "cover", k: 1,    lag: 0,    z: -3.6 },
  { kind: "leaf",  k: 0.94, lag: 0.05, z: -2.4 },
  { kind: "leaf",  k: 0.86, lag: 0.1,  z: -1.4 },
  { kind: "leaf",  k: 0.77, lag: 0.16, z: -0.4 },
  { kind: "leaf",  k: 0.66, lag: 0.24, z: 0.6  },
];

const SIDES = ["left", "right"];

const PARTICLE_COUNT = 26;

// sparkles that drift back from the book
const SPARKS = [
  { tx: 45,  ty: -12, delay: 0 },
  { tx: 62,  ty: 18,  delay: 0.38 },
  { tx: 80,  ty: -30, delay: 0.76 },
  { tx: 98,  ty: 34,  delay: 1.14 },
  { tx: 116, ty: 6,   delay: 1.52 },
  { tx: 132, ty: -22, delay: 1.9 },
  { tx: 150, ty: 26,  delay: 2.28 },
];

// loose paper scraps that tumble down
const SCRAPS = [
  { tx: 40, r: "320deg",  delay: 0.6 },
  { tx: 70, r: "-280deg", delay: 1.8 },
  { tx: 55, r: "400deg",  delay: 3.0 },
];

function CoverOutside({ book, showTitle }) {
  if (showTitle) {
    return (
      <>
        <div className="book-decoration">✦</div>
        <h3>{book.title}</h3>
        <p>{book.author}</p>
        <div className="book-decoration">✦</div>
      </>
    );
  }
  return <div className="book-decoration crest">❖</div>;
}

// golden sparks shaken off the broom bristles
const WZ_SPARKS = [
  { tx: -30, ty: -8,  delay: 0 },
  { tx: -46, ty: 12,  delay: 0.27 },
  { tx: -62, ty: -14, delay: 0.54 },
  { tx: -76, ty: 18,  delay: 0.81 },
  { tx: -92, ty: -4,  delay: 1.08 },
  { tx: -108, ty: 14, delay: 1.35 },
];

// Original young wizard on a broomstick (light mode only — see CSS)
function WizardFlyer() {
  return (
    <div className="wizard-flyer">
      <div className="wz-lane">
        <div className="wz-sparks">
          {WZ_SPARKS.map((s, i) => (
            <span
              key={i}
              style={{ "--tx": `${s.tx}px`, "--ty": `${s.ty}px`, "--t-delay": `${s.delay}s` }}
            >
              ✦
            </span>
          ))}
        </div>

        <svg className="wz-svg" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
          <g className="wz-rig">
            {/* bristles */}
            <g className="wz-bristles">
              <path d="M28 87 L4 73 Q-1 88 4 102 Z" fill="#b8863b" />
              <path d="M28 87 L8 80 M28 87 L6 88 M28 87 L8 96" stroke="#8a5f22" strokeWidth="1.2" />
            </g>
            {/* handle */}
            <path d="M24 88 L186 62" stroke="#7a4a22" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M29 81 L27 94" stroke="#4b2e14" strokeWidth="3.5" strokeLinecap="round" />

            {/* cloak tail streaming behind */}
            <g className="wz-cloak">
              <path d="M96 52 C78 46 54 52 34 74 C58 68 72 74 92 80 Z" fill="#4a4480" />
            </g>

            {/* back leg */}
            <path d="M100 78 L108 89 L102 101" stroke="#221f42" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />

            {/* torso */}
            <path d="M92 78 C90 62 96 50 108 48 C118 50 123 62 116 78 Z" fill="#2f2b57" />

            {/* front leg + boot */}
            <path d="M100 78 L116 84 L113 98" stroke="#2f2b57" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <ellipse cx="113" cy="100" rx="6.5" ry="3.6" fill="#1f1a12" />

            {/* arm reaching to the handle */}
            <path d="M111 54 L138 69" stroke="#2f2b57" strokeWidth="6" strokeLinecap="round" />
            <circle cx="139" cy="69.5" r="3.6" fill="#e8c39e" />

            {/* scarf */}
            <path d="M103 46 Q110 53 120 46 L119 52 Q110 59 102 52 Z" fill="#1f7a78" />
            <path d="M106 50 L107 55 M112 51 L113 56 M117 49 L118 54" stroke="#e0a526" strokeWidth="1.6" />
            <g className="wz-scarf-tail">
              <path d="M103 50 C92 51 84 57 72 54 L75 61 C86 63 96 59 104 55 Z" fill="#1f7a78" />
              <path d="M84 54 L85 61 M93 53 L94 58" stroke="#e0a526" strokeWidth="1.6" />
            </g>

            {/* head + hair */}
            <circle cx="112" cy="38" r="9" fill="#e8c39e" />
            <path d="M103 37 C103 27 119 26 122 35 C117 31 110 33 103 41 Z" fill="#2a1d18" />
            <circle cx="116" cy="39" r="1.1" fill="#2a1d18" />

            {/* pointed hat */}
            <ellipse cx="112" cy="30" rx="15" ry="4" fill="#2f2b57" />
            <path d="M101 30 L116 30 C114 20 104 12 84 8 C96 14 100 22 101 30 Z" fill="#3a3568" />
            <path d="M101.5 27.5 L115.5 27.5" stroke="#e0a526" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function FlyingBooks({ theme } = {}) {
  const isLight = useIsLight(theme);

  // deterministic dust motes
  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => {
        const seed = (i * 9301 + 49297) % 233280;
        const r1 = seed / 233280;
        const r2 = ((i * 4241 + 12345) % 233280) / 233280;
        const r3 = ((i * 7517 + 9999) % 233280) / 233280;
        return {
          x: `${(r1 * 100).toFixed(2)}%`,
          y: `${(r2 * 100).toFixed(2)}%`,
          size: `${(r3 * 6 + 6).toFixed(1)}px`,
          dur: `${(r1 * 2.5 + 2.5).toFixed(2)}s`,
          delay: `${(r2 * 5).toFixed(2)}s`,
        };
      }),
    []
  );

  return (
    <div className={`flying-books ${isLight ? "is-light" : ""}`} aria-hidden="true">
      {/* ambient dust motes */}
      <div className="particles">
        {particles.map((p, i) => (
          <span
            key={i}
            style={{
              "--x": p.x,
              "--y": p.y,
              "--size": p.size,
              "--dur": p.dur,
              "--delay": p.delay,
            }}
          >
            ✦
          </span>
        ))}
      </div>

      {/* light-mode wizard on a broomstick */}
      {isLight && <WizardFlyer />}

      {/* flying books (dark mode only) */}
      {!isLight && books.map((book, index) => {
        const f = flights[index] ?? flights[0];

        // which wing faces the camera (its outer cover carries the title)
        const nearSide = f.dir > 0 ? "right" : "left";

        return (
          <div
            key={book.title}
            className={`flying-book ${f.dir < 0 ? "rtl" : ""} ${index >= 3 ? "extra" : ""}`}
            style={{
              "--top": f.top,
              "--duration": `${f.duration}s`,
              "--delay": `${f.delay}s`,
              "--s": f.scale,
              "--blur": f.blur,
              "--dim": f.dim,
              "--flap": `${f.flap}s`,
              "--phase": `${f.phase}s`,
              "--y-amp": f.yAmp,
              "--y-period": `${f.yPeriod}s`,
              "--y-delay": `${-(index * 2.3)}s`,
              "--z-period": `${f.zPeriod}s`,
              "--book-color": book.color,
            }}
          >
            <div className="lane-y">
              <div className="lane-z">
                <div className="aura" />

                {/* sparkle trail + falling page scraps */}
                <div className="trail">
                  {SPARKS.map((s, i) => (
                    <span
                      key={`s${i}`}
                      className="spark"
                      style={{ "--tx": `${s.tx}px`, "--ty": `${s.ty}px`, "--t-delay": `${s.delay}s` }}
                    >
                      ✦
                    </span>
                  ))}
                  {SCRAPS.map((s, i) => (
                    <span
                      key={`p${i}`}
                      className="scrap"
                      style={{ "--tx": `${s.tx}px`, "--r": s.r, "--t-delay": `${s.delay}s` }}
                    />
                  ))}
                </div>

                <div className="scene">
                  <div className="attitude">
                    <div className="pose">
                      <div className="roll">
                        <div className="book">
                          {SIDES.map((side) =>
                            LAYERS.map((l, li) => (
                              <div
                                key={`${side}-${li}`}
                                className={`layer ${side} ${l.kind}`}
                                style={{
                                  "--k": l.k,
                                  "--lag": `${l.lag}s`,
                                  "--z": `${l.z}px`,
                                }}
                              >
                                <div className="plate">
                                  {/* front = inside (pages / endpaper), back = outside of the cover */}
                                  <div className="face front" />
                                  <div className="face back">
                                    {l.kind === "cover" && (
                                      <CoverOutside book={book} showTitle={side === nearSide} />
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))
                          )}
                          <div className="spine" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FlyingBooks;