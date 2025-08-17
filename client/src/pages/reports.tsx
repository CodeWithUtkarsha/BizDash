import { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { FlowingBackground } from '@/components/ui/background-effects';
import { CursorGlow } from '@/components/ui/background-effects';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  FileText, 
  Download, 
  Plus, 
  Calendar,
  Filter,
  Clock,
  AlertCircle,
  CheckCircle,
  Loader
} from 'lucide-react';
import { reportsData, ReportItem } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';
import { useEffect } from 'react';

export default function ReportsPage() {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const [showReportBuilder, setShowReportBuilder] = useState(false);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [reportType, setReportType] = useState('');
  const [reportName, setReportName] = useState('');
  const [dateRange, setDateRange] = useState('last-30-days');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const getStatusIcon = (status: ReportItem['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'processing':
        return <Loader className="w-4 h-4 text-yellow-400 animate-spin" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-400" />;
    }
  };

  const getStatusColor = (status: ReportItem['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'processing':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'failed':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
    }
  };

  const availableMetrics = [
    { id: 'revenue', label: 'Revenue', category: 'sales' },
    { id: 'orders', label: 'Orders', category: 'sales' },
    { id: 'customers', label: 'Customers', category: 'sales' },
    { id: 'inventory-levels', label: 'Inventory Levels', category: 'inventory' },
    { id: 'stock-alerts', label: 'Stock Alerts', category: 'inventory' },
    { id: 'user-growth', label: 'User Growth', category: 'users' },
    { id: 'engagement', label: 'Engagement', category: 'users' },
    { id: 'retention', label: 'Retention', category: 'users' },
  ];

  const handleMetricToggle = (metricId: string) => {
    setSelectedMetrics(prev => 
      prev.includes(metricId)
        ? prev.filter(id => id !== metricId)
        : [...prev, metricId]
    );
  };

  const handleCreateReport = () => {
    // Mock report creation
    console.log('Creating report:', {
      name: reportName,
      type: reportType,
      metrics: selectedMetrics,
      dateRange
    });
    setShowReportBuilder(false);
    setReportName('');
    setSelectedMetrics([]);
    setReportType('');
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
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Reports</h2>
                <p className="text-gray-400">Generate and manage your business reports</p>
              </div>
              
              <Button
                data-testid="button-new-report"
                onClick={() => setShowReportBuilder(!showReportBuilder)}
                className="btn-primary"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Report
              </Button>
            </div>
          </motion.div>

          {/* Report Builder */}
          {showReportBuilder && (
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CursorGlow>
                <Card className="glass-card border-white/10 bg-white/5 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle 
                      data-testid="text-report-builder"
                      className="text-xl font-semibold text-white"
                    >
                      Report Builder
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Report Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-gray-300 mb-2">Report Name</Label>
                        <Input
                          data-testid="input-report-name"
                          placeholder="Enter report name"
                          value={reportName}
                          onChange={(e) => setReportName(e.target.value)}
                          className="bg-white/5 border-white/10"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-300 mb-2">Report Type</Label>
                        <Select value={reportType} onValueChange={setReportType}>
                          <SelectTrigger 
                            data-testid="select-report-type"
                            className="bg-white/5 border-white/10"
                          >
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sales">Sales Report</SelectItem>
                            <SelectItem value="inventory">Inventory Report</SelectItem>
                            <SelectItem value="users">User Report</SelectItem>
                            <SelectItem value="revenue">Revenue Report</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Date Range */}
                    <div>
                      <Label className="text-gray-300 mb-2">Date Range</Label>
                      <Select value={dateRange} onValueChange={setDateRange}>
                        <SelectTrigger 
                          data-testid="select-date-range"
                          className="bg-white/5 border-white/10 max-w-xs"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="last-7-days">Last 7 days</SelectItem>
                          <SelectItem value="last-30-days">Last 30 days</SelectItem>
                          <SelectItem value="last-90-days">Last 90 days</SelectItem>
                          <SelectItem value="last-year">Last year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Metrics Selection */}
                    <div>
                      <Label className="text-gray-300 mb-4">Select Metrics</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {availableMetrics.map((metric) => (
                          <div 
                            key={metric.id}
                            className="flex items-center space-x-2 p-3 bg-white/5 rounded-lg border border-white/10"
                          >
                            <Checkbox
                              data-testid={`checkbox-metric-${metric.id}`}
                              id={metric.id}
                              checked={selectedMetrics.includes(metric.id)}
                              onCheckedChange={() => handleMetricToggle(metric.id)}
                              className="border-gray-600 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                            />
                            <Label 
                              htmlFor={metric.id}
                              className="text-sm text-gray-300 cursor-pointer"
                            >
                              {metric.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end space-x-4">
                      <Button
                        data-testid="button-cancel-report"
                        variant="ghost"
                        onClick={() => setShowReportBuilder(false)}
                        className="bg-white/5 text-gray-300 hover:bg-white/10"
                      >
                        Cancel
                      </Button>
                      <Button
                        data-testid="button-create-report"
                        onClick={handleCreateReport}
                        disabled={!reportName || !reportType || selectedMetrics.length === 0}
                        className="btn-primary"
                      >
                        Create Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CursorGlow>
            </motion.div>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CursorGlow>
                <Card 
                  data-testid="card-total-reports"
                  className="glass-card hover-glow border-white/10 bg-white/5 backdrop-blur-xl"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">{reportsData.length}</h3>
                    <p className="text-gray-400 text-sm">Total Reports</p>
                  </CardContent>
                </Card>
              </CursorGlow>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <CursorGlow>
                <Card 
                  data-testid="card-completed-reports"
                  className="glass-card hover-glow border-white/10 bg-white/5 backdrop-blur-xl"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-500 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {reportsData.filter(r => r.status === 'completed').length}
                    </h3>
                    <p className="text-gray-400 text-sm">Completed</p>
                  </CardContent>
                </Card>
              </CursorGlow>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <CursorGlow>
                <Card 
                  data-testid="card-processing-reports"
                  className="glass-card hover-glow border-white/10 bg-white/5 backdrop-blur-xl"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {reportsData.filter(r => r.status === 'processing').length}
                    </h3>
                    <p className="text-gray-400 text-sm">Processing</p>
                  </CardContent>
                </Card>
              </CursorGlow>
            </motion.div>
          </div>

          {/* Reports List */}
          <CursorGlow>
            <Card className="glass-card hover-glow border-white/10 bg-white/5 backdrop-blur-xl">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle 
                    data-testid="text-reports-history"
                    className="text-xl font-semibold text-white"
                  >
                    Reports History
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      data-testid="button-filter-reports"
                      variant="ghost"
                      size="sm"
                      className="bg-white/5 text-gray-300 hover:bg-white/10"
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportsData.map((report, index) => (
                    <motion.div
                      key={report.id}
                      data-testid={`report-item-${report.id}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all border border-white/10"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-purple-500 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-white" />
                          </div>
                          
                          <div className="flex-1">
                            <h4 
                              data-testid={`text-report-name-${report.id}`}
                              className="text-white font-medium"
                            >
                              {report.name}
                            </h4>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge 
                                variant="outline" 
                                className="text-xs text-cyan-400 border-cyan-400/30"
                              >
                                {report.type}
                              </Badge>
                              <span className="text-xs text-gray-400">{report.createdAt}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(report.status)}
                              <Badge className={getStatusColor(report.status)}>
                                {report.status}
                              </Badge>
                            </div>
                            <p 
                              data-testid={`text-report-size-${report.id}`}
                              className="text-xs text-gray-400 mt-1"
                            >
                              {report.fileSize}
                            </p>
                          </div>

                          {report.status === 'completed' && (
                            <Button
                              data-testid={`button-download-${report.id}`}
                              size="sm"
                              variant="ghost"
                              className="text-cyan-400 hover:text-cyan-300"
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </CursorGlow>
        </DashboardLayout>
      </div>
    </div>
  );
}