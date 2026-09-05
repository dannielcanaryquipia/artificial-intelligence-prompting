export interface LearningResource {
  title: string;
  description: string;
  link: string;
  free?: boolean;
}

export interface BuildStack {
  name: string;
  description: string;
  link: string;
}

export const learningResources: LearningResource[] = [
  {
    title: "Anthropic Skilljar",
    description:
      "Anthropic's free learning portal — the AI Fluency framework, prompt engineering, and courses on MCPs, AI agents, and AI skills.",
    link: "https://anthropic.skilljar.com",
    free: true,
  },
  {
    title: "Cisco Networking Academy — Apply AI",
    description:
      "Cisco's free 'Apply AI — Prompt Like an Engineer' course. Learn to prompt like an engineer with hands-on lessons in AI problem-solving.",
    link: "https://www.netacad.com/courses/apply-ai-prompt-like-engineer",
    free: true,
  },
  {
    title: "W3Schools",
    description:
      "Free, hands-on tutorials for the fundamentals — HTML, CSS, JavaScript, SQL, and more. Learn the baseline before relying on AI.",
    link: "https://www.w3schools.com/",
    free: true,
  },
];

export const buildStack: BuildStack[] = [
  {
    name: "React",
    description:
      "The UI framework powering every page. Functional components, hooks, and the react-router v7 setup live in src/.",
    link: "https://react.dev",
  },
  {
    name: "Vite",
    description:
      "The dev server and build tool — TypeScript + Vite 8 with instant HMR. Run it with `npm run dev`.",
    link: "https://vite.dev",
  },
  {
    name: "Tailwind CSS",
    description:
      "Utility-first styling on top of design tokens (amber accent, stone text) defined in src/index.css.",
    link: "https://tailwindcss.com",
  },
  {
    name: "shadcn/ui",
    description:
      "The component system this site is built on — accessible, copy-paste primitives (Card, Button, Badge, Tabs, Dialog, Accordion).",
    link: "https://ui.shadcn.com",
  },
  {
    name: "Radix UI",
    description:
      "The accessible, unstyled primitives that shadcn/ui wraps — used directly here too (Slot, Tabs).",
    link: "https://www.radix-ui.com",
  },
  {
    name: "Motion",
    description:
      "The animation library behind every deliberate motion moment — splash title, page headers, scroll reveals, the framework timeline, and the activity chips.",
    link: "https://motion.dev",
  },
  {
    name: "React Router",
    description:
      "Client-side routing — a persistent layout wraps all six routes in a shared nav + footer (react-router-dom v7).",
    link: "https://reactrouter.com",
  },
  {
    name: "Phosphor Icons",
    description:
      "The icon set for section icons, social links, framework step icons, and footer icons.",
    link: "https://phosphoricons.com",
  },
  {
    name: "Graphify",
    description:
      "The AST-parsed knowledge graph of this repo (graphify-out/) used for cheap, scoped codebase lookup during development.",
    link: "https://github.com/dannielcanaryquipia/artificial-intelligence-prompting",
  },
  {
    name: "OpenCode CLI",
    description:
      "The terminal AI coding agent that wrote this site, directed by a 5-agent dev team defined in .opencode/.",
    link: "https://opencode.ai/docs",
  },
];