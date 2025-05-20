// app/components/ChartPreview.tsx
"use client";

import { useState } from "react";
import { ChartDataItem, InternalLabelType } from "../page";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, Sector } from "recharts";
import type { ValueType, NameType, Payload } from 'recharts/types/component/DefaultTooltipContent';

// Define specific types for legend properties for better type safety
type LegendPosition = "top" | "bottom" | "left" | "right" | "none" | "labeled";
type LegendAlign = "start" | "center" | "end"; // For internal type safety, though prop comes from page.tsx

interface ChartPreviewProps {
  data: ChartDataItem[];
  // type: "2d" | "3d"; // Removed as it was unused
  legendPosition: LegendPosition;
  legendAlign: LegendAlign; // ADDED legendAlign prop
  title?: string;
  internalLabelType: InternalLabelType;
  backgroundColor?: string; // Add backgroundColor prop
  holeSize?: number; // ADDED: Prop for donut hole size (0 to 1)
}

// Interface for the props Recharts passes to the activeShape function
interface ActiveShapeRenderProps {
  cx?: number;
  cy?: number;
  innerRadius?: number;
  outerRadius?: number;
  startAngle?: number;
  endAngle?: number;
  fill?: string;
  payload?: ChartDataItem; // The data item for the shape
  percent?: number;
  value?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // Allow other props from Recharts
}

// Custom component for the active (hovered) slice - VISUALS ONLY
const EnlargedSlice = (props: ActiveShapeRenderProps) => {
  const { cx = 0, cy = 0, innerRadius = 0, outerRadius = 0, startAngle = 0, endAngle = 0, fill = '#000' } = props;

  const enlargedSliceOuterRadius = outerRadius * 1.05;
  const gapWidth = 2;
  const ringThickness = 3;
  const ringDisplayInnerRadius = enlargedSliceOuterRadius + gapWidth;
  const ringDisplayOuterRadius = enlargedSliceOuterRadius + gapWidth + ringThickness;

  return (
    <g>
      {/* Main enlarged slice */}
      <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={enlargedSliceOuterRadius} startAngle={startAngle} endAngle={endAngle} fill={fill} />
      {/* Decorative ring */}
      <Sector cx={cx} cy={cy} innerRadius={ringDisplayInnerRadius} outerRadius={ringDisplayOuterRadius} startAngle={startAngle} endAngle={endAngle} fill={fill} />
      {/* NO TEXT RENDERING HERE - handled by renderComprehensiveLabels */}
    </g>
  );
};

// Interface for the props Recharts passes to the label render function
interface LabelRenderProps {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  percent?: number;
  name?: string; // from nameKey
  value?: number; // from dataKey
  index?: number;
  fill?: string;
  payload?: ChartDataItem; // The data item for the label
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // Allow other props from Recharts
}

