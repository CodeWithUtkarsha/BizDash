import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CursorGlow } from '@/components/ui/background-effects';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { topPerformers } from '@/data/mockData';

export const TopPerformers = () => {
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
            {topPerformers.map((performer, index) => (
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
                      {performer.value}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p 
                    data-testid={`text-performer-change-${performer.id}`}
                    className={`text-sm font-medium flex items-center ${
                      performer.trend === 'up' ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {performer.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 mr-1" />
                    )}
                    {performer.change > 0 ? '+' : ''}{performer.change}%
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </CursorGlow>
  );
};
