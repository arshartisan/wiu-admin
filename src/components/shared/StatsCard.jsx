import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import AnimatedNumber from './AnimatedNumber'

const colorMap = {
  success:     { bg: 'bg-success/10',     icon: 'text-success',     glow: 'hover:shadow-[0_8px_30px_rgba(76,175,136,0.12)]' },
  warning:     { bg: 'bg-warning/10',     icon: 'text-warning',     glow: 'hover:shadow-[0_8px_30px_rgba(232,150,10,0.12)]' },
  destructive: { bg: 'bg-destructive/10', icon: 'text-destructive', glow: 'hover:shadow-[0_8px_30px_rgba(217,79,79,0.12)]' },
  default:     { bg: 'bg-primary/10',     icon: 'text-primary',     glow: 'hover:shadow-[0_8px_30px_rgba(193,114,79,0.15)]' },
}

export default function StatsCard({ label, value, icon: Icon, trend, trendDirection, color }) {
  const c = colorMap[color] || colorMap.default

  return (
    <motion.div
      className={cn(
        'bg-card rounded-xl border border-border p-5 shadow-card transition-all duration-300',
        'hover:-translate-y-0.5',
        c.glow
      )}
      whileHover={{ scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <div className="flex items-start justify-between mb-4">
        <motion.div
          className={cn('h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0', c.bg)}
          whileHover={{ rotate: [0, -8, 8, 0] }}
          transition={{ duration: 0.5 }}
        >
          {Icon && <Icon className={cn('h-5 w-5', c.icon)} />}
        </motion.div>
        {trend && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className={cn(
              'flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full',
              trendDirection === 'up' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
            )}
          >
            {trendDirection === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {trend}
          </motion.div>
        )}
      </div>
      <p className="text-[26px] font-bold text-text-primary tracking-tight leading-none mb-1">
        <AnimatedNumber value={value} />
      </p>
      <p className="text-[12px] font-medium text-muted-foreground">{label}</p>
    </motion.div>
  )
}
