import { SkinProblemsGridAr } from "./components/skin-problems-grid-ar"

export default function SkinProblemsPageAr() {
  return (
    <div className="min-h-screen px-4" style={{ backgroundColor: "#E6D9FF" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
            هذه المشاكل التي تريد عميلاتك بالتأكيد حلها
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            نستخدم <em className="italic">الوخز بالإبر الدقيقة</em> لعلاج العديد من
            عيوب البشرة لديكن بفعالية مثل:
          </p>
        </div>

        <SkinProblemsGridAr />
      </div>
    </div>
  )
}
