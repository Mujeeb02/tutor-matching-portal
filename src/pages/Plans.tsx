
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingCard from "@/components/PricingCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const Plans = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-accent/40 to-background"></div>
            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-700/20 rounded-full filter blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 md:px-6 text-center">
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider text-primary bg-primary/10 rounded-full animate-fade-down">
              ALL PRICING PLANS
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-down" style={{ animationDelay: "0.1s" }}>
              Choose the <span className="text-gradient">Perfect Plan</span> for Your Learning Journey
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-down" style={{ animationDelay: "0.2s" }}>
              Explore all our flexible pricing options designed to fit every budget and learning need.
              No hidden fees, cancel anytime.
            </p>
          </div>
        </section>
        
        {/* Plan Type Selector */}
        <section className="pb-8">
          <div className="container mx-auto px-4 md:px-6">
            <Tabs defaultValue="individual" className="w-full max-w-md mx-auto">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="individual">Individual</TabsTrigger>
                <TabsTrigger value="family">Family</TabsTrigger>
                <TabsTrigger value="schools">Schools</TabsTrigger>
              </TabsList>
              
              {/* Individual Plans */}
              <TabsContent value="individual" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <PricingCard 
                    title="Basic"
                    price="Free"
                    description="For students just getting started with tutoring needs."
                    features={[
                      "Browse tutor profiles",
                      "Search by location",
                      "Basic filtering options",
                      "Read tutor reviews",
                      "Limited messaging"
                    ]}
                    buttonText="Get Started"
                    delay={0.1}
                  />
                  
                  <PricingCard 
                    title="Premium"
                    price="$19.99"
                    description="Our most popular plan, perfect for regular students."
                    features={[
                      "All Basic features",
                      "Advanced filtering",
                      "Priority booking",
                      "Unlimited messaging",
                      "Video consultations",
                      "Save favorite tutors"
                    ]}
                    buttonText="Start Premium"
                    isPopular={true}
                    delay={0.2}
                  />
                  
                  <PricingCard 
                    title="Ultimate"
                    price="$39.99"
                    description="For serious students who need comprehensive support."
                    features={[
                      "All Premium features",
                      "Guaranteed response times",
                      "24/7 priority support",
                      "Study material access",
                      "Progress tracking",
                      "Personalized learning plan"
                    ]}
                    buttonText="Choose Ultimate"
                    delay={0.3}
                  />
                </div>
              </TabsContent>
              
              {/* Family Plans */}
              <TabsContent value="family" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <PricingCard 
                    title="Family Basic"
                    price="$29.99"
                    description="Perfect for families with up to 3 students."
                    features={[
                      "Up to 3 student profiles",
                      "All Premium features",
                      "Family discount on bookings",
                      "Shared calendar",
                      "Family progress reports",
                      "15% off on additional bookings"
                    ]}
                    buttonText="Choose Family Basic"
                    delay={0.1}
                  />
                  
                  <PricingCard 
                    title="Family Plus"
                    price="$49.99"
                    description="Ideal for larger families with up to 5 students."
                    features={[
                      "Up to 5 student profiles",
                      "All Family Basic features",
                      "20% off on additional bookings",
                      "Group session options",
                      "Family learning dashboard",
                      "Dedicated family coordinator"
                    ]}
                    buttonText="Start Family Plus"
                    isPopular={true}
                    delay={0.2}
                  />
                  
                  <PricingCard 
                    title="Family Ultimate"
                    price="$69.99"
                    description="Complete support for families with unlimited students."
                    features={[
                      "Unlimited student profiles",
                      "All Family Plus features",
                      "25% off on additional bookings",
                      "Priority scheduling for all members",
                      "Customized family learning plan",
                      "Monthly family progress review"
                    ]}
                    buttonText="Choose Family Ultimate"
                    delay={0.3}
                  />
                </div>
              </TabsContent>
              
              {/* Schools Plans */}
              <TabsContent value="schools" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <PricingCard 
                    title="School Basic"
                    price="$199.99"
                    description="Perfect for small schools or departments."
                    features={[
                      "Up to 25 student accounts",
                      "5 teacher management accounts",
                      "School dashboard",
                      "Basic analytics",
                      "Bulk session booking",
                      "Standard support"
                    ]}
                    buttonText="Choose School Basic"
                    delay={0.1}
                  />
                  
                  <PricingCard 
                    title="School Professional"
                    price="$499.99"
                    description="Comprehensive solution for medium-sized schools."
                    features={[
                      "Up to 100 student accounts",
                      "15 teacher management accounts",
                      "Advanced school dashboard",
                      "Detailed analytics & reporting",
                      "Custom integration options",
                      "Priority support"
                    ]}
                    buttonText="Start Professional"
                    isPopular={true}
                    delay={0.2}
                  />
                  
                  <PricingCard 
                    title="School Enterprise"
                    price="Custom"
                    description="Tailored solutions for large educational institutions."
                    features={[
                      "Unlimited student accounts",
                      "Unlimited teacher accounts",
                      "Enterprise dashboard & controls",
                      "API access",
                      "White-label options",
                      "Dedicated account manager"
                    ]}
                    buttonText="Contact Sales"
                    delay={0.3}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Comparison Table */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Plan Comparison</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Compare our plans side-by-side to find the perfect fit for your learning needs
              </p>
            </div>
            
            <div className="glass rounded-xl overflow-hidden animate-fade-up">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-6 py-4 text-left"></th>
                      <th className="px-6 py-4 text-center">Basic</th>
                      <th className="px-6 py-4 text-center bg-primary/5 border-x border-white/10">Premium</th>
                      <th className="px-6 py-4 text-center">Ultimate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/10">
                      <td className="px-6 py-4 font-medium">Price</td>
                      <td className="px-6 py-4 text-center">Free</td>
                      <td className="px-6 py-4 text-center bg-primary/5 border-x border-white/10">$19.99/month</td>
                      <td className="px-6 py-4 text-center">$39.99/month</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="px-6 py-4 font-medium">Tutor Search</td>
                      <td className="px-6 py-4 text-center">Basic</td>
                      <td className="px-6 py-4 text-center bg-primary/5 border-x border-white/10">Advanced</td>
                      <td className="px-6 py-4 text-center">Advanced+</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="px-6 py-4 font-medium">Messaging</td>
                      <td className="px-6 py-4 text-center">Limited</td>
                      <td className="px-6 py-4 text-center bg-primary/5 border-x border-white/10">Unlimited</td>
                      <td className="px-6 py-4 text-center">Priority</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="px-6 py-4 font-medium">Video Sessions</td>
                      <td className="px-6 py-4 text-center">✖</td>
                      <td className="px-6 py-4 text-center bg-primary/5 border-x border-white/10">✓</td>
                      <td className="px-6 py-4 text-center">✓</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="px-6 py-4 font-medium">Learning Materials</td>
                      <td className="px-6 py-4 text-center">✖</td>
                      <td className="px-6 py-4 text-center bg-primary/5 border-x border-white/10">Limited</td>
                      <td className="px-6 py-4 text-center">Full Access</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="px-6 py-4 font-medium">Progress Tracking</td>
                      <td className="px-6 py-4 text-center">✖</td>
                      <td className="px-6 py-4 text-center bg-primary/5 border-x border-white/10">Basic</td>
                      <td className="px-6 py-4 text-center">Advanced</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium">Support</td>
                      <td className="px-6 py-4 text-center">Email</td>
                      <td className="px-6 py-4 text-center bg-primary/5 border-x border-white/10">Email & Chat</td>
                      <td className="px-6 py-4 text-center">24/7 Priority</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-gradient-to-b from-background via-accent/5 to-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4 animate-fade-up">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground animate-fade-up" style={{ animationDelay: "0.1s" }}>
                Have questions about our pricing plans? Find answers to common questions below.
              </p>
            </div>
            
            <div className="glass max-w-3xl mx-auto divide-y divide-white/10 rounded-2xl overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">Can I change plans anytime?</h3>
                <p className="text-muted-foreground">Yes, you can upgrade or downgrade your plan at any time. Changes will be applied at the start of your next billing cycle.</p>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">Do you offer student discounts?</h3>
                <p className="text-muted-foreground">Yes! Students with a valid ID can get 15% off any paid plan. Contact our support team to apply the discount.</p>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">How do tutor payments work?</h3>
                <p className="text-muted-foreground">Tutors set their own rates. Your plan subscription gives you access to the platform features, but tutor fees are separate and paid directly to tutors.</p>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">Can I get a refund if I'm not satisfied?</h3>
                <p className="text-muted-foreground">We offer a 7-day money-back guarantee for all paid plans. If you're not satisfied, contact support within 7 days of your purchase.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-900/20 to-primary/20"></div>
          
          <div className="container mx-auto px-4 md:px-6">
            <div className="glass rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto animate-fade-up">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Start Your Learning Journey?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of students who are achieving their learning goals with TutorMatch.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="rounded-full" asChild>
                  <a href="/signup">Sign Up Now</a>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full" asChild>
                  <a href="/contact">Contact Sales</a>
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

export default Plans;
