import DomeGallery from './DomeGallery.jsx'
import { galleryFeatured } from '../data.js'
import { img } from '../lib/imagekit.js'

// Resolve gallery paths to (optimized) URLs for the 3D dome.
const domeImages = galleryFeatured.map((g) => ({
  src: img(g.path, { w: 600, q: 72 }),
  alt: g.alt,
}))

export default function GallerySection() {
  return (
    <section id="gallery" className="relative z-10 bg-ink">
      <div className="px-5 pt-24 text-center sm:px-8 sm:pt-32">
        <div className="reveal mx-auto max-w-shell">
          <p className="eyebrow">The Portfolio</p>
          <h2 className="mt-4 font-serif text-4xl sm:text-6xl">A Gallery in the Round</h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-taupe">
            Drag to spin the dome. Tap any set to see it up close — every one
            created in-studio at NURAKI.
          </p>
        </div>
      </div>

      {/* The 3D dome needs a fixed-height stage */}
      <div className="mt-10 h-[75vh] min-h-[520px] w-full">
        <DomeGallery
          images={domeImages}
          grayscale={false}
          overlayBlurColor="#0a0908"
          imageBorderRadius="18px"
          openedImageBorderRadius="18px"
          openedImageWidth="300px"
          openedImageHeight="400px"
          fit={0.5}
          minRadius={420}
          dragSensitivity={18}
        />
      </div>
    </section>
  )
}
