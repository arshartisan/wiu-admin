import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-wide transition-colors',
  {
    variants: {
      variant: {
        default:     'border-transparent bg-primary text-primary-foreground',
        secondary:   'border-transparent bg-secondary text-primary',
        destructive: 'border-transparent bg-destructive/12 text-destructive',
        outline:     'border-border text-foreground',
        success:     'border-transparent bg-success/12 text-success',
        warning:     'border-transparent bg-warning/12 text-warning',
        yellow:      'border-transparent bg-yellow-50  text-yellow-700',
        blue:        'border-transparent bg-blue-50    text-blue-700',
        purple:      'border-transparent bg-violet-50  text-violet-700',
        green:       'border-transparent bg-emerald-50 text-emerald-700',
        red:         'border-transparent bg-red-50     text-red-600',
        orange:      'border-transparent bg-orange-50  text-orange-700',
        gray:        'border-transparent bg-gray-100   text-gray-600',
        pink:        'border-transparent bg-pink-50    text-pink-700',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
