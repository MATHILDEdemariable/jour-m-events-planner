
import { useState, useEffect } from 'react';
import { PersonMember, Vendor, Task, Document, EventConfig } from './useAdminData';

const useTeamData = () => {
  const [people, setPeople] = useState<PersonMember[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [eventConfig, setEventConfig] = useState<EventConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [userType, setUserType] = useState<'person' | 'vendor'>('person');

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

  // Load selected user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('jour-j-selected-user');
    const savedUserType = localStorage.getItem('jour-j-user-type');
    
    if (savedUser) setSelectedUser(savedUser);
    if (savedUserType) setUserType(savedUserType as 'person' | 'vendor');
  }, []);

  // Initial load and auto-refresh every 30 seconds
  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Save user selection
  const selectUser = (userId: string, type: 'person' | 'vendor') => {
    setSelectedUser(userId);
    setUserType(type);
    localStorage.setItem('jour-j-selected-user', userId);
    localStorage.setItem('jour-j-user-type', type);
  };

  // Get tasks assigned to current user
  const getUserTasks = () => {
    if (!selectedUser) return [];
    
    return tasks.filter(task => {
      if (userType === 'person') {
        return task.assignedTo.includes(selectedUser);
      } else {
        return task.assignedVendors.includes(selectedUser);
      }
    });
  };

  // Get documents assigned to current user
  const getUserDocuments = () => {
    if (!selectedUser) return [];
    
    return documents.filter(doc => {
      if (doc.permission === 'public') return true;
      if (doc.permission === 'team') return true;
      
      if (userType === 'person') {
        return doc.assignedTo.includes(selectedUser);
      } else {
        return doc.assignedVendors.includes(selectedUser);
      }
    });
  };

  // Get current user info
  const getCurrentUser = () => {
    if (!selectedUser) return null;
    
    if (userType === 'person') {
      return people.find(p => p.id === selectedUser);
    } else {
      return vendors.find(v => v.id === selectedUser);
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
    selectedUser,
    userType,
    selectUser,
    getUserTasks,
    getUserDocuments,
    getCurrentUser,
    getUserProgress,
    refreshData: loadData
  };
};

export default useTeamData;
