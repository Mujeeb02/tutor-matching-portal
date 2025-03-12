
import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Send,
  Paperclip,
  Video,
  Phone,
  MoreVertical,
  Info,
  Clock,
  Image,
  FileText,
  Calendar,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Check,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

interface Message {
  id: number;
  sender: "student" | "tutor";
  text: string;
  timestamp: Date;
  read: boolean;
  attachment?: {
    type: "image" | "document";
    name: string;
    size: string;
    url: string;
  };
}

interface Conversation {
  id: number;
  student: {
    id: number;
    name: string;
    avatarUrl: string;
    status: "online" | "offline" | "away";
    lastActive?: Date;
  };
  messages: Message[];
  unreadCount: number;
}

const MessagesPage = () => {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 1,
      student: {
        id: 1,
        name: "Alex Johnson",
        avatarUrl: "https://i.pravatar.cc/150?img=33",
        status: "online",
      },
      messages: [
        {
          id: 1,
          sender: "student",
          text: "Hi Professor, I'm having trouble understanding the calculus problem from yesterday's session. Could you please explain it again?",
          timestamp: new Date(2023, 10, 2, 15, 30),
          read: true,
        },
        {
          id: 2,
          sender: "tutor",
          text: "Of course! Let's break it down step by step. The key to solving this integral is to use substitution.",
          timestamp: new Date(2023, 10, 2, 15, 35),
          read: true,
        },
        {
          id: 3,
          sender: "student",
          text: "Thanks, that helps! One more question - do you have any practice problems similar to this one?",
          timestamp: new Date(2023, 10, 2, 15, 40),
          read: true,
        },
        {
          id: 4,
          sender: "tutor",
          text: "Yes, I'll send you a set of practice problems. Let me know if you need more clarification.",
          timestamp: new Date(2023, 10, 2, 15, 45),
          read: true,
        },
        {
          id: 5,
          sender: "tutor",
          text: "Here's the document with practice problems.",
          timestamp: new Date(2023, 10, 2, 15, 47),
          read: true,
          attachment: {
            type: "document",
            name: "Calculus_Practice_Problems.pdf",
            size: "2.4 MB",
            url: "#",
          },
        },
        {
          id: 6,
          sender: "student",
          text: "Perfect! I'll work on these tonight. Should we go over them in our next session?",
          timestamp: new Date(2023, 10, 2, 16, 0),
          read: false,
        },
      ],
      unreadCount: 1,
    },
    {
      id: 2,
      student: {
        id: 2,
        name: "Emma Wilson",
        avatarUrl: "https://i.pravatar.cc/150?img=23",
        status: "offline",
        lastActive: new Date(2023, 10, 2, 10, 15),
      },
      messages: [
        {
          id: 1,
          sender: "student",
          text: "Hello! I'd like to reschedule our physics session from tomorrow to Friday if possible.",
          timestamp: new Date(2023, 10, 1, 12, 0),
          read: true,
        },
        {
          id: 2,
          sender: "tutor",
          text: "Hi Emma, I'm checking my schedule. I should be able to accommodate that. What time on Friday works for you?",
          timestamp: new Date(2023, 10, 1, 12, 10),
          read: true,
        },
        {
          id: 3,
          sender: "student",
          text: "Would 3 PM work? I have classes until 2:30.",
          timestamp: new Date(2023, 10, 1, 12, 15),
          read: true,
        },
        {
          id: 4,
          sender: "tutor",
          text: "3 PM works perfectly. I'll update our schedule. Don't forget to bring your lab report to review.",
          timestamp: new Date(2023, 10, 1, 12, 20),
          read: true,
        },
        {
          id: 5,
          sender: "student",
          text: "Great, thank you! I'll have the lab report ready.",
          timestamp: new Date(2023, 10, 1, 12, 25),
          read: true,
        },
      ],
      unreadCount: 0,
    },
    {
      id: 3,
      student: {
        id: 3,
        name: "James Brown",
        avatarUrl: "https://i.pravatar.cc/150?img=67",
        status: "away",
        lastActive: new Date(2023, 10, 2, 14, 45),
      },
      messages: [
        {
          id: 1,
          sender: "student",
          text: "Professor, I've completed the chemistry assignment. Here's a screenshot of my work.",
          timestamp: new Date(2023, 10, 2, 9, 0),
          read: true,
          attachment: {
            type: "image",
            name: "Chemistry_Assignment.jpg",
            size: "1.1 MB",
            url: "https://placehold.co/600x400",
          },
        },
        {
          id: 2,
          sender: "tutor",
          text: "Good work, James! I see a small error in the second equation. The coefficient should be 2, not 3.",
          timestamp: new Date(2023, 10, 2, 9, 15),
          read: true,
        },
        {
          id: 3,
          sender: "student",
          text: "Ah, I see it now. I'll correct that. Thanks for the quick feedback!",
          timestamp: new Date(2023, 10, 2, 9, 20),
          read: true,
        },
        {
          id: 4,
          sender: "tutor",
          text: "You're welcome! Let me know if you have any other questions.",
          timestamp: new Date(2023, 10, 2, 9, 25),
          read: true,
        },
      ],
      unreadCount: 0,
    },
  ]);

  const [activeConversation, setActiveConversation] = useState<Conversation | null>(conversations[0] || null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeConversation]);

  const filteredConversations = conversations.filter((conversation) =>
    conversation.student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeConversation) return;

    const updatedConversations = conversations.map((conversation) => {
      if (conversation.id === activeConversation.id) {
        const newMessageObj: Message = {
          id: Math.max(...conversation.messages.map((m) => m.id)) + 1,
          sender: "tutor",
          text: newMessage,
          timestamp: new Date(),
          read: true,
        };

        return {
          ...conversation,
          messages: [...conversation.messages, newMessageObj],
        };
      }
      return conversation;
    });

    setConversations(updatedConversations);
    setActiveConversation(
      updatedConversations.find((c) => c.id === activeConversation.id) || null
    );
    setNewMessage("");
  };

  const handleConversationSelect = (conversation: Conversation) => {
    // Mark all messages as read
    const updatedConversations = conversations.map((c) => {
      if (c.id === conversation.id) {
        return {
          ...c,
          unreadCount: 0,
          messages: c.messages.map((m) => ({ ...m, read: true })),
        };
      }
      return c;
    });

    setConversations(updatedConversations);
    setActiveConversation(
      updatedConversations.find((c) => c.id === conversation.id) || null
    );
  };

  const handleFileAttachment = () => {
    toast.success("File attachment is coming soon!");
  };

  const formatMessageTime = (date: Date) => {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);

    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    const isYesterday =
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear();

    if (isToday) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } else if (isYesterday) {
      return `Yesterday, ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" }) + 
        ", " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Messages</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Conversation List */}
        <Card className="md:col-span-1 h-[calc(100vh-200px)]">
          <CardHeader className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search conversations..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <ScrollArea className="h-[calc(100vh-280px)]">
            <CardContent className="p-0">
              {filteredConversations.length > 0 ? (
                <ul className="divide-y divide-border">
                  {filteredConversations.map((conversation) => (
                    <li 
                      key={conversation.id}
                      className={`p-4 hover:bg-muted cursor-pointer transition-colors ${
                        activeConversation?.id === conversation.id ? "bg-muted" : ""
                      }`}
                      onClick={() => handleConversationSelect(conversation)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10 border border-border">
                            <AvatarImage src={conversation.student.avatarUrl} alt={conversation.student.name} />
                            <AvatarFallback>
                              {conversation.student.name.charAt(0)}
                              {conversation.student.name.split(' ')[1]?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span 
                            className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
                              conversation.student.status === "online" 
                                ? "bg-green-500" 
                                : conversation.student.status === "away" 
                                  ? "bg-yellow-500"
                                  : "bg-gray-400"
                            }`}
                          />
                        </div>
                        <div className="flex-grow overflow-hidden">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium truncate">{conversation.student.name}</h3>
                            <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                              {formatMessageTime(
                                conversation.messages[conversation.messages.length - 1].timestamp
                              )}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground truncate mt-1">
                            {conversation.messages[conversation.messages.length - 1].sender === "tutor" ? "You: " : ""}
                            {conversation.messages[conversation.messages.length - 1].text}
                          </p>
                        </div>
                        {conversation.unreadCount > 0 && (
                          <Badge className="ml-2 bg-primary text-white">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No conversations found</p>
                </div>
              )}
            </CardContent>
          </ScrollArea>
        </Card>

        {/* Chat Window */}
        <Card className="md:col-span-2 lg:col-span-3 h-[calc(100vh-200px)] flex flex-col">
          {activeConversation ? (
            <>
              {/* Chat Header */}
              <CardHeader className="p-4 border-b flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-border">
                    <AvatarImage src={activeConversation.student.avatarUrl} alt={activeConversation.student.name} />
                    <AvatarFallback>
                      {activeConversation.student.name.charAt(0)}
                      {activeConversation.student.name.split(' ')[1]?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{activeConversation.student.name}</CardTitle>
                    <CardDescription className="text-xs flex items-center gap-1">
                      {activeConversation.student.status === "online" ? (
                        <span className="text-green-500 flex items-center gap-1">
                          <span className="h-2 w-2 rounded-full bg-green-500" />
                          Online
                        </span>
                      ) : (
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Clock size={12} />
                          {activeConversation.student.lastActive 
                            ? `Last active ${formatMessageTime(activeConversation.student.lastActive)}`
                            : "Offline"}
                        </span>
                      )}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone size={18} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video size={18} />
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Info size={18} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Student Information</DialogTitle>
                      </DialogHeader>
                      <div className="py-4">
                        <div className="flex flex-col items-center mb-4">
                          <Avatar className="h-16 w-16 mb-3">
                            <AvatarImage src={activeConversation.student.avatarUrl} alt={activeConversation.student.name} />
                            <AvatarFallback>
                              {activeConversation.student.name.charAt(0)}
                              {activeConversation.student.name.split(' ')[1]?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <h3 className="font-medium text-lg">{activeConversation.student.name}</h3>
                          <p className="text-muted-foreground text-sm">Mathematics Student</p>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between py-2 border-b border-border">
                            <span className="text-sm font-medium">Email</span>
                            <span className="text-sm">alex.johnson@example.com</span>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b border-border">
                            <span className="text-sm font-medium">Phone</span>
                            <span className="text-sm">(555) 123-4567</span>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b border-border">
                            <span className="text-sm font-medium">Sessions Completed</span>
                            <span className="text-sm">12</span>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b border-border">
                            <span className="text-sm font-medium">Next Session</span>
                            <span className="text-sm">Nov 7, 2023 - 4:00 PM</span>
                          </div>
                        </div>
                        
                        <div className="mt-6 flex gap-2 justify-center">
                          <Button variant="outline" className="flex items-center gap-2">
                            <Calendar size={16} />
                            <span>Schedule</span>
                          </Button>
                          <Button className="flex items-center gap-2">
                            <Phone size={16} />
                            <span>Call</span>
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical size={18} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Clear conversation</DropdownMenuItem>
                      <DropdownMenuItem>Export chat history</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Block student</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              {/* Messages */}
              <ScrollArea className="flex-grow p-6">
                <div className="space-y-4">
                  {activeConversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex flex-col ${
                        message.sender === "tutor" ? "items-end" : "items-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] px-4 py-2 rounded-lg ${
                          message.sender === "tutor"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p>{message.text}</p>
                        {message.attachment && (
                          <div 
                            className={`mt-2 p-2 rounded-md flex items-center gap-2 ${
                              message.sender === "tutor" ? "bg-primary-foreground/20" : "bg-background"
                            }`}
                          >
                            {message.attachment.type === "image" ? (
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <Image size={16} />
                                  <span className="text-sm">{message.attachment.name}</span>
                                </div>
                                <img 
                                  src={message.attachment.url} 
                                  alt="Attachment" 
                                  className="rounded-md w-full max-w-[300px]" 
                                />
                              </div>
                            ) : (
                              <>
                                <FileText size={24} />
                                <div className="flex-grow">
                                  <p className="text-sm font-medium">{message.attachment.name}</p>
                                  <p className="text-xs">{message.attachment.size}</p>
                                </div>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                                  <ChevronDown size={16} />
                                </Button>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground mt-1 px-1">
                        {formatMessageTime(message.timestamp)}
                        {message.sender === "tutor" && (
                          <Check
                            size={12}
                            className={`inline ml-1 ${
                              message.read ? "text-primary" : "text-muted-foreground"
                            }`}
                          />
                        )}
                      </span>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Message Input */}
              <CardContent className="p-4 border-t">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={handleFileAttachment}
                  >
                    <Paperclip size={18} />
                  </Button>
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="flex-grow"
                  />
                  <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                    <Send size={18} />
                  </Button>
                </form>
              </CardContent>
            </>
          ) : (
            <div className="flex-grow flex items-center justify-center">
              <div className="text-center p-6">
                <div className="mx-auto h-12 w-12 text-muted-foreground mb-4 border-2 border-dashed border-muted-foreground rounded-full flex items-center justify-center">
                  <MessageSquare size={24} />
                </div>
                <h3 className="text-lg font-medium mb-1">No Conversation Selected</h3>
                <p className="text-muted-foreground mb-4">Choose a conversation from the list to start messaging</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default MessagesPage;
