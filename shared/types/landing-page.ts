export type Cta = {
  label: string
  url?: string
  openInNewTab: boolean
}

export type HeroSection = {
  type: 'hero'
  headline: string
  supportingCopy?: string
  cta?: Cta
}

export type Benefit = {
  title: string
  description?: string
}

export type BenefitsSection = {
  type: 'sectionBenefits'
  heading?: string
  subheading?: string
  items: Benefit[]
}

export type CtaSection = {
  type: 'ctaSection'
  headline: string
  supportingCopy?: string
  cta?: Cta
}

export type PageSection = HeroSection | BenefitsSection | CtaSection

export type LandingPage = {
  slug: string
  metaTitle?: string
  metaDescription?: string
  sections: PageSection[]
}
