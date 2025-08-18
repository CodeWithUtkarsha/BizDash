import { ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { BarChart3, Bell, Home, TrendingUp, Package, Users, FileText, Settings, CheckCircle, AlertTriangle, Info, X } from 'lucide-react';
import { Link, useLocation } from 'wouter';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [location, navigate] = useLocation();
  const [notificationCount, setNotificationCount] = useState(3);

  // Sample notifications data
  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Sale Completed',
      message: 'New sale of $2,500 from John Doe',
      time: '2 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'Low Inventory',
      message: 'Product "Widget A" is running low (5 left)',
      time: '15 minutes ago',
      read: false
    },
    {
      id: 3,
      type: 'info',
      title: 'Report Generated',
      message: 'Monthly sales report is ready for download',
      time: '1 hour ago',
      read: true
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'info':
        return <Info className="w-4 h-4 text-blue-400" />;
      default:
        return <Bell className="w-4 h-4 text-gray-400" />;
    }
  };

  const handleNotificationClick = (notification: typeof notifications[0]) => {
    toast({
      title: notification.title,
      description: notification.message,
      duration: 5000,
    });
  };

  const markAllAsRead = () => {
    setNotificationCount(0);
    toast({
      title: "Notifications marked as read",
      description: "All notifications have been marked as read.",
    });
  };

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
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    data-testid="button-notifications"
                    variant="ghost"
                    size="icon"
                    className="relative text-gray-400 hover:text-white transition-colors"
                  >
                    <Bell className="w-6 h-6" />
                    {notificationCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-500 rounded-full text-xs flex items-center justify-center text-white">
                        {notificationCount}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 mr-4 p-0" align="end">
                  <div className="border-b border-gray-200 dark:border-gray-700 p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Notifications</h3>
                      {notificationCount > 0 && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={markAllAsRead}
                          className="text-xs text-blue-500 hover:text-blue-600"
                        >
                          Mark all as read
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-gray-500">
                        No notifications
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors ${
                            !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                          }`}
                          onClick={() => handleNotificationClick(notification)}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 mt-1">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                  {notification.title}
                                </p>
                                {!notification.read && (
                                  <Badge variant="secondary" className="ml-2 h-2 w-2 p-0 bg-blue-500"></Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  {notifications.length > 0 && (
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                      <Button 
                        variant="ghost" 
                        className="w-full text-sm"
                        onClick={() => {
                          toast({
                            title: "View All Notifications",
                            description: "This would open the full notifications page.",
                          });
                        }}
                      >
                        View all notifications
                      </Button>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
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
