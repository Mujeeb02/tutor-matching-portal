
import { useState } from "react";
import { cn } from "@/lib/utils";
import StudentSidebar from "@/components/StudentSidebar";
import {
  Search,
  Send,
  Paperclip,
  Mic,
  MoreVertical,
  Phone,
  Video,
  ChevronLeft,
  Info,
  Star,
  CheckCheck,
  Check,
  Clock,
  Plus,
  Image,
  File,
  Smile
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

// Types for messages
interface Message {
  id: number;
  content: string;
  timestamp: Date;
  sender: "student" | "tutor";
  status: "sent" | "delivered" | "read" | "pending";
  attachments?: { name: string; type: string; url: string }[];
}

interface Conversation {
  id: number;
  tutorId: number;
  tutorName: string;
  tutorAvatar: string;
  tutorSubject: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  online: boolean;
  messages: Message[];
}

// Individual message component
const MessageBubble = ({ message, isLastInGroup }: { message: Message; isLastInGroup: boolean }) => {
  const fromMe = message.sender === "student";
  
  return (
    <div className={cn(
      "flex mb-2",
      fromMe ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[80%] px-4 py-2 rounded-lg",
        fromMe ? "bg-primary text-primary-foreground rounded-br-none" : "bg-secondary rounded-bl-none"
      )}>
        <p className="text-sm">{message.content}</p>
        <div className={cn(
          "flex items-center mt-1 text-xs",
          fromMe ? "justify-end" : "justify-start",
          fromMe ? "text-primary-foreground/80" : "text-muted-foreground"
        )}>
          <span>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          {fromMe && isLastInGroup && (
            <span className="ml-1">
              {message.status === "read" ? <CheckCheck className="h-3 w-3" /> : 
               message.status === "delivered" ? <Check className="h-3 w-3" /> : 
               message.status === "sent" ? <Check className="h-3 w-3" /> : 
               <Clock className="h-3 w-3" />}
            </span>
          )}
        </div>
        
        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-2 space-y-1">
            {message.attachments.map((attachment, i) => (
              <div key={i} className="flex items-center text-xs bg-black/5 p-1 rounded">
                {attachment.type.includes("image") ? 
                  <Image className="h-3 w-3 mr-1" /> : 
                  <File className="h-3 w-3 mr-1" />}
                <span className="truncate">{attachment.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Chat view component
const ChatView = ({ conversation, onBack }: { conversation: Conversation; onBack: () => void }) => {
  const [newMessage, setNewMessage] = useState("");
  
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      toast.success("Message sent!");
      setNewMessage("");
    }
  };
  
  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="flex items-center gap-3 p-4 border-b">
        <Button variant="ghost" size="icon" onClick={onBack} className="md:hidden">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Avatar className="h-10 w-10">
          <AvatarImage src={conversation.tutorAvatar} alt={conversation.tutorName} />
          <AvatarFallback>{conversation.tutorName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <div className="flex items-center">
            <h3 className="font-medium">{conversation.tutorName}</h3>
            {conversation.online && (
              <Badge variant="secondary" className="ml-2 h-1.5 w-1.5 rounded-full bg-green-500 p-0" />
            )}
          </div>
          <p className="text-xs text-muted-foreground">{conversation.tutorSubject}</p>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" onClick={() => toast.info("Audio call feature coming soon")}>
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => toast.info("Video call feature coming soon")}>
            <Video className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => toast.info("Conversation info")}>
            <Info className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Messages area */}
      <ScrollArea className="flex-grow p-4">
        <div className="space-y-6">
          {/* Group messages by date */}
          <div className="text-center my-4">
            <Badge variant="outline" className="text-xs text-muted-foreground">
              {conversation.messages[0]?.timestamp.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
            </Badge>
          </div>
          
          {conversation.messages.map((message, index) => {
            const isLastInGroup = index === conversation.messages.length - 1 || 
              conversation.messages[index + 1].sender !== message.sender;
            
            return <MessageBubble key={message.id} message={message} isLastInGroup={isLastInGroup} />;
          })}
        </div>
      </ScrollArea>
      
      {/* Message input */}
      <div className="border-t p-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => toast.info("Attachment picker will open here")}>
            <Paperclip className="h-4 w-4" />
          </Button>
          <Input 
            placeholder="Type a message..." 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-grow"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button variant="ghost" size="icon" onClick={() => toast.info("Emoji picker will open here")}>
            <Smile className="h-4 w-4" />
          </Button>
          <Button 
            size="icon" 
            disabled={!newMessage.trim()} 
            onClick={handleSendMessage}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// Conversation list item
const ConversationItem = ({ 
  conversation, 
  isActive, 
  onClick 
}: { 
  conversation: Conversation; 
  isActive: boolean; 
  onClick: () => void;
}) => {
  const lastMessageTime = new Date(conversation.lastMessageTime);
  const isToday = new Date().toDateString() === lastMessageTime.toDateString();
  const timeString = isToday 
    ? lastMessageTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : lastMessageTime.toLocaleDateString([], { month: 'short', day: 'numeric' });
  
  return (
    <div 
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-secondary/80 transition-colors",
        isActive && "bg-secondary"
      )}
    >
      <div className="relative">
        <Avatar className="h-12 w-12">
          <AvatarImage src={conversation.tutorAvatar} alt={conversation.tutorName} />
          <AvatarFallback>{conversation.tutorName.charAt(0)}</AvatarFallback>
        </Avatar>
        {conversation.online && (
          <Badge className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 p-0 border-2 border-background" />
        )}
      </div>
      <div className="flex-grow min-w-0">
        <div className="flex justify-between items-center">
          <h3 className="font-medium truncate">{conversation.tutorName}</h3>
          <span className="text-xs text-muted-foreground shrink-0">{timeString}</span>
        </div>
        <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
      </div>
      {conversation.unreadCount > 0 && (
        <Badge className="shrink-0 h-5 w-5 flex items-center justify-center p-0">
          {conversation.unreadCount}
        </Badge>
      )}
    </div>
  );
};

const MessagesPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeConversation, setActiveConversation] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data for conversations
  const conversations: Conversation[] = [
    {
      id: 1,
      tutorId: 101,
      tutorName: "Dr. Michael Smith",
      tutorAvatar: "https://i.pravatar.cc/150?img=35",
      tutorSubject: "Mathematics Tutor",
      lastMessage: "Let me know if you have questions about the homework",
      lastMessageTime: new Date(Date.now() - 20 * 60 * 1000), // 20 minutes ago
      unreadCount: 2,
      online: true,
      messages: [
        {
          id: 1001,
          content: "Hi Sarah, how are you doing with the calculus problems?",
          timestamp: new Date(Date.now() - 40 * 60 * 1000), // 40 minutes ago
          sender: "tutor",
          status: "read"
        },
        {
          id: 1002,
          content: "I'm struggling with problem #4. Could you explain the integration by parts again?",
          timestamp: new Date(Date.now() - 35 * 60 * 1000), // 35 minutes ago
          sender: "student",
          status: "read"
        },
        {
          id: 1003,
          content: "Of course! For integration by parts, we use the formula ∫u dv = uv - ∫v du. In this case, let's set u = x and dv = e^x dx.",
          timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
          sender: "tutor",
          status: "read"
        },
        {
          id: 1004,
          content: "Let me know if you have questions about the homework",
          timestamp: new Date(Date.now() - 20 * 60 * 1000), // 20 minutes ago
          sender: "tutor",
          status: "delivered"
        }
      ]
    },
    {
      id: 2,
      tutorId: 102,
      tutorName: "Prof. Emily Chen",
      tutorAvatar: "https://i.pravatar.cc/150?img=45",
      tutorSubject: "English Literature",
      lastMessage: "I've attached some notes on Shakespeare's symbolism",
      lastMessageTime: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      unreadCount: 0,
      online: false,
      messages: [
        {
          id: 2001,
          content: "I've been reviewing your essay draft. You have some very insightful analysis!",
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
          sender: "tutor",
          status: "read"
        },
        {
          id: 2002,
          content: "Thank you! I'm still working on the conclusion section. Do you have any suggestions?",
          timestamp: new Date(Date.now() - 3.5 * 60 * 60 * 1000), // 3.5 hours ago
          sender: "student",
          status: "read"
        },
        {
          id: 2003,
          content: "I've attached some notes on Shakespeare's symbolism",
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
          sender: "tutor",
          status: "read",
          attachments: [
            {
              name: "Shakespeare_Symbolism_Notes.pdf",
              type: "application/pdf",
              url: "#"
            }
          ]
        }
      ]
    },
    {
      id: 3,
      tutorId: 103,
      tutorName: "Dr. James Lee",
      tutorAvatar: "https://i.pravatar.cc/150?img=68",
      tutorSubject: "Chemistry",
      lastMessage: "Don't forget our session tomorrow at 2 PM",
      lastMessageTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      unreadCount: 0,
      online: true,
      messages: [
        {
          id: 3001,
          content: "How's your lab report coming along?",
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
          sender: "tutor",
          status: "read"
        },
        {
          id: 3002,
          content: "I've finished the methods section, but I'm still working on the results analysis",
          timestamp: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000), // 1.5 days ago
          sender: "student",
          status: "read"
        },
        {
          id: 3003,
          content: "Don't forget our session tomorrow at 2 PM",
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
          sender: "tutor",
          status: "read"
        }
      ]
    }
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const filteredConversations = conversations.filter(conversation => 
    conversation.tutorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conversation.tutorSubject.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const activeConversationData = conversations.find(c => c.id === activeConversation);
  
  const handleBackToList = () => {
    setActiveConversation(null);
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
        <main className="py-8 px-6 h-[calc(100vh-64px)]">
          <div className="flex h-full">
            {/* Conversations List - hide on mobile when a conversation is active */}
            <div className={cn(
              "flex flex-col w-full md:w-80 border-r mr-6",
              activeConversation !== null && "hidden md:flex"
            )}>
              <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">Messages</h1>
                <p className="text-muted-foreground">Chat with your tutors</p>
              </div>
              
              <div className="relative mb-4">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search messages..." 
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Tabs defaultValue="all" className="mb-4">
                <TabsList className="w-full">
                  <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                  <TabsTrigger value="unread" className="flex-1">Unread</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <ScrollArea className="flex-grow">
                <div className="space-y-1">
                  {filteredConversations.length > 0 ? (
                    filteredConversations.map(conversation => (
                      <ConversationItem 
                        key={conversation.id}
                        conversation={conversation}
                        isActive={activeConversation === conversation.id}
                        onClick={() => setActiveConversation(conversation.id)}
                      />
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No conversations found</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              <div className="mt-4 pt-4 border-t">
                <Button variant="outline" className="w-full" onClick={() => toast.info("New message dialog will open here")}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Message
                </Button>
              </div>
            </div>
            
            {/* Chat Area or Empty State */}
            <div className={cn(
              "flex-grow h-full",
              activeConversation === null && "hidden md:block"
            )}>
              {activeConversationData ? (
                <ChatView 
                  conversation={activeConversationData} 
                  onBack={handleBackToList}
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center max-w-md">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h2 className="text-xl font-semibold mb-2">Select a Conversation</h2>
                    <p className="text-muted-foreground mb-6">
                      Choose a conversation from the left or start a new one to begin messaging with your tutors.
                    </p>
                    <Button onClick={() => toast.info("New message dialog will open here")}>
                      <Plus className="mr-2 h-4 w-4" />
                      New Message
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MessagesPage;
