


import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  updateDropzoneLabel,
} from '../features/formSlice';
import UppyDropzone from './UppyDropzone';

const DropzoneEditor = ({ field }) => {
  const dispatch = useDispatch();
  const { id, label = '', files = [] } = field;

  const [newLabel, setNewLabel] = useState(label);

  useEffect(() => {
    // Update the state when field label changes externally
    setNewLabel(label);
  }, [label, files]);

  const handleLabelChange = (e) => {
    const updatedLabel = e.target.value;
    setNewLabel(updatedLabel);
    dispatch(updateDropzoneLabel({ fieldId: id, label: updatedLabel }));
  };

  return (
    <div className="dropzone">
      <input
        type="text"
        value={newLabel}
        placeholder="Dropzone Label"
        onChange={handleLabelChange}
        className="border p-2 rounded w-full mb-4"
      />
      
      {/* Display uploaded files with clickable links */}
      {Array.isArray(files) && files.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold text-black mb-2">
            Uploaded Files (Stored in Cloudinary):
          </h4>
          <div className="space-y-2">
            {files.map((fileUrl, index) => {
              const fileName = fileUrl.split('/').pop() || fileUrl;
              const fileExtension = fileName.split('.').pop()?.toLowerCase();
              
              // Determine file type icon
              let fileIcon = '📄'; // Default
              if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExtension)) {
                fileIcon = '🖼️';
              } else if (fileExtension === 'pdf') {
                fileIcon = '📄';
              } else if (['doc', 'docx'].includes(fileExtension)) {
                fileIcon = '📝';
              } else if (['xls', 'xlsx'].includes(fileExtension)) {
                fileIcon = '📊';
              } else if (['zip', 'rar'].includes(fileExtension)) {
                fileIcon = '📦';
              }
              
              return (
                <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded border">
                  <span className="text-lg">{fileIcon}</span>
                  <a 
                    href={fileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline flex-1"
                  >
                    {fileName}
                  </a>
                  <span className="text-xs text-gray-500">File {index + 1}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropzoneEditor;
