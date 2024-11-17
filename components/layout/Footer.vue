<template>
  <footer class="footer">
    <span class="footer__social">
      <a
        v-for="social in socials"
        :key="social.alt"
        :href="social.url"
        target="_blank">
        <img
          :src="`/images/icons/${social.icon}`"
          :alt="social.alt"
          class="w-auto h-6">
      </a>
    </span>

    <div class="footer__copyright">
      <span class="px-4">Terms & Condition</span>
      <span class="px-4">Copyright © 2018. All rights reserved. PT Radya Gita Bahagi</span>
    </div>
  </footer>
</template>

<script lang="ts" setup>
interface Social {
  alt: string,
  url: string,
  icon: string,
}
const socials: Social[] = [
  {
    alt : 'instagram',
    url : 'https://instagram.com',
    icon: 'ig.svg',
  },
  {
    alt : 'facebook',
    url : 'https://facebook.com',
    icon: 'fb.svg',
  },
  {
    alt : 'twitter',
    url : 'https://x.com',
    icon: 'twt.svg',
  },
]
</script>

<style lang="postcss">
.footer {
  @apply flex flex-col items-center justify-between px-6 py-8 bg-gray-800;
  @apply lg:px-12 md:flex-row max-md:space-y-6 md:space-x-4;

  &__social {
    @apply flex items-center space-x-8;
  }

  &__copyright {
    @apply flex flex-col items-center space-y-4 text-sm text-white divide-x-2;
    @apply md:space-y-0 md:space-x-4 max-md:divide-x-0 md:flex-row;
  }
}
</style>
