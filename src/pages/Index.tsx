
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Users, Calendar, FileText, Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-8 h-8 text-pink-500" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Jour-J
            </h1>
            <Badge variant="secondary" className="ml-2">par Mariable</Badge>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Gérez la logistique et le planning de votre événement équipe avec deux portails dédiés
          </p>
        </div>

        {/* Portals Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Admin Portal */}
          <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-500/10 to-purple-600/10">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Settings className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Portal Admin</CardTitle>
                  <CardDescription>Configuration & Gestion complète</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>Gestion équipe personnelle & professionnelle</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Planning interactif & attribution tâches</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FileText className="w-4 h-4" />
                  <span>Gestion documents & configuration</span>
                </div>
              </div>
              <Link to="/admin">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 group-hover:translate-y-[-1px] transition-all">
                  Accéder au Portal Admin
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Team Portal */}
          <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-pink-500/10 to-pink-600/10">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-pink-100 rounded-lg">
                  <Users className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Portal Équipe</CardTitle>
                  <CardDescription>Interface utilisateur final</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Planning personnel & vue globale</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>Annuaire équipe & contacts</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FileText className="w-4 h-4" />
                  <span>Documents assignés & partagés</span>
                </div>
              </div>
              <Link to="/team">
                <Button className="w-full bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 group-hover:translate-y-[-1px] transition-all">
                  Accéder au Portal Équipe
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Features Overview */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-8 text-gray-800">
            Communication fluide via JSON local
          </h2>
          <div className="flex justify-center items-center gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Settings className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-sm font-medium">Admin écrit</p>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400" />
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <FileText className="w-6 h-6 text-gray-600" />
              </div>
              <p className="text-sm font-medium">JSON Files</p>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400" />
            <div className="text-center">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Users className="w-6 h-6 text-pink-600" />
              </div>
              <p className="text-sm font-medium">Équipe lit</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
