<script setup lang="ts">
import type { BenefitsSection } from '../../shared/types/landing-page'

defineProps<{
  section: BenefitsSection
}>()
</script>

<template>
  <section class="benefits">
    <div class="benefits__inner">
      <h2 v-if="section.heading">{{ section.heading }}</h2>
      <p v-if="section.subheading" class="benefits__sub">{{ section.subheading }}</p>
      <ul>
        <li v-for="item in section.items" :key="item.title">
          <h3>{{ item.title }}</h3>
          <p v-if="item.description">{{ item.description }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.benefits {
  background: #f4f6f8;
  padding: 4rem 1.25rem;
}

.benefits__inner {
  max-width: 68rem;
  margin: 0 auto;
}

h2 {
  margin: 0 0 2.5rem;
  color: #0b1630;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 800;
  text-align: center;
}

.benefits__sub {
  margin: -1.5rem auto 2.5rem;
  max-width: 36rem;
  color: #5b6475;
  text-align: center;
}

ul {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

li {
  padding: 1.75rem 1.5rem;
  border-radius: 0.9rem;
  background: #fff;
  box-shadow: 0 8px 24px rgba(11, 22, 48, 0.06);
}

h3 {
  margin: 0 0 0.65rem;
  color: #0b1630;
  font-size: 1.15rem;
  font-weight: 800;
  line-height: 1.3;
}

li p {
  margin: 0;
  color: #5b6475;
  font-size: 0.95rem;
  line-height: 1.55;
}

@media (min-width: 768px) {
  .benefits {
    padding: 5rem 2rem;
  }

  ul {
    grid-template-columns: repeat(3, 1fr);
    align-items: stretch;
  }
}
</style>
