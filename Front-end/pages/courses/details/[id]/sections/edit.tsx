// pages/courses/details/[id]/sections/edit.tsx

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import EditSectionForm from '../../../../../src/components/course/edit/EditSectionForm';
import axiosInstance from '../../../../../src/utils/axiosInstance';
import { Section } from '../../../../../src/types/course';

const EditSectionPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // Course ID

  const [sectionId, setSectionId] = useState<string | null>(null);
  const [sectionData, setSectionData] = useState<Section | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (router.isReady) {
      // Extract sectionId from URL
      const pathSegments = router.asPath.split('/');
      const sectionIndex = pathSegments.findIndex(segment => segment === 'sections');
      if (sectionIndex !== -1 && pathSegments.length > sectionIndex + 1) {
        const potentialSectionId = pathSegments[sectionIndex + 1];
        if (potentialSectionId !== 'edit') {
          setSectionId(potentialSectionId);
          fetchSectionData(id as string, potentialSectionId);
        } else {
          setError('Section ID not found in the URL.');
          setLoading(false);
        }
      } else {
        setError('Invalid URL structure.');
        setLoading(false);
      }
    }
  }, [router.isReady, id, router.asPath]);

  const fetchSectionData = async (courseId: string, sectionId: string) => {
    try {
      const response = await axiosInstance.get(`/courses/${courseId}/sections/${sectionId}`);
      setSectionData(response.data);
    } catch (err: any) {
      setError('Failed to fetch section data.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      await axiosInstance.put(`/courses/${id}/sections/${sectionId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Redirect to the section details page or show a success message
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

export default EditSectionPage;
