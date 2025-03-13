
import { useState } from "react";
import { cn } from "@/lib/utils";
import StudentSidebar from "@/components/StudentSidebar";
import { MessageSquare as LucideMessageSquare, Search, User, Send, Phone, Video, MoreHorizontal, Paperclip, Image, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

// Define message interface
interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  attachments?: { type: string; url: string; name: string }[];
}

// Define contact interface
interface Contact {
  id: string;
  name: string;
  avatar: string;
  role: string;
  lastMessage?: Message;
  isOnline: boolean;
  unreadCount: number;
}

// Message component
const MessageItem = ({ message, isOwn }: { message: Message; isOwn: boolean }) => {
  return (
    <div className={cn("flex mb-4", isOwn ? "justify-end" : "justify-start")}>
      <div className={cn("max-w-[80%]", isOwn ? "order-2" : "order-1")}>
        <div 
          className={cn(
            "px-4 py-3 rounded-lg",
            isOwn ? "bg-primary text-primary-foreground" : "bg-secondary"
          )}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-2 space-y-2">
              {message.attachments.map((attachment, index) => (
                <div 
                  key={index}
                  className={cn(
                    "flex items-center gap-2 p-2 rounded",
                    isOwn ? "bg-primary-foreground/10" : "bg-background"
                  )}
                >
                  {attachment.type === 'image' ? (
                    <Image className="h-4 w-4" />
                  ) : (
                    <Paperclip className="h-4 w-4" />
                  )}
                  <span className="text-sm truncate">{attachment.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <p className={cn("text-xs text-muted-foreground mt-1", isOwn ? "text-right" : "text-left")}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
};

// Contact item component
const ContactItem = ({ contact, isActive, onClick }: { contact: Contact; isActive: boolean; onClick: () => void }) => {
  return (
    <div 
      className={cn(
        "flex items-center gap-3 p-3 rounded-md cursor-pointer hover:bg-secondary/50",
        isActive && "bg-secondary"
      )}
      onClick={onClick}
    >
      <div className="relative">
        <Avatar>
          <AvatarImage src={contact.avatar} alt={contact.name} />
          <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
        </Avatar>
        {contact.isOnline && (
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
        )}
      </div>
      <div className="flex-grow min-w-0">
        <div className="flex justify-between items-center">
          <h3 className="font-medium truncate">{contact.name}</h3>
          {contact.lastMessage && (
            <span className="text-xs text-muted-foreground">
              {new Date(contact.lastMessage.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}
            </span>
          )}
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground truncate">
            {contact.lastMessage ? contact.lastMessage.content : "No messages yet"}
          </p>
          {contact.unreadCount > 0 && (
            <Badge variant="default" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
              {contact.unreadCount}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

const MessagesPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [isContactsListVisible, setIsContactsListVisible] = useState(true);

  // Mock data for contacts
  const contacts: Contact[] = [
    {
      id: "1",
      name: "Dr. Michael Smith",
      avatar: "https://i.pravatar.cc/150?img=35",
      role: "Calculus Tutor",
      isOnline: true,
      unreadCount: 2,
      lastMessage: {
        id: "m1",
        senderId: "1",
        receiverId: "user",
        content: "Don't forget to review the practice problems I sent you for tomorrow's session.",
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        isRead: false
      }
    },
    {
      id: "2",
      name: "Prof. Emily Chen",
      avatar: "https://i.pravatar.cc/150?img=45",
      role: "English Literature Tutor",
      isOnline: false,
      unreadCount: 0,
      lastMessage: {
        id: "m2",
        senderId: "user",
        receiverId: "2",
        content: "I finished reading the Shakespeare play and have some questions for our next session.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
        isRead: true
      }
    },
    {
      id: "3",
      name: "Dr. James Lee",
      avatar: "https://i.pravatar.cc/150?img=68",
      role: "Chemistry Tutor",
      isOnline: true,
      unreadCount: 0,
      lastMessage: {
        id: "m3",
        senderId: "3",
        receiverId: "user",
        content: "Here's the study guide for organic chemistry. Let me know if you have questions.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        isRead: true,
        attachments: [
          { type: "file", url: "#", name: "Organic_Chemistry_Guide.pdf" }
        ]
      }
    },
    {
      id: "4",
      name: "Prof. Lisa Johnson",
      avatar: "https://i.pravatar.cc/150?img=20",
      role: "Biology Tutor",
      isOnline: false,
      unreadCount: 0,
      lastMessage: {
        id: "m4",
        senderId: "user",
        receiverId: "4",
        content: "Thank you for the feedback on my lab report!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
        isRead: true
      }
    },
    {
      id: "5",
      name: "Dr. Robert Wilson",
      avatar: "https://i.pravatar.cc/150?img=60",
      role: "Physics Tutor",
      isOnline: false,
      unreadCount: 1,
      lastMessage: {
        id: "m5",
        senderId: "5",
        receiverId: "user",
        content: "I've scheduled our next session to cover quantum mechanics concepts.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
        isRead: false
      }
    }
  ];

  // Filter contacts based on search query
  const filteredContacts = searchQuery.trim() === "" 
    ? contacts 
    : contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.role.toLowerCase().includes(searchQuery.toLowerCase())
      );

  // Get selected contact
  const selectedContact = selectedContactId 
    ? contacts.find(contact => contact.id === selectedContactId) 
    : null;

  // Mock messages for the conversation
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m1",
      senderId: "1",
      receiverId: "user",
      content: "Hello! How are your calculus studies going? Are you making progress with the differential equations?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      isRead: true
    },
    {
      id: "m2",
      senderId: "user",
      receiverId: "1",
      content: "Hi Dr. Smith! I've been working through the problems but still struggling with the integration by parts method.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23), // 23 hours ago
      isRead: true
    },
    {
      id: "m3",
      senderId: "1",
      receiverId: "user",
      content: "I understand. It can be challenging at first. Let's dedicate some time to that in our next session. I'll prepare some examples that should help clarify the concept.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22), // 22 hours ago
      isRead: true
    },
    {
      id: "m4",
      senderId: "user",
      receiverId: "1",
      content: "That would be great! I've been trying to work through the textbook examples but could really use your guidance.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 20), // 20 hours ago
      isRead: true
    },
    {
      id: "m5",
      senderId: "1",
      receiverId: "user",
      content: "Here are some additional practice problems that focus specifically on integration by parts. Try working through these before our session.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      isRead: true,
      attachments: [
        { type: "file", url: "#", name: "Integration_Practice.pdf" }
      ]
    },
    {
      id: "m6",
      senderId: "1",
      receiverId: "user",
      content: "Don't forget to review the practice problems I sent you for tomorrow's session.",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      isRead: false
    }
  ]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSendMessage = () => {
    if (messageInput.trim() === "" || !selectedContactId) return;

    const newMessage: Message = {
      id: `m${messages.length + 1}`,
      senderId: "user",
      receiverId: selectedContactId,
      content: messageInput.trim(),
      timestamp: new Date(),
      isRead: false
    };

    setMessages([...messages, newMessage]);
    setMessageInput("");

    // Simulate reply after a delay
    if (selectedContactId === "1") {
      setTimeout(() => {
        const reply: Message = {
          id: `m${messages.length + 2}`,
          senderId: selectedContactId,
          receiverId: "user",
          content: "Great! I'll see you in tomorrow's session then. Don't hesitate to ask if you have any questions before then.",
          timestamp: new Date(),
          isRead: false
        };
        setMessages(prev => [...prev, reply]);
      }, 30000); // 30 seconds
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleContactsList = () => {
    setIsContactsListVisible(!isContactsListVisible);
  };

  return (
    <div className="min-h-screen flex bg-background">
      <StudentSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div 
        className={cn(
          "flex-1 transition-all duration-300",
          isSidebarOpen ? "ml-64" : "ml-20"
        )}
      >
        <div className="flex h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] overflow-hidden">
          {/* Contacts List */}
          <div 
            className={cn(
              "border-r bg-card transition-all duration-300",
              isContactsListVisible ? "w-80" : "w-0"
            )}
          >
            {isContactsListVisible && (
              <>
                <div className="p-4 border-b">
                  <h2 className="text-xl font-bold mb-4">Messages</h2>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      className="pl-9" 
                      placeholder="Search messages" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="p-2">
                  <Tabs defaultValue="all" className="w-full">
                    <TabsList className="grid grid-cols-3 mb-2">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="unread">Unread</TabsTrigger>
                      <TabsTrigger value="tutors">Tutors</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all" className="mt-0">
                      <div className="space-y-1 max-h-[calc(100vh-14rem)] overflow-y-auto">
                        {filteredContacts.map(contact => (
                          <ContactItem 
                            key={contact.id} 
                            contact={contact} 
                            isActive={selectedContactId === contact.id}
                            onClick={() => {
                              setSelectedContactId(contact.id);
                              if (window.innerWidth < 768) {
                                setIsContactsListVisible(false);
                              }
                            }}
                          />
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="unread" className="mt-0">
                      <div className="space-y-1 max-h-[calc(100vh-14rem)] overflow-y-auto">
                        {filteredContacts.filter(c => c.unreadCount > 0).map(contact => (
                          <ContactItem 
                            key={contact.id} 
                            contact={contact} 
                            isActive={selectedContactId === contact.id}
                            onClick={() => {
                              setSelectedContactId(contact.id);
                              if (window.innerWidth < 768) {
                                setIsContactsListVisible(false);
                              }
                            }}
                          />
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="tutors" className="mt-0">
                      <div className="space-y-1 max-h-[calc(100vh-14rem)] overflow-y-auto">
                        {filteredContacts.map(contact => (
                          <ContactItem 
                            key={contact.id} 
                            contact={contact} 
                            isActive={selectedContactId === contact.id}
                            onClick={() => {
                              setSelectedContactId(contact.id);
                              if (window.innerWidth < 768) {
                                setIsContactsListVisible(false);
                              }
                            }}
                          />
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </>
            )}
          </div>
          
          {/* Message Area */}
          <div className="flex-1 flex flex-col">
            {selectedContact ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b flex justify-between items-center bg-card">
                  <div className="flex items-center gap-3">
                    {!isContactsListVisible && (
                      <Button variant="ghost" size="icon" onClick={toggleContactsList} className="md:hidden">
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    )}
                    <Avatar>
                      <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                      <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{selectedContact.name}</h3>
                        {selectedContact.isOnline && (
                          <Badge variant="outline" className="h-5 text-xs bg-green-500/10 text-green-500 border-green-500/20">
                            Online
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{selectedContact.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" onClick={() => toast.info("This would start an audio call")}>
                      <Phone className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => toast.info("This would start a video call")}>
                      <Video className="h-5 w-5" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Options</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => toast.info("View contact profile")}>
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast.info("Shared files would be shown")}>
                          Shared Files
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => toast.info("Search this conversation")}>
                          Search in Conversation
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast.info("Conversation muted")}>
                          Mute Notifications
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => toast.info("This would clear conversation history")}
                          className="text-destructive"
                        >
                          Clear Conversation
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                {/* Messages Container */}
                <div className="flex-1 p-4 overflow-y-auto bg-background">
                  {messages.map(message => (
                    <MessageItem 
                      key={message.id} 
                      message={message} 
                      isOwn={message.senderId === "user"} 
                    />
                  ))}
                </div>
                
                {/* Message Input */}
                <div className="p-4 border-t bg-card">
                  <div className="flex items-end gap-2">
                    <Button variant="ghost" size="icon" className="mb-1" onClick={() => toast.info("This would open the file picker")}>
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    <div className="flex-1">
                      <Input
                        className="min-h-[2.5rem] resize-none"
                        placeholder="Type your message..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                      />
                    </div>
                    <Button onClick={handleSendMessage} disabled={messageInput.trim() === ""}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full bg-card">
                <LucideMessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
                <h2 className="text-xl font-bold mb-2">Your Messages</h2>
                <p className="text-muted-foreground mb-4 text-center max-w-md">
                  Select a conversation or start a new one with your tutors.
                </p>
                {!isContactsListVisible && (
                  <Button onClick={toggleContactsList}>
                    <ChevronRight className="mr-2 h-4 w-4" />
                    Open Conversations
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
