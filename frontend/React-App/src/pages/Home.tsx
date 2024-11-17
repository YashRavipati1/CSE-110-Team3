import styled from "styled-components";
import { MacroTracker } from "../components/macroTrackers";
import { AuthContext, AuthProvider } from "../contexts/AuthContext";
import React, { useContext } from "react";
import { getNutritionForUser } from "../api/nutrition";
import { NavButton } from "../components/navButton";

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
                    console.log(meal);
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
        <AuthProvider>
            <HomeContainer>
                <MacroContainer>
                    <MacroTitle>MacroNutrients</MacroTitle>
                    <MacroTracker type="Calories" amount={nutritionData.calories} goal={2000}/>
                    <MacroTracker type="Protein" amount={nutritionData.protein} goal={150}/>
                    <MacroTracker type="Fats" amount={nutritionData.fats} goal={100}/>
                    <MacroTracker type="Carbohydrates" amount={nutritionData.carbohydrates} goal={300}/>
                </MacroContainer>
                <NavRow>
                    <NavButton text="Food" route="/nutrition" />
                    <NavButton text="Mood" route="/mood" />
                    <NavButton text="Exercise" route="/exercise" />
                </NavRow>
            </HomeContainer>
        </AuthProvider>
    );
};
