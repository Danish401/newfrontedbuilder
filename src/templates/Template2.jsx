import React, { useState, useEffect } from "react";
import DynamicFormRenderer from '../components/DynamicFormRenderer';
import { FaPaperPlane, FaGripVertical } from 'react-icons/fa';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Template2 = ({ fields, values, validationErrors, onChange, onSubmit, isSubmitting, readOnly, name, info }) => {
  // Local state for drag-and-drop order
  const [orderedFields, setOrderedFields] = useState(fields);

  // Keep orderedFields in sync with fields prop
  useEffect(() => {
    setOrderedFields(fields);
  }, [fields]);

  // Drag-and-drop handler
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const newFields = Array.from(orderedFields);
    const [removed] = newFields.splice(result.source.index, 1);
    newFields.splice(result.destination.index, 0, removed);
    setOrderedFields(newFields);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0e7ff] via-[#f3f4f6] to-[#f9fafb] py-10">
      <div className="max-w-2xl w-full p-6 rounded-3xl shadow-2xl bg-white/80 border border-[#E5E7EB] backdrop-blur-md">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-extrabold text-[#4B49AC] mb-2 tracking-tight drop-shadow">{name || "Card Style Form"}</h2>
          <p className="text-lg text-gray-600">{info || "All fields are on a single page. Drag and drop to reorder as you wish."}</p>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="all-fields">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`space-y-6 ${snapshot.isDraggingOver ? 'bg-[#f3faf8]' : ''}`}
              >
                {orderedFields.map((field, idx) => (
                  <Draggable draggableId={String(field.id)} index={idx} key={field.id} isDragDisabled={readOnly}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`flex items-center gap-3 bg-white rounded-lg p-2 ${snapshot.isDragging ? 'shadow-2xl' : ''}`}
                      >
                        <div {...provided.dragHandleProps} />
                        <div className="flex-1">
                          <DynamicFormRenderer
                            fields={[field]}
                            formData={values}
                            validationErrors={validationErrors}
                            onFieldChange={onChange}
                            onSubmit={onSubmit}
                            isSubmitting={isSubmitting}
                            showSubmit={false}
                            readOnly={readOnly}
                            forceSinglePage={true}
                          />
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {!readOnly && (
          <div className="flex justify-center pt-8">
            <button
              type="button"
              onClick={onSubmit}
              disabled={isSubmitting}
              className={`flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-lg shadow-lg transition-all duration-300 bg-gradient-to-r from-[#4B49AC] to-[#7DA0FA] text-white hover:from-[#7DA0FA] hover:to-[#4B49AC] focus:outline-none focus:ring-4 focus:ring-[#4B49AC]/30 ${
                isSubmitting ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            >
              <FaPaperPlane className="text-xl" />
              {isSubmitting ? (
                <span className="flex items-center">
                  <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
                  Submitting...
                </span>
              ) : (
                'Submit Form'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Template2; 