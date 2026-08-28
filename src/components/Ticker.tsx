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
