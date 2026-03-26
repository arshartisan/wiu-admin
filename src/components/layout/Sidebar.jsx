import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, ShoppingBag, CreditCard, ArrowLeftRight, Tag,
  Layers, Gift, Package, Users, Truck, Settings, ChevronLeft, ChevronRight,
  LogOut, User, X
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

const navGroups = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard', icon: LayoutDashboard, route: '/dashboard', badge: null },
    ]
  },
  {
    label: 'Commerce',
    items: [
      { label: 'Orders',       icon: ShoppingBag,   route: '/orders',       badge: '12' },
      { label: 'Payments',     icon: CreditCard,     route: '/payments',     badge: null },
      { label: 'Transactions', icon: ArrowLeftRight, route: '/transactions', badge: null },
      { label: 'Promotions',   icon: Tag,            route: '/promotions',   badge: null },
    ]
  },
  {
    label: 'Catalog',
    items: [
      { label: 'Gift Categories', icon: Layers,  route: '/categories', badge: null },
      { label: 'Gift Items',      icon: Gift,    route: '/items',      badge: null },
      { label: 'Accessories',     icon: Package, route: '/inventory',  badge: null },
    ]
  },
  {
    label: 'Operations',
    items: [
      { label: 'Users',    icon: Users, route: '/users',    badge: null },
      { label: 'Delivery', icon: Truck, route: '/delivery', badge: null },
    ]
  },
  {
    label: 'System',
    items: [
      { label: 'Settings', icon: Settings, route: '/settings', badge: null },
    ]
  },
]

function useIsMobile(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  )
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    const handler = (e) => setIsMobile(e.matches)
    mql.addEventListener('change', handler)
    setIsMobile(mql.matches)
    return () => mql.removeEventListener('change', handler)
  }, [breakpoint])
  return isMobile
}

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }) {
  const location = useLocation()
  const isMobile = useIsMobile()
  // On mobile the sidebar is always full-width (never collapsed)
  const isCollapsed = !isMobile && collapsed

  return (
    <TooltipProvider delayDuration={0}>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {mobileOpen && isMobile && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onMobileClose}
          />
        )}
      </AnimatePresence>

      <motion.aside
        className={cn(
          'h-screen bg-card border-r border-border flex flex-col flex-shrink-0',
          isMobile && 'fixed top-0 left-0 z-50 shadow-2xl',
          isMobile && !mobileOpen && 'pointer-events-none'
        )}
        animate={{
          width: isMobile ? 260 : isCollapsed ? 64 : 240,
          x: isMobile ? (mobileOpen ? 0 : -260) : 0,
        }}
        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
      >

        {/* Logo */}
        <div className={cn(
          'flex items-center h-16 border-b border-border flex-shrink-0',
          isCollapsed ? 'justify-center px-0' : 'px-5'
        )}>
          {isCollapsed ? (
            <motion.div
              className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Gift className="h-4 w-4 text-primary" />
            </motion.div>
          ) : (
            <>
              <img
                src="/logo.png"
                alt="WrapItUp"
                className="h-8 w-auto object-contain flex-1"
                style={{ maxWidth: '160px' }}
              />
              {isMobile && (
                <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0" onClick={onMobileClose}>
                  <X className="h-4 w-4 text-muted-foreground" />
                </Button>
              )}
            </>
          )}
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4 px-2.5 space-y-5">
          {navGroups.map((group) => (
            <div key={group.label}>
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.p
                    className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.1em] mb-1.5 px-2"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {group.label}
                  </motion.p>
                )}
              </AnimatePresence>
              {isCollapsed && <div className="mb-2 h-px bg-border mx-1 opacity-60" />}
              <nav className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.route
                  const navItem = (
                    <NavLink
                      to={item.route}
                      className={cn(
                        'relative flex items-center gap-2.5 rounded-lg text-sm font-medium transition-colors duration-150 group',
                        isCollapsed ? 'justify-center py-2.5 px-0' : 'px-3 py-2',
                        isActive
                          ? 'text-white'
                          : 'text-text-secondary hover:bg-secondary hover:text-text-primary'
                      )}
                    >
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 bg-primary rounded-lg shadow-sm"
                          layoutId="activeNav"
                          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        />
                      )}
                      <Icon className={cn(
                        'h-[15px] w-[15px] flex-shrink-0 relative z-10 transition-colors',
                        isActive ? 'text-white' : 'text-muted-foreground group-hover:text-primary'
                      )} />
                      {!isCollapsed && <span className="flex-1 truncate relative z-10">{item.label}</span>}
                      {!isCollapsed && item.badge && (
                        <span className={cn(
                          'h-5 min-w-[20px] px-1.5 rounded-full text-[10px] font-bold flex items-center justify-center relative z-10',
                          isActive ? 'bg-white/25 text-white' : 'bg-primary text-white'
                        )}>
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  )

                  return isCollapsed ? (
                    <Tooltip key={item.route}>
                      <TooltipTrigger asChild>{navItem}</TooltipTrigger>
                      <TooltipContent side="right">
                        <div className="flex items-center gap-2">
                          {item.label}
                          {item.badge && <span className="bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{item.badge}</span>}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <div key={item.route}>{navItem}</div>
                  )
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* User */}
        <div className={cn('p-2.5 border-t border-border', isCollapsed && 'px-2')}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className={cn(
                'w-full flex items-center gap-2.5 p-2 rounded-lg hover:bg-secondary transition-colors',
                isCollapsed && 'justify-center'
              )}>
                <Avatar className="h-7 w-7 flex-shrink-0">
                  <AvatarFallback className="text-[11px] font-bold bg-primary text-white">AU</AvatarFallback>
                </Avatar>
                {!isCollapsed && (
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-[13px] font-semibold text-text-primary truncate leading-tight">Admin User</p>
                    <p className="text-[11px] text-muted-foreground truncate leading-tight">admin@wrapitup.com</p>
                  </div>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align={isCollapsed ? 'center' : 'start'} className="w-52">
              <DropdownMenuItem><User className="h-4 w-4 mr-2" /> Profile</DropdownMenuItem>
              <DropdownMenuItem><Settings className="h-4 w-4 mr-2" /> Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive"><LogOut className="h-4 w-4 mr-2" /> Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Collapse toggle — hidden on mobile */}
        <div className={cn('px-2.5 pb-3 hidden lg:block', isCollapsed && 'px-2')}>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className={cn(
              'w-full gap-2 text-muted-foreground hover:text-primary text-xs',
              isCollapsed ? 'px-0 justify-center' : 'justify-start'
            )}
          >
            <motion.div
              animate={{ rotate: isCollapsed ? 180 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </motion.div>
            {!isCollapsed && <span>Collapse</span>}
          </Button>
        </div>
      </motion.aside>
    </TooltipProvider>
  )
}
