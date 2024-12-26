import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const AIInput: React.FC = () => {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const handleQuerySubmit = async () => {
        if (!query.trim()) return;

        setLoading(true);
        setResponse('');
        try {
            const res = await axiosInstance.post('/ai/interact', {
                interactionType: 'fetch-user-info', // Example interaction type
                request: query,
                sourceLanguage: 'N/A', // Modify as needed
                targetLanguage: 'N/A', // Modify as needed
            });

            setResponse(res.data.response);
        } catch (error) {
            console.error('Error interacting with AI:', error);
            setResponse('Failed to fetch response from AI.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
            <textarea
                className="w-full h-32 p-4 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                placeholder="Type your question here..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            ></textarea>
            <button
                onClick={handleQuerySubmit}
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? 'Loading...' : 'Submit Query'}
            </button>

            {response && (
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow">
                    <h3 className="text-lg font-bold mb-2">Response:</h3>
                    <p className="text-gray-700 dark:text-gray-300">{response}</p>
                </div>
            )}
        </div>
    );
};

export default AIInput;
