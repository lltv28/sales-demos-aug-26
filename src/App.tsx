import { AiBrainDemo } from './demos/ai-brain/AiBrainDemo';
import { OrganicWorkflowDemo } from './demos/organic-workflow/OrganicWorkflowDemo';
import { PaidAdsLoop } from './demos/paid-ads-loop/PaidAdsLoop';
import { ReinvestmentControls } from './demos/reinvestment-controls/ReinvestmentControls';
import { SalesDepartmentDemo } from './demos/sales-department/SalesDepartmentDemo';
import { SelfFundingFlywheel } from './demos/self-funding-flywheel/SelfFundingFlywheel';
import { StoryboardGallery } from './storyboards/StoryboardGallery';
import { StaticReviewGallery } from './review/StaticReviewGallery';

const demos = [
  ['sales-department', '01', 'AI Sales Department', 'AI salespeople qualify and close leads around the clock.'],
  ['self-funding-flywheel', '02', 'Self-Funding Flywheel', 'AI Triager and offer revenue funds the next lead.'],
  ['ai-brain', '03', 'AI Brain Manager', 'Everything about the business trains one sales brain.'],
  ['reinvestment-controls', '05', 'Reinvestment Controls', 'Every offer follows a clear paid-marketing rule.'],
  ['organic-workflow', '07', 'Organic Lead Loop', 'Content captures interest and creates qualified buyers.'],
  ['paid-ads-loop', '08', 'Self-Funding Paid Loop', 'Sales revenue pays for the next ad cycle.'],
] as const;

function Launcher() {
  return (
    <main className="launcher">
      <div className="eyebrow">Kodara</div>
      <h1>Sales presentation demos</h1>
      <p>Six automatic, business-neutral demonstrations built for recording and slide embedding.</p>
      <div className="launcher-grid">
        {demos.map(([path, number, title, description]) => (
          <a className="launcher-card surface" href={`${import.meta.env.BASE_URL}${path}/`} key={path}>
            <div className="micro-label">Demo {number}</div>
            <strong>{title}</strong>
            <span>{description}</span>
          </a>
        ))}
      </div>
    </main>
  );
}

export function App() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const pathname = window.location.pathname.replace(base, '').replace(/^\/+|\/+$/g, '');
  if (pathname === 'storyboards') return <StoryboardGallery />;
  if (pathname === 'static-review') return <StaticReviewGallery />;
  if (pathname === 'sales-department') return <SalesDepartmentDemo />;
  if (pathname === 'self-funding-flywheel') return <SelfFundingFlywheel />;
  if (pathname === 'ai-brain') return <AiBrainDemo />;
  if (pathname === 'reinvestment-controls') return <ReinvestmentControls />;
  if (pathname === 'organic-workflow') return <OrganicWorkflowDemo />;
  if (pathname === 'paid-ads-loop') return <PaidAdsLoop />;
  return <Launcher key={pathname} />;
}
