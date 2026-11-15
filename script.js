(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const rnd = (n) => Math.floor(Math.random() * n);
  const pad = (n) => String(n).padStart(2, "0");

  /* ---------- random card data (Luhn-valid numbers) ---------- */
  function cardNumber(prefix) {
    const d = prefix.split("").map(Number);
    while (d.length < 15) d.push(rnd(10));
    let sum = 0,
      dbl = true;
    for (let i = d.length - 1; i >= 0; i--) {
      let x = d[i];
      if (dbl) {
        x *= 2;
        if (x > 9) x -= 9;
      }
      sum += x;
      dbl = !dbl;
    }
    d.push((10 - (sum % 10)) % 10);
    return d.join("").replace(/(\d{4})(?=\d)/g, "$1 ");
  }

  const NAMES = [
    "Aarav Mehta",
    "Isha Kapoor",
    "Rohan Iyer",
    "Meera Nair",
    "Kabir Shah",
    "Ananya Rao",
    "Vikram Sethi",
    "Diya Menon",
    "Arjun Verma",
    "Tara Bose",
    "Neil Fernandes",
    "Riya Desai",
  ];

  const expiry = () => `${pad(1 + rnd(12))}/${28 + rnd(6)}`;

  const cards = [
    { num: $("num1"), name: $("name1"), exp: $("exp1"), prefix: "4" },
    { num: $("num2"), name: $("name2"), exp: $("exp2"), prefix: "5" },
  ];
  const timers = [];

  function scramble(el, finalText, idx) {
    clearInterval(timers[idx]);
    let f = 0;
    const total = 22,
      len = finalText.length;
    timers[idx] = setInterval(() => {
      f++;
      const lock = Math.floor((f / total) * len);
      let out = "";
      for (let i = 0; i < len; i++) {
        const ch = finalText[i];
        out += i < lock || ch === " " || ch === "/" ? ch : rnd(10);
      }
      el.textContent = out;
      if (f >= total) {
        clearInterval(timers[idx]);
        el.textContent = finalText;
      }
    }, 38);
  }

  function generate(animate) {
    cards.forEach((c, i) => {
      const n = cardNumber(c.prefix);
      if (animate) scramble(c.num, n, i);
      else c.num.textContent = n;
      c.name.textContent = NAMES[rnd(NAMES.length)].toUpperCase();
      c.exp.textContent = expiry();
    });
  }

  /* ---------- pull / return ---------- */
  ["card1", "card2"].forEach((id) => {
    const el = $(id);
    const toggle = () => el.classList.toggle("out");
    el.addEventListener("click", toggle);
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    });
  });

  $("regen").addEventListener("click", () => generate(true));

  /* ---------- fit to screen ---------- */
  const stage = $("stage"),
    vp = $("viewport");

  function fit() {
    const s = Math.min(
      1,
      (window.innerWidth - 20) / 560,
      (window.innerHeight - 140) / 590
    );
    const sc = Math.max(0.45, s);
    stage.style.transform = `scale(${sc})`;
    vp.style.width = 560 * sc + "px";
    vp.style.height = 590 * sc + "px";
  }

  window.addEventListener("resize", fit);

  fit();
  generate(false);
})();
