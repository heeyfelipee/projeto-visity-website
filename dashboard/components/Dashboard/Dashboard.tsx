

import KPICards from './widgets/KPICards';
import BrazilMap from './BrazilMap';
import RecentActivities from './widgets/RecentActivities';
import AIExecutiveSummary from './widgets/AIExecutiveSummary';

import SubscriptionStatus from './widgets/SubscriptionStatus';
import ComplianceLogs from './widgets/ComplianceLogs';

export default function Dashboard() {
  const mapData = [
    { name: 'SP', value: 400 },
    { name: 'RJ', value: 200 },
    { name: 'MG', value: 150 }
  ];
  return (
    <section className="max-w-7xl mx-auto py-8 px-4">
      <KPICards />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <RecentActivities />
        <AIExecutiveSummary />
        <div className="md:col-span-1"><BrazilMap data={mapData} /></div>
      </div>
      <div className="mb-8">
        <SubscriptionStatus />
      </div>
      <div>
        <ComplianceLogs />
      </div>
    </section>
  );
}
