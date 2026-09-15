import { createClient } from 'contentful'

export function createContentfulClient() {
  const { contentful } = useRuntimeConfig()
  const space = contentful.spaceId
  const accessToken = contentful.accessToken
  const environment = contentful.environment || 'master'

  if (!space || !accessToken) {
    throw new Error(
      'Missing Contentful config. Set NUXT_CONTENTFUL_SPACE_ID and NUXT_CONTENTFUL_ACCESS_TOKEN.',
    )
  }

  return createClient({
    space,
    accessToken,
    environment,
  })
}
