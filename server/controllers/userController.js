const User = require('../models/User');
const userController = {};

userController.getBasicProfile = async (req, res) => {
    const userId = req.user.id;
    try {
        // Check if the requesting user is accessing their own profile or has an admin role
        if (!req.user.id === userId && !req.user.roles.includes('Admin')) {
            return res.status(403).json({ message: 'Forbidden: You do not have permission to access this profile' });
        }

        // Find the user in the database
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            firstName: user.first_name,
            lastName: user.last_name,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            role: user.roles,
            createdAt: user.created_at,
            coverImage: user.coverImage,
        });
    }
    catch (error) {
        console.error('Error in getBasicProfile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

userController.getUserCertificates = async (req, res) => {
    const userId = req.user.id;
    try {
        // Check if the requesting user is accessing their own certificates or has an admin role
        if (!req.user.id === userId && !req.user.roles.includes('Admin')) {
            return res.status(403).json({ message: 'Forbidden: You do not have permission to access these certificates' });
        }

        // Find the user in the database
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user.certificates);
    }
    catch (error) {
        console.error('Error in getUserCertificates:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

userController.getAllUsers = async (req, res) => {
    try {
        // Check if the requesting user has an admin role
        if (!req.user.roles.includes('Admin')) {
            return res.status(403).json({ message: 'Forbidden: You do not have permission to access this resource' });
        }

        const users = await User.find({}, '_id first_name last_name username email roles created_at');
        res.json(users);
    }
    catch (error) {
        console.error('Error in getAllUsers:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

userController.updateProfile = async (req, res) => {
    const userId = req.user.id;
    const { firstName, lastName, username, email, avatar, coverImage } = req.body;
    try {
        // Find the user in the database
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // check if any of the fields are empty then dont update them
        user.first_name = firstName || user.first_name;
        user.last_name = lastName || user.last_name;
        user.username = username || user.username;
        user.email = email || user.email;
        user.avatar = avatar || user.avatar;
        user.coverImage = coverImage || user.coverImage;
        await user.save();

        res.json({
            message: 'Profile updated successfully', user: {
                firstName: user.first_name,
                lastName: user.last_name,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                role: user.roles,
                createdAt: user.created_at,
            }
        });
    }
    catch (error) {
        if (error.code === 11000) {
            const field = error.keyPattern.email ? 'Email' : 'Username';
            return res.status(400).json({ message: `${field} already exists.` });
        }
        console.error('Error updating user profile:', error);
        return res.status(500).json({ message: `Internal server error: ${error}` });
    }

}
module.exports = userController;
