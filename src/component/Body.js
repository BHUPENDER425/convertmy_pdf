"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

const tools = [
  // ORGANIZE PDF
  {
    id: 1,
    title: "Merge PDF",
    description: "Combine PDFs in the order you want with the easiest PDF merger available.",
    icon: "/images/Icon/Merge pdf.png",
    category: "ORGANIZE PDF",
    isNew: false,
  },
  {
    id: 2,
    title: "Split PDF",
    description: "Separate one page or a whole set for easy conversion into independent files.",
    icon: "/images/Icon/Split Pdf.png",
    category: "ORGANIZE PDF",
    isNew: false,
  },
  {
    id: 3,
    title: "Organize PDF",
    description: "Arrange your PDF pages in the order you need them.",
    icon: "/images/Icon/Organize Pdf.png",
    category: "ORGANIZE PDF",
    isNew: false,
  },
  {
    id: 4,
    title: "Scan to PDF",
    description: "Turn scanned documents into searchable PDF files.",
    icon: "/images/Icon/Scan Pdf.png",
    category: "ORGANIZE PDF",
    isNew: false,
  },
  
  // OPTIMIZE PDF
  {
    id: 5,
    title: "Compress PDF",
    description: "Reduce file size while optimizing for maximal PDF quality.",
    icon: "/images/Icon/Compress Pdf.png",
    category: "OPTIMIZE PDF",
    isNew: false,
  },
  {
    id: 6,
    title: "Repair PDF",
    description: "Fix corrupted PDF files and make them readable again.",
    icon: "/images/Icon/Repair Pdf.png",
    category: "OPTIMIZE PDF",
    isNew: false,
  },
  {
    id: 7,
    title: "OCR PDF",
    description: "Make your scanned PDFs searchable and editable.",
    icon: "/images/Icon/OCR Pdf.png",
    category: "OPTIMIZE PDF",
    isNew: false,
  },

  // CONVERT TO PDF
  {
    id: 8,
    title: "JPG to PDF",
    description: "Convert JPG images to PDF in seconds.",
    icon: "/images/Icon/Jpg to pdf.png",
    category: "CONVERT TO PDF",
    isNew: false,
  },
  {
    id: 9,
    title: "Word to PDF",
    description: "Convert Word documents to PDF format.",
    icon: "/images/Icon/word to pdf.png",
    category: "CONVERT TO PDF",
    isNew: false,
  },
  {
    id: 10,
    title: "PowerPoint to PDF",
    description: "Convert PowerPoint presentations to PDF.",
    icon: "/images/Icon/PPT to pdf.png",
    category: "CONVERT TO PDF",
    isNew: false,
  },
  {
    id: 11,
    title: "Excel to PDF",
    description: "Convert Excel spreadsheets to PDF format.",
    icon: "/images/Icon/Excel to pdf.png",
    category: "CONVERT TO PDF",
    isNew: false,
  },
  {
    id: 12,
    title: "HTML to PDF",
    description: "Convert web pages to PDF documents.",
    icon: "/images/Icon/HTML to pdf.png",
    category: "CONVERT TO PDF",
    isNew: false,
  },

  // CONVERT FROM PDF
  {
    id: 13,
    title: "PDF to JPG",
    description: "Convert PDF pages to JPG images.",
    icon: "/images/Icon/Pdf to jpg.png",
    category: "CONVERT FROM PDF",
    isNew: false,
  },
  {
    id: 14,
    title: "PDF to Word",
    description: "Convert PDF to editable Word documents.",
    icon: "/images/Icon/Pdf to word.png",
    category: "CONVERT FROM PDF",
    featured: true,
  },
  {
    id: 15,
    title: "PDF to PowerPoint",
    description: "Convert PDF to PowerPoint presentations.",
    icon: "/images/Icon/Pdf to PPt.png",
    category: "CONVERT FROM PDF",
    isNew: false,
  },
  {
    id: 16,
    title: "PDF to Excel",
    description: "Convert PDF tables to Excel spreadsheets.",
    icon: "/images/Icon/Pdf to Excel.png",
    category: "CONVERT FROM PDF",
    isNew: false,
  },
  {
    id: 17,
    title: "PDF to PDF/A",
    description: "Convert PDF to PDF/A for long-term archiving.",
    icon: "/images/Icon/pdf to pdf-a.png",
    category: "CONVERT FROM PDF",
    isNew: false,
  },

  // EDIT PDF
  {
    id: 18,
    title: "Rotate PDF",
    description: "Rotate your PDFs the way you need them.",
    icon: "/images/Icon/Rotate pdf.png",
    category: "EDIT PDF",
    isNew: false,
  },
  {
    id: 19,
    title: "Add page numbers",
    description: "Add custom page numbers to your PDF.",
    icon: "/images/Icon/Page numbers.png",
    category: "EDIT PDF",
    isNew: false,
  },
  {
    id: 20,
    title: "Add watermark",
    description: "Add text or image watermarks to your PDF.",
    icon: "/images/Icon/Watermark.png",
    category: "EDIT PDF",
    isNew: false,
  },
  {
    id: 21,
    title: "Edit PDF",
    description: "Edit text and images in your PDF files.",
    icon: "/images/Icon/Edit pdf.png",
    category: "EDIT PDF",
    isNew: true,
  },

  // PDF SECURITY
  {
    id: 22,
    title: "Unlock PDF",
    description: "Remove password and restrictions from PDF.",
    icon: "/images/Icon/Unlock pdf.png",
    category: "PDF SECURITY",
    isNew: false,
  },
  {
    id: 23,
    title: "Protect PDF",
    description: "Add password protection to your PDF.",
    icon: "/images/Icon/Protect pdf.png",
    category: "PDF SECURITY",
    isNew: false,
  },
  {
    id: 24,
    title: "Sign PDF",
    description: "Add digital signatures to your PDF.",
    icon: "/images/Icon/Sign pdf.png",
    category: "PDF SECURITY",
    isNew: false,
  },
  {
    id: 25,
    title: "Compare PDF",
    description: "Compare two PDF files and spot the differences.",
    icon: "/images/Icon/Compare Pdf.png",
    category: "PDF SECURITY",
    isNew: false,
  },
]

