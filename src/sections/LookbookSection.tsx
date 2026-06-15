import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const lookbookImages = [
  { src: 'assets/lookbook-new-01.jpg', caption: 'SNAFFLE BIT CHEST PIECE / STUDIO I' },
  { src: 'assets/lookbook-new-02.jpg', caption: 'RING CHAIN HARNESS / STUDIO II' },
  { src: 'assets/lookbook-new-03.jpg', caption: 'RING BODY HARNESS / STUDIO III' },
  { src: 'assets/lookbook-new-04.jpg', caption: 'Y-BACK RING HARNESS / STUDIO IV' },
  { src: 'assets/lookbook-new-05.jpg', caption: 'RING CHAIN HARNESS / STUDIO V' },
  { src: 'assets/lookbook-editorial-06.jpg', caption: 'SNAFFLE BIT CHEST PIECE / STUDIO VI' },
]

const col1 = lookbookImages.slice(0, 3)
const col2 = lookbookImages.slice(3, 6)

export default function LookbookSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const col1Ref = useRef<HTMLDivElement>(null)
  const col2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.lookbook-tag', {
        y: 15,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
      gsap.from('.lookbook-title', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
        delay: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })

      if (col1Ref.current) {
        gsap.to(col1Ref.current, {
          y: '-15vh',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
      if (col2Ref.current) {
        gsap.to(col2Ref.current, {
          y: '10vh',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      gsap.utils.toArray('.lookbook-item').forEach((item) => {
        gsap.from(item as Element, {
          y: 80,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item as Element,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="lookbook"
      ref={sectionRef}
      className="w-full bg-bone pt-[120px] pb-20 px-6 md:px-10"
    >
      {/* Header */}
      <div className="mb-16 md:mb-20">
        <span className="lookbook-tag block font-mono text-[12px] uppercase text-charcoal tracking-[0.12em]">
          LOOKBOOK
        </span>
        <h2 className="lookbook-title font-display text-[clamp(48px,8vw,100px)] text-charcoal mt-2">
          Worn
        </h2>
      </div>

      {/* 2-Column Grid */}
      <div className="hidden md:grid grid-cols-2 gap-[2px]">
        {/* Left Column */}
        <div ref={col1Ref} className="pt-[10vh]">
          {col1.map((img, i) => (
            <div key={i} className="lookbook-item mb-[2px]">
              <div className="aspect-[3/4] border-2 border-charcoal overflow-hidden group">
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <span className="block font-mono text-[12px] text-charcoal mt-3 mb-8">
                {img.caption}
              </span>
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div ref={col2Ref} className="pt-[25vh]">
          {col2.map((img, i) => (
            <div key={i} className="lookbook-item mb-[2px]">
              <div className="aspect-[3/4] border-2 border-charcoal overflow-hidden group">
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <span className="block font-mono text-[12px] text-charcoal mt-3 mb-8">
                {img.caption}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile - single column */}
      <div className="md:hidden grid grid-cols-1 gap-[2px]">
        {lookbookImages.map((img, i) => (
          <div key={i} className="lookbook-item">
            <div className="aspect-[3/4] border-2 border-charcoal overflow-hidden">
              <img src={img.src} alt={img.caption} className="w-full h-full object-cover" />
            </div>
            <span className="block font-mono text-[12px] text-charcoal mt-2 mb-6">
              {img.caption}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
