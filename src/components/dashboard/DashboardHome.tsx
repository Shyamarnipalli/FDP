
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DashboardHomeProps {
  userRole: 'faculty' | 'admin' | null;
}

export const DashboardHome = ({ userRole }: DashboardHomeProps) => {
  const facultyStats = [
    { title: 'FDPs Attended', value: '12', icon: '📚', color: 'from-blue-500 to-blue-600' },
    { title: 'Publications', value: '8', icon: '📄', color: 'from-green-500 to-green-600' },
    { title: 'Certificates', value: '15', icon: '🏆', color: 'from-purple-500 to-purple-600' },
    { title: 'This Month', value: '3', icon: '📅', color: 'from-orange-500 to-orange-600' },
  ];

  const adminStats = [
    { title: 'Total Faculty', value: '45', icon: '👥', color: 'from-blue-500 to-blue-600' },
    { title: 'Total FDPs', value: '156', icon: '📚', color: 'from-green-500 to-green-600' },
    { title: 'Total Publications', value: '89', icon: '📄', color: 'from-purple-500 to-purple-600' },
    { title: 'This Month', value: '12', icon: '📅', color: 'from-orange-500 to-orange-600' },
  ];

  const stats = userRole === 'admin' ? adminStats : facultyStats;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-full bg-gradient-to-r ${stat.color}`}>
                <span className="text-white text-lg">{stat.icon}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-gray-500 mt-1">
                {userRole === 'admin' ? 'Across all faculty' : 'Your records'}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>📈</span>
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-700">New FDP record added</span>
              <span className="text-xs text-gray-500 ml-auto">2 hours ago</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Publication submitted</span>
              <span className="text-xs text-gray-500 ml-auto">1 day ago</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Certificate uploaded</span>
              <span className="text-xs text-gray-500 ml-auto">3 days ago</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>🎯</span>
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="w-full p-3 text-left bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg">
              <div className="font-medium">Add New FDP Record</div>
              <div className="text-sm opacity-90">Record your latest workshop or seminar</div>
            </button>
            <button className="w-full p-3 text-left bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg">
              <div className="font-medium">Upload Publication</div>
              <div className="text-sm opacity-90">Add your research papers or books</div>
            </button>
            <button className="w-full p-3 text-left bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg">
              <div className="font-medium">Upload Certificate</div>
              <div className="text-sm opacity-90">Add completion certificates</div>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
