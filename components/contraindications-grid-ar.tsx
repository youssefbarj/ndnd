"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

const contraindications = [
  {
    id: 1,
    title: "التهابات وعدوى العين",
    image: "/images/eye-infections.png",
    description:
      "العدوى النشطة في العين (التهاب الملتحمة، الششعرية، التهاب الجفن) يمكن أن تنتشر مع التعامل مع الرموش. المواد اللاصقة والمنتجات قد تزيد الالتهاب وتؤخر الشفاء.",
    category: "طب العيون",
  },
  {
    id: 2,
    title: "العمليات والإجراءات الحديثة",
    image: "/images/recent-surgeries.png",
    description:
      "عمليات العين الحديثة (أقل من 6 أشهر) تتطلب شفاءً كاملاً. الإطالات يمكن أن تضغط على الأنسجة الرقيقة وتضر بالشفاء.",
    category: "جراحة",
  },
  {
    id: 3,
    title: "الحساسية المعروفة",
    image: "/images/known-allergies.png",
    description:
      "الحساسية من المواد اللاصقة، اللاتكس، الفورمالديهايد أو مكونات أخرى يمكن أن تسبب ردود فعل شديدة: تورم، حكة، صعوبة في التنفس تتطلب علاجاً طارئاً.",
    category: "الحساسيات",
  },
  {
    id: 4,
    title: "الحمل والرضاعة",
    image: "/images/pregnancy-breastfeeding.png",
    description:
      "التغيرات الهرمونية تؤثر على نمو الرموش وحساسية الجلد. أبخرة المواد اللاصقة يمكن أن تكون مقلقة، والنتائج قد تكون غير متوقعة.",
    category: "الأمومة",
  },
  {
    id: 5,
    title: "أمراض العيون المزمنة",
    image: "/images/chronic-eye-diseases.png",
    description:
      "الأمراض مثل الجلوكوما، جفاف العين المزمن أو اضطرابات الجفن تؤثر على صحة العين ويمكن أن تتفاقم مع الإطالات.",
    category: "الأمراض المزمنة",
  },
  {
    id: 6,
    title: "العدسات اللاصقة",
    image: "/images/contact-lenses.png",
    description:
      "العدسات اللاصقة يمكن أن تتداخل مع وضع وصيانة الإطالات. زيوت التنظيف والفرك المتكرر يقلل من عمر الإطالات.",
    category: "المعدات البصرية",
  },
  {
    id: 7,
    title: "تاريخ تلف الرموش",
    image: "/images/lash-damage-history.png",
    description:
      "الرموش التي ضعفت بالفعل من علاجات سابقة، نتف الشعر أو التلف الكيميائي لا تستطيع تحمل وزن الإطالات دون خطر فقدان دائم.",
    category: "التاريخ الشعري",
  },
  {
    id: 8,
    title: "حساسية الجلد المفرطة",
    image: "/images/skin-hypersensitivity.png",
    description:
      "البشرة الحساسة أو الحالات مثل الأكزيما حول العين تتفاعل بشكل سيء مع المواد اللاصقة والكيميائيات، مما يسبب تهيجاً واحمراراً وانزعاجاً مطولاً.",
    category: "الأمراض الجلدية",
  },
]

export default function ContraindicationsGridAr() {
  const [hasInteracted, setHasInteracted] = useState(false)
  const [showHints, setShowHints] = useState(false)
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted) {
        setShowHints(true)
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [hasInteracted])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = Number.parseInt(entry.target.getAttribute("data-card-id") || "0")
            setVisibleCards((prev) => new Set([...prev, cardId]))
          }
        })
      },
      { threshold: 0.1, rootMargin: "50px" },
    )

    const cards = gridRef.current?.querySelectorAll("[data-card-id]")
    cards?.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  const handleCardHover = () => {
    if (!hasInteracted) {
      setHasInteracted(true)
      setShowHints(false)
    }
  }

  return (
    <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
      {contraindications.map((item, index) => (
        <div
          key={item.id}
          data-card-id={item.id}
          className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-out overflow-hidden border-2 border-red-100 hover:border-red-300 hover:scale-105 transform ${
            visibleCards.has(item.id) ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{
            transitionDelay: `${index * 80}ms`,
          }}
          onMouseEnter={handleCardHover}
        >
          {showHints && !hasInteracted && (
            <div className="absolute top-3 left-3 z-10 opacity-50 transition-opacity duration-200 group-hover:opacity-0">
              <Image src="/images/cursor-icon.png" alt="Hover hint" width={20} height={20} className="drop-shadow-md" />
            </div>
          )}

          <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10 transition-transform duration-200 group-hover:scale-110">
            تحذير
          </div>

          <div className="relative h-64 overflow-hidden bg-gradient-to-br from-red-50 to-red-100">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-300 ease-out group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-red-600 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 ease-out" />
          </div>

          <div className="p-6">
            <div className="mb-2">
              <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded-full transition-colors duration-200 group-hover:bg-red-200">
                {item.category}
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-red-700 transition-colors duration-200">
              {item.title}
            </h3>
          </div>

          <div className="absolute inset-0 bg-red-600 bg-opacity-95 text-white p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out flex flex-col justify-center transform translate-y-2 group-hover:translate-y-0">
            <div className="text-center">
              <div className="mb-4">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3 transition-transform duration-200 group-hover:scale-110">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-bold mb-2 text-white">لماذا هذا التحذير؟</h4>
              </div>
              <p className="text-sm leading-relaxed text-white text-opacity-90">{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
