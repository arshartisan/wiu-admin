import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import FormField from '@/components/shared/FormField'
import { promotionsData } from '@/data/mockData'

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

export default function PromotionForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)

  const existing = isEdit ? promotionsData.find(p => p.id === id) : null

  const [formData, setFormData] = useState(() => {
    if (existing) return { code: existing.code, discount_type: existing.type, is_active: existing.status === 'Active' }
    return { is_active: true, discount_type: 'Percentage' }
  })

  const handleFormChange = (name, value) => setFormData(f => ({ ...f, [name]: value }))

  const handleSubmit = () => {
    toast.success(isEdit ? 'Promotion updated!' : 'Promotion created!')
    navigate('/promotions')
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate('/promotions')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-heading font-bold text-text-primary">
            {isEdit ? 'Edit Promotion' : 'Create Promotion'}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isEdit ? `Editing promotion "${existing?.code}"` : 'Set up a new promotional campaign.'}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Promotion Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {promoFields.map(field => (
              <div key={field.name} className={['multi_select', 'radio_group', 'input_with_generate_button'].includes(field.type) ? 'sm:col-span-2' : ''}>
                <FormField field={field} value={formData[field.name]} onChange={handleFormChange} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-end gap-3">
        <Button variant="outline" onClick={() => navigate('/promotions')}>Cancel</Button>
        <Button onClick={handleSubmit}>{isEdit ? 'Save Changes' : 'Create Promotion'}</Button>
      </div>
    </div>
  )
}
