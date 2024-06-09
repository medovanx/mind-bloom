const bcrypt = require('bcrypt');
const User = require('../models/User');
const { SignJWT, jwtVerify } = require('jose');
const crypto = require('crypto');

const authController = {};

// Signup function
authController.signup = async (req, res) => {
    try {
        const { first_name, last_name, username, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        // Check if the username already exists
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(409).json({ message: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        // Create a new user
        const newUser = new User({
            first_name,
            last_name,
            username,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error in signup:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

authController.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'No user found with this username' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Wrong password, please try again.' });
        }

        // Generate a token
        const secretKey = crypto.createSecretKey(Buffer.from(process.env.JWT_SECRET, 'utf-8'));
        const token = await new SignJWT({ id: user._id.toString() })
            .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
            .setIssuedAt()
            .setIssuer('Mind Bloom')
            .setExpirationTime('1h')
            .sign(secretKey);

        // Respond with user data and token
        res.status(200).json({
            message: 'Login successful',
            user: {
                token: token
            }
        });
    }
    catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

authController.verifyJWT = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'No authorization token provided' });
    }

    const tokenParts = authHeader.split(' ');
    if (tokenParts.length === 2 && tokenParts[0] === 'Bearer') {
        const token = tokenParts[1];
        try {
            // Using jwtVerify from jose
            const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));

            // Assuming the payload contains an 'id' to identify the user
            const user = await User.findById(payload.id).select('-password');
            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }
            req.user = user;
            next();
        } catch (error) {
            if (error.code === 'ERR_JWT_EXPIRED') {
                return res.status(401).json({ message: 'Unauthorized: Token has expired' });
            } else {
                return res.status(500).json({ message: `${error}` });
            }
        }
    } else {
        return res.status(401).json({ message: 'Authorization token must be a Bearer token' });
    }
};

module.exports = authController;
