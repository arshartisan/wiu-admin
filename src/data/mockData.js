// Mock data for GiftFlow Admin Dashboard

export const ordersData = [
  { id: 'ORD-001', customer: 'Emma Wilson', items: 'Luxury Gift Box, Ribbon', total: 89.99, payment: 'Paid', status: 'Delivered', date: '2026-03-20', deliveryDate: '2026-03-22' },
  { id: 'ORD-002', customer: 'James Carter', items: 'Premium Hamper', total: 145.00, payment: 'Paid', status: 'Shipped', date: '2026-03-21', deliveryDate: '2026-03-25' },
  { id: 'ORD-003', customer: 'Sofia Martinez', items: 'Birthday Bundle, Card', total: 65.50, payment: 'Pending', status: 'Processing', date: '2026-03-22', deliveryDate: '2026-03-26' },
  { id: 'ORD-004', customer: 'Lucas Brown', items: 'Wedding Gift Set', total: 220.00, payment: 'Paid', status: 'Processing', date: '2026-03-22', deliveryDate: '2026-03-27' },
  { id: 'ORD-005', customer: 'Olivia Johnson', items: 'Floral Arrangement', total: 78.00, payment: 'Failed', status: 'Cancelled', date: '2026-03-23', deliveryDate: '2026-03-28' },
  { id: 'ORD-006', customer: 'Ethan Davis', items: 'Gourmet Basket', total: 110.25, payment: 'Paid', status: 'Pending', date: '2026-03-24', deliveryDate: '2026-03-29' },
  { id: 'ORD-007', customer: 'Ava Thompson', items: 'Spa Gift Set', total: 95.00, payment: 'Paid', status: 'Shipped', date: '2026-03-24', deliveryDate: '2026-03-30' },
  { id: 'ORD-008', customer: 'Noah White', items: 'Wine & Cheese Box', total: 135.75, payment: 'Paid', status: 'Delivered', date: '2026-03-19', deliveryDate: '2026-03-21' },
  { id: 'ORD-009', customer: 'Isabella Harris', items: 'Custom Photo Gift', total: 55.00, payment: 'Pending', status: 'Pending', date: '2026-03-25', deliveryDate: '2026-03-30' },
  { id: 'ORD-010', customer: 'Liam Jackson', items: 'Tech Gift Bundle', total: 299.99, payment: 'Paid', status: 'Processing', date: '2026-03-25', deliveryDate: '2026-03-31' },
  { id: 'ORD-011', customer: 'Mia Robinson', items: 'Baby Shower Gift', total: 88.50, payment: 'Refunded', status: 'Cancelled', date: '2026-03-18', deliveryDate: '2026-03-22' },
  { id: 'ORD-012', customer: 'William Lewis', items: 'Anniversary Set', total: 175.00, payment: 'Paid', status: 'Delivered', date: '2026-03-17', deliveryDate: '2026-03-19' },
]

export const usersData = [
  { id: 'USR-001', name: 'Emma Wilson', email: 'emma@example.com', role: 'Customer', orders: 12, spent: '$1,240', status: 'Active', joined: '2025-01-15', initials: 'EW' },
  { id: 'USR-002', name: 'James Carter', email: 'james@example.com', role: 'Customer', orders: 8, spent: '$890', status: 'Active', joined: '2025-02-20', initials: 'JC' },
  { id: 'USR-003', name: 'Admin User', email: 'admin@giftflow.com', role: 'Admin', orders: 0, spent: '$0', status: 'Active', joined: '2024-12-01', initials: 'AU' },
  { id: 'USR-004', name: 'Sofia Martinez', email: 'sofia@example.com', role: 'Customer', orders: 25, spent: '$3,450', status: 'Active', joined: '2024-11-10', initials: 'SM' },
  { id: 'USR-005', name: 'Lucas Brown', email: 'lucas@example.com', role: 'Customer', orders: 3, spent: '$320', status: 'Suspended', joined: '2025-03-05', initials: 'LB' },
  { id: 'USR-006', name: 'Sarah Manager', email: 'sarah@giftflow.com', role: 'Manager', orders: 0, spent: '$0', status: 'Active', joined: '2025-01-01', initials: 'SM' },
  { id: 'USR-007', name: 'Olivia Johnson', email: 'olivia@example.com', role: 'Customer', orders: 7, spent: '$678', status: 'Active', joined: '2025-02-14', initials: 'OJ' },
  { id: 'USR-008', name: 'Ethan Davis', email: 'ethan@example.com', role: 'Customer', orders: 15, spent: '$1,890', status: 'Active', joined: '2024-10-22', initials: 'ED' },
]

