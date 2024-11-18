import { GetServerSideProps } from 'next';
import axiosInstance from '../utils/axiosInstance';
import cookie, { parse } from 'cookie';

export const getUserServerSideProps: GetServerSideProps = async (context) => {
    const { req } = context;
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.token;
  
    if (!token) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
  
    try {
      const response = await axiosInstance.get('/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const user = response.data;
  
      const userData = {
        id: user._id,
        avatarUrl: user.profile?.avatarUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCO2sR3EtGqpIpIa-GTVnvdrDHu0WxuzpA8g&s',
        username: user.username,
        bio: user.profile?.bio || '',
        joinedDate: new Date(user.joinedAt).toLocaleDateString(),
        lastActive: new Date(user.status.lastActive).toLocaleDateString(),
        role: user.role?.name || 'User',
        email: user.email,
        socialLinks: user.profile?.socialLinks || [],
        statistics: {
          threadsCreated: user.threads?.length || 0,
          postsMade: user.posts?.length || 0,
          gamesShared: user.gamesShared?.length || 0,
          aiInteractions: user.aiInteractions?.length || 0,
        },
        preferences: user.profile?.preferences || {},
        recentActivity: {
          threads: user.threads || [],
          posts: user.posts || [],
          games: user.gamesShared || [],
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
      };
  
      return {
        props: {
          user: userData,
        },
      };
    } catch (error) {
      console.error('Error fetching user data:', error);
      return {
        notFound: true,
      };
    }
  };