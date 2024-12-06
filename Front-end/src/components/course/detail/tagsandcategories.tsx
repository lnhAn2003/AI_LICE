import React from 'react';
import { Category } from '../../../types/course';
import { TAG_COLORS } from '../../../../styles/tagcolors';

interface TagsAndCategoriesProps {
  tags: string[];
  categories: Category[];
}

const TagsAndCategories: React.FC<TagsAndCategoriesProps> = ({ tags, categories }) => {
  return (
    <div className="mb-6">
      {/* Tags Section */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
          Tags
        </h3>
        <div className="flex flex-wrap mt-1">
          {tags.map((tag, index) => (
            <span
              key={tag}
              className={`text-sm font-medium px-3 py-1 rounded-full mr-2 mb-2 shadow-sm ${
                TAG_COLORS[index % TAG_COLORS.length]
              }`}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
          Categories
        </h3>
        <div className="flex flex-wrap mt-1">
          {categories.map((category, index) => (
            <span
              key={category._id}
              className={`text-sm font-medium px-3 py-1 rounded-full mr-2 mb-2 shadow-sm ${
                TAG_COLORS[index % TAG_COLORS.length]
              }`}
            >
              #{category.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagsAndCategories;
