
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MessageSquare as MessageSquareIcon, 
  Search, 
  Send, 
  Paperclip, 
  ChevronRight
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

// Component for displaying a conversation preview in the sidebar
const ConversationPreview = ({ 
  name, 
  avatar, 
  message, 
  time, 
  unread, 
  active, 
  onClick 
}: { 
  name: string;
  avatar: string;
  message: string;
  time: string;
  unread?: number;
  active?: boolean;
  onClick: () => void;
}) => (
  <div 
    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors
      ${active ? 'bg-primary/10' : 'hover:bg-accent'}`}
    onClick={onClick}
  >
    <Avatar className="h-10 w-10">
      <AvatarImage src={avatar} alt={name} />
      <AvatarFallback>{name.charAt(0)}</AvatarFallback>
    </Avatar>
    <div className="flex-1 overflow-hidden">
      <div className="flex justify-between items-center mb-1">
        <span className={`font-medium ${unread ? 'text-primary' : ''}`}>{name}</span>
        <span className="text-xs text-muted-foreground">{time}</span>
      </div>
      <p className="text-sm text-muted-foreground truncate">{message}</p>
    </div>
    {unread && (
      <Badge className="h-5 w-5 flex items-center justify-center p-0 text-xs">{unread}</Badge>
    )}
  </div>
);

// Component for displaying a message in the conversation
const Message = ({ 
  content, 
  timestamp, 
  isSelf, 
  avatar 
}: { 
  content: string;
  timestamp: string;
  isSelf: boolean;
  avatar: string;
}) => (
  <div className={`flex gap-3 mb-4 ${isSelf ? 'flex-row-reverse' : ''}`}>
    <Avatar className="h-8 w-8 mt-1">
      <AvatarImage src={avatar} alt="Avatar" />
      <AvatarFallback>A</AvatarFallback>
    </Avatar>
    <div className={`max-w-[70%] ${isSelf ? 'items-end' : 'items-start'}`}>
      <div 
        className={`p-3 rounded-lg ${isSelf 
          ? 'bg-primary text-primary-foreground rounded-tr-none' 
          : 'bg-secondary rounded-tl-none'
        }`}
      >
        <p className="text-sm">{content}</p>
      </div>
      <span className="text-xs text-muted-foreground mt-1">{timestamp}</span>
    </div>
  </div>
);

const MessagesPage = () => {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1);
  const [messageText, setMessageText] = useState("");
  
  // Mock data for conversations
  const conversations = [
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "https://i.pravatar.cc/150?img=33",
      lastMessage: "I'll be ready for our session tomorrow",
      time: "10:30 AM",
      unread: 2,
      messages: [
        {
          content: "Hi Professor, I'm having trouble with the calculus homework.",
          timestamp: "10:15 AM",
          isSelf: false,
          avatar: "https://i.pravatar.cc/150?img=33"
        },
        {
          content: "What specific problem are you stuck on?",
          timestamp: "10:20 AM",
          isSelf: true,
          avatar: "https://i.pravatar.cc/150?img=35"
        },
        {
          content: "Problem 3.4. I don't understand how to apply the chain rule here.",
          timestamp: "10:25 AM",
          isSelf: false,
          avatar: "https://i.pravatar.cc/150?img=33"
        },
        {
          content: "I'll be ready for our session tomorrow",
          timestamp: "10:30 AM",
          isSelf: false,
          avatar: "https://i.pravatar.cc/150?img=33"
        }
      ]
    },
    {
      id: 2,
      name: "Sam Wilson",
      avatar: "https://i.pravatar.cc/150?img=12",
      lastMessage: "Thanks for explaining that concept",
      time: "Yesterday",
      unread: 0,
      messages: [
        {
          content: "Hello! I have a question about our next physics session.",
          timestamp: "Yesterday, 2:30 PM",
          isSelf: false,
          avatar: "https://i.pravatar.cc/150?img=12"
        },
        {
          content: "Sure, what would you like to know?",
          timestamp: "Yesterday, 3:00 PM",
          isSelf: true,
          avatar: "https://i.pravatar.cc/150?img=35"
        },
        {
          content: "Could we focus on electromagnetism? I'm struggling with that topic.",
          timestamp: "Yesterday, 3:15 PM",
          isSelf: false,
          avatar: "https://i.pravatar.cc/150?img=12"
        },
        {
          content: "Absolutely. I'll prepare some materials and examples on electromagnetism.",
          timestamp: "Yesterday, 3:30 PM",
          isSelf: true,
          avatar: "https://i.pravatar.cc/150?img=35"
        },
        {
          content: "Thanks for explaining that concept",
          timestamp: "Yesterday, 3:45 PM",
          isSelf: false,
          avatar: "https://i.pravatar.cc/150?img=12"
        }
      ]
    },
    {
      id: 3,
      name: "Emily Davis",
      avatar: "https://i.pravatar.cc/150?img=23",
      lastMessage: "See you on Monday for the chemistry review!",
      time: "Monday",
      unread: 0,
      messages: [
        {
          content: "Hi Professor, just confirming our study session for Monday",
          timestamp: "Monday, 9:00 AM",
          isSelf: false,
          avatar: "https://i.pravatar.cc/150?img=23"
        },
        {
          content: "Yes, we're scheduled for 4 PM. Does that still work for you?",
          timestamp: "Monday, 9:15 AM",
          isSelf: true,
          avatar: "https://i.pravatar.cc/150?img=35"
        },
        {
          content: "Perfect! I'll be ready with my questions about the periodic table and bonding.",
          timestamp: "Monday, 9:30 AM",
          isSelf: false,
          avatar: "https://i.pravatar.cc/150?img=23"
        },
        {
          content: "See you on Monday for the chemistry review!",
          timestamp: "Monday, 9:45 AM",
          isSelf: false,
          avatar: "https://i.pravatar.cc/150?img=23"
        }
      ]
    }
  ];

  const handleSendMessage = () => {
    if (messageText.trim() && selectedConversation !== null) {
      // In a real app, this would send the message to an API
      console.log("Sending message:", messageText);
      setMessageText("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getSelectedConversation = () => {
    return conversations.find(c => c.id === selectedConversation) || null;
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="w-full h-[calc(100vh-150px)] overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle>Messages</CardTitle>
          <CardDescription>Communicate with your students</CardDescription>
        </CardHeader>
        <div className="flex h-[calc(100%-98px)]">
          {/* Conversations Sidebar */}
          <div className="w-1/3 border-r">
            <div className="p-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="text" 
                  placeholder="Search conversations..." 
                  className="pl-8"
                />
              </div>
            </div>
            <Tabs defaultValue="all">
              <div className="px-3">
                <TabsList className="w-full">
                  <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                  <TabsTrigger value="unread" className="flex-1">Unread</TabsTrigger>
                </TabsList>
              </div>
              <Separator className="my-3" />
              <TabsContent value="all" className="m-0">
                <ScrollArea className="h-[calc(100vh-290px)]">
                  <div className="p-3 space-y-1">
                    {conversations.map(conversation => (
                      <ConversationPreview
                        key={conversation.id}
                        name={conversation.name}
                        avatar={conversation.avatar}
                        message={conversation.lastMessage}
                        time={conversation.time}
                        unread={conversation.unread}
                        active={selectedConversation === conversation.id}
                        onClick={() => setSelectedConversation(conversation.id)}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="unread" className="m-0">
                <ScrollArea className="h-[calc(100vh-290px)]">
                  <div className="p-3 space-y-1">
                    {conversations.filter(c => c.unread > 0).map(conversation => (
                      <ConversationPreview
                        key={conversation.id}
                        name={conversation.name}
                        avatar={conversation.avatar}
                        message={conversation.lastMessage}
                        time={conversation.time}
                        unread={conversation.unread}
                        active={selectedConversation === conversation.id}
                        onClick={() => setSelectedConversation(conversation.id)}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Conversation Area */}
          <div className="w-2/3 flex flex-col">
            {selectedConversation ? (
              <>
                {/* Conversation Header */}
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={getSelectedConversation()?.avatar} alt="Student" />
                      <AvatarFallback>{getSelectedConversation()?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{getSelectedConversation()?.name}</h3>
                      <p className="text-xs text-muted-foreground">Active now</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    View Profile <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
                
                {/* Messages */}
                <ScrollArea className="flex-grow p-4">
                  <div className="space-y-4">
                    {getSelectedConversation()?.messages.map((message, index) => (
                      <Message
                        key={index}
                        content={message.content}
                        timestamp={message.timestamp}
                        isSelf={message.isSelf}
                        avatar={message.avatar}
                      />
                    ))}
                  </div>
                </ScrollArea>
                
                {/* Message Input */}
                <div className="p-4 border-t mt-auto">
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Input
                      placeholder="Type a message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={handleKeyPress}
                      className="flex-grow"
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="h-4 w-4 mr-2" />
                      Send
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <MessageSquareIcon className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No conversation selected</h3>
                <p className="text-muted-foreground">
                  Choose a conversation from the sidebar to start chatting
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MessagesPage;
