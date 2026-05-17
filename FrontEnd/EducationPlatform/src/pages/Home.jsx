import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-slate-50 overflow-hidden" dir="rtl">
      
      {/* Decorative Backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      {/* Hero Section */}
      <div className="relative z-10 pt-32 pb-16 px-4 text-center max-w-5xl mx-auto animate-slide-up">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-slate-800 mb-6 leading-tight">
          ارتقِ بمهاراتك مع <br className="md:hidden" />
          <span className="text-gradient">أفضل منصة تعليمية</span>
        </h1>
        
        <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          انضم لآلاف الطلاب وابدأ رحلتك في التعلم عن بُعد بأعلى جودة وتفاعل مباشر مع أفضل المحاضرين.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/courses" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all text-lg w-full sm:w-auto">
            تصفح الكورسات
          </Link>
          <Link to="/register" className="px-8 py-4 bg-white text-blue-600 font-bold rounded-2xl shadow-md border border-slate-200 hover:bg-slate-50 hover:scale-105 transition-all text-lg w-full sm:w-auto">
            انضم إلينا الآن
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="relative z-10 grid md:grid-cols-3 gap-8 mt-16 px-6 max-w-6xl mx-auto pb-24">
        {[
          { title: "كورسات تفاعلية", desc: "محتوى علمي مميز ومصمم خصيصاً ليناسب سوق العمل.", icon: "📚" },
          { title: "امتحانات مستمرة", desc: "اختبر نفسك بعد كل درس وتأكد من استيعابك للمعلومات.", icon: "📝" },
          { title: "شهادات معتمدة", desc: "احصل على شهادة بعد اجتيازك للكورس بنجاح لتعزز سيرتك.", icon: "🎓" }
        ].map((item, index) => (
          <div 
            key={item.title} 
            className="glass p-8 rounded-3xl hover-scale animate-slide-up text-center border-t-4 border-t-blue-500"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="text-5xl mb-4">{item.icon}</div>
            <h3 className="font-extrabold text-2xl mb-3 text-slate-800">{item.title}</h3>
            <p className="text-slate-600 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}