import React, { useState } from 'react';
import './rangeSlider.css';

interface RangeSliderProps {
  min: number;
  max: number;
  step: number;
  initialValue?: number;
  onChange?: (value: number) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({ min, max, step, initialValue = min, onChange }) => {
  const [value, setValue] = useState<number>(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setValue(newValue);
    onChange && onChange(newValue);
  };

  return (
    <div className="range-slider-container">
      <input className='range-slider'
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        style={{ '--value-percent': `${((value - min) / (max - min)) * 100}%` } as React.CSSProperties }
      />
      <span>{value}</span>
    </div>
  );
};
//Object literal may only specify known properties, and ''--value-percent'' does not exist in type 'Properties<string | number, string & {}>'.
//To fix the error, you can use the CSSProperties type from react and add an index signature to allow custom properties.

export default RangeSlider;