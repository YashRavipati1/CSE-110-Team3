import React, { useState } from 'react';
import Button from '../components/Button';
import '../css_styling_files/addMeal.css';
import { Link, useNavigate } from 'react-router-dom';
import { addNutritionRecord } from '../api/nutrition';
import { NutritionRecord } from '../types/types';

const AddMealPage = () => {
    const [mealName, setMealName] = useState('');
    const [mealType, setMealType] = useState('');
    const [calories, setCalories] = useState('');
    const [protein, setProtein] = useState('');
    const [fats, setFats] = useState('');
    const [carbs, setCarbs] = useState('');
    const navigate = useNavigate(); 

    //yravipati@ucsd.edu
    // Function to handle form submission after the user has typed in their meal information
    // This function will be called when the user clicks the "Save Meal" button
    // It will send the meal data to the API to be saved in the database
    // If the meal is saved successfully, the user will be navigated to the meals page
    // If there is an error, it will be logged to the console
    // The meal data is sent as a JSON object to the API
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newMeal: NutritionRecord = {
            name: mealName, 
            user: 'yravipati@ucsd.edu', // Replace with user automatically in the future, this is a placeholder
            date: new Date().toISOString().slice(0, 10),
            calories: Number(calories),
            carbohydrates: Number(carbs), 
            fats: Number(fats),
            protein: Number(protein)
        };
    
        try {
            const response = await addNutritionRecord(newMeal);
            console.log("Data to be sent:", newMeal); 
            if (response.acknowledged) {
                console.log('Meal added successfully!', response.insertedId);
                navigate('/meals'); 
            } else {
                console.log('Response from add meal:', response);
            }
        } catch (error) {
            console.error('Error saving meal:', error);
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <h1>Add Meal</h1>
            <div>
                <label>Meal Name:</label>
                <input type="text" value={mealName} onChange={e => setMealName(e.target.value)} required />
            </div>
            <div>
                <label>Meal Type:</label>
                <select value={mealType} onChange={e => setMealType(e.target.value)} required>
                    <option value="" disabled>Select a meal type</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Snack">Snack</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div>
                <label>Calories:</label>
                <input type="number" value={calories} onChange={e => setCalories(e.target.value)} required />
            </div>
            <div>
                <label>Protein:</label>
                <input type="number" value={protein} onChange={e => setProtein(e.target.value)} required />
            </div>
            <div>
                <label>Fats:</label>
                <input type="number" value={fats} onChange={e => setFats(e.target.value)} required />
            </div>
            <div>
                <label>Carbs:</label>
                <input type="number" value={carbs} onChange={e => setCarbs(e.target.value)} required />
            </div>
            <div>
                <Link to="/meals">
                    <Button text="Back" size="large" color="#298e46" />
                </Link>
                <Button text="Save Meal" size="large" color="#298e46"  />
            </div>
        </form>
    );
};

export default AddMealPage;
