export default function FAQ() {
  const faqs = [
    {
      question: "Can I customize slice colors with this pie chart maker?",
      answer: "Yes! When you make a pie chart with our tool, you can use the color picker next to each data item to select a specific color for that slice."
    },
    {
      question: "Is the 3D pie chart generator feature ready?",
      answer: "The 3D pie chart feature for this online pie chart creator is currently under development and will be available soon. The option is visible in settings but disabled for now."
    },
    {
      question: "How do I make a donut chart with this pie chart creator?",
      answer: "To create a donut chart (a type of pie graph), simply adjust the 'Hole Size' setting in our pie chart maker. A value of 0 creates a standard pie chart, while values between 0 (exclusive) and 1 create a donut chart."
    },
    {
      question: "Is my data secure when I make a pie chart online?",
      answer: "Absolutely. All data processing and chart generation with our pie chart maker happen directly in your browser. Your data is not sent to or stored on any server."
    },
    {
      question: "What formats can I download from this pie graph maker?",
      answer: "You can download your pie chart as a PNG, JPEG, or SVG file. SVG files from our pie chart creator are vector-based and scalable without quality loss."
    }
  ];

  return (
    <div id="faq-section" className="w-full max-w-6xl mx-auto my-8 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-semibold text-slate-800 mb-8 text-center">
        Pie Chart Maker - Frequently Asked Questions (FAQ)
      </h2>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="p-4 bg-slate-50 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium text-indigo-700 mb-2">
              {faq.question}
            </h3>
            <p className="text-slate-600 leading-relaxed">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
} 