import React, { useContext, useState } from 'react';
import Button from '../components/Button';
import '../css_styling_files/addMeal.css';
import { Link, useNavigate } from 'react-router-dom';
import { addNutritionRecord } from '../api/nutrition';
import { NutritionEntry, NewOrEditedNutritionEntry } from '../types/types';
import { DataContext } from "../contexts/DataContext";

const AddMealPage = () => {

    // Use state to store the form field values 
    const [mealName, setMealName] = useState('');
    const [mealType, setMealType] = useState('');
    const [calories, setCalories] = useState('');
    const [protein, setProtein] = useState('');
    const [fats, setFats] = useState('');
    const [carbs, setCarbs] = useState('');
    // useNavigate hook to navigate to the meals page immediatly after adding a meal
    const navigate = useNavigate(); 

    // Get the user email from the context, signed in user
    const userEmail = useContext(DataContext).currentUser?.email; 
    if (!userEmail) {
        console.error("User email is undefined");
        return <div>Cannot pull up user data, email is undefined...</div>;
    }

    // Function to handle form submission after the user has typed in their meal information
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const newMeal = {
            name: mealName, 
            user: userEmail, 
            type: mealType,
            date: new Date(),
            calories: Number(calories),
            carbohydrates: Number(carbs), 
            fats: Number(fats),
            protein: Number(protein)
        };

        try {
            console.log('Adding new meal:', newMeal);
            const response = await addNutritionRecord(newMeal);
            if (response.acknowledged ) {
                console.log('Meal added successfully!', response.insertedId);
                navigate('/meals'); 
            } else {
                console.error('Failed to save meal:', response);
            }
        } catch (error) {
            console.error('Error saving meal:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Add Meal</h1>
            <div>
                <label htmlFor="meal-name">Meal Name:</label>
                <input
                    id="meal-name"
                    type="text"
                    value={mealName}
                    onChange={e => setMealName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="meal-type">Meal Type:</label>
                <select
                    id="meal-type"
                    value={mealType}
                    onChange={e => setMealType(e.target.value)}
                    required
                >
                    <option value="" disabled>Select a meal type</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Snack">Snack</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div>
                <label htmlFor="calories">Calories:</label>
                <input
                    id="calories"
                    type="number"
                    value={calories}
                    onChange={e => setCalories(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="protein">Protein:</label>
                <input
                    id="protein"
                    type="number"
                    value={protein}
                    onChange={e => setProtein(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="fats">Fats:</label>
                <input
                    id="fats"
                    type="number"
                    value={fats}
                    onChange={e => setFats(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="carbs">Carbs:</label>
                <input
                    id="carbs"
                    type="number"
                    value={carbs}
                    onChange={e => setCarbs(e.target.value)}
                    required
                />
            </div>
            <div>
                <Button text="Back" size="large" color="#298e46" route="/meals" />
                <Button text="Save Meal" size="large" color="#298e46" />
            </div>
        </form>
    );
};

export default AddMealPage;
