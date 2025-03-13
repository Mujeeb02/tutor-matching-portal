
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BellRing, Camera, CreditCard, Info, Lock, Mail, Save, User } from "lucide-react";
import TutorSidebar from "@/components/TutorSidebar";
import { toast } from "sonner";

const SettingsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSaveSettings = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <div className="min-h-screen flex bg-background">
      <TutorSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div 
        className={cn(
          "flex-1 transition-all duration-300",
          isSidebarOpen ? "ml-64" : "ml-20"
        )}
      >
        <main className="py-8 px-6 max-w-5xl mx-auto w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-muted-foreground">Manage your account settings and preferences</p>
          </div>
          
          <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid grid-cols-4 md:w-[400px]">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
              </TabsList>
              
              {/* Profile Settings */}
              <TabsContent value="profile" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your profile information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src="https://i.pravatar.cc/150?img=35" alt="Profile" />
                        <AvatarFallback>MS</AvatarFallback>
                      </Avatar>
                      <div>
                        <Button size="sm" variant="outline" className="flex items-center gap-2">
                          <Camera className="h-4 w-4" /> Change Photo
                        </Button>
                      </div>
                    </div>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" defaultValue="Michael" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" defaultValue="Smith" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" defaultValue="Math & Physics Tutor" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Biography</Label>
                        <Input id="bio" defaultValue="Experienced tutor specializing in mathematics and physics with over 5 years of teaching experience." />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subjects">Subjects</Label>
                        <Select defaultValue="math">
                          <SelectTrigger>
                            <SelectValue placeholder="Select primary subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="math">Mathematics</SelectItem>
                            <SelectItem value="physics">Physics</SelectItem>
                            <SelectItem value="chemistry">Chemistry</SelectItem>
                            <SelectItem value="biology">Biology</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button onClick={handleSaveSettings} className="flex items-center gap-2">
                        <Save className="h-4 w-4" /> Save Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Account Settings */}
              <TabsContent value="account" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your account</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <User className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <h3 className="font-medium">Username</h3>
                            <p className="text-sm text-muted-foreground">Your unique username</p>
                          </div>
                        </div>
                        <Input className="w-[200px]" defaultValue="prof_michael" />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Mail className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <h3 className="font-medium">Email Address</h3>
                            <p className="text-sm text-muted-foreground">Your email for notifications</p>
                          </div>
                        </div>
                        <Input className="w-[200px]" defaultValue="michael.smith@example.com" />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Lock className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <h3 className="font-medium">Password</h3>
                            <p className="text-sm text-muted-foreground">Update your password</p>
                          </div>
                        </div>
                        <Button variant="outline">Change Password</Button>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button onClick={handleSaveSettings} className="flex items-center gap-2">
                        <Save className="h-4 w-4" /> Save Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Notification Settings */}
              <TabsContent value="notifications" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Control how you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <BellRing className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <h3 className="font-medium">Session Reminders</h3>
                            <p className="text-sm text-muted-foreground">Get reminded before your tutoring sessions</p>
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Mail className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <h3 className="font-medium">Email Notifications</h3>
                            <p className="text-sm text-muted-foreground">Receive updates via email</p>
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Info className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <h3 className="font-medium">New Session Requests</h3>
                            <p className="text-sm text-muted-foreground">Get notified about new session requests</p>
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button onClick={handleSaveSettings} className="flex items-center gap-2">
                        <Save className="h-4 w-4" /> Save Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Billing Settings */}
              <TabsContent value="billing" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Billing Information</CardTitle>
                    <CardDescription>Manage your payment methods and billing details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <h3 className="font-medium">Payment Methods</h3>
                            <p className="text-sm text-muted-foreground">Add or update your payment methods</p>
                          </div>
                        </div>
                        <Button variant="outline">Add New Card</Button>
                      </div>
                      <Separator />
                      <div className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="rounded-md bg-primary/10 p-2">
                              <CreditCard className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium">Visa ending in 4242</h3>
                              <p className="text-sm text-muted-foreground">Expires 04/2025</p>
                            </div>
                          </div>
                          <div>
                            <Button variant="ghost" size="sm">Edit</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button onClick={handleSaveSettings} className="flex items-center gap-2">
                        <Save className="h-4 w-4" /> Save Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
