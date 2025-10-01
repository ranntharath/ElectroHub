import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import { ref } from "vue";
import axios from "axios";

export const useProductStore = defineStore("product", () => {
  const auth = useAuthStore();
  const response = ref({});

  const isLoading = ref(true);
  const isAdding = ref(false);
  const isDelete = ref(false);
  const isEdit = ref(false);
  const isGetProductById = ref(false);

  const errorGetProductById = ref(null);
  const isError = ref(null);
  const errorDelete = ref(null);
  const editError = ref(null);

  async function getAllProduct() {
    isLoading.value = true;
    isError.value = null;

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/products`
      );
      response.value = res.data;
    } catch (err) {
      isError.value = err.response?.data?.error || "something went wrong";
    } finally {
      isLoading.value = false;
    }
  }

  async function getProductById(id) {
    isGetProductById.value = true;
    errorGetProductById.value = null;

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/products/${id}`
      );
      return res.data;
    } catch (err) {
      errorGetProductById.value =
        err.response?.data?.error || "something went wrong";
    } finally {
      isGetProductById.value = false;
    }
  }

  async function addNewProduct(product) {
    isAdding.value = true;
    isError.value = null;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/products`,
        product,
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );

      return res.data;
    } catch (err) {
      console.log(err);
      isError.value = err.response?.data?.error || "something went wrong";
    } finally {
      isAdding.value = false;
    }
  }
  async function deleteProduct(id) {
    isDelete.value = true;
    errorDelete.value = null;

    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/products/${id}`,
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );

      return res.data;
    } catch (err) {
      console.log(err);
      errorDelete.value = err.response?.data?.error || "something went wrong";
    } finally {
      isDelete.value = false;
    }
  }

  async function editProduct(id, product) {
    isEdit.value = true;
    editError.value = null;

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/products/${id}`,
        product,
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );

      return res.data;
    } catch (err) {
      console.log(err);
      editError.value = err.response?.data?.error || "something went wrong";
    } finally {
      isEdit.value = false;
    }
  }
  return {
    isAdding,
    isError,
    isLoading,
    isEdit,
    editError,
    response,
    getAllProduct,
    getProductById,
    addNewProduct,
    isGetProductById,
    errorGetProductById,
    deleteProduct,
    isDelete,
    errorDelete,
    editProduct

  };
});
