
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User, ArrowRight, Facebook, Twitter, Google } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState<"student" | "tutor">("student");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
    console.log("Signup attempt with:", { name, email, password, accountType });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-20 px-4 relative">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-700/10 rounded-full filter blur-3xl"></div>
        </div>

        <div className="w-full max-w-md animate-fade-up">
          <div className="glass p-8 rounded-2xl border border-white/10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Create Account</h1>
              <p className="text-muted-foreground">Join TutorMatch today</p>
            </div>

            <div className="flex rounded-full bg-secondary p-1 mb-6">
              <button
                className={`flex-1 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  accountType === "student" 
                    ? "bg-primary text-white" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setAccountType("student")}
              >
                I'm a Student
              </button>
              <button
                className={`flex-1 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  accountType === "tutor" 
                    ? "bg-primary text-white" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setAccountType("tutor")}
              >
                I'm a Tutor
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    className="pl-10"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email address"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Must be at least 8 characters with letters, numbers and special characters
                </p>
              </div>

              <Button type="submit" className="w-full rounded-full">
                Create Account <ArrowRight className="ml-2" size={16} />
              </Button>
            </form>

            <div className="relative flex items-center justify-center my-6">
              <div className="border-t border-white/10 absolute w-full"></div>
              <span className="bg-card px-2 text-sm text-muted-foreground relative">Or continue with</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Button variant="outline" className="rounded-full">
                <Google size={18} />
              </Button>
              <Button variant="outline" className="rounded-full">
                <Facebook size={18} />
              </Button>
              <Button variant="outline" className="rounded-full">
                <Twitter size={18} />
              </Button>
            </div>

            <div className="text-center mt-6">
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Signup;
