import React, { useState } from 'react';

import HiddenFieldEditor from './HiddenFieldEditor';

const Hidden = ({ field }) => {
 
  const [label, setLabel] = useState(field.label);
  const [value, setValue] = useState(field.value);


 

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-900">Field Name</label>
        <input
          type="text"
          className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 hover:border-gray-400 transition-colors duration-300"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-900">Hidden Value</label>
        <input
          type="password"
          className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 hover:border-gray-400 transition-colors duration-300"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      
    
    
    </div>
  );
};

export default Hidden;
