
import { useAuth } from '@/contexts/AuthContext';
import { LoginForm } from '@/components/auth/LoginForm';
import { Dashboard } from '@/components/dashboard/Dashboard';

console.log('Index component loading...');

const Index = () => {
  console.log('Index component rendering...');
  
  const { user, profile, loading, signOut } = useAuth();

  console.log('Authentication state:', { user: !!user, profile, loading });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    console.log('Rendering LoginForm...');
    return <LoginForm />;
  }

  console.log('Rendering Dashboard...');
  return <Dashboard userRole={profile.role} onLogout={signOut} />;
};

export default Index;
