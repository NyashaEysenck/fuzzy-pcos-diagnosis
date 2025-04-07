
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ResourceCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  buttonText?: string;
  to?: string;
}

const ResourceCard = ({ 
  icon: Icon, 
  title, 
  description, 
  buttonText = "Learn More",
  to = "#" 
}: ResourceCardProps) => (
  <Card className="pcos-card h-full">
    <CardHeader className="pb-2">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-full bg-pcos-purple/10">
          <Icon className="h-5 w-5 text-pcos-purple" />
        </div>
        <div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent className="pt-4">
      <Button 
        variant="outline" 
        className="w-full gap-1 mt-2 justify-between"
        asChild
      >
        <Link to={to}>
          {buttonText}
          <ChevronRight size={16} />
        </Link>
      </Button>
    </CardContent>
  </Card>
);

export default ResourceCard;
