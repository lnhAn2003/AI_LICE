// src/components/course/edit/EditSectionForm.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Section, Category } from '../../../types/course';
import { TAG_COLORS } from '../../../../styles/tagcolors';

interface EditSectionFormProps {
  initialData: Section;
  onSubmit: (formData: FormData) => Promise<void>;
  submitButtonText: string;
}

const EditSectionForm: React.FC<EditSectionFormProps> = ({ initialData, onSubmit, submitButtonText }) => {
  const [sectionTitle, setSectionTitle] = useState(initialData.sectionTitle || '');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('sectionTitle', sectionTitle);
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Section Title */}
      <div>
        <label className="block font-bold mb-1">Section Title</label>
        <input
          type="text"
          value={sectionTitle}
          onChange={(e) => setSectionTitle(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Submit Button */}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        {submitButtonText}
      </button>
    </form>
  );
};

export default EditSectionForm;
