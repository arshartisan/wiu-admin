import React, { useState } from 'react'
import { Eye, Download } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import DataTable from '@/components/shared/DataTable'
import { transactionsData } from '@/data/mockData'
import { formatDate } from '@/lib/utils'

const columns = [
  { key: 'id', label: 'Transaction ID' },
  { key: 'type', label: 'Type' },
  { key: 'orderId', label: 'Order Ref' },
  { key: 'customer', label: 'Customer' },
  { key: 'amount', label: 'Amount' },
  { key: 'balanceAfter', label: 'Balance After' },
  { key: 'method', label: 'Method' },
  { key: 'date', label: 'Date', sortable: true },
]

const typeVariants = { Credit: 'green', Debit: 'red', Refund: 'orange' }

export default function Transactions() {
  const [typeFilter, setTypeFilter] = useState('All')

  const filtered = transactionsData.filter(t => typeFilter === 'All' || t.type === typeFilter)

  const renderCell = (key, row) => {
    if (key === 'type') return <Badge variant={typeVariants[row.type] || 'gray'}>{row.type}</Badge>
    if (key === 'amount') {
      const isNeg = row.amount < 0
      return (
        <span className={`font-mono-data text-[13px] font-bold ${isNeg ? 'text-destructive' : 'text-success'}`}>
          {isNeg ? '−' : '+'}${Math.abs(row.amount).toFixed(2)}
        </span>
      )
    }
    if (key === 'balanceAfter') return <span className="font-mono-data text-[12px] text-muted-foreground font-medium">${row.balanceAfter.toLocaleString()}</span>
    if (key === 'id') return <span className="font-mono-data text-[12px] font-semibold text-primary bg-secondary px-2 py-0.5 rounded-md">{row.id}</span>
    if (key === 'orderId') return <span className="font-mono-data text-[12px] text-muted-foreground">{row.orderId || '—'}</span>
    if (key === 'date') return <span className="text-muted-foreground text-xs">{formatDate(row.date)}</span>
    return row[key]
  }

  const renderActions = (row) => (
    <div className="flex items-center justify-end gap-1">
      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1" onClick={() => toast.info('View details')}>
        <Eye className="h-3.5 w-3.5" /> View
      </Button>
      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1" onClick={() => toast.info('Exporting...')}>
        <Download className="h-3.5 w-3.5" /> Export
      </Button>
    </div>
  )

  const toolbar = (
    <>
      <Select value={typeFilter} onValueChange={setTypeFilter}>
        <SelectTrigger className="w-36 h-9"><SelectValue /></SelectTrigger>
        <SelectContent>
          {['All', 'Credit', 'Debit', 'Refund'].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
        </SelectContent>
      </Select>
      <Button variant="outline" size="sm" className="gap-2" onClick={() => toast.info('Export started')}>
        <Download className="h-4 w-4" /> Export CSV
      </Button>
    </>
  )

  return (
    <div className="space-y-4">
      <DataTable
        columns={columns}
        data={filtered}
        searchPlaceholder="Search by Transaction ID..."
        renderCell={renderCell}
        renderActions={renderActions}
        toolbar={toolbar}
        emptyMessage="No transactions found."
      />
    </div>
  )
}
