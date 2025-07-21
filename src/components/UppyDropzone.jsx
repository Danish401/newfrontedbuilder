// // working for pdf and zip 

// import React, { useEffect, useMemo, useRef, useState } from "react";
// import Uppy from "@uppy/core";
// import Tus from "@uppy/tus";
// import { Dashboard } from "@uppy/react";
// import "@uppy/core/dist/style.css";
// import "@uppy/dashboard/dist/style.css";
// import { useDispatch } from "react-redux";
// import { setDropzoneFiles } from "../features/formSlice";
// import DropzoneEditor from "./DropzoneEditor";
// import { toast } from "react-toastify"; // Import toast notification

// const UppyDropzone = ({ field }) => {
//   const dispatch = useDispatch();
//   const { id, label, fileType = "pdf,zip", maxFileSize = 5* 1024 * 1024 } = field;

//   const [currentFileType, setCurrentFileType] = useState(fileType);
//   const [currentMaxFileSize, setCurrentMaxFileSize] = useState(maxFileSize);
//   const [editing, setEditing] = useState(false);
//   const [failedUploads, setFailedUploads] = useState([]);

//   const uppyRef = useRef(null);

//   const uppy = useMemo(() => {
//     const allowedFileTypes = ["application/pdf", ".zip"]; // Allow only PDF and ZIP files

//     const uppyInstance = new Uppy({
//       restrictions: {
//         maxNumberOfFiles: 3,
//         maxFileSize: currentMaxFileSize,
//         allowedFileTypes: allowedFileTypes,
//       },
//       autoProceed: false,
//     });

//     uppyInstance.use(Tus, { endpoint: "http://localhost:5000/api/forms" });
//     uppyRef.current = uppyInstance;

//     // Listen for the `file-added` event to validate the file type
//     uppyInstance.on("file-added", (file) => {
//       const isValidType = allowedFileTypes.includes(file.type) || allowedFileTypes.includes(file.extension);
//       if (!isValidType) {
//         uppy.removeFile(file.id);
//         toast.error("Please upload PDF"); // Show toast notification
//       }
//     });

//     return uppyInstance;
//   }, [currentMaxFileSize]);

//   useEffect(() => {
//     const handleComplete = (result) => {
//       const files = result.successful.map((file) => file.uploadURL);
//       dispatch(setDropzoneFiles({ fieldId: id, files }));
//     };

//     const handleUploadError = (file, error) => {
//       console.error(`Error uploading ${file.name}:`, error);
//       setFailedUploads((prev) => [
//         ...prev,
//         { name: file.name, error: error.message },
//       ]);
//     };

//     uppy.on("complete", handleComplete);
//     uppy.on("upload-error", handleUploadError);

//     return () => {
//       uppy.off("complete", handleComplete);
//       uppy.off("upload-error", handleUploadError);
//     };
//   }, [uppy, dispatch, id]);

//   const handleSave = () => {
//     setEditing(false);
//   };

//   return (
//     <div className="h-[100%] p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4 border-dotted border-4 border-[#959da0] hover:border-[#dde6e9] transition duration-300">
//       <h2 className="text-2xl font-semibold text-center text-[#e5e9eb]">{label}</h2>
//       {editing ? (
//         <DropzoneEditor field={field} onSave={handleSave} />
//       ) : (
//         <>
//           <Dashboard uppy={uppy} className="h-[100%]" />
//           {failedUploads.length > 0 && (
//             <div className="mt-4">
//               <h3 className="font-semibold text-Black">Failed Uploads:</h3>
//               <ul className="list-disc pl-5">
//                 {failedUploads.map((file, index) => (
//                   <li key={index} className="text-Black">
//                     {file.name}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default UppyDropzone;



// import React, { useEffect, useMemo, useRef, useState } from "react";
// import Uppy from "@uppy/core";
// import XHRUpload from "@uppy/xhr-upload";
// import { Dashboard } from "@uppy/react";
// import "@uppy/core/dist/style.css";
// import "@uppy/dashboard/dist/style.css";
// import { useDispatch } from "react-redux";
// import { setDropzoneFiles, saveForm } from "../features/formSlice";
// import DropzoneEditor from "./DropzoneEditor";
// import { toast } from "react-toastify";

