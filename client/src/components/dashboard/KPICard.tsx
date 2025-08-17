import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { CursorGlow } from '@/components/ui/background-effects';
import { TrendingUp, TrendingDown, DollarSign, Users, Target, BarChart } from 'lucide-react';
import { KPIData } from '@/data/mockData';

interface KPICardProps {
  kpi: KPIData;
  index: number;
}

const iconMap = {
  dollar: DollarSign,
  users: Users,
  target: Target,
  trending: BarChart,
};

export const KPICard = ({ kpi, index }: KPICardProps) => {
  const Icon = iconMap[kpi.icon as keyof typeof iconMap] || DollarSign;
  const TrendIcon = kpi.trend === 'up' ? TrendingUp : TrendingDown;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <CursorGlow>
        <Card 
          data-testid={`card-kpi-${kpi.id}`}
          className="glass-card hover-glow border-white/10 bg-white/5 backdrop-blur-xl"
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <motion.div 
                className={`w-12 h-12 bg-gradient-to-r ${kpi.color} rounded-lg flex items-center justify-center`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon className="w-6 h-6 text-white" />
              </motion.div>
              <span 
                data-testid={`text-change-${kpi.id}`}
                className={`text-sm font-medium flex items-center ${
                  kpi.trend === 'up' ? 'text-green-400' : 'text-red-400'
                }`}
              >
                <TrendIcon className="w-4 h-4 mr-1" />
                {Math.abs(kpi.change)}%
              </span>
            </div>
            <h3 
              data-testid={`text-value-${kpi.id}`}
              className="text-2xl font-bold text-white mb-1"
            >
              {kpi.title}
            </h3>
            <p 
              data-testid={`text-label-${kpi.id}`}
              className="text-gray-400 text-sm"
            >
              {kpi.label}
            </p>
          </CardContent>
        </Card>
      </CursorGlow>
    </motion.div>
  );
};
