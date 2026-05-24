import { useEffect, useState } from "react";
import { BASE_URL } from "../../api/config";
import toast from "react-hot-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#10B981", "#F59E0B", "#EF4444", "#3B82F6", "#8B5CF6", "#EC4899"];

// Custom Tooltip for Bar Chart
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-slate-100 rounded-xl shadow-lg font-bold text-xs text-right">
        <p className="text-slate-800 font-black mb-1">{label}</p>
        <p className="text-blue-600">
          عدد المشتركين: <span className="text-sm font-black">{payload[0].value}</span> طالب
        </p>
      </div>
    );
  }
  return null;
};

// Custom Tooltip for Pie Chart
const PieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-slate-100 rounded-xl shadow-lg font-bold text-xs text-right">
        <p className="text-slate-800 font-black mb-1">{payload[0].name}</p>
        <p className="text-indigo-600">
          العدد: <span className="text-sm font-black">{payload[0].value}</span> طلب
        </p>
      </div>
    );
  }
  return null;
};

export default function DashAnalytics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/api/dashboard/stats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "حدث خطأ أثناء جلب إحصائيات لوحة التحكم");
        setStats(data.data);
      } catch (err) {
        toast.error(err.message || "حدث خطأ أثناء التحميل");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="p-6 text-center text-red-600 font-bold bg-red-50 border border-red-200 rounded-2xl">
        عذرًا، لم نتمكن من تحميل بيانات الإحصائيات. يرجى إعادة المحاولة لاحقاً.
      </div>
    );
  }

  const { counts, courseStats, topResults, enrollmentStatus } = stats;

  // Prepare Pie Chart data with Arabic status names
  const pieData = enrollmentStatus.map((item) => {
    let name = "أخرى";
    if (item.status === "active") name = "مقبول (نشط)";
    else if (item.status === "pending") name = "معلق (قيد الانتظار)";
    else if (item.status === "rejected") name = "مرفوض";

    return {
      name,
      value: item.count,
    };
  });

  return (
    <div className="p-1 md:p-4 bg-slate-50 min-h-screen space-y-8" dir="rtl">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
          <span className="text-4xl">📈</span> التحليلات والإحصائيات
        </h1>
        <p className="text-slate-500 mt-1 font-medium">نظرة عامة على أداء الطلاب وتفاعلهم مع المواد الدراسية بالرسم البياني</p>
      </div>

      {/* Main Stats Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-6 rounded-2xl shadow-md text-white hover:scale-102 transition-transform duration-200">
          <p className="font-extrabold text-sm opacity-90">إجمالي الطلاب</p>
          <div className="flex items-baseline justify-between mt-2">
            <h3 className="text-3xl font-black">{counts.students}</h3>
            <span className="text-2xl">👨‍🎓</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-2xl shadow-md text-white hover:scale-102 transition-transform duration-200">
          <p className="font-extrabold text-sm opacity-90">إجمالي الكورسات</p>
          <div className="flex items-baseline justify-between mt-2">
            <h3 className="text-3xl font-black">{counts.courses}</h3>
            <span className="text-2xl">📚</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-6 rounded-2xl shadow-md text-white hover:scale-102 transition-transform duration-200">
          <p className="font-extrabold text-sm opacity-90">إجمالي الاشتراكات</p>
          <div className="flex items-baseline justify-between mt-2">
            <h3 className="text-3xl font-black">{counts.enrollments}</h3>
            <span className="text-2xl">💳</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-rose-500 to-pink-600 p-6 rounded-2xl shadow-md text-white hover:scale-102 transition-transform duration-200">
          <p className="font-extrabold text-sm opacity-90">إجمالي الامتحانات</p>
          <div className="flex items-baseline justify-between mt-2">
            <h3 className="text-3xl font-black">{counts.quizzes}</h3>
            <span className="text-2xl">📝</span>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Course Subscriptions (Bar Chart) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-[400px]">
          <h2 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
            <span>🔥</span> الكورسات الأكثر اشتراكاً
          </h2>
          <div className="flex-1 w-full min-h-0">
            {courseStats.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={courseStats} margin={{ top: 10, right: 10, left: -25, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="title" stroke="#64748B" fontSize={11} fontWeight="bold" tickLine={false} />
                  <YAxis stroke="#64748B" fontSize={11} fontWeight="bold" tickLine={false} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "#F8FAFC" }} />
                  <Bar dataKey="subscriptions" fill="#3B82F6" radius={[6, 6, 0, 0]} maxBarSize={45}>
                    {courseStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 font-bold">لا تتوفر بيانات اشتراكات حتى الآن</div>
            )}
          </div>
        </div>

        {/* Enrollment Status Overview (Pie Chart) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-[400px]">
          <h2 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
            <span>📊</span> توزيع طلبات الاشتراك
          </h2>
          <div className="flex-1 w-full min-h-0 flex flex-col md:flex-row items-center justify-center gap-6">
            {pieData.length > 0 && pieData.some(d => d.value > 0) ? (
              <>
                <div className="flex-1 w-full h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={85}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={<PieTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                {/* Custom Legend */}
                <div className="flex flex-col gap-3 font-bold text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100 min-w-[180px]">
                  {pieData.map((item, index) => (
                    <div key={item.name} className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3.5 h-3.5 rounded-full inline-block"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span>{item.name}</span>
                      </div>
                      <span className="font-black text-slate-900">{item.value}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 font-bold">لا تتوفر طلبات اشتراك حالياً</div>
            )}
          </div>
        </div>

      </div>

      {/* Top Performing Student Results (List/Table) */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
          <span>🏆</span> أعلى نتائج امتحانات الطلاب الأخيرة
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-4 font-black text-slate-600 text-sm">اسم الطالب</th>
                <th className="p-4 font-black text-slate-600 text-sm">المادة الدراسيّة</th>
                <th className="p-4 font-black text-slate-600 text-sm">الامتحان</th>
                <th className="p-4 font-black text-slate-600 text-sm text-center">الدرجة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {topResults.length > 0 ? (
                topResults.map((res, index) => (
                  <tr key={index} className="hover:bg-slate-50 transition-colors font-medium text-slate-800">
                    <td className="p-4 flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center ${
                        index === 0 ? "bg-amber-100 text-amber-800" :
                        index === 1 ? "bg-slate-200 text-slate-800" :
                        index === 2 ? "bg-orange-100 text-orange-800" : "bg-slate-100 text-slate-600"
                      }`}>
                        {index + 1}
                      </span>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900">{res.studentName}</span>
                        <span className="text-slate-400 text-[10px] font-mono" dir="ltr">{res.email}</span>
                      </div>
                    </td>
                    <td className="p-4 text-blue-600 font-bold">{res.courseTitle}</td>
                    <td className="p-4 text-slate-600">{res.quizTitle}</td>
                    <td className="p-4 text-center">
                      <span className="px-3 py-1 text-xs font-black rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {res.score}%
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-slate-500 font-bold">لا تتوفر نتائج امتحانات حالياً</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
