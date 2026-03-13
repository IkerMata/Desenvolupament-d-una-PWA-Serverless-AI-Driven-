<script setup>
const { data: properties, refresh } = await useFetch('/api/properties');

const showModal = ref(false);
const currentProp = ref({
  id: '',
  title: '',
  price: 0,
  type: 'Apartment',
  location: '',
  image: '',
  features: { beds: 0, baths: 0, sqft: 0 }
});

const openModal = (prop = null) => {
  if (prop) {
    currentProp.value = JSON.parse(JSON.stringify(prop));
    currentProp.value.image = prop.images[0] || '';
  } else {
    currentProp.value = {
      id: '',
      title: '',
      price: 0,
      type: 'Apartamento',
      location: '',
      image: '',
      features: { beds: 0, baths: 0, sqft: 0 }
    };
  }
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const saveProperty = async () => {
  // Simulate API save
  console.log('Guardando propiedad:', currentProp.value);
  closeModal();
  alert('Propiedad guardada (Simulación)! En una app serverless real, esto llamaría a un endpoint POST/PUT.');
};

const deleteProperty = (id) => {
  if (confirm('¿Estás seguro de que quieres eliminar esta propiedad?')) {
    alert('Propiedad eliminada (Simulación)!');
  }
};
</script>

<template>
  <div class="admin-body">
    <header class="app-header">
      <div class="header-inner">
        <div class="logo">
          <span class="logo-icon">🏠</span>
          <span class="logo-text">EstateFlow Admin</span>
        </div>
        <nav>
          <NuxtLink to="/" class="nav-link">Ver Sitio Público</NuxtLink>
        </nav>
      </div>
    </header>

    <main class="main-content">
      <section class="admin-actions">
        <h2>Gestión de Propiedades</h2>
        <button @click="openModal()" class="btn btn-primary">+ Añadir Propiedad</button>
      </section>

      <section class="admin-list-container">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Título</th>
              <th>Precio</th>
              <th>Tipo</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="prop in properties" :key="prop.id">
              <td><img :src="prop.images[0] || 'https://placehold.co/600x400?text=No+Image'" alt="" class="admin-thumb"></td>
              <td><strong>{{ prop.title }}</strong></td>
              <td>{{ Number(prop.price).toLocaleString('es-ES') }} €</td>
              <td>{{ prop.type }}</td>
              <td><span class="status-badge" :class="prop.status ? prop.status.toLowerCase() : ''">{{ prop.status }}</span></td>
              <td>
                <button @click="openModal(prop)" class="btn-edit" title="Editar">✏️</button>
                <button @click="deleteProperty(prop.id)" class="btn-delete" title="Eliminar">🗑️</button>
              </td>
            </tr>
            <tr v-if="!properties || properties.length === 0">
              <td colspan="6" class="text-center">No se han encontrado propiedades.</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>

    <!-- Modal for Add/Edit -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h2>{{ currentProp.id ? 'Editar Propiedad' : 'Añadir Propiedad' }}</h2>
        <form @submit.prevent="saveProperty">
          <div class="form-group">
            <label>Título</label>
            <input v-model="currentProp.title" type="text" required>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Precio (€)</label>
              <input v-model="currentProp.price" type="number" required>
            </div>
            <div class="form-group">
              <label>Tipo</label>
              <select v-model="currentProp.type">
                <option value="Apartamento">Apartamento</option>
                <option value="Casa">Casa</option>
                <option value="Villa">Villa</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label>Ubicación</label>
            <input v-model="currentProp.location" type="text" required>
          </div>
          <div class="form-group">
            <label>URL de Imagen</label>
            <input v-model="currentProp.image" type="url" placeholder="https://ejemplo.com/foto.jpg">
          </div>
          <div class="modal-actions">
            <button type="button" class="btn btn-ghost" @click="closeModal">Cancelar</button>
            <button type="submit" class="btn btn-primary">Guardar Propiedad</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Specific admin styles can be scoped here or kept in global main.css */
</style>
