import React, { useState } from "react";
import "./NumberFieldWithControlPanel.css";

const NumberFieldWithControlPanel = () => {
  const [value, setValue] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [required, setRequired] = useState(false);
  const [shrink, setShrink] = useState(false);
  const [label, setLabel] = useState("Number Field");
  const [isEditing, setIsEditing] = useState(false);

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  const handleMinChange = (e) => {
    setMin(e.target.value);
    if (value !== "" && Number(e.target.value) > Number(value)) {
      setValue(e.target.value);
    }
  };

  const handleMaxChange = (e) => {
    setMax(e.target.value);
    if (value !== "" && Number(e.target.value) < Number(value)) {
      setValue(e.target.value);
    }
  };

  const handleRequiredChange = () => {
    setRequired((prev) => !prev);
  };

  const handleShrinkChange = () => {
    setShrink((prev) => !prev);
  };

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
  };

  return (
    <div className="number-field-container">
      <div className={`number-field-left${shrink ? " shrink" : ""}`}>  
        <label>
          {label}
          <input
            type="number"
            value={value}
            min={min}
            max={max}
            required={required}
            onChange={handleValueChange}
            style={{ width: shrink ? 80 : 180 }}
          />
        </label>
        <button className="edit-btn" onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </div>
      {isEditing && (
        <div className="number-field-control-panel">
          <h3>Control Panel</h3>
          <div className="control-group">
            <label>
              Field Name:
              <input type="text" value={label} onChange={handleLabelChange} />
            </label>
          </div>
          <div className="control-group">
            <label>
              Min:
              <input type="number" value={min} onChange={handleMinChange} />
            </label>
          </div>
          <div className="control-group">
            <label>
              Max:
              <input type="number" value={max} onChange={handleMaxChange} />
            </label>
          </div>
          <div className="control-group">
            <label>
              Required:
              <input
                type="checkbox"
                checked={required}
                onChange={handleRequiredChange}
              />
            </label>
          </div>
          <div className="control-group">
            <label>
              Shrink:
              <input
                type="checkbox"
                checked={shrink}
                onChange={handleShrinkChange}
              />
            </label>
          </div>
          <button className="close-btn" onClick={() => setIsEditing(false)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default NumberFieldWithControlPanel; 