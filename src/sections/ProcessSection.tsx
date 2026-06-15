import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const stats = [
  { value: '100%', label: 'RECLAIMED MATERIALS' },
  { value: '1 OF 1', label: 'EVERY PIECE UNIQUE' },
  { value: '0', label: 'MASS PRODUCTION' },
  { value: '6', label: 'COLLECTION PIECES' },
]

const objectImages = [
  { src: 'assets/object-snaffle-bit.jpg', caption: '01. SNAFFLE BIT CHEST PIECE' },
  { src: 'assets/object-ring-body-harness.jpg', caption: '02. RING BODY HARNESS' },
  { src: 'assets/object-yback-ring.jpg', caption: '03. Y-BACK RING HARNESS' },
  { src: 'assets/object-ring-chain.jpg', caption: '04. RING CHAIN HARNESS' },
  { src: 'assets/object-pelham-bit.jpg', caption: '05. PELHAM BIT HARNESS' },
]

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [objIndex, setObjIndex] = useState(0)

  const nextObj = () => setObjIndex((i) => (i + 1) % objectImages.length)
  const prevObj = () => setObjIndex((i) => (i - 1 + objectImages.length) % objectImages.length)
  const currentObj = objectImages[objIndex]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.process-title', {
        y: 40, opacity: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
      gsap.from('.process-line', {
        scaleX: 0, duration: 0.6, ease: 'power2.out', delay: 0.3,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
      gsap.from('.panel-a', { opacity: 0, scale: 0.98, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.panel-a', start: 'top 85%' },
      })
      gsap.from('.panel-a-tag', { x: -20, opacity: 0, duration: 0.4, ease: 'power2.out', delay: 0.4,
        scrollTrigger: { trigger: '.panel-a', start: 'top 85%' },
      })
      gsap.from('.panel-b-quote', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out', delay: 0.2,
        scrollTrigger: { trigger: '.panel-b', start: 'top 85%' },
      })
      gsap.from('.panel-b-body', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out', delay: 0.4,
        scrollTrigger: { trigger: '.panel-b', start: 'top 85%' },
      })
      gsap.from('.panel-c', { opacity: 0, duration: 0.8, ease: 'power2.out', delay: 0.3,
        scrollTrigger: { trigger: '.panel-c', start: 'top 85%' },
      })
      gsap.from('.panel-d', { opacity: 0, duration: 0.8, ease: 'power2.out', delay: 0.2,
        scrollTrigger: { trigger: '.panel-d', start: 'top 85%' },
      })
      gsap.from('.panel-e-heading', { y: 30, opacity: 0, duration: 0.7, ease: 'power2.out', delay: 0.3,
        scrollTrigger: { trigger: '.panel-e', start: 'top 85%' },
      })
      gsap.from('.panel-e-body', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out', delay: 0.5,
        scrollTrigger: { trigger: '.panel-e', start: 'top 85%' },
      })
      gsap.from('.stat-item', { y: 20, opacity: 0, duration: 0.5, ease: 'power2.out', stagger: 0.1,
        scrollTrigger: { trigger: '.panel-f', start: 'top 85%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="process" ref={sectionRef} className="w-full bg-charcoal text-bone py-[100px] md:py-[120px] px-6 md:px-10">
      <div className="text-center mb-14 md:mb-16">
        <h2 className="process-title font-display text-[clamp(36px,6vw,80px)] text-bone">
          SOURCE → FORM
        </h2>
        <div className="process-line w-[120px] h-[2px] bg-blood-red mx-auto mt-6" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[2px]">
        <div className="panel-a lg:col-span-7 lg:row-span-2 relative border-2 border-bone overflow-hidden">
          <img src="/assets/hero-workbench.jpg" alt="Raw materials on the workbench" className="w-full h-full object-cover" />
          <span className="panel-a-tag absolute bottom-4 left-4 font-mono text-[11px] bg-blood-red text-charcoal px-3 py-1.5">
            01. RAW MATERIAL
          </span>
        </div>

        <div className="panel-b lg:col-span-5 bg-bone text-charcoal p-5 md:p-8 flex flex-col justify-center">
          <p className="panel-b-quote font-accent italic text-[clamp(17px,2vw,24px)] leading-[1.35]">
            "I don't buy materials. I rescue them."
          </p>
          <p className="panel-b-body font-body text-[13px] md:text-[14px] leading-[1.65] mt-4">
            Every piece of leather comes from an English bridle that's reached the end of its working life. The patina, the wear marks, the grain — these become the character of the piece.
          </p>
        </div>

        <div className="panel-c lg:col-span-5 relative border-2 border-bone overflow-hidden">
          <img src="assets/process-cut-stitch-real.jpg" alt="Cut and stitch" className="w-full h-full object-cover" />
          <span className="absolute bottom-4 left-4 font-mono text-[11px] bg-blood-red text-charcoal px-3 py-1.5">
            02. CUT & STITCH
          </span>
        </div>

        {/* 03. THE OBJECT — Gallery */}
        <div className="panel-d lg:col-span-5 relative border-2 border-bone bg-warm-black overflow-hidden">
          <div className="relative">
            <img
              src={currentObj.src}
              alt={currentObj.caption}
              className="w-full h-full object-cover transition-opacity duration-500"
              key={objIndex}
            />
            <span className="absolute bottom-4 left-4 font-mono text-[11px] bg-blood-red text-charcoal px-3 py-1.5 z-10">
              03. THE OBJECT
            </span>
          </div>
          {/* Caption + Controls */}
          <div className="p-4 border-t-2 border-bone">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[12px] text-blood-red tracking-[0.06em]">
                {currentObj.caption}
              </span>
              <span className="font-mono text-[11px] text-[#666]">
                {objIndex + 1} / {objectImages.length}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={prevObj} className="w-10 h-10 border-2 border-[#333] flex items-center justify-center text-blood-red hover:bg-blood-red hover:text-charcoal transition-all" aria-label="Previous">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              <button onClick={nextObj} className="w-10 h-10 border-2 border-[#333] flex items-center justify-center text-blood-red hover:bg-blood-red hover:text-charcoal transition-all" aria-label="Next">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
              </button>
              <div className="flex items-center gap-1.5 ml-auto">
                {objectImages.map((_, i) => (
                  <button key={i} onClick={() => setObjIndex(i)} className={`h-1.5 transition-all ${i === objIndex ? 'bg-blood-red w-5' : 'bg-[#444] w-1.5 hover:bg-[#666]'}`} aria-label={`Image ${i + 1}`} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="panel-e lg:col-span-7 bg-blood-red text-charcoal p-5 md:p-8 flex flex-col justify-center">
          <h3 className="panel-e-heading font-display text-[clamp(20px,2.8vw,36px)] leading-[1.1]">
            One piece. One maker. No reproduction.
          </h3>
          <p className="panel-e-body font-body text-[13px] md:text-[14px] leading-[1.65] mt-4" style={{ opacity: 0.7 }}>
            Once a design leaves the bench, it's never made again. The materials dictate the form — no two pieces can ever be identical.
          </p>
        </div>

        <div className="panel-f lg:col-span-12 border-y-2 border-bone py-8 md:py-10 px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-item">
                <p className="font-display text-[36px] md:text-[42px] text-blood-red">{stat.value}</p>
                <p className="font-mono text-[10px] md:text-[11px] text-bone uppercase tracking-[0.12em] mt-1.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
