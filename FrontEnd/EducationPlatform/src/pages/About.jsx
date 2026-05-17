import { Link } from "react-router-dom";

export default function About() {
  const stats = [
    { number: "+10,000", label: "طالب نشط", icon: "👨‍🎓" },
    { number: "+50", label: "كورس تخصصي", icon: "📚" },
    { number: "99%", label: "نسبة رضا الطلاب", icon: "⭐" },
    { number: "24/7", label: "دعم ومتابعة مستمرة", icon: "💬" },
  ];

  const values = [
    {
      title: "التميز والجودة",
      description: "نحرص على تقديم محتوى تعليمي بأعلى معايير الدقة والاحترافية والسهولة.",
      icon: "💎",
    },
    {
      title: "التعلم التفاعلي",
      description: "نؤمن بأن الممارسة وحل الاختبارات ومتابعة الفيديوهات التفاعلية هي أساس الفهم.",
      icon: "🎯",
    },
    {
      title: "الدعم المتواصل",
      description: "نحن بجانب طلابنا خطوة بخطوة للإجابة عن استفساراتهم وتقديم الدعم الفني والأكاديمي.",
      icon: "🤝",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 relative overflow-hidden" dir="rtl">
      {/* الخلفية الديكورية الدائرية */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none"></div>

      {/* 1. Hero Section */}
      <div className="max-w-6xl mx-auto px-4 text-center mb-20 relative z-10">
        <span className="text-sm font-black text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 inline-block">
          من نحن
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-800 leading-tight mb-6">
          نسعى لبناء الجيل القادم من <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            الرواد والمهنيين المبدعين
          </span>
        </h1>
        <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          منصة تعليمية متكاملة تهدف لتقديم أفضل الكورسات التفاعلية بطرق علمية مبسطة، تساعد الطلاب والمحترفين على التفوق والنجاح العملي.
        </p>
      </div>

      {/* 2. Stats Section */}
      <div className="max-w-6xl mx-auto px-4 mb-24 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-slate-100 shadow-sm text-center transform hover:scale-[1.03] transition-all duration-300"
            >
              <div className="text-3xl mb-3">{stat.icon}</div>
              <h3 className="text-3xl font-black text-slate-800 mb-1">{stat.number}</h3>
              <p className="text-slate-500 font-bold text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Vision & Mission Section */}
      <div className="max-w-6xl mx-auto px-4 mb-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-8 md:p-12 rounded-3xl shadow-xl shadow-blue-500/10 flex flex-col justify-between">
            <div>
              <div className="text-4xl mb-6">👁️</div>
              <h2 className="text-3xl font-black mb-4">رؤيتنا</h2>
              <p className="text-blue-50/90 text-lg leading-relaxed mb-6">
                أن نكون المنصة التعليمية الرائدة والأولى في الشرق الأوسط التي تقدم تجربة تفاعلية متطورة وسهلة المنال لكل طالب علم، لتمكينه من مواكبة العصر الرقمي الحديث والتميز الدراسي.
              </p>
            </div>
            <div className="border-t border-white/20 pt-6 mt-6 flex justify-between items-center text-sm font-bold text-blue-100">
              <span>رؤية مستقبلية طموحة</span>
              <span>2026 - 2030</span>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="text-4xl mb-6">🚀</div>
              <h2 className="text-3xl font-black text-slate-800 mb-4">رسالتنا</h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-6">
                تبسيط المعرفة وإتاحة فرص تعليمية حقيقية عالية الجودة عن طريق ربط الفيديوهات النظرية بالتطبيقات العملية والاختبارات الفورية المستمرة، وتوفير محتوى هادف يبني الفهم لا الحفظ والتلقين.
              </p>
            </div>
            <div className="border-t border-slate-100 pt-6 mt-6 flex justify-between items-center text-sm font-bold text-slate-400">
              <span>رسالة إنسانية وعلمية</span>
              <span>هدفنا هو تميزك</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Values Section */}
      <div className="max-w-6xl mx-auto px-4 mb-24 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-slate-800 mb-4">القيم التي تحركنا</h2>
          <p className="text-slate-500">نلتزم بمجموعة من القيم الراسخة لضمان تقديم أفضل تجربة تعليمية</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((val, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-2xl font-bold mb-6">
                {val.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{val.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm">{val.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. CTA Section */}
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <div className="bg-white/80 backdrop-blur-md p-10 md:p-16 rounded-3xl border border-slate-100 shadow-lg">
          <h2 className="text-3xl font-black text-slate-800 mb-4">هل أنت جاهز لبدء مغامرتك التعليمية؟</h2>
          <p className="text-slate-500 mb-8 max-w-lg mx-auto text-base">
            انضم الآن إلى آلاف الطلاب الذين غيروا مسار حياتهم الدراسي والمهني للأفضل من خلال منصتنا.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/courses"
              className="bg-blue-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-700 hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              🚀 تصفح الكورسات المتاحة
            </Link>
            <Link
              to="/register"
              className="bg-slate-100 text-slate-700 font-bold px-8 py-4 rounded-xl hover:bg-slate-200 transition-all"
            >
              ✨ إنشاء حساب مجاني
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}