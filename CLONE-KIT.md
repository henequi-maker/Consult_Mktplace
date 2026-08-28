# CLONE-KIT — CreditQuant (Marketplace B2B · Risco de Crédito × Data Science)

Este arquivo contém o **projeto completo, arquivo por arquivo**, pronto para ser recriado em
outra conversa/ambiente. Landing page em **React 18 + TypeScript + Vite + Tailwind CSS v4**,
com console de match animado, pool de especialistas filtrável, cases com contadores,
funil de curadoria, governança, simulador de fees, FAQ, formulário de briefing e footer.
Todas as animações respeitam `prefers-reduced-motion`.

## Como usar em outra conversa

1. Anexe este arquivo (`CLONE-KIT.md`) na nova conversa — ou cole as seções em partes.
2. Peça algo como: *"Recrie este projeto exatamente como descrito no CLONE-KIT.md:
   crie cada arquivo no caminho indicado e rode o build."*

## Setup do ambiente

```bash
npm create vite@latest creditquant -- --template react-ts
cd creditquant
npm install
npm install -D tailwindcss @tailwindcss/vite
npm install react react-dom
```

`vite.config.ts` (substitua o conteúdo do scaffold):

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

Depois, cira/substitua os arquivos abaixo nos caminhos exatos e rode `npm run dev`
(build com `npm run build`). As fontes vêm do Google Fonts (já linkadas no `index.html`) —
não há dependência adicional de pacotes além de React e Tailwind v4.

## Estrutura

```
index.html
src/main.tsx
src/index.css
src/App.tsx
src/data.ts
src/motion.tsx
src/components/icons.tsx
src/components/Ticker.tsx
src/components/Header.tsx
src/components/Opening.tsx
src/components/Process.tsx
src/components/Specialists.tsx
src/components/Cases.tsx
src/components/Curation.tsx
src/components/Governance.tsx
src/components/Simulator.tsx
src/components/Faq.tsx
src/components/CtaForm.tsx
src/components/Footer.tsx
```

---

## `index.html`

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="CreditQuant — marketplace B2B de especialistas vetados em Risco de Crédito e Data Science. Curadoria técnica, NDA automático, escrow e governança LGPD."
    />
    <title>CreditQuant — Especialistas vetados em Risco de Crédito & Data Science</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

## `src/main.tsx`

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
```

---

## `src/index.css`

```css
@import "tailwindcss";

@theme {
  --color-paper: #f3f5f0;
  --color-fog: #e8ece4;
  --color-ink: #0c1622;
  --color-deep: #101f2e;
  --color-slate2: #51616f;
  --color-pine: #0f7a4d;
  --color-pinedeep: #0a5a38;
  --color-mint: #4cc58a;
  --color-mintsoft: #dcefe4;
  --color-signal: #c2402a;
  --color-signalsoft: #f6e2dc;
  --color-amber: #dd9f2b;

  --font-display: "Space Grotesk", "IBM Plex Sans", sans-serif;
  --font-body: "IBM Plex Sans", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "IBM Plex Mono", ui-monospace, monospace;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-paper);
  color: var(--color-ink);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

::selection {
  background: var(--color-pine);
  color: #f3f5f0;
}

