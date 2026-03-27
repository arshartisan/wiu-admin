import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Eye, Edit, UserX, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import DataTable from '@/components/shared/DataTable'
import DeleteDialog from '@/components/shared/DeleteDialog'
import { usersData } from '@/data/mockData'
import { formatDate } from '@/lib/utils'

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { key: 'orders', label: 'Orders' },
  { key: 'spent', label: 'Total Spent' },
  { key: 'status', label: 'Status' },
  { key: 'joined', label: 'Joined', sortable: true },
]

const roleVariants = { Customer: 'blue', Admin: 'purple', Manager: 'orange' }

export default function Users() {
  const navigate = useNavigate()
  const [data, setData] = useState(usersData)
  const [roleFilter, setRoleFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const filterData = (tab) => {
    let filtered = data
    if (tab === 'customers') filtered = data.filter(u => u.role === 'Customer')
    if (tab === 'admins') filtered = data.filter(u => u.role === 'Admin' || u.role === 'Manager')
    if (roleFilter !== 'All') filtered = filtered.filter(u => u.role === roleFilter)
    if (statusFilter !== 'All') filtered = filtered.filter(u => u.status === statusFilter)
    return filtered
  }

  const handleDelete = () => {
    setData(d => d.filter(u => u.id !== deleteTarget?.id))
    toast.success(`User "${deleteTarget?.name}" deleted`)
    setDeleteOpen(false)
  }

  const renderCell = (key, row) => {
    if (key === 'name') return (
      <div className="flex items-center gap-2.5">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="text-xs">{row.initials}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium text-text-primary">{row.name}</p>
        </div>
      </div>
    )
    if (key === 'role') return <Badge variant={roleVariants[row.role] || 'gray'}>{row.role}</Badge>
    if (key === 'status') return <Badge variant={row.status === 'Active' ? 'green' : 'red'}>{row.status}</Badge>
    if (key === 'joined') return <span className="text-muted-foreground">{formatDate(row.joined)}</span>
    if (key === 'email') return <span className="text-muted-foreground">{row.email}</span>
    return row[key]
  }

  const renderActions = (row) => (
    <div className="flex items-center justify-end gap-1">
      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1" onClick={() => toast.info(`View ${row.name}`)}>
        <Eye className="h-3.5 w-3.5" /> View
      </Button>
      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1" onClick={() => navigate(`/users/${row.id}/edit`)}>
        <Edit className="h-3.5 w-3.5" />
      </Button>
      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-warning hover:text-warning" onClick={() => toast.warning(`${row.name} suspended`)}>
        <UserX className="h-3.5 w-3.5" />
      </Button>
      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-destructive hover:text-destructive"
        onClick={() => { setDeleteTarget(row); setDeleteOpen(true) }}>
        <Trash2 className="h-3.5 w-3.5" />
      </Button>
    </div>
  )

  const toolbar = (
    <>
      <Select value={roleFilter} onValueChange={setRoleFilter}>
        <SelectTrigger className="w-32 h-9"><SelectValue /></SelectTrigger>
        <SelectContent>
          {['All', 'Customer', 'Admin', 'Manager'].map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
        </SelectContent>
      </Select>
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-32 h-9"><SelectValue /></SelectTrigger>
        <SelectContent>
          {['All', 'Active', 'Suspended'].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
        </SelectContent>
      </Select>
      <Button size="sm" className="gap-2" onClick={() => navigate('/users/create')}>
        <Plus className="h-4 w-4" /> Add User
      </Button>
    </>
  )

  const TableContent = ({ tab }) => (
    <DataTable
      columns={columns}
      data={filterData(tab)}
      searchPlaceholder="Search by name or email..."
      renderCell={renderCell}
      renderActions={renderActions}
      toolbar={toolbar}
      emptyMessage="No users found."
    />
  )

  return (
    <div className="space-y-4">
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Users ({data.length})</TabsTrigger>
          <TabsTrigger value="customers">Customers ({data.filter(u => u.role === 'Customer').length})</TabsTrigger>
          <TabsTrigger value="admins">Admins ({data.filter(u => u.role !== 'Customer').length})</TabsTrigger>
        </TabsList>
        <TabsContent value="all"><TableContent tab="all" /></TabsContent>
        <TabsContent value="customers"><TableContent tab="customers" /></TabsContent>
        <TabsContent value="admins"><TableContent tab="admins" /></TabsContent>
      </Tabs>

      <DeleteDialog open={deleteOpen} onOpenChange={setDeleteOpen} itemName={deleteTarget?.name} onConfirm={handleDelete} />
    </div>
  )
}
