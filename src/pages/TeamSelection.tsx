
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Users, Briefcase } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTeamSelection } from '@/contexts/TeamSelectionContext';
import useTeamData from '@/hooks/useTeamData';

const TeamSelection = () => {
  const { selectedTeamType, setPersonId } = useTeamSelection();
  const { people, vendors } = useTeamData();
  const navigate = useNavigate();

  const handlePersonSelect = (id: string) => {
    setPersonId(id);
    navigate(`/dashboard/${id}`);
  };

  const getTeamData = () => {
    if (selectedTeamType === 'personal') {
      return {
        title: 'Équipe personnelle',
        icon: Users,
        data: people,
        roleColors: {
          'mariée': 'bg-pink-100 text-pink-800',
          'marié': 'bg-blue-100 text-blue-800',
          'témoin': 'bg-purple-100 text-purple-800',
          'famille': 'bg-green-100 text-green-800',
          'ami': 'bg-orange-100 text-orange-800',
        }
      };
    } else {
      return {
        title: 'Équipe professionnelle',
        icon: Briefcase,
        data: vendors,
        roleColors: {
          'lieu': 'bg-indigo-100 text-indigo-800',
          'traiteur': 'bg-yellow-100 text-yellow-800',
          'photographe': 'bg-red-100 text-red-800',
          'fleuriste': 'bg-green-100 text-green-800',
          'beauté': 'bg-pink-100 text-pink-800',
          'musique': 'bg-purple-100 text-purple-800',
        }
      };
    }
  };

  if (!selectedTeamType) {
    navigate('/');
    return null;
  }

  const { title, icon: Icon, data, roleColors } = getTeamData();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Icon className="w-6 h-6 text-purple-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Sélectionnez votre profil - {title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((person) => (
            <Card 
              key={person.id}
              className="cursor-pointer transition-all hover:shadow-lg hover:scale-105"
              onClick={() => handlePersonSelect(person.id)}
            >
              <CardContent className="p-6">
                <div className="text-center">
                  {/* Avatar */}
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-purple-600">
                      {person.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </span>
                  </div>
                  
                  {/* Name */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {person.name}
                  </h3>
                  
                  {/* Role */}
                  <Badge className={`mb-3 ${roleColors[selectedTeamType === 'personal' ? person.role : person.type]}`}>
                    {selectedTeamType === 'personal' ? person.role : person.type}
                  </Badge>
                  
                  {/* Status */}
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Disponible</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {data.length === 0 && (
          <div className="text-center py-12">
            <Icon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              Aucun membre dans cette équipe
            </h3>
            <p className="text-gray-500">
              Configurez votre équipe depuis le portail admin
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamSelection;
