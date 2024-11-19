import styled from "styled-components";
import { MacroTracker } from "../components/macroTrackers";
import { AuthContext, AuthProvider } from "../contexts/AuthContext";
import React, { useContext } from "react";
import { getNutritionForUser } from "../api/nutrition";
import { NavButton } from "../components/navButton";
import WeightTracker from "../components/WeightTracker";
import { signOut } from "firebase/auth";
import { auth } from '../firebase';

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #c1f1f7;
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

const LogoutButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #007bff;
    color: white;
`;

export const Home = () => {
    const { currentUser } = useContext(AuthContext);
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
        console.log("user email: ", currentUser?.email)
    }, [currentUser]);

    const logout = () => {
        signOut(auth).then(() => {
            console.log("User signed out");
        })
    };

    return (
        <AuthProvider>
            <HomeContainer>
                <LogoutButton onClick={logout}>Logout</LogoutButton>
                <MacroContainer>
                    <MacroTitle>MacroNutrients</MacroTitle>
                    <MacroTracker type="Calories" amount={nutritionData.calories} goal={2000}/>
                    <MacroTracker type="Protein" amount={nutritionData.protein} goal={150}/>
                    <MacroTracker type="Fats" amount={nutritionData.fats} goal={100}/>
                    <MacroTracker type="Carbohydrates" amount={nutritionData.carbohydrates} goal={300}/>
                </MacroContainer>
                <StyledWeightTracker>
                    <WeightTracker />
                </StyledWeightTracker>
                <NavRow>
                    <NavButton text="Food" route="/nutrition" />
                    <NavButton text="Mood" route="/mood" />
                    <NavButton text="Exercise" route="/exercise" />
                </NavRow>
            </HomeContainer>
        </AuthProvider>
    );
};

