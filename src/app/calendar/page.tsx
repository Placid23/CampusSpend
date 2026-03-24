
"use client"

import * as React from "react"
import { DashboardShell } from "@/components/layout/Shell"
import { GlassCard } from "@/components/ui/glass-card"
import { 
  Zap, 
  Plus, 
  ChevronDown, 
  Clock, 
  Package, 
  BarChart3, 
  TrendingUp,
  Heart,
  ChefHat,
  Pizza,
  BookOpen,
  PenTool,
  Store
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts'
import Image from "next/image"
import { cn } from "@/lib/utils"

const chartData = [
  { name: 'Week 1', total: 400 },
  { name: 'Week 2', total: 600 },
  { name: 'Week 3', total: 500 },
  { name: 'Week 4', total: 800 },
  { name: 'Week 5', total: 950 },
]

const expenses = [
  { day: 6, name: "Pepperoni Pizza", price: 250, image: "https://picsum.photos/seed/pizzacali/100/100", category: "Food" },
  { day: 8, name: "Shawarma", price: 350, image: "https://picsum.photos/seed/shawa/100/100", category: "Food" },
  { day: 13, name: "Books", price: 637, image: "https://picsum.photos/seed/bookscali/100/100", category: "Education" },
  { day: 16, name: "Snacks", price: 100, image: "https://picsum.photos/seed/snacks/100/100", category: "Food" },
  { day: 21, name: "Cheesy Burger", price: 225, image: "https://picsum.photos/seed/burgercali/100/100", category: "Food", favorite: true },
  { day: 22, name: "Books", price: 637, image: "https://picsum.photos/seed/books2/100/100", category: "Education" },
  { day: 26, name: "Checked Proo", price: 200, image: "https://picsum.photos/seed/proo/100/100", category: "Other" },
  { day: 31, name: "Stationery", price: 150, image: "https://picsum.photos/seed/stat/100/100", category: "Stationery" },
]

export default function CalendarPage() {
  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  const [date] = React.useState(new Date(2024, 3, 1)) // April 2024 demo

  return (
    <DashboardShell>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-1000">
        
        {/* Header Section */}
        <div className="space-y-2">
          <h1 className="text-4xl font-headline font-bold">Expense <span className="text-primary neon-text-glow">Calendar</span></h1>
          <p className="text-muted-foreground text-sm max-w-2xl">Track your daily expenses and get insights into your spending habits for the month.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Calendar Main Grid (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <GlassCard className="p-0 border-white/10 overflow-hidden">
              {/* Calendar Controls */}
              <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-white/5 border-b border-white/5 gap-4">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 bg-white/5 rounded-xl px-4 py-2 border border-white/10 cursor-pointer hover:border-primary/50 transition-all">
                    <span className="text-sm font-bold">April 2024</span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-primary" />
                      <span className="text-xs font-bold text-white">675</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-xs font-bold text-primary">4220</span>
                    </div>
                  </div>
                </div>
                <Button className="rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold px-6">
                  <Plus className="w-3 h-3 mr-2 text-primary" /> Add Expense
                </Button>
              </div>

              {/* Grid Content */}
              <div className="p-1">
                <div className="grid grid-cols-7 gap-px bg-white/5">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="bg-transparent py-4 text-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                      {day}
                    </div>
                  ))}
                  
                  {days.map(day => {
                    const dayExpenses = expenses.filter(e => e.day === day)
                    return (
                      <div key={day} className="min-h-[140px] bg-white/[0.02] p-2 border border-white/5 relative group hover:bg-white/[0.05] transition-colors">
                        <span className="text-[10px] font-bold text-muted-foreground/40 absolute top-2 left-2">{day}</span>
                        
                        <div className="mt-4 space-y-2">
                          {dayExpenses.map((exp, idx) => (
                            <div key={idx} className="relative group/card cursor-pointer">
                              <div className="relative aspect-square rounded-xl overflow-hidden border border-white/10 shadow-lg">
                                <Image 
                                  src={exp.image} 
                                  alt={exp.name} 
                                  fill 
                                  className="object-cover group-hover/card:scale-110 transition-transform duration-500" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                {exp.favorite && (
                                  <div className="absolute top-1 right-1">
                                    <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                                  </div>
                                )}
                              </div>
                              <div className="mt-1 space-y-0.5">
                                <p className="text-[8px] font-bold text-white truncate leading-tight">{exp.name}</p>
                                <p className="text-[9px] font-bold text-primary">Rs. {exp.price}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Sidebar Insights (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <GlassCard className="p-8 border-white/10 space-y-10">
              <h3 className="text-xl font-headline font-bold">Monthly Insights</h3>
              
              <div className="space-y-8">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Total Expenses</p>
                    <p className="text-2xl font-headline font-bold text-white">Rs. 5,725</p>
                  </div>
                  <BarChart3 className="w-6 h-6 text-primary/40" />
                </div>

                {/* Weekly Chart */}
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold' }} 
                      />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(239,26,184,0.3)', borderRadius: '12px' }}
                        itemStyle={{ color: '#ef1ab8' }}
                      />
                      <Bar dataKey="total" radius={[4, 4, 0, 0]}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 4 ? '#ef1ab8' : 'rgba(239,26,184,0.3)'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Budget Tracker */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest">
                    <span className="text-muted-foreground">Budgets</span>
                    <span className="text-primary flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-primary" /> 5,725 / 6,000
                    </span>
                    <span className="text-white">Rs. 6,000</span>
                  </div>
                  <Progress value={95} className="h-1.5 bg-white/5 [&>div]:bg-primary" />
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                      TIP: You're nearing your limit! Keep an eye on your remaining budget for the rest of the month.
                    </p>
                  </div>
                </div>

                <Button className="w-full h-12 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-sm font-bold shadow-inner">
                  View Summary
                </Button>
              </div>

              <div className="pt-8 border-t border-white/5 flex justify-between items-center">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Today's Spending</span>
                <span className="text-lg font-headline font-bold text-primary neon-text-glow">Rs. 225</span>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Bottom Category Navigation */}
        <div className="flex justify-center pt-8">
           <GlassCard className="inline-flex gap-8 px-10 py-4 rounded-full border-white/5 bg-white/5 backdrop-blur-3xl">
              {[
                { label: "Burger", id: "burger", icon: ChefHat },
                { label: "Place", id: "place", icon: Store },
                { label: "Books", id: "books1", icon: BookOpen },
                { label: "Books", id: "books2", icon: BookOpen },
                { label: "Stationery", id: "stationery", icon: PenTool }
              ].map((nav, i) => (
                <div key={i} className="flex flex-col items-center gap-2 group cursor-pointer opacity-60 hover:opacity-100 transition-opacity">
                   <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
                      <nav.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                   </div>
                   <span className="text-[8px] font-bold uppercase tracking-widest">{nav.label}</span>
                </div>
              ))}
           </GlassCard>
        </div>

        {/* Footer Text */}
        <div className="text-center py-12 border-t border-white/5">
           <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-[0.2em]">© 2024 CampusSpend. All rights reserved.</p>
        </div>

      </div>
    </DashboardShell>
  )
}
