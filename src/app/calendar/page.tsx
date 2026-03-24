
"use client"

import { useState } from 'react'
import { DashboardShell } from "@/components/layout/Shell"
import { GlassCard } from "@/components/ui/glass-card"
import { Calendar } from "@/components/ui/calendar"
import { 
  Zap, 
  ArrowLeft, 
  ArrowRight, 
  CreditCard, 
  Calendar as CalendarIcon,
  TrendingUp,
  AlertTriangle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const spendingDays = {
    '2024-05-15': 'high',
    '2024-05-16': 'low',
    '2024-05-18': 'medium',
    '2024-05-20': 'high',
  }

  return (
    <DashboardShell>
      <div className="space-y-8 animate-in fade-in slide-in-from-right duration-700">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-headline font-bold">Expense Calendar</h1>
            <p className="text-muted-foreground">Visualize your spending footprint through time.</p>
          </div>
          <div className="flex gap-4">
             <Button variant="outline" className="rounded-xl border-white/10">Yearly View</Button>
             <Button className="glow-button rounded-xl bg-primary">Today</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <GlassCard className="lg:col-span-8 p-8">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="w-full h-full flex flex-col items-center justify-center p-0"
              classNames={{
                months: "w-full",
                month: "w-full space-y-8",
                caption: "flex justify-between pt-1 relative items-center mb-8",
                caption_label: "text-2xl font-headline font-bold",
                nav: "space-x-4 flex items-center",
                nav_button: "h-10 w-10 bg-white/5 border-white/10 rounded-xl hover:bg-white/10 hover:text-primary transition-all",
                table: "w-full border-collapse",
                head_row: "flex justify-between mb-4",
                head_cell: "text-muted-foreground w-14 font-bold text-xs uppercase tracking-widest",
                row: "flex w-full mt-4 justify-between",
                cell: "h-14 w-14 text-center text-sm p-0 relative",
                day: "h-14 w-14 p-0 font-medium rounded-2xl flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all border border-transparent",
                day_selected: "bg-primary text-white hover:bg-primary shadow-[0_0_20px_rgba(239,26,184,0.4)]",
                day_today: "border-primary/50 text-primary font-bold",
                day_outside: "text-muted-foreground/30 opacity-50",
              }}
            />
          </GlassCard>

          <div className="lg:col-span-4 space-y-6">
            <GlassCard className="p-6">
              <h3 className="text-lg font-headline font-bold mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                Day Breakdown
              </h3>
              <div className="space-y-6">
                <div className="text-center py-8">
                  <div className="text-4xl font-headline font-bold text-primary mb-1">$42.00</div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Total for June 12</p>
                </div>
                
                <div className="space-y-4">
                  {[
                    { vendor: "Engineering Cafe", amount: 12.00, time: "10:30 AM" },
                    { vendor: "Campus Hub Store", amount: 30.00, time: "2:45 PM" }
                  ].map((expense, i) => (
                    <div key={i} className="flex justify-between items-center p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all cursor-pointer">
                      <div>
                        <p className="font-bold text-sm">{expense.vendor}</p>
                        <p className="text-[10px] text-muted-foreground">{expense.time}</p>
                      </div>
                      <div className="text-sm font-bold">${expense.amount.toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>

            <GlassCard className="bg-rose-500/5 border-rose-500/20">
              <div className="flex gap-4 items-start">
                <div className="p-2 rounded-lg bg-rose-500/20 text-rose-500">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold">Over Budget Threshold</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    You've spent 15% more than average for this day of the week. 
                  </p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="bg-primary/5 border-primary/20">
              <div className="flex gap-4 items-start">
                <div className="p-2 rounded-lg bg-primary/20 text-primary">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold">Trend Analysis</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Consistent morning coffee spending detected. Consider a monthly prepay card for 10% savings.
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
