<template>
  <div class="flex flex-col p-4 space-y-6 border rounded">
    <BaseCheckbox v-model="filters.highRating">
      Rating 4 ke atas
    </BaseCheckbox>
    <BaseCheckbox v-model="filters.inStock">
      Stock tersedia
    </BaseCheckbox>
  </div>
</template>

<script lang="ts" setup>
const { filters } = storeToRefs(useProductStore())
</script>
