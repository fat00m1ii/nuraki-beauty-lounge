// ImageKit URL helper.
//
// When VITE_IMAGEKIT_URL_ENDPOINT is set (e.g. https://ik.imagekit.io/nuraki),
// images are served from ImageKit's CDN with on-the-fly optimization
// (auto format -> WebP/AVIF, quality, resize). Otherwise we gracefully fall
// back to the optimized local copies in /public/gallery so the site works in
// dev before ImageKit credentials are wired up.

const ENDPOINT = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT?.replace(/\/$/, '')

/**
 * Build an image URL.
 * @param {string} path   filename or path, e.g. "gallery/IMG_1429.jpg"
 * @param {object} [opts] { w, h, q, focus, blur, raw }
 */
export function img(path, opts = {}) {
  const clean = String(path).replace(/^\//, '')

  if (!ENDPOINT) {
    // Local fallback — ignores transforms, just serves the file from /public.
    return `/${clean}`
  }

  const tr = []
  if (opts.w) tr.push(`w-${opts.w}`)
  if (opts.h) tr.push(`h-${opts.h}`)
  tr.push(`q-${opts.q ?? 78}`)
  tr.push('f-auto')
  if (opts.focus) tr.push(`fo-${opts.focus}`)
  if (opts.blur) tr.push(`bl-${opts.blur}`)
  if (opts.raw) tr.push(opts.raw)

  return `${ENDPOINT}/${clean}?tr=${tr.join(',')}`
}

/** Tiny blurred placeholder (LQIP) for smooth image loads. */
export function lqip(path) {
  return img(path, { w: 24, q: 20, blur: 8 })
}

export const imagekitReady = Boolean(ENDPOINT)
