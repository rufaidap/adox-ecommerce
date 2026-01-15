import {useState, useEffect, useCallback} from 'react';

import {Product, ProductStatus} from '@/models/Product';

/* eslint-disable @typescript-eslint/no-require-imports */
export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    productId: 'SUIT-2P-BLACK-001',
    tag: 'Classic Black Tuxedo',
    category: 'suits',
    color: 'Black',
    price: 15999,
    pricePerDay: 2500,
    status: 'available',
    description: 'Elegant black tuxedo perfect for weddings',
    image: require('@/assets/images/products/ClassicBlackTuxedo.jpg'),
    currency: 'INR',
    attributes: [
      {
        id: 'size',
        name: 'Size',
        type: 'size',
        required: true,
        options: [
          {id: 's', value: 'S', displayName: 'Small', available: true},
          {id: 'm', value: 'M', displayName: 'Medium', available: true},
          {id: 'l', value: 'L', displayName: 'Large', available: true},
          {
            id: 'xl',
            value: 'XL',
            displayName: 'Extra Large',
            available: true,
          },
        ],
      },
      {
        id: 'material',
        name: 'Material',
        type: 'material',
        required: true,
        options: [
          {id: 'wool', value: 'wool', displayName: 'Wool', available: true},
          {
            id: 'polyester',
            value: 'polyester',
            displayName: 'Polyester',
            available: true,
          },
        ],
      },
    ],
    variations: [
      {
        id: 'var-1-s-wool',
        attributes: {size: 's', material: 'wool'},
        price: 15999,
        pricePerDay: 2500,
        available: true,
      },
      {
        id: 'var-1-m-wool',
        attributes: {size: 'm', material: 'wool'},
        price: 15999,
        pricePerDay: 2500,
        available: true,
      },
      {
        id: 'var-1-l-wool',
        attributes: {size: 'l', material: 'wool'},
        price: 15999,
        pricePerDay: 2500,
        available: true,
      },
      {
        id: 'var-1-xl-wool',
        attributes: {size: 'xl', material: 'wool'},
        price: 15999,
        pricePerDay: 2500,
        available: true,
      },
      {
        id: 'var-1-s-polyester',
        attributes: {size: 's', material: 'polyester'},
        price: 12999,
        pricePerDay: 2000,
        available: true,
      },
      {
        id: 'var-1-m-polyester',
        attributes: {size: 'm', material: 'polyester'},
        price: 12999,
        pricePerDay: 2000,
        available: true,
      },
      {
        id: 'var-1-l-polyester',
        attributes: {size: 'l', material: 'polyester'},
        price: 12999,
        pricePerDay: 2000,
        available: true,
      },
      {
        id: 'var-1-xl-polyester',
        attributes: {size: 'xl', material: 'polyester'},
        price: 12999,
        pricePerDay: 2000,
        available: true,
      },
    ],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    productId: 'DRESS-IVORY-001',
    tag: 'Vintage Lace Wedding Dress',
    category: 'dresses',
    color: 'Ivory',
    price: 35999,
    pricePerDay: 4500,
    status: 'on-rent',
    description: 'Beautiful vintage-style lace wedding dress',
    image: require('@/assets/images/products/VintageLaceWeddingDress.webp'),
    attributes: [
      {
        id: 'size',
        name: 'Size',
        type: 'size',
        required: true,
        options: [
          {
            id: 'xs',
            value: 'XS',
            displayName: 'Extra Small',
            available: true,
          },
          {id: 's', value: 'S', displayName: 'Small', available: true},
          {id: 'm', value: 'M', displayName: 'Medium', available: true},
          {id: 'l', value: 'L', displayName: 'Large', available: true},
          {
            id: 'xl',
            value: 'XL',
            displayName: 'Extra Large',
            available: true,
          },
        ],
      },
      {
        id: 'style',
        name: 'Style',
        type: 'style',
        required: true,
        options: [
          {
            id: 'vintage',
            value: 'vintage',
            displayName: 'Vintage',
            available: true,
          },
          {
            id: 'modern',
            value: 'modern',
            displayName: 'Modern',
            available: true,
          },
        ],
      },
    ],
    variations: [
      {
        id: 'var-2-xs-vintage',
        attributes: {size: 'xs', style: 'vintage'},
        price: 35999,
        pricePerDay: 4500,
        available: true,
      },
      {
        id: 'var-2-s-vintage',
        attributes: {size: 's', style: 'vintage'},
        price: 35999,
        pricePerDay: 4500,
        available: true,
      },
      {
        id: 'var-2-m-vintage',
        attributes: {size: 'm', style: 'vintage'},
        price: 35999,
        pricePerDay: 4500,
        available: true,
      },
      {
        id: 'var-2-l-vintage',
        attributes: {size: 'l', style: 'vintage'},
        price: 35999,
        pricePerDay: 4500,
        available: true,
      },
      {
        id: 'var-2-xl-vintage',
        attributes: {size: 'xl', style: 'vintage'},
        price: 35999,
        pricePerDay: 4500,
        available: true,
      },
      {
        id: 'var-2-xs-modern',
        attributes: {size: 'xs', style: 'modern'},
        price: 32999,
        pricePerDay: 4000,
        available: true,
      },
      {
        id: 'var-2-s-modern',
        attributes: {size: 's', style: 'modern'},
        price: 32999,
        pricePerDay: 4000,
        available: true,
      },
      {
        id: 'var-2-m-modern',
        attributes: {size: 'm', style: 'modern'},
        price: 32999,
        pricePerDay: 4000,
        available: true,
      },
      {
        id: 'var-2-l-modern',
        attributes: {size: 'l', style: 'modern'},
        price: 32999,
        pricePerDay: 4000,
        available: true,
      },
      {
        id: 'var-2-xl-modern',
        attributes: {size: 'xl', style: 'modern'},
        price: 32999,
        pricePerDay: 4000,
        available: true,
      },
    ],
    currency: 'INR',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '3',
    productId: 'SUIT-2P-NAVY-001',
    tag: 'Navy Blue Suit',
    category: 'suits',
    color: 'Navy',
    price: 18999,
    pricePerDay: 2800,
    status: 'booked',
    description: 'Modern navy blue suit for groomsmen',
    image: require('@/assets/images/products/NavyBlueSuit.jpg'),
    attributes: [
      {
        id: 'size',
        name: 'Size',
        type: 'size',
        required: true,
        options: [
          {id: 's', value: 'S', displayName: 'Small', available: true},
          {id: 'm', value: 'M', displayName: 'Medium', available: true},
          {id: 'l', value: 'L', displayName: 'Large', available: true},
          {
            id: 'xl',
            value: 'XL',
            displayName: 'Extra Large',
            available: true,
          },
        ],
      },
    ],
    variations: [
      {
        id: 'var-3-s',
        attributes: {size: 's'},
        price: 18999,
        pricePerDay: 2800,
        available: true,
      },
      {
        id: 'var-3-m',
        attributes: {size: 'm'},
        price: 18999,
        pricePerDay: 2800,
        available: true,
      },
      {
        id: 'var-3-l',
        attributes: {size: 'l'},
        price: 18999,
        pricePerDay: 2800,
        available: true,
      },
      {
        id: 'var-3-xl',
        attributes: {size: 'xl'},
        price: 18999,
        pricePerDay: 2800,
        available: true,
      },
    ],
    currency: 'INR',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-18'),
  },
  {
    id: '4',
    productId: 'ACC-GOLD-001',
    tag: 'Gold Cufflinks Set',
    category: 'accessories',
    color: 'Gold',
    price: 2999,
    pricePerDay: 500,
    status: 'available',
    description: 'Elegant gold cufflinks and tie clip set',
    image: require('@/assets/images/products/GoldCufflinksSet.webp'),
    attributes: [],
    variations: [],
    currency: 'INR',
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14'),
  },
  {
    id: '5',
    productId: 'DRESS-BLUSH-001',
    tag: 'Bridesmaid Blush Dress',
    category: 'dresses',
    color: 'Blush',
    price: 12999,
    pricePerDay: 1800,
    status: 'in-dry-wash',
    description: 'Soft blush pink bridesmaid dress',
    image: require('@/assets/images/products/BridesmaidBlushDress.jpg'),
    attributes: [
      {
        id: 'size',
        name: 'Size',
        type: 'size',
        required: true,
        options: [
          {
            id: 'xs',
            value: 'XS',
            displayName: 'Extra Small',
            available: true,
          },
          {id: 's', value: 'S', displayName: 'Small', available: true},
          {id: 'm', value: 'M', displayName: 'Medium', available: true},
          {id: 'l', value: 'L', displayName: 'Large', available: true},
        ],
      },
    ],
    variations: [
      {
        id: 'var-5-xs',
        attributes: {size: 'xs'},
        price: 12999,
        pricePerDay: 1800,
        available: true,
      },
      {
        id: 'var-5-s',
        attributes: {size: 's'},
        price: 12999,
        pricePerDay: 1800,
        available: true,
      },
      {
        id: 'var-5-m',
        attributes: {size: 'm'},
        price: 12999,
        pricePerDay: 1800,
        available: true,
      },
      {
        id: 'var-5-l',
        attributes: {size: 'l'},
        price: 12999,
        pricePerDay: 1800,
        available: true,
      },
    ],
    currency: 'INR',
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-22'),
  },
  {
    id: '6',
    productId: 'SHOE-BLACK-001',
    tag: 'Oxford Dress Shoes',
    category: 'shoes',
    color: 'Black',
    price: 4999,
    pricePerDay: 800,
    status: 'ready-for-pickup',
    description: 'Classic black oxford dress shoes',
    image: require('@/assets/images/products/OxfordDressShoes.jpg'),
    attributes: [
      {
        id: 'size',
        name: 'Size',
        type: 'size',
        required: true,
        options: [
          {id: '7', value: '7', displayName: 'Size 7', available: true},
          {id: '8', value: '8', displayName: 'Size 8', available: true},
          {id: '9', value: '9', displayName: 'Size 9', available: true},
          {id: '10', value: '10', displayName: 'Size 10', available: true},
          {id: '11', value: '11', displayName: 'Size 11', available: true},
        ],
      },
    ],
    variations: [
      {
        id: 'var-6-7',
        attributes: {size: '7'},
        price: 4999,
        pricePerDay: 800,
        available: true,
      },
      {
        id: 'var-6-8',
        attributes: {size: '8'},
        price: 4999,
        pricePerDay: 800,
        available: true,
      },
      {
        id: 'var-6-9',
        attributes: {size: '9'},
        price: 4999,
        pricePerDay: 800,
        available: true,
      },
      {
        id: 'var-6-10',
        attributes: {size: '10'},
        price: 4999,
        pricePerDay: 800,
        available: true,
      },
      {
        id: 'var-6-11',
        attributes: {size: '11'},
        price: 4999,
        pricePerDay: 800,
        available: true,
      },
    ],
    currency: 'INR',
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-23'),
  },
  // Additional Products
  {
    id: '7',
    productId: 'SUIT-3P-GRAY-001',
    tag: 'Charcoal Gray Three-Piece Suit',
    category: 'suits',
    color: 'Charcoal Gray',
    price: 21999,
    pricePerDay: 3200,
    status: 'available',
    description: 'Premium charcoal gray three-piece suit with vest',
    image: require('@/assets/images/products/ClassicBlackTuxedo.jpg'), // Using existing image
    attributes: [
      {
        id: 'size',
        name: 'Size',
        type: 'size',
        required: true,
        options: [
          {id: 's', value: 'S', displayName: 'Small', available: true},
          {id: 'm', value: 'M', displayName: 'Medium', available: true},
          {id: 'l', value: 'L', displayName: 'Large', available: true},
          {
            id: 'xl',
            value: 'XL',
            displayName: 'Extra Large',
            available: true,
          },
        ],
      },
    ],
    variations: [
      {
        id: 'var-7-s',
        attributes: {size: 's'},
        price: 21999,
        pricePerDay: 3200,
        available: true,
      },
      {
        id: 'var-7-m',
        attributes: {size: 'm'},
        price: 21999,
        pricePerDay: 3200,
        available: true,
      },
      {
        id: 'var-7-l',
        attributes: {size: 'l'},
        price: 21999,
        pricePerDay: 3200,
        available: true,
      },
      {
        id: 'var-7-xl',
        attributes: {size: 'xl'},
        price: 21999,
        pricePerDay: 3200,
        available: true,
      },
    ],
    currency: 'INR',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '8',
    productId: 'DRESS-WHITE-001',
    tag: 'Modern White Wedding Dress',
    category: 'dresses',
    color: 'White',
    price: 42999,
    pricePerDay: 5500,
    status: 'available',
    description: 'Stunning modern white wedding dress with intricate beading',
    image: require('@/assets/images/products/VintageLaceWeddingDress.webp'), // Using existing image
    attributes: [
      {
        id: 'size',
        name: 'Size',
        type: 'size',
        required: true,
        options: [
          {
            id: 'xs',
            value: 'XS',
            displayName: 'Extra Small',
            available: true,
          },
          {id: 's', value: 'S', displayName: 'Small', available: true},
          {id: 'm', value: 'M', displayName: 'Medium', available: true},
          {id: 'l', value: 'L', displayName: 'Large', available: true},
          {
            id: 'xl',
            value: 'XL',
            displayName: 'Extra Large',
            available: true,
          },
        ],
      },
    ],
    variations: [
      {
        id: 'var-8-xs',
        attributes: {size: 'xs'},
        price: 42999,
        pricePerDay: 5500,
        available: true,
      },
      {
        id: 'var-8-s',
        attributes: {size: 's'},
        price: 42999,
        pricePerDay: 5500,
        available: true,
      },
      {
        id: 'var-8-m',
        attributes: {size: 'm'},
        price: 42999,
        pricePerDay: 5500,
        available: true,
      },
      {
        id: 'var-8-l',
        attributes: {size: 'l'},
        price: 42999,
        pricePerDay: 5500,
        available: true,
      },
      {
        id: 'var-8-xl',
        attributes: {size: 'xl'},
        price: 42999,
        pricePerDay: 5500,
        available: true,
      },
    ],
    currency: 'INR',
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25'),
  },
  {
    id: '9',
    productId: 'ACC-SILVER-001',
    tag: 'Silver Tie & Pocket Square Set',
    category: 'accessories',
    color: 'Silver',
    price: 1999,
    pricePerDay: 300,
    status: 'available',
    description: 'Elegant silver tie with matching pocket square',
    image: require('@/assets/images/products/GoldCufflinksSet.webp'), // Using existing image
    attributes: [],
    variations: [],
    currency: 'INR',
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18'),
  },
  {
    id: '10',
    productId: 'SHOE-BROWN-001',
    tag: 'Brown Leather Dress Shoes',
    category: 'shoes',
    color: 'Brown',
    price: 5999,
    pricePerDay: 900,
    status: 'available',
    description: 'Premium brown leather dress shoes',
    image: require('@/assets/images/products/OxfordDressShoes.jpg'), // Using existing image
    attributes: [
      {
        id: 'size',
        name: 'Size',
        type: 'size',
        required: true,
        options: [
          {id: '7', value: '7', displayName: 'Size 7', available: true},
          {id: '8', value: '8', displayName: 'Size 8', available: true},
          {id: '9', value: '9', displayName: 'Size 9', available: true},
          {id: '10', value: '10', displayName: 'Size 10', available: true},
          {id: '11', value: '11', displayName: 'Size 11', available: true},
        ],
      },
    ],
    variations: [
      {
        id: 'var-10-7',
        attributes: {size: '7'},
        price: 5999,
        pricePerDay: 900,
        available: true,
      },
      {
        id: 'var-10-8',
        attributes: {size: '8'},
        price: 5999,
        pricePerDay: 900,
        available: true,
      },
      {
        id: 'var-10-9',
        attributes: {size: '9'},
        price: 5999,
        pricePerDay: 900,
        available: true,
      },
      {
        id: 'var-10-10',
        attributes: {size: '10'},
        price: 5999,
        pricePerDay: 900,
        available: true,
      },
      {
        id: 'var-10-11',
        attributes: {size: '11'},
        price: 5999,
        pricePerDay: 900,
        available: true,
      },
    ],
    currency: 'INR',
    createdAt: new Date('2024-01-22'),
    updatedAt: new Date('2024-01-22'),
  },
  // Additional Products
  {
    id: '4',
    productId: 'DRESS-ELEGANT-GOLD-001',
    tag: 'Elegant Gold Evening Dress',
    category: 'dresses',
    color: 'Gold',
    price: 12999,
    pricePerDay: 2000,
    status: 'available',
    description: 'Stunning gold evening dress perfect for special occasions',
    image: require('@/assets/images/products/ClassicBlackTuxedo.jpg'), // Using existing image
    currency: 'INR',
    attributes: [
      {
        id: 'size',
        name: 'Size',
        type: 'size',
        required: true,
        options: [
          {
            id: 'xs',
            value: 'XS',
            displayName: 'Extra Small',
            available: true,
          },
          {id: 's', value: 'S', displayName: 'Small', available: true},
          {id: 'm', value: 'M', displayName: 'Medium', available: true},
          {id: 'l', value: 'L', displayName: 'Large', available: true},
        ],
      },
      {
        id: 'style',
        name: 'Style',
        type: 'style',
        required: true,
        options: [
          {
            id: 'a-line',
            value: 'a-line',
            displayName: 'A-Line',
            available: true,
          },
          {
            id: 'mermaid',
            value: 'mermaid',
            displayName: 'Mermaid',
            available: true,
          },
          {
            id: 'ballgown',
            value: 'ballgown',
            displayName: 'Ball Gown',
            available: true,
          },
        ],
      },
    ],
    variations: [
      {
        id: 'var-4-xs-a-line',
        attributes: {size: 'xs', style: 'a-line'},
        price: 12999,
        pricePerDay: 2000,
        available: true,
      },
      {
        id: 'var-4-s-a-line',
        attributes: {size: 's', style: 'a-line'},
        price: 12999,
        pricePerDay: 2000,
        available: true,
      },
      {
        id: 'var-4-m-a-line',
        attributes: {size: 'm', style: 'a-line'},
        price: 12999,
        pricePerDay: 2000,
        available: true,
      },
      {
        id: 'var-4-l-a-line',
        attributes: {size: 'l', style: 'a-line'},
        price: 12999,
        pricePerDay: 2000,
        available: true,
      },
      {
        id: 'var-4-xs-mermaid',
        attributes: {size: 'xs', style: 'mermaid'},
        price: 13999,
        pricePerDay: 2200,
        available: true,
      },
      {
        id: 'var-4-s-mermaid',
        attributes: {size: 's', style: 'mermaid'},
        price: 13999,
        pricePerDay: 2200,
        available: true,
      },
      {
        id: 'var-4-m-mermaid',
        attributes: {size: 'm', style: 'mermaid'},
        price: 13999,
        pricePerDay: 2200,
        available: true,
      },
      {
        id: 'var-4-l-mermaid',
        attributes: {size: 'l', style: 'mermaid'},
        price: 13999,
        pricePerDay: 2200,
        available: true,
      },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '5',
    productId: 'SHIRT-FORMAL-WHITE-001',
    tag: 'Formal White Shirt',
    category: 'shirts',
    color: 'White',
    price: 2999,
    pricePerDay: 500,
    status: 'available',
    description: 'Classic white formal shirt for business and formal events',
    image: require('@/assets/images/products/NavyBlueSuit.jpg'), // Using existing image
    currency: 'INR',
    attributes: [
      {
        id: 'size',
        name: 'Size',
        type: 'size',
        required: true,
        options: [
          {id: 's', value: 'S', displayName: 'Small', available: true},
          {id: 'm', value: 'M', displayName: 'Medium', available: true},
          {id: 'l', value: 'L', displayName: 'Large', available: true},
          {
            id: 'xl',
            value: 'XL',
            displayName: 'Extra Large',
            available: true,
          },
          {
            id: 'xxl',
            value: 'XXL',
            displayName: 'Double XL',
            available: true,
          },
        ],
      },
      {
        id: 'collar',
        name: 'Collar Type',
        type: 'style',
        required: true,
        options: [
          {
            id: 'classic',
            value: 'classic',
            displayName: 'Classic',
            available: true,
          },
          {
            id: 'spread',
            value: 'spread',
            displayName: 'Spread',
            available: true,
          },
          {
            id: 'button-down',
            value: 'button-down',
            displayName: 'Button Down',
            available: true,
          },
        ],
      },
    ],
    variations: [
      {
        id: 'var-5-s-classic',
        attributes: {size: 's', collar: 'classic'},
        price: 2999,
        pricePerDay: 500,
        available: true,
      },
      {
        id: 'var-5-m-classic',
        attributes: {size: 'm', collar: 'classic'},
        price: 2999,
        pricePerDay: 500,
        available: true,
      },
      {
        id: 'var-5-l-classic',
        attributes: {size: 'l', collar: 'classic'},
        price: 2999,
        pricePerDay: 500,
        available: true,
      },
      {
        id: 'var-5-xl-classic',
        attributes: {size: 'xl', collar: 'classic'},
        price: 2999,
        pricePerDay: 500,
        available: true,
      },
      {
        id: 'var-5-xxl-classic',
        attributes: {size: 'xxl', collar: 'classic'},
        price: 2999,
        pricePerDay: 500,
        available: true,
      },
    ],
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25'),
  },
  {
    id: '6',
    productId: 'SHOES-FORMAL-BLACK-001',
    tag: 'Formal Black Leather Shoes',
    category: 'shoes',
    color: 'Black',
    price: 4999,
    pricePerDay: 800,
    status: 'available',
    description: 'Premium black leather formal shoes for special occasions',
    image: require('@/assets/images/products/ClassicBlackTuxedo.jpg'), // Using existing image
    currency: 'INR',
    attributes: [
      {
        id: 'size',
        name: 'Size',
        type: 'size',
        required: true,
        options: [
          {id: '7', value: '7', displayName: 'Size 7', available: true},
          {id: '8', value: '8', displayName: 'Size 8', available: true},
          {id: '9', value: '9', displayName: 'Size 9', available: true},
          {id: '10', value: '10', displayName: 'Size 10', available: true},
          {id: '11', value: '11', displayName: 'Size 11', available: true},
        ],
      },
      {
        id: 'style',
        name: 'Style',
        type: 'style',
        required: true,
        options: [
          {
            id: 'oxford',
            value: 'oxford',
            displayName: 'Oxford',
            available: true,
          },
          {
            id: 'derby',
            value: 'derby',
            displayName: 'Derby',
            available: true,
          },
          {
            id: 'loafer',
            value: 'loafer',
            displayName: 'Loafer',
            available: true,
          },
        ],
      },
    ],
    variations: [
      {
        id: 'var-6-7-oxford',
        attributes: {size: '7', style: 'oxford'},
        price: 4999,
        pricePerDay: 800,
        available: true,
      },
      {
        id: 'var-6-8-oxford',
        attributes: {size: '8', style: 'oxford'},
        price: 4999,
        pricePerDay: 800,
        available: true,
      },
      {
        id: 'var-6-9-oxford',
        attributes: {size: '9', style: 'oxford'},
        price: 4999,
        pricePerDay: 800,
        available: true,
      },
      {
        id: 'var-6-10-oxford',
        attributes: {size: '10', style: 'oxford'},
        price: 4999,
        pricePerDay: 800,
        available: true,
      },
      {
        id: 'var-6-11-oxford',
        attributes: {size: '11', style: 'oxford'},
        price: 4999,
        pricePerDay: 800,
        available: true,
      },
    ],
    createdAt: new Date('2024-01-30'),
    updatedAt: new Date('2024-01-30'),
  },
  {
    id: '7',
    productId: 'TIE-SILK-NAVY-001',
    tag: 'Silk Navy Blue Tie',
    category: 'accessories',
    color: 'Navy Blue',
    price: 1999,
    pricePerDay: 300,
    status: 'available',
    description: 'Premium silk navy blue tie for formal occasions',
    image: require('@/assets/images/products/NavyBlueSuit.jpg'), // Using existing image
    currency: 'INR',
    attributes: [
      {
        id: 'pattern',
        name: 'Pattern',
        type: 'style',
        required: true,
        options: [
          {
            id: 'solid',
            value: 'solid',
            displayName: 'Solid',
            available: true,
          },
          {
            id: 'striped',
            value: 'striped',
            displayName: 'Striped',
            available: true,
          },
          {
            id: 'polka-dot',
            value: 'polka-dot',
            displayName: 'Polka Dot',
            available: true,
          },
        ],
      },
      {
        id: 'width',
        name: 'Width',
        type: 'size',
        required: true,
        options: [
          {
            id: 'narrow',
            value: 'narrow',
            displayName: 'Narrow (2.5")',
            available: true,
          },
          {
            id: 'medium',
            value: 'medium',
            displayName: 'Medium (3")',
            available: true,
          },
          {
            id: 'wide',
            value: 'wide',
            displayName: 'Wide (3.5")',
            available: true,
          },
        ],
      },
    ],
    variations: [
      {
        id: 'var-7-solid-narrow',
        attributes: {pattern: 'solid', width: 'narrow'},
        price: 1999,
        pricePerDay: 300,
        available: true,
      },
      {
        id: 'var-7-solid-medium',
        attributes: {pattern: 'solid', width: 'medium'},
        price: 1999,
        pricePerDay: 300,
        available: true,
      },
      {
        id: 'var-7-solid-wide',
        attributes: {pattern: 'solid', width: 'wide'},
        price: 1999,
        pricePerDay: 300,
        available: true,
      },
      {
        id: 'var-7-striped-narrow',
        attributes: {pattern: 'striped', width: 'narrow'},
        price: 2199,
        pricePerDay: 350,
        available: true,
      },
      {
        id: 'var-7-striped-medium',
        attributes: {pattern: 'striped', width: 'medium'},
        price: 2199,
        pricePerDay: 350,
        available: true,
      },
      {
        id: 'var-7-striped-wide',
        attributes: {pattern: 'striped', width: 'wide'},
        price: 2199,
        pricePerDay: 350,
        available: true,
      },
    ],
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
  },
  {
    id: '8',
    productId: 'JACKET-BLAZER-CHARCOAL-001',
    tag: 'Charcoal Blazer Jacket',
    category: 'jackets',
    color: 'Charcoal',
    price: 8999,
    pricePerDay: 1400,
    status: 'available',
    description:
      'Elegant charcoal blazer perfect for business and semi-formal events',
    image: require('@/assets/images/products/ClassicBlackTuxedo.jpg'), // Using existing image
    currency: 'INR',
    attributes: [
      {
        id: 'size',
        name: 'Size',
        type: 'size',
        required: true,
        options: [
          {id: 's', value: 'S', displayName: 'Small', available: true},
          {id: 'm', value: 'M', displayName: 'Medium', available: true},
          {id: 'l', value: 'L', displayName: 'Large', available: true},
          {
            id: 'xl',
            value: 'XL',
            displayName: 'Extra Large',
            available: true,
          },
        ],
      },
      {
        id: 'fit',
        name: 'Fit',
        type: 'style',
        required: true,
        options: [
          {
            id: 'slim',
            value: 'slim',
            displayName: 'Slim Fit',
            available: true,
          },
          {
            id: 'regular',
            value: 'regular',
            displayName: 'Regular Fit',
            available: true,
          },
          {
            id: 'relaxed',
            value: 'relaxed',
            displayName: 'Relaxed Fit',
            available: true,
          },
        ],
      },
    ],
    variations: [
      {
        id: 'var-8-s-slim',
        attributes: {size: 's', fit: 'slim'},
        price: 8999,
        pricePerDay: 1400,
        available: true,
      },
      {
        id: 'var-8-m-slim',
        attributes: {size: 'm', fit: 'slim'},
        price: 8999,
        pricePerDay: 1400,
        available: true,
      },
      {
        id: 'var-8-l-slim',
        attributes: {size: 'l', fit: 'slim'},
        price: 8999,
        pricePerDay: 1400,
        available: true,
      },
      {
        id: 'var-8-xl-slim',
        attributes: {size: 'xl', fit: 'slim'},
        price: 8999,
        pricePerDay: 1400,
        available: true,
      },
      {
        id: 'var-8-s-regular',
        attributes: {size: 's', fit: 'regular'},
        price: 8999,
        pricePerDay: 1400,
        available: true,
      },
      {
        id: 'var-8-m-regular',
        attributes: {size: 'm', fit: 'regular'},
        price: 8999,
        pricePerDay: 1400,
        available: true,
      },
      {
        id: 'var-8-l-regular',
        attributes: {size: 'l', fit: 'regular'},
        price: 8999,
        pricePerDay: 1400,
        available: true,
      },
      {
        id: 'var-8-xl-regular',
        attributes: {size: 'xl', fit: 'regular'},
        price: 8999,
        pricePerDay: 1400,
        available: true,
      },
    ],
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-02-05'),
  },
];
/* eslint-enable @typescript-eslint/no-require-imports */

