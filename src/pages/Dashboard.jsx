import React from 'react'
import { ShoppingBag, DollarSign, Users, Truck, Eye, ArrowUpRight } from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartTooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts'
import StatsCard from '@/components/shared/StatsCard'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ordersData, ordersChartData, categoryChartData } from '@/data/mockData'
import { formatDate } from '@/lib/utils'

const orderStatusVariants = {
  Pending: 'yellow', Processing: 'blue', Shipped: 'purple', Delivered: 'green', Cancelled: 'red'
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-card border border-border rounded-xl p-3 shadow-card text-sm min-w-[140px]">
      <p className="font-semibold text-text-primary mb-2 font-sans">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground capitalize text-xs">{entry.name}</span>
          <span className="font-bold text-xs" style={{ color: entry.color }}>
            {entry.name === 'revenue' ? `$${entry.value.toLocaleString()}` : entry.value}
          </span>
        </div>
      ))}
    </div>
  )
}

const CustomLegend = ({ payload }) => (
  <div className="flex flex-wrap gap-3 justify-center mt-1">
    {payload?.map((entry, i) => (
      <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.payload.fill }} />
        <span>{entry.value}</span>
      </div>
    ))}
  </div>
)

export default function Dashboard() {
  const recentOrders = ordersData.slice(0, 6)

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard label="Total Orders" value="1,284" icon={ShoppingBag} trend="+12%" trendDirection="up" />
        <StatsCard label="Revenue" value="$48,350" icon={DollarSign} trend="+8.4%" trendDirection="up" />
        <StatsCard label="Active Users" value="3,920" icon={Users} trend="+5.1%" trendDirection="up" />
        <StatsCard label="Pending Deliveries" value="67" icon={Truck} trend="-3 today" trendDirection="down" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        {/* Area Chart */}
        <div className="xl:col-span-8 bg-card rounded-xl border border-border p-5 shadow-card">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-bold text-[16px] text-text-primary tracking-tight">Orders Overview</h2>
              <p className="text-[11px] text-muted-foreground mt-0.5">Daily orders and revenue — last 10 days</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-6 rounded-full bg-primary" />
                <span>Orders</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-6 rounded-full bg-accent" />
                <span>Revenue</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={ordersChartData} margin={{ top: 5, right: 5, left: -28, bottom: 0 }}>
              <defs>
                <linearGradient id="ordersGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C1724F" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#C1724F" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E8C4A8" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#E8C4A8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8DDD5" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#9C8578', fontFamily: 'Bricolage Grotesque' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#9C8578', fontFamily: 'Bricolage Grotesque' }} axisLine={false} tickLine={false} />
              <RechartTooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="orders" stroke="#C1724F" strokeWidth={2.5} fill="url(#ordersGrad)" dot={false} activeDot={{ r: 4, fill: '#C1724F', strokeWidth: 0 }} />
              <Area type="monotone" dataKey="revenue" stroke="#E8C4A8" strokeWidth={2} fill="url(#revenueGrad)" dot={false} activeDot={{ r: 4, fill: '#E8C4A8', strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Donut */}
        <div className="xl:col-span-4 bg-card rounded-xl border border-border p-5 shadow-card">
          <div className="mb-4">
            <h2 className="font-bold text-[16px] text-text-primary tracking-tight">Top Categories</h2>
            <p className="text-[11px] text-muted-foreground mt-0.5">By order volume this month</p>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={categoryChartData}
                cx="50%"
                cy="42%"
                innerRadius={55}
                outerRadius={82}
                paddingAngle={4}
                dataKey="value"
                strokeWidth={0}
              >
                {categoryChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Legend content={<CustomLegend />} />
              <RechartTooltip formatter={(val) => [`${val}%`, '']} contentStyle={{ fontFamily: 'Bricolage Grotesque', fontSize: 12, borderRadius: 10, border: '1px solid #E8DDD5', backgroundColor: '#FFFFFF' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div>
            <h2 className="font-bold text-[16px] text-text-primary tracking-tight">Recent Orders</h2>
            <p className="text-[11px] text-muted-foreground mt-0.5">{recentOrders.length} latest orders</p>
          </div>
          <Button variant="outline" size="sm" className="gap-1.5 text-xs h-8" asChild>
            <a href="/orders">View All <ArrowUpRight className="h-3 w-3" /></a>
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/30">
                <th className="px-6 py-3 text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Order ID</th>
                <th className="px-6 py-3 text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Customer</th>
                <th className="px-6 py-3 text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-widest hidden md:table-cell">Items</th>
                <th className="px-6 py-3 text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Total</th>
                <th className="px-6 py-3 text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Status</th>
                <th className="px-6 py-3 text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-widest hidden lg:table-cell">Date</th>
                <th className="px-6 py-3 text-right text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentOrders.map(order => (
                <tr key={order.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-3.5">
                    <span className="font-mono-data text-[12px] font-semibold text-primary bg-secondary px-2 py-0.5 rounded-md">{order.id}</span>
                  </td>
                  <td className="px-6 py-3.5">
                    <span className="text-[13px] font-medium text-text-primary">{order.customer}</span>
                  </td>
                  <td className="px-6 py-3.5 hidden md:table-cell">
                    <span className="text-[12px] text-muted-foreground max-w-[160px] block truncate">{order.items}</span>
                  </td>
                  <td className="px-6 py-3.5">
                    <span className="text-[13px] font-bold text-text-primary">${order.total.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-3.5">
                    <Badge variant={orderStatusVariants[order.status] || 'gray'} className="text-[11px]">{order.status}</Badge>
                  </td>
                  <td className="px-6 py-3.5 hidden lg:table-cell">
                    <span className="text-[12px] text-muted-foreground">{formatDate(order.date)}</span>
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
