import { Link, useNavigate } from "react-router-dom";
import useStudentProfile from "../hooks/useStudentProfile";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { formatDate, getRoleLabel } from "../utils/formatters";

export default function StudentProfile() {
  const navigate = useNavigate();
  const { user, results, loading, activeEnrollments, otherEnrollments } = useStudentProfile();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20" dir="rtl">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 mb-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-28 h-28 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-5xl text-white shadow-lg">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div className="text-center md:text-right flex-1">
            <h1 className="text-3xl font-black text-slate-800 mb-2">{user?.name || "المستخدم"}</h1>
            <p className="text-slate-500 mb-4">{user?.email}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <span className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-bold border border-blue-100">
                👤 {getRoleLabel(user?.role)}
              </span>
              <span className="bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-sm font-bold border border-green-100">
                📚 {activeEnrollments.length} كورس نشط
              </span>
              <span className="bg-purple-50 text-purple-700 px-4 py-1.5 rounded-full text-sm font-bold border border-purple-100">
                🏆 {results.length} امتحان مكتمل
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-8 py-3 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-colors border border-red-100"
          >
            تسجيل الخروج
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">

            {/* Active Courses */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span className="text-2xl">🔥</span> كورساتي النشطة
              </h3>
              {activeEnrollments.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-4">
                  {activeEnrollments.map((enroll) => (
                    <div key={enroll.courseId} className="p-6 border border-slate-100 rounded-2xl bg-gradient-to-br from-slate-50 to-white hover:shadow-md transition-all">
                      <h4 className="font-bold text-slate-800 mb-4 text-lg">{enroll.courseTitle}</h4>
                      <Link
                        to={`/course/${enroll.courseId}`}
                        className="inline-block w-full text-center py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors"
                      >
                        بدء التعلم الآن
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <p className="text-slate-500 mb-4">لا توجد كورسات نشطة حالياً.</p>
                  <Link to="/courses" className="text-blue-600 font-bold hover:underline">
                    استعرض الكورسات المتاحة
                  </Link>
                </div>
              )}
            </div>

            {/* Results Table */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span className="text-2xl">🏆</span> نتائج الامتحانات
              </h3>
              {results.length > 0 ? (
                <div className="overflow-hidden rounded-2xl border border-slate-100">
                  <table className="w-full text-right border-collapse">
                    <thead className="bg-slate-50 text-slate-600">
                      <tr>
                        <th className="p-4">الامتحان</th>
                        <th className="p-4 text-center">الدرجة</th>
                        <th className="p-4">التاريخ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {results.map((result) => (
                        <tr key={result.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4">
                            <div className="font-bold text-slate-700">{result.Quiz?.title}</div>
                            <div className="text-xs text-slate-400">{result.Quiz?.Course?.title}</div>
                          </td>
                          <td className="p-4 text-center">
                            <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg font-black">
                              {result.score}%
                            </span>
                          </td>
                          <td className="p-4 text-sm text-slate-500">
                            {formatDate(result.createdAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-slate-500 text-center py-8 italic">لا توجد نتائج مسجلة.</p>
              )}
            </div>
          </div>

          {/* Sidebar: Pending */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span className="text-xl">⏳</span> طلبات قيد الانتظار
              </h3>
              <div className="space-y-4">
                {otherEnrollments.map((enroll) => (
                  <div key={enroll.courseId} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <h4 className="text-sm font-bold text-slate-700 mb-2">{enroll.courseTitle}</h4>
                    <span className={`text-[10px] px-2 py-1 rounded-full font-black ${
                      enroll.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {enroll.status === "pending" ? "جاري المراجعة" : "مرفوض"}
                    </span>
                  </div>
                ))}
                {otherEnrollments.length === 0 && (
                  <p className="text-xs text-slate-400 text-center">لا توجد طلبات معلقة</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
