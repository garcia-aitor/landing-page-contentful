<script setup lang="ts">
import type { CtaSection } from '#shared/types/landing-page'

defineProps<{
  section: CtaSection
}>()
</script>

<template>
  <section class="cta-section">
    <div class="cta-section__inner">
      <h2>{{ section.headline }}</h2>
      <p v-if="section.supportingCopy">{{ section.supportingCopy }}</p>
      <CtaButton v-if="section.cta" :cta="section.cta" />
    </div>
  </section>
</template>

<style scoped>
.cta-section {
  background: #0b1630;
  color: #fff;
  text-align: center;
  padding: 4rem 1.25rem;
}

.cta-section__inner {
  max-width: 40rem;
  margin: 0 auto;
}

h2 {
  margin: 0 0 1.5rem;
  font-size: clamp(1.6rem, 4vw, 2.35rem);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.03em;
}

p {
  margin: 0 auto 1.5rem;
  color: rgba(255, 255, 255, 0.72);
  font-size: 1rem;
  line-height: 1.6;
}

@media (min-width: 768px) {
  .cta-section {
    padding: 5rem 2rem;
  }
}
</style>
