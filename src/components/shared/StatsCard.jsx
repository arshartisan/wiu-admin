import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const colorMap = {
  success:     { bg: 'bg-success/10',     icon: 'text-success' },
  warning:     { bg: 'bg-warning/10',     icon: 'text-warning' },
  destructive: { bg: 'bg-destructive/10', icon: 'text-destructive' },
  default:     { bg: 'bg-primary/10',     icon: 'text-primary' },
}

export default function StatsCard({ label, value, icon: Icon, trend, trendDirection, color }) {
  const c = colorMap[color] || colorMap.default

  return (
    <div className="bg-card rounded-xl border border-border p-5 shadow-card hover:shadow-[0_4px_20px_rgba(124,92,191,0.12)] transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={cn('h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0', c.bg)}>
          {Icon && <Icon className={cn('h-5 w-5', c.icon)} />}
        </div>
        {trend && (
          <div className={cn(
            'flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full',
            trendDirection === 'up' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
          )}>
            {trendDirection === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {trend}
          </div>
        )}
      </div>
      <p className="text-[26px] font-bold text-text-primary tracking-tight leading-none mb-1">{value}</p>
      <p className="text-[12px] font-medium text-muted-foreground">{label}</p>
    </div>
  )
}
