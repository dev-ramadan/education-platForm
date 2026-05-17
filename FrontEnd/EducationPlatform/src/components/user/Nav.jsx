import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    setIsLoggedIn(!!token);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error parsing stored user:", e);
      }
    }
  }, []);

  const links = [
    { name: "الرئيسية", path: "/" },
    { name: "الكورسات", path: "/courses" },
    { name: "من نحن", path: "/about" },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm fixed w-full top-0 z-[100]" dir="rtl">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link to="/" className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            EDU<span className="text-slate-800">PLATFORM</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-slate-600 font-bold hover:text-blue-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                {(user?.role === "admin" || user?.role === "instructor") && (
                  <Link to="/dashboard" className="text-indigo-600 font-black flex items-center gap-2 hover:bg-indigo-50 px-4 py-2 rounded-xl transition-all">
                    <span>📊</span> لوحة التحكم
                  </Link>
                )}
                <Link to="/profile" className="text-blue-600 font-black flex items-center gap-2 hover:bg-blue-50 px-4 py-2 rounded-xl transition-all">
                  <span>👤</span> ملفي الشخصي
                </Link>
              </div>
            ) : (
              <Link to="/login" className="text-slate-600 font-bold hover:text-blue-600 transition-colors">
                تسجيل الدخول
              </Link>
            )}
          </div>

          {/* Button */}
          <div className="hidden md:block">
            <Link to={isLoggedIn ? "/courses" : "/register"} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all inline-block">
              {isLoggedIn ? "تعلم الآن" : "ابدأ الآن"}
            </Link>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button onClick={() => setOpen(!open)} className="text-slate-600 focus:outline-none">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t animate-fade-in">
          <div className="flex flex-col px-4 py-6 space-y-4">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setOpen(false)}
                className="text-slate-700 font-bold hover:text-blue-600"
              >
                {link.name}
              </Link>
            ))}
            
            {isLoggedIn && (
              <>
                {(user?.role === "admin" || user?.role === "instructor") && (
                  <Link to="/dashboard" onClick={() => setOpen(false)} className="text-indigo-600 font-bold flex items-center gap-2">
                    <span>📊</span> لوحة التحكم
                  </Link>
                )}
                <Link to="/profile" onClick={() => setOpen(false)} className="text-blue-600 font-bold flex items-center gap-2">
                  <span>👤</span> ملفي الشخصي
                </Link>
              </>
            )}

            {!isLoggedIn && (
              <Link to="/login" onClick={() => setOpen(false)} className="text-slate-700 font-bold">
                تسجيل الدخول
              </Link>
            )}

            <Link to={isLoggedIn ? "/courses" : "/register"} onClick={() => setOpen(false)} className="bg-blue-600 text-white px-4 py-3 rounded-xl font-bold text-center">
              {isLoggedIn ? "تعلم الآن" : "ابدأ الآن"}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}