export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const navItems = [
    { label: 'THE PIECES', id: 'collection' },
    { label: 'THE BENCH', id: 'process' },
    { label: 'WORN', id: 'lookbook' },
    { label: 'THE MAKER', id: 'maker' },
  ]

  return (
    <footer className="w-full bg-charcoal text-bone border-t-2 border-blood-red py-16 md:py-20 px-6 md:px-10">
      {/* Top Row */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 md:gap-10 mb-12 md:mb-[60px]">
        {/* Left - Brand */}
        <div>
          <h2 className="font-display text-[clamp(36px,6vw,72px)] text-bone leading-[0.9]">
            CURB
          </h2>
          <p className="font-mono text-[11px] text-bone tracking-[0.12em] mt-2" style={{ opacity: 0.5 }}>
            RECLAIMED LEATHER GOODS — LONDON SE
          </p>
        </div>

        {/* Right - Nav + Shop */}
        <div className="flex flex-row md:flex-col gap-3 md:gap-2.5 md:text-right flex-wrap">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="font-body text-[14px] md:text-[15px] text-bone hover:text-blood-red transition-colors duration-200"
            >
              {item.label}
            </button>
          ))}
          <a
            href="https://www.franalcazar.com/curb-store"
            className="font-body text-[14px] md:text-[15px] text-blood-red hover:text-bone transition-colors duration-200"
          >
            SHOP PIECES ↗
          </a>
        </div>
      </div>

      {/* CTA Bar */}
      <div className="relative mb-12 md:mb-[60px]">
        <div className="w-full h-[2px] bg-blood-red" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-4">
          <button
            onClick={() => scrollTo('maker')}
            className="bg-blood-red text-charcoal px-6 md:px-8 py-3 md:py-4 font-display text-[13px] md:text-[14px] uppercase tracking-[0.08em] hover:bg-bone hover:text-blood-red transition-all duration-300 whitespace-nowrap"
          >
            GET IN TOUCH
          </button>
          <button
            onClick={() => scrollTo('maker')}
            className="bg-transparent border-2 border-bone text-bone px-6 md:px-8 py-3 md:py-4 font-display text-[13px] md:text-[14px] uppercase tracking-[0.08em] hover:bg-bone hover:text-charcoal transition-all duration-300 whitespace-nowrap"
          >
            BOOK A FITTING
          </button>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 text-center md:text-left">
        <span className="font-mono text-[11px] text-bone" style={{ opacity: 0.5 }}>
          © 2025 CURB STUDIO
        </span>

        <div className="flex justify-center gap-6">
          {['INSTAGRAM', 'PINTEREST'].map((social) => (
            <a
              key={social}
              href="#"
              className="font-mono text-[11px] text-bone hover:opacity-100 transition-opacity duration-200"
              style={{ opacity: 0.5 }}
            >
              {social}
            </a>
          ))}
        </div>

        <span className="font-mono text-[11px] text-bone" style={{ opacity: 0.5 }}>
          MADE IN LONDON SE
        </span>
      </div>
    </footer>
  )
}
