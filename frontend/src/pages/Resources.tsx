
import SearchHeader from "@/components/resources/SearchHeader";
import ResourceTabs from "@/components/resources/ResourceTabs";

const Resources = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-pcos-dark">Resources</h1>
        <p className="text-gray-500">Educational materials using fuzzy logic</p>
      </div>
      
      <SearchHeader />
      
      <ResourceTabs />
    </div>
  );
};

export default Resources;
