import React, { useState, ChangeEvent, FormEvent } from 'react';

interface PostData {
  _id: string;
  content: string;
  fileUrl?: string;
  images?: string[];
}

interface EditPostFormProps {
  initialData?: PostData;
  onSubmit: (formData: FormData) => Promise<void>;
  submitButtonText: string;
  threadId: string;
}

const EditPostForm: React.FC<EditPostFormProps> = ({ initialData, onSubmit, submitButtonText, threadId }) => {
  const [content, setContent] = useState(initialData?.content || '');
  const [file, setFile] = useState<File | null>(null);
  const [hasExistingFile, setHasExistingFile] = useState(!!initialData?.fileUrl);
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
    formData.append('content', content);

    if (file) {
      formData.append('file', file);
    } else if (!hasExistingFile) {
      formData.append('removeFile', 'true');
    }

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
      className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
    >

      {/* Content */}
      <div>
        <label className="block font-bold mb-1 text-gray-800 dark:text-gray-200">Content</label>
        <textarea
          className="w-full border p-4 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          required
          placeholder="Write your post content here..."
        />
      </div>

      {/* File */}
      <div>
        <label className="block font-bold mb-1 text-gray-800 dark:text-gray-200">Attach File (optional)</label>
        {hasExistingFile && initialData?.fileUrl && (
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400 underline">
              Current file: <a href={initialData.fileUrl} target="_blank" rel="noopener noreferrer">{initialData.fileUrl}</a>
            </span>
            <button
              type="button"
              className="text-red-500 hover:text-red-700"
              onClick={removeFileUrl}
            >
              Remove
            </button>
          </div>
        )}
        <input
          className="w-full border p-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          type="file"
          onChange={handleFileChange}
        />
      </div>

      {/* Images */}
      <div>
        <label className="block font-bold mb-1 text-gray-800 dark:text-gray-200">Images</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {/* Existing Images */}
          {existingImages.filter(img => !imagesToRemove.includes(img)).map((src, idx) => (
            <div key={idx} className="relative group">
              <img src={src} alt="Existing" className="w-full h-24 object-cover rounded-md border dark:border-gray-600" />
              <button
                type="button"
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100"
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
                <img src={preview} alt="New" className="w-full h-24 object-cover rounded-md border dark:border-gray-600" />
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100"
                  onClick={() => removeNewImage(idx)}
                >
                  &times;
                </button>
              </div>
            );
          })}
        </div>
        <input
          className="w-full border p-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Add new images or remove existing ones using the buttons above.
        </p>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
      >
        {submitButtonText}
      </button>
    </form>
  );
};

export default EditPostForm;
