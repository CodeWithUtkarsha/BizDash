import { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { FlowingBackground } from '@/components/ui/background-effects';
import { CursorGlow } from '@/components/ui/background-effects';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  UserPlus, 
  Clock, 
  Eye, 
  MousePointerClick,
  Calendar
} from 'lucide-react';
import { userMetrics, userGrowthData, UserMetric } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';
import { useEffect } from 'react';

export default function UsersPage() {
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

  // Additional user data for charts
  const retentionData = [
    { name: 'Day 1', value: 100, retention: 100 },
    { name: 'Day 7', value: 68, retention: 68 },
    { name: 'Day 30', value: 45, retention: 45 },
    { name: 'Day 90', value: 32, retention: 32 },
  ];

  const segmentData = [
    { name: 'New Users', value: 35, users: 4380 },
    { name: 'Returning', value: 45, users: 5643 },
    { name: 'Loyal', value: 20, users: 2517 },
  ];

  const engagementData = [
    { name: 'Mon', value: 4.2, sessions: 1240 },
    { name: 'Tue', value: 3.8, sessions: 1180 },
    { name: 'Wed', value: 5.1, sessions: 1350 },
    { name: 'Thu', value: 4.7, sessions: 1290 },
    { name: 'Fri', value: 3.9, sessions: 1220 },
    { name: 'Sat', value: 2.8, sessions: 980 },
    { name: 'Sun', value: 2.4, sessions: 890 },
  ];

  const getMetricIcon = (metric: string) => {
    if (metric.includes('Active Users')) return Users;
    if (metric.includes('Session')) return Clock;
    if (metric.includes('Page Views')) return Eye;
    if (metric.includes('Bounce')) return MousePointerClick;
    if (metric.includes('Signup')) return UserPlus;
    return Users;
  };

  const getChangeColor = (change: number) => {
    return change > 0 ? 'text-green-400' : 'text-red-400';
  };

  return (
    <div className="min-h-screen relative">
      <FlowingBackground />
      <div className="relative z-10">
        <DashboardLayout>
          {/* Page Header */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">User Insights</h2>
              <p className="text-gray-400">Analyze user behavior and engagement patterns</p>
            </div>
          </motion.div>

          {/* User Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {userMetrics.map((metric, index) => {
              const Icon = getMetricIcon(metric.metric);
              
              return (
                <motion.div
                  key={metric.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <CursorGlow>
                    <Card 
                      data-testid={`card-metric-${metric.id}`}
                      className="glass-card hover-glow border-white/10 bg-white/5 backdrop-blur-xl"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-lg flex items-center justify-center">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <Badge 
                            className={`${getChangeColor(metric.change)} bg-transparent border-current`}
                          >
                            {metric.change > 0 ? '+' : ''}{metric.change}%
                          </Badge>
                        </div>
                        <h3 
                          data-testid={`text-metric-value-${metric.id}`}
                          className="text-2xl font-bold text-white mb-1"
                        >
                          {typeof metric.value === 'number' && metric.value > 1000 
                            ? metric.value.toLocaleString() 
                            : metric.value
                          }
                        </h3>
                        <p 
                          data-testid={`text-metric-label-${metric.id}`}
                          className="text-gray-400 text-sm font-medium"
                        >
                          {metric.metric}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{metric.period}</p>
                      </CardContent>
                    </Card>
                  </CursorGlow>
                </motion.div>
              );
            })}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <ChartCard
              title="User Growth Trends"
              data={userGrowthData}
              type="area"
              dataKey="newUsers"
              secondaryDataKey="returningUsers"
              color="#22d3ee"
              secondaryColor="#10b981"
              showTimeFilter={true}
            />
            <ChartCard
              title="User Retention"
              data={retentionData}
              type="line"
              dataKey="retention"
              color="#f59e0b"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* User Segments */}
            <CursorGlow>
              <Card className="glass-card hover-glow border-white/10 bg-white/5 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle 
                    data-testid="text-user-segments"
                    className="text-xl font-semibold text-white"
                  >
                    User Segments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {segmentData.map((segment, index) => (
                      <motion.div
                        key={segment.name}
                        data-testid={`segment-${segment.name.toLowerCase().replace(' ', '-')}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-white font-medium">{segment.name}</span>
                          <span className="text-gray-400 text-sm">{segment.value}%</span>
                        </div>
                        <Progress value={segment.value} className="h-2" />
                        <p className="text-xs text-gray-500">
                          {segment.users.toLocaleString()} users
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </CursorGlow>

            {/* Engagement Heatmap */}
            <div className="lg:col-span-2">
              <ChartCard
                title="Daily Engagement"
                data={engagementData}
                type="bar"
                dataKey="value"
                secondaryDataKey="sessions"
                color="#22d3ee"
                secondaryColor="#8b5cf6"
              />
            </div>
          </div>

          {/* User Activity Timeline */}
          <motion.div 
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <CursorGlow>
              <Card className="glass-card hover-glow border-white/10 bg-white/5 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle 
                    data-testid="text-user-activity"
                    className="text-xl font-semibold text-white flex items-center"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Recent User Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { user: 'Sarah Johnson', action: 'Completed onboarding', time: '2 minutes ago', type: 'signup' },
                      { user: 'Mike Chen', action: 'Updated profile settings', time: '15 minutes ago', type: 'update' },
                      { user: 'Emma Davis', action: 'Shared a report', time: '32 minutes ago', type: 'share' },
                      { user: 'Alex Rodriguez', action: 'Logged in from mobile', time: '1 hour ago', type: 'login' },
                      { user: 'Lisa Wang', action: 'Created new dashboard', time: '2 hours ago', type: 'create' },
                    ].map((activity, index) => (
                      <motion.div
                        key={index}
                        data-testid={`activity-${index}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                          {activity.user.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-medium text-sm">
                            {activity.user} {activity.action}
                          </p>
                          <p className="text-gray-400 text-xs">{activity.time}</p>
                        </div>
                        <Badge 
                          variant="outline" 
                          className="text-xs text-cyan-400 border-cyan-400/30"
                        >
                          {activity.type}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </CursorGlow>
          </motion.div>
        </DashboardLayout>
      </div>
    </div>
  );
}