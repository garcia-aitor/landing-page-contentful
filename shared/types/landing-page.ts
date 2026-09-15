export const PAGE_SECTION_TYPE = {
  hero: "hero",
  sectionBenefits: "sectionBenefits",
  ctaSection: "ctaSection",
} as const;

export type Cta = {
  label: string;
  url?: string;
  openInNewTab: boolean;
};

export type HeroSection = {
  type: typeof PAGE_SECTION_TYPE.hero
  headline: string
  supportingCopy?: string
  cta?: Cta
}

export type Benefit = {
  title: string;
  description?: string;
};

export type BenefitsSection = {
  type: typeof PAGE_SECTION_TYPE.sectionBenefits;
  heading?: string;
  subheading?: string;
  items: Benefit[];
};

export type CtaSection = {
  type: typeof PAGE_SECTION_TYPE.ctaSection
  headline: string
  supportingCopy?: string
  cta?: Cta
}

export type PageSection = HeroSection | BenefitsSection | CtaSection;

export type LandingPage = {
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
  sections: PageSection[];
};
