import React, { useState } from 'react';
import Button from '../components/Button';
import '../css_styling_files/addMeal.css';
import { Link } from 'react-router-dom';

const AddMealPage = () => {
    const [mealName, setMealName] = useState('');
    const [mealType, setMealType] = useState('');
    const [calories, setCalories] = useState('');
    const [protein, setProtein] = useState('');
    const [fats, setFats] = useState('');
    const [carbs, setCarbs] = useState('');

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const mealData = { mealName, mealType, calories, protein, fats, carbs };
        
        // Example API call to save the meal data
        try {
            const response = await fetch('http://localhost:8080/add-meal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(mealData)
            });

            if (response.ok) {
                console.log('Meal added successfully!');
                
            } else {
                console.error('Failed to add meal');
            }
        } catch (error) {
            console.error('Error saving meal:', error);
        }
    };


    //dummy function for now
    const handleSave = () => {
        console.log("Add button clicked");
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
                    <option value="" disabled selected>Select a meal type</option>
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
            <Link to="/meal-list">
            <Button text="Back" size = "large" color = "#298e46" onClick={handleSave}/>
           </Link>
            <Button text="Save Meal" size = "large" color = "#298e46" onClick={handleSave}/>
                   
        </form>
    );
};

export default AddMealPage;
