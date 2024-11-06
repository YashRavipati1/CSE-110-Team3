import React from 'react';
import RangeSlider from './RangeSlider';
import './rangeSlider.css';
import './MoodPage.css';

const MoodPage: React.FC = () => {
    const handleSubmit = () => {
        console.log("Submit button clicked");
    };
    const handleBack = () =>{
        console.log("Back button clicked");
    }

    function MoodValueBox({ headerText }: { headerText: string }) { // Accept headerText as a prop
        return (
            <div className="sliderBox">
                <div className="header">{headerText}</div> 
                <div className="body">
                <RangeSlider min={0} max={10} step={1} onChange={(value) => console.log(value)} />
                </div>
            </div>
        );
    }
    

    return (
        <div>
            <h1 id ="header-phrase">How are you feeling today? </h1>

            <MoodValueBox headerText="Happiness" />
            <MoodValueBox headerText="Stress" />
            <MoodValueBox headerText="Energy" />

             {/*Buttons placed on the bottom */}
            <div className ="button-container"> 
                <button className="button" onClick={handleBack} >Back</button>
                <button className = "button"onClick={handleSubmit}>Submit</button>
            </div>
        </div>
        
    );
};

export default MoodPage;