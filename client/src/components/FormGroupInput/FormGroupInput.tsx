import './FormGroupInput.css';

interface FormGroupProps {
    label: string;
    id: string;
    type?: string;
    placeholder: string;
    required?: boolean;
    name?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormGroup = ({ label, id, type = "text", placeholder, required = false, onChange }: FormGroupProps) => {
    return (
        <div className="form-group">
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                id={id}
                name={id}
                placeholder={placeholder}
                required={required}
                onChange={onChange}
            />
        </div>
    );
};

export default FormGroup
