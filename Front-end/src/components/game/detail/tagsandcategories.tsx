import React from 'react';
import { Category } from '../../../types/game';
import { TAG_COLORS } from '../../../../styles/tagcolors';

interface TagsAndCategoriesProps {
  tags: string[];
  categories: Category[];
  platforms: string[];
}

const TagsAndCategories: React.FC<TagsAndCategoriesProps> = ({ tags, categories, platforms }) => {

  return (
    <div className="space-y-6">
      {/* Tags Section */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Tags:</h3>
        <ul className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li
              key={tag}
              className={`px-3 py-1 rounded-full text-sm font-medium bg-purple-200 text-purple-700 dark:bg-purple-800 dark:text-purple-300`}
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>

      {/* Categories Section */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Categories:</h3>
        <ul className="flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <li
              key={category._id}
              className={`px-3 py-1 rounded-full text-sm font-medium bg-blue-200 text-blue-700 dark:bg-blue-800 dark:text-blue-300`}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Platforms Section */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Platforms:</h3>
        <ul className="flex flex-wrap gap-2">
          {platforms.map((platform, index) => (
            <li
              key={platform}
              className={`px-3 py-1 rounded-full text-sm font-medium bg-green-200 text-green-700 dark:bg-green-800 dark:text-green-300`}
            >
              {platform}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TagsAndCategories;
