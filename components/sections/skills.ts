export type Capability = {
  number: string;
  title: string;
  description: string;
  skills: string[];
  accent: "pink" | "violet" | "blue";
  tone: "green" | "blue" | "purple" | "amber";
  layout: string;
};

export const capabilities: Capability[] = [
  {
    number: "01",
    title: "AI Systems",
    description: "RAG, fine-tuning, agents, evaluation, and applied generative AI.",
    skills: [
      "Retrieval-Augmented Generation",
      "LLM Fine-Tuning",
      "AI Agents",
      "Embeddings & Semantic Search",
      "Model Evaluation",
      "Speech & Audio AI",
    ],
    accent: "pink",
    tone: "green",
    layout: "md:col-span-7",
  },
  {
    number: "02",
    title: "Backend & Infrastructure",
    description: "Reliable APIs, data systems, real-time services, and cloud delivery.",
    skills: [
      "FastAPI",
      "Node.js",
      "PostgreSQL",
      "MongoDB",
      "Docker",
      "AWS",
      "WebSockets",
      "REST APIs",
    ],
    accent: "blue",
    tone: "blue",
    layout: "md:col-span-5",
  },
  {
    number: "03",
    title: "Product Engineering",
    description: "Full-stack products connecting intelligent systems to clear user experiences.",
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Three.js",
      "API Integration",
      "Responsive UI",
      "CMS Platforms",
    ],
    accent: "violet",
    tone: "purple",
    layout: "md:col-span-5",
  },
  {
    number: "04",
    title: "Forward-Deployed Delivery",
    description: "Discovery, prototyping, integration, deployment, and customer-facing technical delivery.",
    skills: [
      "Technical Discovery",
      "Rapid Prototyping",
      "Customer Integration",
      "Solution Architecture",
      "Production Deployment",
      "Stakeholder Communication",
    ],
    accent: "pink",
    tone: "amber",
    layout: "md:col-span-7",
  },
];
