import React from 'react';

const Select = ({ value, onChange, children, className }) => {
    return (
        <select value={value} onChange={onChange} className={className}>
            {children}
        </select>
    );
};

export default Select;