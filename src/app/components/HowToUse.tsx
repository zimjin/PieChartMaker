export default function HowToUse() {
  return (
    <div id="how-to-use-section" className="w-full max-w-6xl mx-auto my-8 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-semibold text-slate-800 mb-6 text-center">
        How to Use Pie Chart Maker?
      </h2>
      <ol className="list-decimal list-inside space-y-4 text-slate-700">
        <li className="text-lg">
          <strong className="font-medium text-slate-800">Input Data for Your Pie Chart:</strong>
          <ul className="list-disc list-inside ml-6 mt-2 text-base text-slate-600 space-y-1">
            <li>Add new data items (label and value) to make a pie chart.</li>
            <li>Modify existing entries for your pie chart if needed.</li>
            <li>Remove data items you no longer need.</li>
          </ul>
        </li>
        <li className="text-lg">
          <strong className="font-medium text-slate-800">Customize Your Pie Chart Design:</strong>
          <p className="ml-6 mt-2 text-base text-slate-600">
            Use the settings in pie chart creator to adjust:
          </p>
          <ul className="list-disc list-inside ml-10 mt-1 text-base text-slate-600 space-y-1">
            <li><strong>Chart Title</strong> for pie graph.</li>
            <li><strong>Background Color</strong> for the chart image.</li>
            <li><strong>Chart Type</strong> (e.g., 2D pie chart).</li>
            <li><strong>Legend Position</strong> and <strong>Legend Align</strong>.</li>
            <li><strong>Internal Label</strong> type (percentage, value, etc.).</li>
            <li><strong>Hole Size</strong> to create a donut chart (a variation of a pie chart).</li>
          </ul>
        </li>
        <li className="text-lg">
          <strong className="font-medium text-slate-800">Generate & Preview Your Pie Chart:</strong>
          <p className="ml-6 mt-2 text-base text-slate-600">
            Click the &quot;Generate Chart&quot; button. This pie chart generator will update the preview based on your data and customizations.
          </p>
        </li>
        <li className="text-lg">
          <strong className="font-medium text-slate-800">Download Your Pie Chart Creation:</strong>
          <p className="ml-6 mt-2 text-base text-slate-600">
            Once satisfied with the pie chart preview, use the download buttons (PNG, JPEG, SVG) to save your work from our pie graph maker.
          </p>
        </li>
      </ol>
    </div>
  );
} 