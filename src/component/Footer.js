"use client"

import { Linkedin, Twitter, Github, Facebook } from "lucide-react"
import { useState } from "react"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail("")
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-100 border-t border-slate-800">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-500 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-2">Stay Updated</h3>
              <p className="text-red-100">Get the latest PDF tools tips and updates delivered to your inbox.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg bg-white text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-300"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors"
              >
                {subscribed ? "✓ Subscribed" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              {/* <img src="/images/Logo.png" alt="Logo" className="h-8 w-auto" /> */}
              {/* <span className="text-xl font-bold">PDFTools</span> */}
            </div>
            <p className="text-slate-400 text-sm mb-6">
              All the PDF tools you need in one place. Free, fast, and easy to use.
            </p>
            <div className="flex gap-4">
              <a href="https://twitter.com/company" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-red-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://linkedin.com/company/company" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-red-500 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://github.com/company" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-red-500 transition-colors">
                <Github size={20} />
              </a>
              <a href="https://facebook.com/company" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-red-500 transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-3">
              <li>
                <button onClick={() => window.location.href='/merge-pdf'} className="text-slate-400 hover:text-red-500 transition-colors text-sm text-left">
                  Merge PDF
                </button>
              </li>
              <li>
                <button onClick={() => window.location.href='/split-pdf'} className="text-slate-400 hover:text-red-500 transition-colors text-sm text-left">
                  Split PDF
                </button>
              </li>
              <li>
                <button onClick={() => window.location.href='/compress-pdf'} className="text-slate-400 hover:text-red-500 transition-colors text-sm text-left">
                  Compress PDF
                </button>
              </li>
              <li>
                <button onClick={() => window.location.href='/convert-pdf'} className="text-slate-400 hover:text-red-500 transition-colors text-sm text-left">
                  Convert PDF
                </button>
              </li>
              <li>
                <button onClick={() => window.location.href='/edit-pdf'} className="text-slate-400 hover:text-red-500 transition-colors text-sm text-left">
                  Edit PDF
                </button>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <button onClick={() => window.location.href='/about'} className="text-slate-400 hover:text-red-500 transition-colors text-sm text-left">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => window.location.href='/blog'} className="text-slate-400 hover:text-red-500 transition-colors text-sm text-left">
                  Blog
                </button>
              </li>
              <li>
                <button onClick={() => window.location.href='/careers'} className="text-slate-400 hover:text-red-500 transition-colors text-sm text-left">
                  Careers
                </button>
              </li>
              <li>
                <button onClick={() => window.location.href='/press'} className="text-slate-400 hover:text-red-500 transition-colors text-sm text-left">
                  Press
                </button>
              </li>
              <li>
                <button onClick={() => window.location.href='/contact'} className="text-slate-400 hover:text-red-500 transition-colors text-sm text-left">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
             <button onClick={() => window.location.href='/docs'} className="text-slate-400 hover:text-red-500 transition-colors text-sm text-left">
                  Documentation
             </button>
              </li>
              <li>
             <button onClick={() => window.location.href='/api'} className="text-slate-400 hover:text-red-500 transition-colors text-sm text-left">
                  API Reference
             </button>
              </li>
              <li>
             <button onClick={() => window.location.href='/tutorials'} className="text-slate-400 hover:text-red-500 transition-colors text-sm text-left">
                  Tutorials
             </button>
              </li>
              <li>
             <button onClick={() => window.location.href='/faq'} className="text-slate-400 hover:text-red-500 transition-colors text-sm text-left">
                  FAQ
             </button>
              </li>
              <li>
             <button onClick={() => window.location.href='/support'} className="text-slate-400 hover:text-red-500 transition-colors text-sm text-left">
                  Support
             </button>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              <li>
                <button onClick={() => window.location.href='/privacy-policy'} className="text-slate-400 hover:text-red-500 transition-colors text-sm text-left">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => window.location.href='/terms-of-service'} className="text-slate-400 hover:text-red-500 transition-colors text-sm text-left">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => window.location.href='/cookie-policy'} className="text-slate-400 hover:text-red-500 transition-colors text-sm text-left">
                  Cookie Policy
                </button>
              </li>
              <li>
                <button onClick={() => window.location.href='/gdpr'} className="text-slate-400 hover:text-red-500 transition-colors text-sm text-left">
                  GDPR
                </button>
              </li>
              <li>
                <button onClick={() => window.location.href='/security'} className="text-slate-400 hover:text-red-500 transition-colors text-sm text-left">
                  Sitemap
                  </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">© 2025 PDFTools. All rights reserved.</p>
            <div className="flex gap-6">
                <button onClick={() => window.location.href='/privacy-policy'} className="text-slate-400 hover:text-red-500 transition-colors text-sm">
                Privacy
                </button>
                <button onClick={() => window.location.href='/terms-of-service'} className="text-slate-400 hover:text-red-500 transition-colors text-sm">
                Terms
                </button>
                <button onClick={() => window.location.href='/cookie-policy'} className="text-slate-400 hover:text-red-500 transition-colors text-sm">
                Cookies
                </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
