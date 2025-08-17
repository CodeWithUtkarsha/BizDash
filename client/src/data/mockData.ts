export interface KPIData {
  id: string;
  title: string;
  value: string;
  label: string;
  change: number;
  trend: 'up' | 'down';
  icon: string;
  color: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  revenue?: number;
  newUsers?: number;
  returningUsers?: number;
}

export interface ActivityItem {
  id: string;
  user: string;
  action: string;
  amount: string;
  timestamp: string;
  type: 'purchase' | 'signup' | 'review' | 'upgrade' | 'onboarding';
}

export interface PerformerItem {
  id: string;
  rank: number;
  name: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
}

export const kpiData: KPIData[] = [
  {
    id: '1',
    title: '$124,592',
    label: 'Total Revenue',
    value: '124592',
    change: 12.5,
    trend: 'up',
    icon: 'dollar',
    color: 'from-cyan-400 to-cyan-500'
  },
  {
    id: '2',
    title: '1,429',
    label: 'Active Users',
    value: '1429',
    change: 8.2,
    trend: 'up',
    icon: 'users',
    color: 'from-green-400 to-green-500'
  },
  {
    id: '3',
    title: '98.2%',
    label: 'Conversion Rate',
    value: '98.2',
    change: -3.1,
    trend: 'down',
    icon: 'target',
    color: 'from-purple-400 to-purple-500'
  },
  {
    id: '4',
    title: '2.4K',
    label: 'Orders Today',
    value: '2400',
    change: 15.3,
    trend: 'up',
    icon: 'trending',
    color: 'from-orange-400 to-orange-500'
  }
];

export const revenueChartData: ChartDataPoint[] = [
  { name: 'Jan', revenue: 65000 },
  { name: 'Feb', revenue: 78000 },
  { name: 'Mar', revenue: 85000 },
  { name: 'Apr', revenue: 92000 },
  { name: 'May', revenue: 88000 },
  { name: 'Jun', revenue: 96000 },
  { name: 'Jul', revenue: 124592 },
];

export const userGrowthData: ChartDataPoint[] = [
  { name: 'Week 1', newUsers: 320, returningUsers: 580 },
  { name: 'Week 2', newUsers: 410, returningUsers: 640 },
  { name: 'Week 3', newUsers: 385, returningUsers: 720 },
  { name: 'Week 4', newUsers: 429, returningUsers: 690 },
];

export const topPerformers: PerformerItem[] = [
  {
    id: '1',
    rank: 1,
    name: 'Premium Plan',
    value: '$2,450 revenue',
    change: 18,
    trend: 'up'
  },
  {
    id: '2',
    rank: 2,
    name: 'Basic Plan',
    value: '$1,890 revenue',
    change: 12,
    trend: 'up'
  },
  {
    id: '3',
    rank: 3,
    name: 'Enterprise',
    value: '$1,240 revenue',
    change: -3,
    trend: 'down'
  }
];

// Function to generate random activities for real-time simulation
export const generateRandomActivity = (): ActivityItem => {
  const users = ['John Doe', 'Sarah Miller', 'Mike Johnson', 'Emily Chen', 'David Wilson', 'Lisa Brown', 'Tom Anderson', 'Nina Rodriguez'];
  const actions = [
    { text: 'completed a purchase', amount: () => `$${(Math.random() * 500 + 50).toFixed(2)}`, type: 'purchase' as const },
    { text: 'signed up for premium', amount: () => 'Premium', type: 'signup' as const },
    { text: 'left a 5-star review', amount: () => '★★★★★', type: 'review' as const },
    { text: 'upgraded subscription', amount: () => `$${(Math.random() * 300 + 100).toFixed(2)}`, type: 'upgrade' as const },
    { text: 'completed onboarding', amount: () => 'New User', type: 'onboarding' as const }
  ];

  const user = users[Math.floor(Math.random() * users.length)];
  const action = actions[Math.floor(Math.random() * actions.length)];

  return {
    id: Math.random().toString(36).substr(2, 9),
    user,
    action: action.text,
    amount: action.amount(),
    timestamp: 'Just now',
    type: action.type
  };
};

export let mockActivities: ActivityItem[] = [
  {
    id: '1',
    user: 'John Doe',
    action: 'completed a purchase',
    amount: '$129.99',
    timestamp: '2 minutes ago',
    type: 'purchase'
  },
  {
    id: '2',
    user: 'Sarah Miller',
    action: 'signed up for premium',
    amount: 'Premium',
    timestamp: '5 minutes ago',
    type: 'signup'
  },
  {
    id: '3',
    user: 'Mike Johnson',
    action: 'left a 5-star review',
    amount: '★★★★★',
    timestamp: '8 minutes ago',
    type: 'review'
  }
];
