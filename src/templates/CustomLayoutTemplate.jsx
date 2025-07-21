import React, { useState, useEffect } from "react";
import DynamicFormRenderer from "../components/DynamicFormRenderer";
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

const genoa = {
  50: '#f3faf8',
  100: '#d7f0ea',
  200: '#b0dfd6',
  300: '#80c8bd',
  400: '#56aba0',
  500: '#3c9087',
  600: '#2e736d',
  700: '#285d59',
  800: '#244b49',
  900: '#21403e',
  950: '#0f2424',
};

const defaultCols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };

const CustomLayoutTemplate = ({ fields, values, onChange, onSubmit, readOnly, name, info }) => {
  // Initial layout: stack fields vertically
  const initialLayout = fields.map((field, idx) => ({
    i: String(field.id),
    x: 0,
    y: idx * 2,
    w: 6,
    h: 2,
    minW: 2,
    minH: 1,
  }));
  const [layout, setLayout] = useState(initialLayout);

  // Keep layout in sync with fields
  useEffect(() => {
    setLayout(fields.map((field, idx) => ({
      i: String(field.id),
      x: 0,
      y: idx * 2,
      w: 6,
      h: 2,
      minW: 2,
      minH: 1,
    })));
  }, [fields]);

  // Handle layout change
  const onLayoutChange = (newLayout) => {
    setLayout(newLayout);
    // Optionally notify parent of new order/positions
    if (onChange) {
      // Reorder fields based on new layout order
      const orderedFields = [...fields].sort((a, b) => {
        const aIdx = newLayout.findIndex(l => l.i === String(a.id));
        const bIdx = newLayout.findIndex(l => l.i === String(b.id));
        return aIdx - bIdx;
      });
      onChange(orderedFields);
    }
  };

  return (
    <form
      className="max-w-5xl mx-auto bg-gradient-to-br from-gray-100 to-blue-50 rounded-2xl shadow-2xl p-10 border border-[#E5E7EB] flex flex-col gap-8"
      onSubmit={e => { e.preventDefault(); onSubmit && onSubmit(); }}
    >
      <div className="text-center mb-6">
        <h2 className="text-3xl font-extrabold text-blue-700 mb-2">{name || "Custom Layout (User Defined)"}</h2>
        <p className="text-gray-500">{info || "Drag, move, and resize fields to create your own layout!"}</p>
      </div>
      <div className="bg-white rounded-lg shadow-inner p-6">
        <ResponsiveGridLayout
          className="layout"
          layouts={{ lg: layout, md: layout, sm: layout, xs: layout, xxs: layout }}
          cols={defaultCols}
          rowHeight={50}
          isDraggable={!readOnly}
          isResizable={!readOnly}
          onLayoutChange={onLayoutChange}
          measureBeforeMount={false}
          useCSSTransforms={true}
          compactType="vertical"
          preventCollision={false}
        >
          {fields.map((field) => (
            <div key={String(field.id)} className="rounded-xl shadow p-4 bg-[#f3faf8] flex flex-col justify-center h-full">
              <DynamicFormRenderer
                fields={[field]}
                values={values}
                onChange={onChange}
                readOnly={readOnly}
                layout="vertical"
              />
            </div>
          ))}
        </ResponsiveGridLayout>
      </div>
      {!readOnly && (
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#3c9087] to-[#56aba0] hover:from-[#56aba0] hover:to-[#3c9087] text-[#f3faf8] rounded-full font-semibold shadow px-8 py-3 focus:outline-none focus:ring-2 focus:ring-[#3c9087] transition-all duration-200 mt-4"
        >
          Submit
        </button>
      )}
    </form>
  );
};

export default CustomLayoutTemplate; 