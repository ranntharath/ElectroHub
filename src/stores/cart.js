import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuthStore } from "./auth";
import debounce from "lodash.debounce"
export const useCartStore = defineStore("cart", () => {
  const auth = useAuthStore();
  const cartCound = ref(0)
  const isLoading = ref(true);
  
  const api = import.meta.env.VITE_BACKEND_URL;

  const error = ref(null);
  const addCartError = ref(null)
  async function addTocart(productId, quantity) {
    if (!auth.token) {
      error.value = "login first";
      return
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
      cartCound.value = res.data?.cart?.items?.length
      return res.data;
    } catch (err) {
      addCartError.value = err.response?.data?.error || "add to cart failed";
    } finally {
      isLoading.value = false;
    }
  }

  const updateQty = debounce(
  async (productId,quantity) => {
    isLoading.value = true
      error.value = null
    console.log('put')
    try {
      
      const res = await axios.put(
        `${api}/cart`,
        { productId, quantity },
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      )
      console.log('put')
      
      
    } catch (err) {
      console.log(err)
      err.value = err.response?.data?.error || "Update failed"
    } finally {
      isLoading.value = false
    }
  },
  1000 // wait 500ms after last call
)

  async function getCart(){
    isLoading.value = true
    error.value = null

    try{
      const res = await axios.get(`${api}/cart`,{
        headers:{Authorization:`Bearer ${auth.token}`}
      })
      cartCound.value = res.data?.cart?.items?.length
      return res.data
    }catch(err){
      error.value = err.response?.data?.error || "Cant get carts";
    }finally{
      isLoading.value = false
    }

  }
  async function removeFromCart(id) {

    isLoading.value = true
    error.value = null

    try{
      const res = await axios.delete(`${api}/cart/${id}`,{
        headers:{Authorization: `Bearer ${auth.token}`}
      })
    }catch(err){
      error.value = err.response?.data?.error || "remove failed";
    }finally{
        isLoading.value = false
    }
    
  }
  return { isLoading, error,cartCound, addTocart,getCart,addCartError,removeFromCart ,updateQty};
});
