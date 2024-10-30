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
}

export default new CourseService();
