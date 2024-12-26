// src/components/course/edit/EditCourseForm.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Category } from '../../../types/course';

interface EditCourseFormProps {
  initialData?: {
    title: string;
    description: string;
    tags: string[];
    categories: string[];
    resource: string[];
    screenshot: string[];
  };
  onSubmit: (formData: FormData) => Promise<void>;
  submitButtonText: string;
  allCategories: Category[];
}

const EditCourseForm: React.FC<EditCourseFormProps> = ({
  initialData,
  onSubmit,
  submitButtonText,
  allCategories,
}) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');

  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [newTag, setNewTag] = useState('');

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialData?.categories || []
  );

  const [resources, setResources] = useState<File[]>([]);
  const [existingResources, setExistingResources] = useState<string[]>(initialData?.resource || []);
  const [resourcesToRemove, setResourcesToRemove] = useState<string[]>([]);

  const [screenshots, setScreenshots] = useState<File[]>([]);
  const [existingScreenshots, setExistingScreenshots] = useState<string[]>(
    initialData?.screenshot || []
  );
  const [screenshotsToRemove, setScreenshotsToRemove] = useState<string[]>([]);

  const handleAddTag = () => {
    const trimmed = newTag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    if (selectedId && !selectedCategories.includes(selectedId)) {
      setSelectedCategories([...selectedCategories, selectedId]);
    }
  };

  const removeCategory = (id: string) => {
    setSelectedCategories(selectedCategories.filter((c) => c !== id));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, setFiles: React.Dispatch<React.SetStateAction<File[]>>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...filesArray]);
  };

  const removeExistingFile = (url: string, setToRemove: React.Dispatch<React.SetStateAction<string[]>>) => {
    setToRemove((prev) => [...prev, url]);
  };

  const removeNewFile = (index: number, setFiles: React.Dispatch<React.SetStateAction<File[]>>) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tags', JSON.stringify(tags));
    formData.append('categories', JSON.stringify(selectedCategories));

    // Screenshots
    const keepScreenshots = existingScreenshots.filter((url) => !screenshotsToRemove.includes(url));
    formData.append('keepScreenshots', JSON.stringify(keepScreenshots));
    screenshots.forEach((file) => formData.append('images', file));

    // Resources
    const keepResources = existingResources.filter((url) => !resourcesToRemove.includes(url));
    formData.append('keepResources', JSON.stringify(keepResources));
    resources.forEach((file) => formData.append('resources', file));

    await onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="space-y-6 p-4 bg-white dark:bg-gray-800 rounded shadow border border-gray-300 dark:border-gray-700"
    >
      {/* Title */}
      <div>
        <label className="block font-bold mb-1 text-gray-800 dark:text-gray-200">Title</label>
        <input
          className="w-full border p-2 rounded bg-gray-50 dark:bg-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="block font-bold mb-1 text-gray-800 dark:text-gray-200">Description</label>
        <textarea
          className="w-full border p-2 rounded bg-gray-50 dark:bg-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          required
        />
      </div>

      {/* Tags */}
      <div>
        <label className="block font-bold mb-1 text-gray-800 dark:text-gray-200">Tags</label>
        <div className="mb-2 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center px-2 py-1 text-sm rounded bg-gray-200 dark:bg-gray-700"
            >
              {tag}
              <button
                type="button"
                className="ml-2 text-red-500"
                onClick={() => removeTag(tag)}
              >
                &times;
              </button>
            </span>
          ))}
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            className="border p-2 rounded w-full bg-gray-50 dark:bg-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add new tag"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      </div>

      {/* Categories */}
      <div>
        <label className="block font-bold mb-1 text-gray-800 dark:text-gray-200">Categories</label>
        <div className="mb-2 flex flex-wrap gap-2">
          {selectedCategories.map((catId, index) => {
            const category = allCategories.find((cat) => cat._id === catId);
            return (
              <span
                key={index}
                className="flex items-center px-2 py-1 text-sm rounded bg-gray-200 dark:bg-gray-700"
              >
                {category?.name || 'Unknown'}
                <button
                  type="button"
                  className="ml-2 text-red-500"
                  onClick={() => removeCategory(catId)}
                >
                  &times;
                </button>
              </span>
            );
          })}
        </div>
        <select
          onChange={handleCategoryChange}
          className="border p-2 rounded w-full bg-gray-50 dark:bg-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
        >
          <option value="">Select a category</option>
          {allCategories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Screenshots */}
      <div>
        <label className="block font-bold mb-1 text-gray-800 dark:text-gray-200">Screenshots</label>
        <div className="grid grid-cols-2 gap-4 mb-2">
          {existingScreenshots.map((src, idx) => (
            <div key={idx} className="relative group">
              <img src={src} alt="Screenshot" className="w-full h-20 object-cover rounded border" />
              <button
                type="button"
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                onClick={() => removeExistingFile(src, setScreenshotsToRemove)}
              >
                &times;
              </button>
            </div>
          ))}
          {screenshots.map((file, idx) => (
            <div key={idx} className="relative group">
              <img
                src={URL.createObjectURL(file)}
                alt="New Screenshot"
                className="w-full h-20 object-cover rounded border"
              />
              <button
                type="button"
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                onClick={() => removeNewFile(idx, setScreenshots)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFileChange(e, setScreenshots)}
        />
      </div>

      {/* Resources */}
      <div>
        <label className="block font-bold mb-1 text-gray-800 dark:text-gray-200">Resources</label>
        <div>
          {resources.map((file, idx) => (
            <div key={idx} className="flex justify-between items-center">
              <span>{file.name}</span>
              <button
                type="button"
                onClick={() => removeNewFile(idx, setResources)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <input
          type="file"
          accept=".pdf,.zip,.rar"
          multiple
          onChange={(e) => handleFileChange(e, setResources)}
        />
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {submitButtonText}
      </button>
    </form>
  );
};

export default EditCourseForm;
