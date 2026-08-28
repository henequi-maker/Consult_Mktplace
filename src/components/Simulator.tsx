import { useMemo, useState, type CSSProperties } from "react";
import { PROJECT_TYPES } from "../data";
import { Reveal } from "../motion";
import { IconCheck } from "./icons";

const MODELS = [
  {
    id: "match",
    name: "Matchmaking",
    price: "Fee de sucesso 15–20%",
    note: "você só paga quando o contrato fecha",
    items: ["Shortlist em 72h úteis", "Contratos, NDA e escrow inclusos", "Comitê técnico valida o escopo"],
    recommended: true,
  },
  {
    id: "assinatura",
    name: "Assinatura",
    price: "R$ 4.900/mês + fee 8%",
    note: "para quem contrata todo trimestre",
    items: ["Fila prioritária do pool", "Fee reduzido em todos os projetos", "Gerente de conta dedicado"],
    recommended: false,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Sob medida",
    note: "múltiplas cadeiras e demandas recorrentes",
    items: ["SLA dedicado e comitê exclusivo", "Integração com sua esteira de compras", "Relatórios de model risk"],
    recommended: false,
  },
] as const;

const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

export default function Simulator() {
  const [tipo, setTipo] = useState(PROJECT_TYPES[0].v);
  const [valor, setValor] = useState(180000);
  const [model, setModel] = useState<"match" | "assinatura">("match");

  const feePct = model === "match" ? 0.15 : 0.08;
  const fee = valor * feePct;
  const net = valor - fee;
  const prazo = useMemo(
    () => PROJECT_TYPES.find((p) => p.v === tipo)?.prazo ?? "8–12 semanas",
    [tipo]
  );
  const fill = ((valor - 60000) / (600000 - 60000)) * 100;

  return (
    <section id="custos" className="relative border-t border-ink/10 bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-12">
          {/* modelos de contratação */}
          <div className="lg:col-span-6">
            <Reveal>
              <p className="mb-5 flex items-center gap-3 font-mono text-[11px] font-medium tracking-[0.22em] text-ink/55">
                <span className="inline-block h-2 w-2 bg-pine" />
                MODELOS DE CONTRATAÇÃO
              </p>
              <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
                Quanto custa <span className="text-pine">um match</span>?
              </h2>
              <p className="mt-6 max-w-md text-[16px] leading-relaxed text-ink/65">
                Em nicho de alto ticket, taxa por hora não funciona. Nosso alinhamento é por
                sucesso — e o simulador ao lado mostra a conta aberta.
              </p>
            </Reveal>

            <div className="mt-9 space-y-4">
              {MODELS.map((m, i) => (
                <Reveal key={m.id} delay={i * 110}>
                  <div
                    className={`relative border p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-18px_rgba(12,22,34,0.28)] ${
                      m.recommended ? "border-pine/50 bg-mintsoft/50" : "border-ink/15 bg-paper"
                    }`}
                  >
                    {m.recommended && (
                      <span className="absolute -top-2.5 left-6 bg-pine px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-paper">
                        Recomendado p/ MVP
                      </span>
                    )}
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-display text-xl font-bold tracking-tight">{m.name}</h3>
                      <p className="font-mono text-[13px] font-semibold text-pine">{m.price}</p>
                    </div>
                    <p className="mt-1 text-[13px] text-ink/55">{m.note}</p>
                    <ul className="mt-4 space-y-1.5">
                      {m.items.map((it) => (
                        <li key={it} className="flex items-center gap-2.5 text-[13.5px] text-ink/70">
                          <IconCheck className="h-3.5 w-3.5 shrink-0 text-pine" />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* simulador */}
          <div className="lg:col-span-6">
            <Reveal delay={180}>
              <div className="border border-ink/20 bg-ink p-7 text-paper shadow-[0_30px_70px_-25px_rgba(12,22,34,0.6)] sm:p-8 lg:sticky lg:top-28">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[10.5px] tracking-[0.2em] text-paper/45">
                    SIMULADOR DE MATCH
                  </p>
                  <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] text-mint">
                    <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-mint" />
                    CÁLCULO ABERTO
                  </span>
                </div>

                <label className="mt-7 block">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-paper/50">
                    Tipo de projeto
                  </span>
                  <select
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    className="mt-2 w-full border border-paper/20 bg-deep px-3.5 py-3 font-body text-[14px] text-paper outline-none transition-colors focus:border-mint"
                  >
                    {PROJECT_TYPES.map((p) => (
                      <option key={p.v} value={p.v}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="mt-6">
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-paper/50">
                      Valor do projeto
                    </span>
                    <span className="font-display text-2xl font-bold tracking-tight text-mint">
                      {brl.format(valor)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={60000}
                    max={600000}
                    step={5000}
                    value={valor}
                    onChange={(e) => setValor(Number(e.target.value))}
                    className="cq-range mt-4"
                    style={{ "--fill": `${fill}%` } as CSSProperties}
                    aria-label="Valor do projeto"
                  />
                  <div className="mt-2 flex justify-between font-mono text-[10px] text-paper/35">
                    <span>R$ 60 mil</span>
                    <span>R$ 600 mil</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-2">
                  {(
                    [
                      { id: "match", label: "Matchmaking · 15%" },
                      { id: "assinatura", label: "Assinatura · 8%" },
                    ] as const
                  ).map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setModel(m.id)}
                      className={`px-3 py-2.5 font-display text-[13px] font-semibold transition-all duration-300 ${
                        model === m.id
                          ? "bg-pine text-paper"
                          : "border border-paper/25 text-paper/65 hover:border-paper/60"
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>

                <div className="mt-7 space-y-2.5 border-t border-paper/12 pt-6 font-mono text-[13px]">
                  <div className="flex justify-between text-paper/70">
                    <span>Fee da plataforma ({Math.round(feePct * 100)}%)</span>
                    <span className="text-paper">{brl.format(fee)}</span>
                  </div>
                  <div className="flex justify-between text-paper/70">
                    <span>Vai para o especialista</span>
                    <span className="text-mint">{brl.format(net)}</span>
                  </div>
                  <div className="flex justify-between text-paper/70">
                    <span>Prazo típico</span>
                    <span className="text-paper">{prazo}</span>
                  </div>
                  {model === "assinatura" && (
                    <div className="flex justify-between text-amber/90">
                      <span>+ mensalidade do pool</span>
                      <span>R$ 4.900/mês</span>
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-paper/50">
                    Liberação em escrow
                  </p>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {[
                      { pct: 30, when: "kickoff" },
                      { pct: 40, when: "entrega parcial" },
                      { pct: 30, when: "validação" },
                    ].map((m) => (
                      <div key={m.when} className="border border-paper/15 p-3 text-center">
                        <p className="font-display text-lg font-bold text-mint">{m.pct}%</p>
                        <p className="mt-0.5 font-mono text-[9.5px] uppercase tracking-[0.1em] text-paper/50">
                          {m.when}
                        </p>
                        <p className="mt-1.5 font-mono text-[11px] text-paper/80">
                          {brl.format((valor * m.pct) / 100)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="mt-6 border-t border-paper/12 pt-4 font-mono text-[10px] leading-relaxed text-paper/35">
                  VALORES ILUSTRATIVOS · O FEE FINAL É TRAVADO ANTES DO KICKOFF, SEM
                  SURPRESAS NO MEIO DO PROJETO.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
