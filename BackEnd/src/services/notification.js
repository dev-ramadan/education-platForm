import admin from "../../firebase.js";

export const sendNotification = async (token, title, body, data = {}) => {
  if (!token) return;

  return await admin.messaging().send({
    token,
    notification: {
      title,
      body,
    },
    data: {
      ...data,
    },
  });
};