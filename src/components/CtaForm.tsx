import { useState, type FormEvent } from "react";
import { BRIEF_CHALLENGES, CONSULTANT_AREAS } from "../data";
import { Reveal } from "../motion";
import { IconArrow, IconCheck } from "./icons";

type Mode = "contratar" | "consultor";

const CHECKLIST = [
  "Briefing estruturado em 15 minutos",
  "NDA bilateral antes de qualquer dado",
  "Shortlist com 2–3 nomes em 72h úteis",
  "Fee reduzido no primeiro projeto (piloto)",
];

const inputCls =
  "mt-2 w-full border border-paper/20 bg-deep px-3.5 py-3 font-body text-[14px] text-paper placeholder-paper/30 outline-none transition-colors duration-300 focus:border-mint";
const labelCls = "font-mono text-[10.5px] uppercase tracking-[0.16em] text-paper/50";

export default function CtaForm() {
  const [mode, setMode] = useState<Mode>("contratar");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [sel, setSel] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [protocol, setProtocol] = useState<string | null>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !email.includes("@")) {
      setError("Preencha nome e um e-mail corporativo válido.");
      return;
    }
    if (!sel) {
      setError(mode === "contratar" ? "Selecione o tipo de desafio." : "Selecione sua especialidade.");
      return;
    }
    setError("");
    setProtocol(`CQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
  };

  const reset = () => {
    setProtocol(null);
    setNome("");
    setEmail("");
    setOrg("");
    setSel("");
    setMsg("");
  };

  return (
    <section id="contato" className="bg-gridlines relative border-t border-ink/10 bg-paper">
      <div className="pointer-events-none absolute -right-24 top-10 h-[380px] w-[380px] rounded-full bg-pine/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid items-start gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="mb-5 flex items-center gap-3 font-mono text-[11px] font-medium tracking-[0.22em] text-ink/55">
                <span className="inline-block h-2 w-2 bg-pine" />
                PRÓXIMO PASSO
              </p>
              <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
                O próximo modelo do seu balanço começa com{" "}
                <span className="text-pine">um briefing</span>.
              </h2>
              <p className="mt-6 max-w-md text-[16px] leading-relaxed text-ink/65">
                Sem cadastro, sem cartão, sem spam. Você descreve o desafio em duas linhas e o
                comitê responde com os primeiros nomes — ou com um diagnóstico honesto de que
                ainda não temos o especialista certo.
              </p>
              <ul className="mt-8 space-y-3">
                {CHECKLIST.map((c) => (
                  <li key={c} className="flex items-center gap-3 text-[15px] font-medium text-ink/75">
                    <span className="flex h-6 w-6 items-center justify-center bg-mintsoft">
                      <IconCheck className="h-3.5 w-3.5 text-pinedeep" />
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
              <p className="mt-9 font-mono text-[11.5px] tracking-[0.08em] text-ink/45">
                PREFERE E-MAIL?{" "}
                <a href="mailto:contato@creditquant.com.br" className="link-slide text-pine">
                  CONTATO@CREDITQUANT.COM.BR
                </a>
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={180}>
              <div className="border border-ink/20 bg-ink p-7 text-paper shadow-[0_30px_70px_-25px_rgba(12,22,34,0.6)] sm:p-8">
                {protocol ? (
                  <div className="py-6 text-center">
                    <span className="mx-auto flex h-14 w-14 items-center justify-center bg-pine">
                      <IconCheck className="h-7 w-7 text-paper" />
                    </span>
                    <h3 className="mt-6 font-display text-2xl font-bold tracking-tight">
                      Briefing recebido.
                    </h3>
                    <p className="mx-auto mt-3 max-w-sm text-[14px] leading-relaxed text-paper/65">
                      {mode === "contratar"
                        ? "Nosso comitê retorna em até 24h úteis com os primeiros nomes do pool e um diagnóstico inicial do escopo."
                        : "Sua aplicação entrou na fila da próxima banca técnica. Enviaremos a prova técnica em até 5 dias úteis."}
                    </p>
                    <p className="mt-6 inline-block border border-paper/25 px-4 py-2 font-mono text-[12.5px] tracking-[0.14em] text-mint">
                      PROTOCOLO {protocol}
                    </p>
                    <div>
                      <button
                        onClick={reset}
                        className="link-slide mt-7 font-mono text-[12px] uppercase tracking-[0.14em] text-paper/60 transition-colors hover:text-paper"
                      >
                        Enviar outro briefing
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={submit} noValidate>
                    <div className="grid grid-cols-2 gap-2">
                      {(
                        [
                          { id: "contratar", label: "Quero contratar" },
                          { id: "consultor", label: "Sou especialista" },
                        ] as const
                      ).map((m) => (
                        <button
                          type="button"
                          key={m.id}
                          onClick={() => {
                            setMode(m.id);
                            setSel("");
                            setError("");
                          }}
                          className={`px-3 py-3 font-display text-[13.5px] font-semibold transition-all duration-300 ${
                            mode === m.id
                              ? "bg-pine text-paper"
                              : "border border-paper/25 text-paper/60 hover:border-paper/60 hover:text-paper"
                          }`}
                        >
                          {m.label}
                        </button>
                      ))}
                    </div>

                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                      <label className="block">
                        <span className={labelCls}>Nome completo</span>
                        <input
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                          placeholder="Ana Ribeiro"
                          className={inputCls}
                        />
                      </label>
                      <label className="block">
                        <span className={labelCls}>E-mail corporativo</span>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="ana@suaempresa.com.br"
                          className={inputCls}
                        />
                      </label>
                    </div>

                    <div className="mt-5 grid gap-5 sm:grid-cols-2">
                      <label className="block">
                        <span className={labelCls}>
                          {mode === "contratar" ? "Empresa" : "LinkedIn (opcional)"}
                        </span>
                        <input
                          value={org}
                          onChange={(e) => setOrg(e.target.value)}
                          placeholder={mode === "contratar" ? "Fintech XYZ" : "linkedin.com/in/voce"}
                          className={inputCls}
                        />
                      </label>
                      <label className="block">
                        <span className={labelCls}>
                          {mode === "contratar" ? "Tipo de desafio" : "Especialidade"}
                        </span>
                        <select
                          value={sel}
                          onChange={(e) => setSel(e.target.value)}
                          className={`${inputCls} cursor-pointer`}
                        >
                          <option value="" disabled>
                            Selecione…
                          </option>
                          {(mode === "contratar" ? BRIEF_CHALLENGES : CONSULTANT_AREAS).map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>

                    <label className="mt-5 block">
                      <span className={labelCls}>
                        {mode === "contratar"
                          ? "O desafio em 2 linhas (opcional)"
                          : "Seu case mais forte em 2 linhas (opcional)"}
                      </span>
                      <textarea
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        rows={3}
                        placeholder={
                          mode === "contratar"
                            ? "Ex.: precisamos de um A-card para 400 mil CPFs, stack Python, produção em 10 semanas…"
                            : "Ex.: rebuild de A-card com +12 p.p. de aprovação mantendo a inadimplência…"
                        }
                        className={`${inputCls} resize-none`}
                      />
                    </label>

                    {error && (
                      <p className="mt-4 border border-amber/40 bg-amber/10 px-3 py-2 font-mono text-[11.5px] text-amber">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      className="group mt-6 flex w-full items-center justify-center gap-2.5 bg-pine py-3.5 font-display text-[15px] font-semibold text-paper transition-all duration-300 hover:bg-pinedeep"
                    >
                      {mode === "contratar" ? "Enviar briefing ao comitê" : "Aplicar para o pool"}
                      <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>

                    <p className="mt-4 text-center font-mono text-[10px] tracking-[0.08em] text-paper/35">
                      NDA AUTOMÁTICO ANTES DE QUALQUER DADO SENSÍVEL · LGPD · SEM SPAM
                    </p>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
