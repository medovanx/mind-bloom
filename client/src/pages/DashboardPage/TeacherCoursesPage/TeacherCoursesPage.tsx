import Button from "../../../components/Button/Button";
import "./TeacherCoursesPage.css";
import { FaPlus } from "react-icons/fa6";
import LevelIcon from "../../../components/LevelIcon/LevelIcon";
import api from "../../../utils/api";
import { useState, useEffect } from 'react';
import "./TeacherCoursesTable.css";
import CourseEditModal from "../../../components/CourseEditModal/CourseEditModal";
import CourseCreateModal from "../../../components/CourseCreateModal/CourseCreateModal";
import { toast } from "react-toastify";

interface Course {
    _id: string;
    title: string;
    description: string;
    price?: number;
    level: number;
    students: Array<string>;
    teachers: Array<string>;
}

interface NewCourse {
    title: string;
    description: string;
    price?: number;
    level: number;
}

const TeacherCoursesPage = () => {
    const [courses, setCourses] = useState<Array<Course>>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [currentCourse, setCurrentCourse] = useState<Course | null>(null);

    const handleCreateClick = () => {
        setIsCreating(true);
    };

    const handleCreate = async (newCourse: NewCourse) => {
        try {
            const savedUser = localStorage.getItem('user');
            const parsedToken = savedUser && JSON.parse(savedUser).token;
            const response = await api.post('course/addCourse', newCourse, {
                headers: {
                    'Authorization': `Bearer ${parsedToken}`,
                }
            });
            setCourses([...courses, { ...response.data.course, students: [], teachers: [] }]); // Assuming response.data.course returns the new course without these fields
            setIsCreating(false);
            toast.success('Course created successfully');
        } catch (error: any) {
            toast.error(error.response.data.message);
            console.error('Failed to create course', error);
        }
    };


    const handleCloseCreate = () => {
        setIsCreating(false);
    };
    const handleEditClick = (course: Course) => {
        setCurrentCourse(course);
        setIsEditing(true);
    };

    const handleSave = async (updatedCourse: Course) => {
        updateCourse(updatedCourse);
        setIsEditing(false);
    };

    const handleClose = () => {
        setIsEditing(false);
    };
    const fetchCourses = async () => {
        const savedUser = localStorage.getItem('user');
        const parsedToken = savedUser && JSON.parse(savedUser).token;
        try {
            // Update the endpoint URL as necessary, here assuming a base URL
            const response = await api.get(`course/getTeacherCourses`, {
                headers: {
                    'Authorization': `Bearer ${parsedToken}`,
                }
            });
            setCourses(response.data);
        } catch (error) {
            console.error('Failed to fetch courses', error);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const deleteCourse = async (courseId: string, courseTitle: string) => {
        let confirmDelete = confirm(`Are you sure you want to delete [${courseTitle}] course?`);
        if (!confirmDelete) return;
        try {
            const savedUser = localStorage.getItem('user');
            const parsedToken = savedUser && JSON.parse(savedUser).token;
            await api.delete(`course/deleteCourseById/${courseId}`, {
                headers: {
                    'Authorization': `Bearer ${parsedToken}`,
                }
            });
            setCourses(courses.filter(course => course._id !== courseId));
            toast.success('Course deleted successfully');
        } catch (error) {
            console.error('Failed to delete course', error);
            toast.error('Failed to delete course');
        }
    }

    const updateCourse = async (updatedCourse: Course) => {
        try {
            const savedUser = localStorage.getItem('user');
            const parsedToken = savedUser && JSON.parse(savedUser).token;

            const courseData = {
                title: updatedCourse.title,
                description: updatedCourse.description,
                price: updatedCourse.price,
                level: updatedCourse.level,
            };

            const response = await api.put(`course/updateCourseById/${updatedCourse._id}`, courseData, {
                headers: {
                    'Authorization': `Bearer ${parsedToken}`,
                }
            });
            setCourses(courses.map(course => course._id === updatedCourse._id ? response.data.course : course));
            toast.success('Course updated successfully');
        } catch (error) {
            console.error('Failed to update course', error);
            toast.error('Failed to update course');
        }
    }
    return (
        <>
            <div className="teacher-courses-container">
                <div className="teacher-courses-header">
                    <h1>Courses I Teach</h1>
                    <div className="teacher-courses-header-actions">
                        <div className="TabsContainer">
                            <div className="myCourses">My Courses <span className="myCourses-count">{courses.length}</span></div>
                        </div>
                        <div className="ButtonContainer">
                            <Button onClick={handleCreateClick} className="btn-secondary notRound"><FaPlus size={10} /> New</Button>
                        </div>
                    </div>
                </div>
                <div className="teacher-courses-list">
                    <table className="teacher-courses-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Students</th>
                                <th>Level</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((course) => (
                                <tr key={course._id}>
                                    <td>{course.title}</td>
                                    <td className="courseDescription">{course.description}</td>
                                    <td>${course.price}</td>
                                    <td>{course.students.length}</td>
                                    <td>
                                        <LevelIcon level={course.level} />
                                        {course.level === 4 ? 'Advanced' :
                                            course.level === 3 ? 'Expert' :
                                                course.level === 2 ? 'Intermediate' :
                                                    'Beginner'}
                                    </td>
                                    <td>
                                        <Button className="btn-secondary notRound" onClick={() => handleEditClick(course)}>Edit</Button>
                                        <Button className="btn-danger notRound" onClick={() => deleteCourse(course._id, course.title)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {currentCourse && (
                <CourseEditModal
                    course={currentCourse}
                    isOpen={isEditing}
                    onSave={handleSave}
                    onClose={handleClose}
                />
            )}
            {isCreating && (
                <CourseCreateModal
                    isOpen={isCreating}
                    onSave={handleCreate}
                    onClose={handleCloseCreate}
                />
            )}
        </>
    )
}

export default TeacherCoursesPage;