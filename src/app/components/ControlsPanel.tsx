// app/components/ControlsPanel.tsx
"use client";

import { ChangeEvent } from "react";
import { ChartDataItem } from "../page";
import { Palette } from "lucide-react"; // Removed 'Type' icon

interface ControlsPanelProps {
  data: ChartDataItem[];
  onUpdateDataColor: (id: string, color: string) => void;
}

export default function ControlsPanel({
  data,
  onUpdateDataColor,
}: ControlsPanelProps) {
  const handleColorChange = (id: string, event: ChangeEvent<HTMLInputElement>) => {
    onUpdateDataColor(id, event.target.value);
  };

  return (
    <>
      {data.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-slate-700 mb-3 flex items-center">
            <Palette size={20} className="mr-2 text-indigo-600" /> Slice Colors
          </h3>
          <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
            {data.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <label htmlFor={`color-${item.id}`} className="text-sm text-slate-600 truncate pr-2">
                  {item.label}
                </label>
                <div className="flex items-center">
                  <input
                    type="color"
                    id={`color-${item.id}`}
                    value={item.color}
                    onChange={(e) => handleColorChange(item.id, e)}
                    className="w-8 h-8 p-0 border-none rounded-md cursor-pointer shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
                    title={`Pick color for ${item.label}`}
                  />
                   <span className="ml-2 text-xs text-slate-500 w-16 text-right">{item.color.toUpperCase()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}