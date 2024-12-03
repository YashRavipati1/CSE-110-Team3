// src/pages/MealPage.tsx
import React, { useEffect, useState, useContext } from 'react';
//import { Meal } from '../types/types';
import MealCard from '../components/MealCard';
import { deleteNutritionRecord, getNutritionForUser, getAllNutritionForUser } from '../api/nutrition';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { DataContext } from "../contexts/DataContext";
import { NutritionEntry } from '../types/types';

// Meal interface has a meal type


const MealPage: React.FC = () => {
    const navigate = useNavigate(); // Use the navigate hook to navigate to the edit page
    const { currentUser } = useContext(DataContext);
    const [meals, setMeals] = useState<NutritionEntry[]>([]);

    // Fetch meals for the user when the page loads
    useEffect(() => {
        const userEmail = currentUser?.email; // Ensure this is the correct email for the user
        
        if (!userEmail) {
            console.error("User email is undefined");
            return; // Exit if userEmail is undefined
        }
    
    
        getAllNutritionForUser(userEmail).then(response => {
            console.log("API response:", response); // Check what the API returned
    
            if (response.success) {
                console.log("Meals loaded:", response.data); // Log to see the actual meals data
                setMeals(response.data.map((meal: NutritionEntry) => ({
                    ...meal,
                    id: meal._id  // making sure that `_id` from MongoDB is mapped to `id` expected by frontend
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
                <Button icon="add" text="Add Meal" size="large" color="#298e46" route = "/add-meal"/>
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
        <Button text = "Back" size = "large" color = "#298e46" route = "/"/>
        </div>
        
    );
};

export default MealPage;
