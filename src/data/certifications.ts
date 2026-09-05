export interface CertificationIssuer {
  issuer: string;
  certifications: string[];
  icon?: string;
}

export const certifications: CertificationIssuer[] = [
  {
    issuer: "Anthropic AI",
    certifications: [
      "Claude 101",
      "Claude with the Anthropic API",
      "Claude Code in Action",
      "Claude with Amazon Bedrock",
      "Claude with Google Vertex AI",
      "Introduction to Model Context Protocol",
      "Model Context Protocol: Advanced Topics",
      "Introduction to Agent Skills",
      "Introduction to Subagents",
      "Introduction to Claude Cowork",
      "AI Fluency: Framework & Foundations",
      "AI Fluency: AI Capabilities & Limitations",
      "AI Fluency for Students",
      "AI Fluency for Educators",
      "AI Fluency for Nonprofits",
      "Teaching the AI Fluency Framework",
    ],
  },
  {
    issuer: "DataCamp",
    certifications: [
      "Joining Data in SQL",
      "Introduction to Relational Databases in SQL",
      "Intermediate SQL",
      "Database Design",
      "Data Manipulation in SQL",
      "AI Ethics",
    ],
  },
  {
    issuer: "Cisco Networking Academy",
    certifications: [
      "Networking Basics",
      "Introduction to Modern AI",
      "Apply AI: Analyze Customer Reviews",
      "Apply AI: Update Your Resume",
    ],
  },
  {
    issuer: "TESDA",
    certifications: [
      "Computer Systems Servicing",
      "Technical Drafting",
      "Bread & Pastry Production",
    ],
  },
  {
    issuer: "Other",
    certifications: ["code.org: The Hour of Code"],
  },
];
