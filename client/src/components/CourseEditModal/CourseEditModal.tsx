import "./CourseEditModal.css"; // You can style your modal as needed
import Button from '../Button/Button';
import { useEffect, useState } from "react";
interface Course {
    _id: string;
    title: string;
    description: string;
    price?: number;
    level: number;
    students: Array<string>;
    teachers: Array<string>;
}

interface CourseEditModalProps {
    course: Course;
    isOpen: boolean;
    onSave: (updatedCourse: Course) => void;
    onClose: () => void;
}

const CourseEditModal = ({ course, isOpen, onSave, onClose }: CourseEditModalProps) => {
    const [updatedCourse, setUpdatedCourse] = useState<Course>(course);

    useEffect(() => {
        // Update the state with the new course every time the course prop changes
        setUpdatedCourse(course);
    }, [course]); // Only re-run the effect if the course prop changes

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        // Handle different types of inputs such as number
        const updatedValue = e.target.type === 'number' ? Number(value) : value;
        setUpdatedCourse(prev => ({ ...prev, [name]: updatedValue }));
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Edit Course</h2>
                <div className='inputGroup'>
                    <label>Title</label>
                    <input type="text" name="title" value={updatedCourse.title} onChange={handleChange} />
                </div>
                <div className='inputGroup'>
                    <label>Description</label>
                    <textarea name="description" value={updatedCourse.description} onChange={handleChange} />
                </div>
                <div className='inputGroup'>
                    <label>Price</label>
                    <input type="number" name="price" value={updatedCourse.price || ''} onChange={handleChange} />
                </div>
                <div className="actions">
                    <Button onClick={() => onSave(updatedCourse)} className="btn-primary">Save</Button>
                    <Button onClick={onClose} className="btn-secondary">Cancel</Button>
                </div>
            </div>
        </div>
    );
};

export default CourseEditModal;
