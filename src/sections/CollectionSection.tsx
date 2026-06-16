import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const products = [
  {
    id: 1,
    name: 'Snaffle Bit Chest Piece',
    price: '€420',
    stripeLink: 'https://buy.stripe.com/00w4gz7ZR548fDY1xH2cg00',
    dimensions: '40cm × 35cm / Adjustable',
    tag: 'Cross-strap bridle leather with polished snaffle bit',
    category: 'HARNESSES',
    image: 'assets/piece-01-snaffle.jpg',
    sold: false,
    material: 'Retired English bridle leather, stainless steel snaffle bit, hand-set rivets',
    weight: '340g',
    hardwareAge: 'Estimated 8–12 years prior working life',
  },
  {
    id: 2,
    name: 'Ring Body Harness',
    price: '€480',
    stripeLink: 'https://buy.stripe.com/4gMaEXgwngMQ63odgp2cg01',
    dimensions: 'Full torso / Adjustable',
    tag: 'Multi-ring construction with curb chain and bridle leather',
    category: 'HARNESSES',
    image: 'assets/piece-02-ring.jpg',
    sold: false,
    material: 'Chrome-plated bridle rings, reclaimed bridle leather, welded steel chain',
    weight: '580g',
    hardwareAge: 'Estimated 10–15 years prior working life',
  },
  {
    id: 4,
    name: 'Ring Chain Harness',
    price: '€290',
    stripeLink: 'https://buy.stripe.com/6oU5kDa7ZgMQfDYekt2cg02',
    dimensions: '42cm × 38cm / Adjustable',
    tag: 'Dual-ring construction with draped chain and bridle straps',
    category: 'HARNESSES',
    image: 'assets/piece-04-chain.jpg',
    sold: false,
    material: 'Reclaimed bridle rings, hand-woven chain, waxed bridle leather',
    weight: '450g',
    hardwareAge: 'Estimated 8–14 years prior working life',
  },
  {
    id: 5,
    name: 'Pelham Bit Harness',
    price: '€400',
    stripeLink: 'https://buy.stripe.com/28EaEXa7ZfIM2Rcdgp2cg03',
    dimensions: '40cm × 35cm / Adjustable',
    tag: 'Horizontal bridle strap with Pelham bit and draped chain',
    category: 'HARNESSES',
    image: 'assets/piece-05-pelham.jpg',
    sold: false,
    material: 'Retired bridle leather, Pelham bit with curb chain, hand-stitched',
    weight: '390g',
    hardwareAge: 'Estimated 7–11 years prior working life',
  },
  {
    id: 6,
    name: 'Snaffle Bit Chest Piece — Studio',
    price: '€390',
    stripeLink: 'https://buy.stripe.com/6oUeVdcg7cwA2Rc4JT2cg04',
    dimensions: '40cm × 35cm / Adjustable',
    tag: 'Editorial: Snaffle bit with latex opera gloves, studio I',
    category: 'HARNESSES',
    image: 'assets/piece-worn-01.jpg',
    sold: false,
    material: 'Retired English bridle leather, stainless steel snaffle bit, hand-set rivets',
    weight: '340g',
    hardwareAge: 'Estimated 8–12 years prior working life',
  },
  {
    id: 7,
    name: 'Pelham Bit Harness — Studio',
    price: '€420',
    stripeLink: 'https://buy.stripe.com/28EdR95RJ8gk63o0tD2cg05',
    dimensions: '42cm × 38cm / Adjustable',
    tag: 'Editorial: Pelham bit with bunny mask, sheer mesh, studio II',
    category: 'HARNESSES',
    image: 'assets/piece-worn-02.jpg',
    sold: false,
    material: 'Retired bridle leather, Pelham bit with curb chain, hand-stitched',
    weight: '390g',
    hardwareAge: 'Estimated 7–11 years prior working life',
  },
  {
    id: 8,
    name: 'Snaffle Bit Chest Piece — Studio',
    price: '€425',
    stripeLink: 'https://buy.stripe.com/cNi14na7ZeEI9fA0tD2cg06',
    dimensions: '40cm × 35cm / Adjustable',
    tag: 'Editorial: Snaffle bit with PVC trousers, studio III',
    category: 'HARNESSES',
    image: 'assets/piece-worn-03.jpg',
    sold: false,
    material: 'Retired English bridle leather, stainless steel snaffle bit, hand-set rivets',
    weight: '340g',
    hardwareAge: 'Estimated 8–12 years prior working life',
  },
]

const filters = ['ALL', 'HARNESSES', 'COLLARS', 'ACCESSORIES']

