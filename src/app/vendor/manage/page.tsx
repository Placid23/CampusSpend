
"use client"

import * as React from "react"
import { VendorShell } from "@/components/layout/VendorShell"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Search,
  Plus,
  ChevronRight,
  MoreVertical,
  Zap,
  Package,
  AlertTriangle,
  ChefHat,
  Pizza,
  BookOpen,
  PenTool,
  TrendingUp,
  Filter
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

const products = [
  {
    id: 1,
    name: "Pepperoni Pizza",
    subtext: "In Stock",
    price: 325,
    stock: 25,
    category: "Fast Food",
    status: "In Stock",
    image: "https://picsum.photos/seed/pizza-m/100/100",
    statusColor: "emerald"
  },
  {
    id: 2,
    name: "Classic Burger",
    subtext: "Low Stock",
    price: 250,
    stock: 18,
    category: "Fast Food",
    status: "In Stock",
    image: "https://picsum.photos/seed/burger-m/100/100",
    statusColor: "emerald",
    hasWarning: true
  },
  {
    id: 3,
    name: "Chicken Shawarma",
    subtext: "Low Stock",
    price: 350,
    stock: 30,
    category: "Fast Food",
    status: "In Stock",
    image: "https://picsum.photos/seed/shawarma-m/100/100",
    statusColor: "emerald",
    hasWarning: true
  },
  {
    id: 4,
    name: "Veg Club Sandwich",
    subtext: "In Stock",
    price: 200,
    stock: 8,
    category: "Fast Food",
    status: "In Stock",
    image: "https://picsum.photos/seed/sandwich-m/100/100",
    statusColor: "emerald",
    hasDot: "rose"
  },
  {
    id: 5,
    name: "Spicy Chicken Wings",
    subtext: "Low Stock",
    price: 300,
    stock: 12,
    category: "Fast Food",
    status: "In Stock",
    image: "https://picsum.photos/seed/wings-m/100/100",
    statusColor: "emerald"
  },
  {
    id: 6,
    name: "French Fries",
    subtext: "In Stock",
    price: 150,
    stock: 35,
    category: "Fast Food",
    status: "In Stock",
    image: "https://picsum.photos/seed/fries-m/100/100",
    statusColor: "emerald"
  }
]