/* ---- textura de ruído (overlay global) ---- */
.noise-overlay {
  position: fixed;
  inset: 0;
  z-index: 70;
  pointer-events: none;
  opacity: 0.05;
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* ---- papel milimetrado sutil ---- */
.bg-gridlines {
  background-image:
    linear-gradient(rgba(12, 22, 34, 0.055) 1px, transparent 1px),
    linear-gradient(90deg, rgba(12, 22, 34, 0.055) 1px, transparent 1px);
  background-size: 44px 44px;
}
.bg-gridlines-dark {
  background-image:
    linear-gradient(rgba(243, 245, 240, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(243, 245, 240, 0.05) 1px, transparent 1px);
  background-size: 44px 44px;
}

/* ---- letreiro / marquee ---- */
@keyframes marquee-x {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
.marquee-track {
  animation: marquee-x 46s linear infinite;
  will-change: transform;
}
.marquee:hover .marquee-track {
  animation-play-state: paused;
}

/* ---- cursor do console ---- */
@keyframes blink-caret {
  0%,
  45% {
    opacity: 1;
  }
  50%,
  100% {
    opacity: 0;
  }
}
.caret-blink {
  animation: blink-caret 1.05s steps(1) infinite;
}

@keyframes pulse-dot {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.45;
    transform: scale(0.72);
  }
}
.pulse-dot {
  animation: pulse-dot 1.8s ease-in-out infinite;
}

/* ---- slider do simulador ---- */
input[type="range"].cq-range {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 4px;
  border-radius: 999px;
  background: linear-gradient(
    to right,
    var(--color-pine) 0%,
    var(--color-pine) var(--fill, 50%),
    rgba(243, 245, 240, 0.18) var(--fill, 50%),
    rgba(243, 245, 240, 0.18) 100%
  );
  outline: none;
}
input[type="range"].cq-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background: var(--color-paper);
  border: 3px solid var(--color-pine);
  cursor: grab;
  transition: transform 0.15s ease;
}
input[type="range"].cq-range::-webkit-slider-thumb:hover {
  transform: scale(1.15) rotate(45deg);
}
input[type="range"].cq-range::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 4px;
  background: var(--color-paper);
  border: 3px solid var(--color-pine);
  cursor: grab;
}

/* ---- acordeão ---- */
.acc-panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.45s cubic-bezier(0.22, 0.61, 0.36, 1);
}
.acc-panel.open {
  grid-template-rows: 1fr;
}
.acc-panel > div {
  overflow: hidden;
}

/* ---- sublinhado que desliza nos links ---- */
.link-slide {
  background-image: linear-gradient(currentColor, currentColor);
  background-size: 0% 1.5px;
  background-repeat: no-repeat;
  background-position: 0 100%;
  transition: background-size 0.3s ease;
}
.link-slide:hover {
  background-size: 100% 1.5px;
}

/* ---- movimento reduzido ---- */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  .marquee-track,
  .caret-blink,
  .pulse-dot {
    animation: none !important;
  }
  *,
  *::before,
  *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
```

---

## `src/App.tsx`

```tsx
import Ticker from "./components/Ticker";
import Header from "./components/Header";
import Opening from "./components/Opening";
import Process from "./components/Process";
import Specialists from "./components/Specialists";
import Cases from "./components/Cases";
import Curation from "./components/Curation";
import Governance from "./components/Governance";
import Simulator from "./components/Simulator";
import Faq from "./components/Faq";
import CtaForm from "./components/CtaForm";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-paper font-body text-ink antialiased">
      <div className="noise-overlay" aria-hidden="true" />
      <Ticker />
      <Header />
      <main>
        <Opening />
        <Process />
        <Specialists />
        <Cases />
        <Curation />
        <Governance />
        <Simulator />
        <Faq />
        <CtaForm />
      </main>
      <Footer />
    </div>
  );
}
```

---

## `src/data.ts`

```ts
export type Area =
  | "scoring"
  | "ifrs9"
  | "fraude"
  | "cobranca"
  | "basileia"
  | "open";

export const AREA_LABEL: Record<Area, string> = {
  scoring: "Credit Scoring",
  ifrs9: "IFRS 9 & ECL",
  fraude: "Fraude",
  cobranca: "Cobrança",
  basileia: "Basileia & Capital",
  open: "Open Finance & Dados",
};

export type Consultant = {
  id: string;
  initials: string;
  role: string;
  years: number;
  rate: number;
  area: Area;
  tags: string[];
  caseText: string;
  caseMetric: string;
  badges: string[];
};

