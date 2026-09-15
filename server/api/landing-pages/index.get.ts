export default defineEventHandler(async () => {
  const client = createContentfulClient()
  const result = await client.getEntries({
    content_type: 'landingPage',
    select: ['fields.slug', 'fields.metaTitle'],
    limit: 100,
  })

  return result.items.flatMap((entry) => {
    const link = mapLandingPageLink(entry)
    return link ? [link] : []
  })
})
