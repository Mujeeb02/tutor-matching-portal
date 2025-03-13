
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { FileQuestion, HelpCircle, Info, Mail, MessageSquare, Search } from "lucide-react";
import TutorSidebar from "@/components/TutorSidebar";
import { toast } from "sonner";

// FAQ data
const faqs = [
  {
    question: "How do I schedule a tutoring session?",
    answer: "You can schedule a tutoring session by going to the 'Schedule' page and clicking on 'Add Session'. Select a student, subject, date, and time to create a new session."
  },
  {
    question: "How do I manage my availability?",
    answer: "You can manage your availability by going to the 'Dashboard' page and clicking on the 'Update Availability' button. This allows you to set which days and times you're available for tutoring sessions."
  },
  {
    question: "How do I view my earnings?",
    answer: "You can view your earnings by navigating to the 'Earnings' page where you'll find detailed information about your income, including monthly summaries, pending payouts, and transaction history."
  },
  {
    question: "How do I communicate with students?",
    answer: "You can communicate with students through the 'Messages' page. Simply select a student from your list of contacts to start or continue a conversation."
  },
  {
    question: "How do I upload teaching materials?",
    answer: "You can upload teaching materials by going to the 'Materials' page and clicking on 'Upload Material'. You can then select files from your computer to share with your students."
  },
  {
    question: "How do I receive payments?",
    answer: "Payments are processed automatically based on your completed sessions. You can withdraw your earnings to your connected bank account or payment method from the 'Earnings' page."
  },
  {
    question: "What happens if a student cancels a session?",
    answer: "If a student cancels a session more than 24 hours in advance, no cancellation fee will be charged. For cancellations within 24 hours, a partial fee may apply according to our cancellation policy."
  }
];

const HelpPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSendMessage = () => {
    toast.success("Support message sent successfully. We'll get back to you soon.");
  };

  // Filter FAQs based on search query
  const filteredFaqs = searchQuery.length > 0
    ? faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

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
            <h1 className="text-3xl font-bold mb-2">Help & Support</h1>
            <p className="text-muted-foreground">Get answers to your questions and access support resources</p>
          </div>
          
          <div className="space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search for help topics..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Tabs defaultValue="faq" className="space-y-4">
              <TabsList className="grid grid-cols-3 md:w-[400px]">
                <TabsTrigger value="faq">FAQ</TabsTrigger>
                <TabsTrigger value="contact">Contact Us</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>
              
              <TabsContent value="faq" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileQuestion className="h-5 w-5" />
                      Frequently Asked Questions
                    </CardTitle>
                    <CardDescription>
                      Find answers to common questions about the tutoring platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {filteredFaqs.length > 0 ? (
                      <Accordion type="single" collapsible className="w-full">
                        {filteredFaqs.map((faq, index) => (
                          <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger>{faq.question}</AccordionTrigger>
                            <AccordionContent>{faq.answer}</AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    ) : (
                      <div className="text-center py-8">
                        <HelpCircle className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                        <h3 className="font-medium text-lg mb-1">No Results Found</h3>
                        <p className="text-muted-foreground mb-4">
                          We couldn't find any FAQs matching your search.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="contact" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Contact Support
                    </CardTitle>
                    <CardDescription>
                      Get in touch with our support team for personalized assistance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" defaultValue="Michael Smith" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="michael.smith@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" placeholder="Enter the subject of your inquiry" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea 
                          id="message" 
                          placeholder="Describe your issue or question in detail..." 
                          className="min-h-[150px]"
                        />
                      </div>
                      <Button className="w-full" onClick={handleSendMessage}>
                        Send Message
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      Email Support
                    </CardTitle>
                    <CardDescription>
                      Contact us directly via email
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="flex items-center gap-2 text-primary">
                      <Mail className="h-4 w-4" />
                      <a href="mailto:support@tutorplatform.com">support@tutorplatform.com</a>
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="resources" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Info className="h-5 w-5" />
                      Helpful Resources
                    </CardTitle>
                    <CardDescription>
                      Explore guides and resources to help you use the platform effectively
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div className="flex items-start gap-3 rounded-lg border p-3">
                        <div className="rounded-md bg-primary/10 p-2">
                          <FileQuestion className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Getting Started Guide</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Learn the basics of using the tutoring platform.
                          </p>
                          <Button variant="link" className="px-0 h-auto py-1">View Guide</Button>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 rounded-lg border p-3">
                        <div className="rounded-md bg-primary/10 p-2">
                          <FileQuestion className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Scheduling Best Practices</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Tips for efficiently managing your tutoring schedule.
                          </p>
                          <Button variant="link" className="px-0 h-auto py-1">View Guide</Button>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 rounded-lg border p-3">
                        <div className="rounded-md bg-primary/10 p-2">
                          <FileQuestion className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Communication Tools</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Learn about the various communication features available.
                          </p>
                          <Button variant="link" className="px-0 h-auto py-1">View Guide</Button>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 rounded-lg border p-3">
                        <div className="rounded-md bg-primary/10 p-2">
                          <FileQuestion className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Payments & Earnings</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Understand how the payment system works.
                          </p>
                          <Button variant="link" className="px-0 h-auto py-1">View Guide</Button>
                        </div>
                      </div>
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

export default HelpPage;
