<template>
  <span :class="classNames">
    {{ stock.label }}
  </span>
</template>

<script lang="ts" setup>
import type { Stock } from '~/api/types/product'

const props = defineProps({
  stock: {
    type   : Object as PropType<Stock>,
    default: () => ({} as Stock),
  },
})

const classNames = computed(() => {
  const results: string[] = ['stock']

  const stockValue: Stock['value'] = props.stock.value ?? 'sold-out'

  results.push(`stock--${stockValue}`)

  return results
})
</script>

<style lang="postcss">
.stock {
  @apply block font-semibold;

  &--in-stock {
    @apply text-green-500;
  }

  &--sold-out,
  &--running-low {
    @apply text-red-500;
  }
}
</style>
