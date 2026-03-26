import React, { useState } from 'react'
import { Plus, Edit, Trash2, Eye, Layers } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import FormField from '@/components/shared/FormField'
import DeleteDialog from '@/components/shared/DeleteDialog'
import { giftCategoriesData } from '@/data/mockData'

const categoryFields = [
  { name: 'name', label: 'Category Name', type: 'input', required: true },
  { name: 'slug', label: 'Slug', type: 'input' },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'cover_image', label: 'Cover Image', type: 'image_upload' },
  { name: 'sort_order', label: 'Sort Order', type: 'number_input' },
  { name: 'is_active', label: 'Active', type: 'switch', default: true },
]

const categoryIcons = ['🎁', '🎂', '💍', '💼', '👶', '🌸', '🧺', '🧖']

export default function GiftCategories() {
  const [data, setData] = useState(giftCategoriesData)
  const [open, setOpen] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [formData, setFormData] = useState({})

  const handleFormChange = (name, value) => {
    setFormData(f => {
      const next = { ...f, [name]: value }
      if (name === 'name') next.slug = value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      return next
    })
  }

  const handleSave = () => {
    toast.success(editTarget ? 'Category updated!' : 'Category added!')
    setOpen(false)
    setFormData({})
    setEditTarget(null)
  }

  const handleEdit = (cat) => {
    setEditTarget(cat)
    setFormData({ name: cat.name, slug: cat.slug, description: cat.description, is_active: cat.status === 'Active' })
    setOpen(true)
  }

  const handleDelete = () => {
    setData(d => d.filter(c => c.id !== deleteTarget?.id))
    toast.success(`Category "${deleteTarget?.name}" deleted`)
    setDeleteOpen(false)
  }

  const toggleStatus = (id) => {
    setData(d => d.map(c => c.id === id ? { ...c, status: c.status === 'Active' ? 'Inactive' : 'Active' } : c))
    toast.success('Status updated')
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button size="sm" className="gap-2" onClick={() => { setEditTarget(null); setFormData({ is_active: true }); setOpen(true) }}>
          <Plus className="h-4 w-4" /> Add Category
        </Button>
      </div>

      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-muted-foreground">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
            <Layers className="h-8 w-8" />
          </div>
          <p className="font-semibold text-lg">No categories yet</p>
          <p className="text-sm">Add your first gift category to get started.</p>
          <Button size="sm" onClick={() => setOpen(true)}>Add Category</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {data.map((cat, i) => (
            <Card key={cat.id} className="hover:shadow-card transition-shadow group">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center text-2xl">
                    {categoryIcons[i % categoryIcons.length]}
                  </div>
                  <Badge variant={cat.status === 'Active' ? 'green' : 'gray'}>{cat.status}</Badge>
                </div>
                <h3 className="font-semibold text-text-primary mb-0.5">{cat.name}</h3>
                <p className="text-xs text-muted-foreground mb-1">/{cat.slug}</p>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{cat.description}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <span>{cat.items} items</span>
                </div>
                <div className="flex gap-2 pt-3 border-t border-border">
                  <Button variant="ghost" size="sm" className="flex-1 gap-1 text-xs h-7" onClick={() => toast.info('View items')}>
                    <Eye className="h-3 w-3" /> View Items
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1 gap-1 text-xs h-7" onClick={() => handleEdit(cat)}>
                    <Edit className="h-3 w-3" /> Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                    onClick={() => { setDeleteTarget(cat); setDeleteOpen(true) }}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editTarget ? 'Edit Category' : 'Add Gift Category'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {categoryFields.map(field => (
              <FormField key={field.name} field={field} value={formData[field.name]} onChange={handleFormChange} />
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{editTarget ? 'Save Changes' : 'Add Category'}</Button>
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
