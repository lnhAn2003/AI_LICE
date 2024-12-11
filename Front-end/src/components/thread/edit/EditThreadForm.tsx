import React, { useState, ChangeEvent, FormEvent } from 'react';

interface ThreadData {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  fileUrl?: string;
  images?: string[];
}

interface EditThreadFormProps {
  initialData?: ThreadData;
  onSubmit: (formData: FormData) => Promise<void>;
  submitButtonText: string;
}

const EditThreadForm: React.FC<EditThreadFormProps> = ({ initialData, onSubmit, submitButtonText }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [newTag, setNewTag] = useState('');

  // File handling
  const [file, setFile] = useState<File | null>(null);
  const [hasExistingFile, setHasExistingFile] = useState(!!initialData?.fileUrl);

  // Images
  const [existingImages, setExistingImages] = useState<string[]>(initialData?.images || []);
  const [imagesToRemove, setImagesToRemove] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArr = Array.from(e.target.files);
    setNewImages((prev) => [...prev, ...filesArr]);
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
  };

  const removeFileUrl = () => {
    setHasExistingFile(false);
    setFile(null);
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('tags', JSON.stringify(tags));

    // File (if any)
    if (file) {
      formData.append('file', file);
    } else if (!hasExistingFile) {
      formData.append('removeFile', 'true');
    }

    // Images
    const keepImages = existingImages.filter(img => !imagesToRemove.includes(img));
    formData.append('keepImages', JSON.stringify(keepImages));

    for (const img of newImages) {
      formData.append('images', img);
    }

    await onSubmit(formData);
  };

  return (
    <form 
      onSubmit={handleFormSubmit} 
      className="space-y-6 p-4 bg-white dark:bg-gray-800 rounded shadow border border-gray-300 dark:border-gray-700"
    >
      {/* Title & Content */}
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

      <div>
        <label className="block font-bold mb-1 text-gray-800 dark:text-gray-200">Content</label>
        <textarea
          className="w-full border p-2 rounded bg-gray-50 dark:bg-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
          value={content}
          onChange={(e) => setContent(e.target.value)}
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
              className="flex items-center px-2 py-1 text-sm rounded bg-green-200 dark:bg-green-700 text-gray-800 dark:text-gray-200"
            >
              {tag}
              <button
                type="button"
                className="ml-2 font-bold hover:text-red-600"
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

      {/* File */}
      <div>
        <label className="block font-bold mb-1 text-gray-800 dark:text-gray-200">Attach File (optional)</label>
        {hasExistingFile && initialData?.fileUrl && (
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm text-gray-700 dark:text-gray-300 underline">
              Current file: <a href={initialData.fileUrl} target="_blank" rel="noopener noreferrer">{initialData.fileUrl}</a>
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
          accept=".zip,.rar,.7z,.pdf,.txt,.docx"
          onChange={handleFileChange}
        />
      </div>

      {/* Images */}
      <div>
        <label className="block font-bold mb-1 text-gray-800 dark:text-gray-200">Images</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
          {/* Existing Images */}
          {existingImages.filter(img => !imagesToRemove.includes(img)).map((src, idx) => (
            <div key={idx} className="relative group">
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
            const preview = URL.createObjectURL(file);
            return (
              <div key={idx} className="relative group">
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

export default EditThreadForm;
