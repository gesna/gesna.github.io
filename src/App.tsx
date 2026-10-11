import ScrollProgress from './components/ScrollProgress'
import Contact from './sections/Contact'
import Hero from './sections/Hero'
import Projects from './sections/Projects'

export default function App() {
  return (
    <>
      <ScrollProgress />
      <main>
        <Hero />
        <Projects />
        <Contact />
      </main>
    </>
  )
}
