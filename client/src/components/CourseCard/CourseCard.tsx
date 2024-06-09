import './CourseCard.css';

interface Owner {
    _id: string;
    first_name: string;
    last_name: string;
}

interface CourseCardProps {
    course: {
        title: string;
        description: string;
        price: number;
        owner: Owner;
        id: number;
        level: number;
    };
}

const CourseCard = ({ course }: CourseCardProps) => {
    return (
        <div className="course">
            <div className="courseHeader">
                <h2 className="courseTitle">{course.title}</h2>
                <p className="coursePrice">{course.price?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
            </div>
            <p className="courseCardDescription">{course.description}</p>
            <p className="courseOwner">By {course.owner.first_name} {course.owner.last_name}</p>
            <p className="courseLevel">Level: {course.level === 1 ? 'Beginner' : course.level === 2 ? 'Intermediate' : 'Advanced'}</p>

        </div>
    )
}

export default CourseCard;
