// app/components/DataInputForm.tsx
"use client";

import { ChangeEvent, useEffect, useRef } from "react";
import { ChartDataItem } from "../page"; // Import the interface
import { PlusCircle, Trash2 } from "lucide-react";

interface DataInputFormProps {
  data: ChartDataItem[];
  onAddData: (newItem: { label: string; value: number }) => void;
  onRemoveData: (id: string) => void;
  onUpdateData: (updatedItem: ChartDataItem) => void;
}

export default function DataInputForm({
  data,
  onAddData,
  onRemoveData,
  onUpdateData,
}: DataInputFormProps) {
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const prevDataLengthRef = useRef(data.length);

  useEffect(() => {
    // Ensure refs are up-to-date after render
    itemRefs.current = data.reduce((acc, item) => {
      acc[item.id] = itemRefs.current[item.id] || null; // Keep existing ref if it exists
      return acc;
    }, {} as Record<string, HTMLDivElement | null>);

    if (data.length > prevDataLengthRef.current) {
      // An item was added
      const newItem = data[data.length - 1];
      if (newItem && itemRefs.current[newItem.id]) {
        const newItemDiv = itemRefs.current[newItem.id];
        newItemDiv?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
        // Find the label input within the new item's div and focus it
        const labelInput = newItemDiv?.querySelector('input[placeholder="Category Label"]') as HTMLInputElement | null;
        if (labelInput) {
          // Brief delay to ensure the element is focusable after scrolling and rendering
          setTimeout(() => labelInput.focus(), 100); 
        }
      }
    }
    prevDataLengthRef.current = data.length; // Update for the next comparison
  }, [data]); // This effect runs when the `data` array changes

  const handleItemChange = (id: string, field: keyof ChartDataItem, value: string | number) => {
    const itemToUpdate = data.find(item => item.id === id);
    if (itemToUpdate) {
      let processedValue = value;
      if (field === 'value') {
        const numVal = parseFloat(String(value));
        // Allow empty or valid numbers, prevent update if NaN unless it was initially empty
        if (isNaN(numVal) && String(value).trim() !== "") return; 
        processedValue = isNaN(numVal) ? 0 : numVal; // Default to 0 or let validation handle it
      }
      onUpdateData({ ...itemToUpdate, [field]: processedValue });
    }
  };

  const handleDirectAddData = () => {
    // Add a new item with default values.
    // The actual ID and color will be assigned in page.tsx's handleAddData
    onAddData({ label: "New Category", value: 10 }); 
  };

  return (
    <div>
      {/* Header for Chart Data section with Add Item button - Now STICKY */}
      {/* This div will stick to the top of the containing scrollable area in page.tsx */}
      {/* Applied bg-white and z-10 to ensure it appears correctly over scrolling content. */}
      {/* Added padding and a border for visual separation. */}
      <div className="sticky top-0 bg-white z-10 pt-3 pb-3 border-b border-slate-200">
        <div className="flex justify-between items-center"> {/* Container for h3 and button */}
          <h3 className="text-xl font-semibold text-slate-700">Chart Data</h3>
          <button
            onClick={handleDirectAddData}
            className="flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
          >
            <PlusCircle size={20} className="mr-2" />
            Add Item
          </button>
        </div>
      </div>

      {/* Display and edit existing items - This is the scrollable list */}
      {/* Added pt-3 to give some space below the sticky header's border */}
      <div className="space-y-3 h-60 overflow-y-auto pr-2 pt-3"> {/* Changed max-h-96 to h-96 */}
        {data.length === 0 && (
          <p className="text-slate-500 text-sm text-center py-4">No chart data yet. Click &quot;Add Item&quot; to begin.</p>
        )}
        {data.map((item) => (
          <div
            key={item.id}
            ref={(el) => { itemRefs.current[item.id] = el; }}
            className="grid grid-cols-[minmax(0,_1fr)_auto_auto_auto] gap-x-3 items-center bg-slate-50 p-3 rounded-md shadow-sm"
          >
            {/* Label Input */}
            <input
              type="text"
              value={item.label}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleItemChange(item.id, 'label', e.target.value)}
              placeholder="Category Label"
              className="col-span-1 px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {/* Value Input */}
            <input
              type="number"
              value={item.value} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleItemChange(item.id, 'value', e.target.value)}
              placeholder="Value"
              className="w-20 px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {/* Color Picker */}
            <input
              type="color"
              value={item.color}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleItemChange(item.id, 'color', e.target.value)}
              className="w-10 h-10 p-0.5 border border-slate-300 rounded-md cursor-pointer shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
              title={`Pick color for ${item.label}`}
            />
            {/* Delete Button */}
            <button
              onClick={() => onRemoveData(item.id)}
              className="text-slate-500 hover:text-red-600 transition-colors p-2"
              title="Remove item"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
