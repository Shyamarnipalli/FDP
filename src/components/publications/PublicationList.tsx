
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Publication } from './PublicationsManagement';

interface PublicationListProps {
  publications: Publication[];
  onEdit: (publication: Publication) => void;
  onDelete: (id: string) => void;
  userRole: 'faculty' | 'admin' | null;
}

export const PublicationList = ({ publications, onEdit, onDelete, userRole }: PublicationListProps) => {
  if (publications.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="text-6xl mb-4">📄</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Publications Found</h3>
          <p className="text-gray-500 text-center">Start by adding your first publication or book</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Publications ({publications.length})</h2>
      <div className="grid gap-4">
        {publications.map((publication) => (
          <Card key={publication.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg text-gray-900 mb-2">{publication.title}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {publication.type}
                    </Badge>
                    <Badge variant="outline">
                      {publication.year}
                    </Badge>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onEdit(publication)}
                    className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onDelete(publication.id)}
                    className="hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-gray-500">Authors:</span>
                  <p className="text-gray-900">{publication.authors}</p>
                </div>
                
                {publication.journal && (
                  <div>
                    <span className="font-medium text-gray-500">
                      {publication.type === 'Conference Paper' ? 'Conference:' : 'Journal:'}
                    </span>
                    <p className="text-gray-900">{publication.journal}</p>
                  </div>
                )}
                
                {publication.publisher && (
                  <div>
                    <span className="font-medium text-gray-500">Publisher:</span>
                    <p className="text-gray-900">{publication.publisher}</p>
                  </div>
                )}
                
                {(publication.doi || publication.isbn) && (
                  <div>
                    <span className="font-medium text-gray-500">
                      {publication.isbn ? 'ISBN:' : 'DOI:'}
                    </span>
                    <p className="text-gray-900 font-mono text-sm">
                      {publication.isbn || publication.doi}
                    </p>
                  </div>
                )}
                
                {userRole === 'admin' && publication.facultyName && (
                  <div>
                    <span className="font-medium text-gray-500">Faculty:</span>
                    <p className="text-gray-900">{publication.facultyName}</p>
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
