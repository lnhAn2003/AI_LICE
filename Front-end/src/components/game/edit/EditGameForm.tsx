import React, { useState, ChangeEvent, FormEvent } from 'react';
import { GameData, Category } from '../../../types/game';
import { TAG_COLORS } from '../../../../styles/tagcolors'; // adjust path as needed

interface EditGameFormProps {
  initialData?: GameData;
  onSubmit: (formData: FormData) => Promise<void>;
  submitButtonText: string;
  allCategories: Category[];
}

const EditGameForm: React.FC<EditGameFormProps> = ({ initialData, onSubmit, submitButtonText, allCategories }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');

  // Separate categories
  const genres = allCategories.filter(cat => cat.key === 'game_genre');
  const engines = allCategories.filter(cat => cat.key === 'game_engine');

  // Initial categories if editing an existing game
  const initialCategoryIds = (initialData?.categories || []).map(cat => cat._id);
  const initialSelectedGenres = initialData ? initialCategoryIds.filter(id => genres.some(g => g._id === id)) : [];
  const initialSelectedEngines = initialData ? initialCategoryIds.filter(id => engines.some(e => e._id === id)) : [];

  const [selectedGenres, setSelectedGenres] = useState<string[]>(initialSelectedGenres);
  const [selectedEngines, setSelectedEngines] = useState<string[]>(initialSelectedEngines);

  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [newTag, setNewTag] = useState('');

  const [platforms, setPlatforms] = useState<string[]>(initialData?.platforms || []);
  const [newPlatform, setNewPlatform] = useState('');

  // File handling
  const [file, setFile] = useState<File | null>(null);
  const [hasExistingFile, setHasExistingFile] = useState(!!initialData?.fileUrl);

  // Images
  const [existingImages, setExistingImages] = useState<string[]>(initialData?.images || []);
  const [imagesToRemove, setImagesToRemove] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);

  // External Links
  const [officialWebsite, setOfficialWebsite] = useState(initialData?.externalLinks.officialWebsite || '');
  const [gameplayVideo, setGameplayVideo] = useState(initialData?.externalLinks.gameplayVideo || '');
  const [communityForum, setCommunityForum] = useState(initialData?.externalLinks.communityForum || '');

  // Helper for color classes
  const getColorClass = (index: number) => TAG_COLORS[index % TAG_COLORS.length];

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

  const handleSelectGenre = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const genreId = e.target.value;
    if (genreId && !selectedGenres.includes(genreId)) {
      setSelectedGenres([...selectedGenres, genreId]);
    }
  };

  const removeGenre = (id: string) => {
    setSelectedGenres(selectedGenres.filter(g => g !== id));
  };

  const handleSelectEngine = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const engineId = e.target.value;
    if (engineId && !selectedEngines.includes(engineId)) {
      setSelectedEngines([...selectedEngines, engineId]);
    }
  };

  const removeEngine = (id: string) => {
    setSelectedEngines(selectedEngines.filter(en => en !== id));
  };

  // Platforms handling
  const handleAddPlatform = () => {
    const trimmed = newPlatform.trim();
    if (trimmed && !platforms.includes(trimmed)) {
      setPlatforms([...platforms, trimmed]);
      setNewPlatform('');
    }
  };

  const removePlatform = (pf: string) => {
    setPlatforms(platforms.filter(p => p !== pf));
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);

    // Categories, tags, and platforms as JSON arrays
    const finalCategories = [...selectedGenres, ...selectedEngines];
    formData.append('categories', JSON.stringify(finalCategories));
    formData.append('tags', JSON.stringify(tags));
    formData.append('platforms', JSON.stringify(platforms));

    // External links as a single JSON object
    const externalLinksArr = [];
    if (officialWebsite) externalLinksArr.push({ name: 'officialWebsite', url: officialWebsite });
    if (gameplayVideo) externalLinksArr.push({ name: 'gameplayVideo', url: gameplayVideo });
    if (communityForum) externalLinksArr.push({ name: 'communityForum', url: communityForum });

    formData.append('externalLinks', JSON.stringify(externalLinksArr));

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
      {/* Title & Description */}
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
        <label className="block font-bold mb-1 text-gray-800 dark:text-gray-200">Description</label>
        <textarea
          className="w-full border p-2 rounded bg-gray-50 dark:bg-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          required
        />
      </div>

      {/* Genres */}
      <div>
        <label className="block font-bold mb-1 text-gray-800 dark:text-gray-200">Genres</label>
        <div className="mb-2 flex flex-wrap gap-2">
          {selectedGenres.map((gid, index) => {
            const genre = genres.find(g => g._id === gid);
            return (
              <span
                key={index}
                className={`flex items-center px-2 py-1 text-sm rounded ${getColorClass(index)}`}
              >
                {genre?.name}
                <button
                  type="button"
                  className="ml-2 text-gray-800 dark:text-gray-200 font-bold hover:text-red-600"
                  onClick={() => removeGenre(gid)}
                >&times;</button>
              </span>
            );
          })}
        </div>
        <select
          onChange={handleSelectGenre}
          className="border p-2 rounded w-full bg-gray-50 dark:bg-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
        >
          <option value="">Select a genre</option>
          {genres.map(g => (
            <option key={g._id} value={g._id}>{g.name}</option>
          ))}
        </select>
      </div>

      {/* Engines */}
      <div>
        <label className="block font-bold mb-1 text-gray-800 dark:text-gray-200">Engines</label>
        <div className="mb-2 flex flex-wrap gap-2">
          {selectedEngines.map((eid, index) => {
            const engine = engines.find(e => e._id === eid);
            return (
              <span
                key={index}
                className={`flex items-center px-2 py-1 text-sm rounded ${getColorClass(index)}`}
              >
                {engine?.name}
                <button
                  type="button"
                  className="ml-2 text-gray-800 dark:text-gray-200 font-bold hover:text-red-600"
                  onClick={() => removeEngine(eid)}
                >&times;</button>
              </span>
            );
          })}
        </div>
        <select
          onChange={handleSelectEngine}
          className="border p-2 rounded w-full bg-gray-50 dark:bg-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
        >
          <option value="">Select an engine</option>
          {engines.map(e => (
            <option key={e._id} value={e._id}>{e.name}</option>
          ))}
        </select>
      </div>

      {/* Tags */}
      <div>
        <label className="block font-bold mb-1 text-gray-800 dark:text-gray-200">Tags</label>
        <div className="mb-2 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`flex items-center px-2 py-1 text-sm rounded ${getColorClass(index)}`}
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

      {/* Platforms */}
      <div>
        <label className="block font-bold mb-1 text-gray-800 dark:text-gray-200">Platforms</label>
        <div className="mb-2 flex flex-wrap gap-2">
          {platforms.map((pf, index) => (
            <span
              key={index}
              className={`flex items-center px-2 py-1 text-sm rounded ${getColorClass(index)}`}
            >
              {pf}
              <button
                type="button"
                className="ml-2 text-gray-800 dark:text-gray-200 font-bold hover:text-red-600"
                onClick={() => removePlatform(pf)}
              >&times;</button>
            </span>
          ))}
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            className="border p-2 rounded w-full bg-gray-50 dark:bg-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
            value={newPlatform}
            onChange={(e) => setNewPlatform(e.target.value)}
            placeholder="Add platform"
          />
          <button
            type="button"
            onClick={handleAddPlatform}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>

      {/* External Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block font-bold mb-1 text-gray-800 dark:text-gray-200">Official Website</label>
          <input
            className="w-full border p-2 rounded bg-gray-50 dark:bg-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
            type="url"
            value={officialWebsite}
            onChange={(e) => setOfficialWebsite(e.target.value)}
            placeholder="https://example.com"
          />
        </div>
        <div>
          <label className="block font-bold mb-1 text-gray-800 dark:text-gray-200">Gameplay Video URL</label>
          <input
            className="w-full border p-2 rounded bg-gray-50 dark:bg-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
            type="url"
            value={gameplayVideo}
            onChange={(e) => setGameplayVideo(e.target.value)}
            placeholder="https://youtube.com/watch?v=..."
          />
        </div>
        <div>
          <label className="block font-bold mb-1 text-gray-800 dark:text-gray-200">Community Forum URL</label>
          <input
            className="w-full border p-2 rounded bg-gray-50 dark:bg-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
            type="url"
            value={communityForum}
            onChange={(e) => setCommunityForum(e.target.value)}
            placeholder="https://forum.example.com"
          />
        </div>
      </div>

      {/* File */}
      <div>
        <label className="block font-bold mb-1 text-gray-800 dark:text-gray-200">Game File (optional)</label>
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
          accept=".zip,.rar,.7z,.exe,.apk,.ipa"
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

export default EditGameForm;
