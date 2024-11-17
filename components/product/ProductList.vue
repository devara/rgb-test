<template>
  <div class="grid gap-4 custom-grid-cols-auto-fit-[300px]">
    <template
      v-for="product in products"
      :key="product.id">
      <ProductItem
        v-if="!product.isHidden"
        :product="product"
        class="mb-4 justify-self-center"
        @toggle:wish="setWishlist(product.attributes.id)" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { ProductFilter } from '~/types/product'

const {
  pageSetting,
  products,
  filters,
  sort,
} = storeToRefs(useProductStore())
const {
  getList,
  setWishlist,
} = useProductStore()

async function getProductList () {
  try {
    await getList()

    if (sort.value)
      sortProducts()

    const hasFilter = (Object.keys(filters.value) as Array<keyof ProductFilter>).some((key) => filters.value[key])
    if (hasFilter)
      filterProducts()
  } catch (error) {
    console.error(error)
  }
}

function sortProducts () {
  if (sort.value === 'reviews')
    products.value.sort((a, b) => b.attributes.numOfReviews - a.attributes.numOfReviews)

  if (sort.value === 'newest')
    products.value.sort((a, b) => b.attributes.isNew - a.attributes.isNew)
}

function filterProducts () {
  products.value = products.value.map((item) => {
    const hideByStock  = filters.value.inStock ? item.attributes.stock < 1 : false
    const hideByRating = filters.value.highRating ? item.attributes.rating < 4 : false
    item.isHidden      = hideByStock || hideByRating

    return item
  })
}

watch(pageSetting, async () => {
  await getProductList()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}, { deep: true })

watch(filters, () => {
  filterProducts()
}, { deep: true })

watch(sort, () => {
  sortProducts()
})

onMounted(async () => {
  await getProductList()
})
</script>
