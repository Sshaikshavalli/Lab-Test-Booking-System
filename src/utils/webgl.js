/** Feature detection used by every 3D scene so we can fall back gracefully. */
let cached;
export function supportsWebGL() {
  if (cached !== undefined) return cached;
  try {
    const c = document.createElement('canvas');
    cached = !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch {
    cached = false;
  }
  return cached;
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
