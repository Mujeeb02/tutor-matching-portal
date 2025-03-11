
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock, MessageSquare, Bookmark, BookmarkCheck } from 'lucide-react';

interface TutorCardProps {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  location: string;
  subjects: string[];
  hourlyRate: number;
  experience: number;
  available: boolean;
  delay?: number;
}

const TutorCard = ({
  id,
  name,
  image,
  rating,
  reviewCount,
  location,
  subjects,
  hourlyRate,
  experience,
  available,
  delay = 0
}: TutorCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card 
      className="overflow-hidden glass hover:shadow-xl transition-all duration-300 animate-fade-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="relative">
        {/* Availability Badge */}
        <div className={`absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-xs font-medium 
          ${available 
            ? 'bg-green-500/20 text-green-400 border border-green-500/40' 
            : 'bg-gray-500/20 text-gray-400 border border-gray-500/40'
          }`}
        >
          {available ? 'Available Now' : 'Not Available'}
        </div>

        {/* Favorite Button */}
        <button 
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center bg-background/70 backdrop-blur-sm hover:bg-background transition-colors"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          {isFavorite ? (
            <BookmarkCheck size={18} className="text-primary" />
          ) : (
            <Bookmark size={18} className="text-muted-foreground" />
          )}
        </button>

        {/* Tutor Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10"></div>
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
        </div>
      </div>

      <div className="p-5">
        {/* Tutor Info */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-semibold">{name}</h3>
            <div className="flex items-center mt-1">
              <div className="flex items-center text-yellow-500 mr-1.5">
                <Star size={16} className="fill-yellow-500" />
                <span className="ml-1 text-sm font-medium">{rating}</span>
              </div>
              <span className="text-xs text-muted-foreground">({reviewCount} reviews)</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-primary">${hourlyRate}</div>
            <div className="text-xs text-muted-foreground">per hour</div>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center mb-3 text-sm text-muted-foreground">
          <MapPin size={16} className="mr-1" />
          <span>{location}</span>
        </div>

        {/* Experience */}
        <div className="flex items-center mb-3 text-sm text-muted-foreground">
          <Clock size={16} className="mr-1" />
          <span>{experience} years experience</span>
        </div>

        {/* Subjects */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {subjects.map((subject, index) => (
            <Badge key={index} variant="secondary" className="rounded-full text-xs">
              {subject}
            </Badge>
          ))}
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2">
          <Button className="rounded-full" variant="outline">
            <MessageSquare size={16} className="mr-1.5" />
            Message
          </Button>
          <Button className="rounded-full">View Profile</Button>
        </div>
      </div>
    </Card>
  );
};

export default TutorCard;
