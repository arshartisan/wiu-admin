import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import FormField from '@/components/shared/FormField'
import { usersData } from '@/data/mockData'

const userFields = [
  { name: 'first_name', label: 'First Name', type: 'input', required: true },
  { name: 'last_name', label: 'Last Name', type: 'input', required: true },
  { name: 'email', label: 'Email Address', type: 'email_input', required: true },
  { name: 'phone', label: 'Phone Number', type: 'phone_input' },
  { name: 'role', label: 'Role', type: 'select', options: ['Customer', 'Admin', 'Manager'], required: true },
  { name: 'address', label: 'Address', type: 'textarea' },
  { name: 'password', label: 'Temporary Password', type: 'password_input' },
  { name: 'send_invite', label: 'Send Welcome Email', type: 'switch', default: true },
  { name: 'is_active', label: 'Active', type: 'switch', default: true },
]

export default function UserForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)

  const existing = isEdit ? usersData.find(u => u.id === id) : null

  const [formData, setFormData] = useState(() => {
    if (existing) {
      const [first_name, ...rest] = (existing.name || '').split(' ')
      return { first_name, last_name: rest.join(' '), email: existing.email, role: existing.role, is_active: existing.status === 'Active' }
    }
    return { send_invite: true, is_active: true }
  })

  const handleFormChange = (name, value) => setFormData(f => ({ ...f, [name]: value }))

  const handleSubmit = () => {
    toast.success(isEdit ? 'User updated!' : 'User added!')
    navigate('/users')
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate('/users')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-heading font-bold text-text-primary">
            {isEdit ? 'Edit User' : 'Add New User'}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isEdit ? `Editing "${existing?.name}"` : 'Create a new user account.'}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {userFields.map(field => (
              <div key={field.name} className={field.type === 'textarea' ? 'sm:col-span-2' : ''}>
                <FormField field={field} value={formData[field.name]} onChange={handleFormChange} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-end gap-3">
        <Button variant="outline" onClick={() => navigate('/users')}>Cancel</Button>
        <Button onClick={handleSubmit}>{isEdit ? 'Save Changes' : 'Add User'}</Button>
      </div>
    </div>
  )
}
