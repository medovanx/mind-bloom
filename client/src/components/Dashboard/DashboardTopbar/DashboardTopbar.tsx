import './DashboardTopbar.css';
import { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import ProfileDropdownMenu from '../../../components/ProfileDropdownMenu/ProfileDropdownMenu'
import { useUserProfile } from '../../../context/UserProfileContext';


const DashboardTopbar = () => {
    const { userProfile } = useUserProfile();
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const handleMouseEnter = () => {
        setIsDropdownVisible(true);
    };

    const handleMouseLeave = () => {
        setIsDropdownVisible(false);
    };

    return (
        <div className="dashboard-topbar">
            <div className="topbar-actions" onMouseLeave={handleMouseLeave}>
                <div className="user-profile">
                    <img src={userProfile?.avatar || ''} alt="User avatar" />

                    <div className="user-profile_initials">
                        <p id="userFullName">{userProfile?.firstName || 'Undefined'} {userProfile?.lastName || 'Undefined'}</p>
                        <p id="userRole">{userProfile?.role.join(', ') || 'Undefined'}</p>
                    </div>

                </div>
                <div onMouseEnter={handleMouseEnter}>
                    <IoIosArrowDown color="black" size={20} style={{ cursor: 'pointer' }} />
                </div>
                {isDropdownVisible && <ProfileDropdownMenu />}
            </div>
        </div>
    );
};

export default DashboardTopbar;
