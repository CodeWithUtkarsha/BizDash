import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CursorGlow } from '@/components/ui/background-effects';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { dashboardApi } from '@/services/api';

interface Performer {
  id: string;
  name: string;
  rank: number;
  revenue: number;
  orders: number;
  change: number;
}

export const TopPerformers = () => {
  const [performers, setPerformers] = useState<Performer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTopPerformers = async () => {
      try {
        const response = await dashboardApi.getTopPerformers();
        setPerformers(response.topPerformers);
      } catch (error) {
        console.error('Failed to load top performers:', error);
        setPerformers([]);
      } finally {
        setLoading(false);
      }
    };

    loadTopPerformers();
  }, []);
  const getRankColor = (rank: number) => {
    const colors = {
      1: 'from-yellow-400 to-yellow-500',
      2: 'from-gray-400 to-gray-500',
      3: 'from-orange-400 to-orange-500'
    };
    return colors[rank as keyof typeof colors] || 'from-gray-400 to-gray-500';
  };

  return (
    <CursorGlow>
      <Card className="glass-card hover-glow border-white/10 bg-white/5 backdrop-blur-xl">
        <CardHeader className="pb-4">
          <CardTitle 
            data-testid="text-performers-title"
            className="text-xl font-semibold text-white"
          >
            Top Performers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-gray-400">Loading performers...</div>
              </div>
            ) : performers.length === 0 ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-gray-400">No performers data</div>
              </div>
            ) : (
              performers.map((performer, index) => (
              <motion.div
                key={performer.id}
                data-testid={`performer-item-${performer.id}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className={`w-8 h-8 bg-gradient-to-r ${getRankColor(performer.rank)} rounded-full flex items-center justify-center text-white text-sm font-bold`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {performer.rank}
                  </motion.div>
                  <div>
                    <p 
                      data-testid={`text-performer-name-${performer.id}`}
                      className="text-white font-medium"
                    >
                      {performer.name}
                    </p>
                    <p 
                      data-testid={`text-performer-value-${performer.id}`}
                      className="text-gray-400 text-sm"
                    >
                      ${performer.revenue.toLocaleString()} ({performer.orders} orders)
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p 
                    data-testid={`text-performer-change-${performer.id}`}
                    className={`text-sm font-medium flex items-center ${
                      performer.change >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {performer.change >= 0 ? (
                      <TrendingUp className="w-4 h-4 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 mr-1" />
                    )}
                    {performer.change > 0 ? '+' : ''}{performer.change.toFixed(1)}%
                  </p>
                </div>
              </motion.div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </CursorGlow>
  );
};
