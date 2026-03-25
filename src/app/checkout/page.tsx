
"use client"

import { DashboardShell } from "@/components/layout/Shell"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { 
  CheckCircle2, 
  Zap, 
  MapPin, 
  Clock, 
  ChefHat, 
  Pizza, 
  BookOpen, 
  PenTool,
  Mail,
  ChevronRight,
  ShoppingBag,
  ArrowRight
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useUser } from "@/firebase"

export default function CheckoutPage() {
  const { profile } = useUser()

  return (
    <DashboardShell>
      <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-top duration-1000 py-12">
        
        {/* Success Header */}
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="relative">
            <div className="absolute -inset-4 bg-emerald-500/20 blur-2xl rounded-full opacity-50 animate-pulse"></div>
            <div className="w-24 h-24 rounded-3xl bg-emerald-500/10 border-2 border-emerald-500/50 flex items-center justify-center relative z-10 shadow-[0_0_50px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-12 h-12 text-emerald-500" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-5xl font-headline font-bold tracking-tight text-white neon-text-glow">Payment Successful!</h1>
            <p className="text-muted-foreground max-w-md mx-auto">Your order has been placed and your Naira (₦) wallet has been updated.</p>
          </div>
        </div>

        <GlassCard className="p-10 border-white/10 space-y-10 bg-white/5 backdrop-blur-3xl text-center">
          <div className="space-y-6 max-w-md mx-auto">
            <div className="p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
              <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Transaction Confirmed</p>
              <p className="text-3xl font-bold text-white">Digital Receipt Logged</p>
              <p className="text-xs text-muted-foreground">Your transaction has been automatically categorized in your spending summary.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Link href="/calendar" className="block">
                <Button variant="outline" className="w-full h-14 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-xs font-bold uppercase tracking-widest">
                  View Spending
                </Button>
              </Link>
              <Link href="/orders" className="block">
                <Button variant="outline" className="w-full h-14 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-xs font-bold uppercase tracking-widest">
                  Order Details
                </Button>
              </Link>
            </div>

            <Link href="/dashboard" className="block">
              <Button className="w-full h-16 rounded-2xl bg-gradient-to-r from-primary to-secondary text-base font-bold shadow-[0_0_30px_rgba(239,26,184,0.3)] hover:opacity-90 active:scale-[0.98] transition-all">
                Back to Dashboard <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col items-center gap-3 text-[10px] text-muted-foreground font-medium">
             <div className="flex items-center gap-2">
               <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center"><Mail className="w-4 h-4 text-primary" /></div>
               <span>Confirmation sent to {profile?.email}</span>
             </div>
             <p className="uppercase tracking-[0.2em] opacity-40">Thank you for choosing CampusSpend</p>
          </div>
        </GlassCard>

        {/* Footer Text */}
        <div className="text-center py-8">
           <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-[0.2em]">© 2024 CampusSpend. Secure Academic Infrastructure.</p>
        </div>

      </div>
    </DashboardShell>
  )
}
