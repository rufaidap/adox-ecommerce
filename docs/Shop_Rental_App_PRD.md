# 🏪 Shop Rental Application – PRD (React Native + TypeScript)

## 🧩 Overview

A **React Native mobile app** designed for **shop owners** to manage their rentable products (like costumes, decor, or props), showcase them to customers, and handle rental operations — including bookings, payments, and product lifecycle tracking.

For the demo version, **data will be static (mocked)** and fetched through **simulated API calls**. The architecture will be scalable for future API integration.

---

## 🎯 Goals

- Enable shop owners to **list and manage rentable products**.  
- Allow customers to **browse, add to cart, and rent products** for specific dates.  
- Manage **inventory status** dynamically based on booking.  
- Generate and **send invoices** for each booking.  
- Track **cash collections** (fully, partial, or unpaid).

---

## 🧠 Core Features

### 1. Authentication (Mocked)
Static login for shop owner (no backend).

**Screen:** LoginScreen  
**Fields:** email, password  
**Mock credentials:** `admin@shop.com / password123`

### 2. Dashboard
Displays overall statistics (mocked data).

### 3. Product Management
- Add/Edit/Delete products.
- Lifecycle transitions: `In Stock → Booked → On Rent → Dry Washing → In Stock/Damaged`.

### 4. Product Showcase (Customer View)
Customers can browse available products, add to cart.

### 5. Cart & Booking Flow
Booking reduces stock for the selected date.  
Lifecycle → Booked.

### 6. Invoice Generation
Generate & email invoice (mock).

### 7. Cash Collection Management
Track: Fully Collected, Partially Collected, Not Paid.

### 8. Booking History
View past bookings, filter by status/date.

---

## 🧱 Architecture

| Layer | Description |
|-------|--------------|
| **UI** | React Native + TypeScript |
| **State Management** | MobX |
| **Mock API** | Local JSON |
| **Styling** | NativeWind / Tailwind RN |
| **Navigation** | React Navigation |

---

## 📦 Mock Data Example

```ts
export const products = [
  {
    id: 'P001',
    name: 'Vintage Sofa Set',
    category: 'Furniture',
    pricePerDay: 1200,
    availableQuantity: 5,
    description: 'Classic vintage sofa for rent.',
    imageUrl: '/images/vintage-sofa.jpg',
    status: 'In Stock',
  },
];
```

---

## 🧾 Data Models

```ts
export type ProductStatus =
  | 'In Stock'
  | 'Booked'
  | 'On Rent'
  | 'Dry Washing'
  | 'Damaged';

export interface Product {
  id: string;
  name: string;
  category: string;
  pricePerDay: number;
  availableQuantity: number;
  description: string;
  imageUrl: string;
  status: ProductStatus;
}

export interface Booking {
  id: string;
  customerName: string;
  products: string[];
  startDate: string;
  endDate: string;
  totalAmount: number;
  paymentStatus: 'Fully Collected' | 'Partially Collected' | 'Not Paid';
  amountPaid: number;
  pendingAmount: number;
  status: ProductStatus;
}
```

---

## 🧭 Navigation Flow

```
Login
 └── Dashboard
      ├── ProductList → Add/Edit Product
      ├── Shop → Cart → Booking Summary → Booking Success
      ├── Invoice
      ├── Payment Status
      └── Booking History
```

---

## 🧰 Tech Stack

| Category | Tool |
|-----------|------|
| UI Framework | React Native (Expo optional) |
| Language | TypeScript |
| State Management | MobX |
| Navigation | React Navigation |
| Styling | NativeWind |
| Mock API | Local JSON |
| PDF Invoice (demo) | react-native-pdf-lib |
| Date Handling | Day.js |

---

## 🚀 Future Enhancements

- Real API integration (Node.js + GraphQL)
- Multi-shop authentication
- Real-time stock sync
- Push notifications
- Customer app
- Online payment integration
