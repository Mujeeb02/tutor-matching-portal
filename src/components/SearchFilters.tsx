
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Check, ChevronDown, Filter, MapPin, Star } from 'lucide-react';

interface FilterProps {
  onFilterChange: (filters: any) => void;
}

const SearchFilters = ({ onFilterChange }: FilterProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [priceRange, setPriceRange] = useState([20, 100]);
  const [rating, setRating] = useState(0);
  const [availableNow, setAvailableNow] = useState(false);
  
  const subjects = [
    "Mathematics", "Physics", "Chemistry", "Biology", 
    "English", "History", "Geography", "Computer Science",
    "Economics", "Business Studies", "Languages", "Music"
  ];
  
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const toggleSubject = (subject: string) => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter(s => s !== subject));
    } else {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

  const applyFilters = () => {
    onFilterChange({
      priceRange,
      rating,
      availableNow,
      subjects: selectedSubjects
    });
  };

  return (
    <div className="w-full bg-card rounded-2xl glass overflow-hidden mb-8 animate-fade-up">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Filter size={20} className="mr-2 text-primary" />
            <h3 className="font-medium">Filter Tutors</h3>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center text-muted-foreground"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Collapse" : "Expand"}
            <ChevronDown size={16} className={`ml-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </Button>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4 mt-4 transition-all">
          <div className="relative flex-1">
            <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input 
              type="text" 
              placeholder="Location" 
              className="pl-10 rounded-full"
            />
          </div>
          <div className="flex-1">
            <div className="relative">
              <select className="w-full bg-background border border-border rounded-full px-4 py-2 appearance-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary">
                <option value="">Subject</option>
                <option value="mathematics">Mathematics</option>
                <option value="physics">Physics</option>
                <option value="english">English</option>
                <option value="chemistry">Chemistry</option>
                <option value="biology">Biology</option>
                <option value="computer_science">Computer Science</option>
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          </div>
          <Button className="rounded-full" onClick={applyFilters}>
            Apply Filters
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 pt-0 border-t border-border mt-4 animate-fade-down">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Price Range */}
            <div>
              <Label className="mb-4 block">Price Range ($/hr)</Label>
              <div className="px-2">
                <Slider 
                  defaultValue={[priceRange[0], priceRange[1]]} 
                  max={200} 
                  step={5}
                  className="my-5"
                  onValueChange={(value) => setPriceRange(value as number[])}
                />
                <div className="flex justify-between text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}+</span>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div>
              <Label className="mb-4 block">Minimum Rating</Label>
              <div className="flex flex-wrap gap-2">
                {[0, 3, 3.5, 4, 4.5, 5].map((value) => (
                  <Button 
                    key={value} 
                    variant={rating === value ? "default" : "outline"} 
                    size="sm"
                    className="rounded-full"
                    onClick={() => setRating(value)}
                  >
                    {value === 0 ? "Any" : (
                      <div className="flex items-center">
                        <span>{value}+</span>
                        <Star size={14} className="ml-1" />
                      </div>
                    )}
                  </Button>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div>
              <Label className="mb-4 block">Availability</Label>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="available-now" 
                  checked={availableNow}
                  onCheckedChange={setAvailableNow}
                />
                <Label htmlFor="available-now">Available now</Label>
              </div>
            </div>
          </div>

          {/* Subjects */}
          <div className="mt-6">
            <Label className="mb-4 block">Subjects</Label>
            <div className="flex flex-wrap gap-2">
              {subjects.map((subject) => (
                <Button
                  key={subject}
                  variant={selectedSubjects.includes(subject) ? "default" : "outline"}
                  size="sm"
                  className="rounded-full"
                  onClick={() => toggleSubject(subject)}
                >
                  {selectedSubjects.includes(subject) && (
                    <Check size={14} className="mr-1" />
                  )}
                  {subject}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
