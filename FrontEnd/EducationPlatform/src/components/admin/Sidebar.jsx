import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  const links = [
    { name: "الرئيسية", path: "/dashboard" },
    { name: "إدارة الكورسات", path: "/dashboard/addCourse" },
    { name: "الطلاب", path: "/dashboard/students" },
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
        className={`fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-xl transition-transform duration-300 md:translate-x-0 md:static md:z-auto md:shadow-md ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
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
    </>
  );
}