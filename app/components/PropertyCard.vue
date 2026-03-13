<script setup>
defineProps({
  property: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="property-card" :data-id="property.id">
    <div class="property-image">
      <img :src="property.images[0] || 'https://placehold.co/600x400?text=House'" :alt="property.title">
      <div class="property-type-tag">{{ property.type }}</div>
    </div>
    <div class="property-content">
      <h3 class="property-title">{{ property.title }}</h3>
      <p class="property-loc">📍 {{ property.location }}</p>
      <div class="property-price">€{{ Number(property.price).toLocaleString('es-ES') }}</div>
      <div class="property-footer">
        <span>🛌 {{ property.features.beds }}</span>
        <span>🚿 {{ property.features.baths }}</span>
        <span>📐 {{ property.features.sqft }}m²</span>
      </div>
    </div>
  </div>
</template>
