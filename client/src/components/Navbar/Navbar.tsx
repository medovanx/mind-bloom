import Button from '../Button/Button'
import './Navbar.css'

const Navbar = () => {
    return (
        <header>
            <div className="logo"><a href="/">MindBloom</a></div>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/courses">Courses</a></li>
                </ul>
            </nav>
            <div className="login-signup">
                <a href="/login"><Button className="btn-primary">Login</Button></a>
                <a href="/signup"><Button className="btn-primary">Sign Up</Button></a>
            </div>
        </header>
    )
}

export default Navbar