<script setup>
import { computed, ref, watch } from "vue";
import CartProduct from "../../components/CartPageComponents/CartProduct.vue";
import { useCartStore } from "../../stores/cart";
import { useOrderStore } from "../../stores/order";
import { useToast } from "vue-toastification";

const toast = useToast();
const cartStore = useCartStore();
const orderStore = useOrderStore();

const getUserCart = ref({});
const orderData = ref({
  id:"",
  shippingAddress: {
    city: "",
    email: "",
    name: "",
    telegramPhone: "",
  },
  totalAmount: 0,
  items: [],
});


watch(()=>cartStore.cartData, async ()=>{
  getUserCart.value = await cartStore.getCart()
},{
  immediate:true
})
const carts = computed(() => getUserCart.value?.cart?.items);

async function HandlecreateOrder(e) {
  e.preventDefault();
  try {
    const order = await orderStore.createOrder(orderData.value);
    if (order && order.order) {
      orderData.value.id = order.order._id

      orderData.value.items = order.order.items;
      orderData.value.totalAmount = order.order.totalAmount;
      const send = await orderStore.sendOrder(orderData.value);
      if (send) { 
        toast.success("Sent to email", { timeout: 2000 });
      }
      setTimeout(() => {
        window.location.reload();
      }, 2100);
    } else {
      alert("Order creation failed. Please try again.");
    }
  } catch (error) {
    console.error("Error creating order:", error);
    alert("Something went wrong. Please try again.");
  }
}
</script>

<template>
  <section class="section text-color-text">
    <div class="flex flex-col md:flex-row justify-between items-center p-2">
      <div class="w-full md:w-fit mb-4 md:mb-0">
        <h2 class="font-bold">Shopping Cart</h2>
        <p>{{ cartStore.cartCound }} items in your cart</p>
      </div>
      <RouterLink to="/product" class="w-full md:w-fit">
        <button
          class="w-full flex justify-center items-center bg-white text-color-text shadow-md border border-gray-200 px-5 py-1.5 rounded-sm hover:bg-secondary-color hover:text-white hover:border-secondary-color transition-all ease-in-out duration-200"
        >
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
            class="lucide lucide-arrow-left h-4 w-4 mr-2"
          >
            <path d="m12 19-7-7 7-7"></path>
            <path d="M19 12H5"></path>
          </svg>
          <p>Continue Shopping</p>
        </button>
      </RouterLink>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-10">
      <div class="lg:col-span-2 space-y-4">
        <CartProduct
          v-for="cart in carts"
          :key="cart.productId"
          :name="cart?.product?.name"
          :id="cart?.product?._id"
          :product-id="cart.productId"
          :image="cart?.product?.images[0] || null"
          :price="cart?.product?.price"
          :qty="cart?.quantity"
        />
      </div>
      <div
        v-if="cartStore.cartCound == 0"
        class="text-center w-full col-span-3 h-full"
      >
        <p class="text-4xl my-10">HAVE NO PRODUCT IN CART</p>
      </div>
      <div
        v-if="cartStore.cartCound != 0"
        class="bg-primary-light p-4 rounded-md space-y-6 border shadow border-slate-200 h-fit"
      >
        <h3 class="text-xl font-bold">Order Summary</h3>

        <div>
          <p class="text-sm flex justify-between items-center">
            <span>Subtotal ({{ cartStore.cartCound }} items)</span>
            <span>${{ getUserCart?.total }}</span>
          </p>
          <p class="text-sm flex justify-between items-center">
            <span>Delivery</span>
            <span>$0.00</span>
          </p>
          <p class="text-sm flex justify-between items-center">
            <span>Tax</span>
            <span>$0.00</span>
          </p>
        </div>
        <hr class="text-slate-300" />
        <div class="flex justify-between items-center">
          <h3 class="text-xl font-bold">Total</h3>
          <h3 class="text-xl font-bold text-primary-color">${{ getUserCart?.cart?.total }}</h3>
        </div>
        <form class="space-y-4">
          <input
            v-model="orderData.shippingAddress.name"
            type="text"
            placeholder="Name"
            class="p-2 w-full rounded-md ring-1 ring-slate-400 focus:outline-primary-color"
            required
          />
          <input
            v-model="orderData.shippingAddress.email"
            type="email"
            placeholder="Email"
            class="p-2 w-full rounded-md ring-1 ring-slate-400 focus:outline-primary-color"
            required
          />
          <input
            v-model="orderData.shippingAddress.city"
            type="text"
            placeholder="City"
            class="p-2 w-full rounded-md ring-1 ring-slate-400 focus:outline-primary-color"
            required
          />
          <input
            v-model="orderData.shippingAddress.telegramPhone"
            type="text"
            placeholder="Telegram Number"
            class="p-2 w-full rounded-md ring-1 ring-slate-400 focus:outline-primary-color"
            required
          />
          <button
            type="submit"
            @click="HandlecreateOrder"
            class="bg-primary-color hover:bg-primary-color/90 text-white px-5 py-2 rounded-md w-full"
          >
            {{ orderStore.isSending ? "Send...." : "Order and send to Email" }}
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
