import { useEffect, useState } from "react";
import { BASE_URL } from "../../api/config";
import toast from "react-hot-toast";

export default function DashResults() {
  const [results, setResults] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch results
        const resResults = await fetch(`${BASE_URL}/api/result/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const dataResults = await resResults.json();
        if (!resResults.ok) throw new Error(dataResults.message || "حدث خطأ أثناء جلب نتائج الطلاب");
        setResults(dataResults.data || []);

        // Fetch courses for filtering
        const resCourses = await fetch(`${BASE_URL}/api/course`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const dataCourses = await resCourses.json();
        if (resCourses.ok) {
          setCourses(dataCourses.data || []);
        }
      } catch (err) {
        toast.error(err.message || "حدث خطأ أثناء الاتصال بالخادم");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // Filter results based on selected course and search term
  const filteredResults = results.filter((r) => {
    const courseId = r.Quiz?.Course?.id || r.Quiz?.courseId;
    const matchesCourse = selectedCourse === "all" || String(courseId) === String(selectedCourse);

    const studentName = r.User?.name?.toLowerCase() || "";
    const studentEmail = r.User?.email?.toLowerCase() || "";
    const quizTitle = r.Quiz?.title?.toLowerCase() || "";
    const searchLower = searchTerm.toLowerCase();

    const matchesSearch =
      studentName.includes(searchLower) ||
      studentEmail.includes(searchLower) ||
      quizTitle.includes(searchLower);

    return matchesCourse && matchesSearch;
  });

  // Calculate quick stats for the filtered list
  const totalAttempts = filteredResults.length;
  const avgScore = totalAttempts > 0 
    ? Math.round(filteredResults.reduce((acc, curr) => acc + curr.score, 0) / totalAttempts)
    : 0;
  const maxScore = totalAttempts > 0
    ? Math.max(...filteredResults.map(r => r.score))
    : 0;

  // Grade helper based on score (assuming out of 100)
  const getGradeBadge = (score) => {
    if (score >= 85) {
      return (
        <span className="px-3 py-1 text-xs font-black rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
          ممتاز ({score}%)
        </span>
      );
    } else if (score >= 75) {
      return (
        <span className="px-3 py-1 text-xs font-black rounded-full bg-blue-50 text-blue-700 border border-blue-200">
          جيد جداً ({score}%)
        </span>
      );
    } else if (score >= 50) {
      return (
        <span className="px-3 py-1 text-xs font-black rounded-full bg-amber-50 text-amber-700 border border-amber-200">
          مقبول ({score}%)
        </span>
      );
    } else {
      return (
        <span className="px-3 py-1 text-xs font-black rounded-full bg-rose-50 text-rose-700 border border-rose-200">
          راسب ({score}%)
        </span>
      );
    }
  };

  return (
    <div className="p-1 md:p-4 bg-slate-50 min-h-screen" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
              <span className="text-4xl">📊</span> نتائج الطلاب
            </h1>
            <p className="text-slate-500 mt-1 font-medium">عرض نتائج امتحانات الطلاب مع إمكانية الفلترة لكل كورس ومادة</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-all">
            <div>
              <p className="text-slate-400 font-bold text-sm">إجمالي المحاولات</p>
              <h3 className="text-3xl font-black text-slate-800 mt-1">{totalAttempts}</h3>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl text-blue-600">📝</div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-all">
            <div>
              <p className="text-slate-400 font-bold text-sm">متوسط الدرجات</p>
              <h3 className="text-3xl font-black text-slate-800 mt-1">{avgScore}%</h3>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-2xl text-emerald-600">📈</div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-all">
            <div>
              <p className="text-slate-400 font-bold text-sm">أعلى درجة محققة</p>
              <h3 className="text-3xl font-black text-slate-800 mt-1">{maxScore}%</h3>
            </div>
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-2xl text-amber-600">🏆</div>
          </div>
        </div>

        {/* Filters Controls */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Dropdown Course Filter */}
          <div className="w-full md:w-1/3 space-y-1.5">
            <label className="text-sm font-bold text-slate-600 block">اختر الكورس / المادة</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all cursor-pointer"
            >
              <option value="all">📁 جميع الكورسات</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  📚 {course.title}
                </option>
              ))}
            </select>
          </div>

          {/* Search Input */}
          <div className="w-full md:w-1/2 space-y-1.5">
            <label className="text-sm font-bold text-slate-600 block">ابحث باسم الطالب أو الامتحان</label>
            <div className="relative">
              <input
                type="text"
                placeholder="ابحث هنا..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 pr-10 pl-4 py-3 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium transition-all"
              />
              <svg className="w-5 h-5 absolute right-3 top-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Results List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="p-4 font-black text-slate-600 text-sm">اسم الطالب</th>
                    <th className="p-4 font-black text-slate-600 text-sm">البريد الإلكتروني</th>
                    <th className="p-4 font-black text-slate-600 text-sm">الكورس / المادة</th>
                    <th className="p-4 font-black text-slate-600 text-sm">الامتحان</th>
                    <th className="p-4 font-black text-slate-600 text-sm text-center">الدرجة</th>
                    <th className="p-4 font-black text-slate-600 text-sm">تاريخ التقديم</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredResults.length > 0 ? (
                    filteredResults.map((res) => (
                      <tr key={res.id} className="hover:bg-slate-50 transition-colors font-medium text-slate-800">
                        <td className="p-4 font-bold text-slate-900">{res.User?.name || "طالب غير معروف"}</td>
                        <td className="p-4 text-slate-600 font-mono" dir="ltr">{res.User?.email || "—"}</td>
                        <td className="p-4 text-blue-600 font-bold">
                          {res.Quiz?.Course?.title || "—"}
                        </td>
                        <td className="p-4 text-slate-700">{res.Quiz?.title || "—"}</td>
                        <td className="p-4 text-center">{getGradeBadge(res.score)}</td>
                        <td className="p-4 text-slate-500 text-sm">
                          {new Date(res.createdAt).toLocaleDateString('ar-EG', {
                            year: 'numeric', month: 'short', day: 'numeric',
                            hour: '2-digit', minute: '2-digit'
                          })}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="p-12 text-center text-slate-500 font-bold">
                        لا توجد نتائج مطابقة لخيارات التصفية الحالية.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
