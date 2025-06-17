
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Shield, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import TeamAccessModal from "@/components/team/TeamAccessModal";

const Index = () => {
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-16 flex flex-col items-center justify-center">
        {/* Title Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-black bg-clip-text text-transparent">
              JOURNM
            </span>
            <span className="text-gray-600 text-2xl ml-3">par Mariable</span>
          </h1>
          <p className="text-xl text-gray-600 font-light">
            Une appli, une équipe, une journée parfaite.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Button 
            size="lg" 
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg font-medium flex items-center gap-3 min-w-[200px]"
            onClick={() => setIsTeamModalOpen(true)}
          >
            👁️ Équipe
          </Button>
          
          <Link to="/admin">
            <Button 
              variant="outline" 
              size="lg" 
              className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-medium flex items-center gap-3 min-w-[200px]"
            >
              <Shield className="w-5 h-5" />
              Admin
            </Button>
          </Link>
        </div>
      </div>

      {/* Logout Button */}
      <div className="container mx-auto px-4 pb-8 text-center">
        <Button variant="ghost" className="text-gray-500 hover:text-gray-700">
          <LogOut className="w-4 h-4 mr-2" />
          Se déconnecter
        </Button>
      </div>

      {/* Team Access Modal */}
      <TeamAccessModal 
        isOpen={isTeamModalOpen} 
        onClose={() => setIsTeamModalOpen(false)} 
      />
    </div>
  );
};

export default Index;
