import type {ImageSourcePropType} from 'react-native';

import {makeAutoObservable, runInAction} from 'mobx';

import {generalApolloClient} from '@/api/graphql/apolloClient';
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART,
} from '@/api/graphql/cart/mutations';
import {CARTS} from '@/api/graphql/cart/queries';
import type {
  AddToCartResponse,
  AddToCartVariables,
  CartItem as GraphQLCartItem,
  RemoveFromCartResponse,
  RemoveFromCartVariables,
  UpdateCartResponse,
  UpdateCartVariables,
} from '@/api/graphql/cart/types';
import type {ProductCardItem} from '@/components/ProductCardComp/ProductCardComp';
import authStore from '@/stores/authStore';

export interface CartItem {
  id: string;
  product: ProductCardItem;
  quantity: number;
  selectedSize?: string;
  selectedVariant?: string;
  addedAt: Date;
  // For optimistic updates
  isSyncing?: boolean;
  syncError?: string | null;
}

interface DebounceTimer {
  [key: string]: NodeJS.Timeout | null;
}

class CartStore {
  items: CartItem[] = [];
  loading = false;
  error: string | null = null;
  private debounceTimers: DebounceTimer = {};
  private pendingUpdates: Map<string, CartItem> = new Map();
  private readonly DEBOUNCE_DELAY = 500; // 500ms delay for API calls

  constructor() {
    makeAutoObservable(this);
  }

  // Computed property for total items count
  get itemsCount() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  // Computed property for cart total
  get total() {
    return this.items.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  }

  // Get cart item by product ID (optionally filtered by size/variant)
  getCartItem = (
    productId: string,
    selectedSize?: string,
    selectedVariant?: string
  ): CartItem | undefined => {
    if (selectedSize !== undefined || selectedVariant !== undefined) {
      const itemKey = this.getItemKey(productId, selectedSize, selectedVariant);
      return this.items.find(
        item =>
          this.getItemKey(
            item.product.id,
            item.selectedSize,
            item.selectedVariant
          ) === itemKey
      );
    }
    return this.items.find(item => item.product.id === productId);
  };

  // Check if product is in cart
  isInCart = (productId: string): boolean => {
    return this.items.some(item => item.product.id === productId);
  };

  // Get quantity for a product (optionally filtered by size/variant)
  getQuantity = (
    productId: string,
    selectedSize?: string,
    selectedVariant?: string
  ): number => {
    const itemKey = this.getItemKey(productId, selectedSize, selectedVariant);
    const item = this.items.find(
      cartItem =>
        this.getItemKey(
          cartItem.product.id,
          cartItem.selectedSize,
          cartItem.selectedVariant
        ) === itemKey
    );
    return item?.quantity || 0;
  };

  /**
   * Debounce utility to prevent too many API calls
   * Only the last call within the debounce delay will be executed
   */
  private debounce = (
    key: string,
    callback: () => void,
    delay: number = this.DEBOUNCE_DELAY
  ) => {
    // Clear existing timer for this key
    if (this.debounceTimers[key]) {
      clearTimeout(this.debounceTimers[key] as NodeJS.Timeout);
    }

    // Set new timer
    this.debounceTimers[key] = setTimeout(() => {
      callback();
      this.debounceTimers[key] = null;
    }, delay);
  };

  /**
   * Create a unique key for cart item identification
   */
  private getItemKey = (
    productId: string,
    size?: string,
    variant?: string
  ): string => {
    return `${productId}-${size || ''}-${variant || ''}`;
  };

  /**
   * Transform GraphQL cart item to store CartItem format
   */
  private transformGraphQLCartItem = (
    graphQLItem: GraphQLCartItem,
    product?: ProductCardItem
  ): CartItem => {
    // Helper function to convert cover_image string to ImageSourcePropType
    const getProductImage = (
      coverImage: string | null | undefined
    ): ImageSourcePropType | null => {
      if (!coverImage || coverImage.trim() === '') {
        return null;
      }
      return {uri: coverImage};
    };

    // If product is provided, use it; otherwise create a minimal product from GraphQL data
    const productData: ProductCardItem =
      product ||
      ({
        id: graphQLItem.product_id,
        name: graphQLItem.product?.name || '',
        price: graphQLItem.price,
        image: getProductImage(graphQLItem.product?.cover_image),
        type: 'simple' as const,
      } as ProductCardItem);

    return {
      id: graphQLItem.id,
      product: productData,
      quantity: graphQLItem.quantity,
      selectedSize: undefined, // Map from variation if needed
      selectedVariant: graphQLItem.product_variation_id || undefined,
      addedAt: new Date(graphQLItem.created_at),
      isSyncing: false,
      syncError: null,
    };
  };

