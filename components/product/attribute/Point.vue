<template>
  <label class="points">
    <slot name="icon">
      <img
        src="/images/icons/point-solid.svg"
        class="points__icon">
    </slot>
    <span>{{ points }} points</span>
  </label>
</template>

<script lang="ts" setup>
defineProps({
  points: {
    type   : Number,
    default: 0,
  },
})
</script>

<style lang="postcss">
.points {
  --dev-point-width: 10px;

  @apply inline-flex space-x-2 text-[#74b71b] items-center;

  &__icon {
    @apply w-[var(--dev-point-width)] h-auto;
  }
}
</style>
