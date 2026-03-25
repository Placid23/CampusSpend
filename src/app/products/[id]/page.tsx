"use client"

import * as React from "react"
import { useState, use } from 'react'
import { DashboardShell } from "@/components/layout/Shell"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ChevronRight, 
  Star, 
  Clock, 
  MapPin, 
  Heart, 
  Plus, 
  Minus, 
  Zap,
  CreditCard,
  Loader2,
  Package,
  ShoppingBag
} from "lucide-react"
import Image from 'next/image'
import Link from 'next/link'
import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { doc } from 'firebase/firestore'
import { useFirestore, useDoc, useUser, useMemoFirebase } from '@/firebase'

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: productId } = use(params)
  const [quantity, setQuantity] = useState(1)
  const db = useFirestore()
  const { profile } = useUser()

  // Fetch Product Details
  const productRef = useMemoFirebase(() => doc(db, "products", productId), [db, productId])
  const { data: product, isLoading: productLoading } = useDoc(productRef)

  const basePrice = product?.price || 0
  const totalPrice = basePrice * quantity

  if (productLoading) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>
      </DashboardShell>
    )
  }

  if (!product) {
    return (
      <DashboardShell>
        <div className="text-center py-20 space-y-4">
          <Package className="w-16 h-16 text-muted-foreground/20 mx-auto" />
          <h2 className="text-2xl font-bold">Product Not Found</h2>
          <Link href="/vendors">
            <Button variant="outline">Back to Marketplace</Button>
          </Link>
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom duration-700">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          <Link href="/dashboard" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/vendors" className="hover:text-primary transition-colors">Vendors</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-primary neon-text-glow truncate max-w-[150px]">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Content (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            <GlassCard className="p-10 border-white/10 relative overflow-hidden bg-white/5 backdrop-blur-3xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h1 className="text-4xl font-headline font-bold tracking-tight">{product.name}</h1>
                    <p className="text-muted-foreground text-sm font-medium uppercase tracking-widest">
                      Category: {product.category}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-primary/20 text-primary border-none px-4 py-1 rounded-xl text-[10px] font-bold flex gap-2 items-center uppercase">
                      <Zap className="w-3 h-3" /> {product.category}
                    </Badge>
                    <Badge className="bg-white/5 text-muted-foreground border-none px-4 py-1 rounded-xl text-[10px] font-bold uppercase">
                      In Stock: {product.stock}
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="text-4xl font-headline font-bold text-primary neon-text-glow">
                      ₦{basePrice.toLocaleString()}
                    </div>
                  </div>

                  <div className="pt-4">
                    <Tabs defaultValue="details" className="w-full">
                      <TabsList className="bg-white/5 border border-white/10 h-12 p-1 rounded-2xl">
                        <TabsTrigger value="details" className="rounded-xl px-8 data-[state=active]:bg-primary data-[state=active]:text-white">Details</TabsTrigger>
                        <TabsTrigger value="reviews" className="rounded-xl px-8">Reviews</TabsTrigger>
                      </TabsList>
                      <TabsContent value="details" className="mt-8 space-y-4">
                        <h3 className="text-lg font-headline font-bold">Product Description</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {product.description || "No detailed description provided for this item."}
                        </p>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>

                <div className="relative aspect-square md:mt-10">
                  <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-30 animate-pulse"></div>
                  <Image 
                    src={product.imageUrl || `https://picsum.photos/seed/${product.id}/600/600`} 
                    alt={product.name} 
                    width={600} 
                    height={600} 
                    className="relative z-10 drop-shadow-[0_20px_50px_rgba(239,26,184,0.4)] transition-transform duration-700 hover:scale-105 rounded-3xl"
                  />
                </div>
              </div>

              {/* Interaction Row */}
              <div className="mt-12 pt-8 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                   <div className="flex items-center gap-3 text-sm font-bold">
                      <CreditCard className="w-5 h-5 text-primary" /> Wallet Info:
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Expense will be auto-logged</p>
                      <p className="text-xs text-muted-foreground pt-2">Current Balance: <span className="text-white font-bold">₦{profile?.walletBalance?.toLocaleString() || '0'}</span></p>
                   </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between h-14 bg-white/5 rounded-2xl border border-white/10 p-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-10 w-10 rounded-xl"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="text-xl font-bold">{quantity}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-10 w-10 rounded-xl"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    <Button className="w-full h-14 rounded-2xl bg-gradient-to-r from-primary to-secondary text-base font-bold shadow-[0_0_30px_rgba(239,26,184,0.3)] hover:opacity-90">
                      Add to Cart - ₦{totalPrice.toLocaleString()}
                    </Button>
                    <div className="flex flex-col gap-1 items-center">
                       <div className="flex items-center gap-2 text-[10px] text-primary font-bold uppercase tracking-widest">
                         <Zap className="w-3 h-3" /> Auto-log active
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            <GlassCard className="p-8 border-primary/20 bg-primary/5 relative">
              <div className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 border border-primary/40">
                 <ShoppingBag className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-headline font-bold mb-4">Ordering Info</h3>
              <div className="space-y-4">
                 <p className="text-sm text-muted-foreground leading-relaxed">
                   This product is provided by a verified campus vendor. Your purchase is protected and will be recorded in your expense history automatically.
                 </p>
                 <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                       <Clock className="w-3 h-3 text-primary" /> Est. Delivery: 15-20 mins
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                       <MapPin className="w-3 h-3 text-primary" /> Pickup Location: Main Campus
                    </div>
                 </div>
              </div>
            </GlassCard>
          </div>

        </div>
      </div>
    </DashboardShell>
  )
}