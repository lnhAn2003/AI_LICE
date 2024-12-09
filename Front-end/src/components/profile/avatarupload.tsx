// src/components/profile/avatarupload.tsx
import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';

interface AvatarUploadProps {
  onUploadSuccess?: () => void;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('avatar', selectedFile);

    try {
      const response = await axiosInstance.post('/users/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      alert('Avatar updated successfully!');
      console.log('Updated avatar:', response.data.avatarUrl);
      if (onUploadSuccess) onUploadSuccess();
    } catch (error: any) {
      console.error('Error uploading avatar:', error.response?.data || error.message);
      alert('Failed to upload avatar');
    }
  };

  return (
    <div className="avatar-upload flex flex-col items-center space-y-4">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && (
        <img
          src={preview}
          alt="Avatar preview"
          className="preview w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
        />
      )}
      <button onClick={handleUpload} className="btn-upload bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Upload Avatar
      </button>
    </div>
  );
};

export default AvatarUpload;
