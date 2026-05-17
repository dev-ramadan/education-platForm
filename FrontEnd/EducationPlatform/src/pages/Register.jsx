import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../api/config";
export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/auth/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        alert("تم إنشاء الحساب بنجاح 🎉");
        navigate("/login");
      } else {
        alert(data.message || "خطأ في إنشاء الحساب");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      alert("مشكلة في الاتصال بالخادم");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden" dir="rtl">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="glass p-8 rounded-2xl w-full max-w-md z-10 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">إنشاء حساب جديد</h1>
          <p className="text-slate-500">انضم لمنصتنا التعليمية وابدأ التعلم الآن</p>
        </div>

        <form onSubmit={register} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">الاسم الكامل</label>
            <input
              name="name"
              placeholder="محمد أحمد"
              required
              className="w-full border border-slate-200 p-3 rounded-xl bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">البريد الإلكتروني</label>
            <input
              name="email"
              type="email"
              placeholder="email@example.com"
              required
              className="w-full border border-slate-200 p-3 rounded-xl bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-left"
              dir="ltr"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">كلمة المرور</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              required
              className="w-full border border-slate-200 p-3 rounded-xl bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-left"
              dir="ltr"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-xl font-bold hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-70 disabled:hover:scale-100"
          >
            {loading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
          </button>
        </form>

        <p className="text-center mt-6 text-slate-600">
          لديك حساب بالفعل؟ {" "}
          <Link to="/login" className="text-blue-600 font-bold hover:underline">
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  );
}
