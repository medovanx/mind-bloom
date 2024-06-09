const Course = require('../models/Course');
const User = require('../models/User');

const courseController = {};

courseController.addCourse = async (req, res) => {
    try {
        const { title, description, price, level } = req.body;
        const ownerId = req.user.id;

        // Check the owner ID has teacher role
        const owner = await User.findById(ownerId);
        if (!owner.roles.includes('Teacher')) {
            return res.status(403).json({ message: "Unauthorized: You can only add courses as a teacher." });
        }

        const course = new Course({
            title,
            description,
            owner: ownerId,
            teachers: ownerId,
            price: price || 0,
            level: level || 1,
        });
        await course.save();
        res.status(201).json({ message: 'Course created successfully', course: course });
    } catch (error) {
        console.error('Error in addCourse:', error);
        res.status(500).json({ message: error.message });
    }
}

/* Get Courses */
courseController.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({}).populate('teachers owner', 'first_name last_name');
        res.json(courses);
    }
    catch (error) {
        console.error('Error in getAllCourses:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

courseController.getCourseById = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId).populate('teachers', 'first_name last_name');
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json(course);
    } catch (error) {
        console.error('Error in getCourseById:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

courseController.getTeacherCourses = async (req, res) => {
    try {
        const teacherId = req.user.id;
        const courses = await Course.find({ teachers: teacherId }).populate('teachers', 'first_name last_name');
        res.json(courses);
    } catch (error) {
        console.error('Error in getTeacherCourses:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

courseController.getStudentCourses = async (req, res) => {
    try {
        const studentId = req.user.id;
        const courses = await Course.find({ students: studentId }).populate('teachers', 'first_name last_name');
        res.json(courses);
    } catch (error) {
        console.error('Error in getStudentCourses:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}



/* Delete Course */
courseController.deleteCourseById = async (req, res) => {
    try {
        const { courseId } = req.params;
        // Verify teacher ID from JWT matches the intended teacher ID
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        if (req.user.id !== course.owner.toString()) {
            return res.status(403).json({ message: "Unauthorized: You can only delete courses you created." });
        }

        await Course.findByIdAndDelete(courseId);
        res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        console.error('Error in deleteCourseById:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

/* Update Course */
courseController.updateCourseById = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { title, description, price, level } = req.body;

        // Verify teacher ID from JWT matches the intended teacher ID
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        if (req.user.id !== course.owner.toString()) {
            return res.status(403).json({ message: "Unauthorized: You can only update courses you created." });
        }

        course.title = title;
        course.description = description;
        course.price = price;
        course.level = level;
        await course.save();
        res.json({ message: 'Course updated successfully', course });
    } catch (error) {
        console.error('Error in updateCourseById:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

/* Enroll in Course */
courseController.enrollInCourse = async (req, res) => {
    try {
        const { courseId, studentId } = req.body;

        // Verify student ID from JWT matches the intended student ID
        if (req.user.id !== studentId) {
            return res.status(403).json({ message: "Unauthorized: You can only enroll in courses as yourself." });
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Check if the student is already enrolled
        if (course.students.includes(studentId)) {
            return res.status(400).json({ message: 'You are already enrolled in this course' });
        }

        // Update both course and student
        course.students.push(studentId);

        await course.save();
        res.json({ message: 'Enrolled in course successfully' });
    } catch (error) {
        console.error('Error in enrollInCourse:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
/* Get Students in a Course */
courseController.getStudentsInCourse = async (req, res) => {
    try {
        const { courseId } = req.query;
        // get course teachers id 
        const courseTeachers = await Course.findById(courseId).select('teachers');

        // check if the requesting user is a teacher of the course
        if (!courseTeachers.teachers.includes(req.user.id)) {
            return res.status(403).json({ message: "Unauthorized: You can only view students in courses you teach." });
        }

        const course = await Course.findById(courseId).populate('students', 'first_name last_name');
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json(course.students);
    } catch (error) {
        console.error('Error in getStudentsInCourse:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
module.exports = courseController;