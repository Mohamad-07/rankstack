'use client';

import dynamic from 'next/dynamic';

const CoursePolicy = dynamic(() => import('@/components/CoursePolicy'), { ssr: false });
const CoursesCard = dynamic(() => import('@/components/CoursesCard'), { ssr: false });
const CoursesDetails = dynamic(() => import('@/components/CoursesDetails'), { ssr: false });

export default function CourseDeferredSections() {
  return (
    <>
      <CoursePolicy />
      <CoursesCard />
      <CoursesDetails />
    </>
  );
}