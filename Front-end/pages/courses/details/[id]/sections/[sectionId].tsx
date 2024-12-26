// pages/courses/details/[courseId]/sections/[sectionId].tsx

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../../../src/utils/axiosInstance';
import { Section, Lesson } from '../../../../../src/types/course';
import Link from 'next/link';

const SectionDetailsPage: React.FC = () => {
    const router = useRouter();
    const { courseId, sectionId } = router.query;

    const [sectionData, setSectionData] = useState<Section | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (router.isReady && courseId && sectionId) {
            fetchSectionData(courseId as string, sectionId as string);
        }
    }, [router.isReady, courseId, sectionId]);

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

    if (loading) {
        return <div className="p-4">Loading...</div>;
    }

    if (error || !sectionData) {
        return <div className="p-4 text-red-500">{error || 'Section not found.'}</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">{sectionData.sectionTitle}</h1>

            {/* Link to Edit Section */}
            <Link className="text-red-500 hover:underline mb-6 inline-block"
                href={`/courses/details/${courseId}/sections/${sectionId}/edit`}
            >
                Edit Section
            </Link>

            {/* List of Lessons */}
            <h2 className="text-xl font-semibold mb-4">Lessons</h2>
            <ul className="space-y-2">
                {sectionData.lessons.map((lesson: Lesson) => (
                    <li key={lesson._id} className="flex items-center space-x-2 text-sm">
                        <svg
                            className="w-5 h-5 text-blue-600 flex-shrink-0"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m2 2H7m2 8H5l7-16h2l7 16h-4"
                            />
                        </svg>
                        {lesson.videoUrl ? (
                            <a
                                href={lesson.videoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-800 dark:text-gray-200 font-medium hover:underline"
                            >
                                {lesson.title}
                            </a>
                        ) : (
                            <span className="text-gray-800 dark:text-gray-200 font-medium">
                                {lesson.title}
                            </span>
                        )}
                        {/* Edit Lesson Link */}
                        <Link
                            className="text-blue-500 hover:underline"
                            href={`/courses/details/${courseId}/sections/${sectionId}/lessons/edit/${lesson._id}`}
                        >
                            Edit
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Link to Add New Lesson */}
            <Link className="text-green-500 hover:underline mt-6 inline-block"
                href={`/courses/details/${courseId}/sections/${sectionId}/lessons/new`}
            >
                Add New Lesson
            </Link>
        </div>
    );
};

export default SectionDetailsPage;
