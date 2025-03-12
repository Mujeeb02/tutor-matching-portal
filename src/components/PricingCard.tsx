
import React from 'react';
import { Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
  delay?: number;
}

const PricingCard = ({ 
  title, 
  price, 
  description, 
  features, 
  buttonText, 
  isPopular = false,
  delay = 0
}: PricingCardProps) => {
  return (
    <div 
      className={cn(
        "glass p-8 rounded-2xl relative overflow-hidden flex flex-col animate-fade-up transform transition-all duration-500 hover:scale-105 hover:shadow-xl",
        isPopular ? 'border-primary border-2' : 'border border-white/10'
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      {isPopular && (
        <div className="absolute top-0 right-0">
          <div className="bg-primary text-white text-xs font-semibold px-4 py-1 rounded-bl-lg animate-pulse-slow">
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
        className={cn(
          "w-full rounded-full transition-colors duration-300",
          isPopular 
            ? 'bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-primary/40' 
            : 'bg-secondary hover:bg-secondary/90'
        )}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default PricingCard;
