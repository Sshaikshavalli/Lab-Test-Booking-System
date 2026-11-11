/**
 * Shared localStorage wrapper (owner: Yashodhar).
 * Minimal version so the catalogue/cart can persist the selection.
 * Always safe against missing, malformed or blocked storage.
 */
const PREFIX = 'ltbs:';

export const STORAGE_KEYS = {
  cart: 'cart', // string[] of selected test ids
  bookings: 'bookings',
};

export function readJSON(key, fallback) {
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw == null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeJSON(key, value) {
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function removeKey(key) {
  try {
    window.localStorage.removeItem(PREFIX + key);
  } catch {
    /* ignore */
  }
}
