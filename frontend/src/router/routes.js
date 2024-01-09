export default [
  {
    path: "/",
    name: "HomeView",
    component: () => import("../views/HomeView.vue"),
    meta: { layout: "DefaultLayout" },
  },
  {
    path: "/cart",
    name: "CartView",
    component: () => import("../views/CartView.vue"),
    meta: { layout: "DefaultLayout" },
  },
  {
    path: "/login",
    name: "LoginView",
    component: () => import("../views/LoginView.vue"),
    meta: { layout: "SimpleLayout" },
  },
  {
    path: "/profile",
    name: "ProfileView",
    component: () => import("../views/ProfileView.vue"),
    meta: { layout: "DefaultLayout" },
    children: [
      {
        path: "info",
        name: "UserView",
        component: () => import("../views/UserView.vue"),
      },
      {
        path: "orders",
        name: "OrdersView",
        component: () => import("../views/OrdersView.vue"),
      },
    ],
  },
];
