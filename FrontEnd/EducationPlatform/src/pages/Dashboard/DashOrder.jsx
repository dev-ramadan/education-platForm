import { useState } from "react";
import useEnrollments from "../../hooks/useEnrollments";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { getEnrollmentStatusLabel } from "../../utils/formatters";

const FILTERS = ["all", "pending", "active", "rejected"];

export default function DashOrder() {
  const { enrollments, loading, error, approve, reject } = useEnrollments();
  const [filter, setFilter] = useState("all");

  const filtered = enrollments.filter((item) =>
    filter === "all" ? true : item.status === filter
  );

  return (
    <div className="p-6 bg-slate-50 min-h-screen" dir="rtl">
      <div className="max-w-7xl mx-auto">

        {/* Header + Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-black text-slate-800">إدارة طلبات الاشتراك</h1>
          <div className="flex bg-white rounded-xl shadow-sm border border-slate-200 p-1">
            {FILTERS.map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                  filter === status
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {getEnrollmentStatusLabel(status)}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center font-bold border border-red-200">
            {error}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    {["رقم الطلب", "اسم الطالب", "رقم الهاتف", "الكورس", "الحالة", "الإجراءات"].map(
                      (h) => (
                        <th key={h} className="p-4 font-bold text-slate-600">
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.length > 0 ? (
                    filtered.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4 text-slate-500 font-mono">#{item.id}</td>
                        <td className="p-4 font-bold text-slate-800">
                          {item.User?.name || "طالب غير معروف"}
                        </td>
                        <td className="p-4 text-slate-600 font-mono" dir="ltr">
                          {item.phone}
                        </td>
                        <td className="p-4 text-slate-700">
                          {item.Course?.title || "كورس غير معروف"}
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 text-xs font-bold rounded-full ${
                              item.status === "active"
                                ? "bg-green-100 text-green-700 border border-green-200"
                                : item.status === "rejected"
                                ? "bg-red-100 text-red-700 border border-red-200"
                                : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                            }`}
                          >
                            {getEnrollmentStatusLabel(item.status)}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex gap-2 justify-center">
                            <button
                              disabled={item.status !== "pending"}
                              onClick={() => approve(item.id)}
                              className="px-3 py-1.5 bg-green-500 text-white text-sm font-bold rounded-lg hover:bg-green-600 disabled:opacity-30 transition-colors shadow-sm"
                            >
                              قبول
                            </button>
                            <button
                              disabled={item.status !== "pending"}
                              onClick={() => reject(item.id)}
                              className="px-3 py-1.5 bg-red-500 text-white text-sm font-bold rounded-lg hover:bg-red-600 disabled:opacity-30 transition-colors shadow-sm"
                            >
                              رفض
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="p-8 text-center text-slate-500">
                        لا توجد طلبات تطابق الفلتر الحالي
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