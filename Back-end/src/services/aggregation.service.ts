// services/aggregation.service.ts
import User from '../models/user.model';
import Thread from '../models/thread.model';
import Post from '../models/post.model';
import GameShared from '../models/gameshared.model';
import Course from '../models/course.model';
import Lesson from '../models/lesson.model';

class AggregationService {
  public async fetchAllData(): Promise<any> {
    try {
      const users = await User.find().lean();
      const threads = await Thread.find().lean();
      const posts = await Post.find().lean();
      const games = await GameShared.find().lean();
      const courses = await Course.find().lean();
      const lessons = await Lesson.find().lean();

      return {
        users,
        threads,
        posts,
        games,
        courses,
        lessons,
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      throw new Error('Failed to fetch data from database');
    }
  }
}

export default new AggregationService();
