import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { KPICard } from '@/components/dashboard/KPICard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { TopPerformers } from '@/components/dashboard/TopPerformers';
import { FlowingBackground } from '@/components/ui/background-effects';
import { kpiData, revenueChartData, userGrowthData } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen relative">
      <FlowingBackground />
      <div className="relative z-10">
        <DashboardLayout>
          
          {/* Dashboard Header */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h2>
            <p className="text-gray-400">Real-time business analytics and insights</p>
          </motion.div>

          {/* KPI Cards Grid */}
          <div 
            data-testid="kpi-grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {kpiData.map((kpi, index) => (
              <KPICard key={kpi.id} kpi={kpi} index={index} />
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <ChartCard
              title="Revenue Trends"
              data={revenueChartData}
              type="area"
              dataKey="revenue"
              color="#22d3ee"
              showTimeFilter={true}
            />
            <ChartCard
              title="User Growth"
              data={userGrowthData}
              type="bar"
              dataKey="newUsers"
              secondaryDataKey="returningUsers"
              color="#22d3ee"
              secondaryColor="#10b981"
            />
          </div>

          {/* Real-time Activity and Top Performers */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ActivityFeed />
            </div>
            <div>
              <TopPerformers />
            </div>
          </div>
        </DashboardLayout>
      </div>
    </div>
  );
}
