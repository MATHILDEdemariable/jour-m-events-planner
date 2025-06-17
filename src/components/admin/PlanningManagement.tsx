
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2, Clock, Calendar, User } from 'lucide-react';
import useAdminData, { Task } from '@/hooks/useAdminData';
import { useToast } from '@/hooks/use-toast';

const PlanningManagement = () => {
  const { tasks, people, vendors, saveTasks } = useAdminData();
  const { toast } = useToast();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const categoryColors = {
    'préparation': 'bg-blue-100 text-blue-800',
    'logistique': 'bg-green-100 text-green-800',
    'cérémonie': 'bg-purple-100 text-purple-800',
    'photos': 'bg-pink-100 text-pink-800',
    'réception': 'bg-orange-100 text-orange-800',
  };

  const handleSaveTask = (formData: FormData) => {
    const assignedTo = formData.getAll('assignedTo') as string[];
    const assignedVendors = formData.getAll('assignedVendors') as string[];

    const taskData: Task = {
      id: editingTask?.id || `task-${Date.now()}`,
      title: formData.get('title') as string,
      startTime: formData.get('startTime') as string,
      duration: parseInt(formData.get('duration') as string),
      category: formData.get('category') as Task['category'],
      assignedTo,
      assignedVendors,
      status: (formData.get('status') as Task['status']) || 'scheduled',
      priority: (formData.get('priority') as Task['priority']) || 'medium',
      notes: formData.get('notes') as string,
    };

    if (editingTask) {
      const updatedTasks = tasks.map(t => t.id === editingTask.id ? taskData : t);
      saveTasks(updatedTasks);
      toast({ title: "Tâche modifiée avec succès" });
    } else {
      saveTasks([...tasks, taskData]);
      toast({ title: "Tâche ajoutée avec succès" });
    }

    setEditingTask(null);
    setIsDialogOpen(false);
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter(t => t.id !== id);
    saveTasks(updatedTasks);
    toast({ title: "Tâche supprimée" });
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Gestion du Planning</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingTask(null)}>
              <Plus className="w-4 h-4 mr-2" />
              Ajouter une tâche
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingTask ? 'Modifier' : 'Ajouter'} une tâche
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSaveTask(new FormData(e.currentTarget));
            }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre de la tâche</Label>
                  <Input
                    id="title"
                    name="title"
                    defaultValue={editingTask?.title}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie</Label>
                  <Select name="category" defaultValue={editingTask?.category} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="préparation">Préparation</SelectItem>
                      <SelectItem value="logistique">Logistique</SelectItem>
                      <SelectItem value="cérémonie">Cérémonie</SelectItem>
                      <SelectItem value="photos">Photos</SelectItem>
                      <SelectItem value="réception">Réception</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Heure de début</Label>
                  <Input
                    id="startTime"
                    name="startTime"
                    type="time"
                    defaultValue={editingTask?.startTime}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Durée (minutes)</Label>
                  <Input
                    id="duration"
                    name="duration"
                    type="number"
                    min="5"
                    step="5"
                    defaultValue={editingTask?.duration}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Statut</Label>
                  <Select name="status" defaultValue={editingTask?.status || 'scheduled'}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="scheduled">Planifié</SelectItem>
                      <SelectItem value="in-progress">En cours</SelectItem>
                      <SelectItem value="completed">Terminé</SelectItem>
                      <SelectItem value="delayed">Retardé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priorité</Label>
                  <Select name="priority" defaultValue={editingTask?.priority || 'medium'}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Basse</SelectItem>
                      <SelectItem value="medium">Moyenne</SelectItem>
                      <SelectItem value="high">Haute</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Assigner à l'équipe personnelle</Label>
                <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto border rounded p-2">
                  {people.map((person) => (
                    <label key={person.id} className="flex items-center space-x-2 text-sm">
                      <input
                        type="checkbox"
                        name="assignedTo"
                        value={person.id}
                        defaultChecked={editingTask?.assignedTo.includes(person.id)}
                      />
                      <span>{person.name} ({person.role})</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Assigner aux prestataires</Label>
                <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto border rounded p-2">
                  {vendors.map((vendor) => (
                    <label key={vendor.id} className="flex items-center space-x-2 text-sm">
                      <input
                        type="checkbox"
                        name="assignedVendors"
                        value={vendor.id}
                        defaultChecked={editingTask?.assignedVendors.includes(vendor.id)}
                      />
                      <span>{vendor.name} ({vendor.type})</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  defaultValue={editingTask?.notes}
                  rows={3}
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  {editingTask ? 'Modifier' : 'Ajouter'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Annuler
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {tasks.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                Aucune tâche planifiée
              </h3>
              <p className="text-gray-500">
                Commencez par ajouter des tâches à votre planning.
              </p>
            </CardContent>
          </Card>
        ) : (
          tasks
            .sort((a, b) => a.startTime.localeCompare(b.startTime))
            .map((task) => (
              <Card key={task.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{task.title}</h3>
                        {task.priority === 'high' && (
                          <Badge variant="destructive" className="text-xs">
                            Priorité haute
                          </Badge>
                        )}
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
                    <div className="flex items-center gap-2">
                      <Badge className={categoryColors[task.category]}>
                        {task.category}
                      </Badge>
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
                  </div>

                  {(task.assignedTo.length > 0 || task.assignedVendors.length > 0) && (
                    <div className="mb-3 text-sm">
                      {task.assignedTo.length > 0 && (
                        <div className="flex items-center gap-2 text-gray-600 mb-1">
                          <User className="w-4 h-4" />
                          <span>Équipe: {task.assignedTo.map(id => people.find(p => p.id === id)?.name).filter(Boolean).join(', ')}</span>
                        </div>
                      )}
                      {task.assignedVendors.length > 0 && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <User className="w-4 h-4" />
                          <span>Prestataires: {task.assignedVendors.map(id => vendors.find(v => v.id === id)?.name).filter(Boolean).join(', ')}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {task.notes && (
                    <p className="text-sm text-gray-600 mb-3">{task.notes}</p>
                  )}

                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingTask(task);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteTask(task.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
        )}
      </div>
    </div>
  );
};

export default PlanningManagement;
