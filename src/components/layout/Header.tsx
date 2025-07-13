
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface HeaderProps {
  onLogout: () => void;
  userRole: 'faculty' | 'admin' | null;
  toggleSidebar: () => void;
}

export const Header = ({ onLogout, userRole, toggleSidebar }: HeaderProps) => {
  const { profile } = useAuth();
  
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="lg:hidden"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </Button>
        <h2 className="text-lg font-semibold text-gray-800">
          Faculty Development Program Dashboard
        </h2>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="text-sm text-gray-600">
          <span className="font-medium">Welcome, {profile?.name || 'User'}</span>
          {profile?.department && (
            <span className="text-gray-500 ml-2">({profile.department})</span>
          )}
          <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs capitalize">
            {userRole}
          </span>
        </div>
        <Button 
          onClick={onLogout}
          variant="outline"
          size="sm"
          className="hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-colors"
        >
          Logout
        </Button>
      </div>
    </header>
  );
};
