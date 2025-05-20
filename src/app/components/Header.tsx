import Image from 'next/image';

export default function Header() {
  return (
    <header className="w-full sticky top-0 z-50 bg-slate-100 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-4 md:px-8">
        <div className="flex items-center space-x-3">
          {/* Use Next.js Image component for optimized image loading */}
          <Image src="/logo-256.png" alt="pie chart maker logo" width={32} height={32} className="h-8 w-8" />
          <h1 className="text-xl font-normal text-slate-800">Pie Chart Maker</h1>
        </div>
        <nav className="space-x-6">
          <a href="#features-section" className="text-slate-700 hover:text-indigo-600 transition-colors">
            Features
          </a>
          <a href="#faq-section" className="text-slate-700 hover:text-indigo-600 transition-colors">
            FAQ
          </a>
        </nav>
      </div>
    </header>
  );
} 