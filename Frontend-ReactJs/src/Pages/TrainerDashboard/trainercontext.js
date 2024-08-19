import React, { createContext, useState, useEffect } from 'react';

export const TrainerContext = createContext();

export const TrainerProvider = ({ children }) => {
  const [trainer, setTrainer] = useState(() => {
    // Retrieve trainer data from localStorage if available
    const savedTrainer = localStorage.getItem('trainer');
    return savedTrainer ? JSON.parse(savedTrainer) : null;
  });

  useEffect(() => {
    if (trainer !== null) {
      localStorage.setItem('trainer', JSON.stringify(trainer));
    } else {
      localStorage.removeItem('trainer');
    }
  }, [trainer]);

  return (
    <TrainerContext.Provider value={{ trainer, setTrainer }}>
      {children}
    </TrainerContext.Provider>
  );
};
