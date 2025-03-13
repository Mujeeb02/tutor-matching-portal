
import { useState } from "react";
import { cn } from "@/lib/utils";
import StudentSidebar from "@/components/StudentSidebar";
import { 
  HelpCircle, 
  FileText, 
  Phone, 
  Mail, 
  MessageSquare, 
  Search,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  BookOpen,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";

const HelpPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // FAQ data
  const faqCategories = [
    {
      id: "account",
      title: "Account & Profile",
      questions: [
        {
          id: "change-password",
          question: "How do I change my password?",
          answer: "To change your password, go to Settings > Password & Security. Enter your current password followed by your new password and confirm it."
        },
        {
          id: "update-profile",
          question: "How do I update my profile information?",
          answer: "Go to Settings > Profile to update your personal information like name, email, phone number, and profile picture."
        },
        {
          id: "delete-account",
          question: "Can I delete my account?",
          answer: "Yes, you can delete your account in the Settings page under the 'Danger Zone' section. This action is permanent and will delete all your data."
        }
      ]
    },
    {
      id: "payments",
      title: "Payments & Billing",
      questions: [
        {
          id: "payment-methods",
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), as well as PayPal and bank transfers for certain plan types."
        },
        {
          id: "refund",
          question: "What is your refund policy?",
          answer: "If you're not satisfied with a session, you can request a refund within 24 hours. All refund requests are reviewed on a case-by-case basis."
        },
        {
          id: "invoice",
          question: "How do I get an invoice for my payments?",
          answer: "You can download invoices for all your payments from the Payments page. Click on any payment history item and select 'Download Invoice'."
        }
      ]
    },
    {
      id: "sessions",
      title: "Tutoring Sessions",
      questions: [
        {
          id: "schedule",
          question: "How do I schedule a session with a tutor?",
          answer: "You can schedule a session by going to Find Tutors, selecting a tutor, and choosing an available time slot on their calendar."
        },
        {
          id: "cancel",
          question: "What is the cancellation policy?",
          answer: "You can cancel a session up to 6 hours before the scheduled time without any penalty. Late cancellations may be subject to partial or full charges."
        },
        {
          id: "join",
          question: "How do I join a virtual tutoring session?",
          answer: "When it's time for your session, go to the Schedule page. You'll see a 'Join Session' button for your upcoming session. Click it to enter the virtual classroom."
        },
        {
          id: "materials",
          question: "Can I share materials with my tutor?",
          answer: "Yes, you can share materials with your tutor through the Materials section or directly during a session. You can upload documents, images, or share links."
        }
      ]
    },
    {
      id: "technical",
      title: "Technical Issues",
      questions: [
        {
          id: "browser",
          question: "What browsers are supported?",
          answer: "We support the latest versions of Chrome, Firefox, Safari, and Edge. For the best experience, we recommend using Chrome."
        },
        {
          id: "connection",
          question: "What should I do if I have connection issues during a session?",
          answer: "If you experience connection issues, try refreshing your browser, checking your internet connection, or switching to a different device. You can also try disabling video to save bandwidth."
        },
        {
          id: "audio-video",
          question: "My audio or video isn't working. What should I do?",
          answer: "Make sure your browser has permission to access your microphone and camera. Check that you haven't accidentally muted yourself, and that the correct audio/video devices are selected in the settings."
        }
      ]
    }
  ];

  // Filter FAQs based on search query
  const filteredFAQs = searchQuery 
    ? faqCategories.map(category => ({
        ...category,
        questions: category.questions.filter(q => 
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.questions.length > 0)
    : faqCategories;

  return (
    <div className="min-h-screen flex bg-background">
      <StudentSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div 
        className={cn(
          "flex-1 transition-all duration-300",
          isSidebarOpen ? "ml-64" : "ml-20"
        )}
      >
        <main className="py-8 px-6 max-w-6xl mx-auto w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Help Center</h1>
            <p className="text-muted-foreground">Find answers to your questions and get support</p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input 
                className="pl-10 py-6 text-lg" 
                placeholder="Search for help..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => toast.info("Contact page will open")}>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-lg mb-2">Contact Support</h3>
                <p className="text-sm text-muted-foreground">Get help from our support team</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => toast.info("Knowledge base will open")}>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-lg mb-2">Knowledge Base</h3>
                <p className="text-sm text-muted-foreground">Explore our detailed guides</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => toast.info("Video tutorials will open")}>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-lg mb-2">Video Tutorials</h3>
                <p className="text-sm text-muted-foreground">Watch step-by-step videos</p>
              </CardContent>
            </Card>
          </div>

          {/* FAQs */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            
            {filteredFAQs.length > 0 ? (
              <div className="space-y-6">
                {filteredFAQs.map((category) => (
                  <div key={category.id}>
                    <h3 className="text-xl font-medium mb-4">{category.title}</h3>
                    <Accordion type="single" collapsible className="mb-6">
                      {category.questions.map((faq) => (
                        <AccordionItem key={faq.id} value={faq.id}>
                          <AccordionTrigger className="text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="pl-2 py-2 text-muted-foreground">
                              {faq.answer}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <HelpCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No results found</h3>
                <p className="text-muted-foreground mb-4">Try searching with different keywords or browse our categories</p>
                <Button variant="outline" onClick={() => setSearchQuery("")}>Clear Search</Button>
              </div>
            )}
          </div>

          {/* Contact Methods */}
          <div className="mt-12 pt-8 border-t">
            <h2 className="text-2xl font-bold mb-6">Still Need Help?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium text-lg mb-2">Email Us</h3>
                    <p className="text-sm text-muted-foreground mb-4">We'll respond within 24 hours</p>
                    <Button variant="outline" className="w-full">
                      support@tutorapp.com
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                      <MessageSquare className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium text-lg mb-2">Live Chat</h3>
                    <p className="text-sm text-muted-foreground mb-4">Chat with our support team</p>
                    <Button className="w-full" onClick={() => toast.info("Live chat will open here")}>
                      Start Chat
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium text-lg mb-2">Phone Support</h3>
                    <p className="text-sm text-muted-foreground mb-4">Available 9am-5pm ET, Mon-Fri</p>
                    <Button variant="outline" className="w-full">
                      +1 (555) 123-4567
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Getting Started Guide */}
          <div className="mt-12 pt-8 border-t">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Getting Started Guide</h2>
              <Button variant="ghost" className="flex items-center gap-1">
                View all guides
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="border rounded-md p-4 hover:border-primary/50 transition-colors cursor-pointer">
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Creating Your Student Profile</h3>
                    <p className="text-sm text-muted-foreground">Learn how to set up your profile for the best learning experience</p>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-md p-4 hover:border-primary/50 transition-colors cursor-pointer">
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Finding the Right Tutor</h3>
                    <p className="text-sm text-muted-foreground">Tips for searching and selecting tutors that match your needs</p>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-md p-4 hover:border-primary/50 transition-colors cursor-pointer">
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Scheduling Your First Session</h3>
                    <p className="text-sm text-muted-foreground">How to book and prepare for your first tutoring session</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HelpPage;
