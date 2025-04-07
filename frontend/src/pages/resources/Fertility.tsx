
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Info, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Fertility = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/resources">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-pcos-dark">PCOS & Fertility</h1>
          <p className="text-gray-500">Understanding how PCOS affects fertility</p>
        </div>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Important</AlertTitle>
        <AlertDescription>
          This information is educational and should not replace professional medical advice. Always consult with healthcare providers.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>How PCOS Affects Fertility</CardTitle>
            <CardDescription>Understanding the mechanisms</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium flex items-center gap-2">
                <Info className="h-4 w-4 text-pcos-purple" />
                Ovulation Disruption
              </h3>
              <p className="text-sm text-gray-600">
                PCOS often causes irregular or absent ovulation, which is the primary reason for fertility challenges. Without regular ovulation, the chances of conception are significantly reduced.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium flex items-center gap-2">
                <Info className="h-4 w-4 text-pcos-purple" />
                Hormonal Imbalance
              </h3>
              <p className="text-sm text-gray-600">
                Elevated levels of androgens (male hormones) and insulin can interfere with the normal development and release of eggs from the ovaries.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium flex items-center gap-2">
                <Info className="h-4 w-4 text-pcos-purple" />
                Endometrial Issues
              </h3>
              <p className="text-sm text-gray-600">
                Hormonal imbalances can lead to an irregular or thickened endometrial lining, which may make it harder for a fertilized egg to implant successfully.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fertility Management</CardTitle>
            <CardDescription>Approaches to improve fertility with PCOS</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Lifestyle Modifications</h3>
              <p className="text-sm text-gray-600">
                Even a modest weight reduction of 5-10% can significantly improve ovulation and pregnancy rates in women with PCOS who are overweight or obese.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Medications</h3>
              <p className="text-sm text-gray-600">
                Ovulation induction medications like clomiphene citrate, letrozole, or gonadotropins may be prescribed to stimulate ovulation.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Assisted Reproductive Technologies</h3>
              <p className="text-sm text-gray-600">
                For some women, procedures such as intrauterine insemination (IUI) or in vitro fertilization (IVF) may be recommended.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Insulin-Sensitizing Agents</h3>
              <p className="text-sm text-gray-600">
                Medications like metformin may help improve insulin sensitivity, which can lead to more regular ovulation in some women with PCOS.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Success Rates & Outlook</CardTitle>
          <CardDescription>
            What to expect when trying to conceive with PCOS
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            Women with PCOS often have concerns about their ability to conceive. However, it's important to know that:
          </p>
          
          <ul className="space-y-2 list-disc list-inside text-gray-600">
            <li>
              <span className="font-medium">PCOS does not mean infertility</span> - While it can make conception more challenging, many women with PCOS successfully become pregnant and have healthy children.
            </li>
            <li>
              <span className="font-medium">Treatment success rates are encouraging</span> - With appropriate interventions, the majority of women with PCOS are able to achieve pregnancy.
            </li>
            <li>
              <span className="font-medium">Early intervention improves outcomes</span> - Seeking treatment sooner rather than later can improve success rates and reduce the need for more invasive procedures.
            </li>
            <li>
              <span className="font-medium">Individualized approach is key</span> - What works for one woman may not work for another, so treatment plans should be tailored to each individual's needs.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Fertility;
