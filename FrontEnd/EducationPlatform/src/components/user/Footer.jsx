import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-slate-100 py-6 mt-auto w-full">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm font-bold">
        <div dir="rtl">
          <span>© {currentYear} </span>
          <Link to="/" className="text-blue-600 hover:text-indigo-600 transition-colors">
            EDUPLATFORM
          </Link>
          <span>. جميع الحقوق محفوظة.</span>
        </div>
        <div className="flex items-center gap-1.5" dir="ltr">
          <span>Created by</span>
          <span className="text-slate-800 font-extrabold hover:text-blue-600 transition-colors">
            Ramadan Mohamed
          </span>
          <span className="text-red-500 animate-pulse">❤️</span>
        </div>
      </div>
    </footer>
  );
}
