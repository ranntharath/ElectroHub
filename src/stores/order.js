import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import { ref } from "vue";
import axios from "axios";
import emailjs from '@emailjs/browser';

export const useOrderStore = defineStore("order", () => {
  const auth = useAuthStore();


  const isLoading = ref(false);
  const isSending = ref(false)
  const errorSend = ref(null)
  const error = ref(null);
  
  const api = import.meta.env.VITE_BACKEND_URL;

  async function createOrder(orderData) {
    isLoading.value = true;
    error.value = null;
    try {
      const res = await axios.post(`${api}/orders`,orderData,{
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      return res.data;
    } catch (err) {
      console.log(err)
      error.value = err.response?.data?.error || "crate order failed";
    } finally {
      isLoading.value = false;
    }
  }





const sendOrder = async (orderData) => {
  const EMAIL_SERVICE_ID = import.meta.env.VITE_EMAIL_SERVICE_ID
  const EMAIL_TEMPLATE_ID = import.meta.env.VITE_EMAIL_TEMPLATE_ID
  const EMAIL_PUBLIC_KEY = import.meta.env.VITE_EMAIL_PUBLIC_KEY
  try {
    isSending.value =true
    // Convert items to HTML
    const itemsHTML = orderData.items
      .map(
        (item) => `
         <div style="margin-bottom: 10px;">
        <img src="${item.images[0]}" alt="${item.productId}" width="100" style="display:block; margin-bottom:5px;"/>
        <strong>${item.productId}</strong><br/>
        Quantity: ${item.quantity}<br/>
        Price: $${item.price}<br/>
        Total Price : $${item.price * item.quantity}<br/>
      </div>
    `
      )
      .join("");

    const templateParams = {
      name: orderData?.shippingAddress?.name,
      email: orderData?.shippingAddress?.email,
      city: orderData?.shippingAddress?.city,
      telegramPhone: orderData?.shippingAddress?.telegramPhone,
      totalAmount: orderData?.totalAmount,
      items: itemsHTML,
    };

    const result = await emailjs.send(
      EMAIL_SERVICE_ID,
      EMAIL_TEMPLATE_ID,
      templateParams,
      EMAIL_PUBLIC_KEY
    );
    return result
    
  } catch (err) {
    console.error("Error sending order:", err);
    errorSend.value = err
  }finally{
    isSending.value = false
  }
};

  return {  createOrder,sendOrder, isLoading,error, isSending, errorSend };
});
