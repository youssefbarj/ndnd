"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Play, Pause, Zap, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const skinProblems = [
  {
    id: 1,
    title: "حب الشباب الخفيف",
    subtitle: "عيوب البشرة",
    image: "/images/acne-legere.png",
    alt: "حب الشباب الخفيف على الوجه",
    description: "علاج فعال للبثور والالتهابات",
    benefits: ["تقليل الالتهاب", "بشرة أنعم", "منع الندوب"],
    color: "from-red-100 to-pink-100",
  },
  {
    id: 2,
    title: "البقع التصبغية",
    subtitle: "فرط التصبغ",
    image: "/images/taches-pigmentaires.png",
    alt: "البقع التصبغية على الجلد",
    description: "إزالة البقع البنية وتوحيد لون البشرة",
    benefits: ["لون بشرة موحد", "إشراق استعاد", "تقليل البقع"],
    color: "from-amber-100 to-orange-100",
  },
  {
    id: 3,
    title: "البشرة الباهتة",
    subtitle: "نقص الإشراق",
    image: "/images/teint-terne.png",
    alt: "بشرة باهتة على الوجه",
    description: "تجديد وإشراق البشرة",
    benefits: ["إشراق طبيعي", "بشرة منشطة", "ملمس محسن"],
    color: "from-yellow-100 to-amber-100",
  },
  {
    id: 4,
    title: "المسام المتوسعة",
    subtitle: "ملمس غير منتظم",
    image: "/images/pores-dilates.png",
    alt: "المسام المتوسعة على الجلد",
    description: "تضييق المسام وتنعيم الملمس",
    benefits: ["مسام مغلقة", "ملمس ناعم", "بشرة مصقولة"],
    color: "from-blue-100 to-cyan-100",
  },
]

export function SkinProblemsGalleryAr() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isAutoPlaying) {
      interval = setInterval(() => {
        if (canScrollRight) {
          scrollRight()
        } else {
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" })
            setTimeout(checkScrollButtons, 300)
          }
        }
      }, 3000)
    }
    return () => clearInterval(interval)
  }, [isAutoPlaying, canScrollRight])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (scrollContainerRef.current) {
      observer.observe(scrollContainerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)

      const cardWidth = 300
      const newIndex = Math.round(scrollLeft / cardWidth)
      setCurrentIndex(Math.min(newIndex, skinProblems.length - 1))
    }
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
      setTimeout(checkScrollButtons, 300)
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
      setTimeout(checkScrollButtons, 300)
    }
  }

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const cardWidth = 300
      scrollContainerRef.current.scrollTo({ left: index * cardWidth, behavior: "smooth" })
      setTimeout(checkScrollButtons, 300)
    }
  }

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying)
  }

  return (
    <div className="relative">
      <div className="flex justify-center items-center gap-4 mb-6">
        <Button
          onClick={toggleAutoPlay}
          variant="outline"
          size="sm"
          className="bg-white/80 backdrop-blur-sm hover:bg-white shadow-md"
        >
          {isAutoPlaying ? (
            <>
              <Pause className="h-4 w-4 mr-2" />
              إيقاف تلقائي
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              تمرير تلقائي
            </>
          )}
        </Button>

        <div className="flex gap-2">
          {skinProblems.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-teal-500 scale-125" : "bg-white/60 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>

      {canScrollLeft && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full h-12 w-12 backdrop-blur-sm transition-all duration-300 hover:scale-110"
          onClick={scrollLeft}
        >
          <ChevronLeft className="h-6 w-6 text-gray-600" />
        </Button>
      )}

      <div className="overflow-hidden">
        <div
          ref={scrollContainerRef}
          className={`flex gap-6 overflow-x-auto scrollbar-hide px-8 py-4 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            scrollSnapType: "x mandatory",
          }}
          onScroll={checkScrollButtons}
        >
          {skinProblems.map((problem, index) => (
            <div
              key={problem.id}
              className={`flex-shrink-0 scroll-snap-align-center transition-all duration-500 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
              style={{
                scrollSnapAlign: "center",
                transitionDelay: `${index * 150}ms`,
              }}
              onMouseEnter={() => setHoveredCard(problem.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative group">
                <div
                  className={`w-80 h-96 relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 bg-gradient-to-br ${problem.color}`}
                >
                  <Image
                    src={problem.image || "/placeholder.svg"}
                    alt={problem.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 320px"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-sm opacity-90 mb-3">{problem.description}</p>
                    <div className="space-y-1">
                      {problem.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs">
                          <Zap className="h-3 w-3 text-teal-300" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
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

      {canScrollRight && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full h-12 w-12 backdrop-blur-sm transition-all duration-300 hover:scale-110"
          onClick={scrollRight}
        >
          <ChevronRight className="h-6 w-6 text-gray-600" />
        </Button>
      )}

      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="bg-teal-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg animate-pulse">
          ✨ علاج الوخز بالإبر الدقيقة
        </div>
      </div>
    </div>
  )
}
