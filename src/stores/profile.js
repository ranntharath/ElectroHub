import { defineStore } from "pinia";
import { ref } from "vue";

export const useProfileStore = defineStore('profile',()=>{
      
    const profile = ref()
    const isLoading = ref(false)
    const error = ref(null)

    const api = import.meta.env.VITE_BACKEND_URL;


    async function getProfile() {
        isLoading.value = true
        error.value = null


        try{

        }catch(err){
            error.value = err.response?.data?.error || "something went wrong";
        }finally{
            isLoading.value = false
        }

    }


})