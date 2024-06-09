import './CoursesPage.css'
import CourseCard from "../../components/CourseCard/CourseCard"
import CourseList from '../../components/CourseList/CourseList'
import CustomHead from '../../components/CustomHead/CustomHead';
import api from '../../utils/api';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface Owner {
    _id: string;
    first_name: string;
    last_name: string;
}

interface Course {
    title: string;
    description: string;
    price: number;
    owner: Owner;
    id: number;
    level: number;
}

const CoursesPage = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    useEffect(() => {
        const loadinCoursesToast = toast.loading('Loading courses...');
        api.get('/course/getAllCourses').then((response) => {
            setCourses(response.data);
            toast.dismiss(loadinCoursesToast);
        }).catch((error) => {
            console.error(error);
            toast.dismiss(loadinCoursesToast);
            toast.error('Failed to load courses');
        });
    }, []);

    return (
        <>
            <CustomHead title="Courses" />
            <main>
                <section id="courses-page">
                    <CourseList>
                        {courses.map((course: Course) => {
                            return <CourseCard course={course} key={course.id} />
                        })}
                    </CourseList >
                </section>
            </main>
        </>
    )
}

export default CoursesPage