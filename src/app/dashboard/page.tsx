
"use client"

import { DashboardShell } from "@/components/layout/Shell"
import { GlassCard } from "@/components/ui/glass-card"
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  PieChart, 
  ShoppingBag, 
  Zap, 
  TrendingUp,
  CreditCard,
  Utensils,
  BookOpen,
  Coffee
} from "lucide-react"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  Cell
} from "recharts"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

const data = [
  { name: 'Mon', amount: 45 },
  { name: 'Tue', amount: 32 },
  { name: 'Wed', amount: 89 },
  { name: 'Thu', amount: 55 },
  { name: 'Fri', amount: 120 },
  { name: 'Sat', amount: 40 },
  { name: 'Sun', amount: 15 },
]

const recentExpenses = [
  { id: 1, title: 'Starbucks Coffee', category: 'Food', amount: 6.50, date: '2 hours ago', icon: Coffee, color: 'text-amber-500' },
  { id: 2, title: 'Campus Bookstore', category: 'Books', amount: 85.00, date: '5 hours ago', icon: BookOpen, color: 'text-blue-500' },
  { id: 3, title: 'Tech Shop - Keyboard', category: 'Electronics', amount: 120.00, date: 'Yesterday', icon: ShoppingBag, color: 'text-purple-500' },
  { id: 4, title: 'University Dining', category: 'Food', amount: 12.40, date: 'Yesterday', icon: Utensils, color: 'text-orange-500' },
]

export default function DashboardPage() {
  return (
    <DashboardShell>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-headline font-bold mb-2">Welcome Back, John</h1>
            <p className="text-muted-foreground">Your spending is <span className="text-primary font-bold">12% lower</span> than last month. Keep it up!</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-xl border-white/10 hover:bg-white/5">Generate Report</Button>
            <Button className="glow-button rounded-xl bg-primary hover:bg-primary/90">Add Expense</Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <GlassCard className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                <CreditCard className="w-5 h-5" />
              </div>
              <div className="flex items-center text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
                <ArrowDownRight className="w-3 h-3 mr-1" />
                4.5%
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-bold text-[10px]">Total Balance</p>
              <h3 className="text-2xl font-headline font-bold">$1,240.50</h3>
            </div>
          </GlassCard>

          <GlassCard className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="p-3 rounded-2xl bg-secondary/10 text-secondary">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div className="flex items-center text-xs font-bold text-rose-500 bg-rose-500/10 px-2 py-1 rounded-full">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                12.2%
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-bold text-[10px]">Monthly Spending</p>
              <h3 className="text-2xl font-headline font-bold">$425.20</h3>
            </div>
          </GlassCard>

          <GlassCard className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500">
                <PieChart className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-muted-foreground px-2 py-1">
                85% Spent
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-bold text-[10px]">Budget Limit</p>
              <h3 className="text-2xl font-headline font-bold">$500.00</h3>
            </div>
            <Progress value={85} className="h-1.5 bg-white/5" />
          </GlassCard>

          <GlassCard className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500">
                <Zap className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
                Optimal
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-bold text-[10px]">Efficiency Score</p>
              <h3 className="text-2xl font-headline font-bold">92/100</h3>
            </div>
          </GlassCard>
        </div>

        {/* Charts & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <GlassCard className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-headline font-bold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Spending Activity
              </h3>
              <select className="bg-white/5 border border-white/10 text-xs rounded-lg px-2 py-1 focus:outline-none">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(17, 11, 19, 0.95)', 
                      borderRadius: '16px', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      boxShadow: '0 0 20px rgba(0,0,0,0.4)',
                      backdropFilter: 'blur(10px)'
                    }} 
                    itemStyle={{ color: 'hsl(var(--primary))', fontWeight: 'bold' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorAmount)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-headline font-bold">Recent Expenses</h3>
              <Button variant="link" className="text-primary text-xs p-0 h-auto">View All</Button>
            </div>
            <div className="space-y-6">
              {recentExpenses.map((expense) => (
                <div key={expense.id} className="flex items-center gap-4 group cursor-pointer">
                  <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-white/10 transition-colors`}>
                    <expense.icon className={`w-5 h-5 ${expense.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate">{expense.title}</p>
                    <p className="text-xs text-muted-foreground">{expense.category} • {expense.date}</p>
                  </div>
                  <div className="text-sm font-bold">
                    -${expense.amount.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-8 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm py-6">
              Scan Receipt
            </Button>
          </GlassCard>
        </div>
      </div>
    </DashboardShell>
  )
}