// Custom label renderer for ALL slices
const renderComprehensiveLabels = (props: LabelRenderProps, internalLabelType: InternalLabelType, legendPosition: LegendPosition) => {
  const { cx = 0, cy = 0, midAngle = 0, innerRadius = 0, outerRadius = 0, percent = 0, name = '', value = 0, fill = '#000' } = props;

  const RADIAN = Math.PI / 180;

  // Adjust internal label radius based on innerRadius to ensure it's within the colored part of the slice
  // If innerRadius is 0 (pie), it's 0.5 * outerRadius.
  // If innerRadius is > 0 (donut), it's innerRadius + (outerRadius - innerRadius) * 0.5
  const effectiveInnerRadius = typeof innerRadius === 'number' ? innerRadius : 0; // Default to 0 if not a number
  const internalLabelRadius = effectiveInnerRadius + (outerRadius - effectiveInnerRadius) * 0.5;

  const internalX = cx + internalLabelRadius * Math.cos(-midAngle * RADIAN);
  const internalY = cy + internalLabelRadius * Math.sin(-midAngle * RADIAN);
  
  let internalText = "";
  if (internalLabelType === "percentage") {
    internalText = `${(percent * 100).toFixed(1)}%`;
  } else if (internalLabelType === "value") {
    internalText = `${value}`;
  } else if (internalLabelType === "label") {
    internalText = name;
  }
  // If internalLabelType is "none", internalText remains "" and the <text> element won't render.

  // --- 2. External Label (Name and Percentage with Line) ---
  // ONLY RENDER IF legendPosition is "labeled"
  let externalLabelElements = null;
  if (legendPosition === "labeled") {
    const lineStartRadius = outerRadius + 5;
    const lineElbowRadius = outerRadius + 20;
    const lineTextOffset = 5;

    const sx = cx + lineStartRadius * Math.cos(-midAngle * RADIAN);
    const sy = cy + lineStartRadius * Math.sin(-midAngle * RADIAN);
    const mx = cx + lineElbowRadius * Math.cos(-midAngle * RADIAN);
    const my = cy + lineElbowRadius * Math.sin(-midAngle * RADIAN);
    const ex = mx + (Math.cos(-midAngle * RADIAN) >= 0 ? 1 : -1) * (22 + lineTextOffset);
    const ey = my;

    const externalTextAnchor = Math.cos(-midAngle * RADIAN) >= 0 ? 'start' : 'end';
    const externalName = name;
    const externalPercentText = `${(percent * 100).toFixed(1)}%`;

    externalLabelElements = (
      <>
        {/* External Label Line - Color matches slice */}
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={sx} cy={sy} r={2} fill={fill} stroke="none" />

        {/* External Name Label - Color matches slice */}
        <text
          x={ex + (externalTextAnchor === 'start' ? lineTextOffset : -lineTextOffset)}
          y={ey - 7}
          textAnchor={externalTextAnchor}
          fill={fill}
          dominantBaseline="central"
          fontSize="14px"
          fontWeight="bold"
        >
          {externalName}
        </text>

        {/* External Percentage Label - Color matches slice */}
        <text
          x={ex + (externalTextAnchor === 'start' ? lineTextOffset : -lineTextOffset)}
          y={ey + 7}
          textAnchor={externalTextAnchor}
          fill={fill}
          dominantBaseline="central"
          fontSize="14px"
        >
          {externalPercentText}
        </text>
      </>
    );
  }

  return (
    <g>
      {/* Internal Label - Render based on internalLabelType */}
      {internalLabelType !== "none" && internalText && (
        <text
          x={internalX}
          y={internalY}
          fill="#FFFFFF" // Assuming white text for internal labels
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="14px"
          fontWeight="bold"
          pointerEvents="none"
        >
          {internalText}
        </text>
      )}

      {/* Conditionally render external label elements */}
      {externalLabelElements}
    </g>
  );
};

