import twilio from "twilio";

const client = twilio(
    process.env.TWILIO_SID,
    process.env.TWILIO_AUTH_TOKEN
);

// 🔥 تنظيف الرقم
export const formatPhone = (phone) => {
    if (!phone) return "";

    phone = phone.toString().trim();

    if (phone.startsWith("+20")) return phone.slice(3);
    if (phone.startsWith("0020")) return phone.slice(4);
    if (phone.startsWith("0")) return phone.slice(1);

    return phone;
};

// 🔥 توحيد صيغة واتساب
export const toWhatsApp = (phone) => {
    if (!phone) return "";
    if (phone.startsWith("whatsapp:")) return phone;

    return `whatsapp:${phone}`;
};

// 🔥 إرسال رسالة
export const sendWhatsApp = async (to, message) => {
    try {
        await client.messages.create({
            from: process.env.TWILIO_WHATSAPP_NUMBER,
            to: toWhatsApp(to),
            body: message,
        });

        console.log("✅ WhatsApp sent");
    } catch (err) {
        console.error("❌ WhatsApp error:", err.message);
    }
};