export default function CollectionSection() {
  const [activeFilter, setActiveFilter] = useState('ALL')
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const filtered = activeFilter === 'ALL'
    ? products
    : products.filter((p) => p.category === activeFilter)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 40, opacity: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
      gsap.from(tabsRef.current?.children || [], {
        opacity: 0, y: 20, duration: 0.5, stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }, delay: 0.3,
      })
      gsap.from('.product-card', {
        y: 60, opacity: 0, duration: 0.8, ease: 'power2.out', stagger: 0.12,
        scrollTrigger: { trigger: gridRef.current, start: 'top 85%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="collection" ref={sectionRef}
      className="w-full border-t-2 border-charcoal py-[100px] md:py-[120px] px-6 md:px-10"
      style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.08\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat' }}>

      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-[50px] md:mb-[60px] gap-6">
        <h2 ref={titleRef} className="font-display text-[clamp(36px,6vw,80px)] text-charcoal leading-[0.9]">
          THE <span className="text-charcoal">PIECES</span>
        </h2>
        <div ref={tabsRef} className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 md:px-4 md:py-2 border-2 font-mono text-[10px] md:text-[11px] uppercase transition-all duration-200 ${activeFilter === f ? 'bg-charcoal text-bone border-charcoal' : 'bg-transparent text-charcoal border-charcoal hover:bg-charcoal hover:text-bone'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-10 p-4 md:p-5 border-2 border-charcoal bg-bone">
        <p className="font-body text-[13px] md:text-[14px] text-charcoal leading-[1.6]">
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-charcoal mr-2">IN-PERSON FITTINGS — LONDON SE</span>
          Every piece is 1 of 1. Sold pieces can be commissioned again with similar materials — no two will ever be identical.
          <a href="#maker" className="underline underline-offset-2 hover:text-blood-red transition-colors ml-1">Book a fitting →</a>
        </p>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-[2px]">
        {filtered.map((product) => (
          <div key={product.id} className="product-card group">
            <div className="relative aspect-[3/4] overflow-hidden border-2 border-charcoal">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105" />
              <div className="absolute inset-0 bg-blood-red opacity-0 group-hover:opacity-10 transition-opacity duration-400" />
              {product.sold && (
                <div className="absolute top-3 left-3 bg-charcoal/80 backdrop-blur-sm px-2 py-1">
                  <span className="font-mono text-[10px] text-bone uppercase tracking-[0.1em]">SOLD</span>
                </div>
              )}
            </div>

            <div className="p-4 md:p-5 bg-bone border-t-2 border-charcoal">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-accent italic text-[18px] md:text-[20px] text-charcoal transition-transform duration-300 group-hover:translate-x-1">{product.name}</h3>
                <p className="font-mono text-[13px] md:text-[14px] text-charcoal mt-0.5 shrink-0">{product.price}</p>
              </div>
              <p className="font-mono text-[10px] md:text-[11px] text-steel mt-1.5 uppercase tracking-[0.05em]">{product.dimensions}</p>
              <p className="font-body text-[13px] text-steel mt-1">{product.tag}</p>

              {product.stripeLink && !product.sold && (
                <a href={product.stripeLink} target="_blank" rel="noopener noreferrer"
                  className="mt-3 inline-block bg-blood-red text-charcoal px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.08em] border-2 border-charcoal hover:bg-charcoal hover:text-bone transition-all duration-200">
                  BUY NOW →
                </a>
              )}

              <button onClick={() => setExpandedId(expandedId === product.id ? null : product.id)}
                className="mt-3 font-mono text-[10px] uppercase tracking-[0.1em] text-charcoal border-b border-charcoal/30 hover:border-blood-red hover:text-blood-red transition-all duration-200">
                {expandedId === product.id ? 'HIDE MATERIAL PASSPORT ↑' : 'VIEW MATERIAL PASSPORT ↓'}
              </button>

              {expandedId === product.id && (
                <div className="mt-3 pt-3 border-t border-charcoal/20 space-y-1.5">
                  <div className="flex justify-between gap-3"><span className="font-mono text-[10px] uppercase tracking-[0.08em] text-steel">Material</span><span className="font-body text-[12px] text-charcoal text-right">{product.material}</span></div>
                  <div className="flex justify-between gap-3"><span className="font-mono text-[10px] uppercase tracking-[0.08em] text-steel">Weight</span><span className="font-body text-[12px] text-charcoal">{product.weight}</span></div>
                  <div className="flex justify-between gap-3"><span className="font-mono text-[10px] uppercase tracking-[0.08em] text-steel">Hardware Age</span><span className="font-body text-[12px] text-charcoal">{product.hardwareAge}</span></div>
                  <div className="flex justify-between gap-3"><span className="font-mono text-[10px] uppercase tracking-[0.08em] text-steel">Edition</span><span className="font-body text-[12px] text-charcoal">1 of 1 — Never reproduced</span></div>
                </div>
              )}

              {product.sold && (
                <div className="mt-4 pt-4 border-t border-charcoal/20">
                  <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-steel mb-2">This piece has left the bench. But the materials can be sourced again.</p>
                  <a href={`mailto:hello@curb-atelier.com?subject=Commission Request: ${encodeURIComponent(product.name)}`}
                    className="inline-block bg-blood-red text-charcoal px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.08em] border-2 border-blood-red hover:bg-bone hover:text-charcoal hover:border-charcoal transition-all duration-200">
                    COMMISSION SIMILAR →
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
