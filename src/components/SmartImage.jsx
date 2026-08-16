import { useState } from 'react'
import { img, lqip } from '../lib/imagekit.js'

// Lazy image with a blurred low-quality placeholder that fades to the sharp
// image once loaded. Serves via ImageKit when configured, else local /public.
export default function SmartImage({
  path,
  alt = '',
  w,
  h,
  q,
  focus,
  className = '',
  imgClassName = '',
  eager = false,
  style,
}) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div
      className={`relative overflow-hidden bg-ink-soft ${className}`}
      style={style}
    >
      <img
        src={lqip(path)}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full object-cover scale-110 blur-xl transition-opacity duration-700 ${
          loaded ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <img
        src={img(path, { w, h, q, focus })}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`relative h-full w-full object-cover transition-opacity duration-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
      />
    </div>
  )
}
