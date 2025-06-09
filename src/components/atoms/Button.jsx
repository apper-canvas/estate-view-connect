import React from 'react';

const Button = ({ onClick, children, className, type = 'button' }) => {
    return (
        <button type={type} onClick={onClick} className={className}>
            {children}
        </button>
    );
};

export default Button;