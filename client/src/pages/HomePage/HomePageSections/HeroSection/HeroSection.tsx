import './HeroSection.css'
import Button from '../../../../components/Button/Button'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
const HeroSection = () => {
    return (
        <section id="hero-section">
            <div className="container">
                <div id="hero-section-text">
                    <h1 id="hero-section-title">Improve your learning <br />with <span id="website-title">MindBloom</span></h1>
                    <p id="hero-section-description">We offer a wide range of courses to<br /> help you understand various
                        topics.</p>
                    <a href="/courses"><Button id="view-courses-button" className="btn-primary">Explore Courses <FontAwesomeIcon icon={faChevronRight} /></Button></a>
                </div>
                <div className="image">
                    <img src="/images/figure1.png" />
                </div>
            </div>
        </section>
    )
}

export default HeroSection