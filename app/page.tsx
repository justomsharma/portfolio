import Nav from './components/Nav'
import MotionLayer from './components/MotionLayer'
import Hero from './components/Hero'
import Bio from './components/Bio'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Writing from './components/Writing'
import Footer from './components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <MotionLayer />
      <main>
        <Hero />
        <Bio />
        <Experience />
        <Projects />
        <Writing />
        <Footer />
      </main>
    </>
  )
}
