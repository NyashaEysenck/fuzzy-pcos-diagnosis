import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchHeader = () => {
  return (
    <div className="relative">
      <div className="pcos-gradient-bg rounded-xl p-6 md:p-10 flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-bold mb-2">Learn about PCOS with fuzzy logic</h2>
          <p className="text-gray-600">Explore our knowledge base powered by advanced fuzzy logic systems.</p>
        </div>
        <div className="hidden md:block">
          <img 
            src="https://img.freepik.com/free-vector/female-reproductive-system-anatomy_23-2148704702.jpg?w=900&t=st=1712456508~exp=1712457108~hmac=7a09b7f5bf36bc19f13ab4f6ba41a1b3e0ef7d11fb6daa48b1d63db0af2ff06b" 
            alt="PCOS Resources" 
            className="h-40 object-contain opacity-70"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;
