/*import React from 'react';
import Button from '../components/Button';
import '../css_styling_files/mealCard.css';
// Import Meal interface in future
interface Meal {
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
}

const MealCard: React.FC<MealCardProps> = ({ meal, onEdit, onDelete }) => {
    return (
        <div className="meal-card">
            <div className="meal-info">
                <h3>{meal.name}</h3>
                <p>Type: {meal.type}</p>
                <p>Calories: {meal.calories}</p>
                <span>Protein: {meal.protein} Carbs: {meal.carbs} Fats: {meal.fats}</span>
            </div>
            <div className="meal-actions">
                <Button icon="edit" text="Edit Meal" size = "medium" color = "#298e46" onClick = {()=> onEdit(meal.id)}/>
                <Button icon="delete" text="" size = "medium" color = "#298e46"onClick = {()=> onDelete(meal.id)}className="delete-button" />
            </div>
        </div>
    );
};

export default MealCard;*/
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
            </div>
            <div className="meal-actions">
            <Button icon="edit" text="Edit Meal" size="medium" color="#298e46" onClick={() => onEdit(meal._id)} />
            <Button icon="delete" text="" size="medium" color="#298e46" onClick={() => onDelete(meal._id)} className="delete-button" />

            </div>
        </div>
    );
};

export default MealCard;