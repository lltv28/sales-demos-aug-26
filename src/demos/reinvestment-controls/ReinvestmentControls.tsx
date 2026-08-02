import type { CSSProperties } from 'react';
import { DemoSurface } from '../../components/DemoPrimitives';
import { DemoStage } from '../../components/DemoStage';
import { useDemoLoop } from '../../hooks/useDemoLoop';
import './reinvestment-controls.css';

const REINVESTMENT_BEAT_DURATIONS = [600, 900, 1300, 1300, 1300, 2700] as const;

const PRODUCTS = [
  { name: '$8 Assessment', rate: 100 },
  { name: '$99 Online Course', rate: 50 },
  { name: '$199 AI Pocket Coach', rate: 25 },
] as const;

type SliderStyle = CSSProperties & { '--reinvestment-target-rate': string };

export function ReinvestmentControls() {
  const phase = useDemoLoop(REINVESTMENT_BEAT_DURATIONS);

  return (
    <DemoStage
      eyebrow="Reinvestment controls"
      title="Choose how much each product funds growth"
      subtitle="Set a separate reinvestment rate for every offer."
    >
      <DemoSurface
        className={`rc-static rc-static--phase-${phase + 1}`}
        aria-label="Product reinvestment controls"
        data-loop-beats={REINVESTMENT_BEAT_DURATIONS.join(',')}
      >
        <div className="rc-static__heading">
          <span>Product</span>
          <span>Revenue reinvested</span>
        </div>

        <div className="rc-static__rows">
          {PRODUCTS.map((product, index) => {
            const completedState = phase === 0 || phase === REINVESTMENT_BEAT_DURATIONS.length - 1;
            const rowHasFilled = phase >= 2 && phase - 2 >= index;
            const currentRate = completedState || rowHasFilled ? product.rate : 0;

            return (
              <article className="rc-static__row" key={product.name}>
                <div className="rc-static__product">
                  <span className="rc-static__product-mark" aria-hidden="true">$</span>
                  <strong>{product.name}</strong>
                </div>

                <div className="rc-static__control">
                  <div
                    className="rc-static__slider"
                    role="slider"
                    aria-label={`${product.name} revenue reinvested`}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={currentRate}
                    style={{ '--reinvestment-target-rate': `${product.rate}%` } as SliderStyle}
                  >
                    <div className="rc-static__track">
                      <div className="rc-static__fill" />
                      <span className="rc-static__thumb"><b>{currentRate}%</b></span>
                    </div>
                  </div>
                  <div className="rc-static__endpoints" aria-hidden="true">
                    <span>0%</span>
                    <span>100%</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </DemoSurface>
    </DemoStage>
  );
}

export default ReinvestmentControls;
