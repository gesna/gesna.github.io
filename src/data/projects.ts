export type Project = {
  title: string
  description: string
  tags: string[]
  links?: { label: string; href: string }[]
  // A short handwritten comment on a sticky note next to the photo. Optional.
  note?: string
  // The photo taped to the card. Without one, the polaroid shows a solid color instead.
  // To add one: put the file in src/assets/projects/, import it at the top of this file
  // (import weatherShot from '../assets/projects/weather.png'), then use { src: weatherShot, alt: '...' }.
  image?: { src: string; alt: string }
}

// TODO: replace these placeholders with your real projects.
export const projects: Project[] = [
  {
    title: 'Project One',
    description: 'A sentence or two about what this project does, who it is for, and what you learned building it.',
    tags: ['React', 'TypeScript'],
    note: 'built this in a weekend :)',
    links: [
      { label: 'Live demo', href: 'https://example.com' },
      { label: 'Source', href: 'https://github.com/gesna' },
    ],
  },
  {
    title: 'Project Two',
    description: 'Describe the problem it solves and the most interesting technical challenge you tackled.',
    tags: ['Python', 'Data'],
    note: 'my favorite bug hunt!',
    links: [{ label: 'Source', href: 'https://github.com/gesna' }],
  },
  {
    title: 'Project Three',
    description: 'A short summary of the project and the impact it had.',
    tags: ['Design', 'Figma'],
  },
]
