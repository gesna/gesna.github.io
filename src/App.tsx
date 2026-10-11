import { useState } from 'react'
import Contact from './sections/Contact'
import Hero from './sections/Hero'
import Projects from './sections/Projects'

export default function App() {
  // Projects and Contact stay hidden until their Hero button is pressed,
  // unless someone arrives via a direct link like /#projects or /#contact.
  const [showProjects, setShowProjects] = useState(() => window.location.hash === '#projects')
  const [showContact, setShowContact] = useState(() => window.location.hash === '#contact')

  return (
    <main>
      <Hero onSeeWork={() => setShowProjects(true)} onGetInTouch={() => setShowContact(true)} />
      {showProjects && <Projects />}
      {showContact && <Contact />}
    </main>
  )
}
