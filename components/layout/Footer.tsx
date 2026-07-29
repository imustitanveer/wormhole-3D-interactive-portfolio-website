import Image from "next/image";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, YoutubeIcon } from "@/components/ui/SocialIcons";
import { navigationItems } from "./navigation";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/mustitanveer",
    icon: GithubIcon,
    iconClassName: "size-[1.1rem]",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mustassum-tanvir/",
    icon: LinkedinIcon,
    iconClassName: "size-[1.1rem]",
    external: true,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@100percentdank",
    icon: YoutubeIcon,
    iconClassName: "size-5",
    external: true,
  },
  {
    label: "Email",
    href: "mailto:mustassum.tanveer@gmail.com",
    icon: Mail,
    iconClassName: "size-4",
    external: false,
  },
];

export function Footer() {
  return (
    <footer className="pointer-events-auto relative z-10 mt-8 border-t border-white/10 bg-gradient-to-b from-black/10 to-black/30 px-6 py-10 text-white md:mt-9 md:px-10">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-9 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_auto] md:items-start">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="aiByMusti logo"
              width={512}
              height={512}
              className="h-11 w-auto shrink-0 object-contain"
            />
            <p className="text-xl font-semibold tracking-[-0.025em]">aiByMusti</p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-5 gap-y-3">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-white/55 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-wrap gap-2.5" aria-label="Social links">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.external ? "_blank" : undefined}
                  rel={social.external ? "noreferrer" : undefined}
                  aria-label={social.label}
                  className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-violet-300"
                >
                  <Icon aria-hidden="true" className={social.iconClassName} />
                </a>
              );
            })}
          </div>
        </div>

        <p className="mt-9 border-t border-white/[0.07] pt-6 text-xs leading-5 text-white/38">
          © 2026 aiByMusti. Built with Next.js, Three.js, and questionable amounts of caffeine.
        </p>
      </div>
    </footer>
  );
}
