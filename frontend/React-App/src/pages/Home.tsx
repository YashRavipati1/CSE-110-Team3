import styled from "styled-components";
import { MacroTracker } from "../components/macroTrackers";
import { DataContext } from "../contexts/DataContext";
import React, { useContext } from "react";
import { getNutritionForUser } from "../api/nutrition";
import { NavButton } from "../components/navButton";
import { Logout } from "../components/LogoutButton";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import { WeightTracker } from "../components/WeightTracker";

export const HeaderRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 10px 20px;
    position: absolute;
    top: 30px;
`;

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

const MacroContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 50vh;
    width: 50vw;
    position: absolute;
    top: 0;
    left: 0;
    gap: 20px;
`;

const MacroTitle = styled.h1`
    font-size: 24px;
`;

const NavRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    position: absolute;
    bottom: 20%;
`;

const ProfileButton = styled(Link)`
    background-repeat: no-repeat;
    background-size: contain;
    background-color: transparent;
    position: absolute;
    left: 30px;
    cursor: pointer;
    border: none;
    outline: none;
`;

const StyledWeightTracker = styled.div`
    position: absolute; 
    top: 90px; 
    right: 150px; 
    width: 900px; 
    height: 500px; 
    background-color: #f9f9f9;
    border: 2px solid #d1d1d1;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
`;


export const Home = () => {
    const { currentUser } = useContext(DataContext);
    const [nutritionData, setNutritionData] = React.useState({ calories: 0, protein: 0, fats: 0, carbohydrates: 0 });

    React.useEffect(() => {
        const fetchNutrition = async () => {
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
                setNutritionData({ calories, protein, fats, carbohydrates });
            }
        };
        fetchNutrition();
    }, [currentUser]);

    return (
        <HomeContainer>
            <MacroContainer>
                <MacroTitle>MacroNutrients</MacroTitle>
                <MacroTracker type="Calories" amount={nutritionData.calories} goal={currentUser?.caloriesGoal ?? 0}/>
                <MacroTracker type="Protein" amount={nutritionData.protein} goal={currentUser?.proteinGoal ?? 0}/>
                <MacroTracker type="Fats" amount={nutritionData.fats} goal={currentUser?.fatGoal ?? 0}/>
                <MacroTracker type="Carbohydrates" amount={nutritionData.carbohydrates} goal={currentUser?.carbGoal ?? 0}/>
            </MacroContainer>
                <StyledWeightTracker>
                    <WeightTracker />
                </StyledWeightTracker>
            <HeaderRow>
            <Logout />
            <ProfileButton to={"/profile"}>
                <img src={"profile.svg"} alt="Profile" />
            </ProfileButton>
            </HeaderRow>
            <NavRow>
                {/*Zere: Added route to /meals instead of /nutrition */}
                <NavButton text="Nutrition   +" route="/meals" />
                <NavButton text="Mood   +" route="/mood" />
                <NavButton text="Exercise   +" route="/exercise" />
            </NavRow>
        </HomeContainer>
    );
};