export const CONSULTANTS: Consultant[] = [
  {
    id: "mr",
    initials: "M.R.",
    role: "Ex-Diretor de Risco · banco de varejo (top 5)",
    years: 22,
    rate: 480,
    area: "ifrs9",
    tags: ["IFRS 9", "SAS → Python", "Comitê de crédito"],
    caseText:
      "Reestruturou o motor de ECL em 3 estágios de um banco médio; provisionamento aceito pelo auditor externo sem ressalvas.",
    caseMetric: "0 ressalvas · R$ 2,8 bi modelados",
    badges: ["Comitê", "IFRS 9"],
  },
  {
    id: "ct",
    initials: "C.T.",
    role: "Cientista de Dados Sênior · originação",
    years: 11,
    rate: 320,
    area: "scoring",
    tags: ["XGBoost", "LightGBM", "MLOps"],
    caseText:
      "Rebuild do A-card de uma fintech de crédito pessoal: mais aprovação sem mover um milímetro da curva de inadimplência.",
    caseMetric: "+12 p.p. de aprovação · inadimplência estável",
    badges: ["Top match"],
  },
  {
    id: "ak",
    initials: "A.K.",
    role: "Atuária · capital regulatório",
    years: 15,
    rate: 410,
    area: "basileia",
    tags: ["Basileia III", "ICAAP", "Res. CMN 4.557"],
    caseText:
      "Implementou a esteira de ICAAP e os testes de estresse de um banco médio em transição de segmento prudencial.",
    caseMetric: "−9,4% de capital requerido após revisão",
    badges: ["Comitê"],
  },
  {
    id: "jp",
    initials: "J.P.",
    role: "Especialista em Fraude · tempo real",
    years: 9,
    rate: 300,
    area: "fraude",
    tags: ["Grafos", "Flink", "Regras + ML"],
    caseText:
      "Motor híbrido de regras e ML para varejista com financeira própria: decisão em tempo real na esteira do Pix.",
    caseMetric: "−41% de perdas por fraude em 90 dias",
    badges: [],
  },
  {
    id: "lm",
    initials: "L.M.",
    role: "Head de Collections · estratégia",
    years: 17,
    rate: 350,
    area: "cobranca",
    tags: ["Score de recuperação", "Réguas", "Negociação"],
    caseText:
      "Redesenhou réguas de contactabilidade e o score de cura de uma securitizadora com 3 carteiras compradas.",
    caseMetric: "+R$ 6,4 M recuperados por ano",
    badges: ["Comitê"],
  },
  {
    id: "rs",
    initials: "R.S.",
    role: "Data Scientist · dados alternativos",
    years: 8,
    rate: 260,
    area: "open",
    tags: ["Open Finance", "Cash-flow UW", "Python"],
    caseText:
      "Score de fluxo de caixa via Open Finance para MEIs sem histórico em bureau tradicional.",
    caseMetric: "38% dos aprovados eram thin file",
    badges: ["Top match"],
  },
  {
    id: "fb",
    initials: "F.B.",
    role: "Validação de Modelos · model risk",
    years: 14,
    rate: 390,
    area: "scoring",
    tags: ["SR 11-7", "Backtesting", "Champion/challenger"],
    caseText:
      "Programa de validação anual de 27 modelos de um banco múltiplo, com trilha de evidências pronta para o regulador.",
    caseMetric: "27 modelos · 0 apontamentos",
    badges: ["Comitê"],
  },
  {
    id: "dn",
    initials: "D.N.",
    role: "Engenheira de Dados · LGPD & clean rooms",
    years: 10,
    rate: 280,
    area: "open",
    tags: ["Clean rooms", "Anonimização", "dbt"],
    caseText:
      "Montou o ambiente de dados segregado para uma joint-venture de crédito: acesso temporário, zero extração, auditoria completa.",
    caseMetric: "100% dos acessos logados · 0 incidentes",
    badges: [],
  },
];

export type CaseStudy = {
  sector: string;
  title: string;
  period: string;
  desc: string;
  tags: string[];
  metrics: {
    end: number;
    decimals?: number;
    prefix?: string;
    suffix?: string;
    label: string;
  }[];
};