export const giftCategoriesData = [
  { id: 'CAT-001', name: 'Luxury Gifts', slug: 'luxury-gifts', items: 24, status: 'Active', description: 'Premium luxury gift items' },
  { id: 'CAT-002', name: 'Birthday', slug: 'birthday', items: 38, status: 'Active', description: 'Birthday celebration gifts' },
  { id: 'CAT-003', name: 'Wedding', slug: 'wedding', items: 19, status: 'Active', description: 'Wedding gifts and sets' },
  { id: 'CAT-004', name: 'Corporate', slug: 'corporate', items: 15, status: 'Active', description: 'Corporate gift solutions' },
  { id: 'CAT-005', name: 'Baby & Kids', slug: 'baby-kids', items: 27, status: 'Active', description: 'Gifts for babies and children' },
  { id: 'CAT-006', name: 'Seasonal', slug: 'seasonal', items: 12, status: 'Inactive', description: 'Seasonal and holiday gifts' },
  { id: 'CAT-007', name: 'Hampers', slug: 'hampers', items: 20, status: 'Active', description: 'Gift hampers and baskets' },
  { id: 'CAT-008', name: 'Spa & Wellness', slug: 'spa-wellness', items: 16, status: 'Active', description: 'Spa and wellness gift sets' },
]

export const giftItemsData = [
  { id: 'ITEM-001', name: 'Luxury Chocolate Hamper', category: 'Luxury Gifts', price: 89.99, discountPrice: null, stock: 45, status: 'Active', featured: true, sku: 'LCH-001' },
  { id: 'ITEM-002', name: 'Premium Wine Set', category: 'Luxury Gifts', price: 145.00, discountPrice: 129.00, stock: 22, status: 'Active', featured: true, sku: 'PWS-002' },
  { id: 'ITEM-003', name: 'Birthday Surprise Box', category: 'Birthday', price: 65.50, discountPrice: null, stock: 78, status: 'Active', featured: false, sku: 'BSB-003' },
  { id: 'ITEM-004', name: 'Wedding Memory Kit', category: 'Wedding', price: 220.00, discountPrice: null, stock: 8, status: 'Active', featured: true, sku: 'WMK-004' },
  { id: 'ITEM-005', name: 'Spa Relaxation Set', category: 'Spa & Wellness', price: 95.00, discountPrice: 85.00, stock: 35, status: 'Active', featured: false, sku: 'SRS-005' },
  { id: 'ITEM-006', name: 'Corporate Logo Mug', category: 'Corporate', price: 29.99, discountPrice: null, stock: 150, status: 'Active', featured: false, sku: 'CLM-006' },
  { id: 'ITEM-007', name: 'Baby First Year Kit', category: 'Baby & Kids', price: 88.50, discountPrice: null, stock: 4, status: 'Active', featured: false, sku: 'BFY-007' },
  { id: 'ITEM-008', name: 'Gourmet Cheese Board', category: 'Hampers', price: 110.25, discountPrice: 99.00, stock: 0, status: 'Out of Stock', featured: false, sku: 'GCB-008' },
  { id: 'ITEM-009', name: 'Aromatic Candle Set', category: 'Spa & Wellness', price: 55.00, discountPrice: null, stock: 62, status: 'Active', featured: false, sku: 'ACS-009' },
  { id: 'ITEM-010', name: 'Tech Gadget Bundle', category: 'Corporate', price: 299.99, discountPrice: null, stock: 18, status: 'Active', featured: true, sku: 'TGB-010' },
]

