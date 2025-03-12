
import React, { useState } from "react";
import { Search, Plus, File, FileText, FileImage, FileCode, Download, Share2, MoreHorizontal, FolderPlus, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

type MaterialType = "document" | "worksheet" | "image" | "presentation" | "code";

interface Material {
  id: number;
  name: string;
  type: MaterialType;
  size: string;
  subject: string;
  shared: boolean;
  uploadedAt: string;
  icon: React.ElementType;
}

const getIcon = (type: MaterialType) => {
  switch (type) {
    case "document":
      return FileText;
    case "worksheet":
      return File;
    case "image":
      return FileImage;
    case "presentation":
      return File;
    case "code":
      return FileCode;
    default:
      return File;
  }
};

const Materials = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  
  // Mock data for materials
  const materials: Material[] = [
    {
      id: 1,
      name: "Calculus Derivatives Explanation.pdf",
      type: "document",
      size: "2.4 MB",
      subject: "Mathematics",
      shared: true,
      uploadedAt: "2 days ago",
      icon: FileText
    },
    {
      id: 2,
      name: "Physics Forces Worksheet.pdf",
      type: "worksheet",
      size: "1.8 MB",
      subject: "Physics",
      shared: true,
      uploadedAt: "1 week ago",
      icon: File
    },
    {
      id: 3,
      name: "Organic Chemistry Diagrams.png",
      type: "image",
      size: "3.5 MB",
      subject: "Chemistry",
      shared: false,
      uploadedAt: "3 days ago",
      icon: FileImage
    },
    {
      id: 4,
      name: "Introduction to Algebra.pptx",
      type: "presentation",
      size: "5.2 MB",
      subject: "Mathematics",
      shared: true,
      uploadedAt: "2 weeks ago",
      icon: File
    },
    {
      id: 5,
      name: "Python Basics Example.py",
      type: "code",
      size: "12 KB",
      subject: "Computer Science",
      shared: false,
      uploadedAt: "Yesterday",
      icon: FileCode
    }
  ];

  const filteredMaterials = materials.filter(material => {
    // Filter by search query
    if (searchQuery && !material.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by type/category
    if (filter !== "all" && material.type !== filter) {
      return false;
    }
    
    return true;
  });

  const handleUpload = () => {
    toast.success("Upload dialog would open here");
  };

  const handleCreateFolder = () => {
    toast.success("Create folder dialog would open here");
  };

  const handleDownload = (id: number, name: string) => {
    toast.success(`Downloading ${name}`);
  };

  const handleShare = (id: number, name: string) => {
    toast.success(`Sharing ${name}`);
  };

  const handleDelete = (id: number, name: string) => {
    toast.error(`Deleted ${name}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start sm:items-center flex-col sm:flex-row gap-4">
        <div>
          <h1 className="text-3xl font-bold">Materials</h1>
          <p className="text-muted-foreground">Manage your tutoring resources and materials</p>
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Plus size={16} className="mr-2" />
                Add New
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleUpload}>
                <File size={16} className="mr-2" />
                Upload Files
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleCreateFolder}>
                <FolderPlus size={16} className="mr-2" />
                Create Folder
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all" onClick={() => setFilter("all")}>All Files</TabsTrigger>
            <TabsTrigger value="document" onClick={() => setFilter("document")}>Documents</TabsTrigger>
            <TabsTrigger value="worksheet" onClick={() => setFilter("worksheet")}>Worksheets</TabsTrigger>
            <TabsTrigger value="presentation" onClick={() => setFilter("presentation")}>Presentations</TabsTrigger>
            <TabsTrigger value="image" onClick={() => setFilter("image")}>Images</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search materials..."
              className="pl-8 w-full sm:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter size={16} />
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Your Materials</CardTitle>
              <CardDescription>You have {filteredMaterials.length} {filter !== "all" ? filter : ""} materials</CardDescription>
            </div>
            <Select defaultValue="date">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Most recent</SelectItem>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                <SelectItem value="size">Size</SelectItem>
                <SelectItem value="type">Type</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredMaterials.length > 0 ? (
              filteredMaterials.map((material) => {
                const Icon = material.icon;
                return (
                  <div key={material.id} className="flex items-center p-3 hover:bg-secondary/50 rounded-lg transition-colors">
                    <div className="h-10 w-10 rounded bg-secondary/70 flex items-center justify-center mr-3">
                      <Icon size={20} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-grow">
                      <div>
                        <h3 className="font-medium line-clamp-1">{material.name}</h3>
                        <div className="flex items-center gap-1 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {material.subject}
                          </Badge>
                          {material.shared && (
                            <Badge variant="secondary" className="text-xs">
                              Shared
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="hidden sm:block text-sm space-y-1">
                        <div className="flex items-center">
                          <p className="text-muted-foreground w-24">Type:</p>
                          <p className="capitalize">{material.type}</p>
                        </div>
                        <div className="flex items-center">
                          <p className="text-muted-foreground w-24">Size:</p>
                          <p>{material.size}</p>
                        </div>
                      </div>
                      <div className="hidden sm:block text-sm">
                        <p className="text-muted-foreground">Uploaded {material.uploadedAt}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" onClick={() => handleDownload(material.id, material.name)}>
                        <Download size={16} />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => handleShare(material.id, material.name)}>
                        <Share2 size={16} />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost">
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleDownload(material.id, material.name)}>
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleShare(material.id, material.name)}>
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(material.id, material.name)} className="text-destructive">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-10">
                <File className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
                <h3 className="font-medium text-lg mb-1">No Materials Found</h3>
                <p className="text-muted-foreground mb-4">Upload some materials or adjust your search filters.</p>
                <Button onClick={handleUpload}>Upload Files</Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Materials;
