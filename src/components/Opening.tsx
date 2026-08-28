import { useEffect, useMemo, useState, type ReactNode } from "react";
import { TRUSTED } from "../data";
import { CountUp, Reveal, usePrefersReducedMotion } from "../motion";
import { IconArrow } from "./icons";

/* ------------------------------------------------------------------ */
/* Console de match                                                    */
/* ------------------------------------------------------------------ */

type Cand = { ini: string; focus: string; tag: string; match: number };
type Brief = { code: string; tipo: string; cliente: string; stack: string; entregavel: string; cands: Cand[] };

const BRIEFS: Brief[] = [
  {
    code: "001",
    tipo: "A-card de originação · crédito pessoal",
    cliente: "Fintech série B · 400 mil CPFs ativos",
    stack: "Python · XGBoost · AWS",
    entregavel: "Modelo + política de cutoff + docs",
    cands: [
      { ini: "C.T.", focus: "Scoring de originação", tag: "XGBoost · A-card", match: 97 },
      { ini: "M.R.", focus: "Ex-CRO · varejo bancário", tag: "Política de crédito", match: 91 },
      { ini: "R.S.", focus: "Dados alternativos", tag: "Python · MLOps", match: 88 },
    ],
  },
  {
    code: "002",
    tipo: "Provisões IFRS 9 · ECL em 3 estágios",
    cliente: "Banco médio · carteira PJ R$ 2,8 bi",
    stack: "R/Python · SQL · Azure",
    entregavel: "Motor de ECL + trilhas de auditoria",
    cands: [
      { ini: "M.R.", focus: "IFRS 9 · provisionamento", tag: "ECL · Res. 4.966", match: 96 },
      { ini: "F.B.", focus: "Validação · model risk", tag: "SR 11-7", match: 90 },
      { ini: "D.N.", focus: "Eng. de dados · governança", tag: "dbt · LGPD", match: 85 },
    ],
  },
  {
    code: "003",
    tipo: "Motor antifraude transacional",
    cliente: "Varejista com financeira própria",
    stack: "Kafka · Flink · grafos",
    entregavel: "Regras + ML em tempo real (<200 ms)",
    cands: [
      { ini: "J.P.", focus: "Fraude · tempo real", tag: "Grafos · Flink", match: 97 },
      { ini: "C.T.", focus: "ML sênior · originação", tag: "LightGBM", match: 87 },
      { ini: "D.N.", focus: "Eng. de dados · streaming", tag: "Kafka · dbt", match: 82 },
    ],
  },
];

const TYPE_START = 350;
const CPS = 55;
const CAND_GAP = 550;
const CAND_STEP = 540;
const MATCH_ANIM = 700;
const CHIPS_GAP = 420;
const HOLD = 4600;

const CHIPS = ["NDA bilateral pronto", "Escrow 30 / 40 / 30", "Shortlist em ~72h"];

function buildLines(b: Brief): string[] {
  return [
    `▸ briefing_${b.code} recebido`,
    `  ${"desafio".padEnd(12)}${b.tipo}`,
    `  ${"cliente".padEnd(12)}${b.cliente}`,
    `  ${"stack".padEnd(12)}${b.stack}`,
    `  ${"entregável".padEnd(12)}${b.entregavel}`,
    `▸ varrendo pool · 128 especialistas · 21 tags`,
  ];
}

