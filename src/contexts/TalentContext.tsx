"use client"
import React, { createContext, useContext, useState } from 'react';

const TalentContext = createContext<any>(null);

export const TalentProvider = ({ children }: { children: React.ReactNode }) => {
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);

  return (
    <TalentContext.Provider value={{ education, setEducation, experience, setExperience }}>
      {children}
    </TalentContext.Provider>
  );
};

export const useTalent = () => useContext(TalentContext);
