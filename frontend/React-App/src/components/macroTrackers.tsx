import styled from 'styled-components';

const TrackerContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ProgressBarDiv = styled.div`
    position: relative;
    height: 10px;
    width: 200px;
    border-radius: 20px;
    border: 1px solid #ccc;
`;

const FillerDiv = styled.div`
    background: #007bff;
    height: 100%;
    border-radius: inherit;
    transition: width .2s ease-in;
`;

export interface MacroTrackerProps {
    type: "Calories" | "Protein" | "Fats" | "Carbohydrates";
    amount: number;
    goal: number;
}

export interface ProgressBarProps {
    percentage: number;
    type: "Calories" | "Protein" | "Fats" | "Carbohydrates";
}

const Filler = (props: ProgressBarProps) => {
    let backgroundColor: string;
    switch(props.type){
        case "Calories":
            backgroundColor = "Red";
            break;
        case "Protein":
            backgroundColor = "#ca356d";
            break;
        case "Fats":
            backgroundColor = "#d0f30c";
            break;
        case "Carbohydrates":
            backgroundColor = "#5fc936";
            break;
        default:
            backgroundColor = "#007bff";
    }
    return <FillerDiv className="filler" style={{ width: `${props.percentage}%`, background: backgroundColor }}></FillerDiv>;
}
export const ProgressBar = (props: ProgressBarProps) => {
    return (
        <ProgressBarDiv className="progress-bar">
            <Filler percentage={props.percentage} type={props.type} />
        </ProgressBarDiv>
    )
}

export const MacroTracker = ({ amount, goal, type }: MacroTrackerProps) => {
    return (
        <TrackerContainer>
            {type} - {amount}/{goal}
            <ProgressBar percentage={amount/goal*100} type={type} />
        </TrackerContainer>
    );
};

