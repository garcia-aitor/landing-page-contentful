<script setup lang="ts">
import type { HeroSection } from '../../shared/types/landing-page'

defineProps<{
  section: HeroSection
}>()
</script>

<template>
  <header class="hero">
    <div class="hero__inner">
      <h1>{{ section.headline }}</h1>
      <p v-if="section.supportingCopy">{{ section.supportingCopy }}</p>
      <a
        v-if="section.cta"
        class="hero__cta"
        :href="section.cta.url || '#'"
        :target="section.cta.openInNewTab ? '_blank' : undefined"
        :rel="section.cta.openInNewTab ? 'noreferrer' : undefined"
      >
        {{ section.cta.label }}
      </a>
    </div>
  </header>
</template>

<style scoped>
.hero {
  background: #0b1630;
  color: #fff;
  text-align: center;
  padding: 4.5rem 1.25rem;
}

.hero__inner {
  max-width: 46rem;
  margin: 0 auto;
}

h1 {
  margin: 0 0 1.25rem;
  font-size: clamp(2rem, 6vw, 3.25rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.03em;
}

p {
  margin: 0 auto 2rem;
  max-width: 36rem;
  color: rgba(255, 255, 255, 0.72);
  font-size: 1rem;
  line-height: 1.65;
}

.hero__cta {
  display: inline-block;
  padding: 0.8rem 1.4rem;
  border-radius: 0.5rem;
  background: #00e39a;
  color: #032016;
  font-weight: 700;
  text-decoration: none;
}

.hero__cta:hover {
  background: #2affb3;
}

@media (min-width: 768px) {
  .hero {
    padding: 7rem 2rem;
  }

  p {
    font-size: 1.05rem;
  }
}
</style>
