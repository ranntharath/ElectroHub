<template>
  <div>
    <input v-model="message" placeholder="Type your message..." />
    <button @click="sendToTelegram">Send to Bot</button>
    <p v-if="response">{{ response }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const message = ref('');
const response = ref('');

// Replace these with your actual values
const BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE';
const CHAT_ID = 'YOUR_CHAT_ID_HERE';

const sendToTelegram = async () => {
  if (!message.value) return;

  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(message.value)}&parse_mode=HTML`; // Use HTML for formatting if needed

    const res = await fetch(url, {
      method: 'GET', // Or 'POST' if you prefer
    });

    const data = await res.json();
    if (data.ok) {
      response.value = 'Message sent successfully!';
      message.value = ''; // Clear input
    } else {
      response.value = `Error: ${data.description}`;
    }
  } catch (error) {
    response.value = `Failed to send: ${error.message}`;
  }
};
</script>