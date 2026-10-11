import { useState } from 'react'
import Contact from './sections/Contact'
import Hero from './sections/Hero'

export default function App() {
  // Contact stays hidden until "Get in touch" is pressed,
  // unless someone arrives via a direct link to /#contact.
  const [showContact, setShowContact] = useState(() => window.location.hash === '#contact')

  return (
    <main>
      <Hero onGetInTouch={() => setShowContact(true)} />
      {showContact && <Contact />}
    </main>
  )
}
