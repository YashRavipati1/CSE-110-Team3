// src/pages/MealPage.tsx
import React, { useEffect, useState, useContext } from 'react';
//import { Meal } from '../types/types';
import MealCard from '../components/MealCard';
import { deleteNutritionRecord, getNutritionForUser, getAllNutritionForUser } from '../api/nutrition';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { DataContext } from "../contexts/DataContext";
import { NutritionEntry, User, MealRec } from '../types/types';
import { getMealRec } from '../api/mealRec';
import { MealRecCard } from '../components/MealRecCard';

async function getRecommendedMeals(currentUser: User | null) {
    let CALORIE_GOAL = currentUser?.caloriesGoal ?? 2200
    let PROTEIN_GOAL = currentUser?.proteinGoal ?? 150
    let FAT_GOAL = currentUser?.fatGoal ?? 75
    let CARB_GOAL = currentUser?.carbGoal ?? 300
    const response = await getNutritionForUser(currentUser?.email ?? "", new Date());
    if (response.success) {
        const meals = response.data;
        let calories = 0;
        let protein = 0;
        let fats = 0;
        let carbohydrates = 0;
        for (const meal of meals) {
            calories += meal.calories;
            protein += meal.protein;
            fats += meal.fats;
            carbohydrates += meal.carbohydrates;
        }
        const calType = (CALORIE_GOAL - calories > 500) ? "High" : "Low";
        const pType = (PROTEIN_GOAL - protein > 50) ? "High" : "Low";
        const fType = (FAT_GOAL - fats > 30) ? "High" : "Low";
        const cType = (CARB_GOAL - carbohydrates > 150) ? "High" : "Low";
        const mealRecs = await getMealRec(calType, pType, fType, cType);
        if (!mealRecs.success) {
            console.error("Failed to get meal recommendations");
            return [];
        }
        return mealRecs.data;
    }
}

// Meal interface has a meal type


const MealPage: React.FC = () => {
    const navigate = useNavigate(); // Use the navigate hook to navigate to the edit page
    const { currentUser } = useContext(DataContext);
    const [meals, setMeals] = useState<NutritionEntry[]>([]);
    const [mealRecs, setMealRecs] = useState<MealRec[]>([]);

    // Fetch meals for the user when the page loads
    useEffect(() => {
        const userEmail = currentUser?.email; // Ensure this is the correct email for the user
        
        if (!userEmail) {
            console.error("User email is undefined");
            return; // Exit if userEmail is undefined
        }

        getRecommendedMeals(currentUser).then(response => {
            setMealRecs(response);
        })
    
    
        getAllNutritionForUser(userEmail).then(response => {
    
            if (response.success) {
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
        navigate(`/edit-meal/${id}`);
    };

    // When the plus button on the mealRec card is clicked, refresh the shown meals
    const handlePlus = () => {
        getAllNutritionForUser(currentUser?.email ?? "").then(response => {
    
            if (response.success) {
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
    }

    
    return (
        <div>
            <div className='header' style={{paddingLeft: '20px', paddingTop: '20px'}}>
                <h1>Meal List</h1>
                <Button icon="add" text="Add Meal" size="large" color="#298e46" route = "/add-meal"/>
            </div>
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
        <h1 style={{paddingLeft: '20px'}}>Recommended Meals</h1>
        {mealRecs.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
                {mealRecs.map(mealRec => (
                    <MealRecCard
                        meal={mealRec.title}
                        calories={mealRec.calories}
                        protein={mealRec.protein}
                        carbs={mealRec.carbs}
                        fats={mealRec.fats}
                        calType={mealRec.calType}
                        pType={mealRec.pType}
                        fType={mealRec.fType}
                        cType={mealRec.cType}
                        onPlus={handlePlus}
                    />
                ))}
            </div>
        ) : (
            <p>No recommended meals to display.</p>
        )}
        <div style={{paddingLeft: '20px'}}>
            <Button text = "Back" size = "large" color = "#298e46" route = "/"/>
        </div>
        </div>
        
    );
};

export default MealPage;

