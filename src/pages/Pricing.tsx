
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const PricingCard = ({ 
  title, 
  price, 
  description, 
  features, 
  buttonText, 
  isPopular = false,
  delay = 0
}: { 
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
  delay?: number;
}) => {
  return (
    <div 
      className={`glass p-8 rounded-2xl relative overflow-hidden flex flex-col animate-fade-up ${
        isPopular ? 'border-primary border-2' : 'border border-white/10'
      }`}
      style={{ animationDelay: `${delay}s` }}
    >
      {isPopular && (
        <div className="absolute top-0 right-0">
          <div className="bg-primary text-white text-xs font-semibold px-4 py-1 rounded-bl-lg">
            Popular
          </div>
        </div>
      )}
      
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <div className="mb-4">
        <span className="text-3xl font-bold">{price}</span>
        {price !== 'Free' && <span className="text-muted-foreground">/month</span>}
      </div>
      
      <p className="text-muted-foreground mb-6">{description}</p>
      
      <div className="flex-grow">
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check size={18} className="text-primary mr-2 mt-0.5 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <Button 
        className={`w-full rounded-full ${
          isPopular ? 'bg-primary hover:bg-primary/90' : 'bg-secondary hover:bg-secondary/90'
        }`}
      >
        {buttonText}
      </Button>
    </div>
  );
};

const Pricing = () => {
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
              PRICING PLANS
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-down" style={{ animationDelay: "0.1s" }}>
              Find the <span className="text-gradient">Perfect Plan</span> for Your Learning Needs
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-down" style={{ animationDelay: "0.2s" }}>
              Choose the plan that works best for you. All plans include access to our qualified tutors,
              with different levels of features to suit your requirements.
            </p>
          </div>
        </section>
        
        {/* Pricing Cards */}
        <section className="py-16 relative">
          <div className="container mx-auto px-4 md:px-6">
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
                title="Family"
                price="$29.99"
                description="Perfect for families with multiple students."
                features={[
                  "All Premium features",
                  "Up to 5 student profiles",
                  "Family discount on bookings",
                  "Weekly progress reports",
                  "Dedicated support",
                  "Group session options"
                ]}
                buttonText="Choose Family"
                delay={0.3}
              />
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
                Ready to Find Your Perfect Tutor?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Start your learning journey today with our qualified tutors and flexible pricing plans.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="rounded-full">
                  Get Started Now
                </Button>
                <Button variant="outline" size="lg" className="rounded-full">
                  Contact Sales
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

export default Pricing;
