
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Certificate } from './CertificatesManagement';

interface CertificateListProps {
  certificates: Certificate[];
  onEdit: (certificate: Certificate) => void;
  onDelete: (id: string) => void;
  userRole: 'faculty' | 'admin' | null;
}

const categoryColors = {
  'FDP': 'bg-blue-100 text-blue-800',
  'Course': 'bg-green-100 text-green-800',
  'Workshop': 'bg-purple-100 text-purple-800',
  'Training': 'bg-orange-100 text-orange-800',
  'Other': 'bg-gray-100 text-gray-800'
};

export const CertificateList = ({ certificates, onEdit, onDelete, userRole }: CertificateListProps) => {
  if (certificates.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="text-6xl mb-4">🏆</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Certificates Found</h3>
          <p className="text-gray-500 text-center">Start by adding your first certificate</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Certificates ({certificates.length})</h2>
      <div className="grid gap-4">
        {certificates.map((certificate) => (
          <Card key={certificate.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg text-gray-900 mb-2">{certificate.title}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className={categoryColors[certificate.category]}>
                      {certificate.category}
                    </Badge>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onEdit(certificate)}
                    className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onDelete(certificate.id)}
                    className="hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium text-gray-500">Date Issued:</span>
                    <p className="text-gray-900">{new Date(certificate.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-500">Issuing Body:</span>
                    <p className="text-gray-900">{certificate.issuingBody}</p>
                  </div>
                </div>
                
                {certificate.description && (
                  <div>
                    <span className="font-medium text-gray-500">Description:</span>
                    <p className="text-gray-900">{certificate.description}</p>
                  </div>
                )}
                
                {userRole === 'admin' && certificate.facultyName && (
                  <div>
                    <span className="font-medium text-gray-500">Faculty:</span>
                    <p className="text-gray-900">{certificate.facultyName}</p>
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
