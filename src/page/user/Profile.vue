<script setup>
import { onMounted, ref, watch } from "vue";
import { useProfileStore } from "../../stores/profile";

const avatarError = ref(false);

const roleColors = {
  admin: "bg-red-500",
  user: "bg-blue-500",
  moderator: "bg-green-500",
  guest: "bg-gray-500",
};
const isEditProfile = ref(false);

const profileStore = useProfileStore();
const profile = ref({});

const profileData = ref({
  name: "",
  phone: "",
  avatar: "",
});
watch(()=>isEditProfile.value,async () => {
  profile.value = await profileStore.getProfile();
  if (profile.value) {
    profileData.value.name = profile.value?.user?.name;
    profileData.value.phone = profile.value?.user?.phone;
    profileData.value.avatar = profile.value?.user?.avatar;
    
  }
  console.log(profile.value)
},{immediate:true});

async function handleUpdateProfile(e) {
  try{
    const update = await profileStore.updateProfile(profileData.value)
    if(!update){
      console.log("something went wrong");
    }
    window.location.reload();
  }catch(err){
    console.log(err)
  }

}
</script>

<template>
  <div class="min-h-screen bg-gray-100 py-10">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Profile Card -->
      <div
        class="max-w-md md:max-w-lg lg:max-w-xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden transition-transform transform"
      >
        <!-- Header Gradient -->
        <div class="bg-gradient-to-r from-blue-500 to-purple-600 h-32 relative">
          <div class="absolute top-4 right-4">
            <span
              class="bg-white bg-opacity-20 text-color-text text-xs px-2 py-1 rounded-full"
            >
              ID: {{ profile?.user?.id?.slice(-8) }}
            </span>
          </div>
        </div>

        <!-- Profile Section -->
        <div class="relative px-6 pb-6">
          <!-- Avatar -->
          <div class="flex justify-center -mt-16 mb-4">
            <div class="relative">
              <img
                v-if="!avatarError"
                :src="
                  profile?.user?.avatar ||
                  'https://www.google.com/url?sa=i&url=https%3A%2F%2Favatar-placeholder.iran.liara.run%2F&psig=AOvVaw3AsoqOzv4C9CUPnRjZ5gBA&ust=1757944702976000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCJCEg8C02I8DFQAAAAAdAAAAABAE'
                "
                :alt="profile?.user?.name"
                @error="avatarError = true"
                class="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
              />
              <div
                v-else
                class="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-gray-300 flex items-center justify-center text-xl font-bold text-gray-500"
              >
                {{
                  profile?.user?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                }}
              </div>

              <!-- Role Badge -->
              <div class="absolute -bottom-1 -right-1">
                <span
                  :class="roleColors[profile?.user?.role]"
                  class="text-xs font-semibold px-2 py-1 rounded-full text-white shadow-md transition-transform transform hover:scale-105"
                >
                  {{ profile?.user?.role.toUpperCase() }}
                </span>
              </div>
            </div>
          </div>

          <!-- User Name -->
          <div class="text-center mb-6">
            <h2 v-if="!isEditProfile" class="text-2xl font-bold text-gray-800">
              {{ profile?.user?.name }}
            </h2>
            <input
                  v-if="isEditProfile"
                  v-model="profileData.name"
                  type="text"
                  id="name"
                  placeholder="Name"
                  class="px-4 py-2 mb-2 text-center w-full rounded-lg border border-gray-300 focus:border-slate-300 focus:ring-2 focus:ring-slate-200 outline-none transition-all duration-200"
                />
            <p class="text-gray-500 text-sm capitalize">
              {{ profile?.user?.role }} Account
            </p>
          </div>

          <!-- Contact Info -->
          <div class="space-y-3">
            <!-- Email -->
            <div
              class="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div
                class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3"
              >
                <svg
                  class="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-600">Email</p>
                <p class="text-gray-900 truncate">{{ profile?.user?.email || "Enter your email"  }}</p>

              </div>
            </div>

            <!-- Phone -->
            <div
              class="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div
                class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3"
              >
                <svg
                  class="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-600">Phone</p>
                <p v-if="!isEditProfile" class="text-gray-900">{{ profile?.user?.phone || "Enter your number" }}</p>
                <input
                  v-if="isEditProfile"
                  v-model="profileData.phone"
                  type="text"
                  id="name"
                  placeholder="Phone"
                  class="px-4 py-2 w-full md:w-96 rounded-lg border border-gray-300 focus:border-slate-300 focus:ring-2 focus:ring-slate-200 outline-none transition-all duration-200"
                />
              </div>
            </div>

            <!-- Access Level -->
            <div
              class="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div
                class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3"
              >
                <svg
                  class="w-5 h-5 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-600">Access Level</p>
                <p class="text-gray-900 capitalize">
                  {{ profile?.user?.role }}
                </p>
              </div>
              
            </div>
            <input
                  v-if="isEditProfile"
                  v-model="profileData.avatar"
                  type="text"
                  id="name"
                  placeholder="Profile URl "
                  class="px-4 py-2 w-full  rounded-lg border border-gray-300 focus:border-slate-300 focus:ring-2 focus:ring-slate-200 outline-none transition-all duration-200"
                />
          </div>

          <!-- Action Buttons -->
          <div class="mt-6 flex flex-col sm:flex-row gap-3">
            <button v-if="!isEditProfile"
              @click="isEditProfile = !isEditProfile" 
              class="cursor-pointer flex-1 bg-primary-color text-white py-2 px-4 rounded-lg hover:bg-primary-color/90 transition-colors"
            >
              Edit Profile
            </button> 
            <button @click="isEditProfile = false" v-if="isEditProfile"
              class="cursor-pointer flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              @click="handleUpdateProfile"  v-if="isEditProfile"
              class="cursor-pointer flex-1 bg-primary-color text-white py-2 px-4 rounded-lg hover:bg-primary-color/90 transition-colors"
            >
              Save
            </button>
            <button  v-if="!isEditProfile"
              class="cursor-pointer flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
