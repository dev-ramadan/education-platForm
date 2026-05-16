import useDashStats from "../../hooks/useDashStats";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const statCards = [
  {
    key: "students",
    label: "إجمالي الطلاب",
    sub: "الطلاب المسجلين بالمنصة",
    icon: "👨‍🎓",
    gradient: "from-blue-500 to-indigo-600",
    text: "text-blue-100",
    sub2: "text-blue-200",
  },
  {
    key: "courses",
    label: "الكورسات المتاحة",
    sub: "المنشورة للطلاب",
    icon: "📚",
    gradient: "from-purple-500 to-pink-600",
    text: "text-purple-100",
    sub2: "text-purple-200",
  },
  {
    key: "revenue",
    label: "الإيرادات (ج.م)",
    sub: "من الاشتراكات المقبولة",
    icon: "💰",
    gradient: "from-emerald-500 to-teal-600",
    text: "text-emerald-100",
    sub2: "text-emerald-200",
    format: (v) => v.toLocaleString(),
  },
  {
    key: "pendingOrders",
    label: "طلبات قيد المراجعة",
    icon: "⏳",
    gradient: "from-orange-500 to-red-600",
    text: "text-orange-100",
    sub2: "text-orange-200",
    dynamicSub: (v) => (v > 0 ? "يرجى مراجعتها الآن" : "لا يوجد طلبات معلقة"),
  },
];

export default function DashHome() {
  const { stats, loading } = useDashStats();

  return (
    <div className="p-6 bg-slate-50 min-h-screen" dir="rtl">
      <h1 className="text-3xl font-black text-slate-800 mb-8">نظرة عامة</h1>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card) => {
            const value = stats[card.key];
            const displayValue = card.format ? card.format(value) : value;
            const subText = card.dynamicSub ? card.dynamicSub(value) : card.sub;
            return (
              <div
                key={card.key}
                className={`bg-gradient-to-br ${card.gradient} p-6 rounded-2xl shadow-lg text-white hover:-translate-y-1 transition-transform`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className={`${card.text} font-bold`}>{card.label}</h3>
                  <span className="text-3xl opacity-80">{card.icon}</span>
                </div>
                <p className="text-4xl font-black">{displayValue}</p>
                <p className={`mt-2 text-sm ${card.sub2}`}>{subText}</p>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-12 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 mb-4">أهلاً بك في لوحة التحكم</h2>
        <p className="text-slate-600 leading-relaxed">
          من خلال القائمة الجانبية يمكنك التحكم في المنصة بالكامل، إضافة الكورسات، إدارة الدروس،
          إضافة الامتحانات وأسئلتها، ومراجعة طلبات الانضمام الخاصة بالطلاب.
        </p>
      </div>
    </div>
  );
}