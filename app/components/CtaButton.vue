<script setup lang="ts">
import type { Cta } from '#shared/types/landing-page'

defineProps<{
  cta: Cta
}>()

const isFormOpen = ref(false)
</script>

<template>
  <a
    v-if="cta.url"
    class="cta"
    :href="cta.url"
    :target="cta.openInNewTab ? '_blank' : undefined"
    :rel="cta.openInNewTab ? 'noreferrer' : undefined"
  >
    {{ cta.label }}
  </a>
  <button v-else class="cta" type="button" @click="isFormOpen = true">
    {{ cta.label }}
  </button>

  <Teleport to="body">
    <div v-if="isFormOpen" class="modal" role="dialog" aria-modal="true" @click.self="isFormOpen = false">
      <div class="modal__box">
        <p>Insert hubspot form</p>
        <button type="button" class="modal__close" @click="isFormOpen = false">Close</button>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.cta {
  display: inline-block;
  padding: 0.8rem 1.4rem;
  border: 0;
  border-radius: 0.5rem;
  background: #00e39a;
  color: #032016;
  font: inherit;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
}

.cta:hover {
  background: #2affb3;
}

.modal {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 1.5rem;
  background: rgba(3, 8, 20, 0.72);
}

.modal__box {
  width: min(100%, 28rem);
  padding: 1.75rem;
  border-radius: 0.75rem;
  background: #fff;
  color: #0b1630;
  text-align: center;
}

.modal__box p {
  margin: 0 0 1.25rem;
  font-size: 1.1rem;
  font-weight: 600;
}

.modal__close {
  padding: 0.55rem 1rem;
  border: 0;
  border-radius: 0.4rem;
  background: #0b1630;
  color: #fff;
  font: inherit;
  cursor: pointer;
}
</style>
