import { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { KPICard } from '@/components/dashboard/KPICard';
import { FlowingBackground } from '@/components/ui/background-effects';
import { CursorGlow } from '@/components/ui/background-effects';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, Filter, Download, TrendingUp, DollarSign, ShoppingCart, Globe } from 'lucide-react';
import { 
  salesData, 
  salesByRegionData, 
  productPerformanceData, 
  revenueChartData,
  SalesItem 
} from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';
import { useEffect } from 'react';

export default function SalesPage() {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  // Filter sales data
  const filteredSales = salesData.filter(sale => {
    const categoryMatch = selectedCategory === 'all' || sale.category === selectedCategory;
    const regionMatch = selectedRegion === 'all' || sale.region === selectedRegion;
    return categoryMatch && regionMatch;
  });

  // Calculate KPIs
  const totalRevenue = filteredSales.reduce((sum, sale) => sum + sale.revenue, 0);
  const totalOrders = filteredSales.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const salesKPIs = [
    {
      id: 'revenue',
      title: `$${totalRevenue.toLocaleString()}`,
      label: 'Total Revenue',
      value: totalRevenue.toString(),
      change: 12.5,
      trend: 'up' as const,
      icon: 'dollar',
      color: 'from-cyan-400 to-cyan-500'
    },
    {
      id: 'orders',
      title: totalOrders.toString(),
      label: 'Total Orders',
      value: totalOrders.toString(),
      change: 8.2,
      trend: 'up' as const,
      icon: 'trending',
      color: 'from-green-400 to-green-500'
    },
    {
      id: 'avg-order',
      title: `$${avgOrderValue.toFixed(0)}`,
      label: 'Avg Order Value',
      value: avgOrderValue.toFixed(0),
      change: 3.7,
      trend: 'up' as const,
      icon: 'dollar',
      color: 'from-purple-400 to-purple-500'
    },
    {
      id: 'conversion',
      title: '4.2%',
      label: 'Conversion Rate',
      value: '4.2',
      change: -1.2,
      trend: 'down' as const,
      icon: 'target',
      color: 'from-orange-400 to-orange-500'
    }
  ];

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
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Sales Analytics</h2>
                <p className="text-gray-400">Track sales performance and revenue trends</p>
              </div>
              
              <div className="flex space-x-3">
                <Button
                  data-testid="button-export-sales"
                  variant="ghost"
                  className="bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button
                  data-testid="button-date-range"
                  variant="ghost"
                  className="bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Last 30 days
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <CursorGlow>
              <Card className="glass-card border-white/10 bg-white/5 backdrop-blur-xl">
                <CardContent className="p-6">
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <Filter className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-400 font-medium">Filters:</span>
                    </div>
                    
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger 
                        data-testid="select-category"
                        className="w-48 bg-white/5 border-white/10"
                      >
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="Electronics">Electronics</SelectItem>
                        <SelectItem value="Accessories">Accessories</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                      <SelectTrigger 
                        data-testid="select-region"
                        className="w-48 bg-white/5 border-white/10"
                      >
                        <SelectValue placeholder="Region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Regions</SelectItem>
                        <SelectItem value="North America">North America</SelectItem>
                        <SelectItem value="Europe">Europe</SelectItem>
                        <SelectItem value="Asia">Asia</SelectItem>
                      </SelectContent>
                    </Select>

                    <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-400">
                      {filteredSales.length} results
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </CursorGlow>
          </motion.div>

          {/* KPI Cards */}
          <div 
            data-testid="sales-kpi-grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {salesKPIs.map((kpi, index) => (
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
              title="Sales by Region"
              data={salesByRegionData}
              type="bar"
              dataKey="value"
              secondaryDataKey="revenue"
              color="#22d3ee"
              secondaryColor="#10b981"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Product Performance Chart */}
            <div className="lg:col-span-2">
              <ChartCard
                title="Product Performance"
                data={productPerformanceData}
                type="bar"
                dataKey="revenue"
                secondaryDataKey="quantity"
                color="#22d3ee"
                secondaryColor="#f59e0b"
              />
            </div>

            {/* Sales Data Table */}
            <CursorGlow>
              <Card className="glass-card hover-glow border-white/10 bg-white/5 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle 
                    data-testid="text-recent-sales"
                    className="text-xl font-semibold text-white"
                  >
                    Recent Sales
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {filteredSales.slice(0, 10).map((sale, index) => (
                      <motion.div
                        key={sale.id}
                        data-testid={`sale-item-${sale.id}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <div>
                          <p 
                            data-testid={`text-sale-product-${sale.id}`}
                            className="text-white font-medium text-sm"
                          >
                            {sale.product}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge 
                              variant="outline" 
                              className="text-xs text-cyan-400 border-cyan-400/30"
                            >
                              {sale.category}
                            </Badge>
                            <span className="text-xs text-gray-400">{sale.region}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p 
                            data-testid={`text-sale-revenue-${sale.id}`}
                            className="text-green-400 font-medium"
                          >
                            ${sale.revenue}
                          </p>
                          <p 
                            data-testid={`text-sale-date-${sale.id}`}
                            className="text-xs text-gray-400"
                          >
                            {new Date(sale.date).toLocaleDateString()}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </CursorGlow>
          </div>
        </DashboardLayout>
      </div>
    </div>
  );
}