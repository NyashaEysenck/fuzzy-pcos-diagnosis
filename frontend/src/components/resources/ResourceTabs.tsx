
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResourceCard from "./ResourceCard";
import { Info, Heart, BookOpen, Utensils, Dumbbell } from "lucide-react";

const ResourceTabs = () => {
  return (
    <Tabs defaultValue="learn" className="w-full">
      <TabsList className="w-full mb-6">
        <TabsTrigger value="learn" className="flex-1">Educational</TabsTrigger>
        <TabsTrigger value="lifestyle" className="flex-1">Lifestyle</TabsTrigger>
      </TabsList>
      
      <TabsContent value="learn">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ResourceCard 
            icon={Info} 
            title="PCOS Basics" 
            description="Learn about the fundamentals of Polycystic Ovary Syndrome"
            to="/resources/pcos-basics"
          />
          <ResourceCard 
            icon={Heart} 
            title="Symptoms & Diagnosis" 
            description="Understand common symptoms and diagnostic criteria"
            to="/resources/symptoms"
          />
          <ResourceCard 
            icon={BookOpen} 
            title="PCOS & Fertility" 
            description="How PCOS affects fertility and pregnancy outcomes"
            to="/resources/fertility"
          />
        </div>
      </TabsContent>
      
      <TabsContent value="lifestyle">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ResourceCard 
            icon={Utensils} 
            title="PCOS Nutrition" 
            description="Dietary recommendations for managing PCOS"
            to="/resources/nutrition"
          />
          <ResourceCard 
            icon={Dumbbell} 
            title="Exercise Plans" 
            description="Optimal workout routines for women with PCOS"
            to="/resources/exercise"
          />
          <ResourceCard 
            icon={Heart} 
            title="Stress Management" 
            description="Techniques to reduce stress and its impact on hormones"
            to="/resources/stress"
          />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ResourceTabs;
