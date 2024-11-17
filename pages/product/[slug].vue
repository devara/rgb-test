<template>
  <div class="detail">
    <div
      v-if="product"
      class="detail__product">
      <div class="detail__product__view">
        <ProductAttributeSale
          v-if="productSale"
          :sale="productSale"
          class="product__sale" />
        <img
          v-if="product.attributes.images.length > 0"
          :src="product.attributes.images[0]"
          class="w-auto h-full">
      </div>

      <div class="detail__product__content">
        <h1 class="block text-2xl font-bold">
          {{ product.attributes.name }}
        </h1>
        <ProductAttributeRating
          :product="product"
          class="w-full text-sm"
          style="--dev-star-width: 17px;" />
        <span class="flex items-center space-x-4">
          <ProductAttributePoint
            :points="product.attributes.points"
            class="text-2xl font-bold">
            <template #icon>
              <img
                src="/images/icons/point-outline.svg"
                class="w-5 h-auto">
            </template>
          </ProductAttributePoint>
          <ProductAttributeStock :stock="productStock" />
        </span>
        <ProductInfo />

        <label class="text-sm text-gray-700">Jumlah</label>
        <span class="detail__product__quantity">
          <button
            class="detail__product__quantity--toggle"
            @click="toggleQuantity('reduce')">
            -
          </button>
          <input
            v-model="quantity"
            type="number"
            :max="product.attributes.stock"
            :min="0">
          <button
            class="detail__product__quantity--toggle"
            @click="toggleQuantity('add')">
            +
          </button>
        </span>

        <span class="flex items-center space-x-3">
          <ProductAttributeWish
            v-if="product"
            :model-value="wislist.includes(product.attributes.id)"
            class="px-4 py-3 min-w-[70px]"
            @toggle="setWishlist(product.attributes.id)" />
          <button class="text-white bg-green-800 detail__product__action">
            Redeem
          </button>
          <button
            :disabled="disabledAddCart"
            class="text-green-700 border border-green-700 detail__product__action"
            :class="{
              'opacity-50': disabledAddCart
            }">
            Add to cart
          </button>
        </span>
      </div>
    </div>
    <div
      v-if="product"
      class="detail__description"
      :style="{ backgroundImage: `url(${BATIK_BG})` }">
      <ProductInformation :product="product" />
    </div>

    <ProductNotFound
      v-if="!product && !isLoading"
      class="self-center my-auto" />
  </div>
</template>

<script lang="ts" setup>
import { h } from 'vue-demi'
import { getProduct } from '~/api/product'
import BATIK_BG from '~/assets/images/batik-background.svg'

const route = useRoute()

const { wislist }     = storeToRefs(useProductStore())
const { setWishlist } = useProductStore()

const {
  product,
  productSale,
  productStock,
  productBaseImage,
  productInfo,
  ratingAttribute,
} = useProductAttribute()
const {
  getMetaTitle,
  getMetaDescription,
  getMetaUrl,
  getMetaImageUrl,
  getMetaImageType,
} = useAppMeta()

const isLoading       = ref<boolean>(true)
const quantity        = ref<number>(1)
const disabledAddCart = computed(() => productStock.value.value === 'sold-out' || quantity.value < 1)

const ProductInfo = () => h('span', { innerHTML: product.value?.attributes.info })

function toggleQuantity (type: 'add' | 'reduce') {
  if (productStock.value.value === 'sold-out')
    return

  if (type === 'add' && quantity.value < (product.value?.attributes.stock ?? 0))
    quantity.value++

  if (type === 'reduce' && quantity.value !== 0)
    quantity.value--
}

onMounted(async () => {
  try {
    const params   = (route.params.slug as string ?? '').split('--')
    const producID = params.at(0)
    const slug     = params.at(1)

    if (producID && !product.value) {
      const { data } = await getProduct(producID)
      if (!data.data)
        return

      product.value = data.data
      if (product.value.attributes.slug !== slug)
        navigateTo('/')

      product.value.attributes.rating = ratingAttribute(product.value.attributes.rating)
      quantity.value                  = productStock.value.value === 'sold-out' ? 0 : 1
    }
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
})

useSeoMeta({
  title        : () => getMetaTitle(product.value?.attributes.name),
  ogTitle      : () => getMetaTitle(product.value?.attributes.name),
  description  : () => getMetaDescription(productInfo.value),
  ogDescription: () => getMetaDescription(productInfo.value),
  ogImage      : () => {
    return {
      url      : getMetaImageUrl(productBaseImage.value),
      secureUrl: getMetaImageUrl(productBaseImage.value),
      alt      : product.value?.attributes.name,
      type     : getMetaImageType(productBaseImage.value),
    }
  },
  ogUrl             : () => getMetaUrl('product', (route.params.slug ?? '') as string),
  twitterTitle      : () => getMetaTitle(product.value?.attributes.name),
  twitterDescription: () => getMetaDescription(productInfo.value),
  twitterImage      : () => getMetaImageUrl(productBaseImage.value),
  twitterCard       : 'summary',
})
</script>

<style lang="postcss">
.detail {
  @apply flex flex-col px-6 space-y-6 lg:px-16 min-h-[calc(100vh-200px)];

  &__product {
    @apply flex flex-col max-md:space-y-6 md:space-x-6 lg:space-x-8 md:flex-row md:items-start;

    &__view {
      @apply relative w-2/3 h-full px-12 pt-12 max-md:self-center md:w-1/2 shrink-0;
    }

    &__content {
      @apply flex flex-col space-y-5;
    }

    &__quantity {
      @apply inline-flex space-x-3 w-fit;

      input[type='number'] {
        @apply appearance-none [&::-webkit-inner-spin-button]:appearance-none w-8 text-center;
      }

      &--toggle {
        @apply px-2 py-1 text-2xl bg-gray-300 min-w-8;
      }
    }

    &__action {
      @apply min-w-[100px] px-4 py-3 rounded-full;
      @apply md:min-w-[150px];
    }
  }

  &__description {
    @apply w-full p-5 min-h-44 md:p-8 lg:p-10;
  }
}
</style>
