import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Eye, UserPlus, Printer, Clock, Truck, CheckCircle, XCircle } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import StatsCard from '@/components/shared/StatsCard'
import DataTable from '@/components/shared/DataTable'
import FormField from '@/components/shared/FormField'
import { deliveriesData } from '@/data/mockData'
import { formatDate } from '@/lib/utils'

const columns = [
  { key: 'trackingId', label: 'Tracking ID' },
  { key: 'orderId', label: 'Order ID' },
  { key: 'customer', label: 'Customer' },
  { key: 'address', label: 'Address' },
  { key: 'agent', label: 'Delivery Agent' },
  { key: 'scheduledDate', label: 'Scheduled Date' },
  { key: 'status', label: 'Status' },
]

const assignFields = [
  { name: 'agent_id', label: 'Delivery Agent', type: 'select', required: true, options: ['Mike Driver', 'Sarah Courier', 'Tom Delivery', 'Emma Express'] },
  { name: 'scheduled_date', label: 'Scheduled Delivery Date', type: 'date_picker', required: true },
  { name: 'delivery_slot', label: 'Time Slot', type: 'select', options: ['9AM–12PM', '12PM–3PM', '3PM–6PM', '6PM–9PM'] },
  { name: 'notes', label: 'Delivery Notes', type: 'textarea' },
]

const statusVariants = {
  Delivered: 'green', 'In Transit': 'blue', Pending: 'yellow', Failed: 'red'
}

export default function Delivery() {
  const navigate = useNavigate()
  const [assignOpen, setAssignOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const [formData, setFormData] = useState({})

  const handleFormChange = (name, value) => setFormData(f => ({ ...f, [name]: value }))

  const filterByStatus = (status) => status === 'all' ? deliveriesData : deliveriesData.filter(d => {
    if (status === 'pending') return d.status === 'Pending'
    if (status === 'transit') return d.status === 'In Transit'
    if (status === 'delivered') return d.status === 'Delivered'
    if (status === 'failed') return d.status === 'Failed'
    return true
  })

  const renderCell = (key, row) => {
    if (key === 'status') return <Badge variant={statusVariants[row.status] || 'gray'}>{row.status}</Badge>
    if (key === 'trackingId') return <span className="font-medium text-primary">{row.trackingId}</span>
    if (key === 'orderId') return <span className="font-medium">{row.orderId}</span>
    if (key === 'scheduledDate') return <span className="text-muted-foreground">{formatDate(row.scheduledDate)}</span>
    if (key === 'agent') return (
      <span className={row.agent === 'Unassigned' ? 'text-muted-foreground italic' : 'text-text-primary'}>{row.agent}</span>
    )
    if (key === 'address') return <span className="text-muted-foreground text-xs max-w-32 block truncate">{row.address}</span>
    return row[key]
  }

  const renderActions = (row) => (
    <div className="flex items-center justify-end gap-1">
      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1" onClick={() => toast.info('View delivery details')}>
        <Eye className="h-3.5 w-3.5" /> View
      </Button>
      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1"
        onClick={() => { setSelectedRow(row); setFormData({}); setAssignOpen(true) }}>
        <UserPlus className="h-3.5 w-3.5" /> Assign
      </Button>
      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={() => toast.info('Print label')}>
        <Printer className="h-3.5 w-3.5" />
      </Button>
    </div>
  )

  const toolbar = (
    <Button size="sm" variant="outline" className="gap-2" onClick={() => navigate('/delivery/zones/create')}>
      <Plus className="h-4 w-4" /> Add Delivery Zone
    </Button>
  )

  const DeliveryTable = ({ tab }) => (
    <DataTable
      columns={columns}
      data={filterByStatus(tab)}
      searchPlaceholder="Search deliveries..."
      renderCell={renderCell}
      renderActions={renderActions}
      toolbar={toolbar}
      emptyMessage="No deliveries found."
    />
  )

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard label="Pending Dispatch" value="24" icon={Clock} color="warning" />
        <StatsCard label="Out for Delivery" value="18" icon={Truck} />
        <StatsCard label="Delivered Today" value="43" icon={CheckCircle} color="success" />
        <StatsCard label="Failed Deliveries" value="3" icon={XCircle} color="destructive" />
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Deliveries</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="transit">In Transit</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
          <TabsTrigger value="failed">Failed</TabsTrigger>
        </TabsList>
        <TabsContent value="all"><DeliveryTable tab="all" /></TabsContent>
        <TabsContent value="pending"><DeliveryTable tab="pending" /></TabsContent>
        <TabsContent value="transit"><DeliveryTable tab="transit" /></TabsContent>
        <TabsContent value="delivered"><DeliveryTable tab="delivered" /></TabsContent>
        <TabsContent value="failed"><DeliveryTable tab="failed" /></TabsContent>
      </Tabs>

      {/* Assign Agent Dialog (kept as dialog — quick action) */}
      <Dialog open={assignOpen} onOpenChange={setAssignOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Assign Delivery Agent — {selectedRow?.trackingId}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {assignFields.map(field => (
              <FormField key={field.name} field={field} value={formData[field.name]} onChange={handleFormChange} />
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAssignOpen(false)}>Cancel</Button>
            <Button onClick={() => { toast.success('Agent assigned!'); setAssignOpen(false) }}>Assign Agent</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
