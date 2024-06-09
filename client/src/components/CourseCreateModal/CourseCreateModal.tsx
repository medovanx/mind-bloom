import React, { useState } from 'react';
import Button from '../Button/Button';

interface NewCourse {
    title: string;
    description: string;
    price?: number;
    level: number;
}

interface CourseCreateModalProps {
    isOpen: boolean;
    onSave: (course: NewCourse) => void;
    onClose: () => void;
}

const CourseCreateModal = ({ isOpen, onSave, onClose }: CourseCreateModalProps) => {
    const [newCourse, setNewCourse] = useState<NewCourse>({ title: '', description: '', price: 0, level: 1 });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewCourse({ ...newCourse, [name]: value });
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Create New Course</h2>
                <div className='inputGroup'>
                    <label>Title</label>
                    <input type="text" name="title" placeholder="Title" value={newCourse.title} onChange={handleChange} />
                </div>
                <div className='inputGroup'>
                    <label>Description</label>
                    <textarea name="description" placeholder="Description" value={newCourse.description} onChange={handleChange} />
                </div>
                <div className='inputGroup'>
                    <label>Price</label>
                    <input type="number" name="price" placeholder="Price" value={newCourse.price || ''} onChange={handleChange} />
                </div>
                <div className='inputGroup'>
                    <label>Level</label>
                    <input type="number" name="level" placeholder="Level" value={newCourse.level} onChange={handleChange} />
                </div>
                <div className="actions">
                    <Button onClick={() => onSave(newCourse)} className="btn-primary">Save</Button>
                    <Button onClick={onClose} className="btn-secondary">Cancel</Button>
                </div>
            </div>
        </div>
    );
};

export default CourseCreateModal;
