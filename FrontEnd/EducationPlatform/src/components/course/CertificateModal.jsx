import Modal from "../common/Modal";

/**
 * CertificateModal — مودال الشهادة عند اكتمال الكورس
 */
export default function CertificateModal({ isOpen, onClose, course, instructor }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-4xl">
      <div className="bg-white p-12 rounded-3xl w-full relative shadow-2xl border-[16px] border-double border-yellow-600 text-center overflow-hidden">
        {/* Background Pattern */}
        <div
          className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-radial-gradient(circle at 0 0, transparent 0, #e9a823 40px), repeating-linear-gradient(#fff, #fff)",
          }}
        />
        <div className="relative z-10">
          <div className="text-6xl mb-6">🎓</div>
          <h1
            className="text-5xl font-black text-slate-800 mb-8"
            style={{ fontFamily: "serif" }}
          >
            شهادة إتمام كورس
          </h1>
          <p className="text-2xl text-slate-600 mb-6">
            يُشهد بأن المتدرب قد أتم بنجاح دراسة الكورس التدريبي:
          </p>
          <h2 className="text-4xl font-black text-indigo-700 mb-10">"{course?.title}"</h2>
          <p className="text-xl text-slate-600 mb-12">
            بواقع إنجاز 100% من المحتوى التعليمي، واجتياز الامتحانات بنجاح.
          </p>
          <div className="flex justify-between items-end border-t-2 border-slate-200 pt-8 mt-12 px-12">
            <div>
              <p className="font-bold text-slate-800 text-xl mb-2">
                {instructor?.name || "المحاضر"}
              </p>
              <p className="text-slate-500">توقيع المحاضر</p>
            </div>
            <div>
              <div className="w-32 h-32 bg-yellow-500 rounded-full flex items-center justify-center text-white font-black text-2xl shadow-inner border-4 border-yellow-600 mx-auto transform -rotate-12">
                معتمد
              </div>
            </div>
            <div>
              <p className="font-bold text-slate-800 text-xl mb-2">
                {new Date().toLocaleDateString("ar-EG")}
              </p>
              <p className="text-slate-500">تاريخ الإصدار</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
