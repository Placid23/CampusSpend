
"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Zap, 
  LayoutDashboard, 
  ShoppingBag, 
  Calendar as CalendarIcon, 
  BrainCircuit, 
  Store, 
  Settings, 
  LogOut, 
  User,
  Bell,
  Search
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarInset, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarProvider, 
  SidebarTrigger 
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Shop", href: "/products", icon: ShoppingBag },
  { name: "Expense Calendar", href: "/calendar", icon: CalendarIcon },
  { name: "AI Insights", href: "/insights", icon: BrainCircuit },
]

const adminItems = [
  { name: "Vendor Dashboard", href: "/vendor", icon: Store },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full nebula-bg">
        <Sidebar className="border-r border-white/5 bg-card/20 backdrop-blur-3xl">
          <SidebarHeader className="p-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(239,26,184,0.5)]">
                <Zap className="text-white w-5 h-5" />
              </div>
              <span className="font-headline font-bold text-xl tracking-tighter">CampusSpend</span>
            </Link>
          </SidebarHeader>
          <SidebarContent className="px-4">
            <SidebarGroup>
              <SidebarGroupLabel className="px-2 py-4 text-[10px] uppercase font-bold tracking-widest opacity-50">Main Menu</SidebarGroupLabel>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={pathname === item.href}
                      className={cn(
                        "h-11 px-4 rounded-xl transition-all duration-300",
                        pathname === item.href ? "bg-primary/20 text-primary" : "hover:bg-white/5"
                      )}
                    >
                      <Link href={item.href} className="flex items-center gap-3">
                        <item.icon className={cn("w-5 h-5", pathname === item.href ? "text-primary" : "text-muted-foreground")} />
                        <span className="font-medium">{item.name}</span>
                        {pathname === item.href && (
                          <div className="ml-auto w-1 h-5 rounded-full bg-primary shadow-[0_0_10px_rgba(239,26,184,1)]"></div>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>

            <SidebarGroup className="mt-4">
              <SidebarGroupLabel className="px-2 py-4 text-[10px] uppercase font-bold tracking-widest opacity-50">Management</SidebarGroupLabel>
              <SidebarMenu>
                {adminItems.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton 
                      asChild 
                      className="h-11 px-4 rounded-xl hover:bg-white/5"
                    >
                      <Link href={item.href} className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 text-muted-foreground" />
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <div className="glass-morphism rounded-2xl p-4 mb-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10 border border-white/10">
                  <AvatarImage src="https://picsum.photos/seed/user123/100/100" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate">John Doe</p>
                  <p className="text-[10px] text-muted-foreground truncate uppercase tracking-wider">Student Premium</p>
                </div>
              </div>
            </div>
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl px-4">
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </Button>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="bg-transparent">
          <header className="flex h-20 items-center gap-4 px-8 border-b border-white/5 sticky top-0 z-40 bg-background/50 backdrop-blur-lg">
            <SidebarTrigger />
            <div className="relative w-full max-w-md ml-4 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search products, records, insights..." 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-all focus:bg-white/10"
              />
            </div>
            <div className="ml-auto flex items-center gap-4">
              <Button size="icon" variant="ghost" className="relative rounded-full hover:bg-white/5">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full ring-2 ring-background"></span>
              </Button>
              <Button className="glow-button rounded-xl bg-primary hover:bg-primary/90 px-6 hidden md:flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                $124.00
              </Button>
            </div>
          </header>
          <main className="p-8 max-w-7xl mx-auto w-full pb-20">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
