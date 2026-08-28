import { useEffect, useState } from "react";
import { LogoMark, IconArrow } from "./icons";

const NAV = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#especialistas", label: "Especialistas" },
  { href: "#resultados", label: "Resultados" },
  { href: "#curadoria", label: "Curadoria" },
  { href: "#governanca", label: "Governança" },
  { href: "#custos", label: "Custos" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-paper/92 backdrop-blur-sm transition-shadow duration-300 ${
        scrolled ? "border-ink/12 shadow-[0_8px_30px_rgba(12,22,34,0.07)]" : "border-ink/8"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
        <a href="#topo" className="group flex items-center gap-3">
          <LogoMark className="h-9 w-9 text-ink transition-colors duration-300 group-hover:text-pine" />
          <span className="font-display text-lg font-bold tracking-tight">
            Credit<span className="text-pine">Quant</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="link-slide text-[13.5px] font-medium text-ink/65 transition-colors hover:text-ink"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="#contato"
            className="text-[13.5px] font-medium text-ink/65 transition-colors hover:text-ink"
          >
            Sou especialista
          </a>
          <a
            href="#contato"
            className="group flex items-center gap-2 bg-ink px-4.5 py-2.5 font-display text-[13.5px] font-semibold text-paper transition-all duration-300 hover:bg-pine"
          >
            Postar desafio
            <IconArrow className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Abrir menu"
          aria-expanded={open}
          className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
        >
          <span
            className={`h-[2px] w-5 bg-ink transition-transform duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span className={`h-[2px] w-5 bg-ink transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
          <span
            className={`h-[2px] w-5 bg-ink transition-transform duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      <div
        className={`overflow-hidden border-ink/10 bg-paper transition-all duration-400 lg:hidden ${
          open ? "max-h-105 border-t" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-5 py-4 sm:px-8">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="border-b border-ink/8 py-3 font-display text-base font-semibold last:border-0"
            >
              {n.label}
            </a>
          ))}
          <a
            href="#contato"
            onClick={() => setOpen(false)}
            className="mt-3 flex items-center justify-center gap-2 bg-ink py-3 font-display text-sm font-semibold text-paper"
          >
            Postar desafio <IconArrow className="h-3.5 w-3.5" />
          </a>
        </nav>
      </div>
    </header>
  );
}
