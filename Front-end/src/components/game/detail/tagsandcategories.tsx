// src/components/game/detail/tagsandcategories.tsx
import React from 'react';

interface TagsAndCategoriesProps {
  tags: string[];
  categories: string[];
  platforms: string[];
}

const TagsAndCategories: React.FC<TagsAndCategoriesProps> = ({
  tags,
  categories,
  platforms,
}) => {
  return (
    <section className="my-8">
      <div className="flex flex-wrap items-center space-x-4 mb-4">
        <strong className="text-gray-800 dark:text-gray-100">Tags:</strong>
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap items-center space-x-4 mb-4">
        <strong className="text-gray-800 dark:text-gray-100">Categories:</strong>
        {categories.map((category, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 rounded-full text-sm"
          >
            {category}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap items-center space-x-4">
        <strong className="text-gray-800 dark:text-gray-100">Platforms:</strong>
        {platforms.map((platform, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100 rounded-full text-sm"
          >
            {platform}
          </span>
        ))}
      </div>
    </section>
  );
};

export default TagsAndCategories;