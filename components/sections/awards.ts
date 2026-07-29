import type { TagTone } from "./tagStyles";

export type Award = {
  image: string;
  alt: string;
  title: string;
  subtitle: string;
  organization: string;
  location: string;
  date: string;
  tags: string[];
  tone: TagTone;
};

export const awards: Award[] = [
  {
    image: "/getinnov.jpeg",
    alt: "Get Innovative 4 Impact",
    title: "1st Position — Get Innovative 4 Impact",
    subtitle: "Industry 4.0 and IoT Projects Competition",
    organization: "NED University",
    location: "Karachi, Pakistan",
    date: "APR 2024",
    tags: ["Python", "TensorFlow", "Deep Neural Networks", "Google Coral Dev Board", "ONNX"],
    tone: "emerald",
  },
  {
    image: "/zindigi.png",
    alt: "Zindigi Prize",
    title: "1st Position — Zindigi Prize Startup Competition",
    subtitle: "Campus Round",
    organization: "Iqra University",
    location: "Karachi, Pakistan",
    date: "MAY 2024",
    tags: ["Pitching & Fundraising", "Business Development", "Lean Startup"],
    tone: "sky",
  },
  {
    image: "/ieeep.png",
    alt: "IEEEP STEP 24",
    title: "2nd Position — IEEEP STEP’24",
    subtitle: "Smart Tech Exhibition Projects",
    organization: "Expo Center",
    location: "Karachi, Pakistan",
    date: "SEP 2024",
    tags: ["Python", "TensorFlow", "Raspberry Pi 5", "Hailo NPU", "Embedded Systems"],
    tone: "emerald",
  },
];
