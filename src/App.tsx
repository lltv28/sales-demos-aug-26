import { AiBrainDemo } from './demos/ai-brain/AiBrainDemo';
import { OrganicWorkflowDemo } from './demos/organic-workflow/OrganicWorkflowDemo';
import { PaidAdsLoop } from './demos/paid-ads-loop/PaidAdsLoop';
import { ReinvestmentControls } from './demos/reinvestment-controls/ReinvestmentControls';
import { SalesDepartmentDemo } from './demos/sales-department/SalesDepartmentDemo';
import { SelfFundingFlywheel } from './demos/self-funding-flywheel/SelfFundingFlywheel';

const demos = [
  ['sales-department', '01', 'AI Sales Department', 'One brain coordinating many conversations.'],
  ['self-funding-flywheel', '02', 'Self-Funding Flywheel', 'Every sale helps fund the next customer.'],
  ['ai-brain', '03', 'AI Brain + Manager', 'Your business knowledge becomes the operating brain.'],
  ['reinvestment-controls', '05', 'Reinvestment Controls', 'Growth and profit remain under clear rules.'],
  ['organic-workflow', '07', 'Organic Workflow', 'One weekly content engine from idea to assessment.'],
  ['paid-ads-loop', '08', 'Paid Ads Loop', 'Paid advertising learns and improves every cycle.'],
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
  if (pathname === 'sales-department') return <SalesDepartmentDemo />;
  if (pathname === 'self-funding-flywheel') return <SelfFundingFlywheel />;
  if (pathname === 'ai-brain') return <AiBrainDemo />;
  if (pathname === 'reinvestment-controls') return <ReinvestmentControls />;
  if (pathname === 'organic-workflow') return <OrganicWorkflowDemo />;
  if (pathname === 'paid-ads-loop') return <PaidAdsLoop />;
  return <Launcher key={pathname} />;
}
