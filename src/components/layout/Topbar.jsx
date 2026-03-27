import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Bell, Search, Settings, User, LogOut, ChevronDown, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/context/AuthContext'

const routeMeta = {
  '/dashboard':    { title: 'Dashboard',             subtitle: 'Welcome back, Admin — WrapItUp' },
  '/orders':       { title: 'Orders',                subtitle: 'Manage and track gift orders' },
  '/payments':     { title: 'Payments',              subtitle: 'Review payment history' },
  '/transactions': { title: 'Transactions',          subtitle: 'Full transaction ledger' },
  '/promotions':   { title: 'Promotions & Coupons',  subtitle: 'Manage discount codes' },
  '/categories':   { title: 'Gift Categories',       subtitle: 'Organise your catalog' },
  '/items':        { title: 'Gift Items',             subtitle: 'Browse and manage products' },
  '/inventory':    { title: 'Accessories Inventory', subtitle: 'Track packaging stock' },
  '/users':        { title: 'Users',                 subtitle: 'Customers and staff accounts' },
  '/delivery':     { title: 'Delivery Management',   subtitle: 'Track and dispatch orders' },
  '/settings':     { title: 'Settings',              subtitle: 'Configure your store' },
  '/profile':      { title: 'Profile',               subtitle: 'Manage your account' },
}

const notifications = [
  { id: 1, text: 'New order #ORD-013 received', time: '2 min ago', unread: true },
  { id: 2, text: 'Low stock: Satin Ribbon (Gold)', time: '15 min ago', unread: true },
  { id: 3, text: 'Payment confirmed for ORD-002', time: '1 hr ago', unread: true },
  { id: 4, text: 'Order #ORD-008 delivered', time: '3 hr ago', unread: false },
]

export default function Topbar({ onMobileMenuToggle }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const meta = routeMeta[location.pathname] || routeMeta['/dashboard']
  const unreadCount = notifications.filter(n => n.unread).length

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="h-16 bg-card border-b border-border flex items-center px-4 sm:px-6 gap-3 sm:gap-4 flex-shrink-0">
      {/* Mobile hamburger */}
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 lg:hidden flex-shrink-0"
        onClick={onMobileMenuToggle}
      >
        <Menu className="h-5 w-5 text-muted-foreground" />
      </Button>

      <div className="flex-1 min-w-0">
        <motion.h1
          key={meta.title}
          className="font-bold text-[18px] text-text-primary leading-tight tracking-tight"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {meta.title}
        </motion.h1>
        <motion.p
          key={meta.subtitle}
          className="text-[11px] text-muted-foreground font-sans hidden sm:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {meta.subtitle}
        </motion.p>
      </div>

      <div className="relative hidden md:flex items-center w-64">
        <Search className="absolute left-3 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Search anything..."
          className="pl-9 h-8 text-sm bg-muted/40 border-transparent focus-visible:bg-card focus-visible:border-border transition-all duration-200"
        />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative h-8 w-8">
            <Bell className="h-4 w-4 text-muted-foreground" />
            {unreadCount > 0 && (
              <motion.span
                className="absolute top-1 right-1 h-3.5 w-3.5 bg-primary text-white text-[8px] font-bold rounded-full flex items-center justify-center leading-none"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 15, delay: 0.5 }}
              >
                {unreadCount}
              </motion.span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <div className="flex items-center justify-between px-3 py-2.5 border-b border-border">
            <span className="font-semibold text-sm">Notifications</span>
            <span className="text-[10px] font-medium text-primary bg-secondary px-2 py-0.5 rounded-full">{unreadCount} new</span>
          </div>
          {notifications.map(n => (
            <DropdownMenuItem key={n.id} className="flex flex-col items-start gap-0.5 py-3 px-3 cursor-pointer">
              <div className="flex items-start gap-2 w-full">
                <div className={`h-1.5 w-1.5 rounded-full mt-1.5 flex-shrink-0 ${n.unread ? 'bg-primary' : 'bg-transparent'}`} />
                <div>
                  <p className="text-[13px] font-medium text-text-primary leading-snug">{n.text}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{n.time}</p>
                </div>
              </div>
            </DropdownMenuItem>
          ))}
          <div className="border-t border-border px-3 py-2">
            <button className="text-xs font-medium text-primary hover:underline w-full text-center">View all notifications</button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="h-6 w-px bg-border" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2 h-8 px-2">
            <Avatar className="h-7 w-7">
              <AvatarFallback className="text-[11px] font-bold bg-primary text-white">
                {user?.initials || 'AU'}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block text-left">
              <p className="text-[12px] font-semibold text-text-primary leading-none">{user?.name || 'Admin User'}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{user?.role || 'Administrator'}</p>
            </div>
            <ChevronDown className="h-3 w-3 text-muted-foreground hidden md:block" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => navigate('/profile')}>
            <User className="h-4 w-4 mr-2" /> Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/settings')}>
            <Settings className="h-4 w-4 mr-2" /> Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
