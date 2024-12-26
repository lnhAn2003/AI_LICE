// pages/courses/details/[id]/sections/[sectionId]/edit.tsx

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import EditSectionForm from '../../../../../../src/components/course/edit/EditSectionForm';
import axiosInstance from '../../../../../../src/utils/axiosInstance';
import { Section } from '../../../../../../src/types/course';

const EditSpecificSectionPage: React.FC = () => {
  const router = useRouter();
  const { id, sectionId } = router.query; // Course ID and Section ID

  const [sectionData, setSectionData] = useState<Section | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (router.isReady && id && sectionId) {
      fetchSectionData(id as string, sectionId as string);
    }
  }, [router.isReady, id, sectionId]);

  const fetchSectionData = async (courseId: string, sectionId: string) => {
    try {
      const response = await axiosInstance.get(`sections/${sectionId}`);
      setSectionData(response.data);
    } catch (err: any) {
      setError('Failed to fetch section data.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      await axiosInstance.patch(`/sections/${sectionId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      router.push(`/courses/details/${id}/sections/${sectionId}`);
    } catch (err: any) {
      setError('Failed to update section.');
    }
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Section</h1>
      {sectionData && (
        <EditSectionForm
          initialData={sectionData}
          onSubmit={handleSubmit}
          submitButtonText="Update Section"
        />
      )}
    </div>
  );
};

export default EditSpecificSectionPage;
