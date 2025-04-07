
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft, Gauge, List, BarChart } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Symptoms = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/resources">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-pcos-dark">PCOS Symptoms & Diagnosis</h1>
          <p className="text-gray-500">Understanding common symptoms and diagnostic criteria</p>
        </div>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Important</AlertTitle>
        <AlertDescription>
          This information is educational and should not replace professional medical advice. Always consult with healthcare providers.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="symptoms" className="w-full">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="symptoms" className="flex-1">Common Symptoms</TabsTrigger>
          <TabsTrigger value="diagnosis" className="flex-1">Diagnosis</TabsTrigger>
          <TabsTrigger value="fuzzylogic" className="flex-1">Fuzzy Logic Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="symptoms">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Key PCOS Symptoms</CardTitle>
                <CardDescription>
                  Symptoms may vary and women don't need to have all of these to be diagnosed with PCOS
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="bg-pcos-purple/10 text-pcos-purple border-0">Physical</Badge>
                    </div>
                    <ul className="space-y-2 mt-2">
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-pcos-purple/20 flex items-center justify-center text-xs font-medium mt-0.5">1</div>
                        <div>
                          <h3 className="font-medium">Irregular periods</h3>
                          <p className="text-sm text-gray-600">Infrequent, irregular, or prolonged menstrual cycles</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-pcos-purple/20 flex items-center justify-center text-xs font-medium mt-0.5">2</div>
                        <div>
                          <h3 className="font-medium">Excess androgen</h3>
                          <p className="text-sm text-gray-600">Elevated levels of male hormones resulting in physical signs</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-pcos-purple/20 flex items-center justify-center text-xs font-medium mt-0.5">3</div>
                        <div>
                          <h3 className="font-medium">Polycystic ovaries</h3>
                          <p className="text-sm text-gray-600">Enlarged ovaries with follicles surrounding the eggs</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="bg-pcos-blue/10 text-pcos-blue border-0">Clinical</Badge>
                    </div>
                    <ul className="space-y-2 mt-2">
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-pcos-blue/20 flex items-center justify-center text-xs font-medium mt-0.5">1</div>
                        <div>
                          <h3 className="font-medium">Hirsutism</h3>
                          <p className="text-sm text-gray-600">Excessive hair growth on face, chest, back</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-pcos-blue/20 flex items-center justify-center text-xs font-medium mt-0.5">2</div>
                        <div>
                          <h3 className="font-medium">Acne</h3>
                          <p className="text-sm text-gray-600">Oily skin and breakouts due to hormonal imbalance</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-pcos-blue/20 flex items-center justify-center text-xs font-medium mt-0.5">3</div>
                        <div>
                          <h3 className="font-medium">Weight gain</h3>
                          <p className="text-sm text-gray-600">Difficulty losing weight, especially around the abdomen</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="diagnosis">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Rotterdam Criteria</CardTitle>
                <CardDescription>
                  The most widely used diagnostic framework for PCOS
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">To be diagnosed with PCOS, a woman must have at least two of these three criteria:</p>
                
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg bg-pcos-purple/5">
                    <h3 className="font-medium flex items-center gap-2">
                      <List className="h-4 w-4 text-pcos-purple" />
                      Oligo/anovulation
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">Irregular or absent menstrual cycles indicating that ovulation is not occurring regularly</p>
                  </div>
                  
                  <div className="p-4 border rounded-lg bg-pcos-purple/5">
                    <h3 className="font-medium flex items-center gap-2">
                      <Gauge className="h-4 w-4 text-pcos-purple" />
                      Hyperandrogenism
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">Clinical (hirsutism, acne) or biochemical (elevated androgen levels in blood tests) signs of excess male hormones</p>
                  </div>
                  
                  <div className="p-4 border rounded-lg bg-pcos-purple/5">
                    <h3 className="font-medium flex items-center gap-2">
                      <BarChart className="h-4 w-4 text-pcos-purple" />
                      Polycystic ovaries
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">Ultrasound findings showing enlarged ovaries with 12 or more follicles measuring 2-9mm in diameter, or increased ovarian volume</p>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div>
                  <h3 className="font-medium mb-2">Exclusion of Other Disorders</h3>
                  <p className="text-sm text-gray-600">Before diagnosing PCOS, healthcare providers typically rule out other conditions that can cause similar symptoms:</p>
                  <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                    <li>Thyroid disorders</li>
                    <li>Hyperprolactinemia</li>
                    <li>Congenital adrenal hyperplasia</li>
                    <li>Androgen-secreting tumors</li>
                    <li>Cushing's syndrome</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="fuzzylogic">
          <Card>
            <CardHeader>
              <CardTitle>Fuzzy Logic in PCOS Diagnosis</CardTitle>
              <CardDescription>
                How LAVIA uses fuzzy logic to analyze symptoms and improve diagnostic accuracy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">What is Fuzzy Logic?</h3>
                <p className="text-gray-600">
                  Unlike traditional binary logic (yes/no, 0/1), fuzzy logic deals with degrees of truth. In the context of PCOS, symptoms often exist on a spectrum rather than simply being present or absent.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border rounded-lg bg-gradient-to-r from-pcos-purple/5 to-pcos-blue/5">
                  <h3 className="font-medium mb-2">Traditional Approach</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-red-500"></div>
                      <span>Binary symptom assessment (present/absent)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-red-500"></div>
                      <span>Rigid diagnostic thresholds</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-red-500"></div>
                      <span>Same criteria weight for all patients</span>
                    </li>
                  </ul>
                </div>
                
                <div className="p-4 border rounded-lg bg-gradient-to-r from-pcos-purple/5 to-pcos-blue/5">
                  <h3 className="font-medium mb-2">Fuzzy Logic Approach</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span>Symptoms evaluated on a spectrum (0-100%)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span>Accounts for symptom severity and combinations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span>Personalizes risk assessment for each patient</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">How LAVIA Uses Fuzzy Logic</h3>
                <p className="text-gray-600 mb-4">
                  Our application analyzes symptom inputs through a fuzzy inference system that considers:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Badge className="mt-0.5">Input</Badge>
                    <div>
                      <span className="font-medium">Fuzzification</span>
                      <p className="text-sm text-gray-600">Converting symptom reports into fuzzy values (e.g., "slightly irregular periods" = 0.3 membership)</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge className="mt-0.5">Process</Badge>
                    <div>
                      <span className="font-medium">Rule Evaluation</span>
                      <p className="text-sm text-gray-600">Applying medical knowledge through IF-THEN rules (e.g., IF "irregular periods" AND "high androgen" THEN "high PCOS likelihood")</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge className="mt-0.5">Output</Badge>
                    <div>
                      <span className="font-medium">Defuzzification</span>
                      <p className="text-sm text-gray-600">Converting fuzzy results back to clear outputs (e.g., "PCOS likelihood: 73%")</p>
                    </div>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Symptoms;
