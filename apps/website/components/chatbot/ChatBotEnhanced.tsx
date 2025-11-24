'use client';

import { useState, useRef, useEffect } from 'react';
import { getTranslations, type Lang } from '@/lib/translations';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  callToAction?: {
    show: boolean;
    buttons: Array<{
      label: string;
      action: string;
    }>;
  };
}

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: Lang;
}

interface LeadInfo {
  name: string;
  email: string;
}

export default function ChatBotEnhanced({ isOpen, onClose, lang = 'en' }: ChatBotProps) {
  const t = getTranslations(lang);

  const getInitialMessage = (): Message => ({
    role: 'assistant',
    content: t.chatbot.welcomeMessage,
    timestamp: new Date(),
    callToAction: {
      show: true,
      buttons: [
        { label: t.chatbot.quickActions.services, action: "services" },
        { label: t.chatbot.quickActions.pricing, action: "pricing" },
        { label: t.chatbot.quickActions.book, action: "book" }
      ]
    }
  });

  const [messages, setMessages] = useState<Message[]>([getInitialMessage()]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `session-${Date.now()}-${Math.random().toString(36).substring(7)}`);
  const [leadInfo, setLeadInfo] = useState<LeadInfo>({ name: '', email: '' });
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [leadScore, setLeadScore] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleQuickAction = (action: string) => {
    const actionMessages: Record<string, string> = {
      services: t.chatbot.actionMessages.services,
      pricing: t.chatbot.actionMessages.pricing,
      book: t.chatbot.actionMessages.book,
      get_quote: t.chatbot.actionMessages.pricing,
      show_services: t.chatbot.actionMessages.services
    };

    const message = actionMessages[action] || action;
    setInputMessage(message);
    // Auto-send after a brief delay to show the message appearing
    setTimeout(() => {
      sendMessage(new Event('submit') as any, message);
    }, 100);
  };

  const sendMessage = async (e: React.FormEvent, prefilledMessage?: string) => {
    e.preventDefault();

    const messageToSend = prefilledMessage || inputMessage;
    if (!messageToSend.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: messageToSend,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Prepare conversation history
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      }));

      const response = await fetch('/api/chatbot-enhanced', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageToSend,
          sessionId,
          conversationHistory,
          userId: 'web-visitor',
          userName: leadInfo.name || '',
          userEmail: leadInfo.email || '',
        }),
      });

      const data = await response.json();

      if (data.success) {
        const assistantMessage: Message = {
          role: 'assistant',
          content: data.response,
          timestamp: new Date(),
          callToAction: data.callToAction
        };
        setMessages(prev => [...prev, assistantMessage]);

        // Update lead score if provided
        if (data.leadIntelligence?.score) {
          setLeadScore(data.leadIntelligence.score);
        }

        // Show lead capture if requested and not already provided
        if (data.requestContactInfo && !leadInfo.email) {
          setShowLeadCapture(true);
        }
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: t.chatbot.errorMessage,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeadCapture = () => {
    if (leadInfo.name && leadInfo.email) {
      setShowLeadCapture(false);
      // Send a message to continue the conversation
      const thanksMessage: Message = {
        role: 'assistant',
        content: t.chatbot.leadCapture.thanks.replace('{name}', leadInfo.name),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, thanksMessage]);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(lang === 'pl' ? 'pl-PL' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200 animate-slide-up">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">
            🤖
          </div>
          <div>
            <h3 className="font-semibold text-lg">{t.chatbot.headerTitle}</h3>
            <div className="flex items-center gap-2 text-xs text-blue-100">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>{t.chatbot.online} • {t.chatbot.aiPowered}</span>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
          aria-label="Close chat"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Lead Score Indicator - hidden from customers, only for internal use */}
      {/* {leadScore !== null && leadScore >= 70 && (
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 text-xs font-semibold text-center">
          🔥 {t.chatbot.hotLead}: {leadScore}/100
        </div>
      )} */}

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message, index) => (
          <div key={index} className="animate-fade-in">
            <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-sm'
                    : 'bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                <span
                  className={`text-xs mt-1 block ${
                    message.role === 'user' ? 'text-blue-100' : 'text-gray-400'
                  }`}
                >
                  {formatTime(message.timestamp)}
                </span>
              </div>
            </div>

            {/* Call to Action Buttons */}
            {message.callToAction?.show && message.callToAction.buttons.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2 ml-1">
                {message.callToAction.buttons.map((button, btnIndex) => (
                  <button
                    key={btnIndex}
                    onClick={() => handleQuickAction(button.action)}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xs px-4 py-2 rounded-full transition-all transform hover:scale-105 shadow-md"
                  >
                    {button.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start animate-fade-in">
            <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-gray-100">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Lead Capture Form (Conditional) */}
      {showLeadCapture && !leadInfo.email && (
        <div className="px-4 py-3 bg-blue-50 border-t border-blue-200">
          <p className="text-xs text-gray-700 mb-2 font-semibold">
            {t.chatbot.leadCapture.title}
          </p>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder={t.chatbot.leadCapture.namePlaceholder}
              value={leadInfo.name}
              onChange={(e) => setLeadInfo({ ...leadInfo, name: e.target.value })}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder={t.chatbot.leadCapture.emailPlaceholder}
              value={leadInfo.email}
              onChange={(e) => setLeadInfo({ ...leadInfo, email: e.target.value })}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleLeadCapture}
              disabled={!leadInfo.name || !leadInfo.email}
              className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t.chatbot.leadCapture.continueButton}
            </button>
          </div>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={sendMessage} className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={t.chatbot.placeholder}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputMessage.trim()}
            className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[48px]"
            aria-label="Send message"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        <div className="flex items-center justify-center mt-2">
          <p className="text-xs text-gray-400">
            {t.chatbot.poweredBy}
          </p>
        </div>
      </form>
    </div>
  );
}
