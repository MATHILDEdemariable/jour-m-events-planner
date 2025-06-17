
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Briefcase, User, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTeamSelection } from '@/contexts/TeamSelectionContext';

interface TeamAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TeamAccessModal: React.FC<TeamAccessModalProps> = ({ isOpen, onClose }) => {
  const [selectedType, setSelectedType] = useState<'personal' | 'professional' | null>(null);
  const navigate = useNavigate();
  const { setTeamType } = useTeamSelection();

  const handleContinue = () => {
    if (selectedType) {
      setTeamType(selectedType);
      navigate('/team-selection');
      onClose();
    }
  };

  const handleClose = () => {
    setSelectedType(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <User className="w-5 h-5 text-purple-600" />
            </div>
            <DialogTitle>Accès Jour-J</DialogTitle>
          </div>
          <p className="text-gray-600">
            Sélectionnez votre profil pour accéder à votre planning personnalisé du jour J
          </p>
        </DialogHeader>
        
        <div className="space-y-3 mt-6">
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedType === 'personal' ? 'ring-2 ring-purple-500 bg-purple-50' : ''
            }`}
            onClick={() => setSelectedType('personal')}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-purple-600" />
                <div>
                  <h3 className="font-medium">Équipe personnelle</h3>
                  <p className="text-sm text-gray-600">Personnes inscrites à l'événement</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedType === 'professional' ? 'ring-2 ring-purple-500 bg-purple-50' : ''
            }`}
            onClick={() => setSelectedType('professional')}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-purple-600" />
                <div>
                  <h3 className="font-medium">Équipe professionnelle</h3>
                  <p className="text-sm text-gray-600">Prestataires et fournisseurs</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-3 mt-6">
          <Button variant="outline" onClick={handleClose} className="flex-1">
            Annuler
          </Button>
          <Button 
            onClick={handleContinue} 
            disabled={!selectedType}
            className="flex-1 bg-purple-600 hover:bg-purple-700"
          >
            Continuer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TeamAccessModal;
