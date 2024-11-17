<template>
  <div class="flex flex-col min-h-screen">
    <LayoutNavbar />
    <div class="pt-4">
      <slot />
    </div>
    <LayoutFooter class="mt-auto" />
  </div>
</template>
