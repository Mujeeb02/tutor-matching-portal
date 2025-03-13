import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Search, 
  MessageSquare, 
  ChevronLeft, 
  Phone, 
  Video, 
  MoreVertical, 
  Paperclip, 
  Send 
} from "lucide-react";
import TutorSidebar from "@/components/TutorSidebar";

interface Message {
  id: number;
  text: string;
  time: string;
  sent: boolean;
}

interface Conversation {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  messages: Message[];
  status: "online" | "offline";
}

const MessagesPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [messageText, setMessageText] = useState("");
  const [activeConversation, setActiveConversation] = useState<number | null>(1); // Default to first conversation
  const [mobileViewMode, setMobileViewMode] = useState<"list" | "chat">("list");

  // Mock conversations data
  const conversations: Conversation[] = [
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "https://i.pravatar.cc/150?img=33",
      lastMessage: "When is our next session?",
      time: "10:42 AM",
      unread: 2,
      status: "online",
      messages: [
        { id: 1, text: "Hi Professor, I had a question about our upcoming session", time: "10:30 AM", sent: false },
        { id: 2, text: "Sure, what would you like to know?", time: "10:35 AM", sent: true },
        { id: 3, text: "When is our next session?", time: "10:42 AM", sent: false },
      ]
    },
    {
      id: 2,
      name: "Emma Davis",
      avatar: "https://i.pravatar.cc/150?img=23",
      lastMessage: "I've completed the practice problems",
      time: "Yesterday",
      unread: 0,
      status: "offline",
      messages: [
        { id: 1, text: "I've completed the practice problems you assigned", time: "Yesterday", sent: false },
        { id: 2, text: "Great work! We'll review them in our next session", time: "Yesterday", sent: true },
      ]
    },
    {
      id: 3,
      name: "Sam Wilson",
      avatar: "https://i.pravatar.cc/150?img=12",
      lastMessage: "Thanks for the explanation!",
      time: "Yesterday",
      unread: 0,
      status: "online",
      messages: [
        { id: 1, text: "I'm having trouble with the physics problem #4", time: "Yesterday", sent: false },
        { id: 2, text: "Let's break it down step by step. First, identify the forces acting on the object.", time: "Yesterday", sent: true },
        { id: 3, text: "That makes sense now!", time: "Yesterday", sent: false },
        { id: 4, text: "Thanks for the explanation!", time: "Yesterday", sent: false },
      ]
    },
    {
      id: 4,
      name: "Ryan Thompson",
      avatar: "https://i.pravatar.cc/150?img=53",
      lastMessage: "Could we reschedule our session?",
      time: "Monday",
      unread: 0,
      status: "offline",
      messages: [
        { id: 1, text: "Could we reschedule our session on Friday?", time: "Monday", sent: false },
        { id: 2, text: "I have a conflict with my schedule", time: "Monday", sent: false },
        { id: 3, text: "Sure, how about Saturday at 2pm instead?", time: "Monday", sent: true },
      ]
    },
    {
      id: 5,
      name: "Olivia Martin",
      avatar: "https://i.pravatar.cc/150?img=25",
      lastMessage: "I'll prepare those topics for our next session",
      time: "Last week",
      unread: 0,
      status: "offline",
      messages: [
        { id: 1, text: "What topics should I prepare for our next session?", time: "Last week", sent: false },
        { id: 2, text: "Please review chapters 5 and 6, focusing on the key concepts we discussed", time: "Last week", sent: true },
        { id: 3, text: "I'll prepare those topics for our next session", time: "Last week", sent: false },
      ]
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (messageText.trim() === "" || !activeConversation) return;
    
    // In a real app, you would send this to an API
    console.log("Sending message:", messageText);
    setMessageText("");
  };

  const selectConversation = (id: number) => {
    setActiveConversation(id);
    setMobileViewMode("chat");
  };

  const backToList = () => {
    setMobileViewMode("list");
  };

  // Filter conversations based on search query
  const filteredConversations = searchQuery.length > 0
    ? conversations.filter(convo => 
        convo.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : conversations;

  // Get the active conversation object
  const currentConversation = conversations.find(convo => convo.id === activeConversation);

  return (
    <div className="min-h-screen flex bg-background">
      <TutorSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div 
        className={cn(
          "flex-1 transition-all duration-300",
          isSidebarOpen ? "ml-64" : "ml-0"
        )}
      >
        <main className="py-8 px-6 h-[calc(100vh-4rem)] max-w-7xl mx-auto w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Messages</h1>
            <p className="text-muted-foreground">Communicate with your students</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
            {/* Conversations List */}
            <div className={cn(
              "lg:col-span-1",
              mobileViewMode === "chat" ? "hidden lg:block" : "block"
            )}>
              <Card className="h-full flex flex-col overflow-hidden">
                <div className="p-4 border-b">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input 
                      placeholder="Search messages..." 
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <Tabs defaultValue="all" className="flex-1 flex flex-col">
                  <div className="px-4 pt-2">
                    <TabsList className="w-full">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="unread">Unread</TabsTrigger>
                    </TabsList>
                  </div>
                  <TabsContent value="all" className="flex-1 data-[state=active]:flex flex-col overflow-hidden">
                    <ScrollArea className="flex-1">
                      <div className="divide-y">
                        {filteredConversations.map((convo) => (
                          <div 
                            key={convo.id} 
                            className={cn(
                              "flex items-center gap-3 p-3 cursor-pointer hover:bg-secondary/50 transition-colors",
                              activeConversation === convo.id && "bg-secondary",
                              convo.unread > 0 && "bg-secondary/30"
                            )}
                            onClick={() => selectConversation(convo.id)}
                          >
                            <div className="relative">
                              <Avatar>
                                <AvatarImage src={convo.avatar} alt={convo.name} />
                                <AvatarFallback>{convo.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              {convo.status === "online" && (
                                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                              )}
                            </div>
                            <div className="flex-1 overflow-hidden">
                              <div className="flex justify-between items-center">
                                <h3 className="font-medium truncate">{convo.name}</h3>
                                <span className="text-xs text-muted-foreground whitespace-nowrap">{convo.time}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <p className="text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
                                {convo.unread > 0 && (
                                  <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">{convo.unread}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value="unread" className="flex-1 data-[state=active]:flex flex-col overflow-hidden">
                    <ScrollArea className="flex-1">
                      <div className="divide-y">
                        {filteredConversations.filter(convo => convo.unread > 0).map((convo) => (
                          <div 
                            key={convo.id} 
                            className={cn(
                              "flex items-center gap-3 p-3 cursor-pointer hover:bg-secondary/50 transition-colors",
                              activeConversation === convo.id && "bg-secondary"
                            )}
                            onClick={() => selectConversation(convo.id)}
                          >
                            <div className="relative">
                              <Avatar>
                                <AvatarImage src={convo.avatar} alt={convo.name} />
                                <AvatarFallback>{convo.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              {convo.status === "online" && (
                                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                              )}
                            </div>
                            <div className="flex-1 overflow-hidden">
                              <div className="flex justify-between items-center">
                                <h3 className="font-medium truncate">{convo.name}</h3>
                                <span className="text-xs text-muted-foreground whitespace-nowrap">{convo.time}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <p className="text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
                                <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">{convo.unread}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                        {filteredConversations.filter(convo => convo.unread > 0).length === 0 && (
                          <div className="text-center py-10">
                            <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                            <h3 className="font-medium text-lg mb-1">No Unread Messages</h3>
                            <p className="text-muted-foreground">You're all caught up!</p>
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </Card>
            </div>
            
            {/* Chat Window */}
            <div className={cn(
              "lg:col-span-2",
              mobileViewMode === "list" ? "hidden lg:block" : "block"
            )}>
              <Card className="h-full flex flex-col overflow-hidden">
                {currentConversation ? (
                  <>
                    {/* Chat Header */}
                    <div className="p-4 border-b flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="lg:hidden"
                          onClick={backToList}
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </Button>
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={currentConversation.avatar} alt={currentConversation.name} />
                            <AvatarFallback>{currentConversation.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {currentConversation.status === "online" && (
                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium">{currentConversation.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            {currentConversation.status === "online" ? "Online" : "Offline"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon">
                          <Phone className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Video className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Chat Messages */}
                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-4">
                        {currentConversation.messages.map((message) => (
                          <div
                            key={message.id}
                            className={cn(
                              "flex",
                              message.sent ? "justify-end" : "justify-start"
                            )}
                          >
                            <div
                              className={cn(
                                "max-w-[75%] rounded-lg px-4 py-2",
                                message.sent
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-secondary"
                              )}
                            >
                              <p>{message.text}</p>
                              <span
                                className={cn(
                                  "text-xs mt-1 block",
                                  message.sent
                                    ? "text-primary-foreground/80"
                                    : "text-muted-foreground"
                                )}
                              >
                                {message.time}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    
                    {/* Message Input */}
                    <div className="p-4 border-t">
                      <form onSubmit={handleMessageSubmit} className="flex items-center gap-2">
                        <Button type="button" variant="ghost" size="icon">
                          <Paperclip className="h-5 w-5" />
                        </Button>
                        <Input
                          placeholder="Type a message..."
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          className="flex-1"
                        />
                        <Button type="submit" size="icon">
                          <Send className="h-5 w-5" />
                        </Button>
                      </form>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center p-4">
                    <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">No Conversation Selected</h3>
                    <p className="text-muted-foreground text-center max-w-md">
                      Select a conversation from the list to start messaging with your students.
                    </p>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MessagesPage;
