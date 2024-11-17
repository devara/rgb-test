<template>
  <div class="flex px-4 pb-6 md:px-6 md:space-x-8 lg:px-12">
    <div class="md:flex w-full max-w-52 lg:max-w-[250px] hidden flex-col space-y-4">
      <span class="font-bold text-[17px] pb-6 border-b w-full">
        Filter
      </span>
      <ProductFilter />
    </div>

    <div class="flex flex-col w-full space-y-4">
      <div class="flex flex-col items-center justify-between pb-6 border-b md:flex-row max-md:space-y-4">
        <span class="flex-grow font-bold text-[17px]">
          Product List
        </span>
        <div class="product__sort">
          <span class="mr-4">Urutkan</span>
          <select
            v-model="sort"
            class="px-3 py-2 text-center border rounded-full">
            <option value="newest">
              Newest
            </option>
            <option value="reviews">
              Number of reviews
            </option>
          </select>
        </div>
        <div class="flex flex-col items-center product__filter md:hidden">
          <span
            class="cursor-pointer"
            @click="showFilter = !showFilter">
            Filter
          </span>
          <ProductFilter v-if="showFilter" />
        </div>
      </div>
      <ProductList />
      <ProductListPagination />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { sort } = storeToRefs(useProductStore())

const showFilter = ref<boolean>(false)

const {
  getMetaTitle,
  getMetaDescription,
  getMetaUrl,
  getMetaImageUrl,
} = useAppMeta()

useSeoMeta({
  title             : () => getMetaTitle(),
  ogTitle           : () => getMetaTitle(),
  description       : getMetaDescription(),
  ogDescription     : getMetaDescription(),
  ogImage           : getMetaImageUrl(),
  ogUrl             : getMetaUrl(),
  twitterTitle      : () => getMetaTitle(),
  twitterDescription: getMetaDescription(),
  twitterImage      : getMetaImageUrl(),
  twitterCard       : 'summary',
})
</script>
