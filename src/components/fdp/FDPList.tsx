
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FDPRecord } from './FDPManagement';

interface FDPListProps {
  records: FDPRecord[];
  onEdit: (record: FDPRecord) => void;
  onDelete: (id: string) => void;
  userRole: 'faculty' | 'admin' | null;
}

export const FDPList = ({ records, onEdit, onDelete, userRole }: FDPListProps) => {
  if (records.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No FDP Records Found</h3>
          <p className="text-gray-500 text-center">Start by adding your first FDP or workshop record</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">FDP Records ({records.length})</h2>
      <div className="grid gap-4">
        {records.map((record) => (
          <Card key={record.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg text-gray-900">{record.title}</CardTitle>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {record.type}
                    </Badge>
                    <Badge 
                      variant="secondary" 
                      className={record.level === 'International' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}
                    >
                      {record.level}
                    </Badge>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onEdit(record)}
                    className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onDelete(record.id)}
                    className="hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-500">Date:</span>
                  <p className="text-gray-900">{new Date(record.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-500">Venue:</span>
                  <p className="text-gray-900">{record.venue}</p>
                </div>
                {userRole === 'admin' && record.facultyName && (
                  <div>
                    <span className="font-medium text-gray-500">Faculty:</span>
                    <p className="text-gray-900">{record.facultyName}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
