
import { useState } from "react";
import { cn } from "@/lib/utils";
import StudentSidebar from "@/components/StudentSidebar";
import {
  CreditCard,
  DollarSign,
  Calendar,
  Download,
  Plus,
  ChevronDown,
  Check,
  Clock,
  FileText,
  MoreVertical,
  AlertCircle,
  ShieldCheck,
  Wallet,
  Receipt
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

// Types for payment-related data
interface PaymentMethod {
  id: string;
  type: "card" | "paypal" | "bank";
  info: string;
  last4?: string;
  expiryDate?: string;
  isDefault: boolean;
}

interface Transaction {
  id: string;
  date: Date;
  amount: number;
  description: string;
  status: "completed" | "pending" | "failed" | "refunded";
  tutorName?: string;
  tutorAvatar?: string;
  paymentMethod: string;
  invoiceUrl?: string;
}

interface PaymentPlan {
  id: string;
  name: string;
  price: number;
  frequency: "monthly" | "yearly" | "one-time";
  nextBillingDate?: Date;
  features: string[];
  isCurrent: boolean;
}

// Transaction item component
const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  return (
    <div className="flex items-center p-4 hover:bg-secondary/50 rounded-lg transition-colors">
      <div className={cn(
        "h-10 w-10 rounded-full flex items-center justify-center mr-4",
        transaction.status === "completed" ? "bg-green-100" : 
        transaction.status === "pending" ? "bg-yellow-100" : 
        transaction.status === "refunded" ? "bg-blue-100" : "bg-red-100"
      )}>
        {transaction.tutorAvatar ? (
          <Avatar className="h-10 w-10">
            <AvatarImage src={transaction.tutorAvatar} alt={transaction.tutorName} />
            <AvatarFallback>{transaction.tutorName?.charAt(0)}</AvatarFallback>
          </Avatar>
        ) : (
          <DollarSign className={cn(
            "h-5 w-5",
            transaction.status === "completed" ? "text-green-600" : 
            transaction.status === "pending" ? "text-yellow-600" : 
            transaction.status === "refunded" ? "text-blue-600" : "text-red-600"
          )} />
        )}
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{transaction.description}</h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-3.5 w-3.5 mr-1.5" />
              <span>
                {transaction.date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="mx-1.5">•</span>
              <CreditCard className="h-3.5 w-3.5 mr-1.5" />
              <span>{transaction.paymentMethod}</span>
            </div>
          </div>
          <div className="text-right">
            <span className={cn(
              "font-medium",
              transaction.status === "refunded" && "text-blue-600"
            )}>
              {transaction.status === "refunded" ? "-" : ""}${transaction.amount.toFixed(2)}
            </span>
            <div>
              <Badge 
                variant="outline" 
                className={cn(
                  "text-xs",
                  transaction.status === "completed" ? "bg-green-50 text-green-600 border-green-200" : 
                  transaction.status === "pending" ? "bg-yellow-50 text-yellow-600 border-yellow-200" : 
                  transaction.status === "refunded" ? "bg-blue-50 text-blue-600 border-blue-200" : 
                  "bg-red-50 text-red-600 border-red-200"
                )}
              >
                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
              </Badge>
            </div>
          </div>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="ml-2">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {transaction.invoiceUrl && (
            <DropdownMenuItem onClick={() => toast.info("Downloading receipt")}>
              <Download className="h-4 w-4 mr-2" />
              Download Receipt
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => toast.info("Viewing transaction details")}>
            <FileText className="h-4 w-4 mr-2" />
            View Details
          </DropdownMenuItem>
          {transaction.status === "completed" && (
            <DropdownMenuItem onClick={() => toast.info("Support ticket will be opened")}>
              <AlertCircle className="h-4 w-4 mr-2" />
              Report an Issue
            </DropdownMenuItem>
          )}
          {transaction.status === "pending" && (
            <DropdownMenuItem onClick={() => toast.info("Payment will be cancelled")}>
              <AlertCircle className="h-4 w-4 mr-2" />
              Cancel Payment
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

// Payment method card component
const PaymentMethodCard = ({ method, setDefault }: { method: PaymentMethod; setDefault: () => void }) => {
  return (
    <Card className={cn(
      "relative overflow-hidden",
      method.isDefault && "border-primary"
    )}>
      {method.isDefault && (
        <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs py-1 px-3 rounded-bl-md">
          Default
        </div>
      )}
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            {method.type === "card" && (
              <div className="h-10 w-16 rounded bg-secondary flex items-center justify-center mr-4">
                <CreditCard className="h-6 w-6" />
              </div>
            )}
            {method.type === "paypal" && (
              <div className="h-10 w-16 rounded bg-blue-50 flex items-center justify-center mr-4">
                <span className="text-blue-600 font-bold">PayPal</span>
              </div>
            )}
            {method.type === "bank" && (
              <div className="h-10 w-16 rounded bg-secondary flex items-center justify-center mr-4">
                <Wallet className="h-6 w-6" />
              </div>
            )}
            <div>
              <h3 className="font-medium">{method.info}</h3>
              {method.last4 && (
                <p className="text-sm text-muted-foreground">
                  •••• {method.last4}
                  {method.expiryDate && <span className="ml-2">Exp: {method.expiryDate}</span>}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          {!method.isDefault && (
            <Button variant="outline" size="sm" onClick={setDefault}>
              Set as Default
            </Button>
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={() => toast.info("Delete payment method confirmation will show")}
          >
            Remove
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Plan card component
const PlanCard = ({ plan }: { plan: PaymentPlan }) => {
  return (
    <Card className={cn(
      "relative overflow-hidden",
      plan.isCurrent && "border-primary"
    )}>
      {plan.isCurrent && (
        <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs py-1 px-3 rounded-bl-md">
          Current Plan
        </div>
      )}
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        <CardDescription>
          ${plan.price}/
          {plan.frequency === "monthly" ? "month" : 
           plan.frequency === "yearly" ? "year" : "one-time"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        {plan.isCurrent ? (
          <>
            <Button variant="outline" className="w-full" onClick={() => toast.info("Plan management options will show")}>
              Manage Plan
            </Button>
            {plan.nextBillingDate && (
              <p className="text-xs text-muted-foreground mt-2 text-center w-full">
                Next billing on: {plan.nextBillingDate.toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            )}
          </>
        ) : (
          <Button className="w-full" onClick={() => toast.info("Plan upgrade/downgrade confirmation will show")}>
            Switch to This Plan
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

const PaymentsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Mock data for payment plans
  const plans: PaymentPlan[] = [
    {
      id: "basic",
      name: "Basic Plan",
      price: 19.99,
      frequency: "monthly",
      features: [
        "Up to 5 tutoring sessions per month",
        "Access to basic learning materials",
        "Email support"
      ],
      isCurrent: false
    },
    {
      id: "premium",
      name: "Premium Plan",
      price: 49.99,
      frequency: "monthly",
      nextBillingDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
      features: [
        "Unlimited tutoring sessions",
        "Full access to all learning materials",
        "Priority booking with top tutors",
        "24/7 priority support",
        "Progress tracking tools"
      ],
      isCurrent: true
    },
    {
      id: "pro",
      name: "Professional Plan",
      price: 99.99,
      frequency: "monthly",
      features: [
        "Everything in Premium",
        "1-on-1 dedicated tutor",
        "Personalized learning plan",
        "Advanced analytics dashboard",
        "Guaranteed results or money back"
      ],
      isCurrent: false
    }
  ];
  
  // Mock data for payment methods
  const paymentMethods: PaymentMethod[] = [
    {
      id: "card1",
      type: "card",
      info: "Visa Card",
      last4: "4242",
      expiryDate: "09/25",
      isDefault: true
    },
    {
      id: "paypal1",
      type: "paypal",
      info: "PayPal Account",
      isDefault: false
    },
    {
      id: "bank1",
      type: "bank",
      info: "Bank Account",
      last4: "9876",
      isDefault: false
    }
  ];
  
  // Mock data for transactions
  const transactions: Transaction[] = [
    {
      id: "tr1",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      amount: 49.99,
      description: "Premium Plan Subscription",
      status: "completed",
      paymentMethod: "Visa •••• 4242",
      invoiceUrl: "#"
    },
    {
      id: "tr2",
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      amount: 60.00,
      description: "Tutoring Session with Dr. Michael Smith",
      tutorName: "Dr. Michael Smith",
      tutorAvatar: "https://i.pravatar.cc/150?img=35",
      status: "completed",
      paymentMethod: "Visa •••• 4242",
      invoiceUrl: "#"
    },
    {
      id: "tr3",
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
      amount: 45.00,
      description: "Tutoring Session with Prof. Emily Chen",
      tutorName: "Prof. Emily Chen",
      tutorAvatar: "https://i.pravatar.cc/150?img=45",
      status: "completed",
      paymentMethod: "PayPal",
      invoiceUrl: "#"
    },
    {
      id: "tr4",
      date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
      amount: 30.00,
      description: "One-time Materials Purchase",
      status: "completed",
      paymentMethod: "Visa •••• 4242",
      invoiceUrl: "#"
    },
    {
      id: "tr5",
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days in future
      amount: 60.00,
      description: "Scheduled Session with Dr. James Lee",
      tutorName: "Dr. James Lee",
      tutorAvatar: "https://i.pravatar.cc/150?img=68",
      status: "pending",
      paymentMethod: "Visa •••• 4242"
    },
    {
      id: "tr6",
      date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8 days ago
      amount: 45.00,
      description: "Refund for Cancelled Session",
      status: "refunded",
      paymentMethod: "Visa •••• 4242",
      invoiceUrl: "#"
    }
  ];
  
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>(paymentMethods.find(m => m.isDefault)?.id || "");
  
  // Filter transactions
  const completedTransactions = transactions.filter(t => t.status === "completed");
  const pendingTransactions = transactions.filter(t => t.status === "pending");
  const refundedTransactions = transactions.filter(t => t.status === "refunded");
  
  // Calculate total spent
  const totalSpent = completedTransactions.reduce((total, t) => total + t.amount, 0);
  const pendingAmount = pendingTransactions.reduce((total, t) => total + t.amount, 0);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const handleSetDefaultPaymentMethod = (methodId: string) => {
    setSelectedPaymentMethod(methodId);
    toast.success("Default payment method updated");
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
        <main className="py-8 px-6 max-w-7xl mx-auto w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Payments</h1>
            <p className="text-muted-foreground">Manage your subscription, payment methods, and transactions</p>
          </div>
          
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Current Plan</h3>
                  <Badge>Active</Badge>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold">Premium</span>
                  <span className="text-muted-foreground">($49.99/mo)</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Renews on {new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Total Spent</h3>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold">${totalSpent.toFixed(2)}</span>
                  <span className="text-xs text-muted-foreground">(last 30 days)</span>
                </div>
                {pendingAmount > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Pending: ${pendingAmount.toFixed(2)}
                  </p>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Usage</h3>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-2xl font-bold">6/∞</span>
                  <span className="text-xs text-muted-foreground">hours used</span>
                </div>
                <Progress value={60} className="h-1" />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Payment Method</h3>
                  <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  <span className="font-medium">Visa •••• 4242</span>
                </div>
                <Button variant="link" className="p-0 h-auto mt-1 text-xs" onClick={() => toast.info("Payment methods section will be scrolled to")}>
                  Change Method
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Transactions */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Transaction History</CardTitle>
                    <Button variant="outline" size="sm" onClick={() => toast.info("Downloading statement...")}>
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="all">
                    <TabsList className="mb-4">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="completed">Completed</TabsTrigger>
                      <TabsTrigger value="pending">Pending</TabsTrigger>
                      <TabsTrigger value="refunded">Refunded</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="all">
                      <div className="space-y-1">
                        {transactions.map(transaction => (
                          <TransactionItem key={transaction.id} transaction={transaction} />
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="completed">
                      <div className="space-y-1">
                        {completedTransactions.length > 0 ? (
                          completedTransactions.map(transaction => (
                            <TransactionItem key={transaction.id} transaction={transaction} />
                          ))
                        ) : (
                          <p className="text-center py-6 text-muted-foreground">No completed transactions</p>
                        )}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="pending">
                      <div className="space-y-1">
                        {pendingTransactions.length > 0 ? (
                          pendingTransactions.map(transaction => (
                            <TransactionItem key={transaction.id} transaction={transaction} />
                          ))
                        ) : (
                          <p className="text-center py-6 text-muted-foreground">No pending transactions</p>
                        )}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="refunded">
                      <div className="space-y-1">
                        {refundedTransactions.length > 0 ? (
                          refundedTransactions.map(transaction => (
                            <TransactionItem key={transaction.id} transaction={transaction} />
                          ))
                        ) : (
                          <p className="text-center py-6 text-muted-foreground">No refunded transactions</p>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="border-t pt-4 flex justify-center">
                  <Button variant="outline" onClick={() => toast.info("Loading more transactions...")}>
                    Load More
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Payment Methods */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Payment Methods</CardTitle>
                    <Button variant="outline" size="sm" onClick={() => toast.info("Add payment method dialog will open here")}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add New
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {paymentMethods.map(method => (
                      <PaymentMethodCard 
                        key={method.id} 
                        method={method} 
                        setDefault={() => handleSetDefaultPaymentMethod(method.id)}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" onClick={() => toast.info("Invoice generation process will start")}>
                    <Receipt className="mr-2 h-4 w-4" />
                    Generate Invoice
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => toast.info("Payment history export options will show")}>
                    <Download className="mr-2 h-4 w-4" />
                    Export Payment History
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => toast.info("Billing address management will open")}>
                    <FileText className="mr-2 h-4 w-4" />
                    Update Billing Info
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Subscription Plans */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-6">Subscription Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map(plan => (
                <PlanCard key={plan.id} plan={plan} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PaymentsPage;
