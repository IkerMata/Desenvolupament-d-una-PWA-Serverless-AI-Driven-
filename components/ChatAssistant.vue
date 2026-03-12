<script setup>
const isOpen = ref(false);
const message = ref('');
const chatHistory = ref([
  { role: 'assistant', content: 'Hello! I am your EstateFlow assistant. How can I help you find your dream home today?' }
]);

const toggleChat = () => {
  isOpen.value = !isOpen.value;
};

const sendMessage = () => {
  if (!message.value.trim()) return;
  
  chatHistory.value.push({ role: 'user', content: message.value });
  
  // Simulate AI response
  setTimeout(() => {
    let response = "I'm looking into that for you. We have several great options in Marbella and Madrid.";
    if (message.value.toLowerCase().includes('marbella')) {
      response = "Marbella is a great choice! Our Modern Luxury Villa there is currently available for €1,250,000.";
    } else if (message.value.toLowerCase().includes('cheap') || message.value.toLowerCase().includes('price')) {
      response = "Our most affordable option right now is the Downtown Penthouse at €850,000.";
    }
    
    chatHistory.value.push({ role: 'assistant', content: response });
  }, 1000);
  
  message.value = '';
};
</script>

<template>
  <div class="chatbot-container" :class="{ 'is-open': isOpen }">
    <button class="chatbot-toggle" @click="toggleChat">
      <span v-if="!isOpen">💬</span>
      <span v-else>✖</span>
    </button>
    
    <div v-if="isOpen" class="chatbot-window">
      <div class="chatbot-header">
        <h3>EstateFlow Assistant</h3>
      </div>
      <div class="chatbot-messages">
        <div v-for="(msg, idx) in chatHistory" :key="idx" :class="['message', msg.role]">
          <div class="message-content">{{ msg.content }}</div>
        </div>
      </div>
      <div class="chatbot-input">
        <input v-model="message" @keyup.enter="sendMessage" type="text" placeholder="Ask me anything...">
        <button @click="sendMessage">Send</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chatbot-container {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
}

.chatbot-toggle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #4f46e5;
  color: white;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
}

.chatbot-window {
  position: absolute;
  bottom: 70px;
  right: 0;
  width: 320px;
  height: 400px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chatbot-header {
  background: #4f46e5;
  color: white;
  padding: 1rem;
}

.chatbot-messages {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.message {
  max-width: 80%;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  font-size: 0.9rem;
}

.message.assistant {
  align-self: flex-start;
  background: #f1f5f9;
  color: #1e293b;
}

.message.user {
  align-self: flex-end;
  background: #4f46e5;
  color: white;
}

.chatbot-input {
  padding: 1rem;
  border-top: 1px solid #e2e8f0;
  display: flex;
  gap: 0.5rem;
}

.chatbot-input input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
}

.chatbot-input button {
  background: #4f46e5;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}
</style>
