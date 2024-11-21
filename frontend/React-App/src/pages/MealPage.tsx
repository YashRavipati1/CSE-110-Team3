// MealPage.tsx
import React, {useEffect, useState} from 'react';
import MealCard from '../components/MealCard';
import Button from '../components/Button';

import { Link } from 'react-router-dom';

import {getUser} from '../api/users'

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

const MealPage: React.FC = () => {

    // state for storing user details and meals
    const [userDetails, setUserDetails] = useState(null);
    const [meals, setMeals] = useState([]);

  /*  useEffect(() => {
        const userEmail = 'example@example.com'; // Assume this comes from a secure authentication source
        const fetchUserData = async () => {
            const response = await getUser(userEmail);
            if (response.success) {
                setUserDetails(response.data);
                // Optionally set meals here if meals are part of the user data or need user data to fetch
                setMeals(response.data.nutritionRecords); 
            } else {
                console.error('Failed to fetch user details:', response.data);
            }
        };

        fetchUserData();
    }, []);
*/

    const dummyMeal: Meal = {
        id: "1",
        name: 'Grilled Chicken Salad',
        type: 'Lunch',
        calories: 350,
        protein: 30,
        fats: 10,
        carbs: 20,
        date: '2021-09-01',
        user:"dsjc"
    };

    const dummyMeal2: Meal = {
        id: "2",
        name: 'Donut',
        type: 'Snack',
        calories: 300,
        protein: 5,
        fats: 15,
        carbs: 40,
        date: '2021-09-01',
        user:"dsjc"
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
