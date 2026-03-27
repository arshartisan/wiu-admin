import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import FormField from '@/components/shared/FormField'
import { giftItemsData } from '@/data/mockData'

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

export default function GiftItemForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)

  const existing = isEdit ? giftItemsData.find(i => i.id === id) : null

  const [formData, setFormData] = useState(() => {
    if (existing) return { name: existing.name, category_id: existing.category, price: existing.price, sku: existing.sku, stock_quantity: existing.stock, is_active: existing.status === 'Active', is_featured: existing.featured }
    return { is_active: true }
  })

  const handleFormChange = (name, value) => setFormData(f => ({ ...f, [name]: value }))

  const handleSubmit = () => {
    toast.success(isEdit ? 'Item updated!' : 'Item added!')
    navigate('/items')
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate('/items')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-heading font-bold text-text-primary">
            {isEdit ? 'Edit Gift Item' : 'Add Gift Item'}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isEdit ? `Editing "${existing?.name}"` : 'Add a new gift item to your catalog.'}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Item Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {itemFields.map(field => (
              <div key={field.name} className={field.type === 'rich_textarea' || field.type === 'tag_input' ? 'sm:col-span-2' : ''}>
                <FormField field={field} value={formData[field.name]} onChange={handleFormChange} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-end gap-3">
        <Button variant="outline" onClick={() => navigate('/items')}>Cancel</Button>
        <Button onClick={handleSubmit}>{isEdit ? 'Save Changes' : 'Add Item'}</Button>
      </div>
    </div>
  )
}
