import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuthStore } from "./auth";

export const useProfileStore = defineStore('profile',()=>{
      
    const auth = useAuthStore()
    const profile = ref({})

    const isLoading = ref(false)
    const error = ref(null)

    const api = import.meta.env.VITE_BACKEND_URL;


    async function getProfile() {
        if (!auth.token) {
      
      return;
    }
        isLoading.value = true;
        error.value = null;

        try {
            const res = await axios.get(`${api}/users/profile`,{
                headers: { Authorization: `Bearer ${auth.token}` },
            });
            profile.value = res.data
            return res.data
        } catch (err) {
            console.log(err)
            error.value = err.response?.data?.error || "something went wrong";
        } finally {
            isLoading.value = false;
        }
    }
    async function updateProfile(profileData) {
        isLoading.value = true;
        error.value = null;

        try {
            const res = await axios.put(`${api}/users/profile`,profileData,{
                headers: { Authorization: `Bearer ${auth.token}` },
            });
            return res.data;
        } catch (err) {
            console.log(err)
            error.value = err.response?.data?.error || "something went wrong";
        } finally {
            isLoading.value = false;
        }
    }

    async function updateProfile(profileData) {
        isLoading.value = true
        error.value = null

        try{
            const res = await axios.put(`${api}/users/profile`,profileData,{
                headers:{Authorization: `Bearer ${auth.token}`}
            })
            return res.data
        }catch(err){
            error.value = err.response?.data?.error || "something went wrong";
        }finally{
            isLoading.value = false
        }
        
    }
    return {profile,isLoading,error,getProfile,updateProfile,updateProfile}
})