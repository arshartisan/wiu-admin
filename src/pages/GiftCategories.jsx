import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Edit, Trash2, Eye, Layers } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import DeleteDialog from '@/components/shared/DeleteDialog'
import { giftCategoriesData } from '@/data/mockData'

const categoryIcons = ['🎁', '🎂', '💍', '💼', '👶', '🌸', '🧺', '🧖']

export default function GiftCategories() {
  const navigate = useNavigate()
  const [data, setData] = useState(giftCategoriesData)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const handleDelete = () => {
    setData(d => d.filter(c => c.id !== deleteTarget?.id))
    toast.success(`Category "${deleteTarget?.name}" deleted`)
    setDeleteOpen(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button size="sm" className="gap-2" onClick={() => navigate('/categories/create')}>
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
          <Button size="sm" onClick={() => navigate('/categories/create')}>Add Category</Button>
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
                  <Button variant="ghost" size="sm" className="flex-1 gap-1 text-xs h-7" onClick={() => navigate(`/categories/${cat.id}/edit`)}>
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

      <DeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        itemName={deleteTarget?.name}
        onConfirm={handleDelete}
      />
    </div>
  )
}
