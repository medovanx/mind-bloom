import { useSearchParams } from 'react-router-dom';
import ProfilePage from './ProfilePage/ProfilePage';
import TeacherCoursesPage from './TeacherCoursesPage/TeacherCoursesPage';
import CoursesPage from '../CoursesPage/CoursesPage';

export function Dashboard() {
    let [searchParams] = useSearchParams();
    const tab = searchParams.get('tab');

    return (
        <div>
            {/*General Tab*/}
            {tab === 'profile' && <ProfilePage />}
            {tab === 'settings' && <div>Showing Settings</div>}

            {/*Overview Tab*/}
            {!tab && <div>Showing Overview</div>}
            {/*Student Tabs*/}
            {tab === 'myCourses' && <div>Showing My Courses</div>}
            {tab === 'browseCourses' && <CoursesPage/>}
            {/*Teacher Tabs*/}
            {tab === 'myTeacherCourses' && <TeacherCoursesPage/>}
            {/*Admin Tabs*/}
            {tab === 'userManagement' && <div>Showing User Management</div>}
        </div>
    );
}

export default Dashboard;