export const CASES: CaseStudy[] = [
  {
    sector: "Fintech · crédito pessoal",
    title: "Do zero ao A-card em produção",
    period: "9 semanas",
    desc: "Série B originando via marketplace e precificando no feeling. Amostragem, features de bureau e comportamento, A-card calibrado e política de cutoff com simulação de P&L por faixa.",
    tags: ["Python", "XGBoost", "AWS", "Política de cutoff"],
    metrics: [
      { end: 0.48, decimals: 2, label: "KS do modelo em produção" },
      { end: 19, suffix: " p.p.", label: "ganho de aprovação" },
      { end: 4, label: "meses de payback" },
    ],
  },
  {
    sector: "Banco médio · carteira PJ",
    title: "ECL IFRS 9 aceito em auditoria",
    period: "6 meses",
    desc: "Motor de expected credit loss em 3 estágios, SICR quantitativo e qualitativo, cenários macro ponderados e trilhas reprodutíveis de ponta a ponta para o auditor e para o BACEN.",
    tags: ["R + Python", "SQL", "Azure", "Res. CMN 4.966"],
    metrics: [
      { end: 2.8, decimals: 1, prefix: "R$ ", suffix: " bi", label: "de carteira sob ECL" },
      { end: 0, label: "ressalvas do auditor" },
      { end: 100, suffix: "%", label: "trilhas reprodutíveis" },
    ],
  },
  {
    sector: "Varejo · financeira própria",
    title: "Fraude sob controle no Pix",
    period: "12 semanas",
    desc: "Motor híbrido de regras e machine learning com análise de grafos, decisão síncrona no checkout e fila de revisão manual para casos limítrofes.",
    tags: ["Kafka", "Flink", "Grafos", "Checkout"],
    metrics: [
      { end: 41, prefix: "−", suffix: "%", label: "chargeback fraudulento" },
      { end: 200, prefix: "<", suffix: " ms", label: "latência de decisão" },
      { end: 9.2, decimals: 1, prefix: "R$ ", suffix: " M/ano", label: "perdas evitadas" },
    ],
  },
];

export const FUNNEL = [
  { label: "Aplicações recebidas no ano", value: 482 },
  { label: "Triagem de track record (carteira, regulação, entrega)", value: 311 },
  { label: "Prova técnica + entrevista de caso", value: 143 },
  { label: "Aprovados pelo comitê", value: 58 },
];

export const STEPS = [
  {
    num: "01",
    title: "Briefing estruturado",
    desc: "Um formulário guiado traduz sua dor para linguagem técnica: tamanho e tipo da carteira, stack atual, obrigações regulatórias e prazo. O NDA bilateral é gerado antes de qualquer dado sensível trocar de mãos.",
    tags: ["NDA automático", "15 minutos"],
  },
  {
    num: "02",
    title: "Curadoria & match",
    desc: "O comitê técnico cruza o briefing com o pool e devolve 2–3 nomes: cases cegos, aderência regulatória e match score. Você entrevista quem quiser; o comitê valida o escopo antes do kickoff.",
    tags: ["Shortlist em 72h", "2–3 nomes"],
  },
  {
    num: "03",
    title: "Contrato & escrow",
    desc: "Work-for-hire padrão, com propriedade intelectual transferida na quitação. O valor fica em escrow na plataforma e é liberado por marco aprovado — nunca adiantado, nunca no escuro.",
    tags: ["Marcos 30 / 40 / 30", "IP do cliente"],
  },
  {
    num: "04",
    title: "Entrega validada",
    desc: "Código versionado, documentação no padrão de model risk e backtesting contra base holdout. Aceite formal por marco e 30 dias de recalibração inclusa se a performance ficar abaixo do combinado.",
    tags: ["Backtesting", "30 dias de garantia"],
  },
];

export const TIMELINE = [
  { d: "D+0", e: "Briefing + NDA" },
  { d: "D+3", e: "Shortlist do comitê" },
  { d: "D+10", e: "Kickoff & escrow" },
  { d: "D+45", e: "Modelo em produção" },
];

export const GOVERNANCE: { icon: string; t: string; d: string }[] = [
  {
    icon: "nda",
    t: "NDA automático",
    d: "Bilateral e auditável, gerado em um clique antes do briefing completo. Cláusulas de confidencialidade e não-solicitação já calibradas para o setor financeiro.",
  },
  {
    icon: "escrow",
    t: "Escrow por marcos",
    d: "O cliente deposita, a plataforma custodia, o especialista recebe por entrega aprovada. Disputas vão para mediação técnica em até 10 dias úteis.",
  },
  {
    icon: "clean",
    t: "Data clean room",
    d: "Não hospedamos dados de crédito — nunca. O trabalho acontece em ambiente do cliente (AWS, Azure ou GCP), com credenciais temporárias e sem extração.",
  },
  {
    icon: "lgpd",
    t: "LGPD por desenho",
    d: "Cliente é controlador, especialista é operador. A plataforma audita bases legais e retenção; DPO dedicado responde em até 48 horas.",
  },
  {
    icon: "ip",
    t: "IP sem zona cinzenta",
    d: "Work-for-hire: código, pesos e documentação passam ao cliente na quitação. O especialista mantém o conhecimento tácito — e a reputação.",
  },
  {
    icon: "gauge",
    t: "Model risk embutido",
    d: "Entregas seguem trilha SR 11-7 e Res. CMN 4.557: inventário, backtesting, champion/challenger e plano de monitoramento pós-implantação.",
  },
];

