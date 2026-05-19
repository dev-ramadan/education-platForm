import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../api/config";
import { toast } from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        const userData = {
          name: data.data.name,
          email: data.data.email,
          role: data.data.role
        };
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(userData));

        toast.success("تم تسجيل الدخول بنجاح 🎉");

        if (data.data?.role === "admin" || data.data?.role === "instructor") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      } else {
        toast.error(data.message || "خطأ في تسجيل الدخول");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("مشكلة في الاتصال بالخادم");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden" dir="rtl">
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      <div className="absolute top-[10%] right-[-10%] w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>

      <div className="glass p-8 rounded-2xl w-full max-w-md z-10 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">مرحباً بعودتك</h1>
          <p className="text-slate-500">سجل دخولك لمتابعة تقدمك التعليمي</p>
        </div>

        <form onSubmit={login} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">البريد الإلكتروني</label>
            <input name="email" type="email" placeholder="email@example.com" required className="w-full border border-slate-200 p-3 rounded-xl bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-left" dir="ltr" onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">كلمة المرور</label>
            <input name="password" type="password" placeholder="••••••••" required className="w-full border border-slate-200 p-3 rounded-xl bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-left" dir="ltr" onChange={handleChange} />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-70">{loading ? "جاري الدخول..." : "تسجيل الدخول"}</button>
        </form>
        <p className="text-center mt-6 text-slate-600">ليس لديك حساب؟ <Link to="/register" className="text-indigo-600 font-bold hover:underline">إنشاء حساب</Link></p>
      </div>
    </div>
  );
}