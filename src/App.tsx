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
