import React from 'react';

const AISettings: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">AI Assistant Settings</h2>
      <form className="space-y-4">
        <div>
          <label className="block font-medium mb-2">Interaction Language</label>
          <select className="w-full p-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
            <option>Unity (C#)</option>
            <option>Godot</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-2">Response Detail Level</label>
          <select className="w-full p-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
            <option>Basic</option>
            <option>Moderate</option>
            <option>Detailed</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-2">Enable Notifications for New AI Features</label>
          <input type="checkbox" className="h-5 w-5 text-blue-600 dark:text-blue-400 rounded-lg" />
        </div>
      </form>
    </div>
  );
};

export default AISettings;
