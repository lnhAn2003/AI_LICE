import mongoose from 'mongoose';
import Course, { ICourse } from '../models/course.model';

class CourseService {
    public async createCourse(courseData: Partial<ICourse>): Promise<ICourse> {
        const course = new Course(courseData);
        return await course.save();
    }

    public async getCourses(): Promise<ICourse[]> {
        return await Course.find()
            .populate({ path: 'createdBy', select: 'username' })
            .populate({ path: 'categories', select: 'name' });
    }

    public async getCourseById(id: string): Promise<ICourse | null> {
        return await Course.findById(id)
            .populate({ path: 'createdBy', select: 'username' })
            .populate({ path: 'categories', select: 'name' });
    }

    public async updateCourse(id: string, updateData: Partial<ICourse>): Promise<ICourse | null> {
        return await Course.findByIdAndUpdate(id, updateData, { new: true });
    }

    public async deleteCourse(id: string): Promise<ICourse | null> {
        return await Course.findByIdAndDelete(id);
    }

    public async addRating(courseId: string, userId: string, ratingValue: number, comment: string): Promise<ICourse> {
        const course = await Course.findById(courseId);
        if (!course) throw new Error('Course not found');
  
        const existingRatingIndex = course.ratings.findIndex(rating => rating.userId.toString() === userId);
  
        if (existingRatingIndex >= 0) {
            course.ratings[existingRatingIndex].rating = ratingValue;
            course.ratings[existingRatingIndex].comment = comment;
            course.ratings[existingRatingIndex].createdAt = new Date();
        } else {
            course.ratings.push({
                userId: new mongoose.Types.ObjectId(userId),
                rating: ratingValue,
                comment: comment,
                createdAt: new Date()
            });
            course.ratingCount += 1;
        }

        const totalRatingSum = course.ratings.reduce((sum, rating) => sum + rating.rating, 0);
        course.averageRating = totalRatingSum / course.ratingCount;

        await course.save();
        return course;
    }

    public async addFavorite(courseId: string, userId: string): Promise<ICourse | null> {
        return await Course.findByIdAndUpdate(
            courseId,
            { $addToSet: { favorites: new mongoose.Types.ObjectId(userId) } },
            { new: true }
        );
    }

    public async removeFavorite(courseId: string, userId: string): Promise<ICourse | null> {
        return await Course.findByIdAndUpdate(
            courseId,
            { $pull: { favorites: new mongoose.Types.ObjectId(userId) } },
            { new: true }
        );
    }

    public async searchCourses(
        query: { title?: string; categories?: string[]; tags?: string[]; minRating?: number },
        page = 1,
        limit = 10,
        sortField: keyof ICourse = 'createdAt',
        sortOrder: 'asc' | 'desc' = 'desc'
    ): Promise<ICourse[]> {
        const filter: any = {};

        if (query.title) {
            filter.title = new RegExp(query.title, 'i'); // Case-insensitive match
        }

        if (query.categories && query.categories.length > 0) {
            filter.categories = { $in: query.categories.slice(0, 5) };
        }

        if (query.tags && query.tags.length > 0) {
            filter.tags = { $all: query.tags }; 
        }

        if (query.minRating) {
            filter.averageRating = { $gte: query.minRating };
        }

        const courses = await Course.find(filter)
            .sort({ [sortField]: sortOrder === 'asc' ? 1 : -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        return courses;
    }
}

export default new CourseService();
