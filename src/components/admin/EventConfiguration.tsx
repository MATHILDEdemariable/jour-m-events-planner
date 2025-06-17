
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, Save, Calendar, MapPin, Palette } from 'lucide-react';
import useAdminData from '@/hooks/useAdminData';
import { useToast } from '@/hooks/use-toast';

const EventConfiguration = () => {
  const { eventConfig, saveEventConfig } = useAdminData();
  const { toast } = useToast();
  const [formData, setFormData] = useState(eventConfig);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveEventConfig(formData);
    toast({ 
      title: "Configuration sauvegardée",
      description: "Les paramètres de l'événement ont été mis à jour."
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const colorPresets = [
    { name: 'Purple & Pink', primary: '#9333ea', secondary: '#e879f9' },
    { name: 'Blue & Cyan', primary: '#3b82f6', secondary: '#06b6d4' },
    { name: 'Green & Emerald', primary: '#059669', secondary: '#10b981' },
    { name: 'Red & Rose', primary: '#dc2626', secondary: '#f43f5e' },
    { name: 'Orange & Amber', primary: '#ea580c', secondary: '#f59e0b' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Settings className="w-6 h-6" />
        <h2 className="text-2xl font-bold">Configuration de l'Événement</h2>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Informations Générales
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom de l'événement</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Ex: Mariage de Julie & Pierre"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type d'événement</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value) => handleInputChange('type', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mariage">Mariage</SelectItem>
                    <SelectItem value="Anniversaire">Anniversaire</SelectItem>
                    <SelectItem value="Baptême">Baptême</SelectItem>
                    <SelectItem value="Fête d'entreprise">Fête d'entreprise</SelectItem>
                    <SelectItem value="Autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date de l'événement</Label>
                <Input
                  id="date"
                  type="datetime-local"
                  value={formData.date.slice(0, 16)}
                  onChange={(e) => handleInputChange('date', new Date(e.target.value).toISOString())}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Lieu</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Ex: Château de Versailles"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Fuseau horaire</Label>
                <Select 
                  value={formData.timezone} 
                  onValueChange={(value) => handleInputChange('timezone', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Europe/Paris">Europe/Paris (GMT+1)</SelectItem>
                    <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                    <SelectItem value="America/New_York">America/New_York (GMT-5)</SelectItem>
                    <SelectItem value="Asia/Tokyo">Asia/Tokyo (GMT+9)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Theme & Design */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Thème Visuel
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label>Préréglages de couleurs</Label>
                <div className="grid grid-cols-1 gap-2">
                  {colorPresets.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => {
                        handleInputChange('primaryColor', preset.primary);
                        handleInputChange('secondaryColor', preset.secondary);
                      }}
                      className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex gap-1">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: preset.primary }}
                        />
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: preset.secondary }}
                        />
                      </div>
                      <span className="text-sm font-medium">{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Couleur primaire</Label>
                  <div className="flex gap-2">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={formData.primaryColor}
                      onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      value={formData.primaryColor}
                      onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Couleur secondaire</Label>
                  <div className="flex gap-2">
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={formData.secondaryColor}
                      onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      value={formData.secondaryColor}
                      onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              {/* Color Preview */}
              <div className="p-4 rounded-lg border-2" style={{
                background: `linear-gradient(135deg, ${formData.primaryColor}20, ${formData.secondaryColor}20)`
              }}>
                <div className="flex items-center gap-2 mb-2">
                  <div 
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: formData.primaryColor }}
                  />
                  <span className="font-semibold" style={{ color: formData.primaryColor }}>
                    Aperçu du thème
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Voici comment apparaîtront les couleurs dans l'interface.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Description
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="description">Description de l'événement</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Décrivez votre événement, les particularités, les instructions spéciales..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button type="submit" className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Sauvegarder la configuration
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EventConfiguration;
