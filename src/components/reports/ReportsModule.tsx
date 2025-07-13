
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

interface ReportsModuleProps {
  userRole: 'faculty' | 'admin' | null;
}

export const ReportsModule = ({ userRole }: ReportsModuleProps) => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  if (userRole !== 'admin') {
    return (
      <div className="flex items-center justify-center h-96">
        <Card className="max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-6xl mb-4">🔒</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Access Restricted</h3>
            <p className="text-gray-500 text-center">Only administrators can access the reports module</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const reportData = [
    { title: 'Total FDPs', value: '156', change: '+12%', color: 'from-blue-500 to-blue-600' },
    { title: 'Total Publications', value: '89', change: '+8%', color: 'from-green-500 to-green-600' },
    { title: 'Total Certificates', value: '234', change: '+15%', color: 'from-purple-500 to-purple-600' },
    { title: 'Active Faculty', value: '45', change: '+3%', color: 'from-orange-500 to-orange-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
        <div className="flex space-x-3">
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="cs">Computer Science</SelectItem>
              <SelectItem value="it">Information Technology</SelectItem>
              <SelectItem value="ece">Electronics</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportData.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-full bg-gradient-to-r ${stat.color}`}>
                <span className="text-white text-sm">📊</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-green-600 mt-1">{stat.change} from last year</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>📈</span>
              <span>FDP Trends</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="text-4xl mb-2">📊</div>
                <p className="text-gray-500">Chart visualization would appear here</p>
                <p className="text-sm text-gray-400 mt-1">
                  Bar chart showing FDP participation trends over time
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>🥧</span>
              <span>Publication Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="text-4xl mb-2">📊</div>
                <p className="text-gray-500">Pie chart would appear here</p>
                <p className="text-sm text-gray-400 mt-1">
                  Distribution by publication type
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Export Reports</CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" className="hover:bg-red-50 hover:text-red-600">
                Export PDF
              </Button>
              <Button variant="outline" className="hover:bg-green-50 hover:text-green-600">
                Export Excel
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <h4 className="font-medium text-gray-900">Faculty Activity Report</h4>
              <p className="text-sm text-gray-500 mt-1">
                Comprehensive report of all faculty activities
              </p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <h4 className="font-medium text-gray-900">Department Summary</h4>
              <p className="text-sm text-gray-500 mt-1">
                Department-wise activity breakdown
              </p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <h4 className="font-medium text-gray-900">Annual Report</h4>
              <p className="text-sm text-gray-500 mt-1">
                Complete annual activity summary
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
