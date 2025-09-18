import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuthStore } from "./auth";
import debounce from "lodash.debounce";
export const useCartStore = defineStore("cart", () => {
  const auth = useAuthStore();
  const cartCound = ref(0);

  const cartData = ref({});

  const api = import.meta.env.VITE_BACKEND_URL;

  const isLoading = ref(true);
  const isUpdate = ref(false)

  const updateError = ref(null)
  const error = ref(null);
  const addCartError = ref(null);

  async function addTocart(productId, quantity) {
    if (!auth.token) {
      addCartError.value = "login first";
      return;
    }
    isLoading.value = true;
    addCartError.value = null;

    try {
      const res = await axios.post(
        `${api}/cart`,
        { productId, quantity },
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      cartCound.value = res.data?.cart?.items?.length;
      return res.data;
    } catch (err) {
      
      addCartError.value = err.response?.data?.error || "add to cart failed";
      console.log(addCartError.value)
    } finally {
      isLoading.value = false;
    }
  }

  const updateQty = debounce(
    async (productId, quantity) => {
      isUpdate.value = true
      updateError.value = null;
      try {
        const res = await axios.put(
          `${api}/cart`,
          { productId, quantity },
          {
            headers: { Authorization: `Bearer ${auth.token}` },
          }
        );
        cartData.value = res.data;
        return res.data
      } catch (err) {
        updateError.value = err.response?.data?.error || "Update failed";
  
      } finally {
        isUpdate.value = false;
      }
    },
    1000 // wait 500ms after last call
  );

  async function getCart() {
    if (!auth.token) {
      return;
    }
    isLoading.value = true;
    error.value = null;

    try {
      const res = await axios.get(`${api}/cart`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      cartCound.value = res.data?.cart?.items?.length;
      return res.data;
    } catch (err) {
      error.value = err.response?.data?.error || "Cant get carts";
    } finally {
      isLoading.value = false;
    }
  }
  async function removeFromCart(id) {
    isLoading.value = true;
    error.value = null;

    try {
      const res = await axios.delete(`${api}/cart/${id}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
    } catch (err) {
      error.value = err.response?.data?.error || "remove failed";
    } finally {
      isLoading.value = false;
    }
  }
  return {
    isLoading,
    error,
    cartCound,
    addTocart,
    getCart,
    addCartError,
    removeFromCart,
    updateQty,
    cartData,
    isUpdate,
    updateError
  };
});