  /**
   * Get customer ID from auth store
   */
  private getCustomerId = (): string | undefined => {
    return authStore.userData?.id as string | undefined;
  };

  /**
   * Add item to cart with optimistic update and debounced API call
   */
  addToCart = (
    product: ProductCardItem,
    quantity: number = 1,
    selectedSize?: string,
    selectedVariant?: string
  ) => {
    const itemKey = this.getItemKey(product.id, selectedSize, selectedVariant);
    const existingItemIndex = this.items.findIndex(
      item =>
        this.getItemKey(
          item.product.id,
          item.selectedSize,
          item.selectedVariant
        ) === itemKey
    );

    if (existingItemIndex !== -1) {
      // Update existing item quantity
      runInAction(() => {
        this.items[existingItemIndex].quantity += quantity;
        this.items[existingItemIndex].isSyncing = true;
        this.items[existingItemIndex].syncError = null;
      });

      // Debounce API call for update
      this.debounce(`update-${itemKey}`, () =>
        this.syncUpdateCartItem(this.items[existingItemIndex])
      );
    } else {
      // Add new item
      const newItem: CartItem = {
        id: `${product.id}-${Date.now()}`,
        product,
        quantity,
        selectedSize,
        selectedVariant,
        addedAt: new Date(),
        isSyncing: true,
        syncError: null,
      };

      runInAction(() => {
        this.items.push(newItem);
      });

      // Debounce API call for add
      this.debounce(`add-${itemKey}`, () => this.syncAddToCart(newItem));
    }
  };

  /**
   * Update quantity with optimistic update and debounced API call
   */
  updateQuantity = (
    productId: string,
    quantity: number,
    selectedSize?: string,
    selectedVariant?: string
  ) => {
    if (quantity <= 0) {
      this.removeFromCart(productId, selectedSize, selectedVariant);
      return;
    }

    const itemKey = this.getItemKey(productId, selectedSize, selectedVariant);
    const itemIndex = this.items.findIndex(
      item =>
        this.getItemKey(
          item.product.id,
          item.selectedSize,
          item.selectedVariant
        ) === itemKey
    );

    if (itemIndex !== -1) {
      // Optimistic update
      runInAction(() => {
        this.items[itemIndex].quantity = quantity;
        this.items[itemIndex].isSyncing = true;
        this.items[itemIndex].syncError = null;
      });

      // Debounce API call
      this.debounce(`update-${itemKey}`, () =>
        this.syncUpdateCartItem(this.items[itemIndex])
      );
    }
  };

  /**
   * Increment quantity with debounced API call
   */
  incrementQuantity = (
    productId: string,
    selectedSize?: string,
    selectedVariant?: string
  ) => {
    const itemKey = this.getItemKey(productId, selectedSize, selectedVariant);
    const item = this.items.find(
      cartItem =>
        this.getItemKey(
          cartItem.product.id,
          cartItem.selectedSize,
          cartItem.selectedVariant
        ) === itemKey
    );

    if (item) {
      this.updateQuantity(
        productId,
        item.quantity + 1,
        selectedSize,
        selectedVariant
      );
    }
  };

  /**
   * Decrement quantity with debounced API call
   */
  decrementQuantity = (
    productId: string,
    selectedSize?: string,
    selectedVariant?: string
  ) => {
    const itemKey = this.getItemKey(productId, selectedSize, selectedVariant);
    const item = this.items.find(
      cartItem =>
        this.getItemKey(
          cartItem.product.id,
          cartItem.selectedSize,
          cartItem.selectedVariant
        ) === itemKey
    );

    if (item) {
      this.updateQuantity(
        productId,
        item.quantity - 1,
        selectedSize,
        selectedVariant
      );
    }
  };

