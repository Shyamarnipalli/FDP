
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PublicationForm } from './PublicationForm';
import { PublicationList } from './PublicationList';

interface PublicationsManagementProps {
  userRole: 'faculty' | 'admin' | null;
}

export interface Publication {
  id: string;
  title: string;
  type: 'Journal' | 'Book' | 'Conference Paper' | 'Book Chapter';
  authors: string;
  year: string;
  doi?: string;
  isbn?: string;
  journal?: string;
  publisher?: string;
  facultyName?: string;
}

const PUBLICATIONS_STORAGE_KEY = 'publications';

export const PublicationsManagement = ({ userRole }: PublicationsManagementProps) => {
  const [showForm, setShowForm] = useState(false);
  const [editingPublication, setEditingPublication] = useState<Publication | null>(null);
  const [publications, setPublications] = useState<Publication[]>([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedPublications = localStorage.getItem(PUBLICATIONS_STORAGE_KEY);
    if (savedPublications) {
      try {
        setPublications(JSON.parse(savedPublications));
      } catch (error) {
        console.error('Error loading publications from localStorage:', error);
        // Initialize with default data if localStorage is corrupted
        const defaultPublications = [
          {
            id: '1',
            title: 'Machine Learning in Education: A Comprehensive Review',
            type: 'Journal' as const,
            authors: 'Dr. Smith, Dr. Johnson, Dr. Brown',
            year: '2024',
            doi: '10.1234/example.2024.001',
            journal: 'Journal of Educational Technology',
            facultyName: 'Dr. Smith'
          },
          {
            id: '2',
            title: 'Advanced Web Development Techniques',
            type: 'Book' as const,
            authors: 'Dr. Johnson',
            year: '2023',
            isbn: '978-0123456789',
            publisher: 'Tech Publications',
            facultyName: 'Dr. Johnson'
          }
        ];
        setPublications(defaultPublications);
        localStorage.setItem(PUBLICATIONS_STORAGE_KEY, JSON.stringify(defaultPublications));
      }
    } else {
      // Initialize with default data if no saved publications
      const defaultPublications = [
        {
          id: '1',
          title: 'Machine Learning in Education: A Comprehensive Review',
          type: 'Journal' as const,
          authors: 'Dr. Smith, Dr. Johnson, Dr. Brown',
          year: '2024',
          doi: '10.1234/example.2024.001',
          journal: 'Journal of Educational Technology',
          facultyName: 'Dr. Smith'
        },
        {
          id: '2',
          title: 'Advanced Web Development Techniques',
          type: 'Book' as const,
          authors: 'Dr. Johnson',
          year: '2023',
          isbn: '978-0123456789',
          publisher: 'Tech Publications',
          facultyName: 'Dr. Johnson'
        }
      ];
      setPublications(defaultPublications);
      localStorage.setItem(PUBLICATIONS_STORAGE_KEY, JSON.stringify(defaultPublications));
    }
  }, []);

  // Save to localStorage whenever publications change
  useEffect(() => {
    localStorage.setItem(PUBLICATIONS_STORAGE_KEY, JSON.stringify(publications));
  }, [publications]);

  const handleAddPublication = (publication: Omit<Publication, 'id'>) => {
    const newPublication = {
      ...publication,
      id: Date.now().toString(),
      facultyName: userRole === 'faculty' ? 'Current User' : publication.facultyName || 'Unknown'
    };
    setPublications([...publications, newPublication]);
    setShowForm(false);
  };

  const handleEditPublication = (publication: Publication) => {
    setEditingPublication(publication);
    setShowForm(true);
  };

  const handleUpdatePublication = (updatedPublication: Omit<Publication, 'id'>) => {
    if (editingPublication) {
      setPublications(publications.map(pub => 
        pub.id === editingPublication.id 
          ? { ...updatedPublication, id: editingPublication.id }
          : pub
      ));
      setEditingPublication(null);
      setShowForm(false);
    }
  };

  const handleDeletePublication = (id: string) => {
    setPublications(publications.filter(pub => pub.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Publications & Books</h1>
        <Button 
          onClick={() => {
            setEditingPublication(null);
            setShowForm(true);
          }}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
        >
          Add New Publication
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingPublication ? 'Edit Publication' : 'Add New Publication'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PublicationForm 
              onSubmit={editingPublication ? handleUpdatePublication : handleAddPublication}
              onCancel={() => {
                setShowForm(false);
                setEditingPublication(null);
              }}
              initialData={editingPublication}
              userRole={userRole}
            />
          </CardContent>
        </Card>
      )}

      <PublicationList 
        publications={publications}
        onEdit={handleEditPublication}
        onDelete={handleDeletePublication}
        userRole={userRole}
      />
    </div>
  );
};
