
import React, { createContext, useContext, useState, useEffect } from 'react';

interface TeamSelectionContextType {
  selectedTeamType: 'personal' | 'professional' | null;
  selectedPersonId: string | null;
  setTeamType: (type: 'personal' | 'professional') => void;
  setPersonId: (id: string) => void;
  clearSelection: () => void;
}

const TeamSelectionContext = createContext<TeamSelectionContextType | undefined>(undefined);

export const useTeamSelection = () => {
  const context = useContext(TeamSelectionContext);
  if (!context) {
    throw new Error('useTeamSelection must be used within a TeamSelectionProvider');
  }
  return context;
};

export const TeamSelectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedTeamType, setSelectedTeamType] = useState<'personal' | 'professional' | null>(null);
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null);

  useEffect(() => {
    const savedTeamType = localStorage.getItem('jour-j-team-type');
    const savedPersonId = localStorage.getItem('jour-j-person-id');
    
    if (savedTeamType) setSelectedTeamType(savedTeamType as 'personal' | 'professional');
    if (savedPersonId) setSelectedPersonId(savedPersonId);
  }, []);

  const setTeamType = (type: 'personal' | 'professional') => {
    setSelectedTeamType(type);
    localStorage.setItem('jour-j-team-type', type);
  };

  const setPersonId = (id: string) => {
    setSelectedPersonId(id);
    localStorage.setItem('jour-j-person-id', id);
  };

  const clearSelection = () => {
    setSelectedTeamType(null);
    setSelectedPersonId(null);
    localStorage.removeItem('jour-j-team-type');
    localStorage.removeItem('jour-j-person-id');
  };

  return (
    <TeamSelectionContext.Provider value={{
      selectedTeamType,
      selectedPersonId,
      setTeamType,
      setPersonId,
      clearSelection
    }}>
      {children}
    </TeamSelectionContext.Provider>
  );
};
