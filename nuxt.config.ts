// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: true,
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
    },
  },
  runtimeConfig: {
    contentful: {
      spaceId: '',
      environment: 'master',
      accessToken: '',
    },
  },
})