export default function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Load mock products on mount
  useEffect(() => {
    setLoading(true);
    try {
      setProducts(MOCK_PRODUCTS);
      setLoading(false);
    } catch (err) {
      setError(err as Error);
      setLoading(false);
      setProducts(MOCK_PRODUCTS);
      // Error loading products - using mock data as fallback
    }
  }, []);

  const addProduct = useCallback(
    async (newProduct: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
      try {
        setError(null);
        const product: Product = {
          ...newProduct,
          id: Date.now().toString(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        setProducts(prev => [...prev, product]);
        return product;
      } catch (err) {
        setError(err as Error);
        throw err;
      }
    },
    []
  );

  const updateProduct = useCallback(
    async (id: string, updates: Partial<Product>) => {
      try {
        setError(null);
        setProducts(prev =>
          prev.map(p =>
            p.id === id ? {...p, ...updates, updatedAt: new Date()} : p
          )
        );
      } catch (err) {
        setError(err as Error);
        throw err;
      }
    },
    []
  );

  const updateProductStatus = useCallback(
    async (id: string, status: ProductStatus) => {
      try {
        setError(null);
        setProducts(prev =>
          prev.map(p =>
            p.id === id ? {...p, status, updatedAt: new Date()} : p
          )
        );
      } catch (err) {
        setError(err as Error);
        throw err;
      }
    },
    []
  );

  const deleteProduct = useCallback(async (id: string) => {
    try {
      setError(null);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  }, []);

  const getUniqueColors = useCallback(() => {
    const colors = products.map(p => p.color);
    return Array.from(new Set(colors)).sort();
  }, [products]);

  const refreshProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setProducts(MOCK_PRODUCTS);
      setLoading(false);
    } catch (err) {
      setError(err as Error);
      setLoading(false);
    }
  }, []);

  return {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    updateProductStatus,
    deleteProduct,
    getUniqueColors,
    refreshProducts,
  };
}
