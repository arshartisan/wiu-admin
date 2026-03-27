import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Edit, Trash2, RefreshCw, Package, AlertTriangle, XCircle, DollarSign } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import StatsCard from '@/components/shared/StatsCard'
import DataTable from '@/components/shared/DataTable'
import FormField from '@/components/shared/FormField'
import DeleteDialog from '@/components/shared/DeleteDialog'
import { inventoryData } from '@/data/mockData'
import { formatDate } from '@/lib/utils'

const columns = [
  { key: 'name', label: 'Accessory Name', sortable: true },
  { key: 'type', label: 'Type' },
  { key: 'sku', label: 'SKU' },
  { key: 'unitCost', label: 'Unit Cost' },
  { key: 'inStock', label: 'In Stock' },
  { key: 'reorderLevel', label: 'Reorder Level' },
  { key: 'lastRestocked', label: 'Last Restocked' },
]

const restockFields = [
  { name: 'quantity_to_add', label: 'Quantity to Add', type: 'number_input', required: true },
  { name: 'unit_cost', label: 'Unit Cost ($)', type: 'number_input' },
  { name: 'restock_date', label: 'Restock Date', type: 'date_picker' },
  { name: 'notes', label: 'Notes', type: 'textarea' },
]

const typeVariants = {
  'Gift Box': 'purple', 'Ribbon': 'pink', 'Wrapping Paper': 'blue',
  'Greeting Card': 'green', 'Tissue Paper': 'yellow', 'Filler': 'orange', 'Sticker': 'gray', 'Other': 'gray'
}

export default function Inventory() {
  const navigate = useNavigate()
  const [data, setData] = useState(inventoryData)
  const [restockOpen, setRestockOpen] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [formData, setFormData] = useState({})

  const lowStock = data.filter(i => i.inStock > 0 && i.inStock <= i.reorderLevel).length
  const outOfStock = data.filter(i => i.inStock === 0).length
  const totalValue = data.reduce((sum, i) => sum + i.inStock * i.unitCost, 0)

  const handleFormChange = (name, value) => setFormData(f => ({ ...f, [name]: value }))

  const handleRestock = () => {
    if (editTarget && formData.quantity_to_add) {
      setData(d => d.map(i => i.id === editTarget.id ? { ...i, inStock: i.inStock + Number(formData.quantity_to_add) } : i))
    }
    toast.success(`Restocked "${editTarget?.name}" successfully!`)
    setRestockOpen(false)
    setFormData({})
  }

  const handleDelete = () => {
    setData(d => d.filter(i => i.id !== deleteTarget?.id))
    toast.success(`"${deleteTarget?.name}" deleted`)
    setDeleteOpen(false)
  }

  const renderCell = (key, row) => {
    if (key === 'type') return <Badge variant={typeVariants[row.type] || 'gray'} className="text-xs">{row.type}</Badge>
    if (key === 'unitCost') return `$${row.unitCost.toFixed(2)}`
    if (key === 'inStock') {
      const out = row.inStock === 0
      const low = row.inStock > 0 && row.inStock <= row.reorderLevel
      return (
        <span className={out ? 'text-destructive font-semibold' : low ? 'text-warning font-semibold' : 'text-text-primary font-medium'}>
          {row.inStock}
        </span>
      )
    }
    if (key === 'lastRestocked') return <span className="text-muted-foreground">{formatDate(row.lastRestocked)}</span>
    if (key === 'name') return <span className="font-medium text-text-primary">{row.name}</span>
    return row[key]
  }

  const renderActions = (row) => (
    <div className="flex items-center justify-end gap-1">
      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1"
        onClick={() => navigate(`/inventory/${row.id}/edit`)}>
        <Edit className="h-3.5 w-3.5" /> Edit
      </Button>
      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1 text-success hover:text-success"
        onClick={() => { setEditTarget(row); setFormData({}); setRestockOpen(true) }}>
        <RefreshCw className="h-3.5 w-3.5" /> Restock
      </Button>
      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-destructive hover:text-destructive"
        onClick={() => { setDeleteTarget(row); setDeleteOpen(true) }}>
        <Trash2 className="h-3.5 w-3.5" />
      </Button>
    </div>
  )

  const toolbar = (
    <Button size="sm" className="gap-2" onClick={() => navigate('/inventory/create')}>
      <Plus className="h-4 w-4" /> Add Accessory
    </Button>
  )

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard label="Total SKUs" value={data.length.toString()} icon={Package} />
        <StatsCard label="Low Stock Alerts" value={lowStock.toString()} icon={AlertTriangle} color="warning" />
        <StatsCard label="Out of Stock" value={outOfStock.toString()} icon={XCircle} color="destructive" />
        <StatsCard label="Total Inventory Value" value={`$${totalValue.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`} icon={DollarSign} />
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={data}
        searchPlaceholder="Search accessories..."
        renderCell={renderCell}
        renderActions={renderActions}
        toolbar={toolbar}
        emptyMessage="No accessories in inventory."
      />

      {/* Restock Dialog (kept as dialog — quick action) */}
      <Dialog open={restockOpen} onOpenChange={setRestockOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Restock — {editTarget?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {restockFields.map(field => (
              <FormField key={field.name} field={field} value={formData[field.name]} onChange={handleFormChange} />
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRestockOpen(false)}>Cancel</Button>
            <Button onClick={handleRestock} className="gap-2"><RefreshCw className="h-4 w-4" /> Restock</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DeleteDialog open={deleteOpen} onOpenChange={setDeleteOpen} itemName={deleteTarget?.name} onConfirm={handleDelete} />
    </div>
  )
}
