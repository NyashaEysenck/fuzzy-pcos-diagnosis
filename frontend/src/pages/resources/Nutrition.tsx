import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Utensils, Check, X, AlertCircle } from "lucide-react";

const Nutrition = () => {
  return (
    <div className="space-y-6 pb-6">
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <Button variant="outline" size="sm" asChild className="text-xs sm:text-sm">
          <Link to="/resources">
            <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden xs:inline">Back to Resources</span>
            <span className="xs:hidden">Back</span>
          </Link>
        </Button>
      </div>
      
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-pcos-dark mb-1 sm:mb-2">PCOS Nutrition</h1>
        <p className="text-sm sm:text-base text-gray-500">Dietary recommendations for managing PCOS</p>
      </div>
      
      <Card className="pcos-card">
        <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
          <CardTitle className="text-lg sm:text-xl text-pcos-purple">The Role of Nutrition in PCOS Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-4 sm:px-6 pb-4 sm:pb-6">
          <p className="text-sm sm:text-base">
            Nutrition plays a crucial role in managing PCOS symptoms and improving overall health outcomes. 
            Many women with PCOS have insulin resistance, which can lead to weight gain, increased androgen 
            production, and worsening of symptoms.
          </p>
          <p className="text-sm sm:text-base">
            A well-planned diet can help improve insulin sensitivity, reduce inflammation, support hormone 
            balance, and assist with weight management. While there's no one-size-fits-all PCOS diet, certain 
            nutritional approaches have shown promising results for many women.
          </p>
          
          <div className="p-3 sm:p-4 bg-pcos-purple/5 rounded-lg mt-4">
            <h3 className="font-semibold text-pcos-purple mb-2 flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
              <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span>Key Nutrition Goals for PCOS</span>
            </h3>
            <ul className="list-disc pl-5 space-y-1 sm:space-y-2 text-sm sm:text-base">
              <li>Improve insulin sensitivity</li>
              <li>Reduce inflammation</li>
              <li>Balance blood sugar levels</li>
              <li>Support hormone regulation</li>
              <li>Achieve and maintain a healthy weight</li>
              <li>Optimize gut health</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Card className="pcos-card">
        <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
          <CardTitle className="text-lg sm:text-xl text-pcos-purple">Recommended Dietary Approaches</CardTitle>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
          <p className="mb-4 text-sm sm:text-base">
            Several dietary approaches have shown benefits for women with PCOS. The best approach for you may 
            depend on your individual symptoms, preferences, and lifestyle.
          </p>
          
          <div className="space-y-4 sm:space-y-6 mt-4">
            <div className="p-3 sm:p-4 border rounded-lg">
              <h3 className="font-medium text-pcos-purple mb-2 text-sm sm:text-base">Low Glycemic Index (GI) Diet</h3>
              <p className="text-xs sm:text-sm mb-3">
                This approach focuses on foods that have a minimal impact on blood sugar levels, helping to improve 
                insulin sensitivity and reduce cravings.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <h4 className="text-xs sm:text-sm font-medium flex items-center gap-1">
                    <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                    <span>Foods to Include</span>
                  </h4>
                  <ul className="list-disc pl-4 sm:pl-5 text-xs sm:text-sm space-y-0.5 sm:space-y-1 mt-1">
                    <li>Non-starchy vegetables</li>
                    <li>Beans and legumes</li>
                    <li>Most fruits (especially berries)</li>
                    <li>Whole grains (quinoa, brown rice, oats)</li>
                    <li>Lean proteins</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-medium flex items-center gap-1">
                    <X className="h-3 w-3 sm:h-4 sm:w-4 text-red-500 flex-shrink-0" />
                    <span>Foods to Limit</span>
                  </h4>
                  <ul className="list-disc pl-4 sm:pl-5 text-xs sm:text-sm space-y-0.5 sm:space-y-1 mt-1">
                    <li>White bread, rice, and pasta</li>
                    <li>Sugary beverages and desserts</li>
                    <li>Processed snack foods</li>
                    <li>Breakfast cereals (except low-sugar options)</li>
                    <li>Potatoes (white)</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="p-3 sm:p-4 border rounded-lg">
              <h3 className="font-medium text-pcos-purple mb-2 text-sm sm:text-base">Anti-Inflammatory Diet</h3>
              <p className="text-xs sm:text-sm mb-3">
                This approach focuses on reducing inflammation, which is often elevated in women with PCOS and 
                can contribute to insulin resistance and other symptoms.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <h4 className="text-xs sm:text-sm font-medium flex items-center gap-1">
                    <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                    <span>Foods to Include</span>
                  </h4>
                  <ul className="list-disc pl-4 sm:pl-5 text-xs sm:text-sm space-y-0.5 sm:space-y-1 mt-1">
                    <li>Fatty fish (salmon, sardines)</li>
                    <li>Olive oil and avocados</li>
                    <li>Colorful fruits and vegetables</li>
                    <li>Nuts and seeds</li>
                    <li>Herbs and spices (turmeric, ginger)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-medium flex items-center gap-1">
                    <X className="h-3 w-3 sm:h-4 sm:w-4 text-red-500 flex-shrink-0" />
                    <span>Foods to Limit</span>
                  </h4>
                  <ul className="list-disc pl-4 sm:pl-5 text-xs sm:text-sm space-y-0.5 sm:space-y-1 mt-1">
                    <li>Processed meats</li>
                    <li>Refined oils</li>
                    <li>Fried foods</li>
                    <li>Added sugars</li>
                    <li>Excessive alcohol</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="p-3 sm:p-4 border rounded-lg">
              <h3 className="font-medium text-pcos-purple mb-2 text-sm sm:text-base">Mediterranean Diet</h3>
              <p className="text-xs sm:text-sm mb-3">
                This well-researched dietary pattern has shown benefits for insulin sensitivity, weight management, 
                and cardiovascular health—all important factors for PCOS management.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <h4 className="text-xs sm:text-sm font-medium flex items-center gap-1">
                    <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                    <span>Foods to Include</span>
                  </h4>
                  <ul className="list-disc pl-4 sm:pl-5 text-xs sm:text-sm space-y-0.5 sm:space-y-1 mt-1">
                    <li>Olive oil as primary fat source</li>
                    <li>Abundant vegetables and fruits</li>
                    <li>Fish and seafood regularly</li>
                    <li>Moderate amounts of dairy, eggs, and poultry</li>
                    <li>Limited red meat</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-medium flex items-center gap-1">
                    <X className="h-3 w-3 sm:h-4 sm:w-4 text-red-500 flex-shrink-0" />
                    <span>Foods to Limit</span>
                  </h4>
                  <ul className="list-disc pl-4 sm:pl-5 text-xs sm:text-sm space-y-0.5 sm:space-y-1 mt-1">
                    <li>Processed foods</li>
                    <li>Added sugars</li>
                    <li>Refined grains</li>
                    <li>Excessive red meat</li>
                    <li>Highly processed oils</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="pcos-card">
        <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
          <CardTitle className="text-lg sm:text-xl text-pcos-purple">Key Nutrients for PCOS</CardTitle>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
          <p className="mb-4 text-sm sm:text-base">
            Certain nutrients are particularly important for women with PCOS. Consider focusing on these 
            nutrients in your diet or discussing supplementation with your healthcare provider.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="p-3 sm:p-4 border rounded-lg">
              <h3 className="font-medium text-pcos-purple mb-2 text-sm sm:text-base flex items-center gap-2">
                <Utensils className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Inositol</span>
              </h3>
              <p className="text-xs sm:text-sm">
                A type of B vitamin that may help improve insulin sensitivity and egg quality, and regulate menstrual cycles.
              </p>
              <p className="text-xs sm:text-sm mt-2 font-medium">Food sources:</p>
              <p className="text-xs sm:text-sm">Citrus fruits, beans, grains, nuts, and fresh vegetables</p>
            </div>
            
            <div className="p-3 sm:p-4 border rounded-lg">
              <h3 className="font-medium text-pcos-purple mb-2 text-sm sm:text-base flex items-center gap-2">
                <Utensils className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Omega-3 Fatty Acids</span>
              </h3>
              <p className="text-xs sm:text-sm">
                Help reduce inflammation and may improve hormone sensitivity.
              </p>
              <p className="text-xs sm:text-sm mt-2 font-medium">Food sources:</p>
              <p className="text-xs sm:text-sm">Fatty fish (salmon, mackerel, sardines), walnuts, flaxseeds, and chia seeds</p>
            </div>
            
            <div className="p-3 sm:p-4 border rounded-lg">
              <h3 className="font-medium text-pcos-purple mb-2 text-sm sm:text-base flex items-center gap-2">
                <Utensils className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Vitamin D</span>
              </h3>
              <p className="text-xs sm:text-sm">
                Many women with PCOS are deficient in vitamin D, which may play a role in insulin resistance and fertility.
              </p>
              <p className="text-xs sm:text-sm mt-2 font-medium">Food sources:</p>
              <p className="text-xs sm:text-sm">Fatty fish, egg yolks, fortified dairy products, and sunlight exposure</p>
            </div>
            
            <div className="p-3 sm:p-4 border rounded-lg">
              <h3 className="font-medium text-pcos-purple mb-2 text-sm sm:text-base flex items-center gap-2">
                <Utensils className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Magnesium</span>
              </h3>
              <p className="text-xs sm:text-sm">
                Helps with glucose metabolism and may reduce insulin resistance.
              </p>
              <p className="text-xs sm:text-sm mt-2 font-medium">Food sources:</p>
              <p className="text-xs sm:text-sm">Dark leafy greens, nuts, seeds, whole grains, and dark chocolate</p>
            </div>
            
            <div className="p-3 sm:p-4 border rounded-lg">
              <h3 className="font-medium text-pcos-purple mb-2 text-sm sm:text-base flex items-center gap-2">
                <Utensils className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Zinc</span>
              </h3>
              <p className="text-xs sm:text-sm">
                Important for hormone production, immune function, and may help with hair loss associated with PCOS.
              </p>
              <p className="text-xs sm:text-sm mt-2 font-medium">Food sources:</p>
              <p className="text-xs sm:text-sm">Oysters, red meat, poultry, beans, nuts, and whole grains</p>
            </div>
            
            <div className="p-3 sm:p-4 border rounded-lg">
              <h3 className="font-medium text-pcos-purple mb-2 text-sm sm:text-base flex items-center gap-2">
                <Utensils className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Chromium</span>
              </h3>
              <p className="text-xs sm:text-sm">
                May help improve insulin sensitivity and glucose metabolism.
              </p>
              <p className="text-xs sm:text-sm mt-2 font-medium">Food sources:</p>
              <p className="text-xs sm:text-sm">Broccoli, green beans, whole grains, and brewer's yeast</p>
            </div>
          </div>
          
          <div className="p-3 sm:p-4 bg-pcos-purple/5 rounded-lg mt-6">
            <h3 className="font-semibold text-pcos-purple mb-2 text-sm sm:text-base">Practical Tips for PCOS Nutrition</h3>
            <ul className="list-disc pl-4 sm:pl-5 space-y-0.5 sm:space-y-1 text-xs sm:text-sm">
              <li>Eat regular meals to maintain stable blood sugar levels</li>
              <li>Combine protein, healthy fats, and fiber at each meal</li>
              <li>Stay well-hydrated with water as your primary beverage</li>
              <li>Consider working with a registered dietitian who specializes in PCOS</li>
              <li>Be mindful of portion sizes, even with healthy foods</li>
              <li>Focus on whole, minimally processed foods whenever possible</li>
              <li>Listen to your body and adjust your diet based on how you feel</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
        <Button variant="outline" asChild className="text-sm">
          <Link to="/resources">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Resources
          </Link>
        </Button>
        
        <Button variant="outline" asChild className="text-sm">
          <Link to="/resources/stress">
            Next: Stress Management
            <ChevronLeft className="h-4 w-4 ml-2 rotate-180" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Nutrition;
