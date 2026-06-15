import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

export default function HeroSection() {
  const tagRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.4 })
    tl.from(tagRef.current, { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' })
      .from(headlineRef.current, { y: 35, opacity: 0, duration: 0.9, ease: 'power2.out' }, '-=0.3')
      .from(bodyRef.current, { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
      .from(ctaRef.current, { y: 15, opacity: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
  }, [])

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden bg-warm-black">
      {/* Full-bleed background photo — harness centered */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: 'url(assets/hero-model.jpg)',
          backgroundPosition: '65% 25%',
        }}
      />

      {/* Gradient overlay — text readable, photo visible */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(to top, rgba(13,13,13,0.75) 0%, rgba(13,13,13,0.3) 45%, rgba(13,13,13,0.1) 100%)',
        }}
      />

      {/* Bottom content — text at VERY BOTTOM, harness fully visible above */}
      <div className="absolute bottom-0 left-0 right-0 z-[2] px-6 md:px-10 pb-6 md:pb-20 pt-32 md:pt-0" style={{ background: 'linear-gradient(to top, rgba(13,13,13,0.9) 0%, rgba(13,13,13,0.7) 60%, transparent 100%)' }}>
        {/* Tag line — desktop only */}
        <div ref={tagRef} className="hidden md:block mb-3 md:mb-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-bone" style={{ opacity: 0.7 }}>
            RECLAIMED LEATHER — UPCYCLED HARDWARE — MADE ONCE
          </span>
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="font-display text-[28px] md:text-[clamp(36px,6vw,64px)] text-bone leading-[1.0] md:leading-[0.95] tracking-[-0.02em] mb-2 md:mb-6"
          style={{
            textShadow: '0 0 30px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.8)',
          }}
        >
          From saddle to<br className="md:hidden" /> <span className="text-blood-red">harness.</span>
        </h1>

        {/* Body text — visible on mobile, compact */}
        <p
          ref={bodyRef}
          className="font-body text-[11px] md:text-[15px] text-bone max-w-[400px] md:max-w-[480px] leading-[1.45] md:leading-[1.6] mb-4 md:mb-7"
          style={{ opacity: 0.75 }}
        >
          Every CURB piece is built from end-of-life bridle leather and upcycled horse bit hardware — material with a past life, recut and stitched into something structural, genderless, and unrepeatable.
        </p>

        {/* CTA */}
        <button
          ref={ctaRef}
          onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-blood-red text-charcoal px-6 py-2.5 md:px-10 md:py-3.5 font-mono text-[9px] md:text-[11px] uppercase tracking-[0.1em] hover:bg-bone hover:text-charcoal transition-all duration-300"
        >
          VIEW THE PIECES →
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center">
        <div className="w-[1px] h-[50px] md:h-[60px] bg-bone relative overflow-hidden" style={{ opacity: 0.35 }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[4px] h-[4px] rounded-full bg-bone animate-scroll-pulse" />
        </div>
      </div>
    </section>
  )
}
