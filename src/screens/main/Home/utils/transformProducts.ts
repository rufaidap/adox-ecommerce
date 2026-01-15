import type {ImageSourcePropType} from 'react-native';

import {BASE_URL} from '@env';

import type {Product} from '@/api/graphql/products/types';
import type {ProductCardItem} from '@/components/ProductCardComp/ProductCardComp';

const getProductType = (product: Product): 'simple' | 'variable' => {
  if (product.type?.toLowerCase() === 'variable') {
    return 'variable';
  }
  if (product.variations && product.variations.length > 0) {
    return 'variable';
  }
  return 'simple';
};

const getProductImage = (
  coverImage: string | null
): ImageSourcePropType | null => {
  if (!coverImage || coverImage.trim() === '') {
    return null;
  }
  if (coverImage.startsWith('http') || coverImage.startsWith('https')) {
    return {uri: coverImage};
  }
  return {
    uri: `${BASE_URL}${coverImage.startsWith('/') ? '' : '/'}${coverImage}`,
  };
};

export const transformProductsToCards = (
  products: Product[]
): ProductCardItem[] => {
  return products
    .filter(product => product.is_active)
    .map(product => {
      const type = getProductType(product);
      let displayPrice = product.price;

      // If price is 0 or null, try to get from variations
      if (
        (!displayPrice || displayPrice === 0) &&
        product.variations &&
        product.variations.length > 0
      ) {
        const variationPrices = product.variations
          .map(v => v.price)
          .filter(p => typeof p === 'number' && p > 0);

        if (variationPrices.length > 0) {
          displayPrice = Math.min(...variationPrices);
        }
      }

      const quantityOptions =
        product.variations
          ?.map(variation => variation.min_order_quantity)
          .filter((qty): qty is number => typeof qty === 'number' && qty > 0) ||
        [];

      const variantOptions =
        product.variations?.map((variation, index) => {
          let label = '';

          if (variation.attribute_combination) {
            try {
              // Try to parse as JSON
              const parsed = JSON.parse(variation.attribute_combination);

              if (Array.isArray(parsed)) {
                label = parsed
                  .map(item => {
                    if (typeof item === 'object' && item !== null) {
                      return (
                        item.value ||
                        item.label ||
                        item.name ||
                        JSON.stringify(item)
                      );
                    }
                    return String(item);
                  })
                  .join(', ');
              } else if (typeof parsed === 'object' && parsed !== null) {
                // Format as "Key: Value, Key: Value"
                label = Object.entries(parsed)
                  .map(([key, value]) => {
                    // unexpected numeric keys are likely IDs, just show value
                    if (!isNaN(Number(key))) {
                      return String(value);
                    }
                    return `${key}: ${value}`;
                  })
                  .join(', ');
              } else {
                label = String(variation.attribute_combination);
              }
            } catch {
              // Not JSON, use as is
              label = variation.attribute_combination;
            }
          }

          if (!label) {
            label = variation.sku || `Variation ${index + 1}`;
          }

          return {
            label,
            value: variation.id,
          };
        }) || [];

      return {
        id: product.id,
        name: product.name,
        price: displayPrice || 0, // Ensure strictly number
        image: getProductImage(product.cover_image),
        type,
        quantityOptions,
        variantOptions,
        variations: product.variations,
        weight: product.sku,
        category: product.category || null,
        brand: product.brand || null,
        description: product.description || null,
      };
    });
};
