
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { FDPRecord } from './FDPManagement';

interface FDPFormProps {
  onSubmit: (record: Omit<FDPRecord, 'id'>) => void;
  onCancel: () => void;
  initialData?: FDPRecord | null;
  userRole: 'faculty' | 'admin' | null;
}

export const FDPForm = ({ onSubmit, onCancel, initialData, userRole }: FDPFormProps) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    type: initialData?.type || '',
    date: initialData?.date || '',
    venue: initialData?.venue || '',
    level: initialData?.level || 'National' as 'National' | 'International',
    facultyName: initialData?.facultyName || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.type || !formData.date || !formData.venue) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    onSubmit(formData);
    toast({
      title: "Success",
      description: `FDP record ${initialData ? 'updated' : 'added'} successfully`,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter FDP/Workshop title"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="type">Type *</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Workshop">Workshop</SelectItem>
              <SelectItem value="Seminar">Seminar</SelectItem>
              <SelectItem value="Conference">Conference</SelectItem>
              <SelectItem value="Training">Training</SelectItem>
              <SelectItem value="FDP">FDP</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Date *</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="venue">Venue *</Label>
          <Input
            id="venue"
            value={formData.venue}
            onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
            placeholder="Enter venue"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="level">Level *</Label>
          <Select value={formData.level} onValueChange={(value: 'National' | 'International') => setFormData({ ...formData, level: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="National">National</SelectItem>
              <SelectItem value="International">International</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {userRole === 'admin' && (
          <div className="space-y-2">
            <Label htmlFor="facultyName">Faculty Name</Label>
            <Input
              id="facultyName"
              value={formData.facultyName}
              onChange={(e) => setFormData({ ...formData, facultyName: e.target.value })}
              placeholder="Enter faculty name"
            />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="certificate">Certificate (Optional)</Label>
        <Input
          id="certificate"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="cursor-pointer"
        />
        <p className="text-xs text-gray-500">Upload certificate file (PDF, JPG, PNG)</p>
      </div>

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
          {initialData ? 'Update Record' : 'Add Record'}
        </Button>
      </div>
    </form>
  );
};
