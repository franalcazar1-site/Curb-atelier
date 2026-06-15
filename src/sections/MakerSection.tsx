import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function MakerSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  const [email, setEmail] = useState('')
  const [listStatus, setListStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const [booking, setBooking] = useState({ name: '', email: '', date: '', type: 'fitting', message: '' })
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const handleBookingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!booking.name || !booking.email || !booking.date) return
    setBookingStatus('sending')

    const formData = new FormData()
    formData.append('name', booking.name)
    formData.append('_replyto', booking.email)
    formData.append('email', booking.email)
    formData.append('date', booking.date)
    formData.append('type', booking.type)
    formData.append('message', booking.message || '')
    formData.append('_subject', `CURB Fitting Request — ${booking.name}`)

    fetch('https://formspree.io/f/xkoenvwl', {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}))
        if (res.ok) {
          setBookingStatus('sent')
          setBooking({ name: '', email: '', date: '', type: 'fitting', message: '' })
        } else {
          setBookingStatus('idle')
          console.error('Formspree error:', data)
          alert(data?.error || 'Something went wrong. Please try again or email franalcazar1@gmail.com')
        }
      })
      .catch((err) => {
        setBookingStatus('idle')
        console.error('Form error:', err)
        alert('Something went wrong. Please try again or email franalcazar1@gmail.com')
      })
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.maker-label', {
        y: 15, opacity: 0, duration: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
      gsap.from('.maker-title', {
        y: 30, opacity: 0, duration: 0.8, ease: 'power2.out', delay: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
      gsap.from(textRef.current?.children || [], {
        y: 25, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out', delay: 0.3,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
      gsap.from('.booking-panel', {
        y: 40, opacity: 0, duration: 0.8, ease: 'power2.out', delay: 0.5,
        scrollTrigger: { trigger: '.booking-panel', start: 'top 85%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleListSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) return
    setListStatus('sending')

    // Submit to Mailchimp in background, then redirect to curb-atelier.com
    const formData = new FormData()
    formData.append('EMAIL', email)
    formData.append('u', 'dac39fe24edcb5d001d1f2ef3')
    formData.append('id', '4cb899b6c0')
    formData.append('f_id', '00f3ace6f0')
    formData.append('b_dac39fe24edcb5d001d1f2ef3_4cb899b6c0', '')

    fetch('https://redsliderule.us18.list-manage.com/subscribe/post', {
      method: 'POST',
      body: formData,
      mode: 'no-cors',
    })
      .then(() => {
        // Redirect to curb-atelier.com after subscribing
        window.location.href = 'https://www.curb-atelier.com'
      })
      .catch(() => {
        // Even if fetch fails, still redirect
        window.location.href = 'https://www.curb-atelier.com'
      })
  }



  return (
    <section id="maker" ref={sectionRef} className="relative w-full bg-charcoal text-bone py-[100px] md:py-[140px] px-6 md:px-10 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-cover bg-center opacity-[0.08]" style={{ backgroundImage: 'url(/assets/hero-workbench.jpg)' }} />

      <div className="relative z-[1] max-w-[900px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column — Maker Story */}
          <div>
            <span className="maker-label block font-mono text-[11px] uppercase tracking-[0.12em] text-blood-red mb-3">
              THE MAKER
            </span>
            <h2 className="maker-title font-display text-[clamp(32px,5vw,64px)] text-bone leading-[0.95] mb-10">
              One bench.<br />One pair of hands.<br />London SE.
            </h2>

            <div ref={textRef} className="space-y-5 md:space-y-6">
              <p className="font-accent italic text-[17px] md:text-[19px] text-bone leading-[1.45]">
                "I don't buy materials. I rescue them. Every bridle that reaches my bench has already had a working life — I just give it a second one."
              </p>

              <p className="font-body text-[14px] md:text-[15px] text-bone leading-[1.65]" style={{ opacity: 0.75 }}>
                CURB is a one-person atelier in South-East London. Each piece is cut, stitched, and finished by hand using end-of-life English bridle leather and upcycled horse bit hardware. The materials dictate the form — no two pieces can ever be identical.
              </p>

              <p className="font-body text-[14px] md:text-[15px] text-bone leading-[1.65]" style={{ opacity: 0.75 }}>
                These harnesses are built for movement. Tested by performers, worn in clubs, trusted on stage. If you need something that holds under aerial work, drag performance, or a night in Dalston — it has to hold here first.
              </p>

              <div className="pt-4 border-t border-bone/20">
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-blood-red mb-2">
                  WHY NEON YELLOW
                </p>
                <p className="font-body text-[13px] md:text-[14px] text-bone leading-[1.6]" style={{ opacity: 0.6 }}>
                  The colour of safety gear, construction sites, visibility. We reclaim it. In a world that tries to make queer bodies invisible, we choose the loudest possible signal.
                </p>
              </div>

              <div className="pt-6 border-t border-bone/20">
                <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-bone mb-3" style={{ opacity: 0.5 }}>
                  Commissions open irregularly. New pieces drop when they leave the bench.
                </p>
                <a
                  href="#booking-form"
                  className="inline-block bg-blood-red text-charcoal px-8 py-3 font-mono text-[11px] uppercase tracking-[0.1em] hover:bg-bone hover:text-charcoal transition-all duration-300"
                >
                  BOOK A FITTING / COMMISSION →
                </a>
              </div>

              <div className="pt-6 border-t border-bone/20">
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-blood-red mb-4">
                  JOIN THE LIST — NO SPAM. NO SALES. JUST WHEN SOMETHING LEAVES THE BENCH.
                </p>
                <form
                  onSubmit={handleListSubmit}
                  className="flex gap-2"
                >
                  {/* Mailchimp honeypot — hidden from real users */}
                  <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
                    <input type="text" name="b_dac39fe24edcb5d001d1f2ef3_4cb899b6c0" tabIndex={-1} value="" readOnly />
                  </div>
                  <input
                    type="email"
                    name="EMAIL"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 bg-transparent border-2 border-bone/30 px-4 py-2.5 font-mono text-[12px] text-bone placeholder:text-bone/30 focus:border-blood-red focus:outline-none transition-colors"
                    required
                  />
                  <button
                    type="submit"
                    name="subscribe"
                    disabled={listStatus === 'sending' || listStatus === 'sent'}
                    className="bg-bone text-charcoal px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.1em] hover:bg-blood-red hover:text-charcoal transition-all duration-300 disabled:opacity-50"
                  >
                    {listStatus === 'idle' && 'JOIN'}
                    {listStatus === 'sending' && '...'}
                    {listStatus === 'sent' && 'SENT'}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Right Column — Book a Fitting */}
          <div className="booking-panel" id="booking-form">
            <div className="bg-bone/5 border-2 border-bone/20 p-6 md:p-8">
              <span className="block font-mono text-[11px] uppercase tracking-[0.12em] text-blood-red mb-3">
                BOOK A FITTING
              </span>
              <h3 className="font-display text-[24px] md:text-[28px] text-bone leading-[1.1] mb-2">
                Try it on.
              </h3>
              <p className="font-body text-[13px] md:text-[14px] text-bone leading-[1.6] mb-6" style={{ opacity: 0.7 }}>
                In-person fittings at the atelier in London SE. See the pieces, feel the leather, find what fits your body. Available for harnesses, collars, and custom commissions.
              </p>

              {bookingStatus === 'sent' ? (
                <div className="py-8 text-center">
                  <p className="font-display text-[20px] text-bone mb-2">REQUEST SENT.</p>
                  <p className="font-body text-[14px] text-bone mb-3" style={{ opacity: 0.7 }}>
                    We'll be in touch within 48 hours to confirm your slot.
                  </p>
                  <p className="font-mono text-[11px] text-bone" style={{ opacity: 0.5 }}>
                    Or email directly: hello@curb-atelier.com
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-[0.1em] text-bone mb-1.5" style={{ opacity: 0.5 }}>Name</label>
                    <input type="text" name="name" value={booking.name} onChange={(e) => setBooking({ ...booking, name: e.target.value })} className="w-full bg-transparent border-2 border-bone/30 px-4 py-2.5 font-body text-[14px] text-bone placeholder:text-bone/30 focus:border-blood-red focus:outline-none transition-colors" placeholder="Your name" required />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-[0.1em] text-bone mb-1.5" style={{ opacity: 0.5 }}>Email</label>
                    <input type="email" name="email" value={booking.email} onChange={(e) => setBooking({ ...booking, email: e.target.value })} className="w-full bg-transparent border-2 border-bone/30 px-4 py-2.5 font-body text-[14px] text-bone placeholder:text-bone/30 focus:border-blood-red focus:outline-none transition-colors" placeholder="your@email.com" required />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-[0.1em] text-bone mb-1.5" style={{ opacity: 0.5 }}>Preferred Date</label>
                      <input type="date" name="date" value={booking.date} onChange={(e) => setBooking({ ...booking, date: e.target.value })} className="w-full bg-transparent border-2 border-bone/30 px-4 py-2.5 font-mono text-[12px] text-bone focus:border-blood-red focus:outline-none transition-colors" required />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-[0.1em] text-bone mb-1.5" style={{ opacity: 0.5 }}>Type</label>
                      <select name="type" value={booking.type} onChange={(e) => setBooking({ ...booking, type: e.target.value })} className="w-full bg-transparent border-2 border-bone/30 px-4 py-2.5 font-mono text-[12px] text-bone focus:border-blood-red focus:outline-none transition-colors appearance-none">
                        <option value="fitting" className="bg-charcoal">Fitting</option>
                        <option value="commission" className="bg-charcoal">Commission Consult</option>
                        <option value="both" className="bg-charcoal">Both</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-[0.1em] text-bone mb-1.5" style={{ opacity: 0.5 }}>What are you looking for? (optional)</label>
                    <textarea name="message" value={booking.message} onChange={(e) => setBooking({ ...booking, message: e.target.value })} className="w-full bg-transparent border-2 border-bone/30 px-4 py-2.5 font-body text-[14px] text-bone placeholder:text-bone/30 focus:border-blood-red focus:outline-none transition-colors resize-none" rows={3} placeholder="Specific piece, size, or questions..." />
                  </div>
                  <button type="submit" disabled={bookingStatus === 'sending'} className="w-full bg-blood-red text-charcoal py-3 font-mono text-[12px] uppercase tracking-[0.1em] hover:bg-bone hover:text-charcoal transition-all duration-300 disabled:opacity-50">
                    {bookingStatus === 'sending' ? 'SENDING...' : 'REQUEST FITTING →'}
                  </button>
                  <p className="font-mono text-[9px] text-bone text-center" style={{ opacity: 0.4 }}>
                    We'll email back within 48 hours to confirm your slot.
                  </p>
                </form>
              )}
            </div>

            <div className="mt-6 border-2 border-blood-red/30 p-6">
              <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-blood-red mb-2">
                ALSO AVAILABLE
              </span>
              <p className="font-body text-[14px] text-bone mb-3" style={{ opacity: 0.8 }}>
                Clothing, ready-to-wear, and accessories from the Fran Alcazar collection.
              </p>
              <a href="https://www.franalcazar.com/curb-store" className="inline-block bg-transparent border-2 border-blood-red text-blood-red px-6 py-2.5 font-mono text-[11px] uppercase tracking-[0.1em] hover:bg-blood-red hover:text-charcoal transition-all duration-300">
                SHOP PIECES ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
