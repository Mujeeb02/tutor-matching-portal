
import { useState } from "react";
import { cn } from "@/lib/utils";
import StudentSidebar from "@/components/StudentSidebar";
import {
  FileText,
  Search,
  Filter,
  Download,
  Folder,
  File,
  Video,
  Image as ImageIcon,
  BookOpen,
  MoreVertical,
  Plus,
  Star,
  ChevronDown,
  Layout,
  Grid,
  List,
  Eye,
  Clock,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

// Types for learning materials
interface Material {
  id: number;
  title: string;
  description: string;
  type: "document" | "video" | "quiz" | "image" | "audio" | "practice";
  subject: string;
  tutorName: string;
  tutorAvatar: string;
  dateAdded: Date;
  fileSize?: string;
  duration?: string;
  starred: boolean;
  tags: string[];
  thumbnail?: string;
}

// Material card component
const MaterialCard = ({ 
  material, 
  view 
}: { 
  material: Material; 
  view: "grid" | "list"; 
}) => {
  const [isStarred, setIsStarred] = useState(material.starred);
  
  const handleToggleStar = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsStarred(!isStarred);
    toast.success(isStarred ? "Removed from favorites" : "Added to favorites");
  };
  
  const handleOpenMaterial = () => {
    toast.info(`Opening ${material.title}`);
  };
  
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success(`Downloading ${material.title}`);
  };
  
  // Icon based on material type
  const MaterialIcon = () => {
    switch (material.type) {
      case "document":
        return <FileText className="h-6 w-6 text-blue-500" />;
      case "video":
        return <Video className="h-6 w-6 text-red-500" />;
      case "quiz":
        return <BookOpen className="h-6 w-6 text-purple-500" />;
      case "image":
        return <ImageIcon className="h-6 w-6 text-green-500" />;
      case "audio":
        return <FileText className="h-6 w-6 text-yellow-500" />;
      case "practice":
        return <FileText className="h-6 w-6 text-orange-500" />;
      default:
        return <File className="h-6 w-6" />;
    }
  };
  
  if (view === "grid") {
    return (
      <Card 
        className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
        onClick={handleOpenMaterial}
      >
        <div className="aspect-video bg-secondary relative flex items-center justify-center">
          {material.thumbnail ? (
            <img src={material.thumbnail} alt={material.title} className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <MaterialIcon />
              <span className="mt-2 text-xs text-muted-foreground capitalize">{material.type}</span>
            </div>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
              "absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80 hover:bg-background",
              isStarred && "text-yellow-500"
            )}
            onClick={handleToggleStar}
          >
            <Star className={cn("h-4 w-4", isStarred && "fill-yellow-500")} />
          </Button>
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-medium line-clamp-1">{material.title}</h3>
              <p className="text-sm text-muted-foreground">{material.subject}</p>
            </div>
          </div>
          <div className="flex items-center text-xs text-muted-foreground mt-2">
            <Clock className="h-3 w-3 mr-1" />
            <span>
              {material.dateAdded.toLocaleDateString([], { month: 'short', day: 'numeric' })}
            </span>
            {material.duration && (
              <>
                <span className="mx-1">•</span>
                <span>{material.duration}</span>
              </>
            )}
            {material.fileSize && (
              <>
                <span className="mx-1">•</span>
                <span>{material.fileSize}</span>
              </>
            )}
          </div>
        </CardContent>
        <CardFooter className="px-4 py-3 border-t flex justify-between">
          <div className="flex items-center">
            <Avatar className="h-6 w-6 mr-2">
              <AvatarImage src={material.tutorAvatar} alt={material.tutorName} />
              <AvatarFallback>{material.tutorName.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-xs">{material.tutorName}</span>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleDownload}>
            <Download className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    );
  }
  
  // List view
  return (
    <div 
      className="flex items-center p-4 hover:bg-secondary/50 rounded-lg transition-colors cursor-pointer"
      onClick={handleOpenMaterial}
    >
      <div className="mr-4">
        <MaterialIcon />
      </div>
      <div className="flex-grow min-w-0">
        <h3 className="font-medium">{material.title}</h3>
        <div className="flex text-sm text-muted-foreground">
          <span>{material.subject}</span>
          <span className="mx-1">•</span>
          <span>{material.dateAdded.toLocaleDateString([], { month: 'short', day: 'numeric' })}</span>
          {(material.duration || material.fileSize) && <span className="mx-1">•</span>}
          {material.duration && <span>{material.duration}</span>}
          {material.fileSize && <span>{material.fileSize}</span>}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "h-8 w-8",
            isStarred && "text-yellow-500"
          )}
          onClick={handleToggleStar}
        >
          <Star className={cn("h-4 w-4", isStarred && "fill-yellow-500")} />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleDownload}>
          <Download className="h-4 w-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => toast.info("View details")}>View Details</DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast.info("Share material")}>Share</DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast.info("Print material")}>Print</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

