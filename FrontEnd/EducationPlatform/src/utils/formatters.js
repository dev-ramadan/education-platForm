/**
 * formatTime — تحويل الثواني إلى mm:ss
 */
export const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s < 10 ? "0" : ""}${s}`;
};

/**
 * formatDate — تنسيق التاريخ بالعربية
 */
export const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("ar-EG");
};

/**
 * getEnrollmentStatusLabel — تحويل حالة الاشتراك لنص عربي
 */
export const getEnrollmentStatusLabel = (status) => {
  const map = { all: "الكل", pending: "قيد المراجعة", active: "مقبول", rejected: "مرفوض" };
  return map[status] || status;
};

/**
 * getRoleLabel — تحويل الدور لنص عربي
 */
export const getRoleLabel = (role) => {
  const map = { admin: "مدير النظام", instructor: "معلم", student: "طالب" };
  return map[role] || "مستخدم";
};
