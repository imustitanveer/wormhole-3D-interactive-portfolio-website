export type ExperienceRole = {
  title: string;
  date: string;
  current?: boolean;
  bullets: string[];
  tags: string[];
};

export type ExperienceEntry = {
  id: string;
  company: string;
  location: string;
  logo: string;
  featured?: boolean;
  roles: ExperienceRole[];
};

export const experienceEntries: ExperienceEntry[] = [
  {
    id: "dam",
    company: "DAM Pvt. Ltd.",
    location: "Karachi, Pakistan",
    logo: "/dam.png",
    featured: true,
    roles: [
      {
        title: "Forward-Deployed AI Engineer",
        date: "JUL 2026 – PRESENT",
        current: true,
        bullets: [
          "Partner with clients and internal stakeholders to translate complex requirements into production-ready AI and software solutions.",
          "Lead technical discovery, solution architecture, rapid prototyping, and deployment across AI, backend, and full-stack projects.",
          "Embed directly into customer workflows to identify bottlenecks and deliver tailored systems with measurable business impact.",
          "Bridge customers, product, and engineering while guiding implementation decisions and post-deployment iteration.",
        ],
        tags: [
          "Technical Discovery",
          "Solution Architecture",
          "Stakeholder Management",
          "Rapid Prototyping",
          "Python",
          "TypeScript",
          "FastAPI",
          "Node.js",
          "Next.js",
          "RAG",
          "AWS",
          "Docker",
        ],
      },
      {
        title: "Fullstack AI Developer",
        date: "APR 2025 – JUN 2026",
        bullets: [
          "Built full-stack applications using React, Next.js, FastAPI, Node.js, Python, and scalable cloud backends.",
          "Developed and deployed fine-tuned models, RAG systems, retrieval pipelines, and conversational agents.",
          "Delivered systems spanning frontend interfaces, backend APIs, databases, automation, and production deployment.",
          "Solved client problems across healthcare, legal technology, enterprise SaaS, digital media, and workflow automation.",
        ],
        tags: [
          "Python",
          "TensorFlow",
          "PyTorch",
          "MLX",
          "Unsloth",
          "React",
          "Next.js",
          "JavaScript",
          "TypeScript",
          "Tailwind CSS",
          "MongoDB",
          "AWS",
          "cPanel",
        ],
      },
    ],
  },
  {
    id: "odindesk",
    company: "OdinDesk",
    location: "Remote",
    logo: "/OdinDesk.png",
    roles: [
      {
        title: "Tech Lead",
        date: "JUN 2025 – FEB 2026",
        bullets: [
          "Led development of an AI platform for context-aware chatbots and voice agents.",
          "Architected full-stack systems for internal employee assistants and customer-facing conversational AI.",
          "Built inbound and outbound voice agents with real-time speech recognition and dialogue handling.",
          "Integrated LLMs with memory and context pipelines for tailored multi-turn business conversations.",
        ],
        tags: [
          "Python",
          "LangChain",
          "ChromaDB",
          "MLX",
          "Bark",
          "Next.js",
          "TypeScript",
          "Tailwind CSS",
          "MongoDB",
          "AWS",
        ],
      },
    ],
  },
  {
    id: "neuroaudic",
    company: "NeuroAudic",
    location: "Karachi, Pakistan",
    logo: "/neuroaudic.png",
    roles: [
      {
        title: "Founder & CEO",
        date: "JAN 2024 – DEC 2025",
        bullets: [
          "Built an AI-powered hearing aid using deep learning and real-time audio enhancement.",
          "Led product development and secured multiple innovation awards and startup competition placements.",
          "Deployed DTLN models trained on more than 500 hours of noisy audio for noise suppression.",
          "Led business strategy, pitching, marketing, research, and technical development.",
        ],
        tags: [
          "Python",
          "TensorFlow",
          "Raspberry Pi",
          "Deep Neural Networks",
          "Edge AI",
          "Embedded Systems",
          "ONNX",
        ],
      },
    ],
  },
  {
    id: "freelance",
    company: "Self-Employed",
    location: "Karachi, Pakistan",
    logo: "/logo.png",
    roles: [
      {
        title: "Freelance AI Developer",
        date: "NOV 2022 – APR 2025",
        bullets: [
          "Developed custom AI solutions across image processing, NLP, predictive analytics, and automation.",
          "Built full-stack web applications with React, Node.js, databases, and AWS.",
          "Integrated TensorFlow and PyTorch models into production applications.",
          "Automated workflows and optimized cloud deployments for clients.",
        ],
        tags: [
          "Python",
          "TensorFlow",
          "PyTorch",
          "Scikit-learn",
          "Pandas",
          "JavaScript",
          "Tailwind CSS",
          "SQL",
          "MongoDB",
          "AWS",
        ],
      },
    ],
  },
  {
    id: "iu-core",
    company: "IU CORE",
    location: "Karachi, Pakistan",
    logo: "/iucore.jpg",
    roles: [
      {
        title: "Incubatee",
        date: "JAN 2024 – JUL 2024",
        bullets: [
          "Refined NeuroAudic’s business strategy, product direction, and go-to-market plan through startup incubation.",
          "Worked with mentors on AI product commercialization.",
          "Conducted market research and user testing for the hearing-aid product.",
          "Connected with investors, founders, and industry leaders around funding and partnerships.",
        ],
        tags: [
          "Startup Incubation",
          "Pitching & Fundraising",
          "Market Research",
          "Business Development",
          "Lean Startup",
        ],
      },
    ],
  },
  {
    id: "appedology",
    company: "Appedology Pvt. Ltd.",
    location: "Karachi, Pakistan",
    logo: "/appedology.jpeg",
    roles: [
      {
        title: "Negotiations Officer",
        date: "FEB 2022 – SEP 2022",
        bullets: [
          "Negotiated settlements for unpaid medical liens in workers’ compensation cases.",
          "Secured reimbursements for medical providers while maintaining regulatory compliance.",
          "Reviewed records, policy limits, and case details to support settlement discussions.",
          "Maintained accurate negotiation and agreement records.",
        ],
        tags: ["Client Communication", "Negotiation", "Risk Management", "Documentation"],
      },
    ],
  },
];
