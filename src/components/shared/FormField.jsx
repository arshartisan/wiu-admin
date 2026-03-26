import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

export default function FormField({ field, value, onChange }) {
  const { name, label, type, required, options, placeholder, max_length, default: defaultVal } = field

  const renderInput = () => {
    switch (type) {
      case 'textarea':
      case 'rich_textarea':
        return (
          <Textarea
            id={name}
            value={value || ''}
            onChange={e => onChange(name, e.target.value)}
            placeholder={placeholder || `Enter ${label.toLowerCase()}...`}
            maxLength={max_length}
            className="resize-none"
            rows={3}
          />
        )

      case 'select': {
        return (
          <Select value={value || ''} onValueChange={v => onChange(name, v)}>
            <SelectTrigger>
              <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {(options || []).map(opt => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      }

      case 'switch':
        return (
          <Switch
            id={name}
            checked={value !== undefined ? value : (defaultVal !== undefined ? defaultVal : false)}
            onCheckedChange={v => onChange(name, v)}
          />
        )

      case 'radio_group':
        return (
          <RadioGroup value={value || ''} onValueChange={v => onChange(name, v)} className="flex gap-4">
            {(options || []).map(opt => (
              <div key={opt} className="flex items-center gap-2">
                <RadioGroupItem value={opt} id={`${name}-${opt}`} />
                <Label htmlFor={`${name}-${opt}`} className="font-normal cursor-pointer">{opt}</Label>
              </div>
            ))}
          </RadioGroup>
        )

      case 'multi_select':
        return (
          <div className="flex flex-wrap gap-2">
            {(options || []).map(opt => (
              <label key={opt} className="flex items-center gap-1.5 cursor-pointer">
                <Checkbox
                  checked={(value || []).includes(opt)}
                  onCheckedChange={checked => {
                    const curr = value || []
                    onChange(name, checked ? [...curr, opt] : curr.filter(x => x !== opt))
                  }}
                />
                <span className="text-sm">{opt}</span>
              </label>
            ))}
          </div>
        )

      case 'checkbox_group':
        return (
          <div className="flex flex-wrap gap-4">
            {(options || []).map(opt => (
              <label key={opt} className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={(value || []).includes(opt)}
                  onCheckedChange={checked => {
                    const curr = value || []
                    onChange(name, checked ? [...curr, opt] : curr.filter(x => x !== opt))
                  }}
                />
                <span className="text-sm">{opt}</span>
              </label>
            ))}
          </div>
        )

      case 'number_input':
        return (
          <Input
            id={name}
            type="number"
            value={value !== undefined ? value : ''}
            onChange={e => onChange(name, e.target.value)}
            placeholder="0"
          />
        )

      case 'password_input':
        return (
          <Input
            id={name}
            type="password"
            value={value || ''}
            onChange={e => onChange(name, e.target.value)}
            placeholder="••••••••"
          />
        )

      case 'email_input':
        return (
          <Input
            id={name}
            type="email"
            value={value || ''}
            onChange={e => onChange(name, e.target.value)}
            placeholder="email@example.com"
          />
        )

      case 'phone_input':
        return (
          <Input
            id={name}
            type="tel"
            value={value || ''}
            onChange={e => onChange(name, e.target.value)}
            placeholder="+1 (555) 000-0000"
          />
        )

      case 'date_picker':
      case 'datetime_picker':
        return (
          <Input
            id={name}
            type={type === 'datetime_picker' ? 'datetime-local' : 'date'}
            value={value || ''}
            onChange={e => onChange(name, e.target.value)}
          />
        )

      case 'time_picker':
        return (
          <Input
            id={name}
            type="time"
            value={value || ''}
            onChange={e => onChange(name, e.target.value)}
          />
        )

      case 'input_with_apply_button':
        return (
          <div className="flex gap-2">
            <Input
              value={value || ''}
              onChange={e => onChange(name, e.target.value)}
              placeholder="Enter promo code"
            />
            <button className="px-3 py-2 text-sm bg-secondary text-primary rounded-lg border border-border hover:bg-secondary/80 font-medium">
              Apply
            </button>
          </div>
        )

      case 'input_with_generate_button':
        return (
          <div className="flex gap-2">
            <Input
              value={value || ''}
              onChange={e => onChange(name, e.target.value)}
              placeholder="PROMO-CODE"
              className="uppercase"
            />
            <button
              onClick={() => onChange(name, 'GIFT' + Math.random().toString(36).substr(2, 6).toUpperCase())}
              className="px-3 py-2 text-sm bg-secondary text-primary rounded-lg border border-border hover:bg-secondary/80 font-medium whitespace-nowrap"
            >
              Generate
            </button>
          </div>
        )

      case 'tag_input': {
        const tags = value || []
        return (
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1 min-h-[36px] p-2 rounded-lg border border-border bg-card">
              {tags.map((tag, i) => (
                <span key={i} className="flex items-center gap-1 bg-secondary text-primary text-xs px-2 py-1 rounded-md">
                  {tag}
                  <button onClick={() => onChange(name, tags.filter((_, j) => j !== i))} className="hover:text-destructive">×</button>
                </span>
              ))}
              <input
                className="flex-1 min-w-20 outline-none text-sm bg-transparent"
                placeholder="Type and press Enter"
                onKeyDown={e => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    e.preventDefault()
                    onChange(name, [...tags, e.target.value.trim()])
                    e.target.value = ''
                  }
                }}
              />
            </div>
          </div>
        )
      }

      case 'image_upload':
      case 'multi_image_upload':
      case 'icon_picker_or_upload':
        return (
          <div className="flex items-center justify-center h-24 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary hover:bg-muted/30 transition-colors">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Click to upload</p>
              <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
            </div>
          </div>
        )

      default:
        return (
          <Input
            id={name}
            value={value || ''}
            onChange={e => onChange(name, e.target.value)}
            placeholder={placeholder || `Enter ${label.toLowerCase()}...`}
            required={required}
          />
        )
    }
  }

  if (type === 'switch') {
    return (
      <div className="flex items-center justify-between py-1">
        <Label htmlFor={name} className="cursor-pointer">{label}{required && <span className="text-destructive ml-0.5">*</span>}</Label>
        {renderInput()}
      </div>
    )
  }

  return (
    <div className="space-y-1.5">
      <Label htmlFor={name}>
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </Label>
      {renderInput()}
    </div>
  )
}
