import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuthStore } from "./auth";
import axios from "axios";

export const useDashboardStore = defineStore('dashboard',()=>{
    const auth = useAuthStore()
    const isLoading = ref(false)
    const error = ref(null)

    const api = import.meta.env.VITE_BACKEND_URL;
    async function getDashboard() {
            if(!auth.token){
                error.value = "Unauthorize, login first"
                return
            }
            isLoading.value =true
            error.value = null
        try{
            const res = await axios.get(`${api}/admin/dashboard`,{
                headers:{Authorization:`Bearer ${auth.token}`}
            })
            return res.data
        }catch(err){
            error.value = err.response?.data?.error || "get dashboard failed";
        }finally{
            isLoading.value =false
        }

    }
    return {error,isLoading,getDashboard}
})