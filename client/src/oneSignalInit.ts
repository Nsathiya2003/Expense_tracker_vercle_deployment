// export const initializeOneSignal = () => {
//   return new Promise<void>((resolve, reject) => {
//     // Check if OneSignal is already loaded
//     if ((window as any).OneSignal && (window as any).OneSignal.push) {
//       resolve();
//       return;
//     }

//     // Dynamically load SDK
//     const script = document.createElement("script");
//     script.src = "https://cdn.onesignal.com/sdks/OneSignalSDK.js";
//     script.async = true;
//     script.onload = () => {
//       // Make sure OneSignal array exists
//       (window as any).OneSignal = (window as any).OneSignal || [];

//       // Initialize OneSignal
//       (window as any).OneSignal.push((OneSignal: any) => {
//         OneSignal.init({
//           appId: "ce1fye2c7-a8b6-448991-9fcb-7e08b13973044",
//           allowLocalhostAsSecureOrigin: true,
//           notifyButton: {
//             enable: true,
//             prenotify: true,
//             showCredit: false,
//             text: { subscribe: "Subscribe", unsubscribe: "Unsubscribe" },
//           },
//         });

//         OneSignal.showSlidedownPrompt();

//         OneSignal.on("subscriptionChange", (isSubscribed: boolean) => {
//           console.log("OneSignal subscription status:", isSubscribed);
//         });

//         resolve();
//       });
//     };
//     script.onerror = () => reject("Failed to load OneSignal SDK");

//     document.head.appendChild(script);
//   });
// };
