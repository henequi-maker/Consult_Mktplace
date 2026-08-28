import { FUNNEL } from "../data";
import { Reveal, useInView } from "../motion";

const COMMITTEE = [
  { role: "Ex-CRO de banco de varejo", note: "preside as bancas de crédito" },
  { role: "Cientista sênior, ex-bureau de crédito", note: "avalia código e modelagem" },
  { role: "Advogada de direito digital", note: "valida LGPD e cláusulas de IP" },
];

const RULES = [
  "Recertificação anual obrigatória de todo o pool",
  "Desligamento automático com NPS < 8 em dois projetos",
  "Especialidades reavaliadas a cada ciclo regulatório",
];

export default function Curation() {
  const [ref, inView] = useInView<HTMLDivElement>(0.25);
  const max = FUNNEL[0].value;

  return (
    <section id="curadoria" className="relative border-t border-ink/10 bg-fog">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="mb-5 flex items-center gap-3 font-mono text-[11px] font-medium tracking-[0.22em] text-ink/55">
                <span className="inline-block h-2 w-2 bg-pine" />
                CURADORIA TÉCNICA
              </p>
              <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
                Só entra quem <span className="text-pine">já entregou</span>.
              </h2>
              <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-ink/65">
                Um modelo de crédito mal calibrado pode custar milhões. Por isso o funil de
                entrada é deliberadamente estreito: currículo é pouco — queremos ver o
                backtesting que a pessoa defendeu na frente de um comitê.
              </p>
            </Reveal>

            <div ref={ref} className="mt-11 space-y-5">
              {FUNNEL.map((f, i) => {
                const pct = (f.value / max) * 100;
                const last = i === FUNNEL.length - 1;
                return (
                  <div key={f.label}>
                    <div className="mb-1.5 flex items-baseline justify-between gap-4">
                      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink/60">
                        {f.label}
                      </span>
                      <span className={`font-mono text-[13px] font-semibold ${last ? "text-pine" : "text-ink/70"}`}>
                        {f.value}
                      </span>
                    </div>
                    <div className="h-8 overflow-hidden bg-ink/8">
                      <div
                        className={`h-full ${last ? "bg-pine" : "bg-ink/75"}`}
                        style={{
                          width: inView ? `${pct}%` : "0%",
                          transition: `width 1.15s cubic-bezier(0.22,0.61,0.36,1) ${i * 160}ms`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="mt-5 font-mono text-[10.5px] tracking-[0.14em] text-ink/40">
              APROVAÇÃO FINAL: 58 / 482 · SAFRA 2024
            </p>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={200}>
              <div className="border border-ink/15 bg-paper lg:sticky lg:top-28">
                <p className="border-b border-ink/10 px-6 py-4 font-mono text-[10.5px] tracking-[0.2em] text-ink/45">
                  O COMITÊ DE CURADORIA
                </p>
                <div className="px-6 py-5">
                  {COMMITTEE.map((m) => (
                    <div key={m.role} className="flex items-start gap-3.5 border-b border-ink/8 py-3.5 first:pt-0 last:border-0 last:pb-0">
                      <span className="mt-1 h-2.5 w-2.5 shrink-0 rotate-45 bg-pine" />
                      <div>
                        <p className="text-[14.5px] font-semibold">{m.role}</p>
                        <p className="mt-0.5 font-mono text-[11px] text-ink/50">{m.note}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-ink/10 bg-ink px-6 py-7 text-paper">
                  <p className="font-display text-[64px] font-bold leading-none tracking-tight text-mint">
                    12<span className="text-[40px]">%</span>
                  </p>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-paper/55">
                    taxa de aprovação da safra 2024
                  </p>
                </div>

                <ul className="px-6 py-5">
                  {RULES.map((r) => (
                    <li key={r} className="flex items-start gap-3 py-2 text-[13.5px] text-ink/70">
                      <span className="mt-[7px] h-[3px] w-[14px] shrink-0 bg-amber" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
