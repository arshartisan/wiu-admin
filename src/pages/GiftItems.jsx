import React, { useState } from 'react'
import { Plus, Edit, Trash2, Copy, ToggleLeft } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import DataTable from '@/components/shared/DataTable'
import FormField from '@/components/shared/FormField'
import DeleteDialog from '@/components/shared/DeleteDialog'
import { giftItemsData } from '@/data/mockData'

const columns = [
  { key: 'name', label: 'Item Name', sortable: true },
  { key: 'category', label: 'Category' },
  { key: 'price', label: 'Price', sortable: true },
  { key: 'stock', label: 'Stock' },
  { key: 'status', label: 'Status' },
  { key: 'featured', label: 'Featured' },
]

const itemFields = [
  { name: 'name', label: 'Item Name', type: 'input', required: true },
  { name: 'category_id', label: 'Category', type: 'select', required: true, options: ['Luxury Gifts', 'Birthday', 'Wedding', 'Corporate', 'Baby & Kids', 'Seasonal', 'Hampers', 'Spa & Wellness'] },
  { name: 'description', label: 'Description', type: 'rich_textarea' },
  { name: 'price', label: 'Price ($)', type: 'number_input', required: true },
  { name: 'discount_price', label: 'Discount Price ($)', type: 'number_input' },
  { name: 'sku', label: 'SKU', type: 'input' },
  { name: 'stock_quantity', label: 'Stock Quantity', type: 'number_input', required: true },
  { name: 'low_stock_threshold', label: 'Low Stock Alert Threshold', type: 'number_input', default: 10 },
  { name: 'tags', label: 'Tags', type: 'tag_input' },
  { name: 'is_featured', label: 'Featured Item', type: 'switch' },
  { name: 'is_active', label: 'Active', type: 'switch', default: true },
]

export default function GiftItems() {
  const [data, setData] = useState(giftItemsData)
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [open, setOpen] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [formData, setFormData] = useState({})

  const filtered = data.filter(item => {
    if (categoryFilter !== 'All' && item.category !== categoryFilter) return false
    if (statusFilter !== 'All' && item.status !== statusFilter) return false
    return true
  })

  const handleFormChange = (name, value) => setFormData(f => ({ ...f, [name]: value }))

  const handleSave = () => {
    toast.success(editTarget ? 'Item updated!' : 'Item added!')
    setOpen(false)
    setFormData({})
    setEditTarget(null)
  }

  const handleDelete = () => {
    setData(d => d.filter(i => i.id !== deleteTarget?.id))
    toast.success(`"${deleteTarget?.name}" deleted`)
    setDeleteOpen(false)
  }

  const handleEdit = (item) => {
    setEditTarget(item)
    setFormData({ name: item.name, category_id: item.category, price: item.price, sku: item.sku, stock_quantity: item.stock, is_active: item.status === 'Active', is_featured: item.featured })
    setOpen(true)
  }

  const renderCell = (key, row) => {
    if (key === 'price') return (
      <span className="font-medium">
        ${row.price.toFixed(2)}
        {row.discountPrice && <span className="ml-1.5 text-xs text-muted-foreground line-through">${row.discountPrice.toFixed(2)}</span>}
      </span>
    )
    if (key === 'stock') {
      const low = row.stock <= 10
      const out = row.stock === 0
      return (
        <span className={out ? 'text-destructive font-medium' : low ? 'text-warning font-medium' : 'text-text-primary'}>
          {row.stock} {low && !out ? '⚠️' : out ? '❌' : ''}
        </span>
      )
    }
    if (key === 'status') return <Badge variant={row.status === 'Active' ? 'green' : row.status === 'Out of Stock' ? 'red' : 'gray'}>{row.status}</Badge>
    if (key === 'featured') return row.featured ? <Badge variant="purple">Featured</Badge> : <span className="text-muted-foreground text-xs">—</span>
    if (key === 'name') return <span className="font-medium text-text-primary">{row.name}</span>
    return row[key]
  }

  const renderActions = (row) => (
    <div className="flex items-center justify-end gap-1">
      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1" onClick={() => handleEdit(row)}>
        <Edit className="h-3.5 w-3.5" /> Edit
      </Button>
      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1" onClick={() => toast.success(`"${row.name}" duplicated`)}>
        <Copy className="h-3.5 w-3.5" /> Duplicate
      </Button>
      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1 text-destructive hover:text-destructive"
        onClick={() => { setDeleteTarget(row); setDeleteOpen(true) }}>
        <Trash2 className="h-3.5 w-3.5" />
      </Button>
    </div>
  )

  const toolbar = (
    <>
      <Select value={categoryFilter} onValueChange={setCategoryFilter}>
        <SelectTrigger className="w-40 h-9">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {['All', 'Luxury Gifts', 'Birthday', 'Wedding', 'Corporate', 'Baby & Kids', 'Hampers', 'Spa & Wellness'].map(c => (
            <SelectItem key={c} value={c}>{c}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-36 h-9">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {['All', 'Active', 'Out of Stock', 'Inactive'].map(s => (
            <SelectItem key={s} value={s}>{s}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button size="sm" className="gap-2" onClick={() => { setEditTarget(null); setFormData({ is_active: true }); setOpen(true) }}>
        <Plus className="h-4 w-4" /> Add Gift Item
      </Button>
    </>
  )

  return (
    <div className="space-y-4">
      <DataTable
        columns={columns}
        data={filtered}
        searchPlaceholder="Search gift items..."
        renderCell={renderCell}
        renderActions={renderActions}
        toolbar={toolbar}
        emptyMessage="No gift items found."
      />

      {/* Add/Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editTarget ? 'Edit Gift Item' : 'Add Gift Item'}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
            {itemFields.map(field => (
              <div key={field.name} className={field.type === 'rich_textarea' || field.type === 'tag_input' ? 'sm:col-span-2' : ''}>
                <FormField field={field} value={formData[field.name]} onChange={handleFormChange} />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{editTarget ? 'Save Changes' : 'Add Item'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        itemName={deleteTarget?.name}
        onConfirm={handleDelete}
      />
    </div>
  )
}
