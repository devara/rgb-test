<template>
  <button
    :class="classNames"
    @click.prevent="toggleWish">
    {{ model ? '&#x2665;' : '&#x2661;' }}
  </button>
</template>

<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type   : Boolean,
    default: false,
  },
})
const emit  = defineEmits(['update:modelValue', 'toggle'])

const model = useModel(props, 'modelValue')

const classNames = computed(() => {
  const results: string[] = ['wish']

  results.push(model.value ? 'wish--applied' : 'wish--not-applied')

  return results
})

function toggleWish () {
  emit('toggle')
}
</script>

<style lang="postcss">
.wish {
  @apply rounded-full;

  &--applied {
    @apply bg-red-600 text-white;
  }

  &--not-applied {
    @apply text-gray-300 border border-gray-300;
  }
}
</style>
