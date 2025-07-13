
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CertificateForm } from './CertificateForm';
import { CertificateList } from './CertificateList';

interface CertificatesManagementProps {
  userRole: 'faculty' | 'admin' | null;
}

export interface Certificate {
  id: string;
  title: string;
  date: string;
  issuingBody: string;
  category: 'FDP' | 'Course' | 'Workshop' | 'Training' | 'Other';
  description?: string;
  facultyName?: string;
}

const CERTIFICATES_STORAGE_KEY = 'certificates';

export const CertificatesManagement = ({ userRole }: CertificatesManagementProps) => {
  const [showForm, setShowForm] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState<Certificate | null>(null);
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedCertificates = localStorage.getItem(CERTIFICATES_STORAGE_KEY);
    if (savedCertificates) {
      try {
        setCertificates(JSON.parse(savedCertificates));
      } catch (error) {
        console.error('Error loading certificates from localStorage:', error);
        // Initialize with default data if localStorage is corrupted
        const defaultCertificates = [
          {
            id: '1',
            title: 'Advanced Web Development Certificate',
            date: '2024-03-15',
            issuingBody: 'IIT Delhi',
            category: 'FDP' as const,
            description: 'Completed 40-hour intensive workshop on modern web development',
            facultyName: 'Dr. Smith'
          },
          {
            id: '2',
            title: 'Python Programming Certification',
            date: '2024-02-20',
            issuingBody: 'Coursera',
            category: 'Course' as const,
            description: 'Online certification in Python programming and data science',
            facultyName: 'Dr. Johnson'
          }
        ];
        setCertificates(defaultCertificates);
        localStorage.setItem(CERTIFICATES_STORAGE_KEY, JSON.stringify(defaultCertificates));
      }
    } else {
      // Initialize with default data if no saved certificates
      const defaultCertificates = [
        {
          id: '1',
          title: 'Advanced Web Development Certificate',
          date: '2024-03-15',
          issuingBody: 'IIT Delhi',
          category: 'FDP' as const,
          description: 'Completed 40-hour intensive workshop on modern web development',
          facultyName: 'Dr. Smith'
        },
        {
          id: '2',
          title: 'Python Programming Certification',
          date: '2024-02-20',
          issuingBody: 'Coursera',
          category: 'Course' as const,
          description: 'Online certification in Python programming and data science',
          facultyName: 'Dr. Johnson'
        }
      ];
      setCertificates(defaultCertificates);
      localStorage.setItem(CERTIFICATES_STORAGE_KEY, JSON.stringify(defaultCertificates));
    }
  }, []);

  // Save to localStorage whenever certificates change
  useEffect(() => {
    localStorage.setItem(CERTIFICATES_STORAGE_KEY, JSON.stringify(certificates));
  }, [certificates]);

  const handleAddCertificate = (certificate: Omit<Certificate, 'id'>) => {
    const newCertificate = {
      ...certificate,
      id: Date.now().toString(),
      facultyName: userRole === 'faculty' ? 'Current User' : certificate.facultyName || 'Unknown'
    };
    setCertificates([...certificates, newCertificate]);
    setShowForm(false);
  };

  const handleEditCertificate = (certificate: Certificate) => {
    setEditingCertificate(certificate);
    setShowForm(true);
  };

  const handleUpdateCertificate = (updatedCertificate: Omit<Certificate, 'id'>) => {
    if (editingCertificate) {
      setCertificates(certificates.map(cert => 
        cert.id === editingCertificate.id 
          ? { ...updatedCertificate, id: editingCertificate.id }
          : cert
      ));
      setEditingCertificate(null);
      setShowForm(false);
    }
  };

  const handleDeleteCertificate = (id: string) => {
    setCertificates(certificates.filter(cert => cert.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Certificates Management</h1>
        <Button 
          onClick={() => {
            setEditingCertificate(null);
            setShowForm(true);
          }}
          className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
        >
          Add New Certificate
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingCertificate ? 'Edit Certificate' : 'Add New Certificate'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CertificateForm 
              onSubmit={editingCertificate ? handleUpdateCertificate : handleAddCertificate}
              onCancel={() => {
                setShowForm(false);
                setEditingCertificate(null);
              }}
              initialData={editingCertificate}
              userRole={userRole}
            />
          </CardContent>
        </Card>
      )}

      <CertificateList 
        certificates={certificates}
        onEdit={handleEditCertificate}
        onDelete={handleDeleteCertificate}
        userRole={userRole}
      />
    </div>
  );
};
