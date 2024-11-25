// MealPage.tsx
/*import React, {useEffect, useState} from 'react';
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

 /*   const dummyMeal: Meal = {
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

export default MealPage;*/
// src/pages/MealPage.tsx
import React, { useEffect, useState } from 'react';
import { Meal } from '../types/types';
import MealCard from '../components/MealCard';
import { deleteNutritionRecord, getNutritionForUser, getAllNutritionForUser } from '../api/nutrition';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';



const MealPage: React.FC = () => {
    const navigate = useNavigate(); // Use the navigate hook to navigate to the edit page

    const [meals, setMeals] = useState<Meal[]>([]);
    
//yravipati@ucsd.edu
//zmukanova@ucsd.edu

    // Fetch meals for the user when the page loads
    useEffect(() => {
        const userEmail = 'yravipati@ucsd.edu'; // Ensure this is the correct email for the user
        console.log("Fetching meals for user:", userEmail);
    
        getAllNutritionForUser(userEmail).then(response => {
            console.log("API response:", response); // Check what the API returned
    
            if (response.success) {
                console.log("Meals loaded:", response.data); // Log to see the actual meals data
                setMeals(response.data.map((meal: Meal) => ({
                    ...meal,
                    id: meal._id  // Ensure that `_id` from MongoDB is mapped to `id` expected by frontend
                })));
            } else {
                console.error("Failed to fetch meals:", response.data); // Error logging if fetch failed
            }
        }).catch(error => {
            console.error("Error fetching meals:", error); // Catch any network or parsing errors
        });
    }, []);

    // Function to handle deleting a meal
    // Passing id because we need to know which meal to delete and it's unique to each meal
    // This function is called when the delete button is clicked
    // It will delete the meal from the database and update the UI
    // The meal is deleted from the UI by filtering out the meal with the matching id
    const handleDelete = async (id: string) => {
        try {
            const response = await deleteNutritionRecord(id);
            if (response.acknowledged) {
                setMeals(currentMeals => currentMeals.filter(meal => meal._id !== id));
            } else {
                console.error('Failed to delete the meal:', response);
            }
        } catch (error) {
            console.error('Error deleting meal:', error);
        }
    };

    // Function to handle editing a meal
    // Passing id because we need to know which meal to edit and it's unique to each meal
    // This function is called when the edit button is clicked
    // It will navigate to the edit page for the meal with the given id
    // The edit page will load the meal data and allow the user to update it
    // The id is used to fetch the meal data from the database
    // The id is passed to the edit page to know which meal to edit
    const handleEdit = (id: string) => {
        console.log("Navigate to edit page for meal:", id);
        navigate(`/edit-meal/${id}`);
    };

    return (
        <div>
            <h1>Meal List</h1>
            <Link to="/add-meal">
                <Button icon="add" text="Add Meal" size="large" color="#298e46"/>
            </Link>
            {meals.length > 0 ? (
            meals.map(meal => (
                <MealCard
                    key={meal._id}
                    meal={meal}
                    onDelete={() => handleDelete(meal._id)}  
                    onEdit={() => handleEdit(meal._id)}      
                />
            ))
        ) : (
            <p>No meals to display.</p>  // Provide feedback when no meals are available
        )}
        </div>
    );
};

export default MealPage;
