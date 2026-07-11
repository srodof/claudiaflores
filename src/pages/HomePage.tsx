import Hero from '../sections/Hero'
import Marquee from '../components/Marquee'
import About from '../sections/About'
import Services from '../sections/Services'
import Quiz from '../sections/Quiz'
import Projects from '../sections/Projects'
import Contact from '../sections/Contact'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Quiz />
      <Projects />
      <Contact />
    </>
  )
}
