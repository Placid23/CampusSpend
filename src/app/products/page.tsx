
"use client"

import { useState } from 'react'
import { DashboardShell } from "@/components/layout/Shell"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  Filter, 
  Star, 
  Clock, 
  MapPin,
  ChevronDown,
  MoreHorizontal,
  LayoutGrid,
  Heart,
  RotateCcw
} from "lucide-react"
import Image from 'next/image'
import { cn } from "@/lib/utils"

const vendorCategories = ["All", "Fast Food", "Pizza", "Bookstore", "Stationery", "Drinks", "Supplies", "Shawarma"]

const vendors = [
  { 
    id: 1, 
    name: "Pizza & More", 
    categories: ["Fast Food", "Pizza", "Pizza"], 
    distance: "300m from Main Campus",
    hours: "Until 10:30 PM",
    rating: 4.8, 
    reviews: "120+",
    startingPrice: "120",
    image: "https://picsum.photos/seed/pizza-vendor/600/350",
  },
  { 
    id: 2, 
    name: "Books Corner", 
    categories: ["Bookstore", "Stationery"], 
    distance: "300m from Main Campus",
    hours: "Until 9:30 PM",
    rating: 4.5, 
    reviews: "80+",
    startingPrice: "100",
    image: "https://picsum.photos/seed/books-vendor/600/350",
  },
  { 
    id: 3, 
    name: "FoodHub Cafe", 
    categories: ["Fast Food", "Drinks"], 
    distance: "350m from Main Campus",
    hours: "Until 10:00 PM",
    rating: 4.2, 
    reviews: "21+",
    startingPrice: "100",
    image: "https://picsum.photos/seed/cafe-vendor/600/350",
  },
  { 
    id: 4, 
    name: "Print & Spiral", 
    categories: ["Stationery", "Supplies"], 
    distance: "400m from Main Campus",
    hours: "Until 10:00 PM",
    rating: 4.6, 
    reviews: "40+",
    startingPrice: "150",
    image: "https://picsum.photos/seed/print-vendor/600/350",
  },
  { 
    id: 5, 
    name: "Books Corner", 
    categories: ["Bookstore", "Stationery"], 
    distance: "300m from Main Campus",
    hours: "Until 9:30 PM",
    rating: 4.5, 
    reviews: "80+",
    startingPrice: "100",
    image: "https://picsum.photos/seed/books-2/600/350",
  },
  { 
    id: 6, 
    name: "Print & Spiral", 
    categories: ["Stationery", "Supplies"], 
    distance: "400m from Main Campus",
    hours: "Until 10:00 PM",
    rating: 4.6, 
    reviews: "40+",
    startingPrice: "150",
    image: "https://picsum.photos/seed/print-2/600/350",
  }
]

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All")

  return (
    <DashboardShell>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-700">
        
        {/* Header Section */}
        <div className="space-y-4">
          <h1 className="text-5xl font-headline font-bold text-primary neon-text-glow">Vendors</h1>
          <p className="text-muted-foreground text-lg">Browse campus vendors and find the best deals.</p>
        </div>

        {/* Search & Main Action Bar */}
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input 
              className="w-full bg-white/5 border border-white/10 rounded-2xl h-14 pl-14 pr-6 text-base focus:outline-none focus:border-primary/50 transition-all placeholder:text-muted-foreground/50" 
              placeholder="Search for vendors or products..." 
            />
          </div>
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground hidden lg:block">Filter Vendors</span>
            <Button variant="outline" className="h-14 rounded-2xl bg-white/5 border-white/10 px-6 font-bold flex gap-3 hover:border-primary/50">
              <MapPin className="w-4 h-4 text-primary" /> Nearest <ChevronDown className="w-4 h-4" />
            </Button>
            <Button className="h-14 rounded-2xl bg-primary hover:bg-primary/90 px-8 font-bold shadow-[0_0_20px_rgba(239,26,184,0.3)]">
              MCampsx
            </Button>
            <Button size="icon" variant="outline" className="h-14 w-14 rounded-2xl bg-white/5 border-white/10 hover:border-primary/50">
              <Heart className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-6 py-4 border-y border-white/5">
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-3">
               <span className="text-sm font-bold text-muted-foreground">Filter Vendors</span>
               <div className="flex gap-1">
                 {["All"].map(cat => (
                   <Badge key={cat} className="bg-primary/20 text-primary border-primary/30 rounded-full px-4 py-1 font-bold text-xs cursor-pointer">
                     {cat} »
                   </Badge>
                 ))}
               </div>
             </div>
             
             <div className="flex items-center gap-3">
               <span className="text-sm font-bold text-muted-foreground">Campus:</span>
               <div className="h-10 w-24 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-muted-foreground/50">—</div>
             </div>

             <div className="flex items-center gap-3">
               <span className="text-sm font-bold text-muted-foreground">Sort By:</span>
               <Button variant="outline" className="h-10 bg-white/5 border-white/10 rounded-xl px-4 text-xs font-bold gap-4">
                 Nearest <ChevronDown className="w-3 h-3" />
               </Button>
             </div>
          </div>

          <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
            Clear Filter: <span className="text-foreground">Reset</span>
          </button>
        </div>

        {/* Vendors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {vendors.map((vendor) => (
            <GlassCard key={vendor.id} className="p-0 border-white/10 group overflow-hidden flex flex-col hover:border-primary/30">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image 
                  src={vendor.image} 
                  alt={vendor.name} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  data-ai-hint="vendor storefront"
                />
              </div>
              <div className="p-6 space-y-4 flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-headline font-bold group-hover:text-primary transition-colors">{vendor.name}</h3>
                  <MoreHorizontal className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-primary" />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {vendor.categories.map((cat, i) => (
                    <Badge key={i} className="bg-white/5 text-muted-foreground hover:text-primary border-none px-3 py-0.5 text-[10px] font-bold rounded-lg transition-colors">
                      {cat}
                    </Badge>
                  ))}
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-medium">
                    <MapPin className="w-3 h-3 text-primary" /> {vendor.distance}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-medium">
                    <Clock className="w-3 h-3 text-primary" /> Until {vendor.hours}
                  </div>
                </div>

                <div className="flex items-center gap-0.5 pt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className={cn("w-3 h-3 fill-amber-500 text-amber-500", star > vendor.rating && "fill-muted/20 text-muted/20")} />
                  ))}
                  <span className="text-[10px] font-bold text-muted-foreground ml-2">{vendor.reviews}</span>
                </div>

                <Button className="w-full h-12 rounded-2xl bg-gradient-to-r from-primary to-secondary font-bold text-sm shadow-[0_0_15px_rgba(239,26,184,0.2)] hover:opacity-90">
                  Browse Items
                </Button>

                <div className="flex justify-between items-center pt-2 border-t border-white/5">
                   <div className="text-[10px] font-bold">
                     Rs. <span className="text-lg font-headline text-foreground">{vendor.startingPrice}</span> <span className="text-muted-foreground font-medium">Starting</span>
                   </div>
                   <div className="flex gap-3 text-muted-foreground/40">
                      <LayoutGrid className="w-3 h-3" />
                      <RotateCcw className="w-3 h-3" />
                   </div>
                </div>
              </div>
            </GlassCard>
          ))}

          {/* Special Promo Card (Shawarma style) */}
          <GlassCard className="lg:col-span-2 p-0 border-white/10 overflow-hidden relative group">
            <div className="flex flex-col md:flex-row h-full">
              <div className="flex-1 p-8 flex flex-col justify-center space-y-6">
                <h3 className="text-3xl font-headline font-bold">Savory Shawarma</h3>
                <div className="flex gap-2">
                   <Badge className="bg-white/5 text-muted-foreground px-4 py-1 rounded-xl text-xs font-bold">Fast Food</Badge>
                   <Badge className="bg-white/5 text-muted-foreground px-4 py-1 rounded-xl text-xs font-bold">Shawarma</Badge>
                </div>
                <div className="space-y-2">
                  <p className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
                    <MapPin className="w-4 h-4 text-primary" /> 450 m. Open Until 1:00 PM
                  </p>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-4 h-4 fill-amber-500 text-amber-500" />)}
                    <span className="text-xs font-bold text-muted-foreground ml-3">110+</span>
                  </div>
                </div>
                <Button className="w-fit rounded-2xl h-14 px-10 bg-gradient-to-r from-primary to-secondary font-bold shadow-[0_0_30px_rgba(239,26,184,0.3)]">
                   Browse Items
                </Button>
              </div>
              <div className="relative w-full md:w-[45%] aspect-square md:aspect-auto">
                <Image 
                  src="https://picsum.photos/seed/shawarma/600/600" 
                  alt="Shawarma" 
                  fill 
                  className="object-cover" 
                  data-ai-hint="shawarma food"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent hidden md:block" />
              </div>
            </div>
            <div className="absolute bottom-4 right-8 flex gap-6 text-muted-foreground/30">
               <span className="text-[10px] font-bold flex items-center gap-1"><Clock className="w-3 h-3" /> 1 • 68</span>
               <span className="text-[10px] font-bold flex items-center gap-1"><Filter className="w-3 h-3" /> 110 + 33</span>
            </div>
          </GlassCard>
        </div>

        {/* Pagination Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-12 pb-8 border-t border-white/5">
          <p className="text-sm font-medium text-muted-foreground">Showing 1 - 8 of 48 Vendors</p>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5, 6].map((page) => (
              <Button 
                key={page} 
                variant={page === 1 ? "default" : "outline"}
                className={cn(
                  "w-10 h-10 rounded-xl font-bold",
                  page === 1 ? "bg-primary shadow-[0_0_15px_rgba(239,26,184,0.3)]" : "bg-white/5 border-white/10"
                )}
              >
                {page}
              </Button>
            ))}
            <Button variant="outline" className="h-10 w-10 rounded-xl bg-white/5 border-white/10">
               »
            </Button>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
