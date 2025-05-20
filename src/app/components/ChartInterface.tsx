import React, { ChangeEvent, RefObject } from 'react';
// Ensure these types are exported from page.tsx or a shared types file
import { ChartDataItem, LegendPosition, LegendAlign, InternalLabelType } from '../page';
import DataInputForm from "./DataInputForm";
import ChartPreview from "./ChartPreview";
import { Download, Type, ListFilter, Play, Settings2, Donut } from "lucide-react";

interface ChartInterfaceProps {
  data: ChartDataItem[];
  chartPreviewData: ChartDataItem[];
  chartType: "2d" | "3d";
  legendPosition: LegendPosition;
  legendAlign: LegendAlign;
  chartTitle: string;
  internalLabelType: InternalLabelType;
  chartBackgroundColor: string;
  holeSizeDisplay: string;
  chartPreviewHoleSize: number;
  chartPreviewRef: RefObject<HTMLDivElement | null>;

  handleAddData: (newItem: Omit<ChartDataItem, "id" | "color">) => void;
  handleRemoveData: (id: string) => void;
  handleUpdateData: (updatedItem: ChartDataItem) => void;
  handleGenerateChart: () => void;
  handleDownloadAsPNG: () => void;
  handleDownloadAsJPEG: () => void;
  handleDownloadAsSVG: () => void;

  setChartTitle: (value: string) => void;
  setChartBackgroundColor: (value: string) => void;
  setChartType: (value: "2d" | "3d") => void;
  setLegendPosition: (value: LegendPosition) => void;
  setLegendAlign: (value: LegendAlign) => void;
  setInternalLabelType: (value: InternalLabelType) => void;
  setHoleSizeDisplay: (value: string) => void;
}

