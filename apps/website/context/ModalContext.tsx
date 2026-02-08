"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type ModalType = "quiz" | "exitIntent" | "demoVideo" | null;

interface ModalContextType {
  activeModal: ModalType;
  openQuiz: () => void;
  closeQuiz: () => void;
  openExitIntent: () => void;
  closeExitIntent: () => void;
  openDemoVideo: () => void;
  closeDemoVideo: () => void;
  closeAll: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const openQuiz = useCallback(() => {
    setActiveModal("quiz");
  }, []);

  const closeQuiz = useCallback(() => {
    if (activeModal === "quiz") {
      setActiveModal(null);
    }
  }, [activeModal]);

  const openExitIntent = useCallback(() => {
    // Only open exit intent if no other modal is active
    if (activeModal === null) {
      setActiveModal("exitIntent");
    }
  }, [activeModal]);

  const closeExitIntent = useCallback(() => {
    if (activeModal === "exitIntent") {
      setActiveModal(null);
    }
  }, [activeModal]);

  const openDemoVideo = useCallback(() => {
    setActiveModal("demoVideo");
  }, []);

  const closeDemoVideo = useCallback(() => {
    if (activeModal === "demoVideo") {
      setActiveModal(null);
    }
  }, [activeModal]);

  const closeAll = useCallback(() => {
    setActiveModal(null);
  }, []);

  return (
    <ModalContext.Provider
      value={{
        activeModal,
        openQuiz,
        closeQuiz,
        openExitIntent,
        closeExitIntent,
        openDemoVideo,
        closeDemoVideo,
        closeAll,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
