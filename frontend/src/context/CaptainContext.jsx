import { createContext, useState, useEffect } from 'react';

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(() => {
    
    const storedCaptain = localStorage.getItem('captain');
    return storedCaptain ? JSON.parse(storedCaptain) : null;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateCaptain = (captainData) => {
    setCaptain(captainData);
    localStorage.setItem('captain', JSON.stringify(captainData)); 
  };


  useEffect(() => {
    if (captain) {
      localStorage.setItem('captain', JSON.stringify(captain));
    }
  }, [captain]);

  const value = {
    captain,
    setCaptain,
    isLoading,
    setIsLoading,
    error,
    setError,
    updateCaptain,
  };

  return (
    <CaptainDataContext.Provider value={value}>
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainContext;