// const UppyDropzone = ({ field }) => {
//   const dispatch = useDispatch();
//   const { id, label, fileType = "application/pdf,application/zip", maxFileSize = 5 * 1024 * 1024 } = field;

//   const [currentFileType, setCurrentFileType] = useState(fileType);
//   const [currentMaxFileSize, setCurrentMaxFileSize] = useState(maxFileSize);
//   const [editing, setEditing] = useState(false);
//   const [failedUploads, setFailedUploads] = useState([]);

//   const uppyRef = useRef(null);

//   const uppy = useMemo(() => {
//     const uppyInstance = new Uppy({
//       restrictions: {
//         maxNumberOfFiles: 3,
//         maxFileSize: currentMaxFileSize,
//         allowedFileTypes: currentFileType.split(","),
//       },
//       autoProceed: false,
//     });

//     // Configure XHRUpload to match your backend
//     uppyInstance.use(XHRUpload, {
//       endpoint: "http://localhost:5000/api/forms/upload", // Updated endpoint
//       formData: true,
//       fieldName: 'files',
//     });

//     uppyInstance.on("file-added", (file) => {
//       const isValidType = currentFileType.split(",").includes(file.type);
//       if (!isValidType) {
//         uppyInstance.removeFile(file.id);
//         toast.error("Please upload a PDF or ZIP file.");
//       }
//     });

//     uppyRef.current = uppyInstance;
//     return uppyInstance;
//   }, [currentMaxFileSize, currentFileType]);

//   useEffect(() => {
//     const handleComplete = (result) => {
//       const files = result.successful.map((file) => file.response.body.urls);
//       dispatch(setDropzoneFiles({ fieldId: id, files }));

//       const formData = {
//         id,
//         files,
//       };
//       dispatch(saveForm(formData));
//     };

//     const handleUploadError = (file, error) => {
//       console.error(`Error uploading ${file.name}:`, error);
//       setFailedUploads((prev) => [
//         ...prev,
//         { name: file.name, error: error.message },
//       ]);
//     };

//     uppy.on("complete", handleComplete);
//     uppy.on("upload-error", handleUploadError);

//     return () => {
//       uppy.off("complete", handleComplete);
//       uppy.off("upload-error", handleUploadError);
//     };
//   }, [uppy, dispatch, id]);

//   const handleSave = () => {
//     setEditing(false);
//   };

//   return (
//     <div className="h-[100%] p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4 border-dotted border-4 border-[#959da0] hover:border-[#dde6e9] transition duration-300">
//       <h2 className="text-2xl font-semibold text-center text-[#e5e9eb]">{label}</h2>
//       {editing ? (
//         <DropzoneEditor field={field} onSave={handleSave} />
//       ) : (
//         <>
//           <Dashboard uppy={uppy} className="h-[100%]" />
//           {failedUploads.length > 0 && (
//             <div className="mt-4">
//               <h3 className="font-semibold text-Black">Failed Uploads:</h3>
//               <ul className="list-disc pl-5">
//                 {failedUploads.map((file, index) => (
//                   <li key={index} className="text-Black">
//                     {file.name}: {file.error}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default UppyDropzone;



