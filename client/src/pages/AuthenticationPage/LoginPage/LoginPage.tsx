import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../../context/AuthContext';  // Ensure the correct path
import '../AuthenticationPage.css';
import Button from '../../../components/Button/Button';
import CustomHead from '../../../components/CustomHead/CustomHead';
import FormGroupInput from '../../../components/FormGroupInput/FormGroupInput';
import api from '../../../utils/api';
import { AxiosError } from 'axios';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event?: React.MouseEvent) => {
        event?.preventDefault();  // Only call preventDefault if event is not undefined
        const credentials = {
            username,
            password
        };
        try {
            const response = await api.post('/auth/login', credentials);
            if (response.status === 200) {
                const { user } = response.data;
                login(user);  // Update the auth context
                toast.success("Successfully logged in!");
                navigate('/dashboard?tab=profile');  // Redirect to the dashboard
            }
        } catch (error: unknown) {
            if (error instanceof AxiosError && error.response) {
                toast.error(error.response.data.message || "Login failed.");
            } else {
                toast.error("An unexpected error occurred.");
            }
        }
    };

    return (
        <>
            <CustomHead title="Login" />
            <section className="main-container">
                <div className="form-panel">
                    <div className="form-left-side">
                        <form id="login-form" autoComplete="off">
                            <h1>Welcome Back!</h1>
                            <p>Please login to continue</p>
                            <FormGroupInput
                                label="Username"
                                type="text"
                                id="username"
                                placeholder="Enter your username"
                                required={true}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <FormGroupInput
                                label="Password"
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                required={true}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button className="btn-primary" onClick={handleSubmit} disabled={!username || !password}>
                                Login
                            </Button>
                            <p id="bottom-text">Don't have an account? <Link to="/signup">Sign Up</Link></p>
                        </form>
                    </div>
                    <div className="form-right-side">
                        <img id="login-pic" src="/images/login-image.png" alt="Login Visual" />
                    </div>
                </div>
            </section>
        </>
    );
};

export default LoginPage;
