import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  const links = [
    { name: "الرئيسية", path: "/dashboard" },
    { name: "التحليلات والإحصائيات", path: "/dashboard/analytics" },
    { name: "إدارة الكورسات", path: "/dashboard/addCourse" },
    { name: "الطلاب", path: "/dashboard/students" },
    { name: "نتائج الطلاب", path: "/dashboard/results" },
    { name: "الطلبات", path: "/dashboard/orders" },
    { name: "الامتحانات", path: "/dashboard/addQuiz" },
  ];

  const activeClass = "bg-blue-50 text-blue-600 font-bold border-r-4 border-blue-600";
  const inactiveClass = "text-slate-600 hover:bg-slate-50 hover:text-slate-900";

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm md:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-xl transition-transform duration-300 md:translate-x-0 md:static md:z-auto md:shadow-md flex flex-col justify-between ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col flex-grow">
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              EDU<span className="text-slate-800">PANEL</span>
            </h1>
            {/* Close Button on Mobile */}
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-slate-100 md:hidden text-slate-500"
              title="إغلاق القائمة"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col gap-1 p-4">
            {links.map((link) => {
              const isActive = location.pathname === link.path || (link.path === "/dashboard" && location.pathname === "/dashboard/");
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    isActive ? activeClass : inactiveClass
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Return to Main Website Link */}
        <div className="p-4 border-t border-slate-100 mt-auto">
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-extrabold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-all border border-blue-100 hover:scale-102 hover:shadow-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            العودة للموقع الرئيسي
          </Link>
        </div>
      </div>
    </>
  );
}