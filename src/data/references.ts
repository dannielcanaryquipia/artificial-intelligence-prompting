export interface LearningResource {
  title: string;
  description: string;
  link: string;
  free?: boolean;
}

export interface UIBibrary {
  name: string;
  description: string;
  link: string;
}

export const learningResources: LearningResource[] = [
  {
    title: "Google Prompting Essentials",
    description:
      "A free, 5-step framework course on Coursera. No experience needed — perfect starting point for beginners.",
    link: "https://www.coursera.org/learn/prompt-essentials",
    free: true,
  },
  {
    title: "Anthropic's Prompt Engineering Documentation",
    description:
      "More technical, best if you're writing prompts for coding and development tasks. Covers advanced techniques like chain-of-thought and system prompts.",
    link: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering",
  },
  {
    title: "Google AI Essentials",
    description:
      "A broader introduction to generative AI concepts for total beginners. Covers what AI can and can't do.",
    link: "https://www.coursera.org/learn/google-ai-essentials",
  },
];

export const uiLibraries: UIBibrary[] = [
  {
    name: "shadcn/ui",
    description:
      "The base component system — 50+ accessible, unstyled-by-default primitives. The foundation most other libraries build on.",
    link: "https://ui.shadcn.com",
  },
  {
    name: "Magic UI",
    description:
      "150+ animated React + Tailwind + Framer Motion components. MIT licensed, fully free.",
    link: "https://magicui.design",
  },
  {
    name: "Aceternity UI",
    description:
      "~260+ motion-rich components (aurora backgrounds, bento grids, 3D cards, scroll reveals) published as a shadcn-compatible registry.",
    link: "https://ui.aceternity.com",
  },
  {
    name: "VengeanceUI",
    description:
      "MIT-licensed, copy-paste animated component library focused on landing pages.",
    link: "https://ui-vengeance.com",
  },
  {
    name: "Origin UI",
    description:
      "Free, Tailwind + React components with a plainer, less 'flashy' aesthetic. Great for form-like elements.",
    link: "https://originui.com",
  },
  {
    name: "21st.dev",
    description:
      "A searchable marketplace indexing components from shadcn/ui, Aceternity, Magic UI, and independent design engineers.",
    link: "https://21st.dev",
  },
];
