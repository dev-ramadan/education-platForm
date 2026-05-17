export default function Topbar({ onMenuToggle }) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="bg-white border-b border-slate-100 px-6 py-4 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-4">
        {/* Hamburger Menu Icon */}
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-xl hover:bg-slate-100 md:hidden text-slate-600 focus:outline-none"
          title="افتح القائمة"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h2 className="text-xl font-black text-slate-800 hidden sm:block">لوحة التحكم</h2>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="font-bold text-slate-800 text-sm">{user.name || "المسؤول"}</p>
          <p className="text-xs text-slate-400">حساب {user.role === "admin" ? "مسؤول" : "معلم"}</p>
        </div>
        <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
          {user.name?.charAt(0) || "A"}
        </div>
      </div>
    </div>
  );
}