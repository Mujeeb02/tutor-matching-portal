import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Search,
  FileText,
  Folder,
  Upload,
  File,
  Plus,
  MoreVertical,
  Clock,
  Calendar,
  Download,
  Eye,
  Users,
  Trash2,
  Edit,
  Grid,
  List,
  Filter,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import TutorSidebar from "@/components/TutorSidebar";

interface MaterialItem {
  id: number;
  name: string;
  type: "document" | "image" | "video" | "audio" | "folder";
  size?: string;
  sharedWith?: number;
  uploadDate: Date;
  lastModified: Date;
  category: "worksheets" | "notes" | "homework" | "exams" | "resources";
  thumbnailUrl?: string;
  tags: string[];
  subject?: string;
}

interface Folder {
  id: number;
  name: string;
  itemCount: number;
  color: string;
}

const MaterialsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showNewFolderDialog, setShowNewFolderDialog] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const [newFolder, setNewFolder] = useState({
    name: "",
    color: "blue",
  });

  const [newMaterial, setNewMaterial] = useState({
    name: "",
    type: "document",
    subject: "",
    category: "worksheets",
    description: "",
    tags: "",
    file: null as File | null,
  });

  // Mock materials data
  const materials: MaterialItem[] = [
    {
      id: 1,
      name: "Calculus Practice Problems.pdf",
      type: "document",
      size: "2.4 MB",
      sharedWith: 3,
      uploadDate: new Date(2023, 10, 1),
      lastModified: new Date(2023, 10, 2),
      category: "worksheets",
      thumbnailUrl: "https://placehold.co/400x300/e2f0ff/0078d7?text=PDF",
      tags: ["calculus", "practice", "integrals"],
      subject: "Mathematics",
    },
    {
      id: 2,
      name: "Physics Mechanics Formulas.pdf",
      type: "document",
      size: "1.8 MB",
      sharedWith: 2,
      uploadDate: new Date(2023, 9, 25),
      lastModified: new Date(2023, 9, 25),
      category: "notes",
      thumbnailUrl: "https://placehold.co/400x300/e2f0ff/0078d7?text=PDF",
      tags: ["physics", "mechanics", "formulas"],
      subject: "Physics",
    },
    {
      id: 3,
      name: "Chemical Reactions Video.mp4",
      type: "video",
      size: "45.2 MB",
      sharedWith: 5,
      uploadDate: new Date(2023, 10, 3),
      lastModified: new Date(2023, 10, 3),
      category: "resources",
      thumbnailUrl: "https://placehold.co/400x300/f8e8ff/9c27b0?text=VIDEO",
      tags: ["chemistry", "reactions", "video"],
      subject: "Chemistry",
    },
    {
      id: 4,
      name: "Biology Cell Structure Diagram.jpg",
      type: "image",
      size: "3.5 MB",
      sharedWith: 4,
      uploadDate: new Date(2023, 9, 28),
      lastModified: new Date(2023, 9, 30),
      category: "notes",
      thumbnailUrl: "https://placehold.co/400x300/e8f8e8/2e7d32?text=IMAGE",
      tags: ["biology", "cells", "diagram"],
      subject: "Biology",
    },
    {
      id: 5,
      name: "Midterm Exam Practice.pdf",
      type: "document",
      size: "4.2 MB",
      sharedWith: 8,
      uploadDate: new Date(2023, 10, 5),
      lastModified: new Date(2023, 10, 5),
      category: "exams",
      thumbnailUrl: "https://placehold.co/400x300/e2f0ff/0078d7?text=PDF",
      tags: ["exam", "practice", "midterm"],
      subject: "Mathematics",
    },
    {
      id: 6,
      name: "Homework Solutions Week 8.pdf",
      type: "document",
      size: "1.5 MB",
      sharedWith: 6,
      uploadDate: new Date(2023, 10, 4),
      lastModified: new Date(2023, 10, 4),
      category: "homework",
      thumbnailUrl: "https://placehold.co/400x300/e2f0ff/0078d7?text=PDF",
      tags: ["homework", "solutions"],
      subject: "Physics",
    },
  ];

  // Mock folders
  const folders: Folder[] = [
    { id: 1, name: "Mathematics Materials", itemCount: 12, color: "blue" },
    { id: 2, name: "Physics Resources", itemCount: 8, color: "purple" },
    { id: 3, name: "Chemistry Notes", itemCount: 5, color: "green" },
    { id: 4, name: "Student Assignments", itemCount: 15, color: "orange" },
  ];

  // Filter materials based on search query and selected category
  const filteredMaterials = materials.filter((material) => {
    const matchesSearch = material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (selectedCategory === "all") {
      return matchesSearch;
    } else {
      return matchesSearch && material.category === selectedCategory;
    }
  });

  const handleFileUpload = () => {
    // Simulate file upload progress
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          toast.success("File uploaded successfully!");
          setShowUploadDialog(false);
          return 0;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleCreateFolder = () => {
    toast.success(`Folder "${newFolder.name}" created successfully!`);
    setShowNewFolderDialog(false);
    setNewFolder({ name: "", color: "blue" });
  };

  const handleDeleteMaterial = (id: number, name: string) => {
    toast.success(`"${name}" deleted successfully!`);
    console.log("Deleted material:", id);
  };

  const handleShareMaterial = (id: number, name: string) => {
    toast.success(`Sharing options for "${name}" opened`);
    console.log("Sharing material:", id);
  };

  const getIconForFileType = (type: MaterialItem["type"]) => {
    switch (type) {
      case "document":
        return <FileText className="h-6 w-6 text-blue-500" />;
      case "image":
        return <File className="h-6 w-6 text-green-500" />;
      case "video":
        return <File className="h-6 w-6 text-purple-500" />;
      case "audio":
        return <File className="h-6 w-6 text-orange-500" />;
      case "folder":
        return <Folder className="h-6 w-6 text-yellow-500" />;
      default:
        return <File className="h-6 w-6" />;
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex bg-background">
      <TutorSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div 
        className={cn(
          "flex-1 transition-all duration-300",
          isSidebarOpen ? "ml-64" : "ml-0"
        )}
      >
        <main className="container p-6 space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">Teaching Materials</h1>
              <p className="text-muted-foreground mt-1">Manage and share your learning resources</p>
            </div>
            <div className="flex gap-2 mt-4 sm:mt-0">
              <Button 
                variant="outline" 
                onClick={() => setShowNewFolderDialog(true)}
                className="flex items-center gap-2"
              >
                <Folder size={16} />
                <span>New Folder</span>
              </Button>
              <Button 
                onClick={() => setShowUploadDialog(true)}
                className="flex items-center gap-2"
              >
                <Upload size={16} />
                <span>Upload</span>
              </Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search materials..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Select defaultValue={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="worksheets">Worksheets</SelectItem>
                  <SelectItem value="notes">Notes</SelectItem>
                  <SelectItem value="homework">Homework</SelectItem>
                  <SelectItem value="exams">Exams</SelectItem>
                  <SelectItem value="resources">Resources</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex items-center border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  className="rounded-r-none border-0"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid size={18} />
                </Button>
                <Separator orientation="vertical" className="h-6" />
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  className="rounded-l-none border-0"
                  onClick={() => setViewMode("list")}
                >
                  <List size={18} />
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="materials" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="materials">All Materials</TabsTrigger>
              <TabsTrigger value="folders">Folders</TabsTrigger>
            </TabsList>
            
            {/* Materials Tab */}
            <TabsContent value="materials" className="space-y-4 mt-6">
              {filteredMaterials.length > 0 ? (
                viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredMaterials.map((material) => (
                      <Card 
                        key={material.id} 
                        className="hover:shadow-md transition-shadow overflow-hidden flex flex-col"
                      >
                        <div className="relative aspect-video bg-muted">
                          <img
                            src={material.thumbnailUrl}
                            alt={material.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm">
                                  <MoreVertical size={16} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <Download size={16} />
                                  <span>Download</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  className="flex items-center gap-2"
                                  onClick={() => handleShareMaterial(material.id, material.name)}
                                >
                                  <Users size={16} />
                                  <span>Share</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <Edit size={16} />
                                  <span>Edit</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  className="flex items-center gap-2 text-destructive focus:text-destructive"
                                  onClick={() => handleDeleteMaterial(material.id, material.name)}
                                >
                                  <Trash2 size={16} />
                                  <span>Delete</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <Badge 
                            className="absolute bottom-2 left-2" 
                            variant="secondary"
                          >
                            {material.type}
                          </Badge>
                        </div>
                        <CardContent className="p-4 flex-grow flex flex-col">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-medium line-clamp-1">{material.name}</h3>
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground mb-2">
                            <Clock size={12} className="mr-1" />
                            <span className="mr-2">
                              {material.lastModified.toLocaleDateString()}
                            </span>
                            <span>{material.size}</span>
                          </div>
                          <div className="mt-auto">
                            <div className="flex flex-wrap gap-1 mt-2">
                              {material.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            {material.sharedWith && (
                              <div className="flex items-center mt-3 text-xs text-muted-foreground">
                                <Users size={12} className="mr-1" />
                                <span>Shared with {material.sharedWith} students</span>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="bg-card rounded-lg border border-border overflow-hidden">
                    <div className="grid grid-cols-7 gap-4 p-4 font-medium bg-muted text-sm">
                      <div className="col-span-3">Name</div>
                      <div className="hidden md:block">Category</div>
                      <div className="hidden md:block">Modified</div>
                      <div className="hidden lg:block">Size</div>
                      <div className="text-right">Actions</div>
                    </div>
                    <div className="divide-y divide-border">
                      {filteredMaterials.map((material) => (
                        <div key={material.id} className="grid grid-cols-7 gap-4 p-4 items-center text-sm">
                          <div className="col-span-3 flex items-center gap-3 min-w-0">
                            {getIconForFileType(material.type)}
                            <div className="truncate">
                              <p className="truncate font-medium">{material.name}</p>
                              <p className="text-xs text-muted-foreground md:hidden">
                                {material.category} • {material.lastModified.toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="hidden md:block capitalize">
                            {material.category}
                          </div>
                          <div className="hidden md:block text-muted-foreground">
                            {material.lastModified.toLocaleDateString()}
                          </div>
                          <div className="hidden lg:block text-muted-foreground">
                            {material.size}
                          </div>
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Download size={16} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => handleShareMaterial(material.id, material.name)}
                            >
                              <Users size={16} />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical size={16} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <Eye size={16} />
                                  <span>Preview</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <Edit size={16} />
                                  <span>Edit</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  className="flex items-center gap-2 text-destructive focus:text-destructive"
                                  onClick={() => handleDeleteMaterial(material.id, material.name)}
                                >
                                  <Trash2 size={16} />
                                  <span>Delete</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              ) : (
                <div className="text-center py-12 bg-card rounded-lg border border-border">
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                  <h3 className="font-medium text-lg mb-1">No Materials Found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery ? 
                      "Try adjusting your search or filter criteria." : 
                      "Upload your first teaching material to get started."}
                  </p>
                  <Button 
                    onClick={() => {
                      if (searchQuery) {
                        setSearchQuery("");
                        setSelectedCategory("all");
                      } else {
                        setShowUploadDialog(true);
                      }
                    }}
                  >
                    {searchQuery ? "Clear Filters" : "Upload Material"}
                  </Button>
                </div>
              )}
            </TabsContent>
            
            {/* Folders Tab */}
            <TabsContent value="folders" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {folders.map((folder) => (
                  <Card key={folder.id} className="hover:shadow-md transition-shadow overflow-hidden">
                    <div className={`h-2 bg-${folder.color}-500`} />
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Folder className={`h-10 w-10 text-${folder.color}-500`} />
                          <div>
                            <h3 className="font-medium">{folder.name}</h3>
                            <p className="text-xs text-muted-foreground">
                              {folder.itemCount} {folder.itemCount === 1 ? "item" : "items"}
                            </p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Rename</DropdownMenuItem>
                            <DropdownMenuItem>Share folder</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete folder</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <Button variant="outline" className="w-full">Open Folder</Button>
                    </CardContent>
                  </Card>
                ))}
                
                {/* Add New Folder Card */}
                <Card 
                  className="hover:shadow-md transition-shadow overflow-hidden border-dashed cursor-pointer"
                  onClick={() => setShowNewFolderDialog(true)}
                >
                  <CardContent className="p-6 flex flex-col items-center justify-center h-full text-center min-h-[180px]">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Plus className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium">Create New Folder</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Organize your materials
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Upload Dialog */}
          <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Upload Material</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="file">File</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm font-medium mb-1">Drag and drop a file here, or click to browse</p>
                    <p className="text-xs text-muted-foreground mb-2">
                      Supported formats: PDF, DOCX, PPTX, JPG, PNG, MP4 (max 50MB)
                    </p>
                    <Input
                      id="file"
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setNewMaterial({
                            ...newMaterial,
                            name: file.name,
                            file: file,
                          });
                        }
                      }}
                    />
                    {newMaterial.file && (
                      <div className="bg-secondary p-2 rounded-md text-left mt-2">
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          <span className="text-sm truncate max-w-[300px]">{newMaterial.file.name}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {uploadProgress > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}
                
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter material title"
                    value={newMaterial.name}
                    onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="e.g. Mathematics, Physics"
                    value={newMaterial.subject}
                    onChange={(e) => setNewMaterial({ ...newMaterial, subject: e.target.value })}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newMaterial.category}
                    onValueChange={(value) => setNewMaterial({ ...newMaterial, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="worksheets">Worksheets</SelectItem>
                      <SelectItem value="notes">Notes</SelectItem>
                      <SelectItem value="homework">Homework</SelectItem>
                      <SelectItem value="exams">Exams</SelectItem>
                      <SelectItem value="resources">Resources</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Add a description for this material"
                    value={newMaterial.description}
                    onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="tags">Tags (Comma separated)</Label>
                  <Input
                    id="tags"
                    placeholder="e.g. calculus, practice, exam"
                    value={newMaterial.tags}
                    onChange={(e) => setNewMaterial({ ...newMaterial, tags: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowUploadDialog(false)}>Cancel</Button>
                <Button onClick={handleFileUpload}>Upload</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* New Folder Dialog */}
          <Dialog open={showNewFolderDialog} onOpenChange={setShowNewFolderDialog}>
            <DialogContent className="sm:max-w-[400px]">
              <DialogHeader>
                <DialogTitle>Create New Folder</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="folderName">Folder Name</Label>
                  <Input
                    id="folderName"
                    placeholder="e.g. Math Worksheets, Physics Notes"
                    value={newFolder.name}
                    onChange={(e) => setNewFolder({ ...newFolder, name: e.target.value })}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label>Folder Color</Label>
                  <div className="flex gap-2 flex-wrap">
                    {["blue", "green", "purple", "orange", "red", "yellow"].map((color) => (
                      <button
                        key={color}
                        className={`w-8 h-8 rounded-full bg-${color}-500 border-2 ${
                          newFolder.color === color ? "border-primary" : "border-transparent"
                        }`}
                        onClick={() => setNewFolder({ ...newFolder, color })}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowNewFolderDialog(false)}>Cancel</Button>
                <Button onClick={handleCreateFolder}>Create Folder</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
};

export default MaterialsPage;
