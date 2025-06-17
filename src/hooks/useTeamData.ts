
import { useState, useEffect } from 'react';
import { PersonMember, Vendor, Task, Document, EventConfig } from './useAdminData';
import { useTeamSelection } from '@/contexts/TeamSelectionContext';

const useTeamData = () => {
  const [people, setPeople] = useState<PersonMember[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [eventConfig, setEventConfig] = useState<EventConfig | null>(null);
  const [loading, setLoading] = useState(true);
  
  const { selectedPersonId, selectedTeamType } = useTeamSelection();

  // Load data from localStorage with auto-refresh
  const loadData = () => {
    try {
      const savedPeople = localStorage.getItem('jour-j-people');
      const savedVendors = localStorage.getItem('jour-j-vendors');
      const savedTasks = localStorage.getItem('jour-j-tasks');
      const savedDocuments = localStorage.getItem('jour-j-documents');
      const savedEventConfig = localStorage.getItem('jour-j-event-config');

      if (savedPeople) setPeople(JSON.parse(savedPeople));
      if (savedVendors) setVendors(JSON.parse(savedVendors));
      if (savedTasks) setTasks(JSON.parse(savedTasks));
      if (savedDocuments) setDocuments(JSON.parse(savedDocuments));
      if (savedEventConfig) setEventConfig(JSON.parse(savedEventConfig));
      
      setLoading(false);
    } catch (error) {
      console.error('Error loading team data:', error);
      setLoading(false);
    }
  };

  // Initial load and auto-refresh every 30 seconds
  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Get tasks assigned to current user
  const getUserTasks = () => {
    if (!selectedPersonId) return [];
    
    return tasks.filter(task => {
      if (selectedTeamType === 'personal') {
        return task.assignedTo.includes(selectedPersonId);
      } else {
        return task.assignedVendors.includes(selectedPersonId);
      }
    });
  };

  // Get documents assigned to current user
  const getUserDocuments = () => {
    if (!selectedPersonId) return [];
    
    return documents.filter(doc => {
      if (doc.permission === 'public') return true;
      if (doc.permission === 'team') return true;
      
      if (selectedTeamType === 'personal') {
        return doc.assignedTo.includes(selectedPersonId);
      } else {
        return doc.assignedVendors.includes(selectedPersonId);
      }
    });
  };

  // Get current user info
  const getCurrentUser = () => {
    if (!selectedPersonId) return null;
    
    if (selectedTeamType === 'personal') {
      return people.find(p => p.id === selectedPersonId);
    } else {
      return vendors.find(v => v.id === selectedPersonId);
    }
  };

  // Calculate user progress
  const getUserProgress = () => {
    const userTasks = getUserTasks();
    if (userTasks.length === 0) return 0;
    
    const completedTasks = userTasks.filter(task => task.status === 'completed');
    return Math.round((completedTasks.length / userTasks.length) * 100);
  };

  return {
    people,
    vendors,
    tasks,
    documents,
    eventConfig,
    loading,
    selectedUser: selectedPersonId,
    userType: selectedTeamType,
    getUserTasks,
    getUserDocuments,
    getCurrentUser,
    getUserProgress,
    refreshData: loadData
  };
};

export default useTeamData;
