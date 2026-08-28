import { CASES } from "../data";
import { CountUp, Reveal } from "../motion";

export default function Cases() {
  return (
    <section id="resultados" className="bg-gridlines-dark relative overflow-hidden bg-ink text-paper">
      <div className="pointer-events-none absolute -right-32 top-0 h-[480px] w-[480px] rounded-full bg-pine/15 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mb-5 flex items-center gap-3 font-mono text-[11px] font-medium tracking-[0.22em] text-mint">
                <span className="inline-block h-2 w-2 bg-mint" />
                RESULTADOS AUDITADOS
              </p>
              <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
                Casos que passaram <br className="hidden sm:block" />
                pelo comitê.
              </h2>
            </div>
            <p className="max-w-xs font-mono text-[11px] leading-relaxed tracking-[0.08em] text-paper/45">
              MÉTRICAS VALIDADAS COM O CLIENTE NO ENCERRAMENTO DO ESCROW
            </p>
          </div>
        </Reveal>

        <div className="mt-14">
          {CASES.map((c, idx) => (
            <Reveal key={c.title} delay={idx * 80}>
              <article className="group grid gap-8 border-t border-paper/12 py-12 last:border-b lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-6">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[12px] font-semibold tracking-[0.16em] text-mint">
                      CASE {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="border border-paper/25 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.12em] text-paper/60">
                      {c.period}
                    </span>
                  </div>
                  <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-paper/45">
                    {c.sector}
                  </p>
                  <h3 className="mt-2 font-display text-[26px] font-bold leading-tight tracking-tight sm:text-3xl">
                    {c.title}
                  </h3>
                  <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-paper/65">{c.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {c.tags.map((t) => (
                      <span
                        key={t}
                        className="border border-paper/20 px-2.5 py-1 font-mono text-[10.5px] text-paper/60 transition-colors duration-300 group-hover:border-paper/35"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <div className="grid h-full grid-cols-1 gap-px bg-paper/12 sm:grid-cols-3 lg:gap-px">
                    {c.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="flex flex-col justify-end bg-ink p-5 transition-colors duration-500 group-hover:bg-deep sm:p-6"
                      >
                        <p className="font-display text-[34px] font-bold leading-none tracking-tight text-mint sm:text-[42px]">
                          <CountUp
                            end={m.end}
                            decimals={m.decimals ?? 0}
                            prefix={m.prefix ?? ""}
                            suffix={m.suffix ?? ""}
                          />
                        </p>
                        <p className="mt-3 font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-paper/50">
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
