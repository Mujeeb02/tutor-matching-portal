
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const Features = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32">
        {/* Hero Section */}
        <section className="pt-8 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-accent/40 to-background"></div>
            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-700/20 rounded-full filter blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 md:px-6 text-center">
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider text-primary bg-primary/10 rounded-full animate-fade-down">
              ALL FEATURES
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-down" style={{ animationDelay: "0.1s" }}>
              Explore All <span className="text-gradient">TutorMatch</span> Features
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-down" style={{ animationDelay: "0.2s" }}>
              Discover all the powerful tools and features that make TutorMatch the leading platform for connecting students with qualified tutors.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="glass p-8 rounded-2xl h-full flex flex-col animate-fade-up hover:scale-105 transition-transform duration-300"
                  style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground mb-6">{feature.description}</p>
                  <div className="mt-auto">
                    <ul className="space-y-2">
                      {feature.bulletPoints.map((point, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check size={18} className="text-primary mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-900/20 to-primary/20"></div>
          
          <div className="container mx-auto px-4 md:px-6">
            <div className="glass rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto animate-fade-up">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Experience All Features?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join TutorMatch today and get access to all our premium features to enhance your learning journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="rounded-full" asChild>
                  <a href="/signup">Get Started Now</a>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full" asChild>
                  <a href="/pricing">View Pricing Plans</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

// Feature data
const features = [
  {
    title: "Smart Tutor Matching",
    description: "Our advanced algorithm matches students with the perfect tutors based on learning style, subject, and availability.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    bulletPoints: [
      "Personalized matching algorithm",
      "Filter by subject expertise",
      "Match based on teaching style",
      "Instant recommendation engine"
    ]
  },
  {
    title: "Video Sessions",
    description: "High-quality video conferencing built directly into the platform for seamless learning experiences.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
    bulletPoints: [
      "HD video quality",
      "Built-in whiteboard",
      "Screen sharing capability",
      "Session recording"
    ]
  },
  {
    title: "Secure Payments",
    description: "Safe and transparent payment processing with multiple options and automated billing.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>,
    bulletPoints: [
      "Multiple payment methods",
      "Secure encryption",
      "Automated billing",
      "Payment protection"
    ]
  },
  {
    title: "Learning Materials Library",
    description: "Access and share educational resources, worksheets, practice tests, and study guides.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
    bulletPoints: [
      "Organized by subject",
      "Downloadable resources",
      "Custom study plans",
      "Progress tracking"
    ]
  },
  {
    title: "Progress Tracking",
    description: "Detailed analytics and reports to monitor student progress and identify areas for improvement.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    bulletPoints: [
      "Visual progress charts",
      "Performance analytics",
      "Goal setting tools",
      "Improvement recommendations"
    ]
  },
  {
    title: "Scheduling System",
    description: "Flexible calendar management with reminders and automatic timezone adjustment.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    bulletPoints: [
      "Flexible session booking",
      "Calendar integration",
      "Automated reminders",
      "Timezone adjustment"
    ]
  },
  {
    title: "Messaging System",
    description: "Secure in-app messaging for easy communication between tutors and students.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>,
    bulletPoints: [
      "Real-time messaging",
      "File sharing",
      "Message history",
      "Notification alerts"
    ]
  },
  {
    title: "Review System",
    description: "Transparent ratings and reviews to help students find the most effective tutors.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
    bulletPoints: [
      "Verified student reviews",
      "Rating system",
      "Detailed feedback",
      "Quality metrics"
    ]
  },
  {
    title: "Mobile Accessibility",
    description: "Access all features on-the-go with our responsive mobile application.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
    bulletPoints: [
      "Mobile-optimized interface",
      "Push notifications",
      "Offline access to materials",
      "Quick session joining"
    ]
  }
];

export default Features;
