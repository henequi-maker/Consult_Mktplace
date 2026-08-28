import { STEPS, TIMELINE } from "../data";
import { Reveal } from "../motion";
import { IconArrow } from "./icons";

export default function Process() {
  return (
    <section id="como-funciona" className="relative border-t border-ink/10 bg-fog">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-12">
          {/* coluna fixa */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <p className="mb-5 flex items-center gap-3 font-mono text-[11px] font-medium tracking-[0.22em] text-ink/55">
                  <span className="inline-block h-2 w-2 bg-pine" />
                  COMO FUNCIONA
                </p>
                <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
                  Do briefing à produção em{" "}
                  <span className="text-pine">quatro atos</span>.
                </h2>
                <p className="mt-6 max-w-md text-[16px] leading-relaxed text-ink/65">
                  Nada de "poste e receba 40 propostas genéricas". Cada projeto passa por um
                  funil técnico desenhado para o setor financeiro — do NDA ao backtesting.
                </p>
              </Reveal>

              <Reveal delay={180}>
                <div className="mt-9 border border-ink/15 bg-paper">
                  <p className="border-b border-ink/10 px-5 py-3 font-mono text-[10.5px] tracking-[0.2em] text-ink/45">
                    LINHA DO TEMPO TÍPICA
                  </p>
                  {TIMELINE.map((t, i) => (
                    <div
                      key={t.d}
                      className={`flex items-center gap-5 px-5 py-3.5 ${
                        i < TIMELINE.length - 1 ? "border-b border-ink/8" : ""
                      }`}
                    >
                      <span className="w-14 font-mono text-[12.5px] font-semibold text-pine">{t.d}</span>
                      <span className="text-[14px] font-medium text-ink/80">{t.e}</span>
                    </div>
                  ))}
                </div>
                <a
                  href="#contato"
                  className="group mt-7 inline-flex items-center gap-2 font-display text-[15px] font-semibold text-pine transition-colors hover:text-pinedeep"
                >
                  Começar pelo briefing
                  <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </Reveal>
            </div>
          </div>

          {/* passos */}
          <div className="lg:col-span-7">
            {STEPS.map((s, i) => (
              <Reveal key={s.num} delay={i * 90}>
                <article className="group flex gap-6 border-t border-ink/15 py-10 transition-all duration-500 last:border-b hover:pl-2 sm:gap-9">
                  <span className="font-display text-[52px] font-bold leading-none tracking-tight text-transparent [-webkit-text-stroke:1.5px_rgba(12,22,34,0.35)] transition-all duration-500 group-hover:[-webkit-text-stroke:1.5px_rgba(15,122,77,0.9)] sm:text-[64px]">
                    {s.num}
                  </span>
                  <div>
                    <h3 className="font-display text-[22px] font-bold tracking-tight sm:text-2xl">
                      {s.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink/65">{s.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {s.tags.map((t) => (
                        <span
                          key={t}
                          className="border border-ink/15 bg-paper px-2.5 py-1 font-mono text-[10.5px] tracking-[0.08em] text-ink/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
