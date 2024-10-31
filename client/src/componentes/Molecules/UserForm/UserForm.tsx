import React, { useState, useEffect } from 'react';
import Input from "../../Atoms/Input/Input";
import Button from "../../Atoms/Button/Button";
import "./UserForm.scss";

/**
 * Interfaz que define los campos de un formulario.
 * 
 * @typedef {Object} FormField
 * @property {string} name - Nombre del campo, que debe coincidir con la clave del formData.
 * @property {string} label - Etiqueta que se mostrará junto al campo.
 * @property {string} type - Tipo de input (e.g., "text", "password", "email").
 * @property {string} placeholder - Texto de ejemplo que aparecerá dentro del input.
 * @property {boolean} [required] - Si el campo es obligatorio o no.
 * @property {function} [validation] - Función de validación personalizada, recibe el valor del campo y retorna un string en caso de error o null si es válido.
 */
interface FormField {
    name: string;
    label: string;
    type: string;
    placeholder: string;
    required?: boolean;
    validation?: (value: string) => string | null;
}

/**
 * Props para el componente de formulario genérico.
 * 
 * @typedef {Object} GenericFormProps
 * @property {FormField[]} fields - Array de objetos que definen los campos del formulario.
 * @property {string} submitLabel - Etiqueta que aparecerá en el botón de submit.
 * @property {function(Object): void} handleSubmit - Función que se llama cuando el formulario es enviado con éxito.
 */
interface UserFormProps {
    fields: FormField[];
    submitLabel: string;
    handleSubmit: (data: { [key: string]: string }) => void;
}

/**
 * Componente de formulario genérico que se puede reutilizar para diferentes propósitos (login, registro, perfil, etc.).
 * 
 * @component
 * @param {GenericFormProps} props - Propiedades del componente.
 * @returns {JSX.Element} Un formulario dinámico.
 */
const UserForm: React.FC<UserFormProps> = ({ fields, submitLabel, handleSubmit }) => {

    // Estado inicial basado en los campos definidos.
    const initialState = fields.reduce((acc, field) => {
        acc[field.name] = '';
        return acc;
    }, {} as { [key: string]: string });

    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

    /**
     * Manejador de cambios de los campos del formulario.
     * 
     * @param {React.ChangeEvent<HTMLInputElement>} e - Evento que se dispara al cambiar un input.
     */
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        setTouched({
            ...touched,
            [name]: true,
        });

        validateInputField(name, value);

    };

    /**
   * Valida un campo individual en función de su valor y reglas de validación.
   * 
   * @param {string} name - El nombre del campo que se está validando.
   * @param {string} value - El valor actual del campo.
   */

    const validateInputField = (name: string, value: string) => {
        const field = fields.find((field) => field.name === name);
        let error = null;

        if (field?.required && !value) {
            error = `${field.label} is required.`;
        } else if (field?.validation) {
            error = field.validation(value)
        }

        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: error,
        }));
    }

    /**
     * Valida el formulario revisando los campos requeridos y las validaciones personalizadas.
     * 
     * @returns {boolean} Devuelve true si todos los campos son válidos; de lo contrario, false.
     */
    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string | null } = {};
        fields.forEach(field => {
            if (field.required && !formData[field.name]) {
                newErrors[field.name] = `${field.label} is required`;
            } else if (field.validation) {
                newErrors[field.name] = field.validation(formData[field.name]);
            }
        });

        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error !== null);
    };

    useEffect(() => {
        const isValid = validateForm();
        setIsFormValid(isValid);
    }, [formData])

    /**
     * Manejador del submit del formulario.
     * 
     * @param {React.FormEvent} e - Evento que se dispara al hacer submit del formulario.
     */
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            handleSubmit(formData);  // Pasa los datos validados al handler.
        }
    };

    return (
        <form onSubmit={onSubmit}>
            {fields.map(field => (
                <div key={field.name}>
                    <Input
                        type={field.type}
                        name={field.name}
                        label={field.label}
                        placeholder={field.placeholder}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                    />
                    {touched[field.name] && errors[field.name] && <p style={{ color: 'red' }}>{errors[field.name]}</p>}
                </div>
            ))}
            <Button
                mode
                type="submit"
                label={submitLabel}
                disabled={!isFormValid}
                size="medium"
            />
        </form>
    );
};

export default UserForm;
