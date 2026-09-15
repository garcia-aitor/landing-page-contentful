import { createContentfulClient } from './contentful'
import { mapLandingPage } from './mapLandingPage'

export async function getLandingPage(slug: string) {
  const client = createContentfulClient()
  const result = await client.getEntries({
    content_type: 'landingPage',
    'fields.slug': slug,
    include: 3,
    limit: 1,
  })

  const entry = result.items[0]
  if (!entry) {
    return undefined
  }

  return mapLandingPage(entry)
}

