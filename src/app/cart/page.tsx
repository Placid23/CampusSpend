
"use client"

import { useState, useEffect } from 'react'
import { useRouter } from "next/navigation"
import { DashboardShell } from "@/components/layout/Shell"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { 
  Minus, 
  Plus, 
  Trash2, 
  Zap, 
  ArrowLeft, 
  ShoppingCart, 
  ShieldCheck, 
  ChefHat, 
  Pizza, 
  BookOpen, 
  PenTool,
  MapPin,
  Clock,
  Loader2
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { collection, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { useFirestore, useUser, errorEmitter, FirestorePermissionError } from '@/firebase'
import { useToast } from "@/hooks/use-toast"

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([])
  const [isProcessing, setIsAdding] = useState(false)
  const router = useRouter()
  const db = useFirestore()
  const { user, profile } = useUser()
  const { toast } = useToast()

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('campus-spend-cart') || '[]')
    setCart(savedCart)
  }, [])

  const updateQuantity = (id: string, delta: number) => {
    const newCart = cart.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    )
    setCart(newCart)
    localStorage.setItem('campus-spend-cart', JSON.stringify(newCart))
  }

  const removeItem = (id: string) => {
    const newCart = cart.filter(item => item.id !== id)
    setCart(newCart)
    localStorage.setItem('campus-spend-cart', JSON.stringify(newCart))
  }

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = subtotal * 0.025
  const deliveryFee = 10.00
  const walletDiscount = 0
  const total = subtotal + tax + deliveryFee - walletDiscount

  const handleCheckout = async () => {
    if (!user || !profile) return
    if (cart.length === 0) return

    if (profile.walletBalance < total) {
      toast({
        variant: "destructive",
        title: "Insufficient Balance",
        description: "Your digital wallet does not have enough funds for this order."
      })
      return
    }

    setIsAdding(true)

    try {
      const orderId = `ORD-${Date.now()}`
      const studentId = user.uid
      const now = new Date().toISOString()

      // 1. Prepare Order Document
      const orderRef = doc(db, "users", studentId, "orders", orderId)
      const orderData = {
        id: orderId,
        studentId,
        orderDate: now,
        totalAmount: total,
        status: "completed",
        items: cart,
        createdAt: now,
        updatedAt: now
      }

      // 2. Prepare Expense Document (for summary page)
      const expenseId = `EXP-${Date.now()}`
      const expenseRef = doc(db, "users", studentId, "expenses", expenseId)
      const expenseData = {
        id: expenseId,
        studentId,
        orderId,
        amount: total,
        expenseDate: now,
        description: `Order ${orderId} from multiple vendors`,
        categoryId: cart[0]?.category || "general", // Using primary category
        createdAt: now,
        updatedAt: now
      }

      // 3. Prepare Wallet Update
      const profileRef = doc(db, "userProfiles", studentId)
      const newBalance = profile.walletBalance - total

      // Perform updates (Non-blocking pattern)
      setDoc(orderRef, orderData).catch(err => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({ path: orderRef.path, operation: 'create', requestResourceData: orderData }))
      })

      setDoc(expenseRef, expenseData).catch(err => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({ path: expenseRef.path, operation: 'create', requestResourceData: expenseData }))
      })

      updateDoc(profileRef, { 
        walletBalance: newBalance,
        updatedAt: now
      }).catch(err => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({ path: profileRef.path, operation: 'update', requestResourceData: { walletBalance: newBalance } }))
      })

      // Success logic
      toast({
        title: "Order Placed!",
        description: `₦${total.toFixed(2)} has been deducted from your wallet.`,
      })

      localStorage.removeItem('campus-spend-cart')
      router.push("/checkout") // This acts as our success page

    } catch (error: any) {
      console.error("Checkout failed", error)
      toast({
        variant: "destructive",
        title: "Transaction Failed",
        description: error.message || "An unexpected error occurred during payment."
      })
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <DashboardShell>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-700">
        
        {/* Header Section */}
        <div className="space-y-2">
          <h1 className="text-4xl font-headline font-bold">Your <span className="text-primary neon-text-glow">Tray</span></h1>
          <p className="text-muted-foreground text-sm">Review and manage the items in your tray before proceeding to checkout.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Cart Items List (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <GlassCard className="p-8 border-white/10">
              {cart.length === 0 ? (
                <div className="py-20 text-center space-y-6">
                  <div className="w-20 h-20 rounded-full bg-white/5 border border-dashed border-white/10 flex items-center justify-center mx-auto">
                    <ShoppingCart className="w-10 h-10 text-muted-foreground/20" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-headline font-bold text-white">Your tray is empty</h3>
                    <p className="text-muted-foreground">Add some items from our campus vendors to get started.</p>
                  </div>
                  <Link href="/vendors">
                    <Button variant="outline" className="rounded-xl border-white/10">Browse Vendors</Button>
                  </Link>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-8 text-sm font-bold uppercase tracking-widest text-muted-foreground/80">
                    Shopping from <span className="text-foreground">{new Set(cart.map(i => i.vendorOwnerId)).size} Vendors</span>
                  </div>

                  <div className="space-y-8">
                    {cart.map((item) => (
                      <div key={item.id} className="flex flex-col md:flex-row gap-6 items-center p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all">
                        <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                          <Image src={item.imageUrl || `https://picsum.photos/seed/${item.id}/200/200`} alt={item.name} fill className="object-cover" />
                        </div>
                        
                        <div className="flex-1 space-y-3 text-center md:text-left">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-xl font-headline font-bold">{item.name}</h3>
                              <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">{item.category}</p>
                            </div>
                            <div className="text-lg font-bold">₦{item.price.toLocaleString()}</div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            <div className="px-3 py-0.5 rounded-lg bg-primary/10 text-primary text-[8px] font-bold flex items-center gap-1">
                               <Zap className="w-2 h-2" /> Verified Vendor
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-4 bg-white/5 rounded-xl border border-white/10 p-1">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 rounded-lg"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 rounded-lg"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-9 w-9 rounded-xl text-rose-500 hover:bg-rose-500/10"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <Zap className="w-3 h-3" />
                      </div>
                      Expenses will be auto-logged to help you track your spending.
                    </div>
                    <Link href="/vendors" className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary transition-colors">
                      <ShoppingCart className="w-3 h-3" /> Continue Shopping
                    </Link>
                  </div>
                </>
              )}
            </GlassCard>
          </div>

          {/* Cart Summary (4 cols) */}
          {cart.length > 0 && (
            <div className="lg:col-span-4 space-y-6">
              <GlassCard className="p-8 border-white/10 space-y-8">
                <h3 className="text-xl font-headline font-bold">Summary</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-bold">₦{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Estimated Tax (2.5%)</span>
                    <span className="font-bold">₦{tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery Fee</span>
                    <span className="font-bold">₦{deliveryFee.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-headline font-bold">Total</span>
                    <span className="text-2xl font-headline font-bold text-primary neon-text-glow">₦{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Wallet Balance</span>
                    <span className={cn("font-bold", profile?.walletBalance < total ? "text-rose-500" : "text-emerald-500")}>
                      ₦{profile?.walletBalance?.toLocaleString() || '0'}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button 
                    disabled={isProcessing || profile?.walletBalance < total}
                    onClick={handleCheckout}
                    className="w-full h-14 rounded-2xl bg-gradient-to-r from-primary to-secondary text-base font-bold shadow-[0_0_30px_rgba(239,26,184,0.3)] hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50"
                  >
                    {isProcessing ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                    {profile?.walletBalance < total ? "Insufficient Balance" : "Pay from Wallet"}
                  </Button>
                  <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground font-bold uppercase tracking-widest text-center">
                    <ShieldCheck className="w-3 h-3 text-primary" /> Secure payment via CampusSpend Wallet
                  </div>
                </div>
              </GlassCard>
            </div>
          )}
        </div>

        {/* Footer Text */}
        <div className="text-center py-12 border-t border-white/5">
           <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-[0.2em]">© 2024 CampusSpend. All rights reserved.</p>
        </div>

      </div>
    </DashboardShell>
  )
}
