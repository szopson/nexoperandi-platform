'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import ChatBotEnhanced from './ChatBotEnhanced';
import { getTranslations, type Lang } from '@/lib/translations';

export default function ChatBotToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const pathname = usePathname();

  // Detect language from URL
  const lang: Lang = pathname.startsWith('/pl') ? 'pl' : 'en';
  const t = getTranslations(lang);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasNewMessage(false);
    }
  };

  return (
    <>
      <ChatBotEnhanced key={lang} isOpen={isOpen} onClose={() => setIsOpen(false)} lang={lang} />

      {/* Floating Chat Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center z-40 group"
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <>
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {hasNewMessage && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
            )}
          </>
        )}

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          {isOpen ? t.chatbot.tooltipClose : t.chatbot.tooltipOpen}
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
        </div>
      </button>

      {/* Pulsing Ring Animation */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 w-16 h-16 rounded-full z-30 pointer-events-none">
          <div className="absolute inset-0 bg-blue-600 rounded-full animate-ping opacity-20"></div>
        </div>
      )}
    </>
  );
}
