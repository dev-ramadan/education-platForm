import twilio from "twilio";

const client = twilio(
    process.env.TWILIO_SID,
    process.env.TWILIO_AUTH_TOKEN
);

// 🔥 تنظيف الرقم (للـ DB فقط)
export const formatPhone = (phone) => {
    if (!phone) return "";

    // 1. تحويل النص وإبقاء الأرقام فقط
    let cleaned = phone.toString().replace(/\D/g, "");

    // 2. معالجة حالة البدء بـ 0020
    if (cleaned.startsWith("0020")) {
        cleaned = cleaned.slice(2);
    }

    // 3. معالجة الأرقام المصرية التي تبدأ بـ 01 (طولها 11 رقم: مثل 01012345678)
    if (cleaned.startsWith("01") && cleaned.length === 11) {
        cleaned = "20" + cleaned.slice(1);
    }
    // 4. معالجة الأرقام المصرية التي تبدأ بـ 1 (طولها 10 أرقام: مثل 1012345678)
    else if ((cleaned.startsWith("10") || cleaned.startsWith("11") || cleaned.startsWith("12") || cleaned.startsWith("15")) && cleaned.length === 10) {
        cleaned = "20" + cleaned;
    }
    // 5. إذا كان الرقم يبدأ بالفعل بـ 20 وطوله 12 رقمًا (تنسيق صحيح بالرمز الدولي)
    else if (cleaned.startsWith("20") && cleaned.length === 12) {
        // تنسيق صحيح بالفعل
    }
    // احتياطي (Fallback) لأي تنسيقات أخرى
    else {
        if (cleaned.startsWith("0")) {
            cleaned = cleaned.slice(1);
        }
        if (!cleaned.startsWith("20")) {
            cleaned = "20" + cleaned;
        }
    }

    return cleaned;
};

// 🔥 تحويله لصيغة WhatsApp (للإرسال فقط)
export const toWhatsApp = (phone) => {
    if (!phone) return "";
    const cleaned = formatPhone(phone);
    return `whatsapp:+${cleaned}`;
};
// 🔥 إرسال الرسالة
export const sendWhatsApp = async (to, message) => {
    try {
        const res = await client.messages.create({
            from: process.env.TWILIO_WHATSAPP_NUMBER,
            to: toWhatsApp(to), // التحويل هنا فقط
            body: message,
        });

        console.log("✅ WhatsApp sent:", res.sid);
    } catch (err) {
        console.error("❌ WhatsApp error:", err.message);
    }
};