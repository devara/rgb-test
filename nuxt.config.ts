// https://nuxt.com/docs/api/configuration/nuxt-config
import process from 'node:process'

const sw = process.env.SW === 'true'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools         : { enabled: false },
  modules          : [
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
    '@nuxt-alt/proxy',
  ],
  css    : ['~/assets/css/tailwind.css', '~/assets/css/main.css'],
  postcss: {
    plugins: {
      'tailwindcss'        : {},
      'tailwindcss/nesting': {},
      'autoprefixer'       : {},
    },
  },
  runtimeConfig: {
    public: {
      pathGetProducts : '/v2/gifts',
      pathGetProduct  : '/v2/gifts/{id}',
      pathPostWishlist: '/v2/gifts/{id}/wishlist',
      // SEO values
      metaBaseTitle   : 'Find Your Best Phone',
      metaWebTitle    : 'Bahagi',
      metaDefaultImage: '',
      metaDefaultDesc : '',
    },
  },
  pwa: {
    strategies  : sw ? 'injectManifest' : 'generateSW',
    srcDir      : sw ? 'service-worker' : undefined,
    filename    : sw ? 'sw.ts' : undefined,
    registerType: 'autoUpdate',
    manifest    : {
      name       : 'Bahagi Phones',
      description: 'Find your best phone',
      theme_color: '#ffffff',
      lang       : 'en',
      icons      : [
        {
          src  : 'logo-64x64.png',
          sizes: '64x64',
          type : 'image/png',
        },
        {
          src  : 'logo-144x144.png',
          sizes: '144x144',
          type : 'image/png',
        },
        {
          src  : 'logo-192x192.png',
          sizes: '192x192',
          type : 'image/png',
        },
        {
          src  : 'logo-512x512.png',
          sizes: '512x512',
          type : 'image/png',
        },
      ],
    },
    workbox: {
      globPatterns    : ['**/*.{js,css,html,png,svg,ico}'],
      navigateFallback: undefined,
    },
    injectManifest: { globPatterns: ['**/*.{js,css,html,png,svg,ico}'] },
    client        : { installPrompt: true },
    devOptions    : {
      enabled                  : true,
      suppressWarnings         : true,
      navigateFallback         : '/',
      navigateFallbackAllowlist: [/^\/$/],
      type                     : 'module',
    },
  },
  app: {
    head: {
      charset : 'utf8',
      viewport: 'width=device-width, initial-scale=1',
      title   : `${process.env.NUXT_PUBLIC_META_BASE_TITLE ?? ''} | ${process.env.NUXT_PUBLIC_META_WEB_TITLE ?? ''}`,
      meta    : [
        { charset: 'utf8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name   : 'description',
          content: process.env.NUXT_PUBLIC_META_DEFAULT_DESC,
        },
        {
          property: 'og:type',
          content : 'website',
        },
      ],
    },
  },
  proxy: { proxies: { '/api': process.env.VITE_API_URL as string } },
})
