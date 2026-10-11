import { useEffect, useRef } from 'react'

// For sections that only appear when revealed: as soon as the section mounts,
// scroll it into view and move keyboard focus to it for screen reader and keyboard users.
// Attach the returned ref to the section, and give the section tabIndex={-1} so it can take focus.
export function useRevealOnMount<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    ref.current?.focus({ preventScroll: true })
    ref.current?.scrollIntoView()
  }, [])

  return ref
}
