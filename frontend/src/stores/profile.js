import { defineStore } from "pinia";
import resources from "@/services/resources";
import {usePizzaStore} from "@/stores/pizza";
import {useDataStore} from "@/stores/data";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    id: null,
    name: "",
    email: "",
    avatar: "",
    phone: "",
    orders: [],
    addresses: [],
  }),
  getters: {
    getOrderAdress:(state)=>(order)=>{
      return state.addresses.find((item)=>item.id===order.addressId)
},
    getOrderPrice:(state) => (order)=>{
      const pizzaStore = usePizzaStore()
      const dataStore = useDataStore()
      const pizzasPrice = order.orderPizzas !== undefined ? order.orderPizzas.reduce(
        (sum, pizza) => sum + pizzaStore.pricePizzaSome(pizza) * pizza.quantity,
        0
      ):0;
      const miscPrice = order.orderMisc !== undefined ? order.orderMisc.reduce((sum, misc) => {
        if (misc !== undefined) {

          const dataMisc = dataStore.misc.find(
            (data_misc) => data_misc !== undefined && data_misc.id === misc.miscId
          );
          if (dataMisc) {
            return sum + dataMisc.price * misc.quantity;
          }
        }
        return sum;
      }, 0) : 0;
      return pizzasPrice + miscPrice
},
  },
  actions: {
    async deleteOrder(id) {
      await resources.order.removeOrder(id);
      await this.getOrders();
    },
    async makeOrder(order) {
      await resources.order.createOrder(order);
      console.log(order)
      await this.getOrders();
      await this.setAddresses();
    },
    async getOrders() {
      const data = await resources.order.getOrders();
      this.orders = data.data.filter(
        (order) => order.userId === this.id
      );
    },
    setOrders(orders) {
      this.orders = orders;
    },
    addUserData(user) {
      this.id = user.id;
      this.name = user.name;
      this.email = user.email;
      this.avatar = user.avatar;
      this.phone = user.phone;
    },
    resetUser() {
      this.id = null;
      this.name = "";
      this.email = "";
      this.avatar = "";
      this.phone = "";
      this.orders = [];
      this.addresses = [];
    },
    async setAddresses() {
      const data = await resources.address.getAddresses();
      this.addresses = data.data.filter(
        (address) => address.userId === this.id
      );
    },
    async addAddress(address) {
      const user = useProfileStore();
      const addressToAdd = {
        name: address.name,
        street: address.street,
        building: address.building,
        flat: address.flat,
        comment: address.comment,
        userId: user.id,
      };
      await resources.address.addAddresses(addressToAdd);
      await this.setAddresses();
    },
    async editAddress(address) {
      await resources.address.updateAddresses(address);
      await this.setAddresses();
    },
    async deleteAddress(address) {
      await resources.address.deleteAddresses(address.id);
      await this.setAddresses();
    },
  },
});
