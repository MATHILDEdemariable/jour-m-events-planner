
import { useState, useEffect } from 'react';

export interface PersonMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'mariée' | 'marié' | 'témoin' | 'famille' | 'ami';
  notes: string;
  confirmed: boolean;
}

export interface Vendor {
  id: string;
  name: string;
  type: 'lieu' | 'traiteur' | 'photographe' | 'fleuriste' | 'beauté' | 'musique';
  contact: string;
  email: string;
  phone: string;
  notes: string;
  confirmed: boolean;
}

export interface Task {
  id: string;
  title: string;
  startTime: string;
  duration: number;
  category: 'préparation' | 'logistique' | 'cérémonie' | 'photos' | 'réception';
  assignedTo: string[];
  assignedVendors: string[];
  status: 'scheduled' | 'in-progress' | 'completed' | 'delayed';
  notes: string;
  priority: 'low' | 'medium' | 'high';
}

export interface Document {
  id: string;
  title: string;
  type: 'contract' | 'photo' | 'planning' | 'invoice' | 'other';
  url: string;
  isLocal: boolean;
  assignedTo: string[];
  assignedVendors: string[];
  permission: 'public' | 'team' | 'specific';
  category: string;
  uploadDate: string;
}

export interface EventConfig {
  id: string;
  name: string;
  type: string;
  date: string;
  location: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  logo?: string;
  timezone: string;
}

const useAdminData = () => {
  const [people, setPeople] = useState<PersonMember[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);  
  const [eventConfig, setEventConfig] = useState<EventConfig>({
    id: '1',
    name: 'Mon Événement',
    type: 'Mariage',
    date: new Date().toISOString(),
    location: '',
    description: '',
    primaryColor: '#9333ea',
    secondaryColor: '#e879f9',
    timezone: 'Europe/Paris'
  });

  // Load data from localStorage on mount
  useEffect(() => {
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
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  // Save functions with automatic localStorage sync
  const savePeople = (newPeople: PersonMember[]) => {
    setPeople(newPeople);
    localStorage.setItem('jour-j-people', JSON.stringify(newPeople));
  };

  const saveVendors = (newVendors: Vendor[]) => {
    setVendors(newVendors);
    localStorage.setItem('jour-j-vendors', JSON.stringify(newVendors));
  };

  const saveTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
    localStorage.setItem('jour-j-tasks', JSON.stringify(newTasks));
  };

  const saveDocuments = (newDocuments: Document[]) => {
    setDocuments(newDocuments);
    localStorage.setItem('jour-j-documents', JSON.stringify(newDocuments));
  };

  const saveEventConfig = (newConfig: EventConfig) => {
    setEventConfig(newConfig);
    localStorage.setItem('jour-j-event-config', JSON.stringify(newConfig));
  };

  return {
    people,
    vendors,
    tasks,
    documents,
    eventConfig,
    savePeople,
    saveVendors,
    saveTasks,
    saveDocuments,
    saveEventConfig
  };
};

export default useAdminData;
