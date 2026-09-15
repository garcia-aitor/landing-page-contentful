<script setup lang="ts">
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
  <pre>{{ JSON.stringify(data, null, 2) }}</pre>
</template>
