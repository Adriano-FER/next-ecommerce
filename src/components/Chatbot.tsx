"use client";
import React, {useRef, useEffect, useState } from "react";

const LAND_BOT_URL = "https://storage.googleapis.com/landbot.online/v3/H-2664531-44OXXLSH7QNW87OM/index.json"; // Update to your URL

export default function MyLandbot() {
  const [isOpen, setIsOpen] = useState(false);
  let myLandbot = useRef(null); // Store Landbot instance

  useEffect(() => {
    const initLandbot = () => {
      if (!myLandbot.current) {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.addEventListener("load", () => {
          myLandbot.current = new window.Landbot.Livechat({
            configUrl: LAND_BOT_URL,
          });
        });
        script.src = "https://cdn.landbot.io/landbot-3/landbot-3.0.0.js";
        document.body.appendChild(script);
      }
    };

    // Load Landbot only on the first user interaction
    window.addEventListener("mouseover", initLandbot, { once: true });
    window.addEventListener("touchstart", initLandbot, { once: true });

    return () => {
      window.removeEventListener("mouseover", initLandbot);
      window.removeEventListener("touchstart", initLandbot);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-5 right-5 w-80 bg-white border border-gray-300 rounded-lg shadow-lg transition-transform duration-300 ${isOpen ? "transform-none" : "transform translate-y-full"}`}
    >
        <h2 className="font-semibold">Chatbot</h2>
    </div>
  );
}
