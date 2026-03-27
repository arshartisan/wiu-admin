import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Edit, Trash2, Copy } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import DataTable from '@/components/shared/DataTable'
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

export default function GiftItems() {
  const navigate = useNavigate()
  const [data, setData] = useState(giftItemsData)
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const filtered = data.filter(item => {
    if (categoryFilter !== 'All' && item.category !== categoryFilter) return false
    if (statusFilter !== 'All' && item.status !== statusFilter) return false
    return true
  })

  const handleDelete = () => {
    setData(d => d.filter(i => i.id !== deleteTarget?.id))
    toast.success(`"${deleteTarget?.name}" deleted`)
    setDeleteOpen(false)
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
          {row.stock}
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
      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1" onClick={() => navigate(`/items/${row.id}/edit`)}>
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
      <Button size="sm" className="gap-2" onClick={() => navigate('/items/create')}>
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

      <DeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        itemName={deleteTarget?.name}
        onConfirm={handleDelete}
      />
    </div>
  )
}