export const inventoryData = [
  { id: 'ACC-001', name: 'Premium Gift Box (Large)', type: 'Gift Box', sku: 'GB-L-001', unitCost: 3.50, inStock: 240, reorderLevel: 50, lastRestocked: '2026-03-10', supplier: 'BoxCo Ltd' },
  { id: 'ACC-002', name: 'Premium Gift Box (Medium)', type: 'Gift Box', sku: 'GB-M-002', unitCost: 2.50, inStock: 180, reorderLevel: 50, lastRestocked: '2026-03-10', supplier: 'BoxCo Ltd' },
  { id: 'ACC-003', name: 'Satin Ribbon (Gold)', type: 'Ribbon', sku: 'RB-G-003', unitCost: 0.80, inStock: 8, reorderLevel: 30, lastRestocked: '2026-02-20', supplier: 'Ribbon House' },
  { id: 'ACC-004', name: 'Satin Ribbon (Silver)', type: 'Ribbon', sku: 'RB-S-004', unitCost: 0.80, inStock: 15, reorderLevel: 30, lastRestocked: '2026-02-20', supplier: 'Ribbon House' },
  { id: 'ACC-005', name: 'Premium Wrapping Paper', type: 'Wrapping Paper', sku: 'WP-001', unitCost: 1.20, inStock: 0, reorderLevel: 40, lastRestocked: '2026-01-15', supplier: 'Paper World' },
  { id: 'ACC-006', name: 'Birthday Greeting Cards', type: 'Greeting Card', sku: 'GC-B-006', unitCost: 0.50, inStock: 320, reorderLevel: 100, lastRestocked: '2026-03-01', supplier: 'Card Studio' },
  { id: 'ACC-007', name: 'Wedding Greeting Cards', type: 'Greeting Card', sku: 'GC-W-007', unitCost: 0.75, inStock: 6, reorderLevel: 50, lastRestocked: '2026-02-10', supplier: 'Card Studio' },
  { id: 'ACC-008', name: 'Tissue Paper (White)', type: 'Tissue Paper', sku: 'TP-W-008', unitCost: 0.30, inStock: 580, reorderLevel: 100, lastRestocked: '2026-03-15', supplier: 'Paper World' },
  { id: 'ACC-009', name: 'Shred Filler (Gold)', type: 'Filler', sku: 'FL-G-009', unitCost: 0.60, inStock: 95, reorderLevel: 50, lastRestocked: '2026-03-08', supplier: 'BoxCo Ltd' },
  { id: 'ACC-010', name: 'Thank You Stickers', type: 'Sticker', sku: 'ST-001', unitCost: 0.20, inStock: 0, reorderLevel: 200, lastRestocked: '2026-01-20', supplier: 'Sticker Prints' },
]

export const paymentsData = [
  { id: 'PAY-001', orderId: 'ORD-001', customer: 'Emma Wilson', amount: 89.99, method: 'Credit Card', status: 'Paid', date: '2026-03-20' },
  { id: 'PAY-002', orderId: 'ORD-002', customer: 'James Carter', amount: 145.00, method: 'Debit Card', status: 'Paid', date: '2026-03-21' },
  { id: 'PAY-003', orderId: 'ORD-003', customer: 'Sofia Martinez', amount: 65.50, method: 'Bank Transfer', status: 'Pending', date: '2026-03-22' },
  { id: 'PAY-004', orderId: 'ORD-004', customer: 'Lucas Brown', amount: 220.00, method: 'Credit Card', status: 'Paid', date: '2026-03-22' },
  { id: 'PAY-005', orderId: 'ORD-005', customer: 'Olivia Johnson', amount: 78.00, method: 'Credit Card', status: 'Refunded', date: '2026-03-23' },
  { id: 'PAY-006', orderId: 'ORD-006', customer: 'Ethan Davis', amount: 110.25, method: 'Cash on Delivery', status: 'Pending', date: '2026-03-24' },
  { id: 'PAY-007', orderId: 'ORD-007', customer: 'Ava Thompson', amount: 95.00, method: 'Credit Card', status: 'Paid', date: '2026-03-24' },
  { id: 'PAY-008', orderId: 'ORD-008', customer: 'Noah White', amount: 135.75, method: 'Bank Transfer', status: 'Paid', date: '2026-03-19' },
  { id: 'PAY-009', orderId: 'ORD-009', customer: 'Isabella Harris', amount: 55.00, method: 'Credit Card', status: 'Failed', date: '2026-03-25' },
]

export const transactionsData = [
  { id: 'TXN-001', type: 'Credit', orderId: 'ORD-001', customer: 'Emma Wilson', amount: 89.99, balanceAfter: 48350, method: 'Credit Card', date: '2026-03-20' },
  { id: 'TXN-002', type: 'Credit', orderId: 'ORD-002', customer: 'James Carter', amount: 145.00, balanceAfter: 48495, method: 'Debit Card', date: '2026-03-21' },
  { id: 'TXN-003', type: 'Refund', orderId: 'ORD-005', customer: 'Olivia Johnson', amount: -78.00, balanceAfter: 48417, method: 'Credit Card', date: '2026-03-23' },
  { id: 'TXN-004', type: 'Credit', orderId: 'ORD-004', customer: 'Lucas Brown', amount: 220.00, balanceAfter: 48637, method: 'Credit Card', date: '2026-03-22' },
  { id: 'TXN-005', type: 'Credit', orderId: 'ORD-007', customer: 'Ava Thompson', amount: 95.00, balanceAfter: 48732, method: 'Credit Card', date: '2026-03-24' },
  { id: 'TXN-006', type: 'Debit', orderId: null, customer: 'System', amount: -150.00, balanceAfter: 48582, method: 'Internal Transfer', date: '2026-03-24' },
  { id: 'TXN-007', type: 'Credit', orderId: 'ORD-008', customer: 'Noah White', amount: 135.75, balanceAfter: 48717, method: 'Bank Transfer', date: '2026-03-19' },
]

