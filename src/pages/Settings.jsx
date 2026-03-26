import React, { useState } from 'react'
import { Settings, Bell, CreditCard, Truck, User, Save } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import FormField from '@/components/shared/FormField'

const settingsTabs = [
  {
    id: 'general', label: 'General', icon: Settings,
    fields: [
      { name: 'store_name', label: 'Store Name', type: 'input' },
      { name: 'store_email', label: 'Store Email', type: 'email_input' },
      { name: 'store_phone', label: 'Store Phone', type: 'phone_input' },
      { name: 'store_address', label: 'Store Address', type: 'textarea' },
      { name: 'currency', label: 'Currency', type: 'select', options: ['USD', 'EUR', 'GBP', 'AED', 'LKR'] },
      { name: 'timezone', label: 'Timezone', type: 'select', options: ['UTC', 'UTC-5 (EST)', 'UTC-8 (PST)', 'UTC+1 (CET)', 'UTC+5:30 (IST)', 'UTC+4 (GST)'] },
      { name: 'store_logo', label: 'Store Logo', type: 'image_upload' },
    ]
  },
  {
    id: 'notifications', label: 'Notifications', icon: Bell,
    fields: [
      { name: 'email_new_order', label: 'Email on New Order', type: 'switch' },
      { name: 'email_order_status', label: 'Email on Order Status Change', type: 'switch' },
      { name: 'email_low_stock', label: 'Email on Low Stock Alert', type: 'switch' },
      { name: 'sms_notifications', label: 'SMS Notifications', type: 'switch' },
      { name: 'notification_email', label: 'Notification Recipient Email', type: 'email_input' },
    ]
  },
  {
    id: 'payment', label: 'Payment Methods', icon: CreditCard,
    fields: [
      { name: 'stripe_enabled', label: 'Enable Stripe', type: 'switch' },
      { name: 'stripe_public_key', label: 'Stripe Public Key', type: 'input' },
      { name: 'stripe_secret_key', label: 'Stripe Secret Key', type: 'password_input' },
      { name: 'paypal_enabled', label: 'Enable PayPal', type: 'switch' },
      { name: 'cod_enabled', label: 'Enable Cash on Delivery', type: 'switch' },
    ]
  },
  {
    id: 'delivery', label: 'Delivery Settings', icon: Truck,
    fields: [
      { name: 'free_delivery_threshold', label: 'Free Delivery Above ($)', type: 'number_input' },
      { name: 'default_delivery_fee', label: 'Default Delivery Fee ($)', type: 'number_input' },
      { name: 'delivery_days', label: 'Operating Delivery Days', type: 'checkbox_group', options: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
      { name: 'cutoff_time', label: 'Order Cutoff Time', type: 'time_picker' },
    ]
  },
  {
    id: 'account', label: 'Account', icon: User,
    fields: [
      { name: 'admin_name', label: 'Admin Name', type: 'input' },
      { name: 'admin_email', label: 'Email Address', type: 'email_input' },
      { name: 'current_password', label: 'Current Password', type: 'password_input' },
      { name: 'new_password', label: 'New Password', type: 'password_input' },
      { name: 'confirm_password', label: 'Confirm New Password', type: 'password_input' },
    ]
  },
]

const defaultValues = {
  store_name: 'GiftFlow Store',
  store_email: 'hello@giftflow.com',
  currency: 'USD',
  timezone: 'UTC',
  email_new_order: true,
  email_order_status: true,
  email_low_stock: true,
  sms_notifications: false,
  stripe_enabled: true,
  paypal_enabled: false,
  cod_enabled: true,
  free_delivery_threshold: 100,
  default_delivery_fee: 9.99,
  delivery_days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  admin_name: 'Admin User',
  admin_email: 'admin@giftflow.com',
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general')
  const [formData, setFormData] = useState(defaultValues)

  const handleFormChange = (name, value) => setFormData(f => ({ ...f, [name]: value }))

  const currentTab = settingsTabs.find(t => t.id === activeTab)

  return (
    <div className="flex gap-6 min-h-[600px]">
      {/* Vertical Tab List */}
      <div className="w-52 flex-shrink-0">
        <nav className="space-y-1">
          {settingsTabs.map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left',
                  activeTab === tab.id
                    ? 'bg-secondary text-primary'
                    : 'text-text-secondary hover:bg-muted hover:text-text-primary'
                )}
              >
                <Icon className={cn('h-4 w-4', activeTab === tab.id ? 'text-primary' : 'text-muted-foreground')} />
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <Card className="flex-1">
        <CardContent className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-text-primary">{currentTab?.label}</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Manage your {currentTab?.label.toLowerCase()} preferences</p>
          </div>

          <div className="space-y-5 max-w-lg">
            {currentTab?.fields.map(field => (
              <FormField key={field.name} field={field} value={formData[field.name]} onChange={handleFormChange} />
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <Button className="gap-2" onClick={() => toast.success('Settings saved successfully!')}>
              <Save className="h-4 w-4" /> Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
