import { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { FlowingBackground } from '@/components/ui/background-effects';
import { CursorGlow } from '@/components/ui/background-effects';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Package, 
  AlertTriangle, 
  TrendingDown, 
  Search, 
  Filter,
  Plus,
  Edit,
  Trash2,
  ShoppingCart
} from 'lucide-react';
import { inventoryData, InventoryItem } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';
import { useEffect } from 'react';

export default function InventoryPage() {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'in-stock' | 'low-stock' | 'out-of-stock'>('all');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  // Filter inventory data
  const filteredInventory = inventoryData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate inventory stats
  const totalSKUs = inventoryData.length;
  const outOfStock = inventoryData.filter(item => item.status === 'out-of-stock').length;
  const lowStock = inventoryData.filter(item => item.status === 'low-stock').length;
  const totalValue = inventoryData.reduce((sum, item) => sum + (item.stock * item.price), 0);

  const getStatusColor = (status: InventoryItem['status']) => {
    switch (status) {
      case 'in-stock':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'low-stock':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'out-of-stock':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStockPercentage = (current: number, threshold: number) => {
    const maxStock = threshold * 5; // Assume max stock is 5x threshold
    return Math.min((current / maxStock) * 100, 100);
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
                <h2 className="text-3xl font-bold text-white mb-2">Inventory Management</h2>
                <p className="text-gray-400">Monitor stock levels and manage your inventory</p>
              </div>
              
              <Button
                data-testid="button-add-item"
                className="btn-primary"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </div>
          </motion.div>

          {/* Inventory Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CursorGlow>
                <Card 
                  data-testid="card-total-skus"
                  className="glass-card hover-glow border-white/10 bg-white/5 backdrop-blur-xl"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">{totalSKUs}</h3>
                    <p className="text-gray-400 text-sm">Total SKUs</p>
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
                  data-testid="card-low-stock"
                  className="glass-card hover-glow border-white/10 bg-white/5 backdrop-blur-xl"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center">
                        <AlertTriangle className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">{lowStock}</h3>
                    <p className="text-gray-400 text-sm">Low Stock Items</p>
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
                  data-testid="card-out-of-stock"
                  className="glass-card hover-glow border-white/10 bg-white/5 backdrop-blur-xl"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-red-500 rounded-lg flex items-center justify-center">
                        <TrendingDown className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">{outOfStock}</h3>
                    <p className="text-gray-400 text-sm">Out of Stock</p>
                  </CardContent>
                </Card>
              </CursorGlow>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <CursorGlow>
                <Card 
                  data-testid="card-inventory-value"
                  className="glass-card hover-glow border-white/10 bg-white/5 backdrop-blur-xl"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-500 rounded-lg flex items-center justify-center">
                        <ShoppingCart className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">${totalValue.toLocaleString()}</h3>
                    <p className="text-gray-400 text-sm">Total Value</p>
                  </CardContent>
                </Card>
              </CursorGlow>
            </motion.div>
          </div>

          {/* Low Stock Alerts */}
          {lowStock > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <Alert className="border-yellow-500/30 bg-yellow-500/10">
                <AlertTriangle className="h-4 w-4 text-yellow-400" />
                <AlertDescription className="text-yellow-400">
                  {lowStock} items are running low on stock. Consider reordering soon.
                </AlertDescription>
              </Alert>
            </motion.div>
          )}

          {/* Search and Filters */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <CursorGlow>
              <Card className="glass-card border-white/10 bg-white/5 backdrop-blur-xl">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        data-testid="input-search-inventory"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-white/5 border-white/10"
                      />
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        data-testid="filter-all"
                        variant={statusFilter === 'all' ? 'default' : 'ghost'}
                        onClick={() => setStatusFilter('all')}
                        className={statusFilter === 'all' ? 'btn-primary' : 'bg-white/5 hover:bg-white/10'}
                      >
                        All
                      </Button>
                      <Button
                        data-testid="filter-in-stock"
                        variant={statusFilter === 'in-stock' ? 'default' : 'ghost'}
                        onClick={() => setStatusFilter('in-stock')}
                        className={statusFilter === 'in-stock' ? 'btn-primary' : 'bg-white/5 hover:bg-white/10'}
                      >
                        In Stock
                      </Button>
                      <Button
                        data-testid="filter-low-stock"
                        variant={statusFilter === 'low-stock' ? 'default' : 'ghost'}
                        onClick={() => setStatusFilter('low-stock')}
                        className={statusFilter === 'low-stock' ? 'btn-primary' : 'bg-white/5 hover:bg-white/10'}
                      >
                        Low Stock
                      </Button>
                      <Button
                        data-testid="filter-out-of-stock"
                        variant={statusFilter === 'out-of-stock' ? 'default' : 'ghost'}
                        onClick={() => setStatusFilter('out-of-stock')}
                        className={statusFilter === 'out-of-stock' ? 'btn-primary' : 'bg-white/5 hover:bg-white/10'}
                      >
                        Out of Stock
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CursorGlow>
          </motion.div>

          {/* Inventory Table */}
          <CursorGlow>
            <Card className="glass-card hover-glow border-white/10 bg-white/5 backdrop-blur-xl">
              <CardHeader>
                <CardTitle 
                  data-testid="text-inventory-table"
                  className="text-xl font-semibold text-white"
                >
                  Inventory Items ({filteredInventory.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <div className="space-y-4">
                    {filteredInventory.map((item, index) => (
                      <motion.div
                        key={item.id}
                        data-testid={`inventory-item-${item.id}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all border border-white/10"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                          {/* Product Info */}
                          <div className="md:col-span-2">
                            <h4 
                              data-testid={`text-item-name-${item.id}`}
                              className="text-white font-medium"
                            >
                              {item.name}
                            </h4>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge 
                                variant="outline" 
                                className="text-xs text-cyan-400 border-cyan-400/30"
                              >
                                {item.category}
                              </Badge>
                              <span className="text-xs text-gray-400">{item.supplier}</span>
                            </div>
                          </div>

                          {/* Stock Level */}
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-sm text-white font-medium">{item.stock}</span>
                              <span className="text-xs text-gray-400">/ {item.threshold * 5}</span>
                            </div>
                            <Progress 
                              value={getStockPercentage(item.stock, item.threshold)} 
                              className="h-2"
                            />
                          </div>

                          {/* Price */}
                          <div>
                            <p 
                              data-testid={`text-item-price-${item.id}`}
                              className="text-white font-medium"
                            >
                              ${item.price}
                            </p>
                            <p className="text-xs text-gray-400">per unit</p>
                          </div>

                          {/* Status */}
                          <div>
                            <Badge 
                              data-testid={`badge-status-${item.id}`}
                              className={getStatusColor(item.status)}
                            >
                              {item.status.replace('-', ' ')}
                            </Badge>
                          </div>

                          {/* Actions */}
                          <div className="flex space-x-2">
                            <Button
                              data-testid={`button-edit-${item.id}`}
                              size="sm"
                              variant="ghost"
                              className="text-gray-400 hover:text-white"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              data-testid={`button-delete-${item.id}`}
                              size="sm"
                              variant="ghost"
                              className="text-gray-400 hover:text-red-400"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </CursorGlow>
        </DashboardLayout>
      </div>
    </div>
  );
}