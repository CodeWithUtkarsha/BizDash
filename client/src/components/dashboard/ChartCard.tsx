import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CursorGlow } from '@/components/ui/background-effects';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartDataPoint } from '@/data/mockData';

interface ChartCardProps {
  title: string;
  data: ChartDataPoint[];
  type: 'line' | 'area' | 'bar';
  dataKey: string;
  color?: string;
  secondaryDataKey?: string;
  secondaryColor?: string;
  showTimeFilter?: boolean;
}

export const ChartCard = ({ 
  title, 
  data, 
  type, 
  dataKey, 
  color = '#22d3ee',
  secondaryDataKey,
  secondaryColor = '#10b981',
  showTimeFilter = false 
}: ChartCardProps) => {
  
  const formatTooltipValue = (value: any) => {
    if (dataKey.includes('revenue') || dataKey.includes('Revenue')) {
      return `$${value?.toLocaleString()}`;
    }
    return value?.toLocaleString();
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/95 border border-white/10 rounded-lg p-3 backdrop-blur-sm">
          <p className="text-white font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {formatTooltipValue(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 20, right: 30, left: 20, bottom: 5 }
    };

    switch (type) {
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" tickFormatter={(value) => dataKey.includes('revenue') ? `$${value/1000}K` : value} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              fillOpacity={1}
              fill="url(#colorRevenue)"
              strokeWidth={2}
              animationDuration={2000}
            />
          </AreaChart>
        );
      
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey={dataKey} fill={color} radius={6} animationDuration={2000} />
            {secondaryDataKey && (
              <Bar dataKey={secondaryDataKey} fill={secondaryColor} radius={6} animationDuration={2000} />
            )}
          </BarChart>
        );
      
      default: // line
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" tickFormatter={(value) => dataKey.includes('revenue') ? `$${value/1000}K` : value} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              dot={{ fill: color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
              animationDuration={2000}
            />
          </LineChart>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <CursorGlow>
        <Card className="glass-card hover-glow border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle 
                data-testid={`text-chart-title-${title.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-xl font-semibold text-white"
              >
                {title}
              </CardTitle>
              {showTimeFilter && (
                <div className="flex space-x-2">
                  <Button
                    data-testid="button-filter-7d"
                    size="sm"
                    className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-sm rounded-lg hover:bg-cyan-500/30 transition-colors"
                  >
                    7D
                  </Button>
                  <Button
                    data-testid="button-filter-30d"
                    variant="ghost"
                    size="sm"
                    className="px-3 py-1 bg-white/5 text-gray-400 text-sm rounded-lg hover:bg-white/10 transition-colors"
                  >
                    30D
                  </Button>
                  <Button
                    data-testid="button-filter-90d"
                    variant="ghost"
                    size="sm"
                    className="px-3 py-1 bg-white/5 text-gray-400 text-sm rounded-lg hover:bg-white/10 transition-colors"
                  >
                    90D
                  </Button>
                </div>
              )}
            </div>
            {secondaryDataKey && (
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-sm text-gray-400">New Users</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: secondaryColor }} />
                  <span className="text-sm text-gray-400">Returning</span>
                </div>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                {renderChart()}
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </CursorGlow>
    </motion.div>
  );
};
