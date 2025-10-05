import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";


export const useAuthStore = defineStore('auth',()=>{
    const token = ref(localStorage.getItem('token') || null)
    const user = ref(JSON.parse(localStorage.getItem('user')) || null)
    const isLoading = ref(false)
    const error = ref(null)
    
    const getMeError = ref(null)
    async function register(userData) {
        isLoading.value = true
        error.value = null


        try{
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, userData)
            token.value = res.data.token
            user.value = res.data.user
            localStorage.setItem('user', JSON.stringify(user.value))
            localStorage.setItem('token',token.value)
            return true
        }catch(err){
            error.value = err.error || 'register Failed'
            return false
        }finally{
            isLoading.value = false
        }
        
    }

    async function login(userData){
        isLoading.value = true
        error.value = null

        try{
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, userData)
            token.value = res.data.token
            user.value = res.data.user
            localStorage.setItem('user', JSON.stringify(user.value))
            localStorage.setItem('token',token.value)
            return true
        }catch(err){
            error.value = err.response?.data?.error || 'Login Failed'
            return false
        }finally{
            isLoading.value = false
        }
    }

    async function logout(){
        token.value = null
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }

    async function getMe() {
        if(!token){
            getMeError.value = "not login yet"
            return
        }
        try{
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/me`,{
                headers:{Authorization:`Bearer ${token}`}
            })
            return res.data
        }catch(err){
            getMeError.value = "get profile error"
        }
    }
    return {token,user,isLoading,error,register,login,logout,getMe,getMeError}
})