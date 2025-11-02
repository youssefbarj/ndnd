"use client"

import { useState, useEffect, useRef } from "react"
import { Sparkles } from "lucide-react"
import Image from "next/image"

const skinProblems = [
  {
    id: 1,
    title: "حب الشباب الخفيف",
    subtitle: "عيوب البشرة",
    image: "/images/acne-legere.png",
    alt: "حب الشباب الخفيف على الوجه",
    description:
      "المسام تسد مع الإفراط في الزهم والخلايا الميتة، مما يخلق التهابات وعيوباً مرئية يمكن أن تترك ندوباً دائمة.",
    color: "from-red-100 to-pink-100",
  },
  {
    id: 2,
    title: "البقع التصبغية",
    subtitle: "فرط التصبغ",
    image: "/images/taches-pigmentaires.png",
    alt: "البقع التصبغية على الجلد",
    description:
      "الإفراط في إنتاج الميلانين يخلق مناطق أغمق على الجلد، مما يعطي لوناً غير متساوٍ وباهتاً يشيخ الوجه مبكراً.",
    color: "from-amber-100 to-orange-100",
  },
  {
    id: 3,
    title: "البشرة الباهتة",
    subtitle: "نقص الإشراق",
    image: "/images/teint-terne.png",
    alt: "بشرة باهتة على الوجه",
    description:
      "تراكم الخلايا الميتة وبطء الدورة الدموية يعطي البشرة المتعبة بدون إشراق، مع ملمس خشن يمتص العلاجات بشكل سيء.",
    color: "from-yellow-100 to-amber-100",
  },
  {
    id: 4,
    title: "المسام المتوسعة",
    subtitle: "ملمس غير منتظم",
    image: "/images/pores-dilates.png",
    alt: "المسام المتوسعة على الجلد",
    description:
      "مع التقدم في العمر والإفراط في الزهم، تتوسع المسام وتصبح مرئية، مما يخلق ملمساً حبيبياً يتراكم عليه الشوائب ويجعل المكياج لا يدوم طويلاً.",
    color: "from-blue-100 to-cyan-100",
  },
]

export function SkinProblemsGridAr() {
  const [isVisible, setIsVisible] = useState(false)
  const [showHint, setShowHint] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setTimeout(() => setShowHint(true), 2000)
        }
      },
      { threshold: 0.1 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleCardHover = () => {
    setShowHint(false)
  }

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {skinProblems.map((problem, index) => (
          <div
            key={problem.id}
            className={`transition-all duration-500 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
            style={{ transitionDelay: `${index * 150}ms` }}
            onMouseEnter={handleCardHover}
          >
            <div className="relative group">
              {showHint && (
                <div className="absolute top-4 left-4 z-10 opacity-50 group-hover:opacity-0 transition-opacity duration-300">
                  <Image src="/images/cursor-icon.png" alt="Hover hint" width={24} height={24} className="w-6 h-6" />
                </div>
              )}

              <div
                className={`w-full h-80 relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 bg-gradient-to-br ${problem.color}`}
              >
                <Image
                  src={problem.image || "/placeholder.svg"}
                  alt={problem.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-sm leading-relaxed">{problem.description}</p>
                </div>
              </div>

              <div className="text-center mt-6">
                <h3 className="text-xl font-bold text-gray-800 tracking-wide transition-colors duration-300 group-hover:text-teal-600">
                  {problem.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {problem.subtitle}
                </p>
              </div>

              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-teal-300 transition-colors duration-300" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
