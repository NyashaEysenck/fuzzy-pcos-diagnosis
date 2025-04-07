
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Info, Heart } from "lucide-react";

const PCOSBasics = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="sm" asChild>
          <Link to="/resources">
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Resources</span>
          </Link>
        </Button>
      </div>
      
      <div>
        <h1 className="text-3xl font-bold text-pcos-dark mb-2">PCOS Basics</h1>
        <p className="text-gray-500">Understanding Polycystic Ovary Syndrome</p>
      </div>
      
      <Card className="pcos-card">
        <CardHeader>
          <CardTitle className="text-pcos-purple">What is PCOS?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Polycystic Ovary Syndrome (PCOS) is a common hormonal disorder that affects women of reproductive age. 
            It is characterized by the presence of small cysts on one or both ovaries, irregular menstrual cycles, 
            and elevated levels of androgens (male hormones).
          </p>
          <p>
            PCOS is one of the most common hormonal disorders among women of reproductive age, affecting approximately 
            8-13% of women worldwide. It is a leading cause of infertility and can have significant impacts on a woman's 
            health and quality of life.
          </p>
          
          <div className="p-4 bg-pcos-purple/5 rounded-lg mt-4">
            <h3 className="font-semibold text-pcos-purple mb-2 flex items-center gap-2">
              <Info className="h-5 w-5" />
              Key Facts About PCOS
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>PCOS affects 8-13% of women of reproductive age worldwide</li>
              <li>It is one of the leading causes of infertility</li>
              <li>Many women with PCOS remain undiagnosed</li>
              <li>Symptoms can vary widely between individuals</li>
              <li>Early diagnosis and management can prevent long-term complications</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Card className="pcos-card">
        <CardHeader>
          <CardTitle className="text-pcos-purple">Common Symptoms</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            The symptoms of PCOS can vary widely among affected individuals. Some women may experience 
            only mild symptoms, while others may be severely affected.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium text-pcos-purple mb-2 flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Reproductive Symptoms
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Irregular menstrual cycles</li>
                <li>Heavy or prolonged periods</li>
                <li>Infertility or difficulty conceiving</li>
                <li>Multiple small cysts on the ovaries</li>
                <li>Pelvic pain</li>
              </ul>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium text-pcos-purple mb-2 flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Hormonal Symptoms
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Excess hair growth (hirsutism)</li>
                <li>Acne or oily skin</li>
                <li>Male-pattern baldness or thinning hair</li>
                <li>Weight gain or difficulty losing weight</li>
                <li>Darkening of skin in neck creases, groin, and underneath breasts</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6">
            <p className="font-medium mb-2">When to Seek Medical Advice</p>
            <p>
              If you're experiencing irregular periods, having difficulty getting pregnant, or have symptoms 
              of excess androgen such as excess hair growth and acne, it's important to consult with a healthcare 
              provider for proper evaluation and diagnosis.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="pcos-card">
        <CardHeader>
          <CardTitle className="text-pcos-purple">Diagnosis</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            There is no single test to diagnose PCOS. Your doctor will likely use a combination of methods to diagnose 
            the condition and rule out other causes of your symptoms.
          </p>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-1">Medical History and Physical Examination</h3>
              <p className="text-sm text-gray-600">
                Your doctor will ask about your menstrual periods, weight changes, and other symptoms. 
                They will also check for physical signs like excess hair growth, acne, and male-pattern baldness.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">Pelvic Exam</h3>
              <p className="text-sm text-gray-600">
                Your doctor might perform a pelvic exam to check for any growths or other abnormalities.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">Blood Tests</h3>
              <p className="text-sm text-gray-600">
                Blood tests can measure hormone levels, blood sugar, and cholesterol and triglyceride levels.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">Ultrasound</h3>
              <p className="text-sm text-gray-600">
                An ultrasound can check the appearance of your ovaries and the thickness of the lining of your uterus.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link to="/resources">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Resources
          </Link>
        </Button>
        
        <Button variant="outline" asChild>
          <Link to="/resources/symptoms">
            Next: Symptoms & Diagnosis
            <ChevronLeft className="h-4 w-4 ml-2 rotate-180" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default PCOSBasics;