// Folder component
const FolderItem = ({ name, count }: { name: string; count: number }) => {
  return (
    <div className="flex items-center p-3 hover:bg-secondary/50 rounded-lg transition-colors cursor-pointer">
      <Folder className="h-5 w-5 mr-3 text-blue-500" />
      <div className="flex-grow">
        <span className="font-medium">{name}</span>
      </div>
      <Badge variant="secondary">{count}</Badge>
    </div>
  );
};

const MaterialsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  
  // Mock data for materials
  const materials: Material[] = [
    {
      id: 1,
      title: "Calculus: Limits and Derivatives",
      description: "Comprehensive guide to understanding limits and derivatives in calculus",
      type: "document",
      subject: "Mathematics",
      tutorName: "Dr. Michael Smith",
      tutorAvatar: "https://i.pravatar.cc/150?img=35",
      dateAdded: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      fileSize: "2.4 MB",
      starred: true,
      tags: ["calculus", "derivatives", "mathematical analysis"]
    },
    {
      id: 2,
      title: "Introduction to Shakespeare's Plays",
      description: "Video lecture on the historical context and themes in Shakespeare's major works",
      type: "video",
      subject: "English Literature",
      tutorName: "Prof. Emily Chen",
      tutorAvatar: "https://i.pravatar.cc/150?img=45",
      dateAdded: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
      duration: "45 min",
      starred: false,
      tags: ["shakespeare", "literature", "drama"],
      thumbnail: "https://images.unsplash.com/photo-1518674660708-0e2c0473e68e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNoYWtlc3BlYXJlfGVufDB8fDB8fHww"
    },
    {
      id: 3,
      title: "Organic Chemistry Quiz",
      description: "Test your understanding of organic chemistry concepts",
      type: "quiz",
      subject: "Chemistry",
      tutorName: "Dr. James Lee",
      tutorAvatar: "https://i.pravatar.cc/150?img=68",
      dateAdded: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      duration: "20 questions",
      starred: false,
      tags: ["organic chemistry", "quiz", "assessment"]
    },
    {
      id: 4,
      title: "Cell Structure Diagram",
      description: "Detailed diagram of eukaryotic cell structure with labels",
      type: "image",
      subject: "Biology",
      tutorName: "Prof. Lisa Johnson",
      tutorAvatar: "https://i.pravatar.cc/150?img=20",
      dateAdded: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      fileSize: "1.2 MB",
      starred: true,
      tags: ["biology", "cell structure", "diagram"],
      thumbnail: "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNlbGx8ZW58MHx8MHx8fDA%3D"
    },
    {
      id: 5,
      title: "Physics Problem Set - Motion",
      description: "Practice problems on kinematics and Newton's laws of motion",
      type: "practice",
      subject: "Physics",
      tutorName: "Dr. Robert Wilson",
      tutorAvatar: "https://i.pravatar.cc/150?img=60",
      dateAdded: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      fileSize: "1.8 MB",
      starred: false,
      tags: ["physics", "mechanics", "practice problems"]
    },
    {
      id: 6,
      title: "Spanish Pronunciation Guide",
      description: "Audio guide to Spanish pronunciation for beginners",
      type: "audio",
      subject: "Spanish",
      tutorName: "María González",
      tutorAvatar: "https://i.pravatar.cc/150?img=25",
      dateAdded: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
      duration: "35 min",
      starred: false,
      tags: ["spanish", "pronunciation", "language learning"]
    }
  ];

  // Mock data for folders/subjects
  const folders = [
    { name: "Mathematics", count: 12 },
    { name: "English Literature", count: 8 },
    { name: "Chemistry", count: 5 },
    { name: "Biology", count: 7 },
    { name: "Physics", count: 9 },
    { name: "Languages", count: 4 }
  ];
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        material.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        material.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesSubject = selectedSubject === "all" || material.subject === selectedSubject;
    const matchesType = selectedType === "all" || material.type === selectedType;
    
    return matchesSearch && matchesSubject && matchesType;
  });
  
  // Get unique subjects for filter dropdown
  const subjects = ["all", ...new Set(materials.map(m => m.subject))];
  const types = ["all", ...new Set(materials.map(m => m.type))];

  return (
    <div className="min-h-screen flex bg-background">
      <StudentSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div 
        className={cn(
          "flex-1 transition-all duration-300",
          isSidebarOpen ? "ml-64" : "ml-20"
        )}
      >
        <main className="py-8 px-6 max-w-7xl mx-auto w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Learning Materials</h1>
            <p className="text-muted-foreground">Access your study materials and resources</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar/filter panel */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Folders</CardTitle>
                </CardHeader>
                <CardContent className="px-2">
                  <ScrollArea className="h-[300px]">
                    <div className="px-1 space-y-1">
                      <FolderItem name="All Materials" count={materials.length} />
                      <FolderItem name="Starred" count={materials.filter(m => m.starred).length} />
                      <FolderItem name="Recent" count={3} />
                      <Separator className="my-2" />
                      {folders.map((folder, index) => (
                        <FolderItem key={index} name={folder.name} count={folder.count} />
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => toast.info("Create folder dialog will open here")}>
                    <Plus className="mr-2 h-4 w-4" />
                    New Folder
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Quick Access</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" onClick={() => toast.info("Uploading materials...")}>
                      <Plus className="mr-2 h-4 w-4" />
                      Upload Materials
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => setSelectedSubject("all")}>
                      <Eye className="mr-2 h-4 w-4" />
                      View All Materials
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => toast.info("Resources will be shown")}>
                      <BookOpen className="mr-2 h-4 w-4" />
                      Study Resources
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main content area */}
            <div className="lg:col-span-3 space-y-6">
              {/* Search and filter bar */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search materials..." 
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject, index) => (
                        <SelectItem key={index} value={subject}>
                          {subject === "all" ? "All Subjects" : subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {types.map((type, index) => (
                        <SelectItem key={index} value={type}>
                          {type === "all" ? "All Types" : type.charAt(0).toUpperCase() + type.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Layout className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setView("grid")}>
                        <Grid className="h-4 w-4 mr-2" />
                        Grid View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setView("list")}>
                        <List className="h-4 w-4 mr-2" />
                        List View
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              {/* Results count and sort */}
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredMaterials.length} items
                </p>
                <Select defaultValue="newest">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="a-z">A to Z</SelectItem>
                    <SelectItem value="z-a">Z to A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Materials grid/list */}
              {filteredMaterials.length > 0 ? (
                view === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredMaterials.map(material => (
                      <MaterialCard key={material.id} material={material} view={view} />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-0">
                      <div className="divide-y">
                        {filteredMaterials.map(material => (
                          <MaterialCard key={material.id} material={material} view={view} />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              ) : (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No materials found</h3>
                  <p className="text-muted-foreground mb-6">
                    We couldn't find any materials matching your criteria.
                  </p>
                  <Button onClick={() => {
                    setSearchQuery("");
                    setSelectedSubject("all");
                    setSelectedType("all");
                  }}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MaterialsPage;
