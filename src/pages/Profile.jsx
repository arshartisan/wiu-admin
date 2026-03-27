import React, { useState } from 'react'
import { Mail, Phone, Shield, Calendar, Save, Camera } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import FormField from '@/components/shared/FormField'
import { useAuth } from '@/context/AuthContext'
import { formatDate } from '@/lib/utils'

const profileFields = [
  { name: 'name', label: 'Full Name', type: 'input', required: true },
  { name: 'email', label: 'Email Address', type: 'email_input', required: true },
  { name: 'phone', label: 'Phone Number', type: 'phone_input' },
]

const passwordFields = [
  { name: 'current_password', label: 'Current Password', type: 'password_input', required: true },
  { name: 'new_password', label: 'New Password', type: 'password_input', required: true },
  { name: 'confirm_password', label: 'Confirm New Password', type: 'password_input', required: true },
]

export default function Profile() {
  const { user } = useAuth()

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  })
  const [passwordData, setPasswordData] = useState({})

  const handleProfileChange = (name, value) => setProfileData(f => ({ ...f, [name]: value }))
  const handlePasswordChange = (name, value) => setPasswordData(f => ({ ...f, [name]: value }))

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="relative group">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="text-2xl font-bold bg-primary text-white">
                  {user?.initials || 'AU'}
                </AvatarFallback>
              </Avatar>
              <button className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="h-5 w-5 text-white" />
              </button>
            </div>
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-xl font-heading font-bold text-text-primary">{user?.name}</h1>
              <Badge variant="purple" className="mt-1">{user?.role}</Badge>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 mt-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" /> {user?.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" /> {user?.phone}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" /> Joined {formatDate(user?.joinedDate)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5" /> {user?.role}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-1">Personal Information</h2>
          <p className="text-sm text-muted-foreground mb-5">Update your personal details.</p>
          <div className="space-y-4 max-w-lg">
            {profileFields.map(field => (
              <FormField key={field.name} field={field} value={profileData[field.name]} onChange={handleProfileChange} />
            ))}
          </div>
          <div className="mt-6 pt-5 border-t border-border">
            <Button className="gap-2" onClick={() => toast.success('Profile updated successfully!')}>
              <Save className="h-4 w-4" /> Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-1">Change Password</h2>
          <p className="text-sm text-muted-foreground mb-5">Ensure your account stays secure.</p>
          <div className="space-y-4 max-w-lg">
            {passwordFields.map(field => (
              <FormField key={field.name} field={field} value={passwordData[field.name]} onChange={handlePasswordChange} />
            ))}
          </div>
          <div className="mt-6 pt-5 border-t border-border">
            <Button className="gap-2" onClick={() => { toast.success('Password changed successfully!'); setPasswordData({}) }}>
              <Save className="h-4 w-4" /> Update Password
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
