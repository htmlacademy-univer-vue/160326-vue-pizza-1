import { defineStore } from "pinia";
import { useDataStore } from "@/stores/data";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    id: 1,
    name: "Max",
    email: "max@max.max",
    avatar: "max.jpg",
    phone: "+79997777777",
    orders: [],
  }),
  getters: {
    getAddresses: (state) => {
      const data = useDataStore();
      return data.addresses.filter((item) => item.userId === state.id) ?? [];
    },
  },
  actions: {
    deleteOrder(id) {
      this.orders = this.orders.filter((order) => order.id !== id);
    },
    makeOrder(order) {
      this.orders.push(order);
    },
  },
});
