// src/components/course/edit/EditCourseForm.tsx
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { CourseData, Category } from '../../../types/course';
import { TAG_COLORS } from '../../../../styles/tagcolors'; 

interface EditCourseFormProps {
  initialData?: CourseData;
  onSubmit: (formData: FormData) => Promise<void>;
  submitButtonText: string;
  allCategories: Category[];
}

const EditCourseForm: React.FC<EditCourseFormProps> = ({ initialData, onSubmit, submitButtonText, allCategories }) => {
  // Initialize state variables with default values or values from initialData
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');

  // Categories
  const categoriesList = allCategories; // Assuming categories are flat
  const initialCategoryIds = initialData?.categories.map(cat => cat._id) || [];
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategoryIds);

  // Tags
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [newTag, setNewTag] = useState('');

  // File handling
  const [file, setFile] = useState<File | null>(null);
  const [hasExistingFile, setHasExistingFile] = useState(initialData ? initialData.resource.length > 0 : false);

  // Images
  const [existingImages, setExistingImages] = useState<string[]>(initialData?.screenshot || []);
  const [imagesToRemove, setImagesToRemove] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);

  // Helper for color classes
  const getColorClass = (index: number) => TAG_COLORS[index % TAG_COLORS.length];

  // Handlers
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArr = Array.from(e.target.files);
    const previews = filesArr.map(file => URL.createObjectURL(file));
    setNewImages(prev => [...prev, ...filesArr]);
    setNewImagePreviews(prev => [...prev, ...previews]);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setHasExistingFile(false);
    }
  };

  const handleAddTag = () => {
    const trimmed = newTag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const removeExistingImage = (url: string) => {
    setImagesToRemove([...imagesToRemove, url]);
  };

  const removeNewImage = (fileIndex: number) => {
    setNewImages(newImages.filter((_, i) => i !== fileIndex));
    setNewImagePreviews(newImagePreviews.filter((_, i) => i !== fileIndex));
  };

  const removeFileUrl = () => {
    setHasExistingFile(false);
    setFile(null);
  };

  const handleCategorySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = e.target.value;
    if (categoryId && !selectedCategories.includes(categoryId)) {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const removeCategory = (id: string) => {
    setSelectedCategories(selectedCategories.filter(c => c !== id));
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);

    // Categories, tags as JSON arrays
    formData.append('categories', JSON.stringify(selectedCategories));
    formData.append('tags', JSON.stringify(tags));

    // File (if any)
    if (file) {
      formData.append('resource', file);
    } else if (!hasExistingFile) {
      formData.append('removeResource', 'true');
    }

    // Images
    const keepImages = existingImages.filter(img => !imagesToRemove.includes(img));
    formData.append('keepImages', JSON.stringify(keepImages));

    for (const img of newImages) {
      formData.append('images', img);
    }

    try {
      await onSubmit(formData);
    } catch (error: any) {
      console.error('Form submission error:', error);
      // Optionally set an error state to display a message to the user
    }
  };

  useEffect(() => {
    // Cleanup object URLs on unmount or when newImages change
    return () => {
      newImagePreviews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [newImagePreviews]);

  return (
    <form
      onSubmit={handleFormSubmit}
      className="space-y-6 p-4 bg-white dark:bg-gray-800 rounded shadow border border-gray-300 dark:border-gray-700"
    >
      {/* Title & Description */}
      <div>
        <label htmlFor="title" className="block font-bold mb-1 text-gray-800 dark:text-gray-200">Title</label>
        <input
          id="title"
          className="w-full border p-2 rounded bg-gray-50 dark:bg-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block font-bold mb-1 text-gray-800 dark:text-gray-200">Description</label>
        <textarea
          id="description"
          className="w-full border p-2 rounded bg-gray-50 dark:bg-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          required
        />
      </div>

      {/* Categories */}
      <div>
        <label className="block font-bold mb-1 text-gray-800 dark:text-gray-200">Categories</label>
        <div className="mb-2 flex flex-wrap gap-2">
          {selectedCategories.map((cid, index) => {
            const category = categoriesList.find(c => c._id === cid);
            return (
              <span
                key={cid} // Use unique identifier instead of index
                className={`flex items-center px-2 py-1 text-sm rounded ${getColorClass(index)}`}
              >
                {category?.name}
                <button
                  type="button"
                  className="ml-2 text-gray-800 dark:text-gray-200 font-bold hover:text-red-600"
                  onClick={() => removeCategory(cid)}
                >&times;</button>
              </span>
            );
          })}
        </div>
        <select
          onChange={handleCategorySelect}
          className="border p-2 rounded w-full bg-gray-50 dark:bg-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
        >
          <option value="">Select a category</option>
          {categoriesList.map(c => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Tags */}
      <div>
        <label className="block font-bold mb-1 text-gray-800 dark:text-gray-200">Tags</label>
        <div className="mb-2 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag} // Use unique identifier instead of index
              className={`flex items-center px-2 py-1 text-sm rounded ${getColorClass(0)}`} // Optionally use a fixed index if color is not dynamic
            >
              {tag}
              <button
                type="button"
                className="ml-2 text-gray-800 dark:text-gray-200 font-bold hover:text-red-600"
                onClick={() => removeTag(tag)}
              >&times;</button>
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
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add
          </button>
        </div>
      </div>

      {/* Resource File
      <div>
        <label className="block font-bold mb-1 text-gray-800 dark:text-gray-200">Resource File (optional)</label>
        {hasExistingFile && initialData?.resource.length > 0 && (
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm text-gray-700 dark:text-gray-300 underline">
              Current resource: <a href={initialData.resource[0]} target="_blank" rel="noopener noreferrer">{initialData.resource[0]}</a>
            </span>
            <button
              type="button"
              className="text-red-500 hover:text-red-700"
              onClick={removeFileUrl}
            >
              &times;
            </button>
          </div>
        )}
        <input
          className="w-full text-gray-800 dark:text-gray-200"
          type="file"
          accept=".pdf,.docx,.zip,.rar,.7z,.exe,.apk,.ipa"
          onChange={handleFileChange}
        />
      </div> */}

      {/* Images */}
      <div>
        <label className="block font-bold mb-1 text-gray-800 dark:text-gray-200">Images</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
          {/* Existing Images */}
          {existingImages.filter(img => !imagesToRemove.includes(img)).map((src) => (
            <div key={src} className="relative group">
              <img src={src} alt="Existing" className="w-full h-20 object-cover rounded border dark:border-gray-700" />
              <button
                type="button"
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeExistingImage(src)}
              >
                &times;
              </button>
            </div>
          ))}

          {/* New Images */}
          {newImages.map((file, idx) => {
            const preview = newImagePreviews[idx];
            return (
              <div key={preview} className="relative group">
                <img src={preview} alt="New" className="w-full h-20 object-cover rounded border dark:border-gray-700" />
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeNewImage(idx)}
                >
                  &times;
                </button>
              </div>
            );
          })}
        </div>
        <input
          className="w-full text-gray-800 dark:text-gray-200"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Add new images or remove existing ones using the "X" button.</p>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {submitButtonText}
      </button>
    </form>
  );
};

export default EditCourseForm;
