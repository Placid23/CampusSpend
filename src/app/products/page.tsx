
"use client"

import { useState } from 'react'
import { DashboardShell } from "@/components/layout/Shell"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Star, 
  Clock, 
  ArrowRight,
  ChevronDown
} from "lucide-react"
import Image from 'next/image'

const categories = ["All", "Food & Drink", "Tech & Gear", "Books & Stationery", "Campus Merch"]

const products = [
  { 
    id: 1, 
    name: "Midnight Brew Coffee", 
    vendor: "Engineering Cafe", 
    price: 4.50, 
    rating: 4.8, 
    category: "Food & Drink",
    image: "https://picsum.photos/seed/coffee-1/400/400",
    tags: ["Student Pick", "Hot"]
  },
  { 
    id: 2, 
    name: "Premium Study Headphones", 
    vendor: "Campus Tech", 
    price: 89.99, 
    rating: 4.9, 
    category: "Tech & Gear",
    image: "https://picsum.photos/seed/tech-1/400/400",
    tags: ["Best Value"]
  },
  { 
    id: 3, 
    name: "Standard Uni Notebook", 
    vendor: "The Book Hub", 
    price: 12.00, 
    rating: 4.5, 
    category: "Books & Stationery",
    image: "https://picsum.photos/seed/book-1/400/400",
    tags: []
  },
  { 
    id: 4, 
    name: "Gourmet Campus Burger", 
    vendor: "The Grill", 
    price: 15.50, 
    rating: 4.7, 
    category: "Food & Drink",
    image: "https://picsum.photos/seed/burger-1/400/400",
    tags: ["Organic"]
  },
  { 
    id: 5, 
    name: "Mechanical Keyboard Pro", 
    vendor: "Campus Tech", 
    price: 129.00, 
    rating: 5.0, 
    category: "Tech & Gear",
    image: "https://picsum.photos/seed/tech-2/400/400",
    tags: ["Staff Choice"]
  },
  { 
    id: 6, 
    name: "Eco-Friendly Laptop Stand", 
    vendor: "Campus Tech", 
    price: 34.00, 
    rating: 4.6, 
    category: "Tech & Gear",
    image: "https://picsum.photos/seed/tech-3/400/400",
    tags: ["New"]
  },
]

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All")

  return (
    <DashboardShell>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-headline font-bold">Campus Marketplace</h1>
            <p className="text-muted-foreground">Premium products from your favorite campus vendors.</p>
          </div>
          <div className="flex gap-4">
             <Button variant="outline" className="rounded-xl border-white/10 flex items-center gap-2">
               <Filter className="w-4 h-4" /> Filters <ChevronDown className="w-4 h-4" />
             </Button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <Button 
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "rounded-full px-6 transition-all duration-300",
                activeCategory === cat ? "bg-primary hover:bg-primary/90" : "border-white/10 hover:bg-white/5"
              )}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <GlassCard key={product.id} className="p-3 group flex flex-col h-full">
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-4">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  data-ai-hint="product image"
                />
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.tags.map(tag => (
                    <Badge key={tag} className="bg-primary/90 text-white border-none text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="absolute bottom-3 right-3">
                  <GlassCard className="p-2 backdrop-blur-3xl bg-black/40 border-white/10">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  </GlassCard>
                </div>
              </div>
              <div className="flex-1 px-2 space-y-1">
                <div className="flex justify-between items-start">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{product.vendor}</p>
                  <p className="text-sm font-bold text-primary">${product.price.toFixed(2)}</p>
                </div>
                <h3 className="font-headline font-bold group-hover:text-primary transition-colors">{product.name}</h3>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground pt-1">
                  <Clock className="w-3 h-3" /> 15-20 mins prep
                </div>
              </div>
              <div className="pt-4 px-2 pb-2">
                <Button className="w-full rounded-xl bg-primary hover:bg-primary/90 group/btn shadow-[0_0_15px_rgba(239,26,184,0.1)]">
                  Add to Cart <ShoppingBag className="ml-2 w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                </Button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </DashboardShell>
  )
}
