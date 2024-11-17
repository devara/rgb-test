import type {
  Product,
  ProductAttribute,
  SaleValue,
  Stock,
} from '~/api/types/product'

const defaultStockValue: Stock = {
  value: 'sold-out',
  label: 'Sold Out',
}

export function useProductAttribute () {
  const product = ref<Product>()

  const productStock  = computed(() => {
    return product.value ? stockAttribute(product.value.attributes.stock) : defaultStockValue
  })
  const productSale   = computed<SaleValue>(() => {
    if (product.value)
      return saleAttribute(product.value.attributes)
  })
  const productRating = computed(() => {
    return ratingAttribute(product.value?.attributes.rating ?? 0)
  })

  const productBaseImage = computed(() => product.value?.attributes.images.at(0) ?? '')
  const productInfo      = computed(() => product.value?.attributes.info ?? '')

  function ratingAttribute (rating: ProductAttribute['rating']): number {
    return Math.round(rating * 2) / 2
  }

  function saleAttribute (attribute: ProductAttribute): SaleValue {
    const isBest = ratingAttribute(attribute.rating) >= 4 && attribute.numOfReviews > 25

    if (isBest && attribute.isNew)
      return 'hot'

    if (isBest)
      return 'best'

    if (attribute.isNew)
      return 'new'
  }

  function stockAttribute (stock: ProductAttribute['stock']): Stock {
    if (stock < 1)
      return { value: 'sold-out', label: 'Sold Out' }

    if (stock < 5)
      return { value: 'running-low', label: 'Stock < 5' }

    return { value: 'in-stock', label: 'In Stock' }
  }

  return {
    product,
    productStock,
    productSale,
    productRating,
    productBaseImage,
    productInfo,
    ratingAttribute,
    saleAttribute,
    stockAttribute,
  }
}
