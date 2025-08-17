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
  { name: 'Jan', value: 65000, revenue: 65000 },
  { name: 'Feb', value: 78000, revenue: 78000 },
  { name: 'Mar', value: 85000, revenue: 85000 },
  { name: 'Apr', value: 92000, revenue: 92000 },
  { name: 'May', value: 88000, revenue: 88000 },
  { name: 'Jun', value: 96000, revenue: 96000 },
  { name: 'Jul', value: 124592, revenue: 124592 },
];

export const userGrowthData: ChartDataPoint[] = [
  { name: 'Week 1', value: 900, newUsers: 320, returningUsers: 580 },
  { name: 'Week 2', value: 1050, newUsers: 410, returningUsers: 640 },
  { name: 'Week 3', value: 1105, newUsers: 385, returningUsers: 720 },
  { name: 'Week 4', value: 1119, newUsers: 429, returningUsers: 690 },
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

// Sales Data
export interface SalesItem {
  id: string;
  date: string;
  product: string;
  category: string;
  revenue: number;
  quantity: number;
  region: string;
}

// Inventory Data
export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  stock: number;
  threshold: number;
  price: number;
  supplier: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

// User Insights Data
export interface UserMetric {
  id: string;
  metric: string;
  value: number;
  change: number;
  period: string;
}

// Reports Data  
export interface ReportItem {
  id: string;
  name: string;
  type: 'sales' | 'inventory' | 'users' | 'revenue';
  createdAt: string;
  status: 'completed' | 'processing' | 'failed';
  fileSize: string;
}

export const salesData: SalesItem[] = [
  { id: '1', date: '2025-01-15', product: 'Premium Laptop', category: 'Electronics', revenue: 1299, quantity: 1, region: 'North America' },
  { id: '2', date: '2025-01-15', product: 'Wireless Mouse', category: 'Accessories', revenue: 49, quantity: 3, region: 'Europe' },
  { id: '3', date: '2025-01-14', product: 'Monitor 27"', category: 'Electronics', revenue: 349, quantity: 2, region: 'Asia' },
  { id: '4', date: '2025-01-14', product: 'Keyboard Mechanical', category: 'Accessories', revenue: 129, quantity: 1, region: 'North America' },
  { id: '5', date: '2025-01-13', product: 'Tablet Pro', category: 'Electronics', revenue: 799, quantity: 1, region: 'Europe' },
  { id: '6', date: '2025-01-13', product: 'USB-C Hub', category: 'Accessories', revenue: 79, quantity: 2, region: 'Asia' },
];

export const inventoryData: InventoryItem[] = [
  { id: '1', name: 'Premium Laptop', category: 'Electronics', stock: 45, threshold: 10, price: 1299, supplier: 'TechCorp', status: 'in-stock' },
  { id: '2', name: 'Wireless Mouse', category: 'Accessories', stock: 8, threshold: 15, price: 49, supplier: 'AccessoryPlus', status: 'low-stock' },
  { id: '3', name: 'Monitor 27"', category: 'Electronics', stock: 23, threshold: 5, price: 349, supplier: 'DisplayTech', status: 'in-stock' },
  { id: '4', name: 'Keyboard Mechanical', category: 'Accessories', stock: 0, threshold: 8, price: 129, supplier: 'KeyboardPro', status: 'out-of-stock' },
  { id: '5', name: 'Tablet Pro', category: 'Electronics', stock: 12, threshold: 6, price: 799, supplier: 'TabletCorp', status: 'in-stock' },
  { id: '6', name: 'USB-C Hub', category: 'Accessories', stock: 3, threshold: 10, price: 79, supplier: 'ConnectTech', status: 'low-stock' },
];

export const userMetrics: UserMetric[] = [
  { id: '1', metric: 'Monthly Active Users', value: 12540, change: 8.2, period: 'vs last month' },
  { id: '2', metric: 'Daily Active Users', value: 3240, change: 12.5, period: 'vs yesterday' },
  { id: '3', metric: 'Session Duration', value: 8.4, change: -2.1, period: 'minutes avg' },
  { id: '4', metric: 'Page Views', value: 45230, change: 15.7, period: 'vs last week' },
  { id: '5', metric: 'Bounce Rate', value: 32.1, change: -4.2, period: '% this month' },
  { id: '6', metric: 'New Signups', value: 892, change: 23.8, period: 'this week' },
];

export const reportsData: ReportItem[] = [
  { id: '1', name: 'Q4 Sales Report', type: 'sales', createdAt: '2025-01-15 14:30', status: 'completed', fileSize: '2.4 MB' },
  { id: '2', name: 'Inventory Analysis', type: 'inventory', createdAt: '2025-01-14 09:15', status: 'completed', fileSize: '1.8 MB' },
  { id: '3', name: 'User Engagement Report', type: 'users', createdAt: '2025-01-13 16:45', status: 'completed', fileSize: '3.1 MB' },
  { id: '4', name: 'Revenue Forecast', type: 'revenue', createdAt: '2025-01-12 11:20', status: 'processing', fileSize: 'Processing...' },
  { id: '5', name: 'Monthly Summary', type: 'sales', createdAt: '2025-01-11 13:05', status: 'failed', fileSize: 'Error' },
];

export const salesByRegionData = [
  { name: 'North America', value: 45, revenue: 125000 },
  { name: 'Europe', value: 30, revenue: 89000 },
  { name: 'Asia', value: 20, revenue: 67000 },
  { name: 'Other', value: 5, revenue: 23000 },
];

export const productPerformanceData = [
  { name: 'Electronics', value: 65, revenue: 245000, quantity: 189 },
  { name: 'Accessories', value: 35, revenue: 89000, quantity: 456 },
  { name: 'Software', value: 15, revenue: 45000, quantity: 234 },
  { name: 'Services', value: 12, revenue: 32000, quantity: 89 },
];

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
