import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import { ref } from "vue";
import axios from "axios";

export const useProductStore = defineStore('product', ()=>{

    const auth = useAuthStore()
    const response = ref({})

    const isLoading = ref(true)
    const isGetProductById = ref(false)

    const errorGetProductById = ref(null)
    const isError = ref(null)


    async function getAllProduct() {

        isLoading.value = true
        isError.value = null
        
        try{
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products`)
            response.value = res.data
        }catch(err){
            isError.value = err.error || "Failed to fetch products"
        }finally{
            isLoading.value = false
        }
    }

    async function getProductById(id){
        isGetProductById.value = true
        errorGetProductById.value = null

        try{
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products/${id}`)
            return res.data
        }catch(err){
            errorGetProductById.value = err.error || "Failed to fetch products"
        }finally{
            isGetProductById.value = false
        }
        
    }

    async function addNewProduct(product) {
        isLoading.value = true
        isError.value = null

        try{
            const res  = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/products`,product,{
                headers:{Authorization:`Bearer ${auth.token}`}
            })
            products.value.push(res.data)
        }catch(err){
            isError.value = err.error || "Add new product failed"
        }finally{
            isLoading.value = false
        }
    }
    return {isError,isLoading,response,getAllProduct,getProductById, addNewProduct, isGetProductById,errorGetProductById}
})