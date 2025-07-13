
import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { DashboardHome } from '@/components/dashboard/DashboardHome';
import { FDPManagement } from '@/components/fdp/FDPManagement';
import { PublicationsManagement } from '@/components/publications/PublicationsManagement';
import { CertificatesManagement } from '@/components/certificates/CertificatesManagement';
import { ReportsModule } from '@/components/reports/ReportsModule';
import { ProfileManagement } from '@/components/profile/ProfileManagement';

interface DashboardProps {
  userRole: 'faculty' | 'admin' | null;
  onLogout: () => void;
}

export type ActiveModule = 'home' | 'fdp' | 'publications' | 'certificates' | 'reports' | 'profile';

export const Dashboard = ({ userRole, onLogout }: DashboardProps) => {
  const [activeModule, setActiveModule] = useState<ActiveModule>('home');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'home':
        return <DashboardHome userRole={userRole} />;
      case 'fdp':
        return <FDPManagement userRole={userRole} />;
      case 'publications':
        return <PublicationsManagement userRole={userRole} />;
      case 'certificates':
        return <CertificatesManagement userRole={userRole} />;
      case 'reports':
        return <ReportsModule userRole={userRole} />;
      case 'profile':
        return <ProfileManagement />;
      default:
        return <DashboardHome userRole={userRole} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeModule={activeModule} 
        setActiveModule={setActiveModule}
        userRole={userRole}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          onLogout={onLogout} 
          userRole={userRole}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="flex-1 overflow-auto p-6">
          {renderActiveModule()}
        </main>
      </div>
    </div>
  );
};
