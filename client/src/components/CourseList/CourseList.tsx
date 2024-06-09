import './CourseList.css'
interface CourseListProps {
    children: React.ReactNode
}
const CourseList = ({ children }: CourseListProps) => {
    return (
        <div id="course-list">
            {children}
        </div>
    )
}

export default CourseList