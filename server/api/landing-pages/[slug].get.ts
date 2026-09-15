export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing slug' })
  }

  const client = createContentfulClient()
  const result = await client.getEntries({
    content_type: 'landingPage',
    'fields.slug': slug,
    include: 3,
    limit: 1,
  })

  const page = mapLandingPage(result.items[0])

  if (!page) {
    throw createError({
      statusCode: 404,
      statusMessage: `Landing page not found for slug "${slug}"`,
    })
  }

  return page
})
