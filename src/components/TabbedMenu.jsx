
// src/components/TabbedMenu.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function TabbedMenu() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Designer");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "Designer") {
      navigate("/form/new"); // Navigate to the FormBuilder
    } else if (tab === "Preview") {
      navigate("/form/view/1"); // Example: Navigate to a specific form view
    } else if (tab === "Logic") {
      navigate("/form/logic"); // Navigate to Logic component
    } else if (tab === "JSON Editor") {
      navigate("/form/json-editor"); // Navigate to JSON Editor component
    }
  };

  return (
    <div className="flex justify-around items-center py-2 bg-gray-100 text-black">
      {["Designer", "Preview", "Logic", "JSON Editor"].map((tab) => (
        <div
          key={tab}
          className={`cursor-pointer ${activeTab === tab ? "text-[#6e6ade] font-bold" : "text-gray-600"}`}
          onClick={() => handleTabClick(tab)}
        >
          <span>{tab}</span>
        </div>
      ))}
    </div>
  );
}

export default TabbedMenu;
