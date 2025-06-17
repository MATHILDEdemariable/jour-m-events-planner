
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, FileText, ExternalLink, Upload } from 'lucide-react';
import useAdminData, { Document } from '@/hooks/useAdminData';
import { useToast } from '@/hooks/use-toast';

const DocumentManagement = () => {
  const { documents, people, vendors, saveDocuments } = useAdminData();
  const { toast } = useToast();
  const [editingDocument, setEditingDocument] = useState<Document | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const typeColors = {
    'contract': 'bg-green-100 text-green-800',
    'photo': 'bg-pink-100 text-pink-800',
    'planning': 'bg-blue-100 text-blue-800',
    'invoice': 'bg-yellow-100 text-yellow-800',
    'other': 'bg-gray-100 text-gray-800',
  };

  const handleSaveDocument = (formData: FormData) => {
    const assignedTo = formData.getAll('assignedTo') as string[];
    const assignedVendors = formData.getAll('assignedVendors') as string[];
    const isLocal = formData.get('docType') === 'local';

    const documentData: Document = {
      id: editingDocument?.id || `doc-${Date.now()}`,
      title: formData.get('title') as string,
      type: formData.get('type') as Document['type'],
      url: formData.get('url') as string,
      isLocal,
      assignedTo,
      assignedVendors,
      permission: formData.get('permission') as Document['permission'],
      category: formData.get('category') as string,
      uploadDate: editingDocument?.uploadDate || new Date().toISOString(),
    };

    if (editingDocument) {
      const updatedDocuments = documents.map(d => d.id === editingDocument.id ? documentData : d);
      saveDocuments(updatedDocuments);
      toast({ title: "Document modifié avec succès" });
    } else {
      saveDocuments([...documents, documentData]);
      toast({ title: "Document ajouté avec succès" });
    }

    setEditingDocument(null);
    setIsDialogOpen(false);
  };

  const deleteDocument = (id: string) => {
    const updatedDocuments = documents.filter(d => d.id !== id);
    saveDocuments(updatedDocuments);
    toast({ title: "Document supprimé" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Gestion des Documents</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingDocument(null)}>
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un document
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingDocument ? 'Modifier' : 'Ajouter'} un document
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSaveDocument(new FormData(e.currentTarget));
            }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre du document</Label>
                  <Input
                    id="title"
                    name="title"
                    defaultValue={editingDocument?.title}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select name="type" defaultValue={editingDocument?.type} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Type de document" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contract">Contrat</SelectItem>
                      <SelectItem value="photo">Photo</SelectItem>
                      <SelectItem value="planning">Planning</SelectItem>
                      <SelectItem value="invoice">Facture</SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie</Label>
                  <Input
                    id="category"
                    name="category"
                    defaultValue={editingDocument?.category}
                    placeholder="Ex: Contrats, Photos..."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="permission">Permission</Label>
                  <Select name="permission" defaultValue={editingDocument?.permission} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Niveau d'accès" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public - Toute l'équipe</SelectItem>
                      <SelectItem value="team">Équipe - Membres confirmés</SelectItem>
                      <SelectItem value="specific">Spécifique - Personnes sélectionnées</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Type de document</Label>
                <Select name="docType" defaultValue={editingDocument?.isLocal ? 'local' : 'external'}>
                  <SelectTrigger>
                    <SelectValue placeholder="Source du document" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">
                      <div className="flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        Fichier local (upload)
                      </div>
                    </SelectItem>
                    <SelectItem value="external">
                      <div className="flex items-center gap-2">
                        <ExternalLink className="w-4 h-4" />
                        Lien externe
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="url">
                  {editingDocument?.isLocal || !editingDocument ? 'Nom du fichier ou URL' : 'URL du document'}
                </Label>
                <Input
                  id="url"
                  name="url"
                  defaultValue={editingDocument?.url}
                  placeholder="exemple.pdf ou https://drive.google.com/..."
                  required
                />
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
                        defaultChecked={editingDocument?.assignedTo.includes(person.id)}
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
                        defaultChecked={editingDocument?.assignedVendors.includes(vendor.id)}
                      />
                      <span>{vendor.name} ({vendor.type})</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  {editingDocument ? 'Modifier' : 'Ajouter'}
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {documents.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="p-8 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                Aucun document ajouté
              </h3>
              <p className="text-gray-500">
                Commencez par ajouter des documents à partager avec votre équipe.
              </p>
            </CardContent>
          </Card>
        ) : (
          documents.map((doc) => (
            <Card key={doc.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 flex-1">
                    <FileText className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    <CardTitle className="text-lg line-clamp-2">{doc.title}</CardTitle>
                  </div>
                  <Badge className={typeColors[doc.type]}>
                    {doc.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-gray-600 space-y-1">
                  <div><strong>Catégorie:</strong> {doc.category}</div>
                  <div><strong>Type:</strong> {doc.isLocal ? 'Fichier local' : 'Lien externe'}</div>
                  <div><strong>Ajouté:</strong> {new Date(doc.uploadDate).toLocaleDateString('fr-FR')}</div>
                </div>

                <div className="space-y-2">
                  <Badge variant={
                    doc.permission === 'public' ? 'default' :
                    doc.permission === 'team' ? 'secondary' : 'outline'
                  }>
                    {doc.permission === 'public' && 'Public'}
                    {doc.permission === 'team' && 'Équipe'}
                    {doc.permission === 'specific' && 'Spécifique'}
                  </Badge>
                </div>

                {(doc.assignedTo.length > 0 || doc.assignedVendors.length > 0) && (
                  <div className="text-xs text-gray-500">
                    <p>Assigné à {doc.assignedTo.length + doc.assignedVendors.length} personne(s)</p>
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      if (doc.isLocal) {
                        window.open(`/uploads/${doc.url}`, '_blank');
                      } else {
                        window.open(doc.url, '_blank');
                      }
                    }}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingDocument(doc);
                      setIsDialogOpen(true);
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteDocument(doc.id)}
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

export default DocumentManagement;
