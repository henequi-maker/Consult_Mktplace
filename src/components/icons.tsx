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
