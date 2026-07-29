export type ProjectCategory = "personal" | "forclients";
export type ProjectLinkType = "external" | "github" | "youtube";

export type Project = {
  id: string;
  image: string;
  imageFit: "contain" | "cover";
  title: string;
  category: ProjectCategory;
  description: string;
  tags: string[];
  links: Array<{
    label: string;
    href: string;
    type: ProjectLinkType;
  }>;
};

export const projects: Project[] = [
  {
    id: "contractwalla",
    image: "/cw.png",
    imageFit: "contain",
    title: "ContractWalla: GPT for Lawyers",
    category: "forclients",
    description:
      "AI-powered legal assistant for contract review, drafting, and GPT-based legal recommendations.",
    tags: ["Python", "PyTorch", "React", "Tailwind CSS", "AWS", "SageMaker", "DeepSeek R1"],
    links: [
      { label: "Live Demo", href: "https://app.contractwalla.com/", type: "external" },
    ],
  },
  {
    id: "hall-of-football",
    image: "/hof.png",
    imageFit: "contain",
    title: "Hall of Football",
    category: "forclients",
    description:
      "Football scouting platform with player profiles, rankings, draft projections, and dynamic scouting boards.",
    tags: ["Python", "Flask", "TypeScript", "Next.js", "Tailwind CSS", "AWS", "EC2"],
    links: [{ label: "Live Demo", href: "https://halloffootball.com/", type: "external" }],
  },
  {
    id: "bell-system",
    image: "/bellsystem.png",
    imageFit: "contain",
    title: "Bell System",
    category: "forclients",
    description:
      "Enterprise sales and operations platform with role-based workflows, deal management, ticketing, and real-time notifications.",
    tags: [
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Prisma",
      "MongoDB",
      "Socket.IO",
      "RBAC",
      "Jest",
    ],
    links: [],
  },
  {
    id: "global-marriage-bureau",
    image: "/gmb.png",
    imageFit: "contain",
    title: "Global Marriage Bureau",
    category: "forclients",
    description:
      "Custom matrimonial platform with responsive layouts, branded flows, WordPress customization, and production deployment.",
    tags: ["WordPress", "Elementor", "CSS", "DNS", "SSL", "Web Design"],
    links: [{ label: "Live Demo", href: "https://gmb-online.com", type: "external" }],
  },
  {
    id: "codex-seo",
    image: "/codex.png",
    imageFit: "contain",
    title: "Codex SEO",
    category: "personal",
    description:
      "Codex-native SEO skill pack and SaaS platform for technical SEO, content quality, schema, GEO, and competitor analysis.",
    tags: [
      "OpenAI Codex",
      "Agentic AI",
      "Node.js",
      "Express",
      "Next.js",
      "TypeScript",
      "SEO",
      "MCP",
      "Playwright",
    ],
    links: [
      {
        label: "View Code",
        href: "https://github.com/imustitanveer/codex-seo",
        type: "github",
      },
    ],
  },
  {
    id: "tijori",
    image: "/tijori-icon.png",
    imageFit: "contain",
    title: "Tijori",
    category: "forclients",
    description:
      "AI-powered personal finance assistant for automatic expense categorization, budgeting, and financial recommendations.",
    tags: ["Python", "MLX", "Node.js", "React Native", "AWS", "SageMaker", "EC2"],
    links: [],
  },
  {
    id: "corsodigo",
    image: "/coursodigo.png",
    imageFit: "contain",
    title: "Corsódigo",
    category: "forclients",
    description:
      "Semantic course recommendation engine using surveys, FAISS, sentence transformers, and FastAPI.",
    tags: ["Python", "FAISS", "FastAPI", "TypeScript", "Next.js", "Tailwind CSS"],
    links: [
      {
        label: "View Code",
        href: "https://github.com/imustitanveer/Coursodigo-Course-Recommendation-App",
        type: "github",
      },
      {
        label: "Live Demo",
        href: "https://main.d18hp0k4mibbbl.amplifyapp.com/",
        type: "external",
      },
    ],
  },
  {
    id: "tradebotx",
    image: "/cryptobot.png",
    imageFit: "contain",
    title: "TradeBotX",
    category: "personal",
    description:
      "Machine-learning crypto trading bot with live predictions, trade state, profit/loss tracking, and a FastAPI backend.",
    tags: ["Python", "Scikit-learn", "TypeScript", "React", "FastAPI", "Docker", "AWS"],
    links: [
      {
        label: "View Code",
        href: "https://github.com/imustitanveer/crypto-trading-bot",
        type: "github",
      },
      { label: "YouTube", href: "https://www.youtube.com/@100percentdank", type: "youtube" },
    ],
  },
  {
    id: "medilingo",
    image: "/medilingo.png",
    imageFit: "contain",
    title: "MediLingo",
    category: "forclients",
    description:
      "Mobile-friendly healthcare translator with real-time multilingual speech-to-text and text-to-speech.",
    tags: ["HTML", "CSS", "JavaScript"],
    links: [
      {
        label: "View Code",
        href: "https://github.com/imustitanveer/medilingo-healthcare-translator",
        type: "github",
      },
      { label: "Live Demo", href: "https://medilingo-gray.vercel.app/", type: "external" },
    ],
  },
  {
    id: "mnist-adversarial",
    image: "/mnist.png",
    imageFit: "contain",
    title: "Adversarial Robustness on MNIST",
    category: "personal",
    description:
      "FGSM and PGD adversarial attacks with evaluation of defensive training strategies.",
    tags: ["Python", "TensorFlow", "Adversarial ML"],
    links: [
      {
        label: "View Code",
        href: "https://github.com/imustitanveer/Adverserial-Examples_for_Neural-Networks_on_MNIST",
        type: "github",
      },
    ],
  },
  {
    id: "bert-nlp",
    image: "/bert.png",
    imageFit: "contain",
    title: "BERT for NLP",
    category: "personal",
    description:
      "BERT fine-tuning for text classification and named entity recognition using Hugging Face and CoNLL-2003.",
    tags: ["Python", "BERT", "Hugging Face", "NLP", "PyTorch"],
    links: [
      { label: "View Code", href: "https://github.com/imustitanveer/BERT-NLP", type: "github" },
    ],
  },
];
