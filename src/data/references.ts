export interface LearningResource {
  title: string;
  description: string;
  link: string;
  free?: boolean;
}

export interface UILibrary {
  name: string;
  description: string;
  link: string;
}

export const learningResources: LearningResource[] = [];

export const uiLibraries: UILibrary[] = [
  {
    name: "shadcn/ui",
    description:
      "The base component system — 50+ accessible, unstyled-by-default primitives. The foundation most other libraries build on.",
    link: "https://ui.shadcn.com",
  },
  {
    name: "Radix UI",
    description:
      "The accessible, unstyled primitives that shadcn/ui components wrap — used directly in this project (Slot, Tabs).",
    link: "https://www.radix-ui.com",
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
