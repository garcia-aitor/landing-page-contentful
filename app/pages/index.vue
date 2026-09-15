<script setup lang="ts">
const { data: pages } = await useFetch('/api/landing-pages')

useSeoMeta({
  title: 'Campaign landing pages',
})
</script>

<template>
  <main class="index">
    <h1>Campaign landing pages</h1>
    <ul v-if="pages?.length">
      <li v-for="page in pages" :key="page.slug">
        <NuxtLink :to="`/${page.slug}`">{{ page.title }}</NuxtLink>
      </li>
    </ul>
    <p v-else>No landing pages published yet.</p>
  </main>
</template>

<style scoped>
.index {
  max-width: 42rem;
  margin: 0 auto;
  padding: 4rem 1.25rem;
  color: #0b1630;
}

h1 {
  margin: 0 0 1.5rem;
  font-size: clamp(1.5rem, 4vw, 2rem);
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

li + li {
  margin-top: 0.75rem;
}

a {
  color: #0b1630;
}
</style>
