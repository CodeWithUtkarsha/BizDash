import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { BarChart3, Bell, Home, TrendingUp, Package, Users, FileText, Settings } from 'lucide-react';
import { Link, useLocation } from 'wouter';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const [location, navigate] = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Home', icon: Home, path: '/dashboard', testId: 'nav-home' },
    { name: 'Sales', icon: TrendingUp, path: '/sales', testId: 'nav-sales' },
    { name: 'Inventory', icon: Package, path: '/inventory', testId: 'nav-inventory' },
    { name: 'Users', icon: Users, path: '/users', testId: 'nav-users' },
    { name: 'Reports', icon: FileText, path: '/reports', testId: 'nav-reports' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar Navigation */}
      <nav className="glass-card w-64 border-r border-white/10 bg-white/5 backdrop-blur-xl flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <motion.div 
              className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-lg flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <BarChart3 className="w-6 h-6 text-white" />
            </motion.div>
            <h1 className="text-xl font-bold text-white">Analytics Pro</h1>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location === item.path;
            const Icon = item.icon;
            
            return (
              <Link key={item.path} href={item.path}>
                <Button
                  data-testid={item.testId}
                  variant="ghost"
                  className={`w-full justify-start space-x-3 text-left h-12 ${
                    isActive 
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  } transition-all duration-200`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Button>
              </Link>
            );
          })}
        </div>

        {/* User Profile Section */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center space-x-3 mb-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="bg-gradient-to-r from-cyan-400 to-cyan-500 text-white text-sm">
                {user?.name?.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name}</p>
              <p className="text-xs text-gray-400 truncate">{user?.role}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <Link href="/profile">
              <Button
                data-testid="link-profile"
                variant="ghost"
                size="sm"
                className="w-full justify-start space-x-2 text-gray-400 hover:text-white"
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </Button>
            </Link>
            
            <Button
              data-testid="button-logout"
              onClick={handleLogout}
              variant="ghost"
              size="sm"
              className="w-full justify-start text-gray-400 hover:text-red-400"
            >
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="glass-card border-b border-white/10 bg-white/5 backdrop-blur-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Welcome back, {user?.firstName || user?.name?.split(' ')[0]}!
              </h2>
              <p className="text-gray-400 mt-1">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                data-testid="button-notifications"
                variant="ghost"
                size="icon"
                className="relative text-gray-400 hover:text-white transition-colors"
              >
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-500 rounded-full text-xs flex items-center justify-center text-white">
                  3
                </span>
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
