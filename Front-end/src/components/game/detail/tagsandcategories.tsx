// src/components/game/detail/tagsandcategories.tsx
import React from 'react';
import { Category } from '../../../types/game';

interface TagsAndCategoriesProps {
  tags: string[];
  categories: Category[];
  platforms: string[];
}

const TagsAndCategories: React.FC<TagsAndCategoriesProps> = ({ tags, categories, platforms }) => (
  <div>
    <h3>Tags:</h3>
    <ul>
      {tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
    <h3>Categories:</h3>
    <ul>
      {categories.map((category) => (
        <li key={category._id}>{category.name}</li>
      ))}
    </ul>
    <h3>Platforms:</h3>
    <ul>
      {platforms.map((platform) => (
        <li key={platform}>{platform}</li>
      ))}
    </ul>
  </div>
);

export default TagsAndCategories;
