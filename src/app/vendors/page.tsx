"use client"

import { useState } from 'react'
import { DashboardShell } from "@/components/layout/Shell"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  MapPin, 
  Clock, 
  ChevronDown, 
  Star, 
  Heart,
  Zap,
  Navigation,
  Loader2,
  Store
} from "lucide-react"
import Image from 'next/image'
import Link from 'next/link'
import { cn } from "@/lib/utils"
import { collection, query, orderBy } from 'firebase/firestore'
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase'

export default function VendorListPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const db = useFirestore()

  const vendorsQuery = useMemoFirebase(() => {
    return query(collection(db, "vendors"), orderBy("name", "asc"))
  }, [db])

  const { data: vendors, isLoading } = useCollection(vendorsQuery)

  return (
    <DashboardShell>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-700">
        <div className="space-y-4">
          <h1 className="text-4xl font-headline font-bold">Vendors</h1>
          <p className="text-muted-foreground text-sm">Browse campus vendors and find the best deals.</p>
        </div>

        {/* High-Fidelity Search Bar */}
        <div className="relative group max-w-4xl">
          <div className="absolute inset-0 bg-primary/20 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
          <div className="relative flex items-center bg-white/5 border border-white/10 rounded-2xl h-14 px-6 gap-4">
            <Search className="w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input 
              className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground/50" 
              placeholder="Search for vendors or products..." 
            />
            <div className="flex items-center gap-4 pl-4 border-l border-white/10">
               <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hidden sm:inline">Filter Vendors</span>
               <Button variant="ghost" size="sm" className="h-8 rounded-xl bg-white/5 text-[10px] font-bold flex gap-2">
                 <Navigation className="w-3 h-3 text-primary" /> Nearest <ChevronDown className="w-3 h-3" />
               </Button>
               <Button size="icon" className="h-10 w-10 rounded-xl bg-primary shadow-[0_0_15px_rgba(239,26,184,0.4)]">
                 <Search className="w-4 h-4" />
               </Button>
            </div>
          </div>
        </div>

        {/* Filter Row */}
        <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/5">
           <div className="flex items-center gap-4">
             <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Filter Vendors</span>
             <div className="flex gap-2">
               {["All", "Fast Food", "Stationery"].map(cat => (
                 <Badge key={cat} onClick={() => setActiveCategory(cat)} className={cn(
                   "rounded-xl px-4 py-1.5 text-[10px] font-bold cursor-pointer transition-all border",
                   activeCategory === cat ? "bg-primary/20 border-primary text-white" : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10"
                 )}>{cat}</Badge>
               ))}
             </div>
           </div>

           <div className="flex items-center gap-4 ml-auto">
              <div className="flex items-center gap-2">
                 <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Campus:</span>
                 <div className="h-8 w-12 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-xs font-bold">Main</div>
              </div>
              <Button variant="link" className="text-[10px] font-bold uppercase text-muted-foreground p-0 h-auto" onClick={() => setActiveCategory("All")}>Clear Filter: <span className="text-white">Reset</span></Button>
           </div>
        </div>

        {/* Vendor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            <div className="col-span-full py-20 flex flex-col items-center gap-4">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Discovering Campus Vendors...</p>
            </div>
          ) : vendors && vendors.length > 0 ? (
            vendors.map((vendor) => (
              <GlassCard key={vendor.id} className="p-0 border-white/10 group overflow-hidden flex flex-col hover:border-primary/40 transition-all">
                <div className="relative aspect-[16/9] overflow-hidden bg-white/5">
                  <Image 
                    src={`https://picsum.photos/seed/${vendor.id}/400/225`}
                    alt={vendor.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-headline font-bold truncate">{vendor.name}</h3>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-primary/10 text-primary border-none px-3 py-0.5 text-[8px] font-bold rounded-lg uppercase">
                      {vendor.description || "Campus Vendor"}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                     <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                        <Clock className="w-3 h-3 text-primary" /> Open Now • 300m
                     </div>
                     <div className="flex items-center gap-1">
                        {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-primary text-primary" />)}
                        <span className="text-[10px] font-bold text-muted-foreground ml-2">4.8 (120+)</span>
                     </div>
                  </div>

                  <Link href={`/vendors/${vendor.id}`}>
                    <Button className="w-full h-11 rounded-2xl bg-gradient-to-r from-primary to-secondary text-xs font-bold text-white shadow-[0_0_20px_rgba(239,26,184,0.3)] hover:opacity-90">
                      Browse Items
                    </Button>
                  </Link>

                  <div className="flex justify-between items-center pt-2 border-t border-white/5">
                     <span className="text-xs font-bold text-white">₦100 Starting</span>
                     <div className="flex items-center gap-1.5 text-primary text-[10px] font-bold">
                        <Zap className="w-3 h-3" /> Featured
                     </div>
                  </div>
                </div>
              </GlassCard>
            ))
          ) : (
            <div className="col-span-full py-20 text-center space-y-4">
              <Store className="w-16 h-16 text-muted-foreground/20 mx-auto" />
              <p className="text-muted-foreground">No active vendors found on campus yet.</p>
            </div>
          )}
        </div>

        {/* Pagination Footer */}
        <div className="flex justify-between items-center pt-8 pb-12">
           <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
             {vendors?.length || 0} Vendors found
           </p>
        </div>
      </div>
    </DashboardShell>
  )
}