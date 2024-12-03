// src/pages/MealPage.tsx
// Meal Page is a page that displays a list of meals for the user
// It fetches the meals from the API and displays them in a list
// Each meal is displayed as a MealCard component (custom component in frontend/src/components/MealCard.tsx)

import React, { useEffect, useState, useContext } from 'react';
import MealCard from '../components/MealCard';
import { deleteNutritionRecord, getNutritionForUser, getAllNutritionForUser, getNutritionForUserDateRange } from '../api/nutrition';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { DataContext } from "../contexts/DataContext";
import { NutritionEntry, User, MealRec } from '../types/types';
import { getMealRec } from '../api/mealRec';
import { MealRecCard } from '../components/MealRecCard';

// Gets 3 recommended meals based on the user's goals and today's progress
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




const MealPage: React.FC = () => {

    const navigate = useNavigate(); // Use the navigate hook to navigate to the edit/add pages
    const { currentUser } = useContext(DataContext);
    const [meals, setMeals] = useState<NutritionEntry[]>([]);
    const [startDate, setStartDate] = useState(new Date()); // Set the start date to today
    const [endDate, setEndDate] = useState(new Date()); // Set the end date to today
    const [filterType, setFilterType] = useState("all"); // Set the default filter type to day, this will be used to filter the meals by day, week, month, year, or all

    const [mealRecs, setMealRecs] = useState<MealRec[]>([]);

    // Function to calculate the start and end date for the preset ranges (day/week/month/year)
    // Argument it takes is the type of range to calculate, e.g. day, week, month, year from filterType
    // It returns an object with the start and end date for the range, both are Date objects
    const calculatePresetRange = (type: string) => {
        const currentDate = new Date(); // Current date& time
        const startOfToday = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate(),
            0, 0, 0, 0 // Explicitly set time to midnight, because we want start of day
        );
    
        let start;
    
        switch (type) {
            case "week":
                start = new Date(startOfToday);
                start.setDate(start.getDate() - 7);
                break;
            case "month":
                start = new Date(startOfToday);
                start.setMonth(start.getMonth() - 1);
                break;
            case "year":
                start = new Date(startOfToday);
                start.setFullYear(start.getFullYear() - 1);
                break;
            default: // "day"
                start = startOfToday; // For current day, using startOfToday
        }
        // current time
        const end = currentDate;
    
        console.log("Preset range from the CALCULATE PRESET RANGE FUNCTION:", { start, end });
        return { start, end };
    };

    // Fetch meals for the user when the page loads
    useEffect(() => {
        // Get the current user's email from the context
        const userEmail = currentUser?.email;

        // To prevent undefined email errors
        if (!userEmail) {
            console.error("User email is undefined");
            return; // Exit if userEmail is undefined
        }

        getRecommendedMeals(currentUser).then(response => {
            setMealRecs(response);
        })
    
        // Fetch meals using a separate API function for all meals, no date ranges
        if(filterType === 'all'){
            getAllNutritionForUser(userEmail).then(response => {
                //console.log("API response from All:", response); // Check what the API returned for debugging
        
                if (response.success) {
                    //console.log("Meals loaded:", response.data); // Log to see the actual meals data for debugging
                    /*
                     Set meals by mapping the meals from the API to the expected format
                     The api response returns an array of meals, so we map each meal to the expected format
                     The three dots are used to copy the meal object and add the id field
                     The three dots are called the spread operator, they copy the object by value
                     In simple terms, it's like copying the object from the API response
                    */
    
                    // Set meals by mapping the meals received from the API to the expected format
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
            return;
        }
        
        // calculate date ranges based on the filter type
        const { start, end } = calculatePresetRange(filterType); 
        setStartDate(start);
        setEndDate(end); 

        // Fetch meals using a separate API function for a specific date range
    
        getNutritionForUserDateRange(userEmail, start, end).then(response => {
            // check what the API returned for debugging
            //console.log("API response for a specific option from date range:", response); 

            if (response.success) {
                /*
                 Set meals by mapping the meals from the API to the expected format
                The api response returns an array of meals, so we map each meal to the expected format
                 The three dots are used to copy the meal object and add the id field
                 The three dots are called the spread operator, they copy the object by value
                 In simple terms, it's like copying the object from the API response
                */

    
    
           
                setMeals(response.data.map((meal: NutritionEntry) => ({
                    ...meal,
                    id: meal._id  // making sure that `_id` from MongoDB is mapped to `id` expected by frontend
                })));

                //console.log("Meals loaded from calling date range API:", response.data); // Log to see the actual meals data for debugging
            } else {
            
                console.error("Failed to fetch meals:", response.data); // Error logging if fetch failed
                setMeals([]); // Clear the meals if the fetch fails
            }
        }); // Fetch the meals for the user based on the date range
    }, [filterType, currentUser]); // Fetch meals when the filter type, meal list or current user changes

    

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
            <h1>Meal List</h1>
            <div>
                <label htmlFor="filterType">Filter by:</label>
                <select
                    id="filterType"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                >
                    <option value="day">Day</option>
                    <option value="week">Week</option>
                    <option value="month">Month</option>
                    <option value="year">Year</option>
                    <option value="all">All</option> 
                    
                </select>
            </div>
            
            <div>
                <p>
                    Showing entries from:{" "}
                    {filterType === "all" ? "All Time" : ""}
                    {(filterType === "day" || filterType === "week" || filterType === "month" || filterType === "year") ?  `${startDate.toISOString().split("T")[0]} to ${endDate.toISOString().split("T")[0]}` : ""}
                    
                </p>
            </div>
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

