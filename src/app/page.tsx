
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { ArrowRight, Zap, PieChart, Shield, Layout, ShoppingBag, BrainCircuit } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen nebula-bg">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass-morphism border-b-0 py-4 px-6 md:px-12 flex justify-between items-center bg-background/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(239,26,184,0.5)]">
            <Zap className="text-white w-5 h-5" />
          </div>
          <span className="font-headline font-bold text-xl tracking-tighter">CampusSpend</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
          <Link href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">How it Works</Link>
          <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">Dashboard</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="hidden sm:inline-flex">Sign In</Button>
          </Link>
          <Link href="/register">
            <Button className="glow-button rounded-full px-6 bg-primary hover:bg-primary/90">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              The Future of Campus Finance
            </div>
            <h1 className="text-5xl md:text-7xl font-headline font-bold leading-tight">
              Spend <span className="text-primary neon-text-glow">Smarter.</span><br />
              Grow <span className="text-secondary">Faster.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              Experience the luxury of automated expense tracking and AI-powered financial wisdom designed specifically for the modern student.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(239,26,184,0.3)]">
                  Launch Dashboard <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="rounded-full px-8 border-white/10 hover:bg-white/5">
                View Demo
              </Button>
            </div>
            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-background overflow-hidden">
                    <Image src={`https://picsum.photos/seed/${i + 20}/100/100`} alt="User" width={100} height={100} />
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">Join <span className="text-foreground font-bold">2,000+</span> students taking control</p>
            </div>
          </div>

          <div className="relative animate-in fade-in zoom-in duration-1000 delay-300">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl opacity-30 animate-pulse"></div>
            <GlassCard className="relative z-10 p-2 overflow-hidden bg-white/5 border-white/5">
              <Image 
                src="https://picsum.photos/seed/dash/1200/800" 
                alt="Dashboard Mockup" 
                width={1200} 
                height={800} 
                className="rounded-2xl"
                data-ai-hint="dashboard design"
              />
            </GlassCard>
            {/* Floating badges */}
            <div className="absolute -top-6 -right-6 animate-float z-20">
              <GlassCard className="py-2 px-4 flex items-center gap-3 backdrop-blur-3xl">
                <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-500">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Efficiency</div>
                  <div className="text-sm font-bold">+24% Savings</div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Total Volume', value: '$2.4M+' },
            { label: 'Active Students', value: '12k+' },
            { label: 'Partner Vendors', value: '450+' },
            { label: 'Avg Savings', value: '18%' }
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="text-3xl md:text-4xl font-headline font-bold mb-2 group-hover:text-primary transition-colors">{stat.value}</div>
              <div className="text-sm text-muted-foreground tracking-widest uppercase font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-headline font-bold">Engineered for Excellence</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Every detail of CampusSpend is crafted to provide a premium financial experience for both students and vendors.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: ShoppingBag, 
                title: 'Seamless Commerce', 
                desc: 'Browse and order from campus vendors with a single click. Integrated digital menus and inventory.' 
              },
              { 
                icon: BrainCircuit, 
                title: 'AI Insights', 
                desc: 'Personalized financial coaching that analyzes your habits and gives actionable budget advice.' 
              },
              { 
                icon: PieChart, 
                title: 'Deep Analytics', 
                desc: 'Visualize every penny with interactive heatmaps, charts, and behavior scoring.' 
              },
              { 
                icon: Shield, 
                title: 'Bank-Grade Security', 
                desc: 'Your financial data is protected with state-of-the-art encryption and Firebase-driven auth.' 
              },
              { 
                icon: Layout, 
                title: 'Vendor Tools', 
                desc: 'Complete control for campus shops to manage products, orders, and customer insights.' 
              },
              { 
                icon: Zap, 
                title: 'Auto-Logging', 
                desc: 'Never manually record an expense again. Every purchase is instantly categorized and tracked.' 
              }
            ].map((feature, i) => (
              <GlassCard key={i} className="group">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-headline font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 bg-card/20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="text-primary w-6 h-6" />
              <span className="font-headline font-bold text-xl tracking-tighter">CampusSpend</span>
            </div>
            <p className="text-sm text-muted-foreground">The premier financial operating system for the next generation of university students.</p>
          </div>
          <div>
            <h4 className="font-headline font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Features</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">App</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-bold mb-6">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">Subscribe for financial tips.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="email@address.com" 
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-primary transition-colors"
              />
              <Button className="bg-primary hover:bg-primary/90">Join</Button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-xs text-muted-foreground">
          © 2024 CampusSpend. Designed for the futuristic campus.
        </div>
      </footer>
    </div>
  );
}
