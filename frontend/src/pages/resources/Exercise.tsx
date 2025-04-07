import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Dumbbell, Clock, BarChart, Heart } from "lucide-react";

const Exercise = () => {
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
        <h1 className="text-3xl font-bold text-pcos-dark mb-2">Exercise Plans for PCOS</h1>
        <p className="text-gray-500">Optimal workout routines for women with PCOS</p>
      </div>
      
      <Card className="pcos-card">
        <CardHeader>
          <CardTitle className="text-pcos-purple">Why Exercise Matters for PCOS</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Regular physical activity is one of the most effective ways to manage PCOS symptoms. Exercise 
            helps improve insulin sensitivity, reduce inflammation, and support weight management—all of 
            which are crucial for women with PCOS.
          </p>
          <p>
            The right exercise routine can help regulate your menstrual cycle, reduce testosterone levels, 
            improve mood, and enhance your overall quality of life. Even modest improvements in physical 
            activity can lead to significant benefits for PCOS management.
          </p>
          
          <div className="p-4 bg-pcos-purple/5 rounded-lg mt-4">
            <h3 className="font-semibold text-pcos-purple mb-2 flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Benefits of Exercise for PCOS
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Improves insulin sensitivity and glucose metabolism</li>
              <li>Helps with weight management and fat loss</li>
              <li>Reduces inflammation and stress levels</li>
              <li>May help regulate menstrual cycles</li>
              <li>Improves mood and reduces anxiety and depression</li>
              <li>Reduces risk of cardiovascular disease and type 2 diabetes</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Card className="pcos-card">
        <CardHeader>
          <CardTitle className="text-pcos-purple">Recommended Exercise Types</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            A balanced exercise program for PCOS should include a mix of different types of physical activity. 
            Here are the most beneficial exercise types for women with PCOS:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium text-pcos-purple mb-2 flex items-center gap-2">
                <Dumbbell className="h-5 w-5" />
                Strength Training
              </h3>
              <p className="text-sm mb-2">
                Resistance exercises that build muscle mass, which increases metabolic rate and improves insulin sensitivity.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Weight lifting (free weights or machines)</li>
                <li>Bodyweight exercises (push-ups, squats, lunges)</li>
                <li>Resistance band workouts</li>
                <li>Pilates</li>
              </ul>
              <p className="text-sm mt-2 italic">Aim for 2-3 sessions per week, targeting all major muscle groups.</p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium text-pcos-purple mb-2 flex items-center gap-2">
                <BarChart className="h-5 w-5" />
                High-Intensity Interval Training (HIIT)
              </h3>
              <p className="text-sm mb-2">
                Short bursts of intense activity alternated with recovery periods, which can improve insulin sensitivity and cardiovascular health.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Sprint intervals (running, cycling, swimming)</li>
                <li>Circuit training</li>
                <li>Tabata workouts (20 seconds on, 10 seconds off)</li>
                <li>HIIT classes</li>
              </ul>
              <p className="text-sm mt-2 italic">Aim for 1-2 sessions per week, 20-30 minutes per session.</p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium text-pcos-purple mb-2 flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Moderate-Intensity Cardio
              </h3>
              <p className="text-sm mb-2">
                Sustained aerobic activity that improves cardiovascular health and helps with weight management.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Brisk walking</li>
                <li>Jogging or running</li>
                <li>Cycling</li>
                <li>Swimming</li>
                <li>Dancing</li>
              </ul>
              <p className="text-sm mt-2 italic">Aim for 150 minutes per week, spread across multiple days.</p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium text-pcos-purple mb-2 flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Mind-Body Exercises
              </h3>
              <p className="text-sm mb-2">
                Activities that reduce stress and cortisol levels, which can help with hormone balance.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Yoga</li>
                <li>Tai Chi</li>
                <li>Stretching routines</li>
                <li>Meditation with movement</li>
              </ul>
              <p className="text-sm mt-2 italic">Aim for 2-3 sessions per week, or daily if possible.</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="pcos-card">
        <CardHeader>
          <CardTitle className="text-pcos-purple">Sample Weekly Exercise Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Here's a balanced weekly exercise plan designed specifically for women with PCOS. Remember to start 
            gradually if you're new to exercise and always consult with your healthcare provider before beginning 
            a new fitness program.
          </p>
          
          <div className="space-y-4">
            <div className="p-3 border-l-4 border-pcos-purple/70">
              <h3 className="font-medium mb-1">Monday</h3>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Strength Training:</span> 30-45 minutes full-body workout (focus on compound movements)
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Cool Down:</span> 10 minutes stretching
              </p>
            </div>
            
            <div className="p-3 border-l-4 border-pcos-purple/70">
              <h3 className="font-medium mb-1">Tuesday</h3>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Moderate Cardio:</span> 30 minutes brisk walking, cycling, or swimming
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Mind-Body:</span> 20 minutes yoga or stretching
              </p>
            </div>
            
            <div className="p-3 border-l-4 border-pcos-purple/70">
              <h3 className="font-medium mb-1">Wednesday</h3>
              <p className="text-sm text-gray-600">
                <span className="font-medium">HIIT:</span> 20-25 minutes interval training
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Cool Down:</span> 10 minutes stretching
              </p>
            </div>
            
            <div className="p-3 border-l-4 border-pcos-purple/70">
              <h3 className="font-medium mb-1">Thursday</h3>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Rest Day or Active Recovery:</span> Light walking or gentle yoga
              </p>
            </div>
            
            <div className="p-3 border-l-4 border-pcos-purple/70">
              <h3 className="font-medium mb-1">Friday</h3>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Strength Training:</span> 30-45 minutes (focus on different muscle groups than Monday)
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Cool Down:</span> 10 minutes stretching
              </p>
            </div>
            
            <div className="p-3 border-l-4 border-pcos-purple/70">
              <h3 className="font-medium mb-1">Saturday</h3>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Longer Cardio Session:</span> 45-60 minutes moderate-intensity activity (walking, hiking, cycling)
              </p>
            </div>
            
            <div className="p-3 border-l-4 border-pcos-purple/70">
              <h3 className="font-medium mb-1">Sunday</h3>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Rest Day or Mind-Body Focus:</span> Yoga, Tai Chi, or meditation
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-pcos-purple/5 rounded-lg mt-6">
            <h3 className="font-semibold text-pcos-purple mb-2">Tips for Success</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Start slowly and gradually increase intensity and duration</li>
              <li>Listen to your body and adjust as needed</li>
              <li>Stay hydrated before, during, and after exercise</li>
              <li>Find activities you enjoy to help maintain consistency</li>
              <li>Consider working with a fitness professional who understands PCOS</li>
              <li>Track your progress to stay motivated</li>
            </ul>
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
          <Link to="/resources/nutrition">
            Next: PCOS Nutrition
            <ChevronLeft className="h-4 w-4 ml-2 rotate-180" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Exercise;
