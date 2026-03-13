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
          <NuxtLink to="/admin" class="nav-link">Panel Admin</NuxtLink>
        </nav>
      </div>
    </header>

    <section class="hero">
      <div class="hero-content">
        <h1>Encuentra la Casa de tus Sueños</h1>
        <p>Villas de lujo, apartamentos modernos y casas acogedoras en las mejores ubicaciones.</p>
      </div>
    </section>

    <main class="main-content">
      <section class="filters-section">
        <div class="search-bar">
          <input v-model="searchInput" type="text" placeholder="Busca por ubicación o título...">
        </div>
        <div class="filter-controls">
          <select v-model="typeFilter">
            <option value="">Todos los Tipos</option>
            <option value="Apartamento">Apartamentos</option>
            <option value="Casa">Casas</option>
            <option value="Villa">Villas</option>
          </select>
          <select v-model="priceFilter">
            <option value="">Cualquier Precio</option>
            <option value="100000">Hasta 100k€</option>
            <option value="300000">Hasta 300k€</option>
            <option value="500000">Hasta 500k€</option>
            <option value="1000000">Hasta 1M€</option>
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
          <p>No hay propiedades que coincidan con tu búsqueda.</p>
        </div>
      </div>
    </main>
    
    <!-- Chatbot Component Placeholder -->
    <ChatAssistant />
  </div>
</template>
