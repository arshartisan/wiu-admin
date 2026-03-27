import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import FormField from '@/components/shared/FormField'

const createOrderFields = [
  { name: 'customer_id', label: 'Customer', type: 'combobox', required: true },
  { name: 'gift_items', label: 'Gift Items', type: 'input', required: true },
  { name: 'gift_accessories', label: 'Gift Accessories', type: 'multi_select', options: ['Gift Box', 'Ribbon', 'Greeting Card', 'Wrapping Paper'] },
  { name: 'delivery_address', label: 'Delivery Address', type: 'textarea' },
  { name: 'delivery_date', label: 'Delivery Date', type: 'date_picker' },
  { name: 'special_message', label: 'Gift Message', type: 'textarea', max_length: 200 },
  { name: 'payment_method', label: 'Payment Method', type: 'select', options: ['Credit Card', 'Debit Card', 'Cash on Delivery', 'Bank Transfer'] },
  { name: 'promo_code', label: 'Promo Code', type: 'input_with_apply_button' },
  { name: 'order_notes', label: 'Internal Notes', type: 'textarea' },
]

export default function OrderForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({})

  const handleFormChange = (name, value) => setFormData(f => ({ ...f, [name]: value }))

  const handleSubmit = () => {
    toast.success('Order created successfully!')
    navigate('/orders')
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate('/orders')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-heading font-bold text-text-primary">Create New Order</h1>
          <p className="text-sm text-muted-foreground">Fill in the details below to create a new gift order.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {createOrderFields.map(field => (
              <div key={field.name} className={field.type === 'textarea' || field.type === 'rich_textarea' ? 'sm:col-span-2' : ''}>
                <FormField field={field} value={formData[field.name]} onChange={handleFormChange} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-end gap-3">
        <Button variant="outline" onClick={() => navigate('/orders')}>Cancel</Button>
        <Button onClick={handleSubmit}>Create Order</Button>
      </div>
    </div>
  )
}
