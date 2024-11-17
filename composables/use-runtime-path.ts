import { type PublicRuntimeConfig } from 'nuxt/schema'

type RuntimePathConfig = keyof {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [K in keyof PublicRuntimeConfig as K extends `path${infer _}` ? K : never]: string
}

/**
 * Get url path from Runtime config
 * @param path
 * @param params
 * @example
 *
 * getPath('pathgetProducts')
 * getPath('pathgetProduct', { id: 1 })
 */
export function getPath (path: RuntimePathConfig, params: Record<string, any> = {}) {
  let url = useRuntimeConfig().public[path as keyof PublicRuntimeConfig] as string

  for (const key in params)
    url = url.replaceAll(`{${key}}`, params[key])

  return url
}
