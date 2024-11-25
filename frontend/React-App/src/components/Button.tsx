// Reusable, customizable button component

import React from 'react';
// Run this in terminal if lines below are giving you an error: 
//npm install @fortawesome/fontawesome-svg-core @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faPencilAlt, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import '../css_styling_files/button.css';
import { useNavigate } from 'react-router-dom';

/*
Defining what the button component will accept as arguments
Ones with the "?" are optional
*/
interface ButtonProps {
  icon?: 'edit' | 'delete' | 'add';  // Specify which icons are allowed
  text: string;
  size: 'small' | 'medium' | 'large';
  color?: string;
  onClick?: () => void;
  className?: string;
  route?: string;
}

// Map for icon types to FontAwesome icons (pre-selected icons)
const iconMap: Record<string, IconProp> = {
  edit: faPencilAlt,
  delete: faTrash,
  add: faPlus,
};

const Button: React.FC<ButtonProps> = ({
  icon,
  text,
  size,
  color = 'blue',
  onClick,
  route,
  className = ''
}) => {
  const navigate = useNavigate(); // React Router's navigate function

  // Handle the button click
  const handleClick = () => {
    if (route) {
      navigate(route); // Navigate to the specified route
    } else if (onClick) {
      onClick(); // Call the custom onClick handler if provided
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`button ${size} ${className}`}
      style={{ backgroundColor: color }}
    >
      {icon && <FontAwesomeIcon icon={iconMap[icon]} />}
      {text}
    </button>
  );
};

export default Button;
