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