const categories = ["All", "ORGANIZE PDF", "OPTIMIZE PDF", "CONVERT TO PDF", "CONVERT FROM PDF", "EDIT PDF", "PDF SECURITY"]

export default function Body() {
  const [activeCategory, setActiveCategory] = useState("All")
  const navigate = useNavigate()

  const handleToolClick = (tool) => {
    const slug = tool.title.toLowerCase().replace(/ /g, '-')
    navigate(`/${slug}`)
  }

  const filteredTools = activeCategory === "All" ? tools : tools.filter((tool) => tool.category === activeCategory)

  return (
    <section className="w-full bg-gradient-to-t from-slate-50 to-red-100 py-16 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-balance">
            Every tool you need to work with PDFs in one place
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto text-balance">
            Every tool you need to use PDFs, at your fingertips. All are 100% FREE and easy to use! Merge, split,
            compress, convert, rotate, unlock and watermark PDFs with just a few clicks.
          </p>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in-delay">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gray-900 text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400 hover:shadow-md hover:scale-105"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-6">
          {filteredTools.map((tool, index) => (
            <div
              key={tool.id}
              onClick={() => handleToolClick(tool)}
              className={`group relative p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer animate-fade-in-stagger ${
                tool.featured ? "border-red-500 bg-white shadow-lg" : "border-gray-200 bg-white hover:border-red-300"
              }`}
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              {/* New Badge */}
              {tool.isNew && (
                <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                  New!
                </div>
              )}

              {/* Icon */}
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 group-hover:bg-red-100 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <img src={tool.icon} alt={tool.title} className="w-10 h-10 object-contain" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">{tool.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed text-center">{tool.description}</p>

              {/* Hover Effect Line */}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
