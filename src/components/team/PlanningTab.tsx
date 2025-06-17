import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, User, MapPin, CheckCircle, AlertCircle, Circle } from 'lucide-react';
import useTeamData from '@/hooks/useTeamData';
import { Task } from '@/hooks/useAdminData';

const PlanningTab = () => {
  const { tasks, getUserTasks, people, vendors } = useTeamData();
  const userTasks = getUserTasks();
  const [activeView, setActiveView] = useState('personal');

  const categoryColors = {
    'préparation': 'bg-blue-100 text-blue-800',
    'logistique': 'bg-green-100 text-green-800',
    'cérémonie': 'bg-purple-100 text-purple-800',
    'photos': 'bg-pink-100 text-pink-800',
    'réception': 'bg-orange-100 text-orange-800',
  };

  const statusIcons = {
    'scheduled': Circle,
    'in-progress': AlertCircle,
    'completed': CheckCircle,
    'delayed': AlertCircle,
  };

  const statusColors = {
    'scheduled': 'text-gray-500',
    'in-progress': 'text-blue-500',
    'completed': 'text-green-500',
    'delayed': 'text-red-500',
  };

  const formatTime = (timeStr: string) => {
    return new Date(`2000-01-01T${timeStr}`).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEndTime = (startTime: string, duration: number) => {
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(start.getTime() + duration * 60000);
    return end.toLocaleTimeString('fr-FR', {
      hour: '2-digit',  
      minute: '2-digit'
    });
  };

  const getAssignedNames = (task: Task) => {
    const personNames = task.assignedTo
      .map(id => people.find(p => p.id === id)?.name)
      .filter(Boolean);
    
    const vendorNames = task.assignedVendors
      .map(id => vendors.find(v => v.id === id)?.name)
      .filter(Boolean);
    
    return [...personNames, ...vendorNames];
  };

  const TaskCard = ({ task, showAssignees = false }: { task: Task, showAssignees?: boolean }) => {
    const StatusIcon = statusIcons[task.status];
    
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <StatusIcon className={`w-5 h-5 ${statusColors[task.status]}`} />
                <h3 className="font-semibold">{task.title}</h3>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{formatTime(task.startTime)} - {getEndTime(task.startTime, task.duration)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{task.duration}min</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <Badge className={categoryColors[task.category]}>
                {task.category}
              </Badge>
              {task.priority === 'high' && (
                <Badge variant="destructive" className="text-xs">
                  Priorité haute
                </Badge>
              )}
            </div>
          </div>

          {showAssignees && (
            <div className="mb-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>Assigné à: {getAssignedNames(task).join(', ') || 'Non assigné'}</span>
              </div>
            </div>
          )}

          {task.notes && (
            <p className="text-sm text-gray-600 mb-3">{task.notes}</p>
          )}

          <div className="flex justify-between items-center">
            <Badge variant={
              task.status === 'completed' ? 'default' :
              task.status === 'in-progress' ? 'secondary' :
              task.status === 'delayed' ? 'destructive' : 'outline'
            }>
              {task.status === 'scheduled' && 'Planifié'}
              {task.status === 'in-progress' && 'En cours'}
              {task.status === 'completed' && 'Terminé'}
              {task.status === 'delayed' && 'Retardé'}
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Planning</h2>
      </div>

      <Tabs value={activeView} onValueChange={setActiveView}>
        <TabsList>
          <TabsTrigger value="personal">Mon Planning</TabsTrigger>
          <TabsTrigger value="global">Vue Globale</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Mes tâches assignées</h3>
            <Badge variant="outline">
              {userTasks.length} tâche{userTasks.length > 1 ? 's' : ''}
            </Badge>
          </div>

          {userTasks.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  Aucune tâche assignée
                </h3>
                <p className="text-gray-500">
                  Vos tâches apparaîtront ici une fois qu'elles seront planifiées par l'administrateur.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {userTasks
                .sort((a, b) => a.startTime.localeCompare(b.startTime))
                .map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="global" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Planning complet de l'événement</h3>
            <Badge variant="outline">
              {tasks.length} tâche{tasks.length > 1 ? 's' : ''} au total
            </Badge>
          </div>

          {tasks.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  Planning en cours de préparation
                </h3>
                <p className="text-gray-500">
                  Le planning détaillé sera disponible prochainement.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {tasks
                .sort((a, b) => a.startTime.localeCompare(b.startTime))
                .map((task) => (
                  <TaskCard key={task.id} task={task} showAssignees />
                ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlanningTab;
