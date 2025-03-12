
import React, { useState } from "react";
import { Search, PaperclipIcon, Send, Smile, MoreVertical, Phone, Video } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  content: string;
  timestamp: string;
  sender: "student" | "tutor";
  read: boolean;
}

interface Conversation {
  id: number;
  studentName: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  online: boolean;
  avatarUrl: string;
  messages: Message[];
}

const Messages: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1); // Default to first conversation
  const [messageInput, setMessageInput] = useState("");
  
  // Mock data for conversations
  const conversations: Conversation[] = [
    {
      id: 1,
      studentName: "Alex Johnson",
      lastMessage: "Do you have any practice problems for tomorrow's session?",
      lastMessageTime: "10:42 AM",
      unreadCount: 2,
      online: true,
      avatarUrl: "https://i.pravatar.cc/150?img=33",
      messages: [
        { id: 1, content: "Hi Professor, I had a question about derivatives", timestamp: "Yesterday, 4:30 PM", sender: "student", read: true },
        { id: 2, content: "Sure, what's your specific question?", timestamp: "Yesterday, 4:35 PM", sender: "tutor", read: true },
        { id: 3, content: "I'm struggling with the chain rule application", timestamp: "Yesterday, 4:40 PM", sender: "student", read: true },
        { id: 4, content: "Let me explain it with an example...", timestamp: "Yesterday, 4:45 PM", sender: "tutor", read: true },
        { id: 5, content: "That makes sense! Thank you", timestamp: "Yesterday, 5:00 PM", sender: "student", read: true },
        { id: 6, content: "Do you have any practice problems for tomorrow's session?", timestamp: "10:42 AM", sender: "student", read: false },
        { id: 7, content: "I'd like to get some extra practice in", timestamp: "10:43 AM", sender: "student", read: false }
      ]
    },
    {
      id: 2,
      studentName: "Emma Davis",
      lastMessage: "Thanks for the session today!",
      lastMessageTime: "Yesterday",
      unreadCount: 0,
      online: false,
      avatarUrl: "https://i.pravatar.cc/150?img=23",
      messages: [
        { id: 1, content: "Hi, I'm looking forward to our physics session", timestamp: "Monday, 2:00 PM", sender: "student", read: true },
        { id: 2, content: "Me too! We'll be covering Newton's laws", timestamp: "Monday, 2:05 PM", sender: "tutor", read: true },
        { id: 3, content: "Perfect, I've been reviewing the textbook", timestamp: "Monday, 2:10 PM", sender: "student", read: true },
        { id: 4, content: "Thanks for the session today!", timestamp: "Yesterday, 6:00 PM", sender: "student", read: true }
      ]
    },
    {
      id: 3,
      studentName: "Sam Wilson",
      lastMessage: "Can we reschedule tomorrow's chemistry tutorial?",
      lastMessageTime: "Monday",
      unreadCount: 0,
      online: true,
      avatarUrl: "https://i.pravatar.cc/150?img=12",
      messages: [
        { id: 1, content: "Hello Professor, I have a question about organic chemistry", timestamp: "Last Week", sender: "student", read: true },
        { id: 2, content: "Can we reschedule tomorrow's chemistry tutorial?", timestamp: "Monday, 9:00 AM", sender: "student", read: true }
      ]
    }
  ];

  const filteredConversations = conversations.filter(convo => 
    convo.studentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedChat = conversations.find(convo => convo.id === selectedConversation);

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedConversation) return;
    
    console.log("Sending message:", messageInput);
    console.log("To conversation:", selectedConversation);
    
    // In a real app, we would update the conversations here
    // For demo purposes, let's just clear the input
    setMessageInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-[calc(100vh-130px)]">
      <div className="flex h-full">
        {/* Conversations Sidebar */}
        <div className="w-full sm:w-80 border-r flex flex-col h-full">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="space-y-1 p-2">
              {filteredConversations.map(conversation => (
                <button
                  key={conversation.id}
                  className={cn(
                    "w-full flex items-start gap-3 p-3 rounded-lg text-left",
                    selectedConversation === conversation.id 
                      ? "bg-primary/10" 
                      : "hover:bg-secondary/80"
                  )}
                  onClick={() => setSelectedConversation(conversation.id)}
                >
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={conversation.avatarUrl} alt={conversation.studentName} />
                      <AvatarFallback>{conversation.studentName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {conversation.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="font-medium truncate">{conversation.studentName}</span>
                      <span className="text-xs text-muted-foreground">{conversation.lastMessageTime}</span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
                      {conversation.lastMessage}
                    </p>
                  </div>
                  {conversation.unreadCount > 0 && (
                    <Badge className="ml-auto">{conversation.unreadCount}</Badge>
                  )}
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
        
        {/* Main Chat Area */}
        <div className="hidden sm:flex flex-col flex-1 h-full">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={selectedChat.avatarUrl} alt={selectedChat.studentName} />
                    <AvatarFallback>{selectedChat.studentName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{selectedChat.studentName}</h3>
                    <p className="text-xs text-muted-foreground">
                      {selectedChat.online ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone size={18} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video size={18} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical size={18} />
                  </Button>
                </div>
              </div>
              
              {/* Messages Area */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {selectedChat.messages.map(message => (
                    <div 
                      key={message.id}
                      className={cn(
                        "flex",
                        message.sender === "tutor" ? "justify-end" : "justify-start"
                      )}
                    >
                      <div className="flex gap-2 max-w-[80%]">
                        {message.sender === "student" && (
                          <Avatar className="h-8 w-8 mt-0.5">
                            <AvatarImage src={selectedChat.avatarUrl} alt={selectedChat.studentName} />
                            <AvatarFallback>{selectedChat.studentName.charAt(0)}</AvatarFallback>
                          </Avatar>
                        )}
                        <div>
                          <div 
                            className={cn(
                              "rounded-lg py-2 px-3",
                              message.sender === "tutor" 
                                ? "bg-primary text-primary-foreground" 
                                : "bg-secondary"
                            )}
                          >
                            <p>{message.content}</p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{message.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex items-end gap-2">
                  <div className="flex-grow bg-secondary rounded-lg">
                    <Input
                      placeholder="Type a message..."
                      className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                    <div className="flex justify-between px-3 py-2">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <PaperclipIcon size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Smile size={16} />
                        </Button>
                      </div>
                      <Button size="sm" onClick={handleSendMessage}>
                        <Send size={16} className="mr-2" />
                        Send
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h3 className="font-medium mb-1">Select a Conversation</h3>
                <p className="text-muted-foreground">Choose a student to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
