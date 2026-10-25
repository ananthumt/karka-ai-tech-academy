"use client";

import React, { createContext, useContext, useState } from "react";
import { EnrollModal } from "@/components/EnrollModal";

interface EnrollContextType {
  openEnroll: (courseName?: string) => void;
  closeEnroll: () => void;
}

const EnrollContext = createContext<EnrollContextType>({
  openEnroll: () => {},
  closeEnroll: () => {},
});

export const useEnrollModal = () => useContext(EnrollContext);

export const EnrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultCourse, setDefaultCourse] = useState("Full Stack Development");

  const openEnroll = (courseName?: string) => {
    if (courseName) setDefaultCourse(courseName);
    setIsOpen(true);
  };

  const closeEnroll = () => {
    setIsOpen(false);
  };

  return (
    <EnrollContext.Provider value={{ openEnroll, closeEnroll }}>
      {children}
      <EnrollModal
        isOpen={isOpen}
        onClose={closeEnroll}
        defaultProgram={defaultCourse}
      />
    </EnrollContext.Provider>
  );
};
