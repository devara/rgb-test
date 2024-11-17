import { defineServer } from '@privyid/nhp/core'

export default defineServer([
  {
    name     : 'api',
    baseUrl  : '/api',
    targetUrl: process.env.API_BASE_URL,
  },
])
