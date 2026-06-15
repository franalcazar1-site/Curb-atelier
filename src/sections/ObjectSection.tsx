import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const objectImages = [
  { src: 'assets/object-snaffle-bit.jpg', caption: '01. SNAFFLE BIT CHEST PIECE' },
  { src: 'assets/object-ring-body-harness.jpg', caption: '02. RING BODY HARNESS' },
  { src: 'assets/object-yback-ring.jpg', caption: '03. Y-BACK RING HARNESS' },
  { src: 'assets/object-ring-chain.jpg', caption: '04. RING CHAIN HARNESS' },
  { src: 'assets/object-pelham-bit.jpg', caption: '05. PELHAM BIT HARNESS' },
]

export default function ObjectSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.object-tag', {
        y: 15,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
      gsap.from('.object-title', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
        delay: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
      gsap.from('.object-image', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.3,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % objectImages.length)
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + objectImages.length) % objectImages.length)

  const current = objectImages[currentIndex]

  return (
    <section
      id="object"
      ref={sectionRef}
      className="w-full bg-warm-black pt-[120px] pb-20 px-6 md:px-10"
    >
      {/* Header */}
      <div className="mb-12 md:mb-16">
        <span className="object-tag block font-mono text-[12px] uppercase text-[#888] tracking-[0.12em]">
          GALLERY
        </span>
        <h2 className="object-title font-display text-[clamp(48px,8vw,100px)] text-[#DFFF4F] mt-2">
          The Object
        </h2>
      </div>

      {/* Main Image Display */}
      <div className="object-image relative">
        <div className="w-full border-2 border-charcoal overflow-hidden bg-charcoal">
          <img
            src={current.src}
            alt={current.caption}
            className="w-full h-auto object-cover transition-opacity duration-500"
            key={currentIndex}
          />
        </div>

        {/* Caption Bar */}
        <div className="flex items-center justify-between mt-4">
          <span className="font-mono text-[14px] md:text-[16px] text-[#DFFF4F] tracking-[0.08em]">
            {current.caption}
          </span>
          <span className="font-mono text-[12px] text-[#666]">
            {currentIndex + 1} / {objectImages.length}
          </span>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={prevImage}
            className="w-12 h-12 border-2 border-[#333] flex items-center justify-center text-[#DFFF4F] hover:bg-[#DFFF4F] hover:text-charcoal transition-all duration-200"
            aria-label="Previous"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={nextImage}
            className="w-12 h-12 border-2 border-[#333] flex items-center justify-center text-[#DFFF4F] hover:bg-[#DFFF4F] hover:text-charcoal transition-all duration-200"
            aria-label="Next"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Thumbnail Dots */}
          <div className="flex items-center gap-2 ml-auto">
            {objectImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 transition-all duration-200 ${
                  i === currentIndex ? 'bg-[#DFFF4F] w-6' : 'bg-[#444] hover:bg-[#666]'
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile swipe hint */}
      <p className="md:hidden font-mono text-[11px] text-[#555] mt-4 text-center">
        Tap arrows to browse the collection
      </p>
    </section>
  )
}
