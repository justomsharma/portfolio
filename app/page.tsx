import Nav from './components/Nav'
import ThemeToggle from './components/ThemeToggle'
import MotionLayer from './components/MotionLayer'
import Hero from './components/Hero'
import Bio from './components/Bio'
import Experience from './components/Experience'
import Stack from './components/Stack'
import Projects from './components/Projects'
import Writing from './components/Writing'
import Footer from './components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      {/* Always-visible theme toggle. Lives in its own fixed layer (not inside
          the sliding nav) so it stays put over the hero AND lands flush at the
          nav's right edge once the nav slides in — it never moves or remounts.
          Mirrors the nav's container (max-width / padding / py-4) for exact
          alignment. */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[60]">
        <div className="mx-auto flex max-w-[1400px] justify-end px-6 py-4 md:px-12">
          <ThemeToggle className="pointer-events-auto" />
        </div>
      </div>
      <MotionLayer />
      <main>
        <Hero />
        <Bio />
        <Experience />
        <Stack />
        <Projects />
        <Writing />
        <Footer />
      </main>
    </>
  )
}
