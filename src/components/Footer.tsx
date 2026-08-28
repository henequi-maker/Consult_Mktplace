import { LogoMark } from "./icons";

const COLS = [
  {
    title: "PLATAFORMA",
    links: [
      { label: "Como funciona", href: "#como-funciona" },
      { label: "Resultados", href: "#resultados" },
      { label: "Custos & simulador", href: "#custos" },
      { label: "Perguntas frequentes", href: "#faq" },
    ],
  },
  {
    title: "ESPECIALISTAS",
    links: [
      { label: "Pool de especialistas", href: "#especialistas" },
      { label: "Curadoria & comitê", href: "#curadoria" },
      { label: "Quero aplicar", href: "#contato" },
    ],
  },
  {
    title: "GOVERNANÇA",
    links: [
      { label: "NDA & escrow", href: "#governanca" },
      { label: "Data clean room", href: "#governanca" },
      { label: "LGPD por desenho", href: "#governanca" },
      { label: "Model risk", href: "#governanca" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-paper/10 bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <a href="#topo" className="flex items-center gap-3">
              <LogoMark className="h-9 w-9 text-mint" />
              <span className="font-display text-lg font-bold tracking-tight">
                Credit<span className="text-mint">Quant</span>
              </span>
            </a>
            <p className="mt-5 max-w-xs text-[13.5px] leading-relaxed text-paper/55">
              Marketplace B2B de especialistas vetados em Risco de Crédito e Data Science.
              Curadoria técnica, contratos prontos e pagamento garantido — para bancos,
              fintechs e varejo.
            </p>
            <p className="mt-6 font-mono text-[10.5px] tracking-[0.18em] text-paper/35">
              FEITO PARA TIMES DE RISCO.
            </p>
          </div>

          {COLS.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <p className="font-mono text-[10.5px] tracking-[0.2em] text-paper/40">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="link-slide text-[13.5px] text-paper/70 transition-colors hover:text-mint"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-2">
            <p className="font-mono text-[10.5px] tracking-[0.2em] text-paper/40">CONTATO</p>
            <ul className="mt-4 space-y-2.5 text-[13.5px]">
              <li>
                <a href="mailto:contato@creditquant.com.br" className="link-slide text-paper/70 hover:text-mint">
                  contato@creditquant.com.br
                </a>
              </li>
              <li>
                <a href="mailto:dpo@creditquant.com.br" className="link-slide text-paper/70 hover:text-mint">
                  dpo@creditquant.com.br
                </a>
              </li>
              <li className="font-mono text-[11.5px] text-paper/40">São Paulo · Faria Lima</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-6 sm:px-8">
          <p className="font-mono text-[10px] leading-relaxed tracking-[0.06em] text-paper/35">
            © 2026 CREDITQUANT TECNOLOGIA LTDA · CNPJ 00.000.000/0001-91 — PLATAFORMA DE
            INTERMEDIAÇÃO; NÃO REALIZA OPERAÇÕES DE CRÉDITO NEM CUSTODIA DADOS DE CLIENTES.
          </p>
          <p className="font-mono text-[10px] tracking-[0.14em] text-paper/35">
            PÁGINA-DEMO · DADOS ILUSTRATIVOS
          </p>
        </div>
      </div>
    </footer>
  );
}