// UppyDropzone.jsx
import React, { useEffect, useMemo, useState } from "react";
import Uppy from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";
import { Dashboard } from "@uppy/react";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import { useDispatch } from "react-redux";
import { setDropzoneFiles } from "../features/formSlice"; // Ensure correct action import
import { toast } from "react-toastify";
import DropzoneEditor from "./DropzoneEditor";
const UppyDropzone = ({ field }) => {
  const dispatch = useDispatch();
  const {
    id,
    label,
    fileType = "image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    maxFileSize = 5 * 1024 * 1024,
    files = [], // Ensure files is an array
  } = field;

  const [editing, setEditing] = useState(false);
  const [failedUploads, setFailedUploads] = useState([]);

  const uppy = useMemo(() => {
    const uppyInstance = new Uppy({
      restrictions: {
        maxNumberOfFiles: 10,
        maxFileSize: maxFileSize,
        allowedFileTypes: fileType.split(","),
      },
      autoProceed: true, // Automatically start uploading after file selection
    });

    uppyInstance.use(XHRUpload, {
      endpoint: `${import.meta.env.VITE_API_BASE_URL}/api/forms/upload`,
      fieldName: "files", // Must match backend expectation
      formData: true,
      headers: {
        'Accept': 'application/json',
      },
    });

    uppyInstance.on("file-added", (file) => {
      console.log("File added:", file);
      const isValidType = fileType.split(",").some(type => {
        if (type.endsWith("/*")) {
          const baseType = type.replace("/*", "");
          return file.type.startsWith(baseType);
        }
        return file.type === type;
      });
      if (!isValidType) {
        uppyInstance.removeFile(file.id);
        toast.error(`Unsupported file type: ${file.type}`);
      }
    });

    uppyInstance.on("upload", (data) => {
      console.log("Upload started:", data);
    });

    return uppyInstance;
  }, [fileType, maxFileSize]);

  useEffect(() => {
    const handleComplete = (result) => {
      console.log("Upload Complete:", result.successful);
      console.log("Response data:", result.successful[0]?.response);
      
      const uploadedFiles = result.successful.map((file) => {
        console.log("File response:", file.response);
        
        // Handle the new response format from backend
        if (file.response && file.response.urls) {
          return file.response.urls;
        } else if (file.response && file.response.url) {
          return [file.response.url];
        } else if (file.response && Array.isArray(file.response)) {
          // If response is directly an array of URLs
          return file.response;
        }
        return [];
      }).flat();

      console.log("Extracted URLs:", uploadedFiles);

      if (uploadedFiles.length > 0) {
        dispatch(setDropzoneFiles({ fieldId: id, files: uploadedFiles }));
        
        // Get the message from the response if available
        const message = result.successful[0]?.response?.message || `${uploadedFiles.length} file(s) uploaded successfully`;
        toast.success(message);
      }
    };

    const handleUploadError = (file, error, response) => {
      console.error(`Error uploading ${file.name}:`, error);
      console.error(`Response:`, response);
      setFailedUploads((prev) => [
        ...prev,
        { name: file.name, error: error.message },
      ]);
      toast.error(`Failed to upload ${file.name} to Cloudinary`);
    };

    const handleUploadProgress = (file, progress) => {
      console.log(`Uploading ${file.name} to Cloudinary: ${progress.bytesUploaded}/${progress.bytesTotal}`);
    };

    uppy.on("complete", handleComplete);
    uppy.on("upload-error", handleUploadError);
    uppy.on("upload-progress", handleUploadProgress);

    return () => {
      uppy.off("complete", handleComplete);
      uppy.off("upload-error", handleUploadError);
      uppy.off("upload-progress", handleUploadProgress);
      // uppy.close(); // Properly clean up Uppy instance
    };
  }, [uppy, dispatch, id]);

  const handleSave = () => {
    setEditing(false);
    // If you need to perform additional actions on save, add them here
  };

  return (
    <div className="h-full p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4 border-dotted border-4 border-[#959da0] hover:border-[#dde6e9] transition duration-300">
      <h2 className="text-2xl font-semibold text-center text-[#e5e9eb]">{label}</h2>
      <p className="text-xs text-center text-gray-500">Files will be uploaded to Cloudinary</p>
      {editing ? (
        <DropzoneEditor
          field={field}
          onSave={handleSave}
          onCancel={() => setEditing(false)}
        />
      ) : (
        <>
          <Dashboard uppy={uppy} className="h-full" />
          {failedUploads.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold text-black">Failed Uploads:</h3>
              <ul className="list-disc pl-5">
                {failedUploads.map((file, index) => (
                  <li key={index} className="text-black">
                    {file.name}: {file.error}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Display uploaded files */}
          {Array.isArray(files) && files.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold text-black">Uploaded Files:</h3>
              <ul className="list-disc pl-5">
                {files.map((fileUrl, index) => (
                  <li key={index} className="text-black">
                    <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                      {fileUrl}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
        </>
      )}
    </div>
  );
};

export default UppyDropzone;
