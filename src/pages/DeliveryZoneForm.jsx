import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import FormField from '@/components/shared/FormField'

const zoneFields = [
  { name: 'zone_name', label: 'Zone Name', type: 'input', required: true },
  { name: 'covered_areas', label: 'Covered Areas / Zip Codes', type: 'tag_input' },
  { name: 'delivery_fee', label: 'Delivery Fee ($)', type: 'number_input' },
  { name: 'estimated_days', label: 'Estimated Delivery Days', type: 'number_input' },
  { name: 'is_active', label: 'Active', type: 'switch', default: true },
]

export default function DeliveryZoneForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ is_active: true })

  const handleFormChange = (name, value) => setFormData(f => ({ ...f, [name]: value }))

  const handleSubmit = () => {
    toast.success('Delivery zone added!')
    navigate('/delivery')
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate('/delivery')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-heading font-bold text-text-primary">Add Delivery Zone</h1>
          <p className="text-sm text-muted-foreground">Configure a new delivery zone with coverage areas and fees.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Zone Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {zoneFields.map(field => (
              <FormField key={field.name} field={field} value={formData[field.name]} onChange={handleFormChange} />
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-end gap-3">
        <Button variant="outline" onClick={() => navigate('/delivery')}>Cancel</Button>
        <Button onClick={handleSubmit}>Add Zone</Button>
      </div>
    </div>
  )
}
