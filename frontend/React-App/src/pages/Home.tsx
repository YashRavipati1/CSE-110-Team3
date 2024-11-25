import styled from "styled-components";
import { MacroTracker } from "../components/macroTrackers";
import { DataContext } from "../contexts/DataContext";
import React, { useContext } from "react";
import { getNutritionForUser } from "../api/nutrition";
import { NavButton } from "../components/navButton";
import { Logout } from "../components/LogoutButton";
import { Link } from "react-router-dom";

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
            <HeaderRow>
            <Logout />
            <ProfileButton to={"/profile"}>
                <img src={"profile.svg"} alt="Profile" />
            </ProfileButton>
            </HeaderRow>
            <NavRow>
                <NavButton text="Nutrition   +" route="/nutrition" />
                <NavButton text="Mood   +" route="/mood" />
                <NavButton text="Exercise   +" route="/exercise" />
            </NavRow>
        </HomeContainer>
    );
};

