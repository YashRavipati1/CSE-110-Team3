import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { DataContext } from '../contexts/DataContext';
import { NewOrEditedNutritionEntry } from '../types/types';
import { addNutritionRecord } from '../api/nutrition';

const MealRecCardDiv = styled.div`
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    margin: 20px;
    position: relative;
    max-width: 300px;
    min-width: 300px;
`;

const MealRecText = styled.div`
    flex: 1;
    padding: 10px;
`;

const MealRecSelect = styled.div`
    flex: 1;
    padding: 10px;
`;

const MealRecButtons = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
`;

const PlusButton = styled.button`
    background-color: #2ea44f;
    border: none;
    border-radius: 50%;
    color: white;
    cursor: pointer;
    font-size: 24px;
    height: 40px;
    width: 40px;
`;

const InfoButtonDiv = styled.button`
    background-color: #2ea44f;
    border: none;
    border-radius: 50%;
    color: white;
    cursor: pointer;
    font-size: 24px;
    height: 40px;
    width: 40px;
`;

const MealTitle = styled.h3`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    margin: 0;
`;

export interface MealRecProps {
    meal: string,
    calories: number,
    protein: number,
    carbs: number,
    fats: number,
    calType: string,
    pType: string,
    fType: string,
    cType: string,
    onPlus: () => void
}


export const MealRecCard = ({ meal, calories, protein, carbs, fats, calType, pType, fType, cType, onPlus }: MealRecProps) => {
    const { currentUser } = useContext(DataContext);
    const [mealType, setMealType] = useState('');

    const popover = (
        <Popover id="popover-basic">
          <Popover.Header as="h3">{meal}</Popover.Header>
          <Popover.Body>
            <p>Recommended because: </p>
            <ul>
                <li>Calories: {calType}</li>
                <li>Protein: {pType || "N/A"}</li>
                <li>Fat: {fType || "N/A"}</li>
                <li>Carbohydrates: {cType || "N/A"}</li>
            </ul>
          </Popover.Body>
        </Popover>
    );

    // If user adds recommended meal, add a nutrition record to the database
    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const newMeal: NewOrEditedNutritionEntry = {
            name: meal, 
            user: currentUser?.email ?? "", 
            type: mealType,
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
                onPlus();
            } else {
                console.log('Response from add meal:', response);
            }
        } catch (error) {
            console.error('Error saving meal:', error);
        }
    };

    // Popover to show extra information regarding the recommended meal
    const InfoButton = () => {
        return (
            <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                <InfoButtonDiv>?</InfoButtonDiv>
            </OverlayTrigger>
        );
    }

    return (
        <MealRecCardDiv>
            <MealRecText>
                <MealTitle title={meal}>{meal}</MealTitle>
                <p>Calories: {calories}</p>
                <p>Protein: {protein}</p>
                <p>Carbs: {carbs}</p>
                <p>Fats: {fats}</p>
            </MealRecText>
            <MealRecSelect>
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
            </MealRecSelect>
            <MealRecButtons>
                <PlusButton onClick={handleSubmit}>+</PlusButton>
                <InfoButton></InfoButton>
            </MealRecButtons>
        </MealRecCardDiv>
    );
}
