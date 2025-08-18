import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { KPICard } from '@/components/dashboard/KPICard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { TopPerformers } from '@/components/dashboard/TopPerformers';
import { FlowingBackground } from '@/components/ui/background-effects';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';
import { useEffect, useState } from 'react';
import { dashboardApi } from '@/services/api';
import { KPIData, ChartDataPoint } from '@/data/mockData';

export default function DashboardPage() {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const [kpiData, setKpiData] = useState<KPIData[]>([]);
  const [revenueChartData, setRevenueChartData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }

    // Load dashboard data
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        
        // Load KPIs and revenue chart data in parallel
        const [kpisResponse, revenueResponse] = await Promise.all([
          dashboardApi.getKPIs(),
          dashboardApi.getRevenueChart()
        ]);
        
        // Transform API data to match component expectations
        const transformedKPIs: KPIData[] = kpisResponse.kpis.map(kpi => ({
          id: kpi.id,
          title: kpi.value, // API returns formatted value like "$124,592"
          label: kpi.title, // API returns title like "Total Revenue"
          value: kpi.value.replace(/[^0-9]/g, ''), // Extract numeric value
          change: kpi.change,
          trend: kpi.trend,
          icon: kpi.icon,
          color: kpi.color
        }));

        const transformedChartData: ChartDataPoint[] = revenueResponse.chartData.map(item => ({
          name: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          value: item.revenue,
          revenue: item.revenue
        }));
        
        setKpiData(transformedKPIs);
        setRevenueChartData(transformedChartData);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
        // Fallback to empty arrays to prevent crashes
        setKpiData([]);
        setRevenueChartData([]);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen relative">
        <FlowingBackground />
        <div className="relative z-10">
          <DashboardLayout>
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-white text-xl">Loading dashboard...</div>
            </div>
          </DashboardLayout>
        </div>
      </div>
    );
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
              data={[
                { name: 'Jan', value: 100, newUsers: 100, returningUsers: 0 },
                { name: 'Feb', value: 150, newUsers: 120, returningUsers: 30 },
                { name: 'Mar', value: 200, newUsers: 140, returningUsers: 60 },
                { name: 'Apr', value: 250, newUsers: 160, returningUsers: 90 },
                { name: 'May', value: 300, newUsers: 180, returningUsers: 120 },
                { name: 'Jun', value: 350, newUsers: 200, returningUsers: 150 }
              ]}
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
