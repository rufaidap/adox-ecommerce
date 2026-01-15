import type {ProductCardItem} from '@/components/ProductCardComp/ProductCardComp';
import cartStore from '@/stores/cartStore';

/**
 * Common function to handle adding items to cart
 * Can be used anywhere in the app without passing as props
 *
 * @param item - The product item to add to cart
 * @param quantity - Quantity to add (default: 1)
 * @param selectedSize - Optional size selection for variable products
 * @param selectedVariant - Optional variant selection for variable products
 */
export const handleAddToCart = (
  item: ProductCardItem,
  quantity: number = 1,
  selectedSize?: string,
  selectedVariant?: string
): void => {
  // Check if item is already in cart (considering size/variant for variable products)
  const isInCart = cartStore.getCartItem(
    item.id,
    selectedSize,
    selectedVariant
  );

  if (isInCart) {
    // Update existing quantity
    cartStore.updateQuantity(item.id, quantity, selectedSize, selectedVariant);
  } else {
    // Add new item to cart
    cartStore.addToCart(item, quantity, selectedSize, selectedVariant);
  }
};
