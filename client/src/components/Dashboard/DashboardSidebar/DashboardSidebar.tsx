import './DashboardSidebar.css';
import { RxDashboard } from "react-icons/rx";
import { MdOutlineClass, MdOutlineManageAccounts } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { useUserProfile } from '../../../context/UserProfileContext';
import { MdClass } from "react-icons/md";

const Sidebar = () => {
    const getSelectedTab = (tabName: string) => {
        const currentTab = window.location.search.split('=')[1];
        if (currentTab === tabName) {
            return 'selectedTab';
        } // check if url has no tab?= then it's the overview tab
        if (window.location.search === '' && tabName === '') {
            return 'selectedTab';
        }

    }
    const { userProfile } = useUserProfile();
    const userRoles = userProfile?.role;

    return (
        <div className="sidebar">
            <div className="top-header">
                <img id="websiteLogo" src="/images/logo.jpg" alt="website-logo" />
            </div>
            <div className='dashboard-items-container'>
                <a href="/dashboard"><p className={`dashboard-item ${getSelectedTab('')}`}><RxDashboard />Overview</p></a>
                {userRoles?.includes('Student') && (
                    <>
                        <div className="text-divider">Student</div>
                        <a href="?tab=browseCourses"><p className={`dashboard-item ${getSelectedTab('browseCourses')}`}><MdClass />Browse Courses</p></a>
                        <a href="?tab=myCourses"><p className={`dashboard-item ${getSelectedTab('myCourses')}`}><MdOutlineClass />My Courses</p></a>
                    </>
                )}
                {userRoles?.includes('Teacher') && (
                    <>
                        <div className="text-divider">Teacher</div>
                        <a href="?tab=myTeacherCourses"><p className={`dashboard-item ${getSelectedTab('myTeacherCourses')}`}><MdOutlineClass />Courses I Teach</p></a>
                    </>
                )}
                {userRoles?.includes('Admin') && (
                    <>
                        <div className="text-divider">Admin</div>
                        <a href="?tab=userManagement"><p className={`dashboard-item ${getSelectedTab('userManagement')}`}><MdOutlineManageAccounts size={20} />User Management</p></a>
                    </>
                )}
            </div>

            <div className="settings-container">
                <div className="divider"></div>
                <a href="?tab=settings"><p className={`dashboard-item ${getSelectedTab('settings')}`}><IoSettingsSharp />Settings</p></a>
            </div>
        </div>
    );
};

export default Sidebar;