export const deliveriesData = [
  { id: 'DEL-001', trackingId: 'TRK-2026-001', orderId: 'ORD-001', customer: 'Emma Wilson', address: '123 Main St, New York', agent: 'Mike Driver', scheduledDate: '2026-03-22', status: 'Delivered' },
  { id: 'DEL-002', trackingId: 'TRK-2026-002', orderId: 'ORD-002', customer: 'James Carter', address: '456 Oak Ave, LA', agent: 'Sarah Courier', scheduledDate: '2026-03-25', status: 'In Transit' },
  { id: 'DEL-003', trackingId: 'TRK-2026-003', orderId: 'ORD-003', customer: 'Sofia Martinez', address: '789 Pine Rd, Chicago', agent: 'Unassigned', scheduledDate: '2026-03-26', status: 'Pending' },
  { id: 'DEL-004', trackingId: 'TRK-2026-004', orderId: 'ORD-004', customer: 'Lucas Brown', address: '321 Elm St, Houston', agent: 'Tom Delivery', scheduledDate: '2026-03-27', status: 'Pending' },
  { id: 'DEL-005', trackingId: 'TRK-2026-005', orderId: 'ORD-007', customer: 'Ava Thompson', address: '654 Maple Ave, Phoenix', agent: 'Mike Driver', scheduledDate: '2026-03-30', status: 'In Transit' },
  { id: 'DEL-006', trackingId: 'TRK-2026-006', orderId: 'ORD-009', customer: 'Isabella Harris', address: '987 Cedar Blvd, Dallas', agent: 'Unassigned', scheduledDate: '2026-03-30', status: 'Pending' },
  { id: 'DEL-007', trackingId: 'TRK-2026-007', orderId: 'ORD-011', customer: 'Mia Robinson', address: '159 Birch Lane, Seattle', agent: 'Sarah Courier', scheduledDate: '2026-03-22', status: 'Failed' },
]

export const promotionsData = [
  { id: 'PROMO-001', code: 'GIFT20', type: 'Percentage', discount: '20%', used: 45, limit: 100, minOrder: '$50', validFrom: '2026-03-01', validUntil: '2026-03-31', status: 'Active' },
  { id: 'PROMO-002', code: 'WELCOME15', type: 'Percentage', discount: '15%', used: 230, limit: null, minOrder: '$30', validFrom: '2025-01-01', validUntil: '2026-12-31', status: 'Active' },
  { id: 'PROMO-003', code: 'FREESHIP', type: 'Free Delivery', discount: 'Free', used: 78, limit: 200, minOrder: '$75', validFrom: '2026-03-15', validUntil: '2026-04-15', status: 'Active' },
  { id: 'PROMO-004', code: 'SPRING10', type: 'Fixed Amount', discount: '$10', used: 12, limit: 50, minOrder: '$60', validFrom: '2026-04-01', validUntil: '2026-04-30', status: 'Scheduled' },
  { id: 'PROMO-005', code: 'HOLIDAY25', type: 'Percentage', discount: '25%', used: 156, limit: 200, minOrder: '$100', validFrom: '2025-12-01', validUntil: '2025-12-31', status: 'Expired' },
]

// Chart data
export const ordersChartData = [
  { day: 'Mar 17', orders: 42, revenue: 3820 },
  { day: 'Mar 18', orders: 58, revenue: 5240 },
  { day: 'Mar 19', orders: 35, revenue: 3150 },
  { day: 'Mar 20', orders: 71, revenue: 6390 },
  { day: 'Mar 21', orders: 65, revenue: 5850 },
  { day: 'Mar 22', orders: 88, revenue: 7920 },
  { day: 'Mar 23', orders: 52, revenue: 4680 },
  { day: 'Mar 24', orders: 94, revenue: 8460 },
  { day: 'Mar 25', orders: 76, revenue: 6840 },
  { day: 'Mar 26', orders: 103, revenue: 9270 },
]

export const categoryChartData = [
  { name: 'Luxury Gifts', value: 28, fill: '#C1724F' },
  { name: 'Birthday',     value: 22, fill: '#E8A87C' },
  { name: 'Wedding',      value: 18, fill: '#4CAF88' },
  { name: 'Corporate',    value: 15, fill: '#E8960A' },
  { name: 'Others',       value: 17, fill: '#BDA99A' },
]
