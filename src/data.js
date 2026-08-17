// ─────────────────────────────────────────────────────────────
//  NURAKI Beauty Lounge — single source of content.
//  Edit prices, hours, links and copy here. Prices flagged
//  `TODO: confirm` are placeholders based on the Fresha listing's
//  service categories — swap in the real AED numbers before launch.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'NURAKI',
  full: 'NURAKI Beauty Lounge',
  tagline: 'A moment of escape',
  intro:
    'A quiet luxury nail atelier in the heart of Abu Dhabi — where bespoke artistry, spotless care and a calm, golden-lit space come together.',
  phone: '+971 52 760 5358',
  phoneRaw: '+971527605358',
  whatsapp: 'https://wa.me/971527605358',
  instagram: 'https://www.instagram.com/nuraki.ae/',
  instagramHandle: '@nuraki.ae',
  address: {
    line1: 'Shams Boutik, Level 1',
    line2: 'Al Reem Island — The Gate District, Abu Dhabi, UAE',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=NURAKI+Beauty+Lounge+Shams+Boutik+Al+Reem+Island+Abu+Dhabi',
  },
  hours: {
    label: 'Open daily · 10:00 AM – 8:00 PM',
    open: 10, // 24h
    close: 20,
  },
}

// ── Services menu (grouped). `duration` in minutes powers the booking slots. ──
export const services = [
  {
    category: 'Manicures',
    blurb: 'Immaculate shaping, cuticle care and a flawless finish.',
    items: [
      { name: 'Classic Manicure', price: 70, duration: 45 }, // TODO: confirm
      { name: 'Gel / Shellac Manicure', price: 120, duration: 60 }, // TODO: confirm
      { name: 'French Manicure', price: 130, duration: 60 }, // TODO: confirm
      { name: 'BIAB Overlay', price: 160, duration: 75 }, // TODO: confirm
      { name: 'Russian Manicure', price: 150, duration: 75 }, // TODO: confirm
    ],
  },
  {
    category: 'Pedicures',
    blurb: 'Restorative foot rituals that leave you weightless.',
    items: [
      { name: 'Classic Pedicure', price: 90, duration: 45 }, // TODO: confirm
      { name: 'Gel Pedicure', price: 140, duration: 60 }, // TODO: confirm
      { name: 'Luxury Spa Pedicure', price: 180, duration: 75 }, // TODO: confirm
    ],
  },
  {
    category: 'Extensions & Enhancements',
    blurb: 'Sculpted length and strength, tailored to your hands.',
    items: [
      { name: 'Gel Extensions — Full Set', price: 200, duration: 90 }, // TODO: confirm
      { name: 'Acrylic — Full Set', price: 220, duration: 105 }, // TODO: confirm
      { name: 'Overlay', price: 160, duration: 75 }, // TODO: confirm
      { name: 'Infills', price: 130, duration: 60 }, // TODO: confirm
    ],
  },
  {
    category: 'Nail Art & Designs',
    blurb: 'From delicate chrome to hand-painted, bespoke statement sets.',
    items: [
      { name: 'Simple Art (per nail)', price: 15, duration: 15 }, // TODO: confirm
      { name: 'Chrome / Cat-Eye', price: 40, duration: 30 }, // TODO: confirm
      { name: 'Hand-Painted / 3D Art', price: 60, from: true, duration: 45 }, // TODO: confirm
      { name: 'French Tip Designs', price: 40, duration: 30 }, // TODO: confirm
    ],
  },
  {
    category: 'Add-ons & Care',
    blurb: 'The finishing touches and the everyday essentials.',
    items: [
      { name: 'Soak-off / Removal', price: 40, duration: 20 }, // TODO: confirm
      { name: 'Nail Repair (per nail)', price: 20, duration: 15 }, // TODO: confirm
      { name: 'Paraffin Hand Treatment', price: 60, duration: 30 }, // TODO: confirm
      { name: 'Mani + Pedi Combo', price: 190, from: true, duration: 105 }, // TODO: confirm
    ],
  },
]

