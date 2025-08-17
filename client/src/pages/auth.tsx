import { useAuth } from '@/contexts/AuthContext';
import { AuthCard } from '@/components/auth/AuthCard';
import { FlowingBackground } from '@/components/ui/background-effects';
import { useLocation } from 'wouter';
import { useEffect } from 'react';

export default function AuthPage() {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleAuthSuccess = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen relative">
      <FlowingBackground />
      <div className="relative z-10">
        <AuthCard onSuccess={handleAuthSuccess} />
      </div>
    </div>
  );
}
