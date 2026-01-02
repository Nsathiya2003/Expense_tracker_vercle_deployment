// // // getFCMToken.ts
// // import { getToken } from "firebase/messaging";
// // import { messaging } from "./firebase"; // modular firebase config

// // export const getFCMToken = async (): Promise<string | null> => {
// //   try {
// //     const permission = await Notification.requestPermission();
// //     if (permission !== "granted") {
// //       console.log("User denied notifications");
// //       return null;
// //     }

// //     // Register SW from public folder
// //     const registration = await navigator.serviceWorker.register(
// //       "/firebase-messaging-sw.js"
// //     );

// //     const token = await getToken(messaging, {
// //       vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
// //       serviceWorkerRegistration: registration,
// //     });

// //     console.log("FCM token:", token);
// //     return token;
// //   } catch (err) {
// //     console.error("FCM token error:", err);
// //     return null;
// //   }
// // };
// import { getToken } from "firebase/messaging";
// import { messaging } from "./firebase";

// export const getFCMToken = async (): Promise<string | null> => {
//   try {
//     if (!("serviceWorker" in navigator)) return null;

//     const permission = await Notification.requestPermission();
//     if (permission !== "granted") return null;

//     const registration = await navigator.serviceWorker.register(
//       "/firebase-messaging-sw.js",
//       { type: "classic" } // 🔥 REQUIRED FOR VITE
//     );

//     const token = await getToken(messaging, {
//       vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
//       serviceWorkerRegistration: registration,
//     });

//     console.log("FCM Token:", token);
//     return token;
//   } catch (error) {
//     console.error("FCM token error:", error);
//     return null;
//   }
// };
