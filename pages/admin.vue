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
      type: 'Apartment',
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
  console.log('Saving property:', currentProp.value);
  closeModal();
  alert('Property saved (Simulation)! In a real serverless app, this would call a POST/PUT endpoint.');
};

const deleteProperty = (id) => {
  if (confirm('Are you sure you want to delete this property?')) {
    alert('Property deleted (Simulation)!');
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
          <NuxtLink to="/" class="nav-link">View Public Site</NuxtLink>
        </nav>
      </div>
    </header>

    <main class="main-content">
      <section class="admin-actions">
        <h2>Properties Management</h2>
        <button @click="openModal()" class="btn btn-primary">+ Add New Property</button>
      </section>

      <section class="admin-list-container">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="prop in properties" :key="prop.id">
              <td><img :src="prop.images[0] || 'https://placehold.co/600x400?text=No+Image'" alt="" class="admin-thumb"></td>
              <td><strong>{{ prop.title }}</strong></td>
              <td>€{{ Number(prop.price).toLocaleString() }}</td>
              <td>{{ prop.type }}</td>
              <td><span class="status-badge" :class="prop.status.toLowerCase()">{{ prop.status }}</span></td>
              <td>
                <button @click="openModal(prop)" class="btn-edit" title="Edit">✏️</button>
                <button @click="deleteProperty(prop.id)" class="btn-delete" title="Delete">🗑️</button>
              </td>
            </tr>
            <tr v-if="!properties || properties.length === 0">
              <td colspan="6" class="text-center">No properties found.</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>

    <!-- Modal for Add/Edit -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h2>{{ currentProp.id ? 'Edit Property' : 'Add Property' }}</h2>
        <form @submit.prevent="saveProperty">
          <div class="form-group">
            <label>Title</label>
            <input v-model="currentProp.title" type="text" required>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Price (€)</label>
              <input v-model="currentProp.price" type="number" required>
            </div>
            <div class="form-group">
              <label>Type</label>
              <select v-model="currentProp.type">
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Villa">Villa</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label>Location</label>
            <input v-model="currentProp.location" type="text" required>
          </div>
          <div class="form-group">
            <label>Image URL</label>
            <input v-model="currentProp.image" type="url" placeholder="https://example.com/photo.jpg">
          </div>
          <div class="modal-actions">
            <button type="button" class="btn btn-ghost" @click="closeModal">Cancel</button>
            <button type="submit" class="btn btn-primary">Save Property</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Specific admin styles can be scoped here or kept in global main.css */
</style>
