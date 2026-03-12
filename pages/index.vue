<script setup>
const { data: properties, refresh } = await useFetch('/api/properties');

const searchInput = ref('');
const typeFilter = ref('');
const priceFilter = ref('');

const filteredProperties = computed(() => {
  if (!properties.value) return [];
  return properties.value.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchInput.value.toLowerCase()) || 
                          p.location.toLowerCase().includes(searchInput.value.toLowerCase());
    const matchesType = typeFilter.value === '' || p.type === typeFilter.value;
    const matchesPrice = priceFilter.value === '' || p.price <= Number(priceFilter.value);
    
    return matchesSearch && matchesType && matchesPrice;
  });
});
</script>

<template>
  <div>
    <header class="app-header">
      <div class="header-inner">
        <div class="logo">
          <span class="logo-icon">🏠</span>
          <span class="logo-text">EstateFlow</span>
        </div>
        <nav>
          <NuxtLink to="/admin" class="nav-link">Admin Dashboard</NuxtLink>
        </nav>
      </div>
    </header>

    <section class="hero">
      <div class="hero-content">
        <h1>Find Your Dream Home</h1>
        <p>Luxury villas, modern apartments, and cozy houses in the best locations.</p>
      </div>
    </section>

    <main class="main-content">
      <section class="filters-section">
        <div class="search-bar">
          <input v-model="searchInput" type="text" placeholder="Search by location or title...">
        </div>
        <div class="filter-controls">
          <select v-model="typeFilter">
            <option value="">All Types</option>
            <option value="Apartment">Apartments</option>
            <option value="House">Houses</option>
            <option value="Villa">Villas</option>
          </select>
          <select v-model="priceFilter">
            <option value="">Any Price</option>
            <option value="100000">Up to €100k</option>
            <option value="300000">Up to €300k</option>
            <option value="500000">Up to €500k</option>
            <option value="1000000">Up to €1M</option>
          </select>
        </div>
      </section>

      <div class="property-grid">
        <PropertyCard 
          v-for="prop in filteredProperties" 
          :key="prop.id" 
          :property="prop" 
        />
        <div v-if="filteredProperties.length === 0" class="empty-state">
          <p>No properties match your criteria.</p>
        </div>
      </div>
    </main>
    
    <!-- Chatbot Component Placeholder -->
    <ChatAssistant />
  </div>
</template>
