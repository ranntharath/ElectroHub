import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import { ref } from "vue";
import axios from "axios";

export const useProductStore = defineStore('product', ()=>{

    const auth = useAuthStore()
    const response = ref({})

    const isLoading = ref(true)
    const isAdding = ref(false)
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
            isError.value = err.response?.data?.error || "something went wrong";
            
        }
        finally{
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
            errorGetProductById.value = err.response?.data?.error || "something went wrong";
        }finally{
            isGetProductById.value = false
        }
        
    }

    async function addNewProduct(product) {
        isAdding.value = true
        isError.value = null

        try{
            const res  = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/products`,product,{
                headers:{Authorization:`Bearer ${auth.token}`}
            })
            
            return res.data
        }catch(err){
            console.log(err)
            isError.value =err.response?.data?.error || "something went wrong";
        }finally{
            isAdding.value = false
        }
    }
    return {isAdding,isError,isLoading,response,getAllProduct,getProductById, addNewProduct, isGetProductById,errorGetProductById}
})