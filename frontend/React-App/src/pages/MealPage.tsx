// MealPage.tsx
import React from 'react';
import MealCard from '../components/MealCard';
import Button from '../components/Button';

import { Link } from 'react-router-dom';

interface Meal {
    id: number;
    name: string;
    type: string;
    calories: number;
    macros: string[];
}

const MealPage: React.FC = () => {
    const dummyMeal: Meal = {
        id: 1,
        name: 'Grilled Chicken Salad',
        type: 'Lunch',
        calories: 350,
        macros: ['40g Protein', '30g Carbs', '20g Fats']
    };

    const dummyMeal2: Meal = {
        id: 2,
        name: 'Donut',
        type: 'Snack',
        calories: 300,
        macros: ['1g Protein', '30g Carbs', '20g Fats']
    };

    const handleAdd = () => {
        console.log("Add button clicked");
    };

    const handleEdit = () => {
        console.log("Edit button clicked");
    };

    const handleDelete = () => {
        console.log("Delete button clicked");
    };

    return (
        <div>
            <h1>Meal List</h1>
            <Link to="/add-meal">
                <Button icon="add" text="Add Meal" size="large" color="#298e46" onClick={handleAdd}/>
            </Link>
            <MealCard meal={dummyMeal} onEdit={handleEdit} onDelete={handleDelete} />
            <MealCard meal={dummyMeal2} onEdit={handleEdit} onDelete={handleDelete} />
            
        </div>
    );
};

export default MealPage;
