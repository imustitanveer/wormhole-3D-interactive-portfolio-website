export type EducationEntry = {
  id: string;
  image: string;
  degree: string;
  institute: string;
  location: string;
  duration: string;
  units: string[];
};

export const educationEntries: EducationEntry[] = [
  {
    id: "iqra-university",
    image: "/iqra.png",
    degree: "Bachelor of Science in Computer Science",
    institute: "Iqra University",
    location: "Karachi, Pakistan",
    duration: "JAN 2020 – DEC 2024",
    units: [
      "Digital Logic Design",
      "Programming Fundamentals",
      "Computer Organization and Assembly Language",
      "Operating Systems",
      "Object-Oriented Programming",
      "Data Structures and Algorithms",
      "Database Management Systems",
      "Design and Analysis of Algorithms",
      "Introduction to Python",
      "Theory of Automata",
      "Compiler Construction",
      "Software Engineering",
      "Data Communication and Computer Networks",
      "Parallel and Distributed Computing",
      "Information Security",
      "Artificial Intelligence",
      "Mobile Application Development",
      "Data Warehousing and Data Mining",
      "Routing and Switching",
      "Artificial Neural Networks",
      "Data Science",
    ],
  },
  {
    id: "ncr-cet",
    image: "/ncr.jpg",
    degree: "Intermediate in Computer Science",
    institute: "NCR CET",
    location: "Karachi, Pakistan",
    duration: "AUG 2017 – AUG 2019",
    units: [
      "Introduction to Computer Science",
      "Applied Physics",
      "Calculus and Analytical Geometry",
      "Multivariate Calculus",
      "Introduction to Information and Communication Technology",
    ],
  },

  // {
  //   id: "universitat-trier",
  //   image: "/trier.png",
  //   degree: "Master's degree title",
  //   institute: "Universität Trier",
  //   location: "Trier, Germany",
  //   duration: "OCT 2026 – PRESENT",
  //   units: [],
  // },
];
