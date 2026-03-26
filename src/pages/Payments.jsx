import React, { useState } from 'react'
import { Eye, RotateCcw, Download, DollarSign, Clock, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import StatsCard from '@/components/shared/StatsCard'
import DataTable from '@/components/shared/DataTable'
import FormField from '@/components/shared/FormField'
import { paymentsData } from '@/data/mockData'
import { formatDate } from '@/lib/utils'

const columns = [
  { key: 'id', label: 'Payment ID' },
  { key: 'orderId', label: 'Order ID' },
  { key: 'customer', label: 'Customer' },
  { key: 'amount', label: 'Amount', sortable: true },
  { key: 'method', label: 'Method' },
  { key: 'status', label: 'Status' },
  { key: 'date', label: 'Date', sortable: true },
]

const refundFields = [
  { name: 'refund_amount', label: 'Refund Amount ($)', type: 'number_input', required: true },
  { name: 'reason', label: 'Reason for Refund', type: 'select', options: ['Damaged Item', 'Wrong Item', 'Not Delivered', 'Customer Request', 'Other'] },
  { name: 'notes', label: 'Additional Notes', type: 'textarea' },
]

const statusVariants = { Paid: 'green', Pending: 'yellow', Refunded: 'orange', Failed: 'red' }
const methodVariants = { 'Credit Card': 'purple', 'Debit Card': 'blue', 'Bank Transfer': 'gray', 'Cash on Delivery': 'orange' }

export default function Payments() {
  const [statusFilter, setStatusFilter] = useState('All')
  const [methodFilter, setMethodFilter] = useState('All')
  const [refundOpen, setRefundOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const [formData, setFormData] = useState({})

  const filtered = paymentsData.filter(p => {
    if (statusFilter !== 'All' && p.status !== statusFilter) return false
    if (methodFilter !== 'All' && p.method !== methodFilter) return false
    return true
  })

  const handleFormChange = (name, value) => setFormData(f => ({ ...f, [name]: value }))

  const renderCell = (key, row) => {
    if (key === 'amount') return <span className="font-bold text-text-primary">${row.amount.toFixed(2)}</span>
    if (key === 'status') return <Badge variant={statusVariants[row.status] || 'gray'}>{row.status}</Badge>
    if (key === 'method') return <Badge variant={methodVariants[row.method] || 'gray'}>{row.method}</Badge>
    if (key === 'id') return <span className="font-mono-data text-[12px] font-semibold text-primary bg-secondary px-2 py-0.5 rounded-md">{row.id}</span>
    if (key === 'orderId') return <span className="font-mono-data text-[12px] text-text-secondary">{row.orderId}</span>
    if (key === 'date') return <span className="text-muted-foreground text-xs">{formatDate(row.date)}</span>
    return row[key]
  }

  const renderActions = (row) => (
    <div className="flex items-center justify-end gap-1">
      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1" onClick={() => toast.info('View receipt')}>
        <Eye className="h-3.5 w-3.5" /> Receipt
      </Button>
      {row.status === 'Paid' && (
        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1 text-destructive hover:text-destructive"
          onClick={() => { setSelectedRow(row); setFormData({ refund_amount: row.amount }); setRefundOpen(true) }}>
          <RotateCcw className="h-3.5 w-3.5" /> Refund
        </Button>
      )}
      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1" onClick={() => toast.info('Download invoice')}>
        <Download className="h-3.5 w-3.5" />
      </Button>
    </div>
  )

  const toolbar = (
    <>
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-36 h-9"><SelectValue /></SelectTrigger>
        <SelectContent>
          {['All', 'Paid', 'Pending', 'Refunded', 'Failed'].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
        </SelectContent>
      </Select>
      <Select value={methodFilter} onValueChange={setMethodFilter}>
        <SelectTrigger className="w-40 h-9"><SelectValue /></SelectTrigger>
        <SelectContent>
          {['All', 'Credit Card', 'Debit Card', 'Bank Transfer', 'Cash on Delivery'].map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
        </SelectContent>
      </Select>
      <Button variant="outline" size="sm" className="gap-2" onClick={() => toast.info('Exporting...')}>
        <Download className="h-4 w-4" /> Export
      </Button>
    </>
  )

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard label="Total Revenue" value="$48,350" icon={DollarSign} />
        <StatsCard label="Pending Payments" value="$3,240" icon={Clock} color="warning" />
        <StatsCard label="Refunds Issued" value="$820" icon={RotateCcw} color="destructive" />
        <StatsCard label="Successful Payments" value="1,184" icon={CheckCircle} color="success" />
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        searchPlaceholder="Search by Order ID or Customer..."
        renderCell={renderCell}
        renderActions={renderActions}
        toolbar={toolbar}
        emptyMessage="No payments found."
      />

      {/* Refund Dialog */}
      <Dialog open={refundOpen} onOpenChange={setRefundOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Issue Refund — {selectedRow?.id}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {refundFields.map(field => (
              <FormField key={field.name} field={field} value={formData[field.name]} onChange={handleFormChange} />
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRefundOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => { toast.success('Refund issued!'); setRefundOpen(false) }}>
              <RotateCcw className="h-4 w-4 mr-2" /> Issue Refund
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
