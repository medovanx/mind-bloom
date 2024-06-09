import './ProfilePage.css'
import { useUserProfile } from '../../../context/UserProfileContext';
import { MdOutlineMailOutline } from "react-icons/md";
import { VscSymbolNamespace } from "react-icons/vsc";
import { CiCalendar } from "react-icons/ci";
import { FiUser } from "react-icons/fi";

import api from '../../../utils/api';
import { useEffect, useState } from 'react';
import Button from '../../../components/Button/Button';
import { toast } from 'react-toastify';
import { useRef } from 'react';
import CertificatesList from '../../../components/CertificateList/CertificateList';


export const ProfilePage = () => {
    const { userProfile, setUserProfile } = useUserProfile();
    const [editMode, setEditMode] = useState(false);
    const [imageData, setImageData] = useState('');
    const [coverImageData, setCoverImageData] = useState('');

    const [editData, setEditData] = useState({
        username: userProfile?.username,
        email: userProfile?.email,
        firstName: userProfile?.firstName,
        lastName: userProfile?.lastName,
    });

    const [initialData, setInitialData] = useState(editData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedData = {
            ...editData,
            [e.target.name]: e.target.value
        };
        setEditData(updatedData);
        console.log(updatedData);
    };

    // Handle avatar image change
    const handleAvatarImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageData(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCoverImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setCoverImageData(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    }

    useEffect(() => {
        if (userProfile?.avatar) {
            setImageData(userProfile.avatar);
        }
        if (userProfile?.coverImage) {
            setCoverImageData(userProfile.coverImage);
        }
    }, [userProfile]); // Dependency on userProfile ensures this runs when userProfile updates
    //*/

    useEffect(() => {
        setInitialData({
            username: userProfile?.username,
            email: userProfile?.email,
            firstName: userProfile?.firstName,
            lastName: userProfile?.lastName,
        });
    }, [userProfile]);

    useEffect(() => {
        if (userProfile) {
            setEditData({
                username: userProfile.username,
                email: userProfile.email,
                firstName: userProfile.firstName,
                lastName: userProfile.lastName,
            });
        }
    }, [userProfile]); // Dependency on userProfile ensures this runs when userProfile updates


    const constructPayload = () => {
        const payload: any = {};
        Object.keys(editData).forEach(key => {
            if (editData[key as keyof typeof editData] !== initialData[key as keyof typeof initialData]) {
                payload[key] = editData[key as keyof typeof editData];
            }
        });
        // Handle the avatar separately 
        if (imageData !== userProfile?.avatar) {
            payload.avatar = imageData;
        }

        if (coverImageData !== userProfile?.coverImage) {
            payload.coverImage = coverImageData;
        }

        return payload;
    };

    const saveChanges = async () => {
        const updatedProfileData = constructPayload();
        if (Object.keys(updatedProfileData).length === 0) {
            toast.info("No changes to update.");
            return;
        }

        const toastId = toast.loading('Updating profile...');
        try {
            const response = await api.put('/user/updateProfile', updatedProfileData, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user') || '').token}`,
                },
            });
            toast.dismiss(toastId);
            toast.success('Profile updated successfully!');
            setUserProfile(response.data.user);
            setEditMode(false);
        } catch (error: any) {
            toast.dismiss(toastId);
            console.error('Error updating profile:', error.response.data.message);
            toast.warn(`Failed to update profile: ${error.response.data.message}`);
        }
    };

    // Cancel changes
    const cancelChanges = () => {
        setEditData({
            username: userProfile?.username,
            email: userProfile?.email,
            firstName: userProfile?.firstName,
            lastName: userProfile?.lastName,
        });
        setImageData(userProfile?.avatar || '');
        setCoverImageData(userProfile?.coverImage || '');
        setEditMode(false);
    };
    const avatarFileInputRef = useRef<HTMLInputElement>(null);
    const coverFileInputRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <div className='profileContainer'>
                <>
                    <div onClick={() => coverFileInputRef.current?.click()} className={'profileCover' + (editMode ? ' editable' : '')}>
                        <img src={coverImageData} alt='Cover' />
                        {editMode &&
                            <input
                                type="file"
                                style={{ display: 'none' }}
                                ref={coverFileInputRef}
                                accept="image/jpeg, image/png, image/jpg"
                                onChange={handleCoverImageChange}
                            />}
                    </div>
                    <div className='profileContent'>
                        <div onClick={() => avatarFileInputRef.current?.click()} className={'profileImage' + (editMode ? ' editable' : '')}>
                            <img src={imageData} alt='Profile' />

                            {editMode &&
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    ref={avatarFileInputRef}
                                    accept="image/jpeg, image/png, image/jpg"
                                    onChange={handleAvatarImageChange}
                                />}
                        </div>
                        <div className='profileDetails'>
                            <h1 id="userFullName">{userProfile?.firstName} {userProfile?.lastName}</h1>
                            <p id="username">@{userProfile?.username}</p>
                        </div>
                        <div className='profileButtons'>
                            {!editMode && <Button onClick={() => setEditMode(true)} className='btn-secondary'>Edit Profile</Button>}
                            {editMode && (
                                <div className='ButtonGroup'>
                                    <Button onClick={saveChanges} className='btn-primary'>Update</Button>
                                    <Button onClick={cancelChanges} className='btn-secondary'>Cancel</Button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='profileStats'>
                        {editMode ? (
                            <>
                                <div className='generalInfoCard'>
                                    <h2>Edit Profile</h2>
                                    <div className='generalInfoContent'>
                                        <div className='formGroup nameGroup'>
                                            <div className='formGroup'>
                                                <label htmlFor="firstName">First Name</label>
                                                <input type="text" name="firstName" value={editData.firstName} onChange={handleChange} />
                                            </div>
                                            <div className='formGroup'>
                                                <label htmlFor="lastName">Last Name</label>
                                                <input type="text" name="lastName" value={editData.lastName} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className='formGroup'>
                                            <label htmlFor="username">Username</label>
                                            <input type="text" name="username" value={editData.username} onChange={handleChange} />
                                        </div>
                                        <div className='formGroup'>
                                            <label htmlFor="email">Email</label>
                                            <input type="email" name="email" value={editData.email} onChange={handleChange} />
                                        </div>

                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='generalInfoCard'>
                                    <h2>General Information</h2>
                                    <div className='generalInfoContent'>
                                        <p className='generalInfoItem'><span className='generalInfoItemHead'><FiUser size={20} />Full Name</span> {userProfile?.firstName} {userProfile?.lastName}</p>
                                        <p className='generalInfoItem'><span className='generalInfoItemHead'><VscSymbolNamespace size={20} />Roles</span> {userProfile?.role.join(', ')}</p>
                                        <p className='generalInfoItem'><span className='generalInfoItemHead'><MdOutlineMailOutline size={20} />Email</span> {userProfile?.email}</p>
                                        <p className='generalInfoItem'><span className='generalInfoItemHead'><CiCalendar size={20} />Date Joined</span> {userProfile?.createdAt.split('T')[0]}</p>
                                    </div>
                                </div>
                                <div className='generalInfoCard'>
                                    <CertificatesList />
                                </div>
                            </>
                        )}
                    </div>
                </>
            </div>
        </>
    )
}

export default ProfilePage;