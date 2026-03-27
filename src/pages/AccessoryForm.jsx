import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import FormField from '@/components/shared/FormField'
import { inventoryData } from '@/data/mockData'

const accessoryFields = [
  { name: 'name', label: 'Accessory Name', type: 'input', required: true },
  { name: 'type', label: 'Type', type: 'select', required: true, options: ['Gift Box', 'Ribbon', 'Wrapping Paper', 'Greeting Card', 'Tissue Paper', 'Filler', 'Sticker', 'Other'] },
  { name: 'sku', label: 'SKU', type: 'input' },
  { name: 'unit_cost', label: 'Unit Cost ($)', type: 'number_input' },
  { name: 'quantity_in_stock', label: 'Current Stock', type: 'number_input', required: true },
  { name: 'reorder_level', label: 'Reorder Alert Level', type: 'number_input' },
  { name: 'supplier_name', label: 'Supplier Name', type: 'input' },
  { name: 'supplier_contact', label: 'Supplier Contact', type: 'input' },
  { name: 'notes', label: 'Notes', type: 'textarea' },
]

export default function AccessoryForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)

  const existing = isEdit ? inventoryData.find(i => i.id === id) : null

  const [formData, setFormData] = useState(() => {
    if (existing) return { name: existing.name, type: existing.type, sku: existing.sku, unit_cost: existing.unitCost, quantity_in_stock: existing.inStock, reorder_level: existing.reorderLevel }
    return {}
  })

  const handleFormChange = (name, value) => setFormData(f => ({ ...f, [name]: value }))

  const handleSubmit = () => {
    toast.success(isEdit ? 'Accessory updated!' : 'Accessory added!')
    navigate('/inventory')
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate('/inventory')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-heading font-bold text-text-primary">
            {isEdit ? 'Edit Accessory' : 'Add Accessory Item'}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isEdit ? `Editing "${existing?.name}"` : 'Add a new accessory to your inventory.'}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Accessory Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {accessoryFields.map(field => (
              <div key={field.name} className={field.type === 'textarea' ? 'sm:col-span-2' : ''}>
                <FormField field={field} value={formData[field.name]} onChange={handleFormChange} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-end gap-3">
        <Button variant="outline" onClick={() => navigate('/inventory')}>Cancel</Button>
        <Button onClick={handleSubmit}>{isEdit ? 'Save Changes' : 'Add Accessory'}</Button>
      </div>
    </div>
  )
}
