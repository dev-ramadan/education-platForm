import { useState } from "react";
import Modal from "../common/Modal";
import { createEnrollment } from "../../api/enrollment.api";
import { useAuth } from "../../hooks/useAuth";

/**
 * SubscribeModal — مودال الاشتراك في الكورس
 */
export default function SubscribeModal({ isOpen, onClose, course }) {
  const { token } = useAuth();
  const [phone, setPhone] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!phone) return alert("الرجاء إدخال رقم الهاتف");
    
    // التحقق من أن رقم الهاتف مصري صحيح ومكون من 11 رقماً ويبدأ بـ 01
    const phoneRegex = /^01[0125][0-9]{8}$/;
    if (!phoneRegex.test(phone)) {
      return alert("يرجى إدخال رقم هاتف مصري صحيح مكون من 11 رقم ويبدأ بـ 01 (مثال: 01012345678)");
    }

    try {
      setBtnLoading(true);
      await createEnrollment({ phone, courseId: course.id }, token);
      alert("تم إرسال طلب الاشتراك بنجاح ✅");
      onClose();
      setPhone("");
      window.location.reload();
    } catch (err) {
      alert(err.message || "حصل خطأ");
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="glass p-8 rounded-3xl text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
          📱
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">تأكيد الاشتراك</h2>
        <p className="text-slate-500 mb-6 text-sm">
          يرجى إدخال رقم الهاتف المسجل لدينا لتأكيد دفع مبلغ {course?.price} ج.م
        </p>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border border-slate-200 p-4 rounded-xl mb-4 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-center text-lg tracking-widest"
          placeholder="01xxxxxxxxx"
          dir="ltr"
        />
        <button
          onClick={handleSubscribe}
          disabled={btnLoading}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:opacity-70 shadow-lg shadow-blue-600/30"
        >
          {btnLoading ? "جاري الإرسال..." : "تأكيد الطلب"}
        </button>
      </div>
    </Modal>
  );
}
