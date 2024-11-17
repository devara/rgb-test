<template>
  <label
    class="relative inline-flex items-center justify-between space-x-2 cursor-pointer"
    @click.self="toggle">
    <span class="flex-grow">
      <slot />
    </span>
    <input
      v-model="model"
      type="checkbox"
      :checked="model"
      class="cursor-pointer">
  </label>
</template>

<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type   : Boolean,
    default: false,
  },
})

defineEmits<{
  'update:modelValue': [boolean],
}>()

const model = useModel(props, 'modelValue')

function toggle () {
  model.value = !model.value
}
</script>
