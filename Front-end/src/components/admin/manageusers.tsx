// src/components/admin/manageusers.tsx
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';  // <-- Import your custom axios instance

interface UserProfileData {
  _id: string;
  username: string;
  email: string;
  status: {
    online: boolean;
    lastActive: string;
  };
  roleId: {
    _id: string;
    name: string; 
  };
  joinedAt: string;
  lastLogin: string;
  threads?: { _id: string }[];
  posts?: { _id: string }[];
  gamesShared?: string[];
}

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<UserProfileData[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal & notification form state
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalType, setModalType] = useState('admin_direct'); // or 'admin_broadcast'
  const [modalMessage, setModalMessage] = useState('');
  const [modalDetails, setModalDetails] = useState('');
  const [modalPriority, setModalPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [targetUserId, setTargetUserId] = useState<string | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // Expand/collapse details
  const [expandedUserIds, setExpandedUserIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get<UserProfileData[]>('/users');
        let data = response.data;

        data = data.filter(u => u.roleId.name !== 'Admin');

        setUsers(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Toggle row expansion
  const toggleExpandUser = (userId: string) => {
    if (expandedUserIds.includes(userId)) {
      setExpandedUserIds(expandedUserIds.filter(id => id !== userId));
    } else {
      setExpandedUserIds([...expandedUserIds, userId]);
    }
  };

  /**
   * Opens the notification modal.
   * If userId is null => broadcast to all
   * If userId is not null => direct to that user
   */
  const handleOpenModal = (userId: string | null) => {
    if (!userId) {
      // Send notification to ALL
      setModalTitle('Send Notification to ALL Users');
      setModalType('admin_broadcast');
      setTargetUserId(null);
    } else {
      // Send notification to a single user
      setModalTitle(`Send Notification to ${userId}`);
      setModalType('admin_direct');
      setTargetUserId(userId);
    }
    // Reset fields
    setModalMessage('');
    setModalDetails('');
    setModalPriority('medium');
    setShowModal(true);
  };

  /**
   * Submits the notification form
   */
  const handleSendNotification = async () => {
    if (!modalMessage.trim()) {
      alert('Message cannot be empty.');
      return;
    }

    const body = {
      userId: targetUserId,  
      type: modalType,
      message: modalMessage,
      details: modalDetails,
      priority: modalPriority,
    };

    try {
      // If "admin_broadcast", call /notification/broadcast
      // Else call /notification for single user
      const endpoint = 
        modalType === 'admin_broadcast'
          ? '/notification/broadcast'
          : '/notification';

      // Use axiosInstance so the token is included in headers automatically
      await axiosInstance.post(endpoint, body);

      alert('Notification sent!');
    } catch (error: any) {
      console.error('Error sending notification:', error);
      alert('Failed to send notification.');
    } finally {
      setShowModal(false);
    }
  };

  // Pagination calculations
  const totalUsers = users.length;
  const totalPages = Math.ceil(totalUsers / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentPageUsers = users.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="text-gray-600 dark:text-gray-300">Loading users...</div>
    );
  }

  return (
    <div>
      {/* Header with "Send to All" button */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Manage Users
        </h2>
        <button
          onClick={() => handleOpenModal(null)}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
        >
          Send Notification to All
        </button>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg shadow">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                Username
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                Email
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                Status
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                Role
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                Joined
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                Last Login
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentPageUsers.map((u) => {
              const isExpanded = expandedUserIds.includes(u._id);
              return (
                <React.Fragment key={u._id}>
                  <tr className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-100">
                      <button
                        onClick={() => toggleExpandUser(u._id)}
                        className="text-blue-600 dark:text-blue-400 underline"
                      >
                        {u.username}
                      </button>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-100">
                      {u.email}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      {u.status.online ? (
                        <span className="text-green-600 font-semibold">Online</span>
                      ) : (
                        <span className="text-red-600 font-semibold">Offline</span>
                      )}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-100">
                      {u.roleId?.name}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-100">
                      {new Date(u.joinedAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-100">
                      {new Date(u.lastLogin).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-100">
                      <button
                        onClick={() => handleOpenModal(u._id)}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Notify
                      </button>
                    </td>
                  </tr>

                  {/* Expanded Row */}
                  {isExpanded && (
                    <tr className="bg-gray-50 dark:bg-gray-600">
                      <td colSpan={7} className="px-4 py-3">
                        <div className="space-y-2 text-gray-700 dark:text-gray-100">
                          <p><strong>Threads:</strong> {u.threads?.length || 0}</p>
                          <p><strong>Posts:</strong> {u.posts?.length || 0}</p>
                          <p><strong>Games Shared:</strong> {u.gamesShared?.length || 0}</p>
                          <p>
                            <strong>Last Active:</strong>{' '}
                            {new Date(u.status.lastActive).toLocaleString()}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Page {currentPage} of {totalPages}
        </div>
        <div className="space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            Prev
          </button>
          <button
            disabled={endIndex >= users.length}
            onClick={() => setCurrentPage(currentPage + 1)}
            className={`px-3 py-1 rounded ${
              endIndex >= users.length
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Notification Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowModal(false)}
          />
          {/* Modal Content */}
          <div className="relative bg-white dark:bg-gray-800 p-6 rounded shadow-lg z-10 w-full max-w-md">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              {modalTitle}
            </h3>

            {/* Notification Type */}
            <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-200">
              Type:
            </label>
            <input
              type="text"
              value={modalType}
              onChange={(e) => setModalType(e.target.value)}
              className="w-full mb-3 p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-100"
              placeholder="e.g. admin_direct, admin_broadcast"
            />

            {/* Message */}
            <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-200">
              Message:
            </label>
            <textarea
              className="w-full h-16 p-2 mb-3 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-100"
              placeholder="Type your message..."
              value={modalMessage}
              onChange={(e) => setModalMessage(e.target.value)}
            />

            {/* Details */}
            <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-200">
              Details (optional):
            </label>
            <input
              type="text"
              value={modalDetails}
              onChange={(e) => setModalDetails(e.target.value)}
              className="w-full mb-3 p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-100"
              placeholder="Additional details..."
            />

            {/* Priority dropdown */}
            <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-200">
              Priority:
            </label>
            <select
              value={modalPriority}
              onChange={(e) => setModalPriority(e.target.value as 'low' | 'medium' | 'high')}
              className="w-full mb-3 p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-100"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSendNotification}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
