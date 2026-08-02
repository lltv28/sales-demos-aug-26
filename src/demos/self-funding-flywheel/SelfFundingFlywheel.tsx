import { DemoStage } from '../../components/DemoStage';
import './self-funding-flywheel.css';

function RevenueToken({ children }: { children: string }) {
  return <span className="flywheel-money-token">{children}</span>;
}

export function SelfFundingFlywheel() {
  return (
    <DemoStage
      eyebrow="The Self-Funding Flywheel"
      title="Revenue brings the next buyer in."
      subtitle="Triagers create the first sale. The salesperson makes the main offer. Revenue returns to ads."
    >
      <div className="flywheel-map">
        <svg className="flywheel-map__connectors" viewBox="0 0 1456 633" aria-hidden="true">
          <defs>
            <marker id="flywheel-buyer-arrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
              <path d="M0 0 L9 4.5 L0 9 Z" />
            </marker>
            <marker id="flywheel-revenue-arrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
              <path d="M0 0 L9 4.5 L0 9 Z" />
            </marker>
          </defs>

          <path className="flywheel-path flywheel-path--buyer" d="M153 255 C156 220 205 186 270 185" />
          <path className="flywheel-path flywheel-path--buyer" d="M450 120 C477 120 488 115 515 115" />
          <path className="flywheel-path flywheel-path--buyer" d="M795 115 C820 115 835 120 860 120" />
          <path className="flywheel-path flywheel-path--buyer" d="M1110 110 C1150 112 1166 215 1190 265" />
          <path className="flywheel-path flywheel-path--buyer" d="M1110 150 C1150 176 1135 392 1160 425" />

          <path className="flywheel-path flywheel-path--revenue" d="M655 190 C620 229 465 222 465 382 C465 500 642 535 770 535" />
          <path className="flywheel-path flywheel-path--revenue" d="M1299 320 C1299 420 1188 494 1090 510" />
          <path className="flywheel-path flywheel-path--revenue" d="M1284 485 C1260 550 1165 572 1090 555" />
          <path className="flywheel-path flywheel-path--revenue flywheel-path--return" d="M770 570 C630 592 170 592 88 565 C42 526 40 410 48 330" />
        </svg>

        <section className="flywheel-card flywheel-card--ads">
          <div className="flywheel-card__icon flywheel-card__icon--ads">AD</div>
          <div>
            <span className="flywheel-card__kicker">Start here</span>
            <h2>Paid Ads</h2>
            <p>New prospects</p>
          </div>
        </section>

        <section className="flywheel-card flywheel-card--triagers">
          <div className="flywheel-triager-cluster" aria-hidden="true">
            {Array.from({ length: 6 }, (_, index) => <i key={index}>AI</i>)}
          </div>
          <div>
            <span className="flywheel-card__kicker">First sale</span>
            <h2>AI Triagers</h2>
            <p>Sell the $17 assessment</p>
          </div>
        </section>

        <section className="flywheel-card flywheel-card--assessment">
          <span className="flywheel-card__kicker">Paid first step</span>
          <h2>$17 Assessment</h2>
          <p>Personalized plan delivered</p>
          <RevenueToken>$17 revenue</RevenueToken>
          <div className="flywheel-buyer-token">
            <i aria-hidden="true" />
            <span>Paid buyer</span>
          </div>
        </section>

        <section className="flywheel-card flywheel-card--salesperson">
          <div className="flywheel-card__icon flywheel-card__icon--sales">AI</div>
          <div>
            <span className="flywheel-card__kicker">Main offer first</span>
            <h2>AI Salesperson</h2>
            <p>Offers Main Service</p>
          </div>
        </section>

        <section className="flywheel-card flywheel-card--service">
          <span className="flywheel-card__kicker">Ready</span>
          <h2>Main Service Sold</h2>
          <RevenueToken>Main revenue</RevenueToken>
        </section>

        <section className="flywheel-card flywheel-card--pocket">
          <span className="flywheel-card__kicker">Not ready / not qualified</span>
          <h2>Pocket Coach</h2>
          <RevenueToken>Pocket revenue</RevenueToken>
        </section>

        <section className="flywheel-controller">
          <span className="flywheel-controller__mark">AI</span>
          <span className="flywheel-card__kicker">System controller</span>
          <h2>Brain + Manager</h2>
          <p>Protects the offer order and applies the reinvestment rule.</p>
        </section>

        <section className="flywheel-revenue">
          <span className="flywheel-card__kicker">All three sales converge here</span>
          <div className="flywheel-revenue__row">
            <h2>Revenue</h2>
            <span>Funds Paid Ads</span>
          </div>
          <div className="flywheel-revenue__sources">
            <span>$17</span>
            <span>Main sold</span>
            <span>Pocket</span>
          </div>
        </section>

        <div className="flywheel-return-label">Revenue funds the next cycle</div>
      </div>
    </DemoStage>
  );
}
