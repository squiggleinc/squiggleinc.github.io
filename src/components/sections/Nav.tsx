import Image from "next/image";

export default function Nav() {
  const links = [
    ["About", "#about"],
    ["Work", "#projects"],
    ["Journey", "#journey"],
    ["Contact", "#contact"],
  ];
  return (
    <nav className="fixed top-0 z-40 w-full backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" aria-label="Home" className="inline-flex items-center">
          <Image
            src="/squiggle-icon.png"
            alt="Squiggle"
            width={36}
            height={44}
            priority
            className="h-9 w-auto"
          />
        </a>
        <div className="hidden gap-6 md:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="text-sm text-[#c0c0c0] transition hover:text-white">
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
