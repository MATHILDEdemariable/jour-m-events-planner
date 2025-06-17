
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { User, MapPin } from 'lucide-react';
import useTeamData from '@/hooks/useTeamData';

const UserSelector = () => {
  const { people, vendors, selectUser } = useTeamData();
  const [selectedType, setSelectedType] = useState<'person' | 'vendor'>('person');
  const [selectedId, setSelectedId] = useState<string>('');

  const handleConfirmSelection = () => {
    if (selectedId) {
      selectUser(selectedId, selectedType);
    }
  };

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
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Qui êtes-vous ?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Type Selection */}
        <div className="space-y-3">
          <p className="text-sm font-medium">Type d'utilisateur :</p>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={selectedType === 'person' ? 'default' : 'outline'}
              onClick={() => {
                setSelectedType('person');
                setSelectedId('');
              }}
              className="h-auto p-4 flex flex-col gap-2"
            >
              <User className="w-6 h-6" />
              <span>Équipe Personnelle</span>
            </Button>
            <Button
              variant={selectedType === 'vendor' ? 'default' : 'outline'}
              onClick={() => {
                setSelectedType('vendor');
                setSelectedId('');
              }}
              className="h-auto p-4 flex flex-col gap-2"
            >
              <MapPin className="w-6 h-6" />
              <span>Prestataire</span>
            </Button>
          </div>
        </div>

        {/* User Selection */}
        <div className="space-y-3">
          <p className="text-sm font-medium">
            {selectedType === 'person' ? 'Sélectionnez votre nom :' : 'Sélectionnez votre service :'}
          </p>
          
          {selectedType === 'person' ? (
            <Select value={selectedId} onValueChange={setSelectedId}>
              <SelectTrigger>
                <SelectValue placeholder="Choisir une personne" />
              </SelectTrigger>
              <SelectContent>
                {people.map((person) => (
                  <SelectItem key={person.id} value={person.id}>
                    <div className="flex items-center gap-2 w-full">
                      <span>{person.name}</span>
                      <Badge className={`ml-auto ${roleColors[person.role]}`}>
                        {person.role}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Select value={selectedId} onValueChange={setSelectedId}>
              <SelectTrigger>
                <SelectValue placeholder="Choisir un prestataire" />
              </SelectTrigger>
              <SelectContent>
                {vendors.map((vendor) => (
                  <SelectItem key={vendor.id} value={vendor.id}>
                    <div className="flex items-center gap-2 w-full">
                      <span>{vendor.name}</span>
                      <Badge className={`ml-auto ${vendorTypeColors[vendor.type]}`}>
                        {vendor.type}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Confirm Button */}
        <Button
          onClick={handleConfirmSelection}
          disabled={!selectedId}
          className="w-full"
        >
          Continuer
        </Button>

        {/* Info */}
        <div className="text-xs text-gray-500 text-center">
          Cette sélection sera mémorisée pour vos prochaines visites
        </div>
      </CardContent>
    </Card>
  );
};

export default UserSelector;
