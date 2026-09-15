<script setup lang="ts">
import { PAGE_SECTION_TYPE } from '#shared/types/landing-page'

const slug = String(useRoute().params.slug ?? '')

const { data, error } = await useFetch(`/api/landing-pages/${slug}`)

if (!data.value) {
  throw createError({
    statusCode: error.value?.statusCode ?? 404,
    statusMessage: `Landing page not found for slug "${slug}"`,
  })
}

const page = data.value

useSeoMeta({
  title: page.metaTitle,
  description: page.metaDescription,
})
</script>

<template>
  <main>
    <template v-for="(section, index) in page.sections" :key="index">
      <SectionHero
        v-if="section.type === PAGE_SECTION_TYPE.hero"
        :section="section"
      />
      <SectionBenefits
        v-else-if="section.type === PAGE_SECTION_TYPE.sectionBenefits"
        :section="section"
      />
      <SectionCta
        v-else-if="section.type === PAGE_SECTION_TYPE.ctaSection"
        :section="section"
      />
    </template>
  </main>
</template>
