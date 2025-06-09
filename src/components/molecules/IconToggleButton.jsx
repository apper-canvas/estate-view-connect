import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const IconToggleButton = ({ iconName, onClick, isActive }) => {
    return (
        <Button
            onClick={onClick}
            className={`p-2 rounded-md transition-colors ${
                isActive
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-surface-500 hover:text-surface-700'
            }`}
        >
            <ApperIcon name={iconName} className="w-4 h-4" />
        </Button>
    );
};

export default IconToggleButton;