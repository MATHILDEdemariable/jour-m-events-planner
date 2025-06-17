
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Heart, ArrowLeft, Calendar, Users, FileText, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import UserSelector from '@/components/team/UserSelector';
import PlanningTab from '@/components/team/PlanningTab';
import ContactsTab from '@/components/team/ContactsTab';
import DocumentsTab from '@/components/team/DocumentsTab';
import useTeamData from '@/hooks/useTeamData';

const EventPortal = () => {
  const [activeTab, setActiveTab] = useState('planning');
  const { 
    loading, 
    selectedUser, 
    userType, 
    getCurrentUser, 
    getUserProgress, 
    eventConfig,
    getUserTasks,
    getUserDocuments 
  } = useTeamData();

  const currentUser = getCurrentUser();
  const progress = getUserProgress();
  const userTasks = getUserTasks();
  const userDocuments = getUserDocuments();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des données...</p>
        </div>
      </div>
    );
  }

  if (!selectedUser || !currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Heart className="w-8 h-8 text-pink-500" />
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Portal Équipe
                </h1>
              </div>
              <p className="text-gray-600">
                Sélectionnez votre identité pour accéder à votre espace personnel
              </p>
            </div>
            <UserSelector />
            <div className="text-center mt-6">
              <Link to="/">
                <Button variant="ghost">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour à l'accueil
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                  Portal Équipe
                </h1>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              {eventConfig?.name} - {eventConfig && new Date(eventConfig.date).toLocaleDateString('fr-FR')}
            </div>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{currentUser.name}</h2>
                <p className="text-white/80">
                  {userType === 'person' 
                    ? `Rôle: ${(currentUser as any).role}` 
                    : `Service: ${(currentUser as any).type}`
                  }
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white/80 text-sm mb-1">Progression</p>
              <div className="flex items-center gap-2">
                <Progress value={progress} className="w-24 bg-white/20" />
                <span className="text-sm font-medium">{progress}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{userTasks.length}</p>
                  <p className="text-sm text-gray-600">Tâches assignées</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {userTasks.filter(t => t.status === 'completed').length}
                  </p>
                  <p className="text-sm text-gray-600">Terminées</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-pink-100 rounded-lg">
                  <FileText className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{userDocuments.length}</p>
                  <p className="text-sm text-gray-600">Documents</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="planning" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Planning</span>
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Contacts</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Documents</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="planning">
            <PlanningTab />
          </TabsContent>

          <TabsContent value="contacts">
            <ContactsTab />
          </TabsContent>

          <TabsContent value="documents">
            <DocumentsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EventPortal;
