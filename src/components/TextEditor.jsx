// import React from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';


// const TextEditor = ({ value, onChange }) => {
//     const handleEditorChange = (content, delta, source, editor) => {
//         // Get Delta format (JSON structure) from the editor
//         const deltaFormat = editor.getContents();

//         if (onChange) {
//             onChange(deltaFormat); // Call the onChange prop with Delta format
//         } else {
//             console.error('onChange function is not provided');
//         }
//     };

//     return (
//         <ReactQuill
//             value={value}
//             onChange={handleEditorChange}
//             theme="snow"
//         />
//     );
// };

// export default TextEditor;

// import React from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { updateFieldValue } from '../features/formSlice';
// import { useDispatch } from 'react-redux';

// const TextEditor = ({ value, onChange, id, label = "Text Editor In React JS" }) => {
//     const dispatch = useDispatch();

//     const modules = {
//         toolbar: [
//             [{ size: ["small", false, "large", "huge"] }],
//             ["bold", "italic", "underline", "strike", "blockquote"],
//             [{ list: "ordered" }, { list: "bullet" }],
//             ["link", "image"],
//             [
//                 { list: "ordered" },
//                 { list: "bullet" },
//                 { indent: "-1" },
//                 { indent: "+1" },
//                 { align: [] }
//             ],
//             [{ "color": ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }]
//         ]
//     };

//     const formats = [
//         "header", "height", "bold", "italic",
//         "underline", "strike", "blockquote",
//         "list", "color", "bullet", "indent",
//         "link", "image", "align", "size",
//     ];

//     const handleEditorChange = (content, delta, source, editor) => {
//         // Get Delta format
//         const deltaFormat = editor.getContents();
        
//         // Convert Delta to HTML
//         const htmlContent = editor.getHTML();
      
//         // Dispatch the serialized content to Redux
//         dispatch(updateFieldValue({ id, value: htmlContent }));
//     };

//     return (
//         <div>
//             {/* Dynamically set the label */}
//             <h1 style={{ textAlign: "center" }}>{label}</h1>
//             <div style={{ display: "grid", justifyContent: "center" }}>
//                 <ReactQuill
//                     value={value}
//                     onChange={handleEditorChange}
//                     modules={modules}
//                     formats={formats}
//                     theme="snow"
//                     placeholder="write your content ...."
//                     style={{ height: "220px" }}
//                 />
//             </div>
//         </div>
//     );
// };

// export default TextEditor;


import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { updateFieldValue, updateTextEditorLabel } from '../features/formSlice';
import { useDispatch } from 'react-redux';

const TextEditor = ({ value, onChange, id, label }) => {
    const dispatch = useDispatch();

    const modules = {
        toolbar: [
            [{ size: ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }, { align: [] }],
            [{ color: ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466', 'custom-color'] }],
        ],
    };

    const formats = ['header', 'height', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'color', 'bullet', 'indent', 'link', 'image', 'align', 'size'];

    const handleEditorChange = (content, delta, source, editor) => {
        const htmlContent = editor.getHTML();
        dispatch(updateFieldValue({ id, value: htmlContent }));
    };

    const handleLabelChange = (e) => {
        dispatch(updateTextEditorLabel({ id, newLabel: e.target.value }));
    };

   
    return (
        <div className="bg-[#cbcdff] p-16 rounded-lg shadow-lg max-w-3xl mx-auto  pt-4 mt-4">
            <div className="text-center ">
                {/* Label input for dynamic changes */}
                <input
                    type="text"
                    value={label}
                    onChange={handleLabelChange}
                    className="text-center text-lg border border-gray-300 rounded-md w-full p-2"
                    placeholder="Enter label"
                    style={{ backgroundColor: '#ffff66' }} // Apply the yellow color
                />
            </div>
            <div className="editor-container pt-2 mb-3">
                <ReactQuill
                    value={value}
                    onChange={handleEditorChange}
                    modules={modules}
                    formats={formats}
                    theme="snow"
                    placeholder="Write your content..."
                    className="h-60"
                />
            </div>
        </div>
    );
};

export default TextEditor;
