import { useState, useEffect } from 'react'
import { gsap } from 'gsap'

const navLinks = [
  { label: 'THE PIECES', id: 'collection' },
  { label: 'THE BENCH', id: 'process' },
  { label: 'WORN', id: 'lookbook' },
  { label: 'THE MAKER', id: 'maker' },
]

const externalLinks = [
  { label: 'SHOP PIECES', url: 'https://www.franalcazar.com/curb-store' },
]

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    gsap.from('.nav-inner', {
      opacity: 0,
      y: -20,
      duration: 0.6,
      ease: 'power2.out',
      delay: 0.2,
    })
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setMobileOpen(false)
    }
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-[60px] border-b-2 border-charcoal"
        style={{ backgroundColor: 'rgba(234, 229, 216, 0.9)', backdropFilter: 'blur(20px)' }}>
        <div className="nav-inner h-full flex items-center justify-between px-6 md:px-10">
          {/* Brand */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-1.5 hover:opacity-70 transition-opacity">
            <span className="font-display text-[18px] md:text-[20px] text-charcoal tracking-[0.15em]">CURB</span>
            <span className="w-[6px] h-[6px] bg-blood-red inline-block" />
          </button>

          {/* Center Nav - Desktop */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="relative font-mono text-[11px] lg:text-[12px] uppercase tracking-[0.1em] text-steel hover:text-charcoal transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-blood-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </button>
            ))}
            {externalLinks.map((link) => (
              <a
                key={link.url}
                href={link.url}
                className="font-mono text-[11px] lg:text-[12px] uppercase tracking-[0.1em] text-charcoal bg-blood-red px-4 py-2 hover:bg-bone transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo('maker')}
              className="hidden md:block font-mono text-[11px] uppercase tracking-[0.1em] text-steel hover:text-charcoal transition-colors duration-300"
            >
              CONTACT
            </button>
            <button
              onClick={() => scrollTo('collection')}
              className="w-[32px] h-[32px] md:w-[36px] md:h-[36px] bg-blood-red flex items-center justify-center hover:translate-x-[2px] transition-transform duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="#1A1A1A" strokeWidth="1.5" />
              </svg>
            </button>

            {/* Hamburger - Mobile */}
            <button
              className="md:hidden flex flex-col gap-[5px] w-6 items-end"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <span className={`w-4 h-[2px] bg-blood-red transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[7px] w-5' : ''}`} />
              <span className={`w-4 h-[2px] bg-blood-red transition-all duration-300 ${mobileOpen ? 'opacity-0 w-0' : ''}`} />
              <span className={`w-4 h-[2px] bg-blood-red transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[7px] w-5' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-concrete flex flex-col items-center justify-center gap-6">
          {navLinks.map((link, i) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="font-display text-[clamp(32px,8vw,56px)] text-charcoal hover:text-blood-red transition-colors duration-300"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {link.label}
            </button>
          ))}
          {externalLinks.map((link) => (
            <a
              key={link.url}
              href={link.url}
              className="font-display text-[clamp(28px,6vw,48px)] text-charcoal bg-blood-red px-6 py-2 hover:bg-bone transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => scrollTo('maker')}
            className="font-display text-[clamp(32px,8vw,56px)] text-charcoal hover:text-blood-red transition-colors duration-300"
          >
            CONTACT
          </button>
        </div>
      )}
    </>
  )
}