const ChartInterface: React.FC<ChartInterfaceProps> = ({
  data,
  chartPreviewData,
  chartType,
  legendPosition,
  legendAlign,
  chartTitle,
  internalLabelType,
  chartBackgroundColor,
  holeSizeDisplay,
  chartPreviewHoleSize,
  chartPreviewRef,
  handleAddData,
  handleRemoveData,
  handleUpdateData,
  handleGenerateChart,
  handleDownloadAsPNG,
  handleDownloadAsJPEG,
  handleDownloadAsSVG,
  setChartTitle,
  setChartBackgroundColor,
  setChartType,
  setLegendPosition,
  setLegendAlign,
  setInternalLabelType,
  setHoleSizeDisplay,
}) => {
  return (
    <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Panel: Data Input & Controls */}
      <div className="lg:col-span-1">
        <div className="bg-white py-6 px-4 rounded-xl shadow-lg flex flex-col h-full">
          <div className="flex-shrink-0">
            <h2 className="text-2xl font-semibold text-slate-700 mb-4">Data & Settings</h2>
          </div>
          
          <div className="flex-grow overflow-y-auto space-y-6 mb-4">
            
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-6 md:space-y-0">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-slate-700 mb-3 flex items-center">
                  <Type size={20} className="mr-2 text-indigo-600" /> Chart Title
                </h3>
                <input
                  type="text"
                  value={chartTitle}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setChartTitle(e.target.value)}
                  placeholder="Enter chart title"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-medium text-slate-700 mb-3 flex items-center">
                  Background Color
                </h3>
                <input
                  type="color"
                  value={chartBackgroundColor}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setChartBackgroundColor(e.target.value)}
                  className="w-full h-10 px-1 py-1 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4 space-y-6 md:space-y-0">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-slate-700 mb-3 flex items-center">
                  <Type size={20} className="mr-2 text-indigo-600" /> Chart Type
                </h3>
                <select
                  value={chartType}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setChartType(e.target.value as "2d" | "3d")
                  }
                  className={`w-full pl-3 pr-8 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none bg-no-repeat bg-[url('/chevron-down.svg')] bg-[position:right_0.75rem_center] bg-[length:1em_1em]`}
                >
                  <option value="2d">2D Pie Chart</option>
                  <option value="3d" disabled>3D Pie Chart (Coming Soon)</option>
                </select>
                {chartType === '3d' && (
                    <p className="text-xs text-amber-600 mt-1">
                      Note: 3D chart rendering is not yet implemented.
                    </p>
                  )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4 space-y-6 md:space-y-0">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-slate-700 mb-3 flex items-center">
                  <ListFilter size={20} className="mr-2 text-indigo-600" /> Legend
                </h3>
                <select
                  value={legendPosition}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setLegendPosition(e.target.value as LegendPosition)
                  }
                  className={`w-full pl-3 pr-8 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none bg-no-repeat bg-[url('/chevron-down.svg')] bg-[position:right_0.75rem_center] bg-[length:1em_1em]`}
                >
                  <option value="labeled">Labeled</option>
                  <option value="top">Top</option>
                  <option value="bottom">Bottom</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                  <option value="none">None</option>
                </select>
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-medium text-slate-700 mb-3 flex items-center">
                  <ListFilter size={20} className="mr-2 text-indigo-600" /> Legend Align 
                </h3>
                <select
                  value={legendAlign}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setLegendAlign(e.target.value as LegendAlign)
                  }
                  disabled={legendPosition === "labeled" || legendPosition === "none"}
                  className={`w-full pl-3 pr-8 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none bg-no-repeat bg-[url('/chevron-down.svg')] bg-[position:right_0.75rem_center] bg-[length:1em_1em] ${legendPosition === "labeled" || legendPosition === "none" ? "bg-slate-100 cursor-not-allowed" : ""}`}
                >
                  <option value="start">Start</option>
                  <option value="center">Center</option>
                  <option value="end">End</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4 space-y-6 md:space-y-0">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-slate-700 mb-3 flex items-center">
                  <Settings2 size={20} className="mr-2 text-indigo-600" /> Internal Label
                </h3>
                <select
                  value={internalLabelType}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setInternalLabelType(e.target.value as InternalLabelType)
                  }
                  className={`w-full pl-3 pr-8 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none bg-no-repeat bg-[url('/chevron-down.svg')] bg-[position:right_0.75rem_center] bg-[length:1em_1em]`}
                >
                  <option value="percentage">Percentage</option>
                  <option value="label">Label</option>
                  <option value="value">Value</option>
                  <option value="none">None</option>
                </select>
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-medium text-slate-700 mb-3 flex items-center">
                  <Donut size={20} className="mr-2 text-indigo-600" /> Hole Size (0-1)
                </h3>
                <input
                  type="number"
                  value={holeSizeDisplay}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const { value } = e.target;
                    // Allow empty string, numbers, and a single decimal point
                    if (value === "" || (/^\d*\.?\d*$/.test(value) && (value.match(/\./g) || []).length <= 1)) {
                      setHoleSizeDisplay(value);
                    }
                  }}
                  onBlur={() => {
                    let num = parseFloat(holeSizeDisplay);
                    if (holeSizeDisplay.trim() === "" || isNaN(num) || holeSizeDisplay.trim() === ".") {
                      num = 0; // Default to 0 if empty, NaN, or just "."
                    }
                    num = Math.max(0, Math.min(1, num)); // Clamp between 0 and 1
                    setHoleSizeDisplay(num.toString()); // Update display string to a clean, clamped value
                  }}
                  min="0"
                  max="1"
                  step="0.05"
                  placeholder="e.g., 0.4"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <DataInputForm
              data={data}
              onAddData={handleAddData}
              onRemoveData={handleRemoveData}
              onUpdateData={handleUpdateData}
            />
          </div>

          <div className="flex-shrink-0 space-y-4 pt-4 border-t border-slate-200">
            <button
              onClick={handleGenerateChart}
              className="w-full flex items-center justify-center px-4 py-2.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-150 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <Play size={20} className="mr-2" /> Generate Chart
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel: Chart Preview & Actions */}
      <div className="lg:col-span-2 bg-white p-4 rounded-xl shadow-lg flex flex-col">
        <div ref={chartPreviewRef} className="flex-grow flex items-center justify-center min-h-[300px] md:min-h-[400px] bg-slate-50 rounded-lg">
          <ChartPreview 
            data={chartPreviewData} 
            legendPosition={legendPosition} 
            legendAlign={legendAlign}
            title={chartTitle} 
            internalLabelType={internalLabelType} 
            backgroundColor={chartBackgroundColor} 
            holeSize={chartPreviewHoleSize} 
          />
        </div>
        {/* Download Buttons - Placed below the chart preview */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-around gap-3">
          <button
            onClick={handleDownloadAsPNG}
            className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-150 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <Download size={20} className="mr-2" /> Download PNG
          </button>
          <button
            onClick={handleDownloadAsJPEG}
            className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-150 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Download size={20} className="mr-2" /> Download JPEG
          </button>
          <button
            onClick={handleDownloadAsSVG}
            className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2.5 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-150 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            <Download size={20} className="mr-2" /> Download SVG
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChartInterface;