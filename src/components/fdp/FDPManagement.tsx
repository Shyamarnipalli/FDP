
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FDPForm } from './FDPForm';
import { FDPList } from './FDPList';

interface FDPManagementProps {
  userRole: 'faculty' | 'admin' | null;
}

export interface FDPRecord {
  id: string;
  title: string;
  type: string;
  date: string;
  venue: string;
  level: 'National' | 'International';
  certificate?: File;
  facultyName?: string;
}

const FDP_STORAGE_KEY = 'fdp_records';

export const FDPManagement = ({ userRole }: FDPManagementProps) => {
  const [showForm, setShowForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState<FDPRecord | null>(null);
  const [records, setRecords] = useState<FDPRecord[]>([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedRecords = localStorage.getItem(FDP_STORAGE_KEY);
    if (savedRecords) {
      try {
        setRecords(JSON.parse(savedRecords));
      } catch (error) {
        console.error('Error loading FDP records from localStorage:', error);
        // Initialize with default data if localStorage is corrupted
        const defaultRecords = [
          {
            id: '1',
            title: 'Advanced Web Development Workshop',
            type: 'Workshop',
            date: '2024-03-15',
            venue: 'IIT Delhi',
            level: 'National' as const,
            facultyName: 'Dr. Smith'
          },
          {
            id: '2',
            title: 'International Conference on AI',
            type: 'Conference',
            date: '2024-02-20',
            venue: 'MIT, USA',
            level: 'International' as const,
            facultyName: 'Dr. Johnson'
          }
        ];
        setRecords(defaultRecords);
        localStorage.setItem(FDP_STORAGE_KEY, JSON.stringify(defaultRecords));
      }
    } else {
      // Initialize with default data if no saved records
      const defaultRecords = [
        {
          id: '1',
          title: 'Advanced Web Development Workshop',
          type: 'Workshop',
          date: '2024-03-15',
          venue: 'IIT Delhi',
          level: 'National' as const,
          facultyName: 'Dr. Smith'
        },
        {
          id: '2',
          title: 'International Conference on AI',
          type: 'Conference',
          date: '2024-02-20',
          venue: 'MIT, USA',
          level: 'International' as const,
          facultyName: 'Dr. Johnson'
        }
      ];
      setRecords(defaultRecords);
      localStorage.setItem(FDP_STORAGE_KEY, JSON.stringify(defaultRecords));
    }
  }, []);

  // Save to localStorage whenever records change
  useEffect(() => {
    localStorage.setItem(FDP_STORAGE_KEY, JSON.stringify(records));
  }, [records]);

  const handleAddRecord = (record: Omit<FDPRecord, 'id'>) => {
    const newRecord = {
      ...record,
      id: Date.now().toString(),
      facultyName: userRole === 'faculty' ? 'Current User' : record.facultyName || 'Unknown'
    };
    setRecords([...records, newRecord]);
    setShowForm(false);
  };

  const handleEditRecord = (record: FDPRecord) => {
    setEditingRecord(record);
    setShowForm(true);
  };

  const handleUpdateRecord = (updatedRecord: Omit<FDPRecord, 'id'>) => {
    if (editingRecord) {
      setRecords(records.map(record => 
        record.id === editingRecord.id 
          ? { ...updatedRecord, id: editingRecord.id }
          : record
      ));
      setEditingRecord(null);
      setShowForm(false);
    }
  };

  const handleDeleteRecord = (id: string) => {
    setRecords(records.filter(record => record.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">FDP & Workshops Management</h1>
        <Button 
          onClick={() => {
            setEditingRecord(null);
            setShowForm(true);
          }}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
        >
          Add New FDP Record
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingRecord ? 'Edit FDP Record' : 'Add New FDP Record'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FDPForm 
              onSubmit={editingRecord ? handleUpdateRecord : handleAddRecord}
              onCancel={() => {
                setShowForm(false);
                setEditingRecord(null);
              }}
              initialData={editingRecord}
              userRole={userRole}
            />
          </CardContent>
        </Card>
      )}

      <FDPList 
        records={records}
        onEdit={handleEditRecord}
        onDelete={handleDeleteRecord}
        userRole={userRole}
      />
    </div>
  );
};
