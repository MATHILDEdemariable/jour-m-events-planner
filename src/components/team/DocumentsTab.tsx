
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Download, ExternalLink, Image, File, FileCheck, Receipt } from 'lucide-react';
import useTeamData from '@/hooks/useTeamData';

const DocumentsTab = () => {
  const { getUserDocuments } = useTeamData();
  const userDocuments = getUserDocuments();

  const typeIcons = {
    'contract': FileCheck,
    'photo': Image,
    'planning': FileText,
    'invoice': Receipt,
    'other': File,
  };

  const typeColors = {
    'contract': 'bg-green-100 text-green-800',
    'photo': 'bg-pink-100 text-pink-800',
    'planning': 'bg-blue-100 text-blue-800',
    'invoice': 'bg-yellow-100 text-yellow-800',
    'other': 'bg-gray-100 text-gray-800',
  };

  const typeLabels = {
    'contract': 'Contrat',
    'photo': 'Photo',
    'planning': 'Planning',
    'invoice': 'Facture',
    'other': 'Autre',
  };

  const handleOpenDocument = (doc: any) => {
    if (doc.isLocal) {
      // For local files, try to open from public/uploads
      window.open(`/uploads/${doc.url}`, '_blank');
    } else {
      // For external links
      window.open(doc.url, '_blank');
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Mes Documents</h2>
        <Badge variant="outline">
          {userDocuments.length} document{userDocuments.length > 1 ? 's' : ''}
        </Badge>
      </div>

      {userDocuments.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              Aucun document assigné
            </h3>
            <p className="text-gray-500">
              Vos documents personnels et les documents partagés apparaîtront ici.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {userDocuments.map((doc) => {
            const TypeIcon = typeIcons[doc.type];
            
            return (
              <Card key={doc.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2 flex-1">
                      <TypeIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      <CardTitle className="text-lg line-clamp-2">{doc.title}</CardTitle>
                    </div>
                    <Badge className={typeColors[doc.type]}>
                      {typeLabels[doc.type]}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>
                      <strong>Catégorie:</strong> {doc.category}
                    </div>
                    <div>
                      <strong>Ajouté le:</strong> {formatDate(doc.uploadDate)}
                    </div>
                    <div>
                      <strong>Type:</strong> {doc.isLocal ? 'Fichier local' : 'Lien externe'}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Badge variant={
                      doc.permission === 'public' ? 'default' :
                      doc.permission === 'team' ? 'secondary' : 'outline'
                    }>
                      {doc.permission === 'public' && 'Public'}
                      {doc.permission === 'team' && 'Équipe'}
                      {doc.permission === 'specific' && 'Personnel'}
                    </Badge>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleOpenDocument(doc)}
                      className="flex-1"
                      size="sm"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Ouvrir
                    </Button>
                    {doc.isLocal && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = `/uploads/${doc.url}`;
                          link.download = doc.title;
                          link.click();
                        }}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DocumentsTab;
