import { useEffect, useState } from "react";

export default function DashStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("http://localhost:3000/auth/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        
        if (!res.ok) throw new Error(data.message || "حدث خطأ أثناء جلب الطلاب");

        // Filter only students
        const studentsList = (data.data || []).filter(u => u.role === "student");
        setStudents(studentsList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [token]);

  return (
    <div className="p-6 bg-slate-50 min-h-screen" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-black text-slate-800 mb-8 flex items-center gap-3">
          <span className="text-4xl">👨‍🎓</span> إدارة الطلاب
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          </div>
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
                    <th className="p-4 font-bold text-slate-600">رقم الطالب</th>
                    <th className="p-4 font-bold text-slate-600">اسم الطالب</th>
                    <th className="p-4 font-bold text-slate-600">البريد الإلكتروني</th>
                    <th className="p-4 font-bold text-slate-600">تاريخ التسجيل</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {students.length > 0 ? (
                    students.map((student) => (
                      <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4 text-slate-500 font-mono">#{student.id}</td>
                        <td className="p-4 font-bold text-slate-800">
                          {student.name}
                        </td>
                        <td className="p-4 text-slate-600 font-mono" dir="ltr">
                          {student.email}
                        </td>
                        <td className="p-4 text-slate-500">
                          {new Date(student.createdAt).toLocaleDateString('ar-EG', {
                            year: 'numeric', month: 'long', day: 'numeric'
                          })}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="p-8 text-center text-slate-500">
                        لا يوجد طلاب مسجلين في المنصة حتى الآن
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
