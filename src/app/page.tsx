"use client";

import { useState, useRef} from "react";
import * as htmlToImage from 'html-to-image';
import Header from "./components/Header";
import Footer from "./components/Footer";
import HowToUse from "./components/HowToUse";
import ChartInterface from "./components/ChartInterface";
import Features from "./components/Features";
import FAQ from "./components/FAQ";

export interface ChartDataItem {
  id: string;
  label: string;
  value: number;
  color: string;
}

export type LegendPosition = "top" | "bottom" | "left" | "right" | "none" | "labeled";
export type LegendAlign = "start" | "center" | "end";
export type InternalLabelType = "percentage" | "value" | "label" | "none";

const defaultColors = [
  "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF",
  "#FF9F40", "#C9CBCF", "#FDB45C", "#4D5360", "#1ABC9C"
];

export default function PieChartMakerPage() {
  const [data, setData] = useState<ChartDataItem[]>([
    { id: "item1", label: "Sample A", value: 300, color: defaultColors[0] },
    { id: "item2", label: "Sample B", value: 500, color: defaultColors[1] },
    { id: "item3", label: "Sample C", value: 200, color: defaultColors[2] },
  ]);
  const [chartPreviewData, setChartPreviewData] = useState<ChartDataItem[]>([...data]);
  const [chartType, setChartType] = useState<"2d" | "3d">("2d");
  const [legendPosition, setLegendPosition] = useState<LegendPosition>("labeled");
  const [legendAlign, setLegendAlign] = useState<LegendAlign>("center");
  const [chartTitle, setChartTitle] = useState<string>("My Pie Chart");
  const [internalLabelType, setInternalLabelType] = useState<InternalLabelType>("value");
  const [chartBackgroundColor, setChartBackgroundColor] = useState<string>("#FFFFFF");
  const [holeSizeDisplay, setHoleSizeDisplay] = useState<string>("0");
  const [chartPreviewHoleSize, setChartPreviewHoleSize] = useState<number>(0);

  const chartPreviewRef = useRef<HTMLDivElement>(null);

  const handleAddData = (newItem: Omit<ChartDataItem, "id" | "color">) => {
    setData((prevData) => {
      const nextColorIndex = prevData.length % defaultColors.length;
      return [
        ...prevData,
        {
          ...newItem,
          id: `item${Date.now()}`,
          color: defaultColors[nextColorIndex],
        },
      ];
    });
  };

  const handleRemoveData = (id: string) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const handleUpdateData = (updatedItem: ChartDataItem) => {
    setData((prevData) =>
      prevData.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const handleGenerateChart = () => {
    setChartPreviewData([...data]);
    let numHoleSize = parseFloat(holeSizeDisplay);
    if (holeSizeDisplay.trim() === "" || isNaN(numHoleSize) || holeSizeDisplay.trim() === ".") {
      numHoleSize = 0;
    }
    numHoleSize = Math.max(0, Math.min(1, numHoleSize));
    setChartPreviewHoleSize(numHoleSize);
  };

  const handleDownloadAsPNG = () => {
    if (!chartPreviewRef.current) {
      console.error("Chart preview element not found.");
      return;
    }
    htmlToImage.toPng(chartPreviewRef.current, { backgroundColor: chartBackgroundColor })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `pie-chart-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('Oops, something went wrong with PNG download!', err);
      });
  };

  const handleDownloadAsJPEG = () => {
    if (!chartPreviewRef.current) {
      console.error("Chart preview element not found.");
      return;
    }
    htmlToImage.toJpeg(chartPreviewRef.current, { backgroundColor: chartBackgroundColor, quality: 0.95 })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `pie-chart-${Date.now()}.jpeg`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('Oops, something went wrong with JPEG download!', err);
      });
  };

  const handleDownloadAsSVG = () => {
    if (!chartPreviewRef.current) {
      console.error("Chart preview element not found.");
      return;
    }
    htmlToImage.toSvg(chartPreviewRef.current, { backgroundColor: chartBackgroundColor })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `pie-chart-${Date.now()}.svg`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('Oops, something went wrong with SVG download!', err);
      });
  };

  return (
    <>
      <Header />
      <div className="w-full min-h-screen flex flex-col items-center px-4 md:px-8 pb-4 md:pb-8 pt-[1rem] md:pt-[2rem]">
        <ChartInterface 
          data={data}
          chartPreviewData={chartPreviewData}
          chartType={chartType}
          legendPosition={legendPosition}
          legendAlign={legendAlign}
          chartTitle={chartTitle}
          internalLabelType={internalLabelType}
          chartBackgroundColor={chartBackgroundColor}
          holeSizeDisplay={holeSizeDisplay}
          chartPreviewHoleSize={chartPreviewHoleSize}
          chartPreviewRef={chartPreviewRef}
          handleAddData={handleAddData}
          handleRemoveData={handleRemoveData}
          handleUpdateData={handleUpdateData}
          handleGenerateChart={handleGenerateChart}
          handleDownloadAsPNG={handleDownloadAsPNG}
          handleDownloadAsJPEG={handleDownloadAsJPEG}
          handleDownloadAsSVG={handleDownloadAsSVG}
          setChartTitle={setChartTitle}
          setChartBackgroundColor={setChartBackgroundColor}
          setChartType={setChartType}
          setLegendPosition={setLegendPosition}
          setLegendAlign={setLegendAlign}
          setInternalLabelType={setInternalLabelType}
          setHoleSizeDisplay={setHoleSizeDisplay}
        />
      </div>

      <HowToUse />

      <Features />

      <FAQ />

      <Footer />
    </>
  );
}
