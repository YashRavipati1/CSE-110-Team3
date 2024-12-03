// src/components/MealCard.tsx
import React from 'react';
//import { Meal } from '../types/types'; // Importing the Meal interface
import Button from './Button';
import '../css_styling_files/mealCard.css';
import { NutritionEntry } from '../types/types';

interface MealCardProps {
    meal: NutritionEntry;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const MealCard: React.FC<MealCardProps> = ({ meal, onEdit, onDelete }) => {
    return (

        <div className="meal-card">
            <div className="meal-info">
                <h3>{meal.name}</h3>
                <p>Type: {meal.type}</p>
                <p>Calories: {meal.calories}</p>
                <span>Protein: {meal.protein} Carbs: {meal.carbohydrates} Fats: {meal.fats}</span>
                <p id="date">Date Added: {new Date(meal.date).toISOString().split("T")[0]}</p>


            </div>
            <div className="meal-actions">
                <div style={{ paddingBottom: '15px'}}>
                    <Button icon="edit" text="Edit Meal" size="medium" color="#298e46" onClick={() => onEdit(meal._id)} />
                </div>
                <Button icon="delete" text="" size="medium" color="#298e46" onClick={() => onDelete(meal._id)} className="delete-button" />
            </div>
        </div>
    );
};

export default MealCard;