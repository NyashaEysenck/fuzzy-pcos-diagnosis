import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Heart, Clock, Brain, Moon } from "lucide-react";

const Stress = () => {
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
        <h1 className="text-3xl font-bold text-pcos-dark mb-2">Stress Management</h1>
        <p className="text-gray-500">Techniques to reduce stress and its impact on hormones</p>
      </div>
      
      <Card className="pcos-card">
        <CardHeader>
          <CardTitle className="text-pcos-purple">The Stress-PCOS Connection</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Stress and PCOS are closely interconnected. Chronic stress can worsen PCOS symptoms by 
            disrupting hormone balance, increasing insulin resistance, and promoting inflammation. 
            Conversely, living with PCOS can itself be a source of stress, creating a challenging cycle.
          </p>
          <p>
            When you're stressed, your body releases cortisol (the "stress hormone"), which can 
            interfere with reproductive hormones and insulin function. For women with PCOS, who often 
            already have hormonal imbalances, this additional disruption can exacerbate symptoms.
          </p>
          
          <div className="p-4 bg-pcos-purple/5 rounded-lg mt-4">
            <h3 className="font-semibold text-pcos-purple mb-2 flex items-center gap-2">
              <Heart className="h-5 w-5" />
              How Stress Affects PCOS
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Increases cortisol levels, which can worsen insulin resistance</li>
              <li>Disrupts sleep patterns, further affecting hormone balance</li>
              <li>Can lead to emotional eating and poor food choices</li>
              <li>May contribute to inflammation in the body</li>
              <li>Can affect menstrual regularity and ovulation</li>
              <li>May worsen mood disorders that are common with PCOS</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Card className="pcos-card">
        <CardHeader>
          <CardTitle className="text-pcos-purple">Effective Stress Management Techniques</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Managing stress is an essential component of PCOS treatment. Here are evidence-based 
            techniques that can help reduce stress and potentially improve PCOS symptoms:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium text-pcos-purple mb-2 flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Mindfulness Meditation
              </h3>
              <p className="text-sm mb-2">
                The practice of focusing on the present moment without judgment can reduce stress hormones and improve emotional regulation.
              </p>
              <div className="text-sm space-y-2">
                <p className="font-medium">How to practice:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Set aside 5-20 minutes daily</li>
                  <li>Find a quiet, comfortable space</li>
                  <li>Focus on your breath or a specific sensation</li>
                  <li>When your mind wanders, gently bring attention back</li>
                  <li>Use guided meditations through apps like Headspace or Calm</li>
                </ul>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium text-pcos-purple mb-2 flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Yoga and Gentle Movement
              </h3>
              <p className="text-sm mb-2">
                Combines physical postures, breathing exercises, and meditation to reduce stress and improve hormone balance.
              </p>
              <div className="text-sm space-y-2">
                <p className="font-medium">Recommended styles for PCOS:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Restorative yoga</li>
                  <li>Yin yoga</li>
                  <li>Gentle hatha yoga</li>
                  <li>Yoga nidra (yogic sleep)</li>
                </ul>
                <p>Start with 1-2 sessions per week, even just 15-20 minutes can be beneficial.</p>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium text-pcos-purple mb-2 flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Deep Breathing Techniques
              </h3>
              <p className="text-sm mb-2">
                Simple yet powerful tools that activate the parasympathetic nervous system (rest and digest mode).
              </p>
              <div className="text-sm space-y-2">
                <p className="font-medium">Try these techniques:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><span className="font-medium">4-7-8 Breathing:</span> Inhale for 4 counts, hold for 7, exhale for 8</li>
                  <li><span className="font-medium">Box Breathing:</span> Equal counts of inhale, hold, exhale, hold</li>
                  <li><span className="font-medium">Diaphragmatic Breathing:</span> Deep belly breathing</li>
                </ul>
                <p>Practice for 5 minutes, 2-3 times daily, especially during stressful moments.</p>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium text-pcos-purple mb-2 flex items-center gap-2">
                <Moon className="h-5 w-5" />
                Progressive Muscle Relaxation
              </h3>
              <p className="text-sm mb-2">
                Systematically tensing and then releasing muscle groups to reduce physical tension and mental stress.
              </p>
              <div className="text-sm space-y-2">
                <p className="font-medium">Basic method:</p>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Lie down in a comfortable position</li>
                  <li>Starting with your feet, tense the muscles for 5-10 seconds</li>
                  <li>Release and notice the feeling of relaxation</li>
                  <li>Move progressively up through your body</li>
                  <li>Practice for 10-15 minutes before bed or during breaks</li>
                </ol>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="pcos-card">
        <CardHeader>
          <CardTitle className="text-pcos-purple">Lifestyle Adjustments for Stress Reduction</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Beyond specific stress-reduction techniques, certain lifestyle changes can create a foundation 
            for better stress management and improved PCOS symptoms.
          </p>
          
          <div className="space-y-4">
            <div className="p-3 border-l-4 border-pcos-purple/70">
              <h3 className="font-medium mb-1">Prioritize Sleep</h3>
              <p className="text-sm text-gray-600">
                Poor sleep increases stress hormones and insulin resistance, both problematic for PCOS. Aim for 7-9 hours of 
                quality sleep per night. Create a consistent sleep schedule and a relaxing bedtime routine.
              </p>
            </div>
            
            <div className="p-3 border-l-4 border-pcos-purple/70">
              <h3 className="font-medium mb-1">Connect with Others</h3>
              <p className="text-sm text-gray-600">
                Social support is a powerful buffer against stress. Connect with friends, family, or PCOS support groups. 
                Sharing experiences and feelings can reduce isolation and provide practical coping strategies.
              </p>
            </div>
            
            <div className="p-3 border-l-4 border-pcos-purple/70">
              <h3 className="font-medium mb-1">Time in Nature</h3>
              <p className="text-sm text-gray-600">
                Spending time outdoors, especially in green spaces, has been shown to reduce stress hormones and improve mood. 
                Even 20-30 minutes of "nature time" can have beneficial effects on stress levels.
              </p>
            </div>
            
            <div className="p-3 border-l-4 border-pcos-purple/70">
              <h3 className="font-medium mb-1">Digital Detox</h3>
              <p className="text-sm text-gray-600">
                Constant connectivity can increase stress levels. Set boundaries around technology use, especially before bedtime. 
                Consider designated tech-free times or spaces in your home.
              </p>
            </div>
            
            <div className="p-3 border-l-4 border-pcos-purple/70">
              <h3 className="font-medium mb-1">Creative Expression</h3>
              <p className="text-sm text-gray-600">
                Activities like journaling, art, music, or dance can be therapeutic outlets for stress. These practices help 
                process emotions and provide a sense of flow and enjoyment that counters stress.
              </p>
            </div>
            
            <div className="p-3 border-l-4 border-pcos-purple/70">
              <h3 className="font-medium mb-1">Cognitive Behavioral Techniques</h3>
              <p className="text-sm text-gray-600">
                Learn to identify and reframe negative thought patterns. Challenge catastrophic thinking and practice self-compassion. 
                Consider working with a therapist who specializes in stress management or women's health issues.
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-pcos-purple/5 rounded-lg mt-6">
            <h3 className="font-semibold text-pcos-purple mb-2">Creating a Personalized Stress Management Plan</h3>
            <p className="text-sm mb-3">
              The most effective approach to stress management is one that fits your preferences and lifestyle. 
              Consider these steps to create your personalized plan:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-sm">
              <li>
                <span className="font-medium">Identify your stress triggers:</span> Keep a stress journal for a week to 
                recognize patterns and specific situations that increase your stress.
              </li>
              <li>
                <span className="font-medium">Experiment with techniques:</span> Try different stress management methods 
                to discover what works best for you. Give each method a fair trial of at least 1-2 weeks.
              </li>
              <li>
                <span className="font-medium">Start small:</span> Begin with just 5-10 minutes daily of your chosen practice. 
                Consistency matters more than duration.
              </li>
              <li>
                <span className="font-medium">Track your progress:</span> Note improvements in both stress levels and PCOS 
                symptoms. This can provide motivation to continue.
              </li>
              <li>
                <span className="font-medium">Adjust as needed:</span> Your stress management needs may change over time. 
                Be flexible and willing to modify your approach.
              </li>
            </ol>
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
          <Link to="/resources/exercise">
            Next: Exercise Plans
            <ChevronLeft className="h-4 w-4 ml-2 rotate-180" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Stress;
