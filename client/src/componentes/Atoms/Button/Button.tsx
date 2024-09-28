import React from 'react';
import './Button.scss'
/**
 * Botón reutilizable para la interfaz de usuario.
 *
 * @param {boolean} mode - Define si el botón está en modo primario o secundario.
 * @param {React.ReactNode} children - El contenido dentro del botón (opcional).
 * @param {function} onClick - Función a ejecutar cuando se hace clic en el botón.
 * @param {'button' | 'submit' | 'reset'} type - El tipo de botón HTML.
 * @param {string} className - Clases CSS adicionales para personalizar el estilo.
 * @param {'small' | 'medium' | 'large'} size - Tamaño del botón.
 * @param {string} label - Texto del botón.
 * @param {boolean} disabled - parametro para habilitar o no el boton.
 * @returns {JSX.Element} - Retorna el componente JSX del botón.
 */

interface ButtonTypeProps {
    mode?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
    type: 'button' | 'submit' | 'reset';
    className?: string;
    size?: 'small' | 'medium' | 'large';
    label: string;
    disabled?: boolean;
}

const Button: React.FC<ButtonTypeProps> = ({
    mode,
    children,
    onClick,
    type,
    size,
    className,
    label,
    disabled,
}) => {
    const buttonContent = children || label
    return (
        <button
            className={
                [
                    'button',
                    `size-${size}`,
                    `${mode ? 'primary' : 'secondary'}-button`,
                    `${className || ''}`
                ].join(' ')
            }
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            {buttonContent}
        </button>
    )
}

export default Button;