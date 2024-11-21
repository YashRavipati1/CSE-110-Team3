import React from 'react';
import Button from '../components/Button';
import '../css_styling_files/mealCard.css';
// Import Meal interface in future
interface Meal {
<<<<<<< HEAD
    id: string;
    name: string;
    type: string;
    calories: number;
    protein: number;
    fats: number;
    carbs: number;
    date: string;
    user: string;
}

// functions expect meal ids to reference the meal to be edited/ deleted
interface MealCardProps {
    meal: Meal;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
=======
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
>>>>>>> b555d2b19299bfda5d64a59e7aa07077970cbfb0
}

const MealCard: React.FC<MealCardProps> = ({ meal, onEdit, onDelete }) => {
    return (
        <div className="meal-card">
            <div className="meal-info">
                <h3>{meal.name}</h3>
                <p>Type: {meal.type}</p>
                <p>Calories: {meal.calories}</p>
<<<<<<< HEAD
                <span>Protein: {meal.protein} Carbs: {meal.carbs} Fats: {meal.fats}</span>
            </div>
            <div className="meal-actions">
                <Button icon="edit" text="Edit Meal" size = "medium" color = "#298e46" onClick = {()=> onEdit(meal.id)}/>
                <Button icon="delete" text="" size = "medium" color = "#298e46"onClick = {()=> onDelete(meal.id)}className="delete-button" />
=======
                <p>Macros: {meal.macros.join(', ')}</p>
            </div>
            <div className="meal-actions">
                <Button icon="edit" text="Edit Meal" size = "medium" color = "#298e46" onClick={onEdit}/>
                <Button icon="delete" text="" size = "medium" color = "#298e46" onClick={onDelete} className="delete-button" />
>>>>>>> b555d2b19299bfda5d64a59e7aa07077970cbfb0
            </div>
        </div>
    );
};

export default MealCard;
