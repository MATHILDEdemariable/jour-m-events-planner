
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, LogOut, Calendar, Users, FileText } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useTeamSelection } from '@/contexts/TeamSelectionContext';
import useTeamData from '@/hooks/useTeamData';

const PersonalDashboard = () => {
  const { personId } = useParams();
  const navigate = useNavigate();
  const { selectedTeamType, clearSelection } = useTeamSelection();
  const { people, vendors, getUserTasks, getUserDocuments } = useTeamData();

  const getCurrentPerson = () => {
    if (selectedTeamType === 'personal') {
      return people.find(p => p.id === personId);
    } else {
      return vendors.find(v => v.id === personId);
    }
  };

  const handleLogout = () => {
    clearSelection();
    navigate('/');
  };

  const person = getCurrentPerson();
  
  if (!person || !personId) {
    navigate('/');
    return null;
  }

  const userTasks = getUserTasks();
  const userDocuments = getUserDocuments();
  const completedTasks = userTasks.filter(task => task.status === 'completed');
  const progress = userTasks.length > 0 ? Math.round((completedTasks.length / userTasks.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/team-selection">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">{person.name}</h1>
                <p className="text-white/80">
                  {selectedTeamType === 'personal' ? person.role : person.type}
                </p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-white/20"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Se déconnecter
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{userTasks.length}</p>
                  <p className="text-gray-600">Tâches assignées</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{completedTasks.length}</p>
                  <p className="text-gray-600">Terminées</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{userDocuments.length}</p>
                  <p className="text-gray-600">Documents</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Progression générale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex-1 bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="text-lg font-semibold">{progress}%</span>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Mes prochaines tâches
              </CardTitle>
            </CardHeader>
            <CardContent>
              {userTasks.slice(0, 3).map((task) => (
                <div key={task.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-gray-600">{task.time}</p>
                  </div>
                  <Badge variant={task.status === 'completed' ? 'default' : 'secondary'}>
                    {task.status === 'completed' ? 'Terminé' : 'En cours'}
                  </Badge>
                </div>
              ))}
              {userTasks.length === 0 && (
                <p className="text-gray-500 text-center py-4">Aucune tâche assignée</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Documents récents
              </CardTitle>
            </CardHeader>
            <CardContent>
              {userDocuments.slice(0, 3).map((doc) => (
                <div key={doc.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-sm text-gray-600">{doc.category}</p>
                  </div>
                  <Badge variant="outline">{doc.type}</Badge>
                </div>
              ))}
              {userDocuments.length === 0 && (
                <p className="text-gray-500 text-center py-4">Aucun document</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PersonalDashboard;
