"use client"

import { motion } from "framer-motion"

export default function PremiumSection() {
  return (
    <section className="relative py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-amber-50 via-amber-50 to-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-200 to-transparent rounded-full opacity-30 blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-red-200 to-transparent rounded-full opacity-20 blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Get more with Premium</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Work faster and smarter with advanced editing tools, batch processing, and powerful AI features—built
                for high-demand workflows.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-lg transition-colors shadow-lg"
            >
              <span className="text-xl">👑</span>
              Get Premium
            </motion.button>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative h-96 md:h-full"
          >
            {/* Main Card */}
            <div className="absolute top-0 right-0 w-80 h-64 bg-white rounded-3xl shadow-2xl p-6 border-l-8 border-red-500 z-10">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 bg-red-500 rounded" />
                  <h3 className="font-bold text-gray-900">Premium Features</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Unlock unlimited batch processing, advanced AI editing, priority support, and more.
                </p>
                <div className="flex gap-2 pt-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <div className="h-2 bg-gray-200 rounded w-3/4" />
                    <div className="h-2 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative shapes */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              className="absolute bottom-20 left-0 w-24 h-24 bg-red-500 rounded-3xl opacity-80"
            />
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
              className="absolute top-10 left-20 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-2xl shadow-lg"
            >
              👑
            </motion.div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, linear: true }}
              className="absolute bottom-0 right-10 w-20 h-20 border-4 border-yellow-300 rounded-full opacity-50"
            />

            {/* Top right accent */}
            <div className="absolute top-0 right-0 w-32 h-32 border-t-8 border-r-8 border-yellow-300 rounded-3xl opacity-60" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
