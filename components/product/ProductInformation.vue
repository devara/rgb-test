<template>
  <div class="information">
    <ul class="information__tabs">
      <li
        v-for="(item, i) in listTab"
        :key="i"
        :class="{
          'active': activeTab === i
        }"
        @click="setActiveTab(i, item)">
        <a>
          {{ item.title }}
        </a>
      </li>
    </ul>

    <div class="information__content">
      <ProductDesc
        v-if="activeTab === TabName.INFO"
        class="leading-8" />
      <div v-if="activeTab === TabName.REVIEW">
        ini reviews product
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { h } from 'vue-demi'
import type { Product } from '~/types/product'

interface TabItem {
  title: string,
  disabled?: boolean,
}

enum TabName {
  INFO = 0,
  REVIEW = 1,
}

const props = defineProps({
  product: {
    type   : Object as PropType<Product>,
    default: () => ({} as Product),
  },
})

const ProductDesc = () => h('div', { innerHTML: props.product.attributes.description })

const activeTab          = ref<number>(0)
const listTab: TabItem[] = [{ title: 'Product information' }, { title: 'Reviews' }]

function setActiveTab (index: number, tab: TabItem) {
  if (tab.disabled)
    return

  activeTab.value = index
}
</script>

<style lang="postcss">
.information {
  @apply flex flex-col;

  &__tabs {
    @apply flex items-center space-x-8 border-b;

    li {
      @apply pb-3 cursor-pointer;

      &.active {
        @apply text-green-300 border-b-2 border-b-green-300 cursor-default;
      }
    }
  }

  &__content {
    @apply py-4;
  }
}
</style>
