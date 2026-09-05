export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  detail: string;
  tags: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: "ai-orchestration",
    title: "AI-Orchestrated Development Tooling",
    description:
      "A portable 5-agent 'dev team' system (Developer, Design, Game Dev, QA/Review, Ops/Planning subagents), each with defined output contracts, deployable into any project. Includes a curated library of 260+ development skills.",
    detail:
      "This is structured prompting applied at the level of an entire workflow, not a single request. Each agent has a specific role, skill inventory, and output contract — turning AI from a chatbot into a coordinated development team.",
    tags: ["AI Agents", "Workflow Automation", "TypeScript"],
  },
  {
    id: "graphify",
    title: "Graphify — Codebase Knowledge Graph",
    description:
      "A custom tool that parses a codebase into a searchable knowledge graph (nodes, edges, community clusters), so an AI coding agent can understand project structure without re-reading the full codebase.",
    detail:
      "Graphify cuts token usage and improves prompt context quality during development by giving AI agents a structured map of the codebase — reducing noise and focusing attention on relevant files and relationships.",
    tags: ["Knowledge Graphs", "Code Analysis", "Token Optimization"],
  },
  {
    id: "frames-to-svg",
    title: "Frames-to-SVG Extractor",
    description:
      "An automated Node.js pipeline that converts a generative-AI logo animation video into lightweight, infinite-resolution SVG frame sequences — directed an AI coding agent to generate the vectorization script and playback component.",
    detail:
      "A concrete example of using structured prompts to direct an agent through a multi-step technical pipeline. The agent was guided through video frame extraction, SVG conversion, and React component generation — all through carefully structured instructions.",
    tags: ["Node.js", "SVG", "Video Processing", "React"],
  },
  {
    id: "kitchen-one",
    title: "Kitchen One — Capstone Project",
    description:
      "A restaurant management mobile app (React Native, Expo, Supabase) with role-based access and an automatic rider-assignment algorithm — built from Figma wireframes through to a working, user-tested product.",
    detail:
      "Built as a capstone project, Kitchen One demonstrates end-to-end development from design to deployment. The rider-assignment algorithm uses proximity-based matching to optimize delivery routing — all powered by structured development prompts.",
    tags: ["React Native", "Expo", "Supabase", "Mobile"],
  },
];
