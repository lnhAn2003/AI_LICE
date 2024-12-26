// src/components/course/edit/NewSectionForm.tsx
import React, { useState, FormEvent } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import { useRouter } from 'next/router';

interface NewSectionFormProps {
  courseId: string;
  onSectionCreated: () => void;
}

const NewSectionForm: React.FC<NewSectionFormProps> = ({ courseId, onSectionCreated }) => {
  const [sectionTitle, setSectionTitle] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post('/sections', { courseId, sectionTitle });
      alert('Section created successfully!');
      setSectionTitle('');
      onSectionCreated();
    } catch (error: any) {
      console.error('Error creating section:', error);
      const message = error.response?.data?.message || 'Failed to create section. Please try again.';
      alert(message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex space-x-2">
        <input
          type="text"
          value={sectionTitle}
          onChange={(e) => setSectionTitle(e.target.value)}
          placeholder="Section Title"
          className="flex-1 border p-2 rounded bg-gray-50 dark:bg-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Section
        </button>
      </div>
    </form>
  );
};

export default NewSectionForm;
