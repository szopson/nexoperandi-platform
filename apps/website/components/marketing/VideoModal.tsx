"use client";

import { useEffect } from "react";
import { useModal } from "@/context/ModalContext";

const YOUTUBE_ID = "vHOyG3RncXk";

export default function VideoModal() {
  const { activeModal, closeDemoVideo } = useModal();
  const isOpen = activeModal === "demoVideo";

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeDemoVideo();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeDemoVideo]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-backdrop-fade-in"
      style={{ background: "rgba(0, 0, 0, 0.9)", backdropFilter: "blur(8px)" }}
      onClick={closeDemoVideo}
    >
      {/* Close button */}
      <button
        onClick={closeDemoVideo}
        className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        aria-label="Close video"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" x2="6" y1="6" y2="18" />
          <line x1="6" x2="18" y1="6" y2="18" />
        </svg>
      </button>

      {/* Video container */}
      <div
        className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden animate-modal-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0`}
          title="NexOperandi Demo"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
