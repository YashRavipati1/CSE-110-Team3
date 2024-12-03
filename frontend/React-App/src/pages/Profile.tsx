import React, { useContext, useState } from 'react';
import { Logout } from '../components/LogoutButton';
import styled from "styled-components";
import { DataContext } from '../contexts/DataContext';
import { NavButton } from '../components/navButton';
import { editUser } from '../api/users';
import { SubmitButton } from '../components/submitButton';
import { HeaderRow } from './Home';

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

const EntryItemDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const EntryInput = styled.input`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const EntryTitle = styled.h1`
    font-size: 24px;
    margin-bottom: 10px;
`;

const NameTitle = styled.h1`
    font-size: 50px;
    margin-bottom: 10px;
    text-align: center;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
`;

type EntryItemProps = {
    title: string;
    value: number;
    changeFunction: (value: any) => void;
}

//Item for each entry in profile page
const EntryItem = (props: EntryItemProps) => {
    return (
        <EntryItemDiv>
            <EntryTitle>{props.title}</EntryTitle>
            <EntryInput placeholder={props.value.toString()} onChange={(e) => props.changeFunction(e.target.value)} />
        </EntryItemDiv>
    );
};

const handleSubmit = async (email: string, weightGoal: number, caloriesGoal: number, proteinGoal: number, fatGoal: number, carbGoal: number) => {
    try {
        const updates = {
            weightGoal: Number(weightGoal),
            caloriesGoal: Number(caloriesGoal),
            proteinGoal: Number(proteinGoal),
            fatGoal: Number(fatGoal),
            carbGoal: Number(carbGoal)
        };
        const response = await editUser(email, updates);
        if (response.success) {
            alert("Successfully saved!");
            window.location.reload();
        }
        else {
            alert("Failed to save!");
        }
    } catch (error) {
        alert("Failed to save: " + error);
    }
}

export const Profile = () => {  
    const { currentUser } = useContext(DataContext);
    // State variables for all goals using current values or default values
    const [weightGoal, setWeightGoal] = useState(currentUser?.weightGoal ?? 0);
    const [calorieGoal, setCalorieGoal] = useState(currentUser?.caloriesGoal ?? 2200);
    const [proteinGoal, setProteinGoal] = useState(currentUser?.proteinGoal ?? 150);
    const [fatGoal, setFatGoal] = useState(currentUser?.fatGoal ?? 75);
    const [carbGoal, setCarbGoal] = useState(currentUser?.carbGoal ?? 300);

    const firstName = currentUser?.firstName ?? "";
    const lastName = currentUser?.lastName ?? "";

    return (

            <ProfileContainer>
                <HeaderRow>
                    <NavButton route="/" text="Home"></NavButton>
                    <NameTitle>{firstName} {lastName}</NameTitle>
                    <Logout />
                </HeaderRow>
                <EntryItem title="Weight Goal" value={weightGoal} changeFunction={(value) => setWeightGoal(value)} />
                <EntryItem title="Calorie Goal" value={calorieGoal} changeFunction={(value) => setCalorieGoal(value)} />
                <EntryItem title="Protein Goal" value={proteinGoal} changeFunction={(value) => setProteinGoal(value)} />
                <EntryItem title="Fat Goal" value={fatGoal} changeFunction={(value) => setFatGoal(value)} />
                <EntryItem title="Carb Goal" value={carbGoal} changeFunction={(value) => setCarbGoal(value)} />
                <SubmitButton onClick={() => handleSubmit(currentUser?.email ?? "", weightGoal, calorieGoal, proteinGoal, fatGoal, carbGoal)} text="Save" style={{ marginTop: "20px" }}></SubmitButton>
            </ProfileContainer>
    );
};

