import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import Dashboard from '@/pages/Dashboard'
import Orders from '@/pages/Orders'
import Payments from '@/pages/Payments'
import Transactions from '@/pages/Transactions'
import Promotions from '@/pages/Promotions'
import GiftCategories from '@/pages/GiftCategories'
import GiftItems from '@/pages/GiftItems'
import Inventory from '@/pages/Inventory'
import Users from '@/pages/Users'
import Delivery from '@/pages/Delivery'
import Settings from '@/pages/Settings'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="payments" element={<Payments />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="promotions" element={<Promotions />} />
          <Route path="categories" element={<GiftCategories />} />
          <Route path="items" element={<GiftItems />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="users" element={<Users />} />
          <Route path="delivery" element={<Delivery />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
