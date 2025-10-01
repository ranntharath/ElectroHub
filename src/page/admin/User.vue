
<script setup>
import { onMounted, ref } from 'vue';
import { useUserStore } from '../../stores/user';
import ComfirmDialog from '../../components/globals/ComfirmDialog.vue';
const userStore = useUserStore()


const showConfirm = ref(false)

onMounted(async()=>{
    await userStore.getAllUser()
})
function handleDelete() {
  showConfirm.value = false
   alert('Delete user feature is not available yet.');
}
function handleEdit(){
  alert("Edit user feature is not available yet")
}
</script>
<template>
  <!-- <div v-if="userStore.isgettingUser" class="max-w-full h-screen flex justify-center items-center">
      <LoadingComponent />
  </div> -->

    <div  class="grid grid-cols-1 lg:grid-cols-3 gap-4">
    <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Total Users</p>
          <p class="text-2xl font-bold text-gray-900">
            {{ userStore?.user?.pagination?.total }}
          </p>
        </div>
        <div class="p-3 rounded-full bg-blue-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide w-6 h-6 text-blue-600"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <circle cx="9" cy="7" r="4"></circle>
          </svg>
        </div>
      </div>

    </div>

        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Admin</p>
          <p class="text-2xl font-bold text-gray-900">
            {{userStore?.user?.stats?.[0]?.count}}
          </p>
        </div>
        <div class="p-3 rounded-full bg-blue-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide w-6 h-6 text-blue-600"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <circle cx="9" cy="7" r="4"></circle>
          </svg>
        </div>
      </div>

    </div>

        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Users</p>
          <p class="text-2xl font-bold text-gray-900">
            {{  userStore?.user?.stats?.[1]?.count}}
          </p>
        </div>
        <div class="p-3 rounded-full bg-blue-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide w-6 h-6 text-blue-600"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <circle cx="9" cy="7" r="4"></circle>
          </svg>
        </div>
      </div>

    </div>
    </div>

      <div class="  mt-4">
        <table class="w-full overflow-x-auto">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              
              <th class="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th class="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Email address</th>
              <th class="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th class="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Created date</th>
              <!-- <th class="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">User status</th> -->
              <th class="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="user in userStore.user?.users" :key="user.id" class="hover:bg-gray-50">
              
              <td class="py-4 px-6">
                <div class="flex items-center">
                  <img :src="user?.avatar" :alt="user?.name" class="w-8 h-8 rounded-full mr-3">
                  <span class="font-medium text-gray-900">{{ user?.name }}</span>
                </div>
              </td>
              <td class="py-4 px-6 text-gray-600">{{ user?.email }}</td>
              <td class="py-4 px-6 text-gray-600">{{ user?.role }}</td>
              <td class="py-4 px-6 text-gray-600">{{ user?.createdAt }}</td>

              <td class="py-4 px-6 flex items-center">
                <button @click="handleEdit" data-v-_v0_vue_="" class="cursor-pointer p-1.5 hover:bg-muted rounded-md transition-colors" title="Edit"><svg data-v-_v0_vue_="" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path data-v-_v0_vue_="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg></button>
                <!-- <button class="p-1.5"><i class="fa-solid fa-check text-xs text-green-500"></i></button> -->
                <button @click="showConfirm = true " data-v-_v0_vue_="" class="cursor-pointer p-1.5 hover:bg-muted rounded-md transition-colors" title="Delete"><svg data-v-_v0_vue_="" class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path data-v-_v0_vue_="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
              </td>
            </tr>
            
          </tbody>
        </table>
      </div>
<ComfirmDialog  :show="showConfirm"
  title="Confirm Delete"
  message="Are you sure you want to delete this user?"
  @cancel="showConfirm=false"
  @confirm="handleDelete"/>
</template>