import React from 'react';
import './Input.scss';
/**
 *  Input reutilizable
 *  @param {string} name - Define el name del input
 *  @param {string} type - Define el type del input
 *  @param {string} placeholder - Define el valor de ejemplo para el placeholder
 *  @param {string} value - Define el valor del input
 *  @param {function} onChange - Funcion onChange
 */

interface InputTypeProps {
    name: string;
    type: string;
    placeholder: string;
    value: string;
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputTypeProps> = ({
    name,
    type,
    placeholder,
    value,
    label,
    onChange,
}) => {
    return (
        <>
            <label htmlFor="">{label}</label>
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </>

    )
}

export default Input;