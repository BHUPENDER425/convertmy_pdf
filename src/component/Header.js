"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
// Provide lightweight fallback icons so tests pass when `lucide-react` isn't installed
let ChevronDown = ({ size, className }) => <span className={className} style={{ display: 'inline-block', width: size, height: size }}>▾</span>
let Menu = ({ size }) => <span style={{ display: 'inline-block', width: size, height: size }}>≡</span>
let X = ({ size }) => <span style={{ display: 'inline-block', width: size, height: size }}>✕</span>

try {
  // prefer the real icons when available
  // eslint-disable-next-line global-require, import/no-extraneous-dependencies
  const icons = require('lucide-react')
  ChevronDown = icons.ChevronDown || ChevronDown
  Menu = icons.Menu || Menu
  X = icons.X || X
} catch (err) {
  // ignore: use fallbacks
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)

  const toggleMenu = () => setIsOpen(!isOpen)
  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name)
  }

  const pdfToolsCategories = [
    {
      title: "ORGANIZE PDF",
      items: ["Merge PDF", "Split PDF", "Remove pages", "Extract pages", "Organize PDF", "Scan to PDF"],
    },
    {
      title: "OPTIMIZE PDF",
      items: ["Compress PDF", "Repair PDF", "OCR PDF"],
    },
    {
      title: "CONVERT TO PDF",
      items: ["JPG to PDF", "WORD to PDF", "POWERPOINT to PDF", "EXCEL to PDF", "HTML to PDF"],
    },
    {
      title: "CONVERT FROM PDF",
      items: ["PDF to JPG", "PDF to WORD", "PDF to POWERPOINT", "PDF to EXCEL", "PDF to PDF/A"],
    },
    {
      title: "EDIT PDF",
      items: ["Rotate PDF", "Add page numbers", "Add watermark", "Crop PDF", "Edit PDF"],
    },
    {
      title: "PDF SECURITY",
      items: ["Unlock PDF", "Protect PDF", "Sign PDF", "Redact PDF", "Compare PDF"],
    },
  ]

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img src="/images/Logo.png" alt="Logo" className="h-8 w-auto" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <a
              href="#"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
            >
              MERGE PDF
            </a>
            <a
              href="#"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
            >
              SPLIT PDF
            </a>
            <a
              href="#"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
            >
              COMPRESS PDF
            </a>

            {/* Dropdown: CONVERT PDF */}
            <div className="relative group inline-block">
              <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors flex items-center gap-1">
                CONVERT PDF
                <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute left-1/2 transform -translate-x-1/2 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-md">
                  Convert to Word
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  Convert to Excel
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  Convert to PowerPoint
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 last:rounded-b-md">
                  Convert to Image
                </a>
              </div>
            </div>

            {/* Dropdown: ALL PDF TOOLS - Mega Menu */}
            <div className="relative group">
              <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors flex items-center gap-1">
                ALL PDF TOOLS
                <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute md:fixed left-1/2 transform -translate-x-1/2 md:top-16 mt-0 w-auto md:w-[90vw] md:max-w-6xl bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 p-6">
                <div className="grid grid-cols-6 gap-8 min-w-max">
                  {pdfToolsCategories.map((category) => (
                    <div key={category.title}>
                      <h3 className="text-xs font-bold text-gray-900 mb-3 uppercase tracking-wide">{category.title}</h3>
                      <ul className="space-y-2">
                        {category.items.map((item) => (
                          <li key={item}>
                            <a
                              href="#"
                              className="text-sm text-gray-700 hover:text-gray-900 hover:font-medium transition-colors flex items-center gap-2"
                            >
                              <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                              {item}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
            >
              Sign up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="#"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
            >
              MERGE PDF
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
            >
              SPLIT PDF
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
            >
              COMPRESS PDF
            </a>

            {/* Mobile Dropdown: CONVERT PDF */}
            <div>
              <button
                onClick={() => toggleDropdown("convert")}
                className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors flex items-center justify-between"
              >
                CONVERT PDF
                <ChevronDown
                  size={16}
                  className={`transition-transform ${openDropdown === "convert" ? "rotate-180" : ""}`}
                />
              </button>
              {openDropdown === "convert" && (
                <div className="pl-4 space-y-1">
                  <a
                    href="#"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                  >
                    Convert to Word
                  </a>
                  <a
                    href="#"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                  >
                    Convert to Excel
                  </a>
                  <a
                    href="#"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                  >
                    Convert to PowerPoint
                  </a>
                  <a
                    href="#"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                  >
                    Convert to Image
                  </a>
                </div>
              )}
            </div>

            {/* Mobile Dropdown: ALL PDF TOOLS */}
            <div>
              <button
                onClick={() => toggleDropdown("tools")}
                className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors flex items-center justify-between"
              >
                ALL PDF TOOLS
                <ChevronDown
                  size={16}
                  className={`transition-transform ${openDropdown === "tools" ? "rotate-180" : ""}`}
                />
              </button>
              {openDropdown === "tools" && (
                <div className="pl-4 space-y-3 py-2">
                  {pdfToolsCategories.map((category) => (
                    <div key={category.title}>
                      <h4 className="text-xs font-bold text-gray-900 mb-2 uppercase tracking-wide">{category.title}</h4>
                      <div className="space-y-1">
                        {category.items.map((item) => (
                          <a
                            key={item}
                            href="#"
                            className="block px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                          >
                            {item}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile buttons */}
            <div className="pt-4 space-y-2 border-t border-gray-200">
              <Link
                to="/login"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors text-center"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block px-3 py-2 text-base font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors text-center"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
