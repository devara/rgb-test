<template>
  <div class="rating">
    <span class="rating__stars">
      <template
        v-for="n in maxRating"
        :key="n">
        <img
          :src="showStar(n - 1)"
          class="rating__stars__star">
      </template>
    </span>
    <span>
      {{ product.attributes.numOfReviews }} reviews
    </span>
  </div>
</template>

<script lang="ts" setup>
import type { Product } from '~/api/types/product'
import FULL_STAR from '~/assets/images/star-100.svg'
import HALF_STAR from '~/assets/images/star-50.svg'
import ZERO_STAR from '~/assets/images/star-0.svg'

const props = defineProps({
  product: {
    type   : Object as PropType<Product>,
    default: () => ({} as Product),
  },
  maxRating: {
    type   : Number,
    default: 5,
  },
  rating: {
    type   : Number,
    default: 0,
  },
})

const ratingValues  = ref<number[]>([])
const currentRating = computed(() => props.product.attributes.rating ?? props.rating)

function generateRatings () {
  for (let i = 0; i < props.maxRating; i++) {
    let level = 0
    if (i < currentRating.value)
      level = (currentRating.value - i > 1) ? 100 : (currentRating.value - i) * 100

    ratingValues.value[i] = Math.round(level)
  }
}

function showStar (index: number) {
  const value = ratingValues.value.at(index) ?? 0

  if (value)
    return value === 100 ? FULL_STAR : HALF_STAR

  return ZERO_STAR
}

onMounted(() => {
  generateRatings()
})
</script>

<style lang="postcss">
.rating {
  --dev-star-width: 10px;

  @apply inline-flex items-center space-x-3;

  &__stars {
    @apply inline-flex space-x-2;

    &__star {
      @apply w-[var(--dev-star-width)] h-auto;
    }
  }
}
</style>