export default function ChartPreview({ data, legendPosition, legendAlign, title, internalLabelType, backgroundColor, holeSize = 0 }: ChartPreviewProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onPieEnter = (_payload: ChartDataItem, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };
  const shouldRenderTitle = title && title.trim() !== "";
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-slate-500">
        <p>No data to display. Add some data to see the chart.</p>
      </div>
    );
  }

  // For now, chartType '3d' will render the same as '2d'.
  // True 3D rendering would require a different approach or library.

  // Determine Recharts align value based on our legendAlign prop
  let rechartsHorizontalAlign: "left" | "center" | "right" = "center"; // For top/bottom legend
  if (legendAlign === "start") {
    rechartsHorizontalAlign = "left";
  } else if (legendAlign === "end") {
    rechartsHorizontalAlign = "right";
  }

  // Determine Recharts verticalAlign value based on our legendAlign prop (for left/right legend)
  let rechartsVerticalAlign: "top" | "middle" | "bottom" = "middle"; // For left/right legend
  if (legendAlign === "start") {
    rechartsVerticalAlign = "top";
  } else if (legendAlign === "end") {
    rechartsVerticalAlign = "bottom";
  }

  // Determine Legend props based on legendPosition
  let legendProps: {
    layout?: "horizontal" | "vertical";
    verticalAlign?: "top" | "middle" | "bottom";
    align?: "left" | "center" | "right";
    wrapperStyle?: React.CSSProperties;
  } = { wrapperStyle: { paddingTop: "20px", fontSize: "14px" } }; // Default wrapper style, ADDED fontSize

  switch (legendPosition) {
    case "top":
      legendProps = { layout: "horizontal", verticalAlign: "top", align: rechartsHorizontalAlign, wrapperStyle: { paddingBottom: "20px", fontSize: "14px", fontWeight: "bold" } }; 
      break;
    case "bottom":
      legendProps = { layout: "horizontal", verticalAlign: "bottom", align: rechartsHorizontalAlign, wrapperStyle: { paddingTop: "20px", fontSize: "14px", fontWeight: "bold" } }; 
      break;
    case "left":
      // When legend is on the left, legendAlign controls vertical position.
      // The Recharts 'align' prop for vertical layout means which side of the chart.
      legendProps = { layout: "vertical", verticalAlign: rechartsVerticalAlign, align: "left", wrapperStyle: { paddingRight: "20px", fontSize: "14px", fontWeight: "bold" } }; 
      break;
    case "right":
      // When legend is on the right, legendAlign controls vertical position.
      // The Recharts 'align' prop for vertical layout means which side of the chart.
      legendProps = { layout: "vertical", verticalAlign: rechartsVerticalAlign, align: "right", wrapperStyle: { paddingLeft: "20px", fontSize: "14px", fontWeight: "bold" } }; // CORRECTED: align: "right"
      break;
    case "none":
    case "labeled": // Also no legend for "labeled"
      // No props needed, legend won't be rendered
      // legendProps will retain the default with fontSize if none is selected, but it won't be used.
      // To be perfectly clean, you could set wrapperStyle to {} here or ensure the default isn't applied if legendPosition is 'none'.
      // However, since the <Legend> component isn't rendered when position is 'none', this has no visual effect.
      break;
  }

  // Define outerRadius as a percentage string, as it's used by Recharts
  const outerRadiusPercentageString = "80%";

  // Calculate innerRadius based on holeSize and outerRadiusPercentageString
  // Recharts Pie's innerRadius can be a percentage string or a number (pixels)
  // We'll keep it as a percentage string relative to the container's smaller dimension.
  let innerRadiusPercentageString = "0%";
  if (holeSize > 0 && holeSize <= 1) {
    // Assuming outerRadiusPercentageString is like "XX%"
    const outerRadiusValue = parseFloat(outerRadiusPercentageString.replace('%', ''));
    if (!isNaN(outerRadiusValue)) {
      innerRadiusPercentageString = `${outerRadiusValue * holeSize}%`;
    }
  }

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: backgroundColor || 'transparent'
    }}>
      {shouldRenderTitle && ( // Use the variable for clarity
        <h3
          className="text-xl mt-10 font-semibold text-slate-700 mb-2 text-center"
          style={{ flexShrink: 0 }}
        >
          {title}
        </h3>
      )}
      <div style={{
        flexGrow: 1, // This div will take up the remaining vertical space
        width: '100%',
        position: 'relative' // ResponsiveContainer often needs a positioned parent
      }}>
        <ResponsiveContainer width="100%" height="100%">
          {/* Increased margins for external labels */}
          <PieChart margin={{ top: 40, right: 60, bottom: 40, left: 60 }}> 
            <Pie
              activeIndex={activeIndex !== null ? activeIndex : undefined}
              activeShape={EnlargedSlice} // Handles visual effect only
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false} // VERY IMPORTANT: We draw custom lines
              // Pass internalLabelType to the label renderer
              label={(labelProps: LabelRenderProps) => renderComprehensiveLabels({...labelProps, activeIndex: activeIndex}, internalLabelType, legendPosition)}
              outerRadius={outerRadiusPercentageString} // Use the defined outer radius
              innerRadius={innerRadiusPercentageString} // UPDATED: Use calculated inner radius for donut
              fill="#8884d8" // Default fill, overridden by <Cell>
              dataKey="value"
              nameKey="label" // From ChartDataItem
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
            >
              {data.map((entry) => ( // Pass fill to label renderer
                <Cell key={`cell-${entry.id}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: ValueType, name: NameType, entry: Payload<ValueType, NameType>) => {
                 // eslint-disable-next-line @typescript-eslint/no-explicit-any
                 const percentValue = (entry as any).percent as number | undefined;

                 if (typeof percentValue === 'number') {
                   const percentDisplay = (percentValue * 100).toFixed(1);
                   return [`${name}: ${value} (${percentDisplay}%)`, null];
                 } 
                 // If percentValue is not a number (or undefined), fall through to here.
                 return [`${name}: ${value}`, null];
              }}
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                borderColor: "#cccccc"
              }}
            />
            {/* MODIFIED Condition for rendering Legend */}
            {legendPosition !== "none" && legendPosition !== "labeled" && (
              <Legend {...legendProps} />
            )}
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}