export const FAQS = [
  {
    q: "E se cliente e especialista fecharem por fora?",
    a: "Acontece menos do que parece: 83% dos pares voltam para o segundo projeto pela plataforma, porque o valor real está no escrow, no contrato de IP e no ambiente seguro — não apenas no match. Ainda assim, os contratos incluem cláusula de não-solicitação de 12 meses.",
  },
  {
    q: "De quem é a propriedade intelectual do modelo?",
    a: "Do cliente, integralmente. Todo contrato nasce work-for-hire: com a quitação do escrow, código, documentação e pesos do modelo são transferidos. O especialista retém apenas o conhecimento tácito e o direito de citar o case de forma anonimizada.",
  },
  {
    q: "Como vocês garantem que o modelo é bom?",
    a: "Em três camadas: curadoria de entrada (12% de aprovação), escopo revisado pelo comitê técnico antes do kickoff e entrega com backtesting obrigatório contra base holdout. Se KS/Gini ficar abaixo do pactuado, há 30 dias de recalibração sem custo adicional.",
  },
  {
    q: "A CreditQuant acessa os dados da minha carteira?",
    a: "Não, e por princípio. O trabalho acontece em data clean room no ambiente do cliente, com credenciais temporárias, logs de acesso e zero extração. Nosso papel é a camada de talento, contrato e garantia — nunca a custódia de dados.",
  },
  {
    q: "Quanto tempo até o primeiro match?",
    a: "Shortlist com 2–3 nomes em até 72 horas úteis após o briefing. Kickoff típico em 10 dias, dependendo da disponibilidade do especialista e da esteira de NDA do cliente.",
  },
  {
    q: "O especialista pode atuar de forma anônima?",
    a: "Sim. Os perfis são cegos até o match: iniciais, cases sem nome de cliente e métricas comprováveis. Muitos são executivos em atividade — a identidade só é revelada após o NDA bilateral assinado.",
  },
];

export const TICKER = [
  "SELIC 12,25% a.a.",
  "CDI 12,14%",
  "IPCA 12M 4,83%",
  "INADIMPLÊNCIA PF (90D) 3,2%",
  "GINI MÉDIO DA REDE 0,63",
  "KS MEDIANO 0,41",
  "128 ESPECIALISTAS ATIVOS",
  "R$ 42,3M SOB ESCROW",
  "TEMPO MÉDIO DE MATCH 72H",
  "IFRS 9 · RES. CMN 4.966",
  "SR 11-7 · RES. 4.557",
  "LGPD · LEI 13.709/18",
];

export const TRUSTED = [
  "BANCO ALTURA",
  "nortecred",
  "Lumen Capital",
  "pague+",
  "ATLAS Seg",
  "Coop Cerrado",
  "vetta bank",
  "finan.",
];

export const BRIEF_CHALLENGES = [
  "Score de originação (A-card)",
  "Provisões IFRS 9 / ECL",
  "Motor antifraude",
  "Cobrança & recuperação",
  "Validação & model risk",
  "Open Finance / dados alternativos",
  "Outro desafio",
];

export const CONSULTANT_AREAS = [
  "Credit scoring",
  "IFRS 9 & provisionamento",
  "Fraude",
  "Cobrança",
  "Basileia & capital",
  "Engenharia de dados & LGPD",
];

export const PROJECT_TYPES = [
  { v: "score", label: "Score de originação", prazo: "8–10 semanas" },
  { v: "ifrs9", label: "Provisões IFRS 9 / ECL", prazo: "16–24 semanas" },
  { v: "fraude", label: "Motor antifraude", prazo: "10–14 semanas" },
  { v: "cobranca", label: "Cobrança & recuperação", prazo: "8–12 semanas" },
  { v: "validacao", label: "Validação de modelos", prazo: "6–8 semanas" },
];
```

---

## `src/motion.tsx`

```tsx
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export function useInView<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.15
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -48px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

export function Reveal({
  children,
  delay = 0,
  y = 26,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : `translateY(${y}px)`,
        transition: `opacity 0.85s cubic-bezier(0.22,0.61,0.36,1) ${delay}ms, transform 0.85s cubic-bezier(0.22,0.61,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export function CountUp({
  end,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1500,
  className = "",
}: {
  end: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const [ref, inView] = useInView<HTMLSpanElement>(0.4);
  const reduced = usePrefersReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setVal(end);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(end * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration, reduced]);

  const text = val.toLocaleString("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {text}
      {suffix}
    </span>
  );
}
```

---

## `src/components/icons.tsx`

```tsx
type P = { className?: string };

/** Marca: curva de distribuição de score + linha de cutoff */
export function LogoMark({ className = "" }: P) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <rect x="1.6" y="1.6" width="36.8" height="36.8" rx="9" stroke="currentColor" strokeWidth="2.6" />
      <path
        d="M8 28.5c5.2 0 5.6-15.5 12-15.5s6.8 15.5 12 15.5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path d="M26.5 8.5v20" stroke="currentColor" strokeWidth="2" strokeDasharray="2.6 3" strokeLinecap="round" />
    </svg>
  );
}

export function IconNda({ className = "" }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M6.5 3.5h7.2l3.8 3.8v9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 3.5v17h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.3 9h5M9.3 12h3.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="16.6" cy="17.4" r="2.6" stroke="currentColor" strokeWidth="1.7" />
      <path d="m15.6 22.4 1-2.2 1 2.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconEscrow({ className = "" }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 9.4V12l1.8 1.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.5 8h3M3.5 16h3M17.5 8h3M17.5 16h3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function IconCleanRoom({ className = "" }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 3 4.8 5.8v6c0 4.6 3 7.7 7.2 9.2 4.2-1.5 7.2-4.6 7.2-9.2v-6L12 3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M9 10.2h6M9 13.2h3.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="12" cy="8" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function IconLgpd({ className = "" }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 11a3 3 0 0 0-3 3c0 2.4-.4 4.4-1.2 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M15 14c0 2.6-.3 4.6-.9 6.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M6.3 8.6A7 7 0 0 1 19 14v1.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M4.6 11.4A10.4 10.4 0 0 1 8 6.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M12 17.6c-.1 1.2-.3 2.3-.7 3.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function IconIp({ className = "" }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="m14.5 4 5 5L9 19.5l-5.5 1 1-5.5L14.5 4Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="m12.5 6.5 5 5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M15 20.5h5.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function IconGauge({ className = "" }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 17a8.5 8.5 0 1 1 16 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="m12 17 4.2-6.3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="12" cy="17" r="1.4" fill="currentColor" />
      <path d="M4.8 13.5 6 14M19.2 13.5 18 14M12 6.5V8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function IconArrow({ className = "" }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M6.5 17.5 17.5 6.5M8.5 6.5h9v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconCheck({ className = "" }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="m5 12.8 4.2 4.2L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconPlus({ className = "" }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 5.5v13M5.5 12h13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
```

---

## `src/components/Ticker.tsx`

```tsx
import { TICKER } from "../data";

function Row() {
  return (
    <div className="flex shrink-0 items-center" aria-hidden="true">
      {TICKER.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="px-5 font-mono text-[11px] font-medium tracking-[0.14em] text-paper/70">
            {item}
          </span>
          <svg viewBox="0 0 8 8" className="h-1.5 w-1.5 text-pine" aria-hidden="true">
            <rect x="1" y="1" width="6" height="6" transform="rotate(45 4 4)" fill="currentColor" />
          </svg>
        </span>
      ))}
    </div>
  );
}

export default function Ticker() {
  return (
    <div className="marquee overflow-hidden border-b border-paper/10 bg-ink py-2.5">
      <div className="marquee-track flex w-max">
        <Row />
        <Row />
      </div>
    </div>
  );
}
```

---

## `src/components/Header.tsx`

```tsx
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
```

---

## `src/components/Opening.tsx`

```tsx
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
```

---

## `src/components/Process.tsx`

```tsx
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
```

---

## `src/components/Specialists.tsx`

```tsx
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
```

---

## `src/components/Cases.tsx`

```tsx
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
```

---

## `src/components/Curation.tsx`

```tsx
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
```

---

## `src/components/Governance.tsx`

```tsx
import type { ComponentType } from "react";
import { GOVERNANCE } from "../data";
import { Reveal } from "../motion";
import {
  IconCleanRoom,
  IconEscrow,
  IconGauge,
  IconIp,
  IconLgpd,
  IconNda,
} from "./icons";

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  nda: IconNda,
  escrow: IconEscrow,
  clean: IconCleanRoom,
  lgpd: IconLgpd,
  ip: IconIp,
  gauge: IconGauge,
};

export default function Governance() {
  return (
    <section id="governanca" className="bg-gridlines-dark relative overflow-hidden bg-ink text-paper">
      <div className="pointer-events-none absolute -left-32 bottom-0 h-[440px] w-[440px] rounded-full bg-amber/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mb-5 flex items-center gap-3 font-mono text-[11px] font-medium tracking-[0.22em] text-mint">
                <span className="inline-block h-2 w-2 bg-mint" />
                GOVERNANÇA & SEGURANÇA
              </p>
              <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
                Segurança não é feature. <br className="hidden sm:block" />
                É <span className="text-mint">pré-requisito</span>.
              </h2>
            </div>
            <p className="max-w-sm text-[14.5px] leading-relaxed text-paper/60">
              Em risco de crédito, a plataforma precisa ser a parte mais previsível do
              contrato. Estas são as regras da casa.
            </p>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-14 grid gap-px overflow-hidden border border-paper/15 bg-paper/15 sm:grid-cols-2 lg:grid-cols-3">
            {GOVERNANCE.map((g) => {
              const Icon = ICONS[g.icon];
              return (
                <div
                  key={g.t}
                  className="group bg-ink p-7 transition-colors duration-500 hover:bg-deep"
                >
                  <Icon className="h-7 w-7 text-mint transition-transform duration-500 group-hover:-translate-y-1" />
                  <h3 className="mt-5 font-display text-[18px] font-bold tracking-tight">{g.t}</h3>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-paper/60">{g.d}</p>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={250}>
          <div className="mt-10 flex flex-col gap-4 border border-amber/40 bg-amber/10 px-6 py-5 sm:flex-row sm:items-center">
            <IconCleanRoom className="h-8 w-8 shrink-0 text-amber" />
            <p className="font-mono text-[12.5px] leading-relaxed tracking-[0.04em] text-paper/80">
              A CreditQuant <strong className="text-amber">não hospeda nem processa dados de crédito</strong>.
              Somos a camada de talento, contrato e garantia entre o seu time e o especialista —
              os dados vivem no seu ambiente, sob as suas credenciais.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

---

## `src/components/Simulator.tsx`

```tsx
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
```

---

## `src/components/Faq.tsx`

```tsx
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
```

---

## `src/components/CtaForm.tsx`

```tsx
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
```

---

## `src/components/Footer.tsx`

```tsx
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
```

---

## Checklist pós-criação

- [ ] `npm run dev` sobe sem erros e as fontes carregam (Space Grotesk / IBM Plex Sans / IBM Plex Mono).
- [ ] Console de match digita, revela shortlist com match% animado e cicla 3 briefings.
- [ ] Filtros do pool de especialistas funcionam; botão "Solicitar acesso" vira "NDA enviado".
- [ ] Contadores dos cases animam ao entrar na viewport; barras do funil de curadoria também.
- [ ] Simulador recalcula fee, repasse e marcos de escrow ao mover o slider.
- [ ] Formulário valida e devolve protocolo; acordeão do FAQ abre/fecha.
- [ ] `prefers-reduced-motion` rende tudo estático e legível.
- [ ] `npm run build` finaliza sem erros de tipo.