  /**
   * Remove item from cart with optimistic update and immediate API call
   */
  removeFromCart = (
    productId: string,
    selectedSize?: string,
    selectedVariant?: string
  ) => {
    const itemKey = this.getItemKey(productId, selectedSize, selectedVariant);

    // Clear any pending debounced updates for this item
    const debounceKey = `update-${itemKey}`;
    if (this.debounceTimers[debounceKey]) {
      clearTimeout(this.debounceTimers[debounceKey] as NodeJS.Timeout);
      delete this.debounceTimers[debounceKey];
    }

    const itemIndex = this.items.findIndex(
      item =>
        this.getItemKey(
          item.product.id,
          item.selectedSize,
          item.selectedVariant
        ) === itemKey
    );

    if (itemIndex !== -1) {
      const itemToRemove = this.items[itemIndex];

      // Optimistic removal
      runInAction(() => {
        this.items.splice(itemIndex, 1);
      });

      // Immediate API call for removal (no debounce needed)
      this.syncRemoveFromCart(itemToRemove);
    }
  };

  /**
   * Clear entire cart
   */
  clearCart = () => {
    // Clear all debounce timers
    Object.keys(this.debounceTimers).forEach(key => {
      if (this.debounceTimers[key]) {
        clearTimeout(this.debounceTimers[key] as NodeJS.Timeout);
      }
    });
    this.debounceTimers = {};

    runInAction(() => {
      this.items = [];
    });

    // Sync with API
    this.syncClearCart();
  };

  /**
   * Sync add to cart with GraphQL API
   */
  private syncAddToCart = async (item: CartItem) => {
    try {
      // Ensure all required values are present and not null/undefined
      if (!item.product?.id) {
        throw new Error('Product ID is required');
      }

      const productId = String(item.product.id);
      const quantity = Number(item.quantity) || 1;
      const price = Number(item.product.price) || 0;
      const productVariationId = item.selectedVariant
        ? String(item.selectedVariant)
        : null;
      const discount = 0;
      const vatPercentage = 0;

      const variables: AddToCartVariables = {
        cart: {
          product_id: productId,
          product_variation_id: productVariationId,
          quantity: quantity,
          price: price,
          discount: discount,
          vat_percentage: vatPercentage,
        },
      };

      const response = await generalApolloClient.mutate<
        AddToCartResponse,
        AddToCartVariables
      >({
        mutation: ADD_TO_CART,
        variables,
        errorPolicy: 'all',
      });
      // console.log('response', JSON.stringify(response, null, 2));
      // Update item with server response
      runInAction(() => {
        const itemIndex = this.items.findIndex(i => i.id === item.id);
        if (itemIndex !== -1 && response.data?.addToCart) {
          const graphQLItem = response.data.addToCart;
          this.items[itemIndex].id = graphQLItem.id;
          this.items[itemIndex].isSyncing = false;
          this.items[itemIndex].syncError = null;

          // Update product details from server response
          if (graphQLItem.price !== undefined) {
            this.items[itemIndex].product.price = graphQLItem.price;
          }
          if (graphQLItem.product?.name) {
            this.items[itemIndex].product.name = graphQLItem.product.name;
          }

          // Update product image if available from server response
          if (graphQLItem.product?.cover_image) {
            const coverImage = graphQLItem.product.cover_image;
            if (coverImage && coverImage.trim() !== '') {
              this.items[itemIndex].product.image = {uri: coverImage};
            }
          }
        }
      });
    } catch (error: unknown) {
      // console.log('error', JSON.stringify(error, null, 2));
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to add to cart';
      runInAction(() => {
        const itemIndex = this.items.findIndex(i => i.id === item.id);
        if (itemIndex !== -1) {
          this.items[itemIndex].isSyncing = false;
          this.items[itemIndex].syncError = errorMessage;
        }
        this.error = errorMessage;
      });
    }
  };

