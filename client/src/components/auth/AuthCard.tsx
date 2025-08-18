import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { CursorGlow } from '@/components/ui/background-effects';
import { BarChart3, Eye, EyeOff } from 'lucide-react';

interface AuthCardProps {
  onSuccess: () => void;
}

export const AuthCard = ({ onSuccess }: AuthCardProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  
  const { login, register } = useAuth();
  
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setEmail('');
    setPassword('');
    setName('');
    setDepartment('');
    setShowPassword(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      if (isLogin) {
        await login(email, password);
        onSuccess();
      } else {
        // Register new user
        await register(name, email, password, department);
        onSuccess();
      }
    } catch (error: any) {
      console.error('Authentication failed:', error);
      setError(error.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center p-6"
    >
      <CursorGlow className="w-full max-w-md">
        <Card className="glass-card hover-glow border-white/10 bg-white/5 backdrop-blur-xl">
          <CardContent className="pt-8 p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div 
                className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <BarChart3 className="w-8 h-8 text-white" />
              </motion.div>
              <h1 className="text-3xl font-bold text-gradient mb-2">
                Analytics Pro
              </h1>
              <p className="text-gray-400">
                {isLogin ? 'Sign in to your dashboard' : 'Create your account'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}
              
              {!isLogin && (
                <div>
                  <Label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </Label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-white placeholder:text-gray-500"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              )}

              <div>
                <Label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </Label>
                <Input
                  data-testid="input-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-white placeholder:text-gray-500"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {!isLogin && (
                <div>
                  <Label className="block text-sm font-medium text-gray-300 mb-2">
                    Department
                  </Label>
                  <Input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-white placeholder:text-gray-500"
                    placeholder="Enter your department (optional)"
                  />
                </div>
              )}

              <div>
                <Label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    data-testid="input-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-white placeholder:text-gray-500"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {isLogin && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      className="border-gray-600 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                    />
                    <Label htmlFor="remember" className="text-sm text-gray-400 cursor-pointer">
                      Remember me
                    </Label>
                  </div>
                  <Button
                    type="button"
                    variant="link"
                    className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors p-0 h-auto"
                  >
                    Forgot password?
                  </Button>
                </div>
              )}

              <Button
                data-testid="button-submit"
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary py-3 text-lg font-medium focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                {isLoading ? (isLogin ? 'Signing in...' : 'Creating account...') : (isLogin ? 'Sign In' : 'Sign Up')}
              </Button>
            </form>

            {/* Toggle */}
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                <button
                  type="button"
                  onClick={toggleAuthMode}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors ml-1 font-medium"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </CursorGlow>
    </motion.div>
  );
};
