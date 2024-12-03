import React, { useState } from 'react';
import RangeSlider from './RangeSlider';
import '../css_styling_files/rangeSlider.css';
import '../css_styling_files/MoodPage.css';
import { createMoodEntry } from '../api/mood';

const MoodPage: React.FC = () => {
    const [happiness, setHappiness] = useState(0);
    const [stress, setStress] = useState(0);
    const [energy, setEnergy] = useState(0);

    const handleSubmit = () => {
        createMoodEntry({ happiness, stress, energy });
    };

    const handleBack = () => {
        window.history.back();
    }

    function MoodValueBox({ headerText, value, onChange }: { headerText: string, value: number, onChange: (value: number) => void }) { // Accept headerText, value, and onChange as props
        return (
            <div className="sliderBox">
                <div className="header">{headerText}</div> 
                <div className="body">
                <RangeSlider min={0} max={10} step={1} value={value} onChange={onChange} />
                </div>
            </div>
        );
    }
    

    return (
        <div>
            <h1 id ="header-phrase">How are you feeling today? </h1>

            <MoodValueBox headerText="Happiness" value={happiness} onChange={setHappiness} />
            <MoodValueBox headerText="Stress" value={stress} onChange={setStress} />
            <MoodValueBox headerText="Energy" value={energy} onChange={setEnergy} />

             {/*Buttons placed on the bottom */}
            <div className ="button-container"> 
                <button className="button" onClick={handleBack} >Back</button>
                <button className = "button"onClick={handleSubmit}>Submit</button>
            </div>
        </div>
        
    );
};

export default MoodPage;
