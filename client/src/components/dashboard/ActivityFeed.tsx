import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CursorGlow } from '@/components/ui/background-effects';
import { ActivityItem } from '@/data/mockData';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { dashboardApi } from '@/services/api';

export const ActivityFeed = () => {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load initial activity data
    const loadActivities = async () => {
      try {
        const response = await dashboardApi.getActivity();
        const transformedActivities: ActivityItem[] = response.activities.map(activity => ({
          id: activity.id,
          user: activity.user,
          action: activity.action,
          amount: activity.amount ? `$${activity.amount.toLocaleString()}` : '',
          timestamp: new Date(activity.time).toLocaleTimeString(),
          type: activity.type as ActivityItem['type']
        }));
        setActivities(transformedActivities);
      } catch (error) {
        console.error('Failed to load activities:', error);
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    loadActivities();

    // Set up periodic refresh every 30 seconds
    const interval = setInterval(loadActivities, 30000);

    return () => clearInterval(interval);
  }, []);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  const getAvatarColor = (type: ActivityItem['type']) => {
    const colors = {
      purchase: 'from-cyan-400 to-cyan-500',
      signup: 'from-purple-400 to-purple-500',
      review: 'from-orange-400 to-orange-500',
      upgrade: 'from-green-400 to-green-500',
      onboarding: 'from-blue-400 to-blue-500'
    };
    return colors[type] || colors.purchase;
  };

  const getAmountColor = (type: ActivityItem['type']) => {
    const colors = {
      purchase: 'text-green-400',
      signup: 'text-cyan-400',
      review: 'text-yellow-400',
      upgrade: 'text-green-400',
      onboarding: 'text-blue-400'
    };
    return colors[type] || colors.purchase;
  };

  return (
    <CursorGlow>
      <Card className="glass-card hover-glow border-white/10 bg-white/5 backdrop-blur-xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle 
              data-testid="text-activity-title"
              className="text-xl font-semibold text-white"
            >
              Real-time Activity
            </CardTitle>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-gray-400">Live</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div 
            data-testid="activity-feed"
            className="space-y-4 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
          >
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-gray-400">Loading activities...</div>
              </div>
            ) : activities.length === 0 ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-gray-400">No recent activity</div>
              </div>
            ) : (
              <AnimatePresence>
                {activities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    data-testid={`activity-item-${activity.id}`}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className={`bg-gradient-to-r ${getAvatarColor(activity.type)} text-white font-medium text-sm`}>
                        {getInitials(activity.user)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p 
                        data-testid={`text-activity-description-${activity.id}`}
                        className="text-white text-sm"
                      >
                        <span className="font-medium">{activity.user}</span> {activity.action}
                      </p>
                      <p 
                        data-testid={`text-activity-timestamp-${activity.id}`}
                        className="text-gray-400 text-xs"
                      >
                        {activity.timestamp}
                      </p>
                    </div>
                    <div 
                      data-testid={`text-activity-amount-${activity.id}`}
                      className={`font-medium text-sm ${getAmountColor(activity.type)} flex-shrink-0`}
                    >
                      {activity.amount}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </CardContent>
      </Card>
    </CursorGlow>
  );
};
