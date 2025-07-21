// src/components/TabNavigator.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function TabNavigator() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Designer");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "Designer") {
      navigate("/form/new"); // Navigate to the FormBuilder
    } else if (tab === "Preview") {
      navigate("/form/view/1"); // Example: Navigate to a specific form view
    } else if (tab === "Logic") {
      // Navigate to Logic component (you can create a route and component for this)
      navigate("/form/logic");
    } else if (tab === "JSON Editor") {
      // Navigate to JSON Editor component (you can create a route and component for this)
      navigate("/form/json-editor");
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

export default TabNavigator;
