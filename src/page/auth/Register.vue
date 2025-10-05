<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
  const submit = useAuthStore()
  const route = useRouter()
  const toast = useToast()
  const userData = ref({
    name:"",
    email:"",
    password:"",
    cPassword: ""
  })
  async function handleSubmit(e){
    e.preventDefault()
    try{
      if(userData.value.password != userData.value.cPassword){
        toast.error("Comfirm password not match", {timeout:2000})
        
        return
      }
      
        const register =  await submit.register(userData.value)
        userData.value = {name:"", email:"", password: ""}
        if(register){
          route.push('/')
        }
        
    }catch(err){
      console.log("Register : " ,submit.error);
    }
  }

  function togglePassword() {
  const password = document.getElementById("password");
  console.log(password.type)
  if(password.type  == "password"){
    password.type = "text"
  }else{
    password.type = "password"
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div class="text-center">
        <h2 class="text-3xl font-bold text-primary-color mb-2">Create Account</h2>
        <p class="text-gray-600">Join us today and get started</p>
      </div>

      <!-- Form Container -->
      <form autocomplete="off" class="bg-white rounded-xl shadow-lg p-8 space-y-6">
        
        <!-- Username Field -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
            Username
          </label>
          <input
            id="name"
            name="name"
            type="text"
            v-model="userData.name"
            placeholder="Name"
            autocomplete="off"
            class="w-full px-4 py-3 border border-gray-300 outline-0 rounded-lg focus:ring-2 focus:ring-primary-color focus:border-primary-color transition-colors duration-200 text-gray-900 placeholder-gray-500"
          />
        </div>
        <!-- Email Address Field -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            v-model="userData.email"
            placeholder="Email"
            autocomplete="new-email"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg  transition-colors duration-200 text-gray-900 placeholder-gray-500 outline-0 focus:ring-2 focus:ring-primary-color focus:border-primary-color"
          />
        </div>

        <!-- Password Field -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div class="relative">
            <input
              id="password"
              name="password"
              type="password"
              v-model="userData.password"
              placeholder="Password"
              autocomplete="new-password"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg outline-0 focus:ring-2 focus:ring-primary-color focus:border-primary-color transition-colors duration-200 text-gray-900 placeholder-gray-500 pr-12"
            />
            <button
              type="button"
              class="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <svg class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
        </div>

        <div>
          <label for="cpassword" class="block text-sm font-medium text-gray-700 mb-2">
            Comfirm Password
          </label>
          <div class="relative">
            <input
              id="cpassword"
              name="cpassword"
              type="password"
              v-model="userData.cPassword"
              placeholder="Password"
              autocomplete="new-password"
              class=" w-full px-4 py-3 border border-gray-300 rounded-lg outline-0 focus:ring-2 focus:ring-primary-color focus:border-primary-color transition-colors duration-200 text-gray-900 placeholder-gray-500 pr-12"
            />
            <button
              type="button"
              class="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <svg class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
        </div>

        

        <!-- Create Account Button -->
        <button @click="handleSubmit"
          type="submit"
          class="w-full bg-primary-color hover:bg-primary-color/90 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2"
        >
          Create Account
        </button>

        <!-- Sign In Link -->
        <div class="text-center">
          <p class="text-sm text-gray-600">
            Already have an account? 
            <router-link to="/auth/login" class="text-primary-color hover:text-orange-600 font-medium transition-colors duration-200">
              Sign in
            </router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>
