<template>
  <div class="product">
    <div class="product__view">
      <span class="product__view__title">{{ product.attributes.name }}</span>
      <button
        class="product__view__detail"
        @click="goToDetail">
        View detail
      </button>
    </div>
    <ProductAttributeSale
      v-if="productSale"
      :sale="productSale"
      class="product__sale" />
    <ProductAttributeStock
      :stock="productStock"
      class="relative mb-4" />
    <img
      :src="productBaseImage"
      class="product__thumbnail">
    <div class="product__attributes">
      <span class="product__attributes--title">{{ product.attributes.name }}</span>
      <ProductAttributePoint :points="product.attributes.points" />
      <span class="inline-flex items-center justify-between w-full">
        <ProductAttributeRating :product="product" />
        <ProductAttributeWish
          :model-value="wislist.includes(product.attributes.id)"
          class="z-20 px-4 py-1 min-w-12"
          @toggle="emit('toggle:wish')" />
      </span>
    </div>

    <div
      v-if="productStock.value === 'sold-out'"
      class="product__sold-out" />
  </div>
</template>

<script lang="ts" setup>
import type { Product } from '~/types/product'

const emit  = defineEmits(['toggle:wish'])
const props = defineProps({
  product: {
    type   : Object as PropType<Product>,
    default: () => ({} as Product),
  },
})

const { wislist } = storeToRefs(useProductStore())
const {
  product: item,
  productStock,
  productSale,
  productBaseImage,
} = useProductAttribute()

function goToDetail () {
  navigateTo(`/product/${props.product.id}--${props.product.attributes.slug}`)
}

onMounted(() => {
  item.value = props.product
})
</script>

<style lang="postcss">
.product {
  --dev-border-radius: 18px;
  --dev-view-width: 300px;
  --dev-thumbnail-width: 265px;

  @apply relative p-6 border rounded-[var(--dev-border-radius)] w-[var(--dev-view-width)];

  &__view {
    @apply absolute z-20 inset-0 hidden px-6 bg-opacity-95 bg-[#74B71B] transition-all ease-in-out;
    @apply rounded-[var(--dev-border-radius)];

    &__title {
      @apply block font-medium text-white;
    }

    &__detail {
      @apply w-full px-6 py-3 mt-8 text-white border rounded-full;
    }
  }

  &__sale {
    @apply absolute top-0 right-0;
  }

  &__thumbnail {
    @apply h-[var(--dev-thumbnail-width)] w-auto mt-6;
  }

  &__attributes {
    @apply mt-4;

    &--title {
      @apply block font-medium;
    }

    .points {
      @apply text-sm;
    }

    .rating {
      @apply text-xs;
    }
  }

  &:hover {
    .product__view {
      @apply flex flex-col justify-center items-center;
    }

    .product__sold-out {
      @apply opacity-0;
    }

    .stock {
      @apply !text-white z-20;
    }
  }

  &__sold-out {
    @apply absolute bg-opacity-70 bg-[#e1e8ee] z-10 inset-0 rounded-[var(--dev-border-radius)];
  }
}
</style>
