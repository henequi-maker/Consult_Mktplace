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