function MatchConsole() {
  const reduced = usePrefersReducedMotion();
  const [frame, setFrame] = useState({ b: 0, t: 0 });

  const timings = useMemo(
    () =>
      BRIEFS.map((b) => {
        const total = buildLines(b).reduce((s, l) => s + l.length, 0);
        const typeEnd = TYPE_START + (total / CPS) * 1000;
        const candStart = typeEnd + CAND_GAP;
        const chips = candStart + 3 * CAND_STEP + CHIPS_GAP;
        return { total, candStart, chips, cycle: chips + HOLD };
      }),
    []
  );
  const CYCLE = useMemo(() => Math.max(...timings.map((x) => x.cycle)), [timings]);

  useEffect(() => {
    if (reduced) return;
    const start = performance.now();
    const id = window.setInterval(() => {
      const el = performance.now() - start;
      setFrame({ b: Math.floor(el / CYCLE) % BRIEFS.length, t: el % CYCLE });
    }, 90);
    return () => window.clearInterval(id);
  }, [reduced, CYCLE]);

  const brief = BRIEFS[frame.b];
  const T = timings[frame.b];
  const lines = useMemo(() => buildLines(brief), [brief]);
  const shownChars = reduced
    ? T.total
    : Math.max(0, Math.min(T.total, ((frame.t - TYPE_START) * CPS) / 1000));

  let acc = 0;

  return (
    <div className="relative">
      {/* curva de distribuição decorativa atrás do console */}
      <svg
        viewBox="0 0 400 200"
        className="pointer-events-none absolute -right-10 -top-16 h-44 w-80 text-pine/25"
        fill="none"
        aria-hidden="true"
      >
        <path d="M10 190C90 190 100 20 190 20s100 170 200 170" stroke="currentColor" strokeWidth="2" />
        <path d="M255 30v160" stroke="currentColor" strokeWidth="2" strokeDasharray="5 6" />
        <path d="M10 190h380" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      </svg>

      <div className="relative overflow-hidden rounded-lg border border-ink/20 bg-ink shadow-[0_30px_70px_-20px_rgba(12,22,34,0.55)]">
        {/* barra de título */}
        <div className="flex items-center justify-between border-b border-paper/10 px-5 py-3">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-signal/90" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber/90" />
              <span className="h-2.5 w-2.5 rounded-full bg-mint/90" />
            </div>
            <p className="font-mono text-[11px] tracking-[0.14em] text-paper/50">
              MATCH ENGINE · console v2.4
            </p>
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] text-mint">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-mint" />
            LIVE · {frame.b + 1}/{BRIEFS.length}
          </div>
        </div>

        {/* corpo: briefing digitado */}
        <div className="min-h-[172px] px-5 pt-4 font-mono text-[12px] leading-[1.85] sm:text-[12.5px]">
          {lines.map((line, i) => {
            const start = acc;
            acc += line.length;
            const vis = Math.max(0, Math.min(line.length, shownChars - start));
            const isActive = !reduced && shownChars >= start && shownChars < T.total && vis < line.length;
            const isCmd = i === 0 || i === lines.length - 1;
            return (
              <p key={`${frame.b}-${i}`} className={`whitespace-pre ${isCmd ? "text-mint" : "text-paper/85"}`}>
                {line.slice(0, vis)}
                {isActive && <span className="caret-blink text-mint">▍</span>}
              </p>
            );
          })}
        </div>

        {/* shortlist */}
        <div className="px-5 pb-1 pt-2">
          <p className="mb-1.5 font-mono text-[10px] tracking-[0.2em] text-paper/40">
            SHORTLIST SUGERIDA PELO COMITÊ
          </p>
          {brief.cands.map((c, i) => {
            const appear = T.candStart + i * CAND_STEP;
            const vis = reduced || frame.t >= appear;
            const pct = reduced
              ? c.match
              : Math.max(0, Math.min(c.match, ((frame.t - appear) / MATCH_ANIM) * c.match));
            return (
              <div
                key={`${frame.b}-${c.ini}`}
                className={`flex items-center gap-3 border-t border-paper/10 py-2.5 transition-all duration-500 ${
                  vis ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                }`}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[4px] bg-paper/10 font-mono text-[11px] font-semibold text-mint">
                  {c.ini}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-body text-[12.5px] font-medium text-paper">{c.focus}</p>
                  <p className="truncate font-mono text-[10.5px] text-paper/45">{c.tag}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm font-semibold text-mint">{Math.round(pct)}%</p>
                  <div className="mt-1 h-[3px] w-16 bg-paper/15">
                    <div className="h-full bg-pine" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* chips de status */}
        <div className="flex flex-wrap gap-2 border-t border-paper/10 px-5 py-4">
          {CHIPS.map((chip, i) => {
            const appear = T.chips + i * 120;
            const vis = reduced || frame.t >= appear;
            return (
              <span
                key={chip}
                className={`border border-paper/15 px-2.5 py-1 font-mono text-[10px] tracking-[0.08em] text-paper/70 transition-all duration-500 ${
                  vis ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
                }`}
              >
                {chip}
              </span>
            );
          })}
        </div>
      </div>
      <p className="mt-3 text-center font-mono text-[10.5px] tracking-[0.06em] text-ink/45">
        Simulação ilustrativa — o shortlist real sai em até 72h úteis.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Abertura                                                            */
/* ------------------------------------------------------------------ */

const HEADLINE: ReactNode[] = [
  <>Risco de crédito</>,
  <>
    exige <span className="border-b-4 border-pine pb-0.5 text-pine">especialista</span> —
  </>,
  <>
    não{" "}
    <span className="text-ink/40 line-through decoration-signal decoration-[3px] underline-offset-4">
      freelancer.
    </span>
  </>,
];

const STATS = [
  { end: 128, suffix: "", label: "especialistas vetados" },
  { end: 12, suffix: "%", label: "aprovação na curadoria" },
  { end: 72, suffix: "h", label: "tempo médio de match" },
  { end: 42, prefix: "R$ ", suffix: "M", label: "sob escrow hoje" },
];

const NAME_STYLES = [
  "font-display font-bold tracking-tight text-[17px]",
  "font-mono lowercase text-[15px] tracking-tight",
  "font-display font-semibold uppercase tracking-[0.22em] text-[12.5px]",
  "font-body font-semibold italic text-[16px]",
  "font-display font-bold tracking-tight text-[17px]",
  "font-mono uppercase text-[12.5px] tracking-[0.12em]",
  "font-body font-semibold text-[16px]",
  "font-mono lowercase text-[15px]",
];

export default function Opening() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), 60);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <section id="topo" className="bg-gridlines relative overflow-hidden">
      <div className="pointer-events-none absolute -top-44 right-[-12%] h-[600px] w-[600px] rounded-full bg-pine/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 top-64 h-[420px] w-[420px] rounded-full bg-amber/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-14 sm:px-8 lg:pb-24 lg:pt-20">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          {/* coluna editorial */}
          <div className="lg:col-span-7">
            <p className="mb-6 flex items-center gap-3 font-mono text-[11px] font-medium tracking-[0.22em] text-ink/60">
              <span className="inline-block h-2 w-2 bg-pine" />
              MARKETPLACE B2B · RISCO DE CRÉDITO × DATA SCIENCE
            </p>

            <h1 className="font-display text-[2.7rem] font-bold leading-[1.03] tracking-tight sm:text-6xl lg:text-[4.3rem]">
              {HEADLINE.map((line, i) => (
                <span key={i} className="block overflow-hidden pb-1">
                  <span
                    className="block"
                    style={{
                      transform: mounted ? "translateY(0)" : "translateY(112%)",
                      transition: `transform 1s cubic-bezier(0.22,0.61,0.36,1) ${i * 140 + 150}ms`,
                    }}
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            <Reveal delay={520}>
              <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-ink/70">
                A CreditQuant conecta bancos, fintechs e varejo aos{" "}
                <strong className="font-semibold text-ink">128 profissionais</strong> que já
                construíram os scores, motores de ECL e esteiras de fraude que o seu balanço
                precisa — com curadoria técnica, NDA automático e pagamento em escrow.
              </p>
            </Reveal>

            <Reveal delay={650}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="#contato"
                  className="group flex items-center gap-2.5 bg-pine px-7 py-3.5 font-display text-[15px] font-semibold text-paper shadow-[0_12px_30px_-10px_rgba(15,122,77,0.55)] transition-all duration-300 hover:bg-pinedeep hover:shadow-[0_16px_36px_-10px_rgba(15,122,77,0.7)]"
                >
                  Postar um desafio
                  <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="#especialistas"
                  className="border border-ink/25 px-7 py-3.5 font-display text-[15px] font-semibold text-ink transition-all duration-300 hover:border-ink hover:bg-ink hover:text-paper"
                >
                  Conhecer o pool
                </a>
              </div>
              <p className="mt-5 font-mono text-[11px] tracking-[0.14em] text-ink/45">
                FEE DE SUCESSO 15–20% · VOCÊ SÓ PAGA QUANDO O MATCH ACONTECE
              </p>
            </Reveal>

            <Reveal delay={780}>
              <div className="mt-12 grid grid-cols-2 divide-x divide-ink/10 border-y border-ink/10 sm:grid-cols-4">
                {STATS.map((s, i) => (
                  <div key={s.label} className={`py-5 ${i >= 2 ? "border-t border-ink/10 sm:border-t-0" : ""} ${i % 2 === 1 ? "pl-5" : "sm:pl-5"} ${i === 0 ? "sm:pl-0" : ""}`}>
                    <p className="font-display text-[26px] font-bold tracking-tight sm:text-[30px]">
                      <CountUp end={s.end} prefix={"prefix" in s ? s.prefix : ""} suffix={s.suffix} />
                    </p>
                    <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink/50">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* console de match */}
          <div className="lg:col-span-5">
            <Reveal delay={350} y={34}>
              <MatchConsole />
            </Reveal>
          </div>
        </div>
      </div>

      {/* faixa de confiança */}
      <div className="relative border-t border-ink/10 bg-paper/70">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
          <p className="mb-5 font-mono text-[10.5px] tracking-[0.24em] text-ink/40">
            TIMES DE RISCO E DADOS QUE CONTRATAM PELO POOL
          </p>
          <div className="flex flex-wrap items-baseline gap-x-10 gap-y-3">
            {TRUSTED.map((name, i) => (
              <span
                key={name}
                className={`cursor-default text-ink/35 transition-colors duration-300 hover:text-pine ${NAME_STYLES[i % NAME_STYLES.length]}`}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
