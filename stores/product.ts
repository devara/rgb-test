import { acceptHMRUpdate } from 'pinia'
import { getProducts, postWishlist } from '~/api/product'
import type { Product, ProductFilter } from '~/api/types/product'
import type { ResponseListOutput } from '~/api'

export const useProductStore = defineStore('product-store', () => {
  const { ratingAttribute } = useProductAttribute()

  const pageSetting = reactive({
    page    : 1,
    per_page: 10,
  })

  const listMeta = ref<ResponseListOutput<Product[]>['meta']>()
  const products = ref<Product[]>([])

  const sort    = ref<'newest' | 'reviews' | 'rating'>('newest')
  const filters = reactive<ProductFilter>({
    highRating: false,
    inStock   : false,
  })

  const wislist = ref<number[]>([])

  async function getList () {
    const { data } = await getProducts({
      params: {
        'page[number]': pageSetting.page,
        'page[size]'  : pageSetting.per_page,
      },
    })
    if (data.data) {
      products.value = data.data.map((item) => {
        item.attributes.rating = ratingAttribute(item.attributes.rating)
        return item
      })
    }
    listMeta.value = data.meta
  }

  async function setWishlist (id: number) {
    try {
      await postWishlist(id)
      if (wislist.value.includes(id))
        wislist.value = wislist.value.filter((item) => item !== id)
      else
        wislist.value.push(id)

      localStorage.setItem('products-wish-list', JSON.stringify(wislist.value))
    } catch (error) {
      console.error(error)
    }
  }

  onMounted(() => {
    try {
      const wish    = localStorage.getItem('products-wish-list')
      wislist.value = wish ? JSON.parse(wish) : []
    } catch (error) {
      console.error(error)
    }
  })

  return {
    pageSetting,
    listMeta,
    products,
    sort,
    filters,
    wislist,
    getList,
    setWishlist,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
