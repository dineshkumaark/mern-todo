const routers = [
   {
      path: "/",
      redirect: "/auth",
      exact: true,
   },
   {
      component: "AuthLayout",
      path: "/auth",
      auth: false,
      exact: false,
      redirect: "/auth/login",
      childrens: [
         {
            component: "Login",
            path: "/login",
            auth: false,
            exact: true,
         },
      ],
   },
   {
      component: "MainLayout",
      path: "/home",
      auth: false,
      exact: false,
      childrens: [
         {
            component: "Todo",
            path: "/",
            auth: false,
            exact: true,
         },
      ],
   },
];

export default routers;
