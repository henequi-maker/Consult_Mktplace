import { useState } from "react";
import { FAQS } from "../data";
import { Reveal } from "../motion";
import { IconPlus } from "./icons";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative border-t border-ink/10 bg-fog">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <p className="mb-5 flex items-center gap-3 font-mono text-[11px] font-medium tracking-[0.22em] text-ink/55">
                  <span className="inline-block h-2 w-2 bg-pine" />
                  PERGUNTAS FREQUENTES
                </p>
                <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
                  O que CROs e CFOs perguntam <span className="text-pine">antes de fechar</span>.
                </h2>
                <p className="mt-6 max-w-md text-[16px] leading-relaxed text-ink/65">
                  As seis objeções que ouvimos em toda reunião de comitê — respondidas sem
                  juridiquês.
                </p>
                <a
                  href="mailto:contato@creditquant.com.br"
                  className="link-slide mt-7 inline-block font-mono text-[13px] font-medium text-pine"
                >
                  contato@creditquant.com.br
                </a>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={f.q} delay={i * 70}>
                  <div
                    className={`mb-3 border bg-paper transition-all duration-300 ${
                      isOpen ? "border-pine/45 shadow-[0_16px_40px_-20px_rgba(15,122,77,0.35)]" : "border-ink/12 hover:border-ink/30"
                    }`}
                  >
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
                    >
                      <span className="font-display text-[15.5px] font-semibold tracking-tight">
                        {f.q}
                      </span>
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center border transition-all duration-300 ${
                          isOpen
                            ? "rotate-45 border-pine bg-pine text-paper"
                            : "border-ink/20 text-ink/60"
                        }`}
                      >
                        <IconPlus className="h-4 w-4" />
                      </span>
                    </button>
                    <div className={`acc-panel ${isOpen ? "open" : ""}`}>
                      <div>
                        <p className="px-6 pb-6 text-[14px] leading-relaxed text-ink/65">{f.a}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
