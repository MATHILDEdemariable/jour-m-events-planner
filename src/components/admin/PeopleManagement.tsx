
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, Trash2, User, Phone, Mail, MapPin } from 'lucide-react';
import useAdminData, { PersonMember, Vendor } from '@/hooks/useAdminData';
import { useToast } from '@/hooks/use-toast';

const PeopleManagement = () => {
  const { people, vendors, savePeople, saveVendors } = useAdminData();
  const { toast } = useToast();
  const [editingPerson, setEditingPerson] = useState<PersonMember | null>(null);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);
  const [isPersonDialogOpen, setIsPersonDialogOpen] = useState(false);
  const [isVendorDialogOpen, setIsVendorDialogOpen] = useState(false);

  const roleColors = {
    'mariée': 'bg-pink-100 text-pink-800',
    'marié': 'bg-blue-100 text-blue-800',
    'témoin': 'bg-purple-100 text-purple-800',
    'famille': 'bg-green-100 text-green-800',
    'ami': 'bg-orange-100 text-orange-800',
  };

  const vendorTypeColors = {
    'lieu': 'bg-indigo-100 text-indigo-800',
    'traiteur': 'bg-yellow-100 text-yellow-800',
    'photographe': 'bg-red-100 text-red-800',
    'fleuriste': 'bg-green-100 text-green-800',
    'beauté': 'bg-pink-100 text-pink-800',
    'musique': 'bg-purple-100 text-purple-800',
  };

  const handleSavePerson = (formData: FormData) => {
    const personData: PersonMember = {
      id: editingPerson?.id || `person-${Date.now()}`,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      role: formData.get('role') as PersonMember['role'],
      notes: formData.get('notes') as string,
      confirmed: formData.get('confirmed') === 'on',
    };

    if (editingPerson) {
      const updatedPeople = people.map(p => p.id === editingPerson.id ? personData : p);
      savePeople(updatedPeople);
      toast({ title: "Personne modifiée avec succès" });
    } else {
      savePeople([...people, personData]);
      toast({ title: "Personne ajoutée avec succès" });
    }

    setEditingPerson(null);
    setIsPersonDialogOpen(false);
  };

  const handleSaveVendor = (formData: FormData) => {
    const vendorData: Vendor = {
      id: editingVendor?.id || `vendor-${Date.now()}`,
      name: formData.get('name') as string,
      type: formData.get('type') as Vendor['type'],
      contact: formData.get('contact') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      notes: formData.get('notes') as string,
      confirmed: formData.get('confirmed') === 'on',
    };

    if (editingVendor) {
      const updatedVendors = vendors.map(v => v.id === editingVendor.id ? vendorData : v);
      saveVendors(updatedVendors);
      toast({ title: "Prestataire modifié avec succès" });
    } else {
      saveVendors([...vendors, vendorData]);
      toast({ title: "Prestataire ajouté avec succès" });
    }

    setEditingVendor(null);
    setIsVendorDialogOpen(false);
  };

  const deletePerson = (id: string) => {
    const updatedPeople = people.filter(p => p.id !== id);
    savePeople(updatedPeople);
    toast({ title: "Personne supprimée" });
  };

  const deleteVendor = (id: string) => {
    const updatedVendors = vendors.filter(v => v.id !== id);
    saveVendors(updatedVendors);
    toast({ title: "Prestataire supprimé" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Gestion de l'équipe</h2>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList>
          <TabsTrigger value="personal">Équipe Personnelle</TabsTrigger>
          <TabsTrigger value="vendors">Équipe Professionnelle</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Membres de l'équipe</h3>
            <Dialog open={isPersonDialogOpen} onOpenChange={setIsPersonDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setEditingPerson(null)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter une personne
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {editingPerson ? 'Modifier' : 'Ajouter'} une personne
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleSavePerson(new FormData(e.currentTarget));
                }} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom complet</Label>
                    <Input
                      id="name"
                      name="name"
                      defaultValue={editingPerson?.name}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Rôle</Label>
                    <Select name="role" defaultValue={editingPerson?.role} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un rôle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mariée">Mariée</SelectItem>
                        <SelectItem value="marié">Marié</SelectItem>
                        <SelectItem value="témoin">Témoin</SelectItem>
                        <SelectItem value="famille">Famille</SelectItem>
                        <SelectItem value="ami">Ami</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      defaultValue={editingPerson?.email}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      defaultValue={editingPerson?.phone}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      defaultValue={editingPerson?.notes}
                      rows={3}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="confirmed"
                      name="confirmed"
                      defaultChecked={editingPerson?.confirmed}
                    />
                    <Label htmlFor="confirmed">Confirmation reçue</Label>
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">
                      {editingPerson ? 'Modifier' : 'Ajouter'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsPersonDialogOpen(false)}
                    >
                      Annuler
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {people.map((person) => (
              <Card key={person.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-gray-500" />
                      <CardTitle className="text-lg">{person.name}</CardTitle>
                    </div>
                    <Badge className={roleColors[person.role]}>
                      {person.role}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    {person.email && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span>{person.email}</span>
                      </div>
                    )}
                    {person.phone && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{person.phone}</span>
                      </div>
                    )}
                  </div>
                  
                  {person.notes && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {person.notes}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <Badge variant={person.confirmed ? "default" : "secondary"}>
                      {person.confirmed ? "Confirmé" : "En attente"}
                    </Badge>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingPerson(person);
                          setIsPersonDialogOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deletePerson(person.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="vendors" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Prestataires</h3>
            <Dialog open={isVendorDialogOpen} onOpenChange={setIsVendorDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setEditingVendor(null)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un prestataire
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {editingVendor ? 'Modifier' : 'Ajouter'} un prestataire
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveVendor(new FormData(e.currentTarget));
                }} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="vendor-name">Nom du prestataire</Label>
                    <Input
                      id="vendor-name"
                      name="name"
                      defaultValue={editingVendor?.name}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vendor-type">Type de service</Label>
                    <Select name="type" defaultValue={editingVendor?.type} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lieu">Lieu de réception</SelectItem>
                        <SelectItem value="traiteur">Traiteur</SelectItem>
                        <SelectItem value="photographe">Photographe</SelectItem>
                        <SelectItem value="fleuriste">Fleuriste</SelectItem>
                        <SelectItem value="beauté">Mise en beauté</SelectItem>
                        <SelectItem value="musique">Musique</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vendor-contact">Contact principal</Label>
                    <Input
                      id="vendor-contact"
                      name="contact"
                      defaultValue={editingVendor?.contact}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vendor-email">Email</Label>
                    <Input
                      id="vendor-email"
                      name="email"
                      type="email"
                      defaultValue={editingVendor?.email}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vendor-phone">Téléphone</Label>
                    <Input
                      id="vendor-phone"
                      name="phone"
                      defaultValue={editingVendor?.phone}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vendor-notes">Notes</Label>
                    <Textarea
                      id="vendor-notes"
                      name="notes"
                      defaultValue={editingVendor?.notes}
                      rows={3}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="vendor-confirmed"
                      name="confirmed"
                      defaultChecked={editingVendor?.confirmed}
                    />
                    <Label htmlFor="vendor-confirmed">Contrat signé</Label>
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">
                      {editingVendor ? 'Modifier' : 'Ajouter'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsVendorDialogOpen(false)}
                    >
                      Annuler
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {vendors.map((vendor) => (
              <Card key={vendor.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-gray-500" />
                      <CardTitle className="text-lg">{vendor.name}</CardTitle>
                    </div>
                    <Badge className={vendorTypeColors[vendor.type]}>
                      {vendor.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    {vendor.contact && (
                      <div className="text-gray-600">
                        <strong>Contact:</strong> {vendor.contact}
                      </div>
                    )}
                    {vendor.email && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span>{vendor.email}</span>
                      </div>
                    )}
                    {vendor.phone && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{vendor.phone}</span>
                      </div>
                    )}
                  </div>
                  
                  {vendor.notes && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {vendor.notes}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <Badge variant={vendor.confirmed ? "default" : "secondary"}>
                      {vendor.confirmed ? "Confirmé" : "En cours"}
                    </Badge>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingVendor(vendor);
                          setIsVendorDialogOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteVendor(vendor.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PeopleManagement;
