import React, { useState } from 'react';
import SignaturePad from './SignaturePad'; // Adjust the import path accordingly
import ViewForm from './ViewForm'; // Adjust the import path accordingly

const ParentComponent = () => {
  const [signature, setSignature] = useState(null);

  const handleSignatureSave = (dataURL) => {
    setSignature(dataURL);
  };

  return (
    <div>
      <SignaturePad onSave={handleSignatureSave} />
      <ViewForm signature={signature} />
    </div>
  );
};

export default ParentComponent;
