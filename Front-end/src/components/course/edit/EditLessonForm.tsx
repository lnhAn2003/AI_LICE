// src/components/course/edit/EditLessonForm.tsx

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Lesson, Category } from '../../../types/course';

interface EditLessonFormProps {
  initialData: Lesson;
  onSubmit: (formData: FormData) => Promise<void>;
  submitButtonText: string;
}

const EditLessonForm: React.FC<EditLessonFormProps> = ({
  initialData,
  onSubmit,
  submitButtonText
}) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [videoUrl, setVideoUrl] = useState(initialData.videoUrl || '');
  const [textContent, setTextContent] = useState(initialData.textContent || '');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('videoUrl', videoUrl);
    formData.append('textContent', textContent);

    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label className="block font-bold mb-1">Lesson Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Video URL */}
      <div>
        <label className="block font-bold mb-1">Video URL</label>
        <input
          type="url"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Text Content */}
      <div>
        <label className="block font-bold mb-1">Text Content</label>
        <textarea
          value={textContent}
          onChange={(e) => setTextContent(e.target.value)}
          rows={6}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {submitButtonText}
      </button>
    </form>
  );
};

export default EditLessonForm;
