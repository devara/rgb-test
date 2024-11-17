export interface ProductAttribute {
    id: number,
    name: string,
    info: string,
    description: string,
    points: number,
    slug: string,
    stock: number,
    images: string[],
    isNew: number,
    rating: number,
    numOfReviews: number,
    isWishlist: number,
  }
  
  export interface Product {
    id: string,
    type: 'gift' | 'item',
    attributes: ProductAttribute,
    isHidden?: boolean,
  }
  
  export type SaleValue = 'new' | 'best' | 'hot' | undefined
  
  export interface Stock {
    value: 'in-stock' | 'sold-out' | 'running-low',
    label: string,
  }
  
  export interface ProductFilter {
    highRating: boolean,
    inStock: boolean,
  }
  