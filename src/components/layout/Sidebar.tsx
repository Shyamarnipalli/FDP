
import { cn } from '@/lib/utils';
import { ActiveModule } from '@/components/dashboard/Dashboard';

interface SidebarProps {
  activeModule: ActiveModule;
  setActiveModule: (module: ActiveModule) => void;
  userRole: 'faculty' | 'admin' | null;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const menuItems = [
  { id: 'home', label: 'Dashboard', icon: '🏠', roles: ['faculty', 'admin'] },
  { id: 'fdp', label: 'FDP/Workshops', icon: '📚', roles: ['faculty', 'admin'] },
  { id: 'publications', label: 'Publications', icon: '📄', roles: ['faculty', 'admin'] },
  { id: 'certificates', label: 'Certificates', icon: '🏆', roles: ['faculty', 'admin'] },
  { id: 'reports', label: 'Reports', icon: '📊', roles: ['admin'] },
  { id: 'profile', label: 'Profile', icon: '👤', roles: ['faculty', 'admin'] },
];

export const Sidebar = ({ activeModule, setActiveModule, userRole, isOpen, setIsOpen }: SidebarProps) => {
  const filteredItems = menuItems.filter(item => 
    item.roles.includes(userRole || 'faculty')
  );

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <div className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-600">
            <h1 className="text-xl font-bold text-white">FDP System</h1>
          </div>
          
          <nav className="flex-1 p-4 space-y-2">
            {filteredItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveModule(item.id as ActiveModule);
                  setIsOpen(false); // Close sidebar on mobile after selection
                }}
                className={cn(
                  "w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 hover:shadow-md",
                  activeModule === item.id
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <span className="text-xl mr-3">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
          
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {userRole === 'admin' ? 'A' : 'F'}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 capitalize">{userRole}</p>
                <p className="text-xs text-gray-500">User</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
