import './static-review.css';

const reviewDemos = [
  ['01', 'AI Sales Department', 'sales-department'],
  ['02', 'Self-Funding Flywheel', 'self-funding-flywheel'],
  ['03', 'AI Brain Manager', 'ai-brain'],
  ['05', 'Reinvestment Controls', 'reinvestment-controls'],
  ['07', 'Organic Lead Loop', 'organic-workflow'],
  ['08', 'Self-Funding Paid Loop', 'paid-ads-loop'],
] as const;

export function StaticReviewGallery() {
  const base = import.meta.env.BASE_URL;

  return (
    <main className="static-review">
      <header className="static-review__header">
        <div>
          <div className="eyebrow">Gate 2 · Static design review</div>
          <h1>Six production frames</h1>
        </div>
        <p>Each demo is shown at the same 16:9 recording size. Motion is intentionally paused.</p>
      </header>

      <div className="static-review__grid">
        {reviewDemos.map(([number, title, route]) => (
          <article className="static-review__item" key={route}>
            <div className="static-review__label">
              <span>Demo {number}</span>
              <strong>{title}</strong>
            </div>
            <div className="static-review__viewport">
              <iframe src={`${base}${route}/?frame=1`} title={`Demo ${number}: ${title}`} />
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
