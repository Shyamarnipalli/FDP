
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Certificate } from './CertificatesManagement';

interface CertificateFormProps {
  onSubmit: (certificate: Omit<Certificate, 'id'>) => void;
  onCancel: () => void;
  initialData?: Certificate | null;
  userRole: 'faculty' | 'admin' | null;
}

export const CertificateForm = ({ onSubmit, onCancel, initialData, userRole }: CertificateFormProps) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    date: initialData?.date || '',
    issuingBody: initialData?.issuingBody || '',
    category: initialData?.category || 'FDP' as 'FDP' | 'Course' | 'Workshop' | 'Training' | 'Other',
    description: initialData?.description || '',
    facultyName: initialData?.facultyName || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.date || !formData.issuingBody) {
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
      description: `Certificate ${initialData ? 'updated' : 'added'} successfully`,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Certificate Title *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter certificate title"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date Issued *</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select value={formData.category} onValueChange={(value: 'FDP' | 'Course' | 'Workshop' | 'Training' | 'Other') => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="FDP">FDP</SelectItem>
              <SelectItem value="Course">Course</SelectItem>
              <SelectItem value="Workshop">Workshop</SelectItem>
              <SelectItem value="Training">Training</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="issuingBody">Issuing Body *</Label>
        <Input
          id="issuingBody"
          value={formData.issuingBody}
          onChange={(e) => setFormData({ ...formData, issuingBody: e.target.value })}
          placeholder="Enter issuing organization"
          required
        />
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

      <div className="space-y-2">
        <Label htmlFor="description">Description (Optional)</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Enter certificate description"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="file">Upload Certificate File *</Label>
        <Input
          id="file"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="cursor-pointer"
          required={!initialData}
        />
        <p className="text-xs text-gray-500">Upload certificate file (PDF, JPG, PNG)</p>
      </div>

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
          {initialData ? 'Update Certificate' : 'Add Certificate'}
        </Button>
      </div>
    </form>
  );
};
