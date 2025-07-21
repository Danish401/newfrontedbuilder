import React from "react";

const PurchaseOrderTemplate = ({ fields, values, validationErrors, onChange, onSubmit, isSubmitting, readOnly, name, info }) => {
  const getField = (label) => fields.find(f => f.label === label);
  const getValue = (label) => {
    const field = getField(label);
    return field ? (values[field.id] || "") : "";
  };
  // For demo, assume fields with label 'Item', 'Qty', 'Price' for table
  const items = fields.filter(f => f.label && f.label.startsWith("Item "));
  const qtys = fields.filter(f => f.label && f.label.startsWith("Qty "));
  const prices = fields.filter(f => f.label && f.label.startsWith("Price "));
  const itemRows = items.map((item, idx) => ({
    item: values[item.id] || "",
    qty: qtys[idx] ? values[qtys[idx].id] || "" : "",
    price: prices[idx] ? values[prices[idx].id] || "" : ""
  }));
  const total = itemRows.reduce((sum, row) => sum + (parseFloat(row.qty) * parseFloat(row.price) || 0), 0);

  return (
    <form
      className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 border border-[#E5E7EB]"
      onSubmit={e => { e.preventDefault(); onSubmit && onSubmit(); }}
    >
      <div className="flex justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-[#4B49AC] mb-2">{name || "PURCHASE ORDER"}</h2>
          <div className="text-sm text-gray-700 mb-1">{info || "PO #: ..."}</div>
          <div className="text-sm text-gray-700 mb-1">Date: {getValue("Date")}</div>
        </div>
      </div>
      <div className="mb-6 flex justify-between">
        <div>
          <div className="font-semibold text-[#4B49AC] mb-1">Supplier:</div>
          <div className="text-sm text-gray-700 mb-1">{getValue("Supplier")}</div>
        </div>
        <div>
          <div className="font-semibold text-[#4B49AC] mb-1">Buyer:</div>
          <div className="text-sm text-gray-700 mb-1">{getValue("Buyer")}</div>
        </div>
      </div>
      <div className="mb-6">
        <table className="w-full border border-[#E5E7EB] rounded">
          <thead>
            <tr className="bg-[#F3F4F6] text-[#4B49AC]">
              <th className="p-2 border">Item</th>
              <th className="p-2 border">Qty</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Total</th>
            </tr>
          </thead>
          <tbody>
            {itemRows.map((row, idx) => (
              <tr key={idx}>
                <td className="p-2 border">
                  {readOnly ? row.item : (
                    <input type="text" className="w-full" value={row.item} onChange={e => onChange && onChange(items[idx].id, e.target.value)} disabled={readOnly} />
                  )}
                </td>
                <td className="p-2 border">
                  {readOnly ? row.qty : (
                    <input type="number" className="w-full" value={row.qty} onChange={e => onChange && onChange(qtys[idx].id, e.target.value)} disabled={readOnly} />
                  )}
                </td>
                <td className="p-2 border">
                  {readOnly ? row.price : (
                    <input type="number" className="w-full" value={row.price} onChange={e => onChange && onChange(prices[idx].id, e.target.value)} disabled={readOnly} />
                  )}
                </td>
                <td className="p-2 border">{(parseFloat(row.qty) * parseFloat(row.price) || 0).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mb-6">
        <div className="text-lg font-bold text-[#4B49AC]">Total: ₹{total.toFixed(2)}</div>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#4B49AC] mb-1">Notes</label>
        {readOnly ? (
          <div className="text-gray-700 text-sm">{getValue("Notes")}</div>
        ) : (
          <textarea className="w-full border border-[#E5E7EB] rounded p-2" value={getValue("Notes")} onChange={e => onChange && onChange(getField("Notes").id, e.target.value)} />
        )}
      </div>
      {!readOnly && (
        <button
          type="submit"
          className="w-full bg-[#4B49AC] text-white py-3 rounded-lg font-semibold hover:bg-[#7DA0FA] transition-colors duration-300"
        >
          Submit PO
        </button>
      )}
    </form>
  );
};

export default PurchaseOrderTemplate; 