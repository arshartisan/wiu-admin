import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import AuthGuard from '@/components/layout/AuthGuard'
import AppLayout from '@/components/layout/AppLayout'
import Login from '@/pages/Login'
import Dashboard from '@/pages/Dashboard'
import Orders from '@/pages/Orders'
import OrderForm from '@/pages/OrderForm'
import Payments from '@/pages/Payments'
import Transactions from '@/pages/Transactions'
import Promotions from '@/pages/Promotions'
import PromotionForm from '@/pages/PromotionForm'
import GiftCategories from '@/pages/GiftCategories'
import CategoryForm from '@/pages/CategoryForm'
import GiftItems from '@/pages/GiftItems'
import GiftItemForm from '@/pages/GiftItemForm'
import Inventory from '@/pages/Inventory'
import AccessoryForm from '@/pages/AccessoryForm'
import Users from '@/pages/Users'
import UserForm from '@/pages/UserForm'
import Delivery from '@/pages/Delivery'
import DeliveryZoneForm from '@/pages/DeliveryZoneForm'
import Settings from '@/pages/Settings'
import Profile from '@/pages/Profile'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<AuthGuard><AppLayout /></AuthGuard>}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="orders/create" element={<OrderForm />} />
            <Route path="orders/:id/edit" element={<OrderForm />} />
            <Route path="payments" element={<Payments />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="promotions" element={<Promotions />} />
            <Route path="promotions/create" element={<PromotionForm />} />
            <Route path="promotions/:id/edit" element={<PromotionForm />} />
            <Route path="categories" element={<GiftCategories />} />
            <Route path="categories/create" element={<CategoryForm />} />
            <Route path="categories/:id/edit" element={<CategoryForm />} />
            <Route path="items" element={<GiftItems />} />
            <Route path="items/create" element={<GiftItemForm />} />
            <Route path="items/:id/edit" element={<GiftItemForm />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="inventory/create" element={<AccessoryForm />} />
            <Route path="inventory/:id/edit" element={<AccessoryForm />} />
            <Route path="users" element={<Users />} />
            <Route path="users/create" element={<UserForm />} />
            <Route path="users/:id/edit" element={<UserForm />} />
            <Route path="delivery" element={<Delivery />} />
            <Route path="delivery/zones/create" element={<DeliveryZoneForm />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
