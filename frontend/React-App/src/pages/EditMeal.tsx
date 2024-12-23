import React, { useState, useEffect, useContext } from 'react';
import Button from '../components/Button';
import '../css_styling_files/addMeal.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getNutritionRecordById, updateNutritionRecord } from '../api/nutrition';
import { NutritionEntry, NewOrEditedNutritionEntry } from '../types/types';
import { DataContext } from "../contexts/DataContext";
import "react-datepicker/dist/react-datepicker.css";


const EditMealPage = () => {

    // Initialize state variables for the form fields
    const [mealName, setMealName] = useState('');
    const [mealType, setMealType] = useState('');
    const [calories, setCalories] = useState('');
    const [protein, setProtein] = useState('');
    const [fats, setFats] = useState('');
    const [carbs, setCarbs] = useState('');
    const [mealDate, setMealDate] = useState<Date | null>(null);
    const navigate = useNavigate();

    const { id } = useParams();  // This will get the id from the URL
    const userEmail = useContext(DataContext).currentUser?.email; // Get the user email from the context    

    // Fetch the existing meal data when the page loads, using the api
    // This will populate the form fields with the existing meal data
    
    useEffect(() => {

        
        const fetchMealData = async () => {
            if (!userEmail) {
                console.error("User email is undefined");
                return <div>Loading user data, email is undefined...</div>;  // Exit if userEmail is undefined & to prevent error & return empty div 
            }
            const response = await getNutritionRecordById(id!, userEmail);
            console.log("Response from getting meal: ", response); // The id! means is guaranteed to be present, might need to change later to catch errors with id passing
            if (response.success) {
                const mealData = response.data[0]; // Access the first element of the array that we're getting from the API
                setMealName(mealData.name);
                setMealType(mealData.type || ''); //type is optional bc its not in the schema yet
                setCalories(mealData.calories);
                setProtein(mealData.protein);
                setFats(mealData.fats);
                setCarbs(mealData.carbohydrates);
                setMealDate(new Date(mealData.date));
            } else {
                console.error('Failed to fetch meal details:', response.data);
            }
        };

        fetchMealData();
    }, [id]);

    // Function to handle form submission after the user has typed in their meal information
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        if (!userEmail) {
            console.error("User email is undefined");
            return <div>Loading user data, email is undefined...</div>;  // Exit if userEmail is undefined & to prevent error & return empty div 
        }
        if (!id) {
            console.error("Meal ID is undefined");
            return <div>Error loading user data, email is undefined...</div>;  // Exit if userEmail is undefined & to prevent error & return empty div 
        }
        /*if(!mealDate){
            console.error("Meal date is undefined");
            return <div>Error: Meal date is undefined...</div>;  // Exit if userEmail is undefined & to prevent error & return empty
        }*/
        event.preventDefault();
        if(!mealDate){
            console.error("Meal date is undefined");
            return <div>Error: Meal date is undefined...</div>;  // Exit if userEmail is undefined & to prevent error & return empty
        }
        const updatedMeal: NewOrEditedNutritionEntry = {
            name: mealName,
            user: userEmail,
            type: mealType,
            date: mealDate, // Use the current date as a Date object
            calories: Number(calories),
            carbohydrates: Number(carbs),
            fats: Number(fats),
            protein: Number(protein)
        };

       /* console.log("Data being sent to update from edit meal:", updatedMeal);
        console.log("User email from edit meal:", userEmail);
        console.log("Meal ID from edit meal:", id);*/

        try {
            const response = await updateNutritionRecord(userEmail, id!, updatedMeal);
            
            if (response.acknowledged) {
                console.log('Meal updated successfully!');
                navigate('/meals');
            } else {
                console.log('Meal ID:', id);    
                console.error('Failed to update meal:', response.data);
            }
        } catch (error) {
            console.error('Error updating meal:', error);
        }
    };

    // returning the forms, using the same UI as add page
    return (
        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', textAlign: 'center'}}>
                <h1>Edit Meal</h1>
                <div>
                    <label>Meal Name:</label>
                    <br />
                    <input type="text" value={mealName} onChange={e => setMealName(e.target.value)} required />
                </div>
                <div>
                    <label>Meal Type:</label>
                    <br />
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
                    <br />
                    <input type="number" value={calories} onChange={e => setCalories(e.target.value)} required />
                </div>
                <div>
                    <label>Protein:</label>
                    <br />
                    <input type="number" value={protein} onChange={e => setProtein(e.target.value)} required />
                </div>
                <div>
                    <label>Fats:</label>
                    <br />
                    <input type="number" value={fats} onChange={e => setFats(e.target.value)} required />
                </div>
                <div>
                    <label>Carbs:</label>
                    <br />
                    <input type="number" value={carbs} onChange={e=> setCarbs(e.target.value)} required />
                </div>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px'}}>
                    <Button text="Save Meal" size="large" color="#298e46" />
                    <Button text="Back" size="large" color="#298e46" route = "/meals"/>
                </div>
            </div>
        </form>
    );
};

export default EditMealPage;

