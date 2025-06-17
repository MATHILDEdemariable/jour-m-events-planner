
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, FileText, Settings, Heart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import PeopleManagement from '@/components/admin/PeopleManagement';
import PlanningManagement from '@/components/admin/PlanningManagement';
import DocumentManagement from '@/components/admin/DocumentManagement';
import EventConfiguration from '@/components/admin/EventConfiguration';
import useAdminData from '@/hooks/useAdminData';

const AdminPortal = () => {
  const [activeTab, setActiveTab] = useState('people');
  const { people, vendors, tasks, documents, eventConfig } = useAdminData();

  const stats = [
    { label: 'Équipe personnelle', value: people.length, icon: Users, color: 'bg-blue-500' },
    { label: 'Prestataires', value: vendors.length, icon: Users, color: 'bg-green-500' },
    { label: 'Tâches planifiées', value: tasks.length, icon: Calendar, color: 'bg-purple-500' },
    { label: 'Documents', value: documents.length, icon: FileText, color: 'bg-pink-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Heart className="w-6 h-6 text-pink-500" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Jour-J Admin
                </h1>
                <Badge variant="secondary">par Mariable</Badge>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              {eventConfig.name} - {new Date(eventConfig.date).toLocaleDateString('fr-FR')}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))} 
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
            <TabsTrigger value="people" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Équipe</span>
            </TabsTrigger>
            <TabsTrigger value="planning" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Planning</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Documents</span>
            </TabsTrigger>
            <TabsTrigger value="config" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Config</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="people" className="space-y-6">
            <PeopleManagement />
          </TabsContent>

          <TabsContent value="planning" className="space-y-6">
            <PlanningManagement />
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <DocumentManagement />
          </TabsContent>

          <TabsContent value="config" className="space-y-6">
            <EventConfiguration />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPortal;
