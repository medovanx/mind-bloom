import './ProfileDropdownMenu.css';
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ProfileDropdownMenu = () => {
    const { logout } = useAuth();
    const navigate = useNavigate(); // Hook for navigation

    const handleLogout = async () => {
        logout();
    };

    const goToProfile = () => {
        navigate('?tab=profile'); // Navigate to /profile
    };

    return (
        <div className="profile-dropdown-menu">
            <ul className="profile-dropdown-menu__list">
                <li className="profile-dropdown-menu__item" onClick={goToProfile}>
                    <CgProfile size={20} /> Profile
                </li>
                <li className="profile-dropdown-menu__item" id='logoutButton' onClick={handleLogout}>
                    <MdLogout size={20} /> Logout
                </li>
            </ul>
        </div>
    );
}

export default ProfileDropdownMenu;
