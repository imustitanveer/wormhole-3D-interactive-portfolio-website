export const navigationItems = [
  { id: "home", label: "Home", href: "#home" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "research", label: "Research", href: "#research" },
  { id: "awards", label: "Awards", href: "#awards" },
  { id: "education", label: "Education", href: "#education" },
  { id: "projects", label: "Projects", href: "#projects" },
] as const;

export type NavigationId = (typeof navigationItems)[number]["id"];
