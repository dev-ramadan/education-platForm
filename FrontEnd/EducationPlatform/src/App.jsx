import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { router } from "../route";
import { requestPermission } from "./firebase/messaging";
import { BASE_URL } from "./api/config";

function App() {

useEffect(() => {

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then((registration) => {
        console.log("SW registered ✔", registration);
      })
      .catch((err) => {
        console.log("SW error:", err);
      });
  }

  const init = async () => {
    const token = await requestPermission();

    if (token) {
      const authToken = localStorage.getItem("token");

      await fetch(`${BASE_URL}/api/save-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`
        },
        body: JSON.stringify({
          token,
        }),
      });
    }
  };

  init();

}, []);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;