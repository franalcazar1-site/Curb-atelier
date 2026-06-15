import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navigation from './components/Navigation'
import HeroSection from './sections/HeroSection'
import CollectionSection from './sections/CollectionSection'
import ProcessSection from './sections/ProcessSection'
import TransitionSection from './sections/TransitionSection'
import LookbookSection from './sections/LookbookSection'
import MakerSection from './sections/MakerSection'
import Footer from './sections/Footer'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf as any)
    }
  }, [])

  return (
    <div className="bg-concrete">
      <Navigation />
      <HeroSection />
      <CollectionSection />
      <ProcessSection />
      <TransitionSection />
      <LookbookSection />
      <MakerSection />
      <Footer />
    </div>
  )
}

export default App
