// src/contexts/LoadingContext.jsx
'use client';

import React, { createContext, useContext, useState } from 'react';

const LoadingContext = createContext();

export const useLoading = () => {
  return useContext(LoadingContext);
};

export const LoadingProvider = ({ children }) => {
  const [loadingStates, setLoadingStates] = useState({});

  const setLoading = (route, isLoading) => {
    setLoadingStates(prev => ({ ...prev, [route]: isLoading }));
  };

  const value = {
    loadingStates,
    setLoading,
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
};