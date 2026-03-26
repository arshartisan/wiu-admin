import React, { useState } from 'react'
import { Plus, Edit, Trash2, Copy, PowerOff } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import DataTable from '@/components/shared/DataTable'
import FormField from '@/components/shared/FormField'
import DeleteDialog from '@/components/shared/DeleteDialog'
import { promotionsData } from '@/data/mockData'
import { formatDate } from '@/lib/utils'

const columns = [
  { key: 'code', label: 'Promo Code' },
  { key: 'type', label: 'Type' },
  { key: 'discount', label: 'Discount' },
  { key: 'usage', label: 'Used / Limit' },
  { key: 'minOrder', label: 'Min. Order' },
  { key: 'validFrom', label: 'Valid From' },
  { key: 'validUntil', label: 'Valid Until' },
  { key: 'status', label: 'Status' },
]

const promoFields = [
  { name: 'code', label: 'Promo Code', type: 'input_with_generate_button', required: true },
  { name: 'description', label: 'Description', type: 'input' },
  { name: 'discount_type', label: 'Discount Type', type: 'radio_group', options: ['Percentage', 'Fixed Amount', 'Free Delivery'] },
  { name: 'discount_value', label: 'Discount Value', type: 'number_input', required: true },
  { name: 'min_order_value', label: 'Minimum Order Value ($)', type: 'number_input' },
  { name: 'max_discount_cap', label: 'Maximum Discount Cap ($)', type: 'number_input' },
  { name: 'usage_limit', label: 'Total Usage Limit', type: 'number_input' },
  { name: 'per_user_limit', label: 'Per User Limit', type: 'number_input', default: 1 },
  { name: 'applicable_categories', label: 'Applicable Categories', type: 'multi_select', options: ['Luxury Gifts', 'Birthday', 'Wedding', 'Corporate', 'Baby & Kids', 'Hampers', 'Spa & Wellness'] },
  { name: 'valid_from', label: 'Valid From', type: 'datetime_picker', required: true },
  { name: 'valid_until', label: 'Valid Until', type: 'datetime_picker', required: true },
  { name: 'is_active', label: 'Active', type: 'switch', default: true },
]

const statusVariants = { Active: 'green', Scheduled: 'blue', Expired: 'gray' }
const typeVariants = { Percentage: 'purple', 'Fixed Amount': 'blue', 'Free Delivery': 'green' }

export default function Promotions() {
  const [data, setData] = useState(promotionsData)
  const [open, setOpen] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [formData, setFormData] = useState({})

  const filterByTab = (tab) => {
    if (tab === 'active') return data.filter(p => p.status === 'Active')
    if (tab === 'scheduled') return data.filter(p => p.status === 'Scheduled')
    if (tab === 'expired') return data.filter(p => p.status === 'Expired')
    return data
  }

  const handleFormChange = (name, value) => setFormData(f => ({ ...f, [name]: value }))

  const handleSave = () => {
    toast.success(editTarget ? 'Promotion updated!' : 'Promotion created!')
    setOpen(false)
    setFormData({})
    setEditTarget(null)
  }

  const handleDelete = () => {
    setData(d => d.filter(p => p.id !== deleteTarget?.id))
    toast.success(`Promotion "${deleteTarget?.code}" deleted`)
    setDeleteOpen(false)
  }

  const renderCell = (key, row) => {
    if (key === 'code') return (
      <span className="font-mono-data text-[12px] font-bold text-primary bg-primary/8 border border-primary/20 px-2.5 py-0.5 rounded-lg tracking-wide">
        {row.code}
      </span>
    )
    if (key === 'type') return <Badge variant={typeVariants[row.type] || 'gray'}>{row.type}</Badge>
    if (key === 'status') return <Badge variant={statusVariants[row.status] || 'gray'}>{row.status}</Badge>
    if (key === 'usage') return <span className="font-mono-data text-xs text-muted-foreground">{row.used} / {row.limit || '∞'}</span>
    if (key === 'validFrom' || key === 'validUntil') return <span className="text-muted-foreground text-xs">{formatDate(row[key === 'validFrom' ? 'validFrom' : 'validUntil'])}</span>
    if (key === 'discount') return <span className="font-bold text-text-primary">{row.discount}</span>
    return row[key]
  }

  const renderActions = (row) => (
    <div className="flex items-center justify-end gap-1">
      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1"
        onClick={() => { setEditTarget(row); setFormData({ code: row.code }); setOpen(true) }}>
        <Edit className="h-3.5 w-3.5" /> Edit
      </Button>
      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1"
        onClick={() => toast.success(`"${row.code}" duplicated`)}>
        <Copy className="h-3.5 w-3.5" /> Duplicate
      </Button>
      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1 text-warning hover:text-warning"
        onClick={() => toast.warning(`Promotion "${row.code}" deactivated`)}>
        <PowerOff className="h-3.5 w-3.5" />
      </Button>
      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-destructive hover:text-destructive"
        onClick={() => { setDeleteTarget(row); setDeleteOpen(true) }}>
        <Trash2 className="h-3.5 w-3.5" />
      </Button>
    </div>
  )

  const toolbar = (
    <Button size="sm" className="gap-2" onClick={() => { setEditTarget(null); setFormData({ is_active: true, discount_type: 'Percentage' }); setOpen(true) }}>
      <Plus className="h-4 w-4" /> Create Promotion
    </Button>
  )

  const PromoTable = ({ tab }) => (
    <DataTable
      columns={columns}
      data={filterByTab(tab)}
      searchPlaceholder="Search promotions..."
      renderCell={renderCell}
      renderActions={renderActions}
      toolbar={toolbar}
      emptyMessage="No promotions found."
    />
  )

  return (
    <div className="space-y-4">
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Promotions</TabsTrigger>
          <TabsTrigger value="active">Active ({data.filter(p => p.status === 'Active').length})</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
        <TabsContent value="all"><PromoTable tab="all" /></TabsContent>
        <TabsContent value="active"><PromoTable tab="active" /></TabsContent>
        <TabsContent value="scheduled"><PromoTable tab="scheduled" /></TabsContent>
        <TabsContent value="expired"><PromoTable tab="expired" /></TabsContent>
      </Tabs>

      {/* Create/Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editTarget ? 'Edit Promotion' : 'Create Promotion'}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2 max-h-[60vh] overflow-y-auto pr-1">
            {promoFields.map(field => (
              <div key={field.name} className={['multi_select', 'radio_group', 'input_with_generate_button'].includes(field.type) ? 'sm:col-span-2' : ''}>
                <FormField field={field} value={formData[field.name]} onChange={handleFormChange} />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{editTarget ? 'Save Changes' : 'Create Promotion'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DeleteDialog open={deleteOpen} onOpenChange={setDeleteOpen} itemName={deleteTarget?.code} onConfirm={handleDelete} />
    </div>
  )
}
