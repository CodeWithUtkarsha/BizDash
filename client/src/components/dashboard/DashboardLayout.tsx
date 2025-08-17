import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { BarChart3, Bell, User } from 'lucide-react';
import { Link, useLocation } from 'wouter';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const [, navigate] = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen">
      {/* Navigation Header */}
      <nav className="glass-card border-b border-white/10 sticky top-0 z-50 bg-white/5 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.div 
                className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-lg flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <BarChart3 className="w-6 h-6 text-white" />
              </motion.div>
              <h1 className="text-xl font-bold text-white">Analytics Pro</h1>
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
              
              <div className="flex items-center space-x-2">
                <Link href="/profile">
                  <Button
                    data-testid="link-profile"
                    variant="ghost"
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors h-auto p-2"
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback className="bg-gradient-to-r from-cyan-400 to-cyan-500 text-white text-sm">
                        {user?.name?.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:block">{user?.name}</span>
                  </Button>
                </Link>
                
                <Button
                  data-testid="button-logout"
                  onClick={handleLogout}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </div>
    </div>
  );
};
