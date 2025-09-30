import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuthStore } from "./auth";
import axios from "axios";

export const useUserStore = defineStore("user", () => {
  const auth = useAuthStore();
  const user = ref({});
  const isgettingUser = ref(false);
  const errUser = ref(null);

  const api = import.meta.env.VITE_BACKEND_URL;
  async function getAllUser() {
    if (!auth.token) {
      errUser.value = "Admin required";
      return;
    }
    isgettingUser.value = true;

    try {
      const res = await axios.get(`${api}/admin/users`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      user.value = res.data
      return res.data
    } catch (err) {
        errUser.value = err.response?.data?.error || "something went wrong";
    } finally {
      isgettingUser.value = false;
    }
  }
  return {isgettingUser, errUser,user,getAllUser}
});
