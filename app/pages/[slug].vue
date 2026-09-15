<script setup lang="ts">
import { PAGE_SECTION_TYPE } from '../../shared/types/landing-page'
import { getLandingPage } from '../../server/utils/getLandingPage'

const slug = String(useRoute().params.slug ?? '')

const { data } = await useAsyncData(
  `landing-page-${slug}`,
  () => getLandingPage(slug),
)

if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `Landing page not found for slug "${slug}"`,
  })
}
</script>

<template>
  <main>
    <template v-for="(section, index) in data.sections" :key="index">
      <SectionHero
        v-if="section.type === PAGE_SECTION_TYPE.hero"
        :section="section"
      />
      <SectionBenefits
        v-else-if="section.type === PAGE_SECTION_TYPE.sectionBenefits"
        :section="section"
      />
    </template>
  </main>
</template>