export default function ManageProductsPage() {
  return (
    <VendorShell>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-1000">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h1 className="text-4xl font-headline font-bold text-white tracking-tight">Manage Products</h1>
          <Link href="/vendor/add-product">
            <Button className="glow-button rounded-2xl h-12 bg-primary px-8 group">
              <Plus className="mr-2 w-4 h-4" /> Add New Product
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Table (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Search & Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl h-14 pl-14 pr-6 text-sm focus:border-primary/50 transition-all placeholder:text-muted-foreground/40" 
                  placeholder="Search products..." 
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-56 h-14 bg-white/5 border-white/10 rounded-2xl px-6 focus:ring-primary/30">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent className="bg-card border-white/10">
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="fast-food">Fast Food</SelectItem>
                  <SelectItem value="drinks">Drinks</SelectItem>
                  <SelectItem value="stationery">Stationery</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <GlassCard className="p-0 border-white/10 bg-white/5 backdrop-blur-3xl overflow-hidden">
              <Table>
                <TableHeader className="bg-white/5">
                  <TableRow className="border-white/5 hover:bg-transparent">
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest py-6 text-muted-foreground pl-8">Image</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest py-6 text-muted-foreground">Product Name</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest py-6 text-muted-foreground">Price (Rs.)</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest py-6 text-muted-foreground">Stock</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest py-6 text-muted-foreground">Category</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest py-6 text-muted-foreground text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((item) => (
                    <TableRow key={item.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                      <TableCell className="pl-8 py-6">
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-white/10">
                          <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">{item.name}</p>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] text-muted-foreground font-medium">{item.subtext}</span>
                            {item.hasWarning && <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]"></div>}
                            {item.hasDot && <div className={cn("w-2 h-2 rounded-full", item.hasDot === 'rose' ? "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]" : "bg-emerald-500")}></div>}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm font-bold text-white/80">Rs. {item.price}</TableCell>
                      <TableCell className="text-sm font-bold text-white/80">{item.stock}</TableCell>
                      <TableCell className="text-sm font-bold text-white/80">{item.category}</TableCell>
                      <TableCell>
                        <div className="flex justify-center">
                          <div className="px-5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
                            {item.status}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {/* Pagination */}
              <div className="p-6 flex items-center justify-center gap-2 border-t border-white/5">
                <Button variant="ghost" size="sm" className="text-muted-foreground"><ChevronRight className="w-4 h-4 rotate-180" /></Button>
                <Button variant="outline" size="sm" className="h-8 w-8 rounded-lg bg-primary text-white border-primary text-[10px] font-bold">1</Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 rounded-lg text-[10px] font-bold text-muted-foreground hover:bg-white/5">2</Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 rounded-lg text-[10px] font-bold text-muted-foreground hover:bg-white/5">3</Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 rounded-lg text-[10px] font-bold text-muted-foreground hover:bg-white/5">4</Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground mx-2"><ChevronRight className="w-4 h-4" /></Button>
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Next</span>
              </div>
            </GlassCard>
          </div>

          {/* Right Column: Summaries (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-2">
              <span>Showing 1 - 10 of 35</span>
            </div>

            {/* Product Summary Card */}
            <GlassCard className="p-8 border-white/10 space-y-8 bg-white/5">
              <h3 className="text-lg font-headline font-bold text-white">Product Summary</h3>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]"></div>
                    <span className="text-sm font-bold text-white/80">Total Products</span>
                  </div>
                  <span className="text-lg font-bold text-white">35</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]"></div>
                    <span className="text-sm font-bold text-white/80">Low Stock</span>
                  </div>
                  <span className="text-lg font-bold text-amber-500">4</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]"></div>
                    <span className="text-sm font-bold text-white/80">Out of Stock</span>
                  </div>
                  <span className="text-lg font-bold text-rose-500">1</span>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">40 in Stock</span>
                  <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-[8px] uppercase tracking-widest">In Stock</Badge>
                </div>
              </div>
            </GlassCard>

            {/* Low Stock Alert Card */}
            <GlassCard className="p-8 border-white/10 space-y-8 bg-white/5">
              <h3 className="text-lg font-headline font-bold text-white">Low Stock Alert</h3>
              
              <div className="space-y-6">
                {[
                  { name: "Veg Club Sandwich", left: "8 left", icon: ChefHat },
                  { name: "Spiral Notebook", left: "5 left", icon: Package },
                  { name: "Cheese Burger", left: "3 left", icon: Package }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <item.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="text-xs font-bold text-white/80 group-hover:text-white transition-colors">{item.name}</span>
                    </div>
                    <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">{item.left}</span>
                  </div>
                ))}
              </div>

              <Button className="w-full h-14 rounded-2xl bg-gradient-to-r from-primary to-secondary text-base font-bold shadow-[0_0_30px_rgba(239,26,184,0.4)] hover:opacity-90 active:scale-[0.98] transition-all">
                Manage Stock
              </Button>
            </GlassCard>

          </div>
        </div>

        {/* Bottom Navigation Categories */}
        <div className="flex justify-center pt-8 pb-12">
           <GlassCard className="inline-flex gap-8 px-10 py-4 rounded-full border-white/5 bg-white/5 backdrop-blur-3xl">
              {[
                { label: "Burger", id: "burger", icon: ChefHat },
                { label: "Pizza", id: "place", icon: Pizza },
                { label: "Books", id: "books1", icon: BookOpen },
                { label: "Books", id: "books2", icon: BookOpen },
                { label: "Summary", id: "summary", icon: TrendingUp }
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
        <div className="text-center py-4 border-t border-white/5">
           <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-[0.2em]">© 2024 CampusSpend. All rights reserved.</p>
        </div>

      </div>
    </VendorShell>
  )
}
