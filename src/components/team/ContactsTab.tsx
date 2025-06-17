
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
import useTeamData from '@/hooks/useTeamData';

const ContactsTab = () => {
  const { people, vendors } = useTeamData();

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Annuaire</h2>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList>
          <TabsTrigger value="personal">Équipe Personnelle</TabsTrigger>
          <TabsTrigger value="vendors">Prestataires</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Membres de l'équipe</h3>
            <Badge variant="outline">
              {people.length} membre{people.length > 1 ? 's' : ''}
            </Badge>
          </div>

          {people.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  Aucun membre ajouté
                </h3>
                <p className="text-gray-500">
                  L'équipe sera visible ici une fois configurée par l'administrateur.
                </p>
              </CardContent>
            </Card>
          ) : (
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
                    <div className="space-y-2">
                      {person.email && (
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail className="w-4 h-4" />
                            <span className="truncate">{person.email}</span>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(`mailto:${person.email}`, '_blank')}
                          >
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                      {person.phone && (
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="w-4 h-4" />
                            <span>{person.phone}</span>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(`tel:${person.phone}`, '_blank')}
                          >
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    {person.notes && (
                      <p className="text-sm text-gray-600 line-clamp-2 pt-2 border-t">
                        {person.notes}
                      </p>
                    )}

                    <div className="pt-2">
                      <Badge variant={person.confirmed ? "default" : "secondary"}>
                        {person.confirmed ? "Confirmé" : "En attente"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="vendors" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Prestataires</h3>
            <Badge variant="outline">
              {vendors.length} prestataire{vendors.length > 1 ? 's' : ''}
            </Badge>
          </div>

          {vendors.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  Aucun prestataire ajouté
                </h3>
                <p className="text-gray-500">
                  Les prestataires seront visibles ici une fois configurés par l'administrateur.
                </p>
              </CardContent>
            </Card>
          ) : (
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
                    <div className="space-y-2">
                      {vendor.contact && (
                        <div className="text-sm text-gray-600">
                          <strong>Contact:</strong> {vendor.contact}
                        </div>
                      )}
                      {vendor.email && (
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail className="w-4 h-4" />
                            <span className="truncate">{vendor.email}</span>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(`mailto:${vendor.email}`, '_blank')}
                          >
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                      {vendor.phone && (
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="w-4 h-4" />
                            <span>{vendor.phone}</span>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(`tel:${vendor.phone}`, '_blank')}
                          >
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    {vendor.notes && (
                      <p className="text-sm text-gray-600 line-clamp-2 pt-2 border-t">
                        {vendor.notes}
                      </p>
                    )}

                    <div className="pt-2">
                      <Badge variant={vendor.confirmed ? "default" : "secondary"}>
                        {vendor.confirmed ? "Confirmé" : "En cours"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContactsTab;
