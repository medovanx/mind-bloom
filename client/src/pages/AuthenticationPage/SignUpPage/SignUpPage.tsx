import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { AxiosError } from 'axios';
import '../AuthenticationPage.css';
import FormGroupInput from '../../../components/FormGroupInput/FormGroupInput';
import CustomHead from '../../../components/CustomHead/CustomHead';
import Button from '../../../components/Button/Button'
import api from '../../../utils/api';
import { useState } from 'react';

const SignUpPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: ''
    });
    const { first_name, last_name, username, email, password } = formData;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };
    const handleSubmit = async (event?: React.MouseEvent) => {

        event?.preventDefault();
        try {
            const response = await api.post('/auth/signup', formData);
            if (response.status === 201) {
                toast.success("Successfully signed up!");
                navigate('/login');
            }
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                if (error.response && error.response.data) {
                    // Use error.response.data.message if available, otherwise a generic message
                    const message = error.response.data.message || "An error occurred.";
                    toast.error(message);
                }
                else {
                    // Fallback error message if the response doesn't contain the expected data
                    toast.error(error.message);
                }
            } else if (error instanceof Error) {
                // Generic error handling if the error isn't an AxiosError
                toast.error(error.message || "An unexpected error occurred.");
            } else {
                // Fallback for when error isn't an instance of an Error
                toast.error("An unexpected error occurred.");
            }
        }
    }

    return (
        <>
            <CustomHead title="Sign Up" />
            <section className="main-container">
                <div className="form-panel">
                    <div className="form-left-side">
                        <form id="signup-form" autoComplete="off">
                            <h1>Hello!</h1>
                            <p>Sign up to get started</p>
                            <div className="name-container">
                                <FormGroupInput label="First Name" id="first_name" placeholder="John" required onChange={handleChange} />
                                <FormGroupInput label="Last Name" id="last_name" placeholder="Doe" required onChange={handleChange} />
                            </div>
                            <FormGroupInput label="Username" id="username" placeholder="john_doe" required onChange={handleChange} />
                            <FormGroupInput label="Email" type="email" id="email" placeholder="john_doe@gmail.com" required onChange={handleChange} />
                            <FormGroupInput label="Password" type="password" id="password" placeholder="Password" required onChange={handleChange} />
                            <Button className="btn-primary" onClick={handleSubmit} disabled={!first_name || !last_name || !username || !email || !password}>
                                Sign Up
                            </Button>
                            <p id="bottom-text">Already have an account? <Link to="/login">Login</Link></p>
                        </form>
                    </div>
                    <div className="form-right-side">
                        <img id="signup-pic" src="/images/signup-image.png"
                            alt="signup" />
                    </div>
                </div>
            </section>
        </>
    );
};

export default SignUpPage;
