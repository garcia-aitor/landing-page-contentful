import { PAGE_SECTION_TYPE, type Cta, type LandingPage, type PageSection } from '../../shared/types/landing-page'

type ContentfulEntry = {
  sys?: { contentType?: { sys?: { id?: string } } }
  fields?: Record<string, unknown>
}

function text(value: unknown) {
  if (typeof value !== 'string') {
    return undefined
  }

  const trimmed = value.trim()
  return trimmed || undefined
}

function asEntry(value: unknown): ContentfulEntry | undefined {
  if (!value || typeof value !== 'object' || !('fields' in value)) {
    return undefined
  }

  return value as ContentfulEntry
}

function mapCta(value: unknown): Cta | undefined {
  const entry = asEntry(value)
  const label = text(entry?.fields?.buttonLabel)
  if (!label) {
    return undefined
  }

  return {
    label,
    url: text(entry?.fields?.url),
    openInNewTab: entry?.fields?.openInNewTab === true,
  }
}

export function mapLandingPage(value: unknown): LandingPage | undefined {
  const page = asEntry(value)
  const slug = text(page?.fields?.slug)
  if (!slug) {
    return undefined
  }

  const sections: PageSection[] = []

  for (const rawSection of Array.isArray(page?.fields?.pageSections) ? page.fields.pageSections : []) {
    const section = asEntry(rawSection)
    const type = section?.sys?.contentType?.sys?.id
    const fields = section?.fields
    if (!type || !fields) {
      continue
    }

    if (type === PAGE_SECTION_TYPE.hero) {
      const headline = text(fields.headline)
      if (!headline) {
        continue
      }

      sections.push({
        type: PAGE_SECTION_TYPE.hero,
        headline,
        supportingCopy: text(fields.supportingCopy),
        cta: mapCta(fields.primaryCta),
      })
      continue
    }

    if (type === PAGE_SECTION_TYPE.sectionBenefits) {
      const items = (Array.isArray(fields.benefits) ? fields.benefits : [])
        .map((rawBenefit) => {
          const benefit = asEntry(rawBenefit)
          const title = text(benefit?.fields?.title)
          if (!title) {
            return undefined
          }

          return {
            title,
            description: text(benefit?.fields?.description),
          }
        })
        .filter((item) => item !== undefined)

      if (items.length === 0) {
        continue
      }

      sections.push({
        type: PAGE_SECTION_TYPE.sectionBenefits,
        heading: text(fields.sectionHeading),
        subheading: text(fields.sectionSubheading),
        items,
      })
      continue
    }

    if (type === PAGE_SECTION_TYPE.ctaSection) {
      const headline = text(fields.headline)
      if (!headline) {
        continue
      }

      sections.push({
        type: PAGE_SECTION_TYPE.ctaSection,
        headline,
        supportingCopy: text(fields.supportingCopy),
        cta: mapCta(fields.cta),
      })
    }
  }

  return {
    slug,
    metaTitle: text(page?.fields?.metaTitle),
    metaDescription: text(page?.fields?.metaDescription),
    sections,
  }
}
