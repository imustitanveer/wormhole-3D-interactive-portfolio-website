export type ResearchLink = {
  label: string;
  href: string;
  type: "external" | "pdf";
};

export type ResearchPublication = {
  image: string;
  alt: string;
  title: string;
  publication: string;
  authors: string;
  date: string;
  description: string[];
  links: ResearchLink[];
  tags: string[];
};

export const researchPublications: ResearchPublication[] = [
  {
    image: "/paper1.png",
    alt: "Human-AI Collaboration in Software Development paper",
    title: "Human-AI Collaboration in Software Development: Impacts and Future Trends",
    publication: "Research Consortium Archive",
    authors: "Mustassum Tanvir, Amna Sheikh",
    date: "2026",
    description: [
      "Examines how human–AI collaboration is changing software development through higher productivity, fewer errors, and greater low-code adoption.",
      "Discusses risks including over-reliance, security concerns, and the need for responsible AI integration.",
    ],
    links: [
      {
        label: "View Paper",
        href: "https://www.rcresearcharchive.com/index.php/Journal/article/view/674",
        type: "external",
      },
      {
        label: "PDF",
        href: "https://www.rcresearcharchive.com/index.php/Journal/article/view/674/660",
        type: "pdf",
      },
    ],
    tags: [
      "AI",
      "Human-AI Collaboration",
      "Software Development",
      "Productivity",
      "Code Quality",
      "AI Ethics",
      "Low-Code Platforms",
    ],
  },
];
