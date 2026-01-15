import type {ProductsVariables} from '@/api/graphql/products/types';
import type {ProductCardItem} from '@/components/ProductCardComp/ProductCardComp';

export interface HorizontalProductListProps {
  onOfferPress?: (offer: ProductCardItem) => void;
  onSeeAllPress?: () => void;
  size?: number;
  page?: number;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  productFilter?: ProductsVariables['product'];
  label?: string;
  cardType?: 'primary' | 'secondary';
}
