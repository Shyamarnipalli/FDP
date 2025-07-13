
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Publication } from './PublicationsManagement';

interface PublicationFormProps {
  onSubmit: (publication: Omit<Publication, 'id'>) => void;
  onCancel: () => void;
  initialData?: Publication | null;
  userRole: 'faculty' | 'admin' | null;
}

export const PublicationForm = ({ onSubmit, onCancel, initialData, userRole }: PublicationFormProps) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    type: initialData?.type || 'Journal' as 'Journal' | 'Book' | 'Conference Paper' | 'Book Chapter',
    authors: initialData?.authors || '',
    year: initialData?.year || '',
    doi: initialData?.doi || '',
    isbn: initialData?.isbn || '',
    journal: initialData?.journal || '',
    publisher: initialData?.publisher || '',
    facultyName: initialData?.facultyName || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.authors || !formData.year) {
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
      description: `Publication ${initialData ? 'updated' : 'added'} successfully`,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter publication title"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Type *</Label>
          <Select value={formData.type} onValueChange={(value: 'Journal' | 'Book' | 'Conference Paper' | 'Book Chapter') => setFormData({ ...formData, type: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Journal">Journal Paper</SelectItem>
              <SelectItem value="Book">Book</SelectItem>
              <SelectItem value="Conference Paper">Conference Paper</SelectItem>
              <SelectItem value="Book Chapter">Book Chapter</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="year">Year *</Label>
          <Input
            id="year"
            type="number"
            min="1900"
            max="2030"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            placeholder="2024"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="authors">Authors *</Label>
        <Textarea
          id="authors"
          value={formData.authors}
          onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
          placeholder="Enter all authors (comma separated)"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(formData.type === 'Journal' || formData.type === 'Conference Paper') && (
          <div className="space-y-2">
            <Label htmlFor="journal">Journal/Conference Name</Label>
            <Input
              id="journal"
              value={formData.journal}
              onChange={(e) => setFormData({ ...formData, journal: e.target.value })}
              placeholder="Enter journal or conference name"
            />
          </div>
        )}

        {(formData.type === 'Book' || formData.type === 'Book Chapter') && (
          <div className="space-y-2">
            <Label htmlFor="publisher">Publisher</Label>
            <Input
              id="publisher"
              value={formData.publisher}
              onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
              placeholder="Enter publisher name"
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="doi">DOI/ISBN</Label>
          <Input
            id="doi"
            value={formData.doi || formData.isbn}
            onChange={(e) => {
              if (formData.type === 'Book' || formData.type === 'Book Chapter') {
                setFormData({ ...formData, isbn: e.target.value });
              } else {
                setFormData({ ...formData, doi: e.target.value });
              }
            }}
            placeholder={formData.type === 'Book' || formData.type === 'Book Chapter' ? "Enter ISBN" : "Enter DOI"}
          />
        </div>
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
        <Label htmlFor="file">Upload File (Optional)</Label>
        <Input
          id="file"
          type="file"
          accept=".pdf,.doc,.docx"
          className="cursor-pointer"
        />
        <p className="text-xs text-gray-500">Upload publication file (PDF, DOC, DOCX)</p>
      </div>

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
          {initialData ? 'Update Publication' : 'Add Publication'}
        </Button>
      </div>
    </form>
  );
};
