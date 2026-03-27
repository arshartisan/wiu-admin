import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import FormField from '@/components/shared/FormField'
import { giftCategoriesData } from '@/data/mockData'

const categoryFields = [
  { name: 'name', label: 'Category Name', type: 'input', required: true },
  { name: 'slug', label: 'Slug', type: 'input' },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'cover_image', label: 'Cover Image', type: 'image_upload' },
  { name: 'sort_order', label: 'Sort Order', type: 'number_input' },
  { name: 'is_active', label: 'Active', type: 'switch', default: true },
]

export default function CategoryForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)

  const existing = isEdit ? giftCategoriesData.find(c => c.id === id) : null

  const [formData, setFormData] = useState(() => {
    if (existing) return { name: existing.name, slug: existing.slug, description: existing.description, is_active: existing.status === 'Active' }
    return { is_active: true }
  })

  const handleFormChange = (name, value) => {
    setFormData(f => {
      const next = { ...f, [name]: value }
      if (name === 'name') next.slug = value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      return next
    })
  }

  const handleSubmit = () => {
    toast.success(isEdit ? 'Category updated!' : 'Category added!')
    navigate('/categories')
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate('/categories')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-heading font-bold text-text-primary">
            {isEdit ? 'Edit Category' : 'Add Gift Category'}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isEdit ? `Editing "${existing?.name}"` : 'Create a new gift category for your store.'}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Category Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoryFields.map(field => (
              <FormField key={field.name} field={field} value={formData[field.name]} onChange={handleFormChange} />
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-end gap-3">
        <Button variant="outline" onClick={() => navigate('/categories')}>Cancel</Button>
        <Button onClick={handleSubmit}>{isEdit ? 'Save Changes' : 'Add Category'}</Button>
      </div>
    </div>
  )
}
