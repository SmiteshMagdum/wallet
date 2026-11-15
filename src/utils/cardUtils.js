/**
 * Card data utilities and Luhn algorithm generator
 */

export const pad = (n) => String(n).padStart(2, "0");

export const rnd = (n) => Math.floor(Math.random() * n);

/**
 * Generate a Luhn-valid 16-digit credit card number with a given prefix
 * @param {string} prefix - The starting digit (e.g. "4" for Visa, "5" for Mastercard)
 * @returns {string} Formatted card number: "XXXX XXXX XXXX XXXX"
 */
export function generateCardNumber(prefix) {
  const d = prefix.split("").map(Number);
  while (d.length < 15) {
    d.push(rnd(10));
  }
  let sum = 0;
  let dbl = true;
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

export const CARD_NAMES = [
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
  "Riya Desai"
];

/**
 * Generate random uppercase cardholder name
 */
export function getRandomCardHolder() {
  return CARD_NAMES[rnd(CARD_NAMES.length)].toUpperCase();
}

/**
 * Generate random expiration date in MM/YY format
 */
export function getRandomExpiry() {
  return `${pad(1 + rnd(12))}/${28 + rnd(6)}`;
}

/**
 * Generate full card data
 */
export function createCardData(prefix) {
  const number = generateCardNumber(prefix);
  return {
    number,
    displayNumber: number,
    name: getRandomCardHolder(),
    exp: getRandomExpiry()
  };
}

/**
 * Computes single frame of character scramble animation
 * @param {string} finalText - Target text to reveal
 * @param {number} frame - Current frame index (1 to totalFrames)
 * @param {number} totalFrames - Total frames in animation
 */
export function getScrambleText(finalText, frame, totalFrames = 22) {
  if (frame >= totalFrames) return finalText;
  const len = finalText.length;
  const lock = Math.floor((frame / totalFrames) * len);
  let out = "";
  for (let i = 0; i < len; i++) {
    const ch = finalText[i];
    out += (i < lock || ch === " " || ch === "/") ? ch : rnd(10);
  }
  return out;
}
