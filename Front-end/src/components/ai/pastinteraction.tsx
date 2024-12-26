import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const PastInteractions: React.FC = () => {
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInteractions = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get('/ai/past-interactions');
        setInteractions(res.data || []);
      } catch (error) {
        console.error('Error fetching past interactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInteractions();
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Past Interactions
      </h2>
      {loading ? (
        <p>Loading past interactions...</p>
      ) : interactions.length === 0 ? (
        <p>No past interactions found.</p>
      ) : (
        <ul className="space-y-4">
          {interactions.map((interaction: any, index: number) => (
            <li key={index} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(interaction.createdAt).toLocaleString()}
              </p>
              <p className="font-bold">{interaction.interactionType}</p>
              <p>{interaction.request}</p>
              <p className="mt-2 italic text-gray-700 dark:text-gray-300">
                {interaction.response}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PastInteractions;
