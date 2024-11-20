import React from 'react';
import Button from '../components/Button';
import '../css_styling_files/mealCard.css';
// Import Meal interface in future
interface Meal {
    id: number;
    name: string;
    type: string;
    calories: number;
    macros: string[];
}

interface MealCardProps {
    meal: Meal;
    onEdit: () => void;
    onDelete: () => void;
}

const MealCard: React.FC<MealCardProps> = ({ meal, onEdit, onDelete }) => {
    return (
        <div className="meal-card">
            <div className="meal-info">
                <h3>{meal.name}</h3>
                <p>Type: {meal.type}</p>
                <p>Calories: {meal.calories}</p>
                <p>Macros: {meal.macros.join(', ')}</p>
            </div>
            <div className="meal-actions">
                <Button icon="edit" text="Edit Meal" size = "medium" color = "#298e46" onClick={onEdit}/>
                <Button icon="delete" text="" size = "medium" color = "#298e46" onClick={onDelete} className="delete-button" />
            </div>
        </div>
    );
};

export default MealCard;
