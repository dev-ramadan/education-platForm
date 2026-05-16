import { Link } from "react-router-dom";
import useCourses from "../hooks/Course";

export default function Course() {
  const { courses, loading } = useCourses();

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" dir="rtl">
      
      {/* Background elements */}
      <div className="absolute top-0 right-[-10%] w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">
            استكشف <span className="text-gradient">الكورسات</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            اختر من بين أفضل الكورسات التعليمية وابدأ التعلم فوراً مع أفضل المدربين في الوطن العربي.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.length === 0 ? (
              <p className="col-span-full text-center text-slate-500 text-lg">لا توجد كورسات متاحة حالياً.</p>
            ) : (
              courses.map((c, index) => (
                <div
                  key={c.id}
                  className="glass rounded-3xl overflow-hidden hover-scale flex flex-col animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Course Image Placeholder */}
                  <div className="h-48 bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white">
                    <span className="text-5xl opacity-50">📚</span>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="font-extrabold text-xl text-slate-800 line-clamp-2">{c.title}</h2>
                      {c.price && (
                        <span className="bg-blue-100 text-blue-800 text-sm font-bold px-3 py-1 rounded-full whitespace-nowrap">
                          {c.price} ج.م
                        </span>
                      )}
                    </div>
                    
                    <p className="text-slate-600 mb-6 flex-1 line-clamp-3">{c.description}</p>
                    
                    <Link
                      to={`/course/${c.id}`}
                      className="mt-auto block text-center bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-blue-600 transition-colors shadow-md"
                    >
                      عرض التفاصيل ←
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}