// Flat list for the booking dropdown (built from `services`).
export const bookingServices = services.flatMap((cat) =>
  cat.items.map((it) => ({
    id: `${cat.category}::${it.name}`,
    label: it.name,
    category: cat.category,
    price: it.price,
    duration: it.duration,
    from: Boolean(it.from),
  }))
)

// ── The experience / "why NURAKI" pillars ──
export const pillars = [
  {
    title: 'Bespoke Artistry',
    text: 'Every set is designed for you — chrome, aura, 3D florals or clean minimal. No two hands leave the same.',
  },
  {
    title: 'Spotless & Sterile',
    text: 'Hospital-grade sterilisation and single-use files. Beauty should never come at the cost of care.',
  },
  {
    title: 'A Calm Escape',
    text: 'Warm light, soft music, unhurried hands. Ninety minutes that feel like a small holiday.',
  },
  {
    title: 'Premium Products',
    text: 'Long-wear gels and pigments chosen to stay glossy for weeks, not days.',
  },
]

// ── Gallery — the full set of nail-art photographs. ──
const galleryFiles = [
  'IMG_1429', 'IMG_1430', 'IMG_1431', 'IMG_1432', 'IMG_1433', 'IMG_1434',
  'IMG_1435', 'IMG_1437', 'IMG_1438', 'IMG_1439', 'IMG_1440', 'IMG_1441',
  'IMG_1442', 'IMG_1443', 'IMG_1444', 'IMG_1445', 'IMG_1446', 'IMG_1447',
  'IMG_1448', 'IMG_1449', 'IMG_1450', 'IMG_1451', 'IMG_1452', 'IMG_1453',
  'IMG_1454', 'IMG_1455', 'IMG_1457', 'IMG_1458', 'IMG_1385', 'IMG_1386',
  'IMG_1387', 'IMG_1388', 'IMG_1389', 'IMG_1390', 'IMG_1391', 'IMG_1392',
  'IMG_1393', 'IMG_1394', 'IMG_1395', 'IMG_1396', 'IMG_1397', 'IMG_1398',
  'IMG_1399', 'IMG_1400', 'IMG_1401', 'IMG_1402', 'IMG_1403', 'IMG_1404',
  'IMG_1405', 'IMG_1406', 'IMG_1407', 'IMG_1408', 'IMG_1409', 'IMG_1410',
  'IMG_1411', 'IMG_1412', 'IMG_1413', 'IMG_1414', 'IMG_1375', 'IMG_1376',
  'IMG_1377', 'IMG_1378', 'IMG_1379', 'IMG_1380', 'IMG_1382', 'IMG_1383',
  'IMG_1384',
]

export const gallery = galleryFiles.map((f) => ({
  path: `gallery/${f}.jpg`,
  alt: 'Bespoke nail artistry by NURAKI Beauty Lounge',
}))

// A tighter, hand-picked subset for the 3D dome (strongest sets first).
export const galleryFeatured = [
  'IMG_1429', 'IMG_1440', 'IMG_1455', 'IMG_1385', 'IMG_1400', 'IMG_1433',
  'IMG_1445', 'IMG_1408', 'IMG_1450', 'IMG_1391', 'IMG_1437', 'IMG_1458',
  'IMG_1402', 'IMG_1447', 'IMG_1412', 'IMG_1431', 'IMG_1443', 'IMG_1396',
].map((f) => ({ path: `gallery/${f}.jpg`, alt: 'NURAKI nail art' }))

export const videos = {
  hero: 'video/hero-liquid-gold.mp4', // Higgsfield-generated liquid gold & burgundy
  lounge1: 'video/lounge-1.mp4',
  lounge2: 'video/lounge-2.mp4',
}

export const nav = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'experience', label: 'Experience' },
  { id: 'visit', label: 'Visit' },
  { id: 'book', label: 'Book' },
]
