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
        <a href="#top" className="font-wordmark text-2xl tracking-wide text-white">Vincent Sarkis</a>
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
