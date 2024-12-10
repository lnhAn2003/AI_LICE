// src/serverside/otherusers.serverside.tsx
import { GetServerSideProps } from 'next';
import axiosInstance from '../utils/axiosInstance';
export const getOtherUserServerSideProps: GetServerSideProps = async (context) => {
    const { params } = context;
  
    if (!params?.id || typeof params.id !== 'string') {
      return { notFound: true };
    }
  
    try {
      const response = await axiosInstance.get(`/users/${params.id}`);
      if (!response || !response.data) {
        return { notFound: true };
      }
  
      const userData = response.data;
      return {
        props: {
          user: {
            id: userData._id,
            avatarUrl: userData.profile?.avatarUrl || '/default-avatar.png',
            username: userData.username,
            bio: userData.profile?.bio || '',
            joinedDate: new Date(userData.joinedAt).toLocaleDateString(),
            lastActive: new Date(userData.status.lastActive).toLocaleDateString(),
            lastLogin: new Date(userData.lastLogin).toLocaleDateString(),
            role: userData.roleId?.name || 'User',
            email: userData.email,
            socialLinks: (userData.profile?.socialLinks || []).map((link: string) => {
              let platform = '';
              if (link.includes('twitter')) platform = 'Twitter';
              else if (link.includes('github')) platform = 'Github';
              else if (link.includes('facebook')) platform = 'Facebook';
              else if (link.includes('linkedin')) platform = 'Linkedin';
              else platform = 'Website';
              return { platform, url: link };
            }),
            statistics: {
              threadsCreated: userData.threads?.length || 0,
              postsMade: userData.posts?.length || 0,
              gamesShared: userData.gamesShared?.length || 0,
              aiInteractions: userData.aiInteractions?.length || 0,
            },
            recentActivity: {
              threads: userData.threads || [],
              posts: userData.posts || [],
              games: userData.gamesShared || [],
            },
            badges: {
                earned: [
                  { icon: '🏆', title: 'Game Master', description: 'Shared 10+ game assets' },
                  { icon: '🎉', title: 'Top Contributor', description: 'Contributed 50+ posts' },
                  { icon: '⭐', title: 'Top Reviewer', description: 'Reviewed 25+ games or assets' },
                ],
                upcoming: [
                  { icon: '📈', title: 'Growth Leader', description: 'Increased user engagement in forums by 15%' },
                  { icon: '💎', title: 'Community Star', description: 'Contribute 100 posts to unlock' },
                  { icon: '🔧', title: 'Bug Hunter', description: 'Reported and helped fix 20+ bugs' },
                ],
              },
          },
        },
      };
    } catch (error) {
      console.error('Error fetching user data:', error);
      return { notFound: true };
    }
  };
  
