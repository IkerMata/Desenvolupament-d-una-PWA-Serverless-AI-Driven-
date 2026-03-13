<script setup>
const isOpen = ref(false);
const message = ref('');
const isTyping = ref(false);
const chatHistory = ref([
  { role: 'assistant', content: '¡Hola! Soy tu asistente de EstateFlow. ¿Cómo puedo ayudarte a encontrar la casa de tus sueños hoy?' }
]);

const toggleChat = () => {
  isOpen.value = !isOpen.value;
};

const sendMessage = async () => {
  if (!message.value.trim() || isTyping.value) return;
  
  const userContent = message.value;
  chatHistory.value.push({ role: 'user', content: userContent });
  message.value = '';
  isTyping.value = true;
  
  try {
    const response = await $fetch('/api/chat', {
      method: 'POST',
      body: { 
        messages: chatHistory.value.slice(0, -1),
        message: userContent 
      }
    });

    if (response) {
      chatHistory.value.push(response);
    }
  } catch (err) {
    console.error('Error sending message:', err);
    chatHistory.value.push({ 
      role: 'assistant', 
      content: 'Lo siento, ha habido un error al procesar tu solicitud. ¿Podrías intentarlo de nuevo?' 
    });
  } finally {
    isTyping.value = false;
  }
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
        <h3>Asistente EstateFlow</h3>
      </div>
      <div class="chatbot-messages">
        <div v-for="(msg, idx) in chatHistory" :key="idx" :class="['message', msg.role]">
          <div class="message-content">{{ msg.content }}</div>
        </div>
        <div v-if="isTyping" class="message assistant typing">
          <div class="message-content italic text-gray-400">Escribiendo...</div>
        </div>
      </div>
      <div class="chatbot-input">
        <input 
          v-model="message" 
          @keyup.enter="sendMessage" 
          type="text" 
          placeholder="Pregúntame lo que quieras..."
          :disabled="isTyping"
        >
        <button @click="sendMessage" :disabled="isTyping || !message.trim()">
          {{ isTyping ? '...' : 'Enviar' }}
        </button>
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

.typing .message-content {
  font-style: italic;
  opacity: 0.7;
}

.chatbot-input input:disabled,
.chatbot-input button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
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
