import Vue from 'vue';
import VueRouter from 'vue-router';

// 引入vue的helloWorld元件
// import HelloWorld from '@/components/HelloWorld';
import Login from '@/components/pages/login';
import Dashboard from '@/components/Dashboard';
import Products from '@/components/pages/Products';
import CustomerOrder from '@/components/pages/CustomerOrder';
import CustomerCheckout from '@/components/pages/CustomerCheckout';
import Orders from '@/components/pages/OrderList';
import Coupon from '@/components/pages/Coupon';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        // {
        //     path: "/",
        //     name: "HelloWorld",
        //     component: HelloWorld,
        //     meta: { requiresAuth: true }
        // },
        {
            path: "/login",
            name: "login",
            component: Login
        },
        {
            path: "/admin",
            name: "Dashboard",
            component: Dashboard,
            children: [
                {
                    path: 'products',
                    name: 'Products',
                    component: Products,
                    meta: { requiresAuth: true }
                },
                {
                    path: 'orders',
                    name: 'orders',
                    component: Orders,
                    meta: { requiresAuth: true }
                },
                {
                    path: 'coupon',
                    name: 'coupon',
                    component: Coupon,
                    meta: { requiresAuth: true }
                }
            ]
        },
        {
            path: "/",
            // redirect: "/login"
            // name: "Dashboard",
            component: Dashboard,
            children: [
                {
                    path: 'customer_order',
                    name: 'CustomerOrder',
                    component: CustomerOrder
                },
                {
                    path: 'customer_checkout/:orderId',
                    name: 'CustomerCheckout',
                    component: CustomerCheckout
                }
            ]
        },
        {
            path: "*",
            redirect: "/login"
        }
    ]
});