  /**
   * Sync update cart item with GraphQL API
   */
  private syncUpdateCartItem = async (item: CartItem) => {
    try {
      // Ensure all required values are present and not null/undefined
      if (!item.id) {
        throw new Error('Cart item ID is required for update');
      }
      if (!item.product?.id) {
        throw new Error('Product ID is required');
      }

      const cartId = String(item.id);
      const productId = String(item.product.id);
      const quantity = Number(item.quantity) || 1;
      const price = Number(item.product.price) || 0;
      const productVariationId = item.selectedVariant
        ? String(item.selectedVariant)
        : null;
      const discount = 0;
      const vatPercentage = 0;
      const totalPrice = price * quantity;

      const variables: UpdateCartVariables = {
        cart: {
          id: cartId,
          product_id: productId,
          product_variation_id: productVariationId,
          quantity: quantity,
          price: price,
          discount: discount,
          vat_percentage: vatPercentage,
          total_price: totalPrice,
        },
      };

      await generalApolloClient.mutate<UpdateCartResponse, UpdateCartVariables>(
        {
          mutation: UPDATE_CART,
          variables,
          errorPolicy: 'all',
        }
      );

      runInAction(() => {
        const itemIndex = this.items.findIndex(
          i =>
            this.getItemKey(i.product.id, i.selectedSize, i.selectedVariant) ===
            this.getItemKey(
              item.product.id,
              item.selectedSize,
              item.selectedVariant
            )
        );
        if (itemIndex !== -1) {
          this.items[itemIndex].isSyncing = false;
          this.items[itemIndex].syncError = null;
        }
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to update cart';
      runInAction(() => {
        const itemIndex = this.items.findIndex(
          i =>
            this.getItemKey(i.product.id, i.selectedSize, i.selectedVariant) ===
            this.getItemKey(
              item.product.id,
              item.selectedSize,
              item.selectedVariant
            )
        );
        if (itemIndex !== -1) {
          this.items[itemIndex].isSyncing = false;
          this.items[itemIndex].syncError = errorMessage;
        }
        this.error = errorMessage;
      });
    }
  };

  /**
   * Sync remove from cart with GraphQL API
   */
  private syncRemoveFromCart = async (item: CartItem) => {
    try {
      if (!item.id) {
        throw new Error('Cart item ID is required for removal');
      }

      const variables: RemoveFromCartVariables = {
        cart: {
          id: item.id,
          product_id: item.product.id,
        },
      };

      await generalApolloClient.mutate<
        RemoveFromCartResponse,
        RemoveFromCartVariables
      >({
        mutation: REMOVE_FROM_CART,
        variables,
        errorPolicy: 'all',
      });
    } catch (error: unknown) {
      // If removal fails, we could re-add the item, but for now just set error
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to remove from cart';
      this.error = errorMessage;
    }
  };

  /**
   * Sync clear cart with GraphQL API
   * Note: This removes all items one by one since there's no bulk delete mutation
   */
  private syncClearCart = async () => {
    try {
      // Remove all items using the remove mutation
      const removePromises = this.items.map(item => {
        if (!item.id) {
          return Promise.resolve();
        }
        const variables: RemoveFromCartVariables = {
          cart: {
            id: item.id,
            product_id: item.product.id,
          },
        };
        return generalApolloClient.mutate<
          RemoveFromCartResponse,
          RemoveFromCartVariables
        >({
          mutation: REMOVE_FROM_CART,
          variables,
          errorPolicy: 'all',
        });
      });

      await Promise.all(removePromises);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to clear cart';
      this.error = errorMessage;
    }
  };

  /**
   * Fetch cart from GraphQL API
   */
  fetchCart = async () => {
    this.loading = true;
    this.error = null;

    try {
      const response = await generalApolloClient.query({
        query: CARTS,
        variables: {},
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      });

      runInAction(() => {
        if (response.data?.carts?.data) {
          this.items = response.data.carts.data.map(
            (graphQLItem: GraphQLCartItem) =>
              this.transformGraphQLCartItem(graphQLItem)
          );
        } else {
          this.items = [];
        }
        this.loading = false;
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to fetch cart';
      runInAction(() => {
        this.error = errorMessage;
        this.loading = false;
      });
    }
  };

  /**
   * Get cart summary
   */
  getCartSummary = () => {
    return {
      totalItems: this.itemsCount,
      totalAmount: this.total,
      items: this.items,
      hasErrors: this.items.some(item => item.syncError),
      isSyncing: this.items.some(item => item.isSyncing),
    };
  };

  /**
   * Load cart items from API
   */
  loadCartItems = async () => {
    await this.fetchCart();
  };

  /**
   * Load shipping address (delegates to addressStore)
   */
  loadShippingAddress = async () => {
    // Import dynamically to avoid circular dependency
    const addressStore = (await import('./addressStore')).default;
    await addressStore.loadShippingAddress();
  };
}

const cartStore = new CartStore();
export default cartStore;
