import { getToken } from "firebase/messaging";
import { messaging } from "./firebase";

export const requestPermission = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey: "BHN0rBYE1TT9NBNnlpyhCRP5pJEzmBpHKfq-a3zmmyyPjFbjRHEN0G7QtCve6belVw2UQs29C4UPR2OAXsxSy_w",
    });

    console.log("FCM TOKEN:", token);
    return token;
  } catch (error) {
    console.log("Error getting token:", error);
  }
};