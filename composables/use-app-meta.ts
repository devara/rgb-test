import { joinURL } from 'ufo'

type MetaImageType = 'image/jpeg' | 'image/gif' | 'image/png'

export function useAppMeta () {
  const url     = useRequestURL()
  const baseURL = useRuntimeConfig().app.baseURL

  const {
    metaBaseTitle,
    metaWebTitle,
    metaDefaultImage,
    metaDefaultDesc,
  } = useRuntimeConfig().public

  function getMetaTitle (title?: string) {
    const result: string[] = [metaWebTitle]

    result.unshift(title ?? metaBaseTitle)

    return result.join(' | ')
  }

  function getMetaDescription (desc?: string) {
    if (desc)
      return desc.match(/<p>(.*?)<\/p>/)?.at(1) ?? desc

    return metaDefaultDesc
  }

  function getMetaUrl (path?: string, slug?: string) {
    const origin = import.meta.server
      ? url.origin
      : window.location.origin
    return joinURL(origin, baseURL, path ?? '', slug ?? '')
  }

  function getMetaImageUrl (path?: string) {
    return path ?? metaDefaultImage
  }

  function getMetaImageType (path: string): MetaImageType {
    const result: string[] = ['image']

    const type = /(?:\.([^.]+))?$/.exec(path)?.at(-1) ?? 'jpg'
    result.push(type)

    return result.join('/') as MetaImageType
  }

  return {
    getMetaTitle,
    getMetaDescription,
    getMetaUrl,
    getMetaImageUrl,
    getMetaImageType,
  }
}
