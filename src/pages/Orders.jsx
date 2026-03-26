import React, { useState } from 'react'
import { Plus, Eye, Edit, XCircle, Filter, Download } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import DataTable from '@/components/shared/DataTable'
import FormField from '@/components/shared/FormField'
import DeleteDialog from '@/components/shared/DeleteDialog'
import { ordersData } from '@/data/mockData'
import { formatDate } from '@/lib/utils'

const orderStatusVariants = {
  Pending: 'yellow', Processing: 'blue', Shipped: 'purple', Delivered: 'green', Cancelled: 'red'
}
const paymentStatusVariants = {
  Paid: 'green', Pending: 'yellow', Refunded: 'orange', Failed: 'red'
}

const columns = [
  { key: 'id', label: 'Order ID', sortable: true },
  { key: 'customer', label: 'Customer' },
  { key: 'items', label: 'Items' },
  { key: 'total', label: 'Total', sortable: true },
  { key: 'payment', label: 'Payment' },
  { key: 'status', label: 'Status' },
  { key: 'deliveryDate', label: 'Delivery Date' },
]

const createOrderFields = [
  { name: 'customer_id', label: 'Customer', type: 'combobox', required: true },
  { name: 'gift_items', label: 'Gift Items', type: 'input', required: true },
  { name: 'gift_accessories', label: 'Gift Accessories', type: 'multi_select', options: ['Gift Box', 'Ribbon', 'Greeting Card', 'Wrapping Paper'] },
  { name: 'delivery_address', label: 'Delivery Address', type: 'textarea' },
  { name: 'delivery_date', label: 'Delivery Date', type: 'date_picker' },
  { name: 'special_message', label: 'Gift Message', type: 'textarea', max_length: 200 },
  { name: 'payment_method', label: 'Payment Method', type: 'select', options: ['Credit Card', 'Debit Card', 'Cash on Delivery', 'Bank Transfer'] },
  { name: 'promo_code', label: 'Promo Code', type: 'input_with_apply_button' },
  { name: 'order_notes', label: 'Internal Notes', type: 'textarea' },
]

export default function Orders() {
  const [data, setData] = useState(ordersData)
  const [statusFilter, setStatusFilter] = useState('All')
  const [paymentFilter, setPaymentFilter] = useState('All')
  const [createOpen, setCreateOpen] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [formData, setFormData] = useState({})

  const filtered = data.filter(o => {
    if (statusFilter !== 'All' && o.status !== statusFilter) return false
    if (paymentFilter !== 'All' && o.payment !== paymentFilter) return false
    return true
  })

  const handleFormChange = (name, value) => setFormData(f => ({ ...f, [name]: value }))

  const handleCreate = () => {
    toast.success('Order created successfully!')
    setCreateOpen(false)
    setFormData({})
  }

  const handleDelete = () => {
    setData(d => d.filter(o => o.id !== deleteTarget?.id))
    toast.success(`Order ${deleteTarget?.id} cancelled`)
    setDeleteOpen(false)
  }

  const renderCell = (key, row) => {
    if (key === 'total') return <span className="font-bold text-text-primary">${row.total.toFixed(2)}</span>
    if (key === 'status') return <Badge variant={orderStatusVariants[row.status] || 'gray'}>{row.status}</Badge>
    if (key === 'payment') return <Badge variant={paymentStatusVariants[row.payment] || 'gray'}>{row.payment}</Badge>
    if (key === 'id') return <span className="font-mono-data text-[12px] font-semibold text-primary bg-secondary px-2 py-0.5 rounded-md">{row.id}</span>
    if (key === 'items') return <span className="text-muted-foreground text-xs max-w-32 block truncate">{row.items}</span>
    if (key === 'deliveryDate') return <span className="text-muted-foreground text-xs">{formatDate(row.deliveryDate)}</span>
    if (key === 'customer') return <span className="font-medium text-text-primary">{row.customer}</span>
    return row[key]
  }

  const renderActions = (row) => (
    <div className="flex items-center justify-end gap-1">
      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1"
        onClick={() => { setSelectedOrder(row); setDetailOpen(true) }}>
        <Eye className="h-3.5 w-3.5" /> View
      </Button>
      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1">
        <Edit className="h-3.5 w-3.5" /> Edit
      </Button>
      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1 text-destructive hover:text-destructive"
        onClick={() => { setDeleteTarget(row); setDeleteOpen(true) }}>
        <XCircle className="h-3.5 w-3.5" /> Cancel
      </Button>
    </div>
  )

  const toolbar = (
    <>
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-36 h-9">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(s => (
            <SelectItem key={s} value={s}>{s}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={paymentFilter} onValueChange={setPaymentFilter}>
        <SelectTrigger className="w-36 h-9">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {['All', 'Paid', 'Pending', 'Refunded', 'Failed'].map(s => (
            <SelectItem key={s} value={s}>{s}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button variant="outline" size="sm" className="gap-2" onClick={() => toast.info('Export started')}>
        <Download className="h-4 w-4" /> Export
      </Button>
      <Button size="sm" className="gap-2" onClick={() => setCreateOpen(true)}>
        <Plus className="h-4 w-4" /> Create Order
      </Button>
    </>
  )

  return (
    <div className="space-y-4">
      <DataTable
        columns={columns}
        data={filtered}
        searchPlaceholder="Search by Order ID or Customer..."
        onRowClick={(row) => { setSelectedOrder(row); setDetailOpen(true) }}
        renderCell={renderCell}
        renderActions={renderActions}
        toolbar={toolbar}
        emptyMessage="No orders found. Create your first order to get started."
      />

      {/* Create Order Dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Order</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
            {createOrderFields.map(field => (
              <div key={field.name} className={field.type === 'textarea' || field.type === 'rich_textarea' ? 'sm:col-span-2' : ''}>
                <FormField field={field} value={formData[field.name]} onChange={handleFormChange} />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate}>Create Order</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Order Detail Sheet */}
      <Sheet open={detailOpen} onOpenChange={setDetailOpen}>
        <SheetContent className="w-full sm:max-w-xl">
          <SheetHeader>
            <SheetTitle>Order Details — {selectedOrder?.id}</SheetTitle>
          </SheetHeader>
          {selectedOrder && (
            <div className="mt-6 space-y-5">
              <section>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Customer Info</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Name</span><span className="font-medium">{selectedOrder.customer}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Order Date</span><span>{formatDate(selectedOrder.date)}</span></div>
                </div>
              </section>
              <div className="h-px bg-border" />
              <section>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Ordered Items</h3>
                <p className="text-sm text-text-primary">{selectedOrder.items}</p>
              </section>
              <div className="h-px bg-border" />
              <section>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Delivery Info</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Delivery Date</span><span>{formatDate(selectedOrder.deliveryDate)}</span></div>
                </div>
              </section>
              <div className="h-px bg-border" />
              <section>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Payment Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Total Amount</span><span className="font-semibold text-lg">${selectedOrder.total.toFixed(2)}</span></div>
                  <div className="flex justify-between items-center"><span className="text-muted-foreground">Payment Status</span><Badge variant={paymentStatusVariants[selectedOrder.payment] || 'gray'}>{selectedOrder.payment}</Badge></div>
                </div>
              </section>
              <div className="h-px bg-border" />
              <section>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Order Status</h3>
                <div className="flex items-center gap-2">
                  <Badge variant={orderStatusVariants[selectedOrder.status] || 'gray'} className="text-sm px-3 py-1">{selectedOrder.status}</Badge>
                </div>
              </section>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Delete Dialog */}
      <DeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        itemName={deleteTarget?.id}
        onConfirm={handleDelete}
      />
    </div>
  )
}
