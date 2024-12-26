// src/components/course/edit/NewLessonForm.tsx
import React, { useState, FormEvent } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import { useRouter } from 'next/router';

interface NewLessonFormProps {
  sectionId: string;
  onLessonCreated: () => void;
}

const NewLessonForm: React.FC<NewLessonFormProps> = ({ sectionId, onLessonCreated }) => {
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [textContent, setTextContent] = useState('');
  const [resources, setResources] = useState<FileList | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('sectionId', sectionId);
    formData.append('title', title);
    formData.append('videoUrl', videoUrl);
    formData.append('textContent', textContent);

    if (resources) {
      Array.from(resources).forEach(file => {
        formData.append('resources', file);
      });
    }

    try {
      const res = await axiosInstance.post('/lessons', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Lesson created successfully!');
      setTitle('');
      setVideoUrl('');
      setTextContent('');
      setResources(null);
      onLessonCreated();
    } catch (error: any) {
      console.error('Error creating lesson:', error);
      const message = error.response?.data?.message || 'Failed to create lesson. Please try again.';
      alert(message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="space-y-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Lesson Title"
          className="w-full border p-2 rounded bg-gray-50 dark:bg-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
          required
        />
        <input
          type="url"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="Video URL"
          className="w-full border p-2 rounded bg-gray-50 dark:bg-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
        />
        <textarea
          value={textContent}
          onChange={(e) => setTextContent(e.target.value)}
          placeholder="Text Content"
          className="w-full border p-2 rounded bg-gray-50 dark:bg-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
          rows={4}
        />
        <input
          type="file"
          multiple
          onChange={(e) => setResources(e.target.files)}
          className="w-full text-gray-800 dark:text-gray-200"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Lesson
        </button>
      </div>
    </form>
  );
};

export default NewLessonForm;
