import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function TransitionSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Yellow bar expands from center on charcoal bg
      gsap.fromTo(
        barRef.current,
        { clipPath: 'inset(0 50% 0 50%)' },
        {
          clipPath: 'inset(0 0% 0 0%)',
          duration: 1.5,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=150%',
            pin: true,
            scrub: 1,
          },
        }
      )

      // Text appears character by character
      const text = 'SEE THE COLLECTION WORN'
      if (textRef.current) {
        textRef.current.innerHTML = ''
        text.split('').forEach((char) => {
          const span = document.createElement('span')
          span.textContent = char === ' ' ? '\u00A0' : char
          span.style.display = 'inline-block'
          span.style.opacity = '0'
          span.style.transform = 'translateY(40px)'
          textRef.current!.appendChild(span)
        })

        gsap.to(textRef.current.children, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.05,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=150%',
            scrub: 1,
          },
          delay: 0.8,
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-charcoal flex items-center justify-center"
    >
      {/* Neon yellow expanding bar */}
      <div
        ref={barRef}
        className="absolute inset-0 bg-blood-red"
        style={{ clipPath: 'inset(0 50% 0 50%)' }}
      />

      {/* Text overlay — charcoal on yellow for contrast */}
      <h2
        ref={textRef}
        className="relative z-10 font-display text-[clamp(28px,4.5vw,56px)] text-charcoal text-center px-6 max-w-[90vw] leading-[1.1]"
      >
        SEE THE COLLECTION WORN
      </h2>
    </section>
  )
}
