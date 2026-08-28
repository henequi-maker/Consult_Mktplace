import { useState } from "react";
import { AREA_LABEL, CONSULTANTS, type Area } from "../data";
import { Reveal } from "../motion";
import { IconCheck } from "./icons";

type Filter = "todos" | Area;

const FILTERS: { v: Filter; label: string }[] = [
  { v: "todos", label: "Todos" },
  ...(Object.keys(AREA_LABEL) as Area[]).map((a) => ({ v: a as Filter, label: AREA_LABEL[a] })),
];

export default function Specialists() {
  const [filter, setFilter] = useState<Filter>("todos");
  const [requested, setRequested] = useState<Set<string>>(new Set());

  const list = CONSULTANTS.filter((c) => filter === "todos" || c.area === filter);

  const toggle = (id: string) => {
    setRequested((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section id="especialistas" className="relative border-t border-ink/10 bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mb-5 flex items-center gap-3 font-mono text-[11px] font-medium tracking-[0.22em] text-ink/55">
                <span className="inline-block h-2 w-2 bg-pine" />
                POOL DE ESPECIALISTAS
              </p>
              <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
                128 nomes. <span className="text-pine">12% de aprovação.</span>
              </h2>
            </div>
            <p className="max-w-xs border-l-2 border-amber pl-4 text-[13px] leading-relaxed text-ink/60">
              Perfis cegos por princípio: identidade revelada somente após NDA bilateral —
              muitos especialistas são executivos em atividade.
            </p>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-10 flex flex-wrap items-center gap-2.5">
            {FILTERS.map((f) => (
              <button
                key={f.v}
                onClick={() => setFilter(f.v)}
                className={`px-4 py-2 font-display text-[13px] font-semibold transition-all duration-300 ${
                  filter === f.v
                    ? "bg-ink text-paper shadow-[0_8px_20px_-8px_rgba(12,22,34,0.5)]"
                    : "border border-ink/20 text-ink/65 hover:border-ink hover:text-ink"
                }`}
              >
                {f.label}
              </button>
            ))}
            <span className="ml-auto font-mono text-[11px] tracking-[0.1em] text-ink/45">
              EXIBINDO {list.length} DE 128
            </span>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {list.map((c, i) => {
            const isReq = requested.has(c.id);
            return (
              <Reveal key={c.id} delay={(i % 3) * 100} y={22} className="h-full">
                <article className="group flex h-full flex-col border border-ink/12 bg-paper p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-ink/30 hover:shadow-[0_24px_50px_-20px_rgba(12,22,34,0.3)]">
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[6px] bg-ink font-mono text-[13px] font-semibold text-paper transition-colors duration-300 group-hover:bg-pine">
                      {c.initials}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-[17px] font-bold tracking-tight">
                        {c.initials}
                        <span className="ml-2 font-mono text-[11px] font-medium text-ink/40">
                          perfil cego
                        </span>
                      </p>
                      <p className="mt-0.5 text-[12.5px] leading-snug text-ink/55">{c.role}</p>
                    </div>
                    <p className="shrink-0 font-mono text-[12.5px] font-semibold text-pine">
                      R$ {c.rate}/h
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="bg-mintsoft px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-pinedeep">
                      {AREA_LABEL[c.area]}
                    </span>
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink/45">
                      {c.years} anos de pista
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {c.tags.map((t) => (
                      <span
                        key={t}
                        className="border border-ink/15 px-2 py-0.5 font-mono text-[10.5px] text-ink/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 border-l-2 border-pine bg-fog/70 p-3.5">
                    <p className="text-[13px] leading-relaxed text-ink/75">{c.caseText}</p>
                    <p className="mt-2 font-mono text-[11.5px] font-semibold tracking-tight text-pine">
                      {c.caseMetric}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-ink/10 pt-4">
                    <div className="flex gap-1.5">
                      {c.badges.length > 0 ? (
                        c.badges.map((b) => (
                          <span
                            key={b}
                            className="border border-amber/50 bg-amber/10 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8a5c0e]"
                          >
                            {b}
                          </span>
                        ))
                      ) : (
                        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink/35">
                          pool geral
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => toggle(c.id)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 font-display text-[12.5px] font-semibold transition-all duration-300 ${
                        isReq
                          ? "cursor-default bg-mintsoft text-pinedeep"
                          : "border border-ink/25 text-ink hover:border-pine hover:bg-pine hover:text-paper"
                      }`}
                    >
                      {isReq ? (
                        <>
                          <IconCheck className="h-3.5 w-3.5" /> NDA enviado
                        </>
                      ) : (
                        "Solicitar acesso"
                      )}
                    </button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
