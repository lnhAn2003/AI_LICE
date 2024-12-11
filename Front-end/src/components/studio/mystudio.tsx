import React from 'react';
import UserInfo from './userinfo';
import ThreadsSection from './threadssection';
import PostsSection from './postssection';
import CoursesSection from './coursessection';
import GamesSection from './gamessection';
import { MyStudioData } from '../../types/studio';

interface MyStudioProps {
    studioData: MyStudioData;
}

const MyStudio: React.FC<MyStudioProps> = ({ studioData }) => {
  const { user, threads, posts, courses, gamesShared } = studioData;

  return (
    <div className="space-y-8">
      <UserInfo user={user} />
      <ThreadsSection threads={threads} />
      <PostsSection posts={posts} />
      <CoursesSection courses={courses} />
      <GamesSection games={gamesShared} />
    </div>
  );
};

export default MyStudio;
