import twilio from "twilio";

const client = twilio(
    process.env.TWILIO_SID,
    process.env.TWILIO_AUTH_TOKEN
);

// 🔥 تنظيف الرقم (للـ DB فقط)
export const formatPhone = (phone) => {
    if (!phone) return "";

    phone = phone.toString().replace(/\D/g, "");

    // لو الرقم فيه +20 أو 20 مسبقًا
    if (phone.startsWith("20")) {
        return phone;
    }

    // لو مصري 0
    if (phone.startsWith("0")) {
        phone = phone.slice(1);
    }

    return "20" + phone;
};

// 🔥 تحويله لصيغة WhatsApp (للإرسال فقط)
export const toWhatsApp = (phone) => {
    if (!phone) return "";

    phone = phone.toString().replace(/\D/g, "");

    if (phone.startsWith("0")) {
        phone = phone.slice(1);
    }

    if (!phone.startsWith("20")) {
        phone = "20" + phone;
    }

    return `whatsapp:+${phone}`;
};

// 🔥 إرسال الرسالة
export const sendWhatsApp = async (to, message) => {
    try {
        const formattedTo = toWhatsApp(to);

        const res = await client.messages.create({
            from: process.env.TWILIO_WHATSAPP_NUMBER,
            to: formattedTo,
            body: message,
        });

        console.log("✅ WhatsApp sent:", res.sid);
    } catch (err) {
        console.error("❌ WhatsApp error:", err.message);
    }
};