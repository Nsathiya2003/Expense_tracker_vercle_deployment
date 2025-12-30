import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AppProvider } from "./context/AppProvider.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/apiClient.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* We can create client provider for all main...*/}
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <App />
      </AppProvider>
    </QueryClientProvider>
  </StrictMode>
);

// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import type { Root } from "react-dom/client";
// import "./index.css";
// import App from "./App.tsx";
// import { AppProvider } from "./context/AppProvider.tsx";
// import { QueryClientProvider } from "@tanstack/react-query";
// import { queryClient } from "./api/apiClient.tsx";

// // Minimal OneSignal instance type
// interface OneSignalInstance {
//   init: (config: {
//     appId: string;
//     allowLocalhostAsSecureOrigin?: boolean;
//     notifyButton?: {
//       enable: boolean;
//       prenotify: boolean;
//       showCredit: boolean;
//       text: { subscribe: string; unsubscribe: string };
//     };
//   }) => void;
//   showSlidedownPrompt: () => void;
//   on: (event: string, callback: (isSubscribed: boolean) => void) => void;
// }

// // Extend window
// declare global {
//   interface Window {
//     OneSignal: Array<(oneSignal?: OneSignalInstance) => void>;
//   }
// }

// // Get the root element safely
// const container = document.getElementById("root");
// if (!container) throw new Error("Root container missing in index.html");

// const root: Root = createRoot(container);

// const startApp = () => {
//   // Function to initialize OneSignal
//   const initOneSignal = () => {
//     window.OneSignal = window.OneSignal || [];

//     window.OneSignal.push((oneSignal?: OneSignalInstance) => {
//       if (!oneSignal) return;

//       oneSignal.init({
//         appId: "ce1fe2c7-a8b6-4481-9fcb-7e08b1397344",
//         allowLocalhostAsSecureOrigin: true,
//         notifyButton: {
//           enable: true,
//           prenotify: true,
//           showCredit: false,
//           text: { subscribe: "Subscribe", unsubscribe: "Unsubscribe" },
//         },
//       });

//       oneSignal.showSlidedownPrompt();

//       oneSignal.on("subscriptionChange", (isSubscribed: boolean) => {
//         console.log("OneSignal subscription status:", isSubscribed);
//       });
//     });
//   };

//   // Wait for OneSignal SDK to fully load
//   const script = document.querySelector(
//     'script[src*="OneSignalSDK.js"]'
//   ) as HTMLScriptElement;

//   if (script) {
//     if (script.onload) {
//       initOneSignal();
//     } else {
//       script.addEventListener("load", initOneSignal);
//     }
//   } else {
//     console.error("OneSignal SDK script not found in index.html");
//   }

//   // Render React app
//   root.render(
//     <StrictMode>
//       <QueryClientProvider client={queryClient}>
//         <AppProvider>
//           <App />
//         </AppProvider>
//       </QueryClientProvider>
//     </StrictMode>
//   );
// };

// // Start app
// startApp();
