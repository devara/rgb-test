<template>
  <img
    v-if="asset"
    :src="asset"
    alt="product sale">
</template>

<script lang="ts" setup>
import SALE_NEW from '~/assets/images/sale-new.svg'
import SALE_BEST from '~/assets/images/sale-best.svg'
import SALE_HOT from '~/assets/images/sale-hot.svg'
import type { SaleValue } from '~/api/types/product'

const props = defineProps({
  sale: {
    type   : String as PropType<SaleValue>,
    default: undefined,
  },
})

const asset = computed(() => {
  switch (props.sale) {
    case 'new': {
      return SALE_NEW
    }

    case 'best': {
      return SALE_BEST
    }

    case 'hot': {
      return SALE_HOT
    }

    default: {
      break
    }
  }
})
